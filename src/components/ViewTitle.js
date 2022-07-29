import {Typography} from "@mui/material";

export default function ViewTitle({textContent}) {
    return (
        <Typography style={{width: '80%', textAlign: 'center', padding: '1rem', backgroundColor: "white", marginTop: '1rem'}}
                    variant='h6'>
            {textContent}
        </Typography>
    )
}