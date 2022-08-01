import {useEffect, useState} from "react";
import requests from "./requests";
import {Autocomplete, Box, Button, TextField} from "@mui/material";
import ViewTitle from "./ViewTitle";

export default function Options() {
    const [profiles, setProfiles] = useState([]);
    const [collections, setCollections] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState({});
    const [selectedCollection, setSelectedCollection] = useState({});
    const [daySpan, setDaySpan] = useState(0);


    const valid = () => {
        return selectedProfile && selectedCollection.id && daySpan > 0;
    }



    useEffect(() => {
        const getData = async () => {
            const profileList = await requests.makeRequest(requests.apiRoutes.profiles);
            setProfiles(profileList);
        }
        getData()
    }, [])

    useEffect(() => {
        const getCollectionsByProfile = async () => {
            if (!selectedProfile.id) return;
            const collections = await requests.makeRequest(requests.apiRoutes.collectionsByCriteria, 'GET', undefined, `?profile_id=${selectedProfile.id}`);
            setCollections(collections);
        }
        getCollectionsByProfile();

    }, [selectedProfile])


    const handleProfileSelect = (e, value) => {

        setSelectedProfile(value);

    }

    const handleCollectionSelect = (e, value) => {
        setSelectedCollection(value);
    }

    const collectionAutocomplete = () => {
        if (!selectedProfile.id) return;
        return (
            <Autocomplete

                style={{marginTop: "2rem", backgroundColor: "white"}}
                options={collections}
                getOptionLabel={option => option.name}
                renderOption={(props, option) => {
                    return (

                        <li {...props} key={option.id}>
                            {option.name}
                        </li>)
                }}

                renderInput={(params) => <TextField  {...params} label="Collection"/>}
                onChange={(e, v) => handleCollectionSelect(e, v)}
            >

            </Autocomplete>
        )
    }

    const saveOptions = async () => {


        const result = await requests.makeRequest(requests.apiRoutes.options, 'POST', {
            'day_timespan' : daySpan,
            'collection_id': selectedCollection.id
        })
        console.log(result);
    }



    const daySpanInput = () => {
        if (!selectedCollection.id) return;
        return (
            <TextField
                style={{marginTop: "2rem", backgroundColor: "white"}}
                type="number"
                label="Day span"
                error={!daySpan || daySpan < 0}
                helperText="Value must be positive integer"
                value={daySpan}
                onChange={(e) => setDaySpan(parseInt(e.target.value))}


            >

            </TextField>
        );
    }


    return (
        <main>
            <ViewTitle textContent="Options"></ViewTitle>
            <div style={{display: "flex", justifyContent: "center", width: '100%'}}>
                <Box sx={{width: "80%", marginTop: '2rem'}}>
                    <Autocomplete

                        options={profiles}
                        getOptionLabel={option => option.name}
                        renderOption={(props, option) => {
                            return (<li {...props} key={option.id}>
                                {option.name}
                            </li>)
                        }}
                        style={{backgroundColor: "white"}}

                        renderInput={(params) => <TextField  {...params} label="Profile"/>}
                        onChange={(e, v) => handleProfileSelect(e, v)}
                    >

                    </Autocomplete>
                    {collectionAutocomplete()}
                    {daySpanInput()}
                    <br/>
                    <Button variant="contained" style={{width: "30%", marginTop: "3rem", backgroundColor: "#b8bfba"}} onClick={() => saveOptions()} disabled={!valid()}>
                        Save
                    </Button>
                </Box>
            </div>
        </main>
    )

}