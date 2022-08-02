import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createCard, getCardsByCriteria, getStatuses} from "../../config/apiMethods";
import {Box, Button, Dialog, DialogTitle, FormLabel, Grid, IconButton, Stack, TextareaAutosize} from "@mui/material";
import ViewTitle from "../ViewTitle";
import {AddCircle} from "@mui/icons-material";
import Card from "./Card";

export default function CardList() {

    const params = useParams();

    const [cards, setCards] = useState([]);

    const [open, setOpen] = useState(false);

    const [questionToAdd, setQuestionToAdd] = useState("");
    const [answerToAdd, setAnswerToAdd] = useState("");

    const location = useLocation();

    useEffect(() => {
        const get = async () => {
            const result = await getCardsByCriteria(`?collection_id=${params.collectionId}`);
            setCards(result);
        }
        get();
    }, [params.collectionId])

    const saveCard = async () => {
        const statuses = await getStatuses();
        const newCard = await createCard({
            question: questionToAdd,
            correct_answer: answerToAdd,
            collection_id: params.collectionId,
            status_id: statuses.find(status => status.name === 'new').id
        })
        setCards([...cards, newCard]);
    }


    return (
        <main>


            <ViewTitle textContent={`Cards in collection ${location.state.name}`}></ViewTitle>
            <Grid container spacing={2} padding={2}>

                {cards.map(card => (
                    <Grid item md={4} xs={12} key={card.id}>
                        <Card answer={card.correct_answer} question={card.question}></Card>
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