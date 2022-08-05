import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {mainSource} from "../../config/sources";

export default function ContentTable({route, index, value, headers, parameters}) {

    const [items, setItems] = useState([]);

    const [isSelected, setIsSelected] = useState(false);




    useEffect(() => {
        setIsSelected(index === value)
    }, [value]);




    useEffect(() => {

        if(!isSelected) return;
        const getItems = async() => {
            return await fetch(`${mainSource}${route}`);
        }
        getItems().then((response) => response.json()).then((result) => setItems(result));
    }, [isSelected]);

    const getCellContent = async(parameter, item) => {
        const result = await (parameter.handler ? parameter.handler(item[parameter.name]) : parameter.name);
        return result;
    }

    return (
        <TableContainer component={Paper} role="tabpanel" hidden={!isSelected} sx={{ maxWidth: '80%', marginTop: "1rem" }}>
            <Table  aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow key={item.id}>
                            {parameters.map((parameter, index) => (
                                <TableCell key={index}>{getCellContent(parameter, item)}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}