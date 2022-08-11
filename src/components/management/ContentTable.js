import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";

export default function ContentTable({currentIndex, index, parameters}) {

    const [items, setItems] = useState([]);

    const [currentParameterValue, setCurrentParameterValue] = useState(null);

    useEffect(() => {

        if(!currentIndex === index) return;
        parameters.getItemsMethod().then((result) => setItems(result))

    }, [])


    const setCurrentParameter = async (item, key) => {
/*        const attribute = parameters.columnAttributeMap[key];
        if(attribute.type) {
            const handler = parameters.handlers[key];
            const result =  await handler(attribute.handlerParameter);
            setCurrentParameterValue(result);
        }

        setCurrentParameterValue(item[attribute]);*/
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
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </TableContainer>
    )
}