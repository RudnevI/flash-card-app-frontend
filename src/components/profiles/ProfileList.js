import {Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Diamond} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {initialState, set} from '../../store/slicers/profileSlice'
import ViewTitle from "../ViewTitle";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import requests from "../requests";
import {deleteProfileByCriteria, getProfiles, getProfilesByCriteria} from "../../config/apiMethods";
import {setBackdropShown} from "../../store/slicers/backdropSlice";

export default function ProfileList() {

    const [profiles, setProfiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [profileNameAlreadyExists, setProfileNameAlreadyExists] = useState(false);

    const [rerender, setRerender] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(set(initialState))
        const get = async () => {
            dispatch(setBackdropShown(true));
            const result = await getProfiles();
            dispatch(setBackdropShown(false));
            setProfiles(result);
        }

        get();

    }, [dispatch, rerender]);

    useEffect(() => {
        /*const getProfileByName = async () => {
            const response = await requests.makeRequest(requests.apiRoutes.profileByCriteria, 'GET', undefined, `?name=${profileName}`);

            setProfileNameAlreadyExists(response.length > 0);
        }
        getProfileByName();*/
        const get = async () => {

            const exists = await getProfilesByCriteria(`?name=${profileName}`)

            setProfileNameAlreadyExists(exists.length > 0);
        }

        get()

    }, [profileName])

    const saveProfile = async () => {
        const response = await requests.makeRequest(requests.apiRoutes.profiles, 'POST', {
            name: profileName, exp: 0
        });


        setProfiles([...profiles, response]);
        setOpen(false);

    }

    const deleteProfile = async (profileId) => {
        await deleteProfileByCriteria(`?id=${profileId}`);
        setRerender(true);
    }


    return (<main style={{marginTop: "1rem"}}>
            <ViewTitle textContent="Profile List"></ViewTitle>
            <Dialog open={open}>
                <DialogTitle>Create profile</DialogTitle>
                <DialogContent style={{marginTop: "1rem"}}>
                    <TextField
                        error={profileNameAlreadyExists}
                        autoFocus
                        fullWidth
                        required
                        label="Profile name"
                        onChange={(event) => setProfileName(event.target.value)}
                    >

                    </TextField>
                </DialogContent>
                <Stack spacing={1} direction='row' justifyContent="center">
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => saveProfile()}
                            disabled={profileNameAlreadyExists || !profileName}>Save</Button>
                </Stack>
            </Dialog>
            <Stack spacing={1} style={{marginTop: "2rem", marginLeft: "2rem", paddingBottom: "2rem"}} rowGap={3}>
                {profiles.map(profile => (
                    <div style={{display: "flex"}} key={profile.id}>
                        <Link to={`collections/${profile.id}`} onClick={() => {
                            dispatch(set(profile))
                        }} className="ListItem" >
                            <p>{profile.name}</p>



                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <Diamond></Diamond>
                                <p>{profile.exp}</p>

                            </div>

                        </Link>

                    </div>
                      ))}
                <div className="ListItem AddItem" style={{justifyContent: "center"}} onClick={() => setOpen(true)}>

                        <AddCircleIcon></AddCircleIcon>

                </div>
            </Stack>

        </main>)
}