import {Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {mainSource} from "../../config/sources";
import {Link} from "react-router-dom";
import {Diamond} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {set} from '../../store/slicers/profileSlice'
import ViewTitle from "../ViewTitle";


export default function ProfileList() {

    const [profiles, setProfiles] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getProfiles = async () => {
            const response = await fetch(`${mainSource}profiles`);
            const result = await response.json();
            setProfiles(result);
        }
        getProfiles();
    }, []);


    return (
        <main style={{marginTop: "1rem"}}>
            <ViewTitle textContent="Profile List"></ViewTitle>
            <Stack spacing={1} style={{marginTop: "2rem", marginLeft: "2rem", paddingBottom: "2rem"}}>

                {
                    profiles.map(profile => (
                        <Link to={`collections/${profile.id}`} onClick={() => {
                            dispatch(set({name: profile.name, exp: profile.exp}))
                        }} className="ListItem" key={profile.id}>
                            <p>{profile.name}</p>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>

                                <Diamond></Diamond>
                                <p>{profile.exp}</p>

                            </div>
                        </Link>
                    ))
                }

            </Stack>
        </main>
    )
}