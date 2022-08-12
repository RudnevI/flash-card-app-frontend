import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {IconButton, Tooltip} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

export default function ContentTable({currentIndex, index, parameters}) {

    const [items, setItems] = useState([]);

    const [deleteDialogShown, setDeleteDialogShown] = useState(false);

    const [editDialogShown, setEditDialogShown] = useState(false);

    const [rerender, setRerender] = useState(false);

    const [currentItem, setCurrentItem] = useState({});

    useEffect(() => {

        if (currentIndex !== index) return;

        const relations = Object.keys(parameters.columnAttributeMap).filter(key => !!parameters.columnAttributeMap[key].type);

        const promise = (relations.length === 0) ? parameters.getItemsMethod() : parameters.getItemsMethod(relations);

        promise.then((result) => setItems(result));


    }, [currentIndex, rerender])


    const renderCellContent = (item, key) => {
        const mapEntry = parameters.columnAttributeMap[key];
        return (!!mapEntry.type) ? item[key][mapEntry.attribute] : item[mapEntry];
    }

    const rerenderComponent = () => {
        setRerender(!rerender);
    }


    const handleDeleteButtonClick = (item) => {
        setCurrentItem(item);
        setDeleteDialogShown(true);
    }

    const handleEditButtonClick = (item) => {
        setCurrentItem(item);
        setEditDialogShown(true);
    }


    return (
        <TableContainer component={Paper} role="tabpanel" hidden={currentIndex !== index}
                        sx={{maxWidth: '80%', marginTop: "1rem"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.keys(parameters.columnAttributeMap).map((key, index) => (
                            <TableCell key={index}>
                                <b>{key}</b>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*{items.map(item => (
                        <TableRow key={item.id}>
                            {parameters.map((parameter, index) => (
                                <TableCell key={index}>{item[parameter.name]}</TableCell>
                            ))}
                            <TableCell>
                                <Tooltip title={"Delete record"}>
                                    <IconButton>
                                        <Delete></Delete>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={"Edit record"}>
                                    <IconButton>
                                        <Edit></Edit>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}*/}
                    {items.map(item =>
                        <TableRow key={item.id}>
                            {Object.keys(parameters.columnAttributeMap).map((key, index) => (
                                <TableCell key={index}>{renderCellContent(item, key)}</TableCell>
                            ))}
                            <TableCell>
                                <Tooltip title={"Delete record"}>
                                    <IconButton onClick={() => handleDeleteButtonClick(item)}>
                                        <Delete></Delete>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={"Edit record"} onClick={() => handleEditButtonClick(item)}>
                                    <IconButton>
                                        <Edit></Edit>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DeleteDialog shown={deleteDialogShown} setShownParent={setDeleteDialogShown} itemId={currentItem.id} rerenderParentMethod={rerenderComponent} deleteMethod={parameters.deleteMethod}></DeleteDialog>
            <EditDialog shown={editDialogShown} setShownParent={setEditDialogShown}></EditDialog>
        </TableContainer>
    )
}