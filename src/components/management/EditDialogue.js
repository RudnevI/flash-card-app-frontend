import {Button, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {Label} from "@mui/icons-material";

export default function EditDialogue({parameters, dialogueShown, title, editHandler, item}) {

    const [shown, setShown] = useState(false);

    useEffect(() => {
        setShown(dialogueShown)

    }, [dialogueShown])


    const renderForm = (parameter) => {
        if(parameter.editForm) {
            return parameter.editForm(item[parameter.name]);
        }
    }

    return (
        <Dialog open={shown}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent style={{padding: "2rem"}}>
            <Stack rowGap={1}>
            {parameters.map((parameter, index) => (
                <div key={index}>
                    {renderForm(parameter)}
                </div>
                ))}
            </Stack>
            <Stack direction="row" style={{marginTop: "1rem"}}>
                <Button>Save</Button>
                <Button onClick={() => setShown(false)}>Cancel</Button>
            </Stack>
            </DialogContent>
        </Dialog>
    )
}