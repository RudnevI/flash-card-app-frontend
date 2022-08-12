import {useEffect, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";

export default function DeleteDialog({setShownParent, shown, deleteMethod, itemId, rerenderParentMethod}) {

    const [dialogShown, setDialogShown] = useState(false);

    useEffect(() => {
        setDialogShown(shown);
    }, [shown])

    const deleteItem = async() => {
        await deleteMethod(`?id=${itemId}`);
        rerenderParentMethod();
        setDialogShown(false);

    }

    return (
        <Dialog open={dialogShown}>
            <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
            <DialogContent>
                <Stack direction={"row"} justifyContent={"center"} columnGap={1} marginTop={2}>
                    <Button variant="contained" color={"error"} onClick={() => deleteItem()}>DELETE</Button>
                    <Button variant="outlined" onClick={() => setShownParent(false)}>CANCEL</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )

}