import {useEffect, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";

export default function DeleteDialogue({label, dialogueShown, item, deleteHandler}) {
    const [shown, setShown] = useState(false);

    useEffect(() => {
        setShown(dialogueShown);
    }, [dialogueShown]);

    const handleDelete = async () => {
        await deleteHandler(item.id);
        setShown(false);
    }

    return (
        <Dialog open={shown}>
            <DialogTitle>Are you sure you want to delete {label ? label : "this record?"}</DialogTitle>
            <DialogContent style={{display: "flex", justifyContent: "center"}}>
                <Stack marginTop={2} direction="row" columnGap={1}>
                    <Button color="error" onClick={handleDelete}>DELETE</Button>
                    <Button onClick={() => setShown(false)}>Cancel</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}