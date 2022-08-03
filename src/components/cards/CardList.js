import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    createCard,
    getCardsByCriteria,
    getCollectionsByCriteria,
    getStatuses, updateCard,
    updateCollection
} from "../../config/apiMethods";
import {Button, Dialog, DialogTitle, FormLabel, Grid, IconButton, Stack, TextareaAutosize} from "@mui/material";
import ViewTitle from "../ViewTitle";
import {AddCircle} from "@mui/icons-material";
import Card from "./Card";
import {datePlusInterval} from "../../config/util";

export default function CardList() {

    const params = useParams();

    const [cards, setCards] = useState([]);

    const [open, setOpen] = useState(false);

    const [questionToAdd, setQuestionToAdd] = useState("");
    const [answerToAdd, setAnswerToAdd] = useState("");
    const [collection, setCollection] = useState({});

    const location = useLocation();

    useEffect(() => {
        const get = async () => {
            const result = await getCardsByCriteria(`?collection_id=${params.collectionId}&repeat_date=${new Date().toLocaleDateString('kk')}`);
            setCards(result);

            const collectionResult = await getCollectionsByCriteria(`?id=${params.collectionId}`);
            setCollection(collectionResult[0]);
        }
        get();
    }, [params.collectionId])

    const saveCard = async () => {
        const statuses = await getStatuses();
        const newCard = await createCard({
            question: questionToAdd,
            correct_answer: answerToAdd,
            collection_id: params.collectionId,
            status_id: statuses.find(status => status.name === 'new').id,
            repeat_date: new Date().toLocaleDateString()
        })
        setCards([...cards, newCard]);
    }

    const successHandler = async (card) => {


        await updateCollection({
            criteria: {
                id: collection.id
            },
            data: {
                exp: collection.exp + 1
            }
        })

        await updateCard({
            criteria: {
                id: card.id,

            },
            data: {
                //TODO: add interval functionality
                repeat_date: datePlusInterval((card.repeat_date ? card.repeat_date : new Date()), 1).toLocaleDateString()
            }
        })


        setCards(cards.filter(stateCard => stateCard.id !== card.id));


    }


    const failureHandler = () => {

    }


    return (
        <main>


            <ViewTitle textContent={`Cards in collection ${location.state.name}`}></ViewTitle>
            <Grid container spacing={2} padding={2}>

                {cards.map(card => (
                    <Grid item md={4} xs={12} key={card.id}>
                        <Card answer={card.correct_answer} question={card.question} collectionId={collection.id}
                              collectionExp={collection.exp} successHandler={successHandler} card={card}
                              failureHandler={failureHandler}></Card>
                    </Grid>
                ))}
                <Grid item md={cards.length > 0 ? 4 : 12} xs={12} style={{
                    padding: "5rem",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "black"
                }}>
                    <IconButton onClick={() => setOpen(true)}>
                        <AddCircle></AddCircle>
                    </IconButton>
                </Grid>
            </Grid>


            <Dialog open={open} fullWidth>
                <DialogTitle style={{textAlign: "center"}}>Create card</DialogTitle>
                <Stack spacing={1} padding={2}>
                    <FormLabel>Question</FormLabel>
                    <TextareaAutosize
                        minRows={3}
                        onChange={(event) => setQuestionToAdd(event.target.value)}
                    >

                    </TextareaAutosize>

                    <FormLabel style={{marginTop: "1rem"}}>Correct answer</FormLabel>
                    <TextareaAutosize
                        minRows={6}
                        onChange={(event) => setAnswerToAdd(event.target.value)}
                    >

                    </TextareaAutosize>

                    <Stack spacing={1} direction="row">
                        <Button onClick={() => saveCard()}>Save</Button>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </Stack>
                </Stack>
            </Dialog>
        </main>
    )

}