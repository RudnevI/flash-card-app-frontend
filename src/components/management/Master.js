import {Autocomplete, Box, MenuItem, Select, Tab, Tabs, TextField} from "@mui/material";
import {useState} from "react";
import requests from "../requests";
import ContentTable from "./ContentTable";
import {
    deleteCardByCriteria, deleteCollectionByCriteria,
    deleteProfileByCriteria,
    getProfilesByCriteria,
    getStatusByCriteria
} from "../../config/apiMethods";
import ProfileSlice from "../../store/slicers/profileSlice";
import ProfileSelect from "../profiles/ProfileSelect";

export default function Master() {

    const tabMenu = [
        {
            title: "Profiles",
            route: requests.apiRoutes.profiles,
            headers: ['Name', 'Experience Points'],
            parameters: [
                /*'name',
                'exp'*/
                {
                    name: 'name',
                    editForm: (currentValue) => {
                        return <TextField label="Profile Name" value={currentValue}></TextField>;
                    }
                },
                {
                    name: 'exp',
                    editForm: (currentValue) => {
                        return <TextField type="number" label="Experience Points" value={currentValue}></TextField>;
                    }
                }
            ],
            deleteHandler: deleteProfileByCriteria
        },
        {
            title: "Collections",
            route: requests.apiRoutes.collections,
            headers: ['Name', 'Experience Points', 'Profile Name'],
            parameters: [
                {
                    name: 'name',
                    editForm: (currentValue) => {
                        return <TextField label="Collection Name" value={currentValue}></TextField>;
                    }
                },
                {
                    name: 'exp',
                    editForm: (currentValue) => {
                        return <TextField type="number" label="Experience Points" value={currentValue}></TextField>;
                    }
                },

                {
                    name: 'profile_id',
                    handler: async (profileId) => {
                        const result = await getProfilesByCriteria(`?id=${profileId}`);
                        return result[0].name;
                    },
                    editForm: (profileId) => {
                       return <ProfileSelect profileId={profileId}></ProfileSelect>
                    }
                },

            ],
            deleteHandler: deleteCollectionByCriteria
        },
        {
            title: "Cards",
            route: requests.apiRoutes.cards,
            headers: ['Questions', 'Answer', 'Status', 'Repeat Date'],
            parameters: [
                {
                    name: 'question'
                },
                {
                    name: 'correct_answer'
                },
                {
                    name: 'status_id',
                    handler: async(statusId) => {
                        const result = await getStatusByCriteria(`?id=${statusId}`);
                        return result[0].name
                    }

                },
                {
                    name: 'repeat_date'
                }
            ],
            deleteHandler: deleteCardByCriteria

        }
    ];

    const [currentTab, setCurrentTab] = useState(0);

    return (

        <main>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "white", paddingLeft: "2rem"}}>
            <Tabs value={currentTab} onChange={(event, value) => setCurrentTab(value)}>
                {tabMenu.map((tab, index) => (
                    <Tab key={index} value={index} label={tab.title}></Tab>
                ))}
            </Tabs>

            </Box>
            {tabMenu.map((tab, index) => (
                <ContentTable value={currentTab} index={index} route={tab.route}
                              headers={tab.headers} parameters={tab.parameters}
                              key={index} deleteHandler={tab.deleteHandler}
                ></ContentTable>
            ))}
        </main>
    );
}