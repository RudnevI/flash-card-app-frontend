import {AppBar, Box, Toolbar} from "@mui/material";
import NavbarElement from "./NavbarElement";


export default function Navbar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="grey">
                <Toolbar variant="dense" className="NavLink">
                    <NavbarElement path='/' textContent='Home'></NavbarElement>
                    <NavbarElement path='/options' textContent='Options'></NavbarElement>
                </Toolbar>

            </AppBar>
        </Box>
    )
}