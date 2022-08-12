import {MenuItem, Select, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {getCollections, getStatuses} from "../../config/apiMethods";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import {dateFormat} from "../../config/dateUtil";

export default function EditCard({card, setParentFormItem}) {

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [statusId, setStatusId] = useState(undefined);

    const [collectionId, setCollectionId] = useState(undefined);

    const [repeatDate, setRepeatDate] = useState(undefined)


    const [statuses, setStatuses] = useState([]);
    const [collections, setCollections] = useState([]);


    useEffect(() => {


        setParentFormItem({


            question: question ? question : card.question,
            correct_answer: answer ? answer : card.answer,
            status_id: statusId ? statusId : card.status_id,
            collection_id: collectionId ? collectionId : card.collection_id,
            repeat_date: repeatDate ? moment(repeatDate).format(dateFormat) : card.repeat_date

        })
    }, [question, answer, statusId, collectionId, repeatDate])


    useEffect(() => {
        getStatuses().then(result => setStatuses(result));
        getCollections().then(result => setCollections(result));
        setRepeatDate(card.repeat_date);

    }, [])

    return (<Stack spacing={3} marginTop={1}>
            <TextField label={"Question"} onChange={(e) => setQuestion(e.target.value)} defaultValue={card.question}
                       InputLabelProps={{shrink: true}}
            ></TextField>
            <TextField label={"Answer"}
                       onChange={(e) => setAnswer(e.target.value)}
                       rows={3}
                       defaultValue={card.correct_answer}
                       InputLabelProps={{shrink: true}}

            ></TextField>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                    label="Scheduled repetition date"
                    inputFormat="DD/MM/YYYY"
                
                    onChange={(value) => setRepeatDate(value)}
                    renderInput={(params) => <TextField {...params} />} value={repeatDate}></DesktopDatePicker>
            </LocalizationProvider>

            <Select label={"Status"} value={card.status_id} onChange={(e) => setStatusId(e.target.value)}>
                {statuses.map(status => (<MenuItem value={status.id} key={status.id}>{status.name}</MenuItem>))}
            </Select>
            <Select label={"Collection"} value={card.collection_id} onChange={e => setCollectionId(e.target.value)}>
                {collections.map(collection => (
                    <MenuItem value={parseInt(collection.id)}>{collection.name}</MenuItem>))}
            </Select>


        </Stack>)
}