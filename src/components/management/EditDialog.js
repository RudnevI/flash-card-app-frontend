import {Button, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {useEffect, useState} from "react";

export default function EditDialog({setShownParent, shown, deleteMethod, item, rerenderParentMethod, renderEditForm, editMethod}) {

    const [dialogShown, setDialogShown] = useState(false);

    useEffect(() => {
        setDialogShown(shown)
    }, [shown])

    return (
        <Dialog open={dialogShown}>
            <DialogTitle>Edit Record</DialogTitle>
            <DialogContent>
                {/*{renderEditForm(item)}*/}
                <Stack direction={"row"} marginTop={2} spacing={1} justifyContent={"center"}>
                    <Button variant={"contained"}>EDIT</Button>
                    <Button variant={"outlined"} onClick={() => setShownParent(false)}>CANCEL</Button>
                </Stack>
            </DialogContent>

        </Dialog>
    )
}