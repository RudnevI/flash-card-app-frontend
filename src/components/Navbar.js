import {AppBar, Box, Switch, Toolbar, Typography} from "@mui/material";
import NavbarElement from "./NavbarElement";
import {useDispatch, useSelector} from "react-redux";
import {toggle} from '../store/slicers/lessonModeSlice'

export default function Navbar() {

    const currentProfileName = useSelector(state => state.profile.name);
    const currentProfileExp = useSelector(state => state.profile.exp);

    const lessonModeOn = useSelector(state => state.lessonMode.lessonMode);


    const dispatch = useDispatch();



    const additionalOptions = () => {
        return (<div style={{marginLeft: "auto", display: "flex", justifyContent: "flex-end", columnGap: "1rem"}}>
                <Typography variant={"h6"}>LESSON MODE</Typography>
                <Switch defaultChecked={lessonModeOn} onChange={() => dispatch(toggle())}  inputProps={{ 'aria-label': 'controlled' }}></Switch>
            </div>
            )
    }


    const renderManagementLink = () => {
        return (!lessonModeOn)?   (<NavbarElement path='/manage' textContent='Manage'></NavbarElement>) : "";
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="grey">
                <Toolbar variant="dense" className="NavLink">
                    <NavbarElement path='/' textContent='Home'></NavbarElement>
                    <NavbarElement path='/options' textContent='Options'></NavbarElement>
                    {renderManagementLink()}
                    {additionalOptions()}


                </Toolbar>

            </AppBar>
        </Box>
    )
}