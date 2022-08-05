import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import requests from "../requests";
import ContentTable from "./ContentTable";
import {getProfilesByCriteria} from "../../config/apiMethods";

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
                },
                {
                  name: 'exp'
                }
            ]
        },
        {
            title: "Collections",
            route: requests.apiRoutes.collections,
            headers: ['Name', 'Experience Points', 'Profile Name'],
            parameters: [
                {
                    name: 'name',
                },
                {
                    name: 'exp'
                },

                {
                    name: 'profile_id',
                    handler: async (profileId) => {
                        const result = await getProfilesByCriteria(`?id=${profileId}`);
                        return result[0].name;
                    }
                }
            ]
        },
        {
            title: "Cards",
            route: requests.apiRoutes.cards,
            headers: ['Questions', 'Answer', 'Status', 'Repeat Date'],
            parameters: [
                'question',
                'correct_answer',
                'status',
                'repeat_date'
            ]
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
                ></ContentTable>
            ))}
        </main>
    );
}