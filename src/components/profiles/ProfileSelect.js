import {useEffect, useState} from "react";
import {getProfiles} from "../../config/apiMethods";
import {MenuItem, Select} from "@mui/material";

export default function ProfileSelect({profileId}) {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        getProfiles().then(result => setProfiles(result));
    }, [])

    return (
        <Select label={"Profile"} value={profileId}>
            {profiles.map(profile => (
                <MenuItem value={profile.id} key={profile.id}>{profile.name}</MenuItem>
            ))}
        </Select>
    )
}