import {Stack, Typography} from "@mui/material";

export default function List() {
    return (<Stack spacing={1} style={{marginTop: "2rem", marginLeft: "2rem"}}>
        <Typography style={{width: '100%', textAlign: 'center', padding: '1rem', backgroundColor: "white"}} variant='h6'>
            Profile List
        </Typography>
        <div className="ListItem">
            1
        </div>
        <div className="ListItem">
            2
        </div>
        <div className="ListItem">
            3
        </div>
    </Stack>)
}