import {useEffect, useState} from "react";
import {Box, Button, Grow, Stack, Typography} from "@mui/material";

export default function Card({card, successHandler, failureHandler}) {
    const [flip, setFlip] = useState(false);

    const [shown, setShown] = useState(false);

    const handleSuccess = () => {
        successHandler(card);
        toggleFlip();
    }

    const handleFailure = () => {
        failureHandler(card);
        toggleFlip();
    }

    useEffect(() => {
        setShown(true);
    }, [])

    const renderContent = () => {
        return flip ?

            (
                <Stack spacing={2}>

                    <Typography alignSelf="center">{card.correct_answer}</Typography>
                    <Typography>Did you get it right?</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="success" onClick={() => handleSuccess()}>YES</Button>
                        <Button variant="contained" color="error" onClick={() => handleFailure()}>NO</Button>
                    </Stack>
                </Stack>
            )

            : (
                <Typography onClick={() => toggleFlip()}>
                    {card.question}
                </Typography>
            );
    }

    const toggleFlip = () => {
        setFlip(!flip);
    }

    return (
        <Grow in={shown} timeout={1000} style={{ transformOrigin: '0 0 0' }}>
            <Box style={{
                width: "100%",
                height: "30vmin",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                color: "black"
            }}>
                {renderContent()}
            </Box>
        </Grow>
    )
}