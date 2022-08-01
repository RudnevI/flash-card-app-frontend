import {Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Diamond} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {set} from '../../store/slicers/profileSlice'
import ViewTitle from "../ViewTitle";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import requests from "../requests";
import {getProfiles, getProfilesByCriteria} from "../../config/apiMethods";

export default function ProfileList() {

    const [profiles, setProfiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [profileNameAlreadyExists, setProfileNameAlreadyExists] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {

      const get = async () => {
          const result = await getProfiles();
          setProfiles(result);
      }

      get();

    }, []);

    useEffect(() => {
        /*const getProfileByName = async () => {
            const response = await requests.makeRequest(requests.apiRoutes.profileByCriteria, 'GET', undefined, `?name=${profileName}`);

            setProfileNameAlreadyExists(response.length > 0);
        }
        getProfileByName();*/
        const get = async () => {
            const size = await getProfilesByCriteria(`?${profileName}`).length;
            setProfileNameAlreadyExists(size > 0);
        }

        get()

    }, [profileName])

    const saveProfile = async () => {
        const response = await requests.makeRequest(requests.apiRoutes.profiles, 'POST', {
            name: profileName,
            exp: 0
        });


            setProfiles([...profiles, response]);
            setOpen(false);

    }

    return (
        <main style={{marginTop: "1rem"}}>
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
                    <Button onClick={() => saveProfile()} disabled={profileNameAlreadyExists || !profileName}>Save</Button>
                </Stack>
            </Dialog>
            <Stack spacing={1} style={{marginTop: "2rem", marginLeft: "2rem", paddingBottom: "2rem"}}>

                {
                    profiles.map(profile => (
                        <Link to={`collections/${profile.id}`} onClick={() => {
                            dispatch(set(profile))
                        }} className="ListItem" key={profile.id}>
                            <p>{profile.name}</p>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                                <Diamond></Diamond>
                                <p>{profile.exp}</p>

                            </div>
                        </Link>
                    ))
                }
                <div className="ListItem" style={{justifyContent: "center", backgroundColor: "#b8bfba"}}>
                <IconButton aria-label="add new profile" component="label"
                            onClick={() => setOpen(true)}>
                    <AddCircleIcon></AddCircleIcon>
                </IconButton>
                </div>
            </Stack>

        </main>
    )
}