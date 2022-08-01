import {AppBar, Box, Toolbar} from "@mui/material";
import NavbarElement from "./NavbarElement";
import {useSelector} from "react-redux";


export default function Navbar() {

    const currentProfileName = useSelector(state => state.profile.name);
    const currentProfileExp = useSelector(state => state.profile.exp);

    const profileStats = () => {
        if(currentProfileName && currentProfileExp !== undefined) {
            return (
                <div style={{marginLeft: "auto", display: "flex", justifyContent: "flex-end", columnGap: "1rem"}}>
                    <p>{currentProfileName}</p>
                    <p>{currentProfileExp}</p>
                </div>
            )
        }
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="grey">
                <Toolbar variant="dense" className="NavLink">
                    <NavbarElement path='/' textContent='Home'></NavbarElement>
                    <NavbarElement path='/options' textContent='Options'></NavbarElement>
                    {profileStats()}

                </Toolbar>

            </AppBar>
        </Box>
    )
}