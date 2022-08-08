import ViewTitle from "../ViewTitle";
import {Button, Dialog, DialogTitle, FormLabel, Grid, IconButton, Stack, TextareaAutosize} from "@mui/material";
import Card from "./Card";
import {AddCircle} from "@mui/icons-material";
import {useState} from "react";
import {createCard, getCollectionsByCriteria, updateCard, updateCollection} from "../../config/apiMethods";
import moment from "moment";
import {dateFormat} from "../../config/dateUtil";


export default function CardSection({cards, title, canAdd, collectionId, rerenderList, dateInterval}) {

    const [open, setOpen] = useState(false);

    const [questionToAdd, setQuestionToAdd] = useState("");

    const [answerToAdd, setAnswerToAdd] = useState("");





    const saveCard = async () => {
        const newCard = await createCard({
            question: questionToAdd,
            correct_answer: answerToAdd,
            repeat_date: moment(new Date()).format(dateFormat),
            status_id: 1,
            collection_id: collectionId
        })
        if (newCard.id) cards.push(newCard);


    }




    const handleSuccess = async (card) => {

        let repeatDate;
        if (card.status_id === 3) {
            repeatDate = moment().format(dateFormat);
        }
        else repeatDate = (card.repeat_date ? moment() : moment(card.repeat_date)).add(dateInterval, 'days').format(dateFormat)
        console.log(repeatDate);

        const collection = await getCollectionsByCriteria(`?id=${collectionId}`);
       await updateCard({
            criteria: {
                id: card.id
            },
            data: {


                repeat_date: repeatDate,
                status_id: 2

            }
        });

       await updateCollection({
           criteria: {
               id: collectionId
           },
           data: {
               exp: (collection.exp) ? collection.exp + 1 : 1
           }
       })


        rerenderList();

    }


    const handleFailure = async (card) => {
        const result = await updateCard({
            criteria: {
                id: card.id
            },
            data: {
                exp: card.exp === 0 ? 0 : (card.exp - 1),
                status_id: 3,
                repeat_date: moment(new Date()).format('d.M.Y')

            }
        })
        if(!result) return;
        console.log('RERENDER');
        rerenderList();

    }

    const addCardBlock = () => {
        return canAdd ? (
            <Grid item md={4} xs={12} style={{
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

        ) : "";


    }


    return (
        <div style={{marginTop: '1rem'}}>
            <ViewTitle textContent={title} width={'60%'}></ViewTitle>
            <Grid container spacing={2} padding={2}>

                {cards.map(card => (
                    <Grid item md={4} xs={12} key={card.id}>
                        <Card card={card} successHandler={handleSuccess} failureHandler={handleFailure}></Card>
                    </Grid>
                ))}

                {addCardBlock()}
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
        </div>
    )
}