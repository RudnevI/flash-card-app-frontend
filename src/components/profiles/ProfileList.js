import {Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {mainSource} from "../../config/sources";
import {Link} from "react-router-dom";
import {Diamond} from "@mui/icons-material";


export default function ProfileList() {

    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const getProfiles = async () => {
            const response = await fetch(`${mainSource}profiles`);
            const result = await response.json();
            setProfiles(result);
        }
        getProfiles();
    }, [])

    return (
        <main style={{marginTop: "1rem"}}>
            <Typography style={{width: '80%', textAlign: 'center', padding: '1rem', backgroundColor: "white"}}
                        variant='h6'>
                Profile List
            </Typography>
            <Stack spacing={1} style={{marginTop: "2rem", marginLeft: "2rem", paddingBottom: "2rem"}}>

                {
                    profiles.map(profile => (
                        <Link to={`collections/${profile.id}`} className="ListItem" key={profile.id}>
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