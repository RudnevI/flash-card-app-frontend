import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {useEffect, useState} from "react";
import {mainSource} from "../../config/sources";
import DeleteIcon from '@mui/icons-material/Delete';
import {Edit} from "@mui/icons-material";
import EditDialogue from "./EditDialogue";
import DeleteDialogue from "./DeleteDialogue";

export default function ContentTable({route, index, value, headers, parameters, deleteHandler, editHandler}) {

    const [items, setItems] = useState([]);

    const [isSelected, setIsSelected] = useState(false);

    const [rerender, setRerender] = useState(false);

    const [editDialogueShown, setEditDialogueShown] = useState(false);

    const [currentItem, setCurrentItem] = useState({});

    const [deleteDialogShown, setDeleteDialogShown] = useState(false);


    useEffect(() => {
        setIsSelected(index === value);
    }, [value]);


    useEffect(() => {

        if (!isSelected) return;

        const getItems = async () => {
            return await fetch(`${mainSource}${route}`);
        }
        const getCellContent = async (itemList) => {
            /*items[index][parameter.name] = parameter.handler ? await parameter.handler(parameter.name) : items[index][parameter.name];*/
            for (const item of itemList) {
                for (const parameter of parameters) {
                    if (!item[parameter.name]) continue;
                    item[parameter.name] = parameter.handler ? await parameter.handler(item[parameter.name]) : item[parameter.name];

                }
            }
            return itemList;
        }


        getItems().then((response) => response.json()).then((result) => {
            getCellContent(result).then(handledItems => setItems(handledItems));
        });
    }, [isSelected, rerender]);


    const deleteItem = async (id) => {
        await deleteHandler(`?id=${id}`);
        setRerender(!rerender);
    }

    const handleEditClick = (item) => {
        setEditDialogueShown(true);
        setCurrentItem(item);
    }

    const handleDeleteClick = (item) => {
        setDeleteDialogShown(true);
        setCurrentItem(item);
    }

    return (
        <TableContainer component={Paper} role="tabpanel" hidden={!isSelected}
                        sx={{maxWidth: '80%', marginTop: "1rem"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>
                                <b>{header}</b>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow key={item.id}>
                            {parameters.map((parameter, index) => (
                                <TableCell key={index}>{item[parameter.name]}</TableCell>
                            ))}
                            <TableCell>
                                <Tooltip title={"Delete record"}>
                                    <IconButton onClick={() => handleDeleteClick(item)}>
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title={"Edit record"}>
                                    <IconButton onClick={() => handleEditClick(item)}>
                                        <Edit></Edit>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <EditDialogue parameters={parameters} dialogueShown={editDialogueShown} item={currentItem}></EditDialogue>
            <DeleteDialogue dialogueShown={deleteDialogShown} deleteHandler={deleteItem}
                            item={currentItem}></DeleteDialogue>
        </TableContainer>

    )
}