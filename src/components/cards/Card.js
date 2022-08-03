import {useState} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";

export default function Card({question, answer, collectionId, collectionExp, successHandler, failureHandler, card}) {
    const [flip, setFlip] = useState(false);

    const handleSuccess = () => {
        successHandler(card);
        toggleFlip();
    }



    const renderContent = () => {
        return flip ?

            (
                <Stack spacing={2}>

                    <Typography alignSelf="center">{answer}</Typography>
                    <Typography>Did you get it right?</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="success" onClick={() => handleSuccess()}>YES</Button>
                        <Button variant="contained" color="error" onClick={() => toggleFlip()}>NO</Button>
                    </Stack>
                </Stack>
            )

            : (
                <Typography onClick={() => toggleFlip()}>
                    {question}
                </Typography>
            );
    }

    const toggleFlip = () => {
        setFlip(!flip);
    }

    return (
        <Box style={{width: "100%", height: "30vmin", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", color: "black"}}>
            {renderContent()}
        </Box>
    )
}