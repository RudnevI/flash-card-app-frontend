import {Collapse, Typography} from "@mui/material";
import {useEffect, useState} from "react";

export default function ViewTitle({textContent, width}) {

    const [shown, setShown] = useState(false);
    useEffect(() => {
        setTimeout(() => setShown(true), 100);
    }, [])

    return (
        <Collapse in={shown}>
            <Typography style={{
                width: (width ? width : '80%'),
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: "white",
                marginTop: '1rem'
            }}
                        variant='h6'>
                {textContent}
            </Typography>
        </Collapse>
    )
}