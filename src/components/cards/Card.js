import {useState} from "react";
import {Box} from "@mui/material";

export default function Card({question, answer}) {
    const [flip, setFlip] = useState(false);

    const renderContent = () => {
        return flip ? answer : question;
    }

    const toggleFlip = () => {
        setFlip(!flip);
    }

    return (
        <Box style={{padding: "5rem", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", color: "black"}} onClick={() => toggleFlip()}>
            {renderContent()}
        </Box>
    )
}