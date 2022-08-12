import {MenuItem, Select, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {getProfiles} from "../../config/apiMethods";

export default function EditCollection({collection, setParentFormItem})  {

    const [profiles, setProfiles] = useState([]);


    const [name, setName] = useState("");

    const [profileId, setProfileId] = useState(undefined);


    useEffect(() => {
        setParentFormItem({
            name: name ? name : collection.name,
            profile_id: profileId ? profileId : collection.profile_id
        })
    }, [name, profileId])

    useEffect(() => {

        getProfiles().then(result => setProfiles(result));

    }, []);

    return (
        <Stack rowGap={1} marginTop={2}>
            <TextField label={"Collection name"} defaultValue={collection.name} required onChange={(e) => setName(e.target.value)}></TextField>
            <Select defaultValue={collection.profile_id} label={"Profile"} onChange={(e) => setProfileId(e.target.value)}>
                {profiles.map(profile => (
                    <MenuItem value={profile.id} key={profile.id}>{profile.name}</MenuItem>
                ))}
            </Select>
        </Stack>
    )
}