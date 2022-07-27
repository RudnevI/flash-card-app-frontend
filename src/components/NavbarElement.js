import {NavLink} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import '../App.css';

export default function NavbarElement({path, textContent}) {
    return (
        <NavLink to={path} className="navLink" style={isActive => isActive ? {color: "black"} : {color: "2e2e2d"} }>
            <Button color="inherit">
                <Typography variant='h6' color="inherit">
                    {textContent}
                </Typography>
            </Button>
        </NavLink>
    )
}