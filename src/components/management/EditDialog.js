import {Button, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useEffect, useState} from "react";

export default function EditDialog({setShownParent, shown, item, rerenderParentMethod, renderEditForm, editMethod}) {

    const [dialogShown, setDialogShown] = useState(false);

    const [editItem, setEditItem] = useState({});

    useEffect(() => {
        setDialogShown(shown)
    }, [shown])

    const updateItem = async() => {
        await editMethod({
            criteria: {
                id: item.id
            },
            data: editItem
        })
        rerenderParentMethod();
        setShownParent(false);
    }

    return (
        <Dialog open={dialogShown}>
            <DialogTitle>Edit Record</DialogTitle>
            <DialogContent>
                {renderEditForm(item, setEditItem)}
                <Stack direction={"row"} marginTop={2} spacing={1} justifyContent={"center"}>
                    <Button variant={"contained"} onClick={updateItem}>EDIT</Button>
                    <Button variant={"outlined"} onClick={() => setShownParent(false)}>CANCEL</Button>
                </Stack>
            </DialogContent>

        </Dialog>
    )
}