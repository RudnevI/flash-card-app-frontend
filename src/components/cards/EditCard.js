import {Button, MenuItem, Select, Stack, TextareaAutosize, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {getCollections, getStatuses, updateCard} from "../../config/apiMethods";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import {dateFormat} from "../../config/dateUtil";

export default function EditCard({card, setEdited}) {

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [statusId, setStatusId] = useState(undefined);

    const [collectionId, setCollectionId] = useState(undefined);

    const [repeatDate, setRepeatDate] = useState(undefined)


    const [statuses, setStatuses] = useState([]);
    const [collections, setCollections] = useState([]);




    /*useEffect(() => {
        setEdited({
            question: question,
            correct_answer: answer,
            status_id: statusId,
            collection_id: collectionId,
            repeat_date: repeatDate ? moment(repeatDate).format(dateFormat) : card.repeat_date
        })
    })*/



    useEffect(() => {
        getStatuses().then(result => setStatuses(result));
        getCollections().then(result => setCollections(result));

    }, [])

    return (
        <Stack spacing={3}>
            <TextField label={"Question"} onChange={(e) => setQuestion(e.target.value)} value={card.question}
                       InputLabelProps={{shrink: true}}
            ></TextField>
            <TextField label={"Answer"}
                       onChange={(e) => setAnswer(e.target.value)}
                       rows={3}
                       value={card.correct_answer}
                       InputLabelProps={{shrink: true}}

            ></TextField>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                    label="Scheduled repetition date"
                    inputFormat="MM/dd/yyyy"
                    value={repeatDate}
                    onChange={(value) => setRepeatDate(value)}
                    renderInput={(params) => <TextField {...params} />}></DesktopDatePicker>
            </LocalizationProvider>

            <Select label={"Status"} value={card.status_id.raw} onChange={(e) => setStatusId(e.target.value)}>
                {statuses.map(status => (
                    <MenuItem value={status.id}>{status.name}</MenuItem>
                ))}
            </Select>
            <Select label={"Collection"} value={card.collection_id} onChange={e => setCollectionId(e.target.value)}>
                {collections.map(collection => (
                    <MenuItem value={parseInt(collection.id)}>{collection.name}</MenuItem>
                ))}
            </Select>



        </Stack>
    )
}