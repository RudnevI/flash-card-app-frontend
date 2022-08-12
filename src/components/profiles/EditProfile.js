import {useState} from "react";
import {Stack, TextField} from "@mui/material";

export default function EditProfile({profile, setParentFormItem}) {



    return (
        <Stack rowGap={1} marginTop={2}>
            <TextField label={"Profile name"} defaultValue={profile.name} required onChange={(e) => setParentFormItem({
                name: e.target.value
            })}></TextField>
        </Stack>
    )


}