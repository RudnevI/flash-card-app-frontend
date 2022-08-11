import {
    deleteProfileByCriteria, getCards,
    getCollectionsByCriteria, getProfiles,
    getProfilesByCriteria, getStatusByCriteria,
    updateProfile
} from "../../config/apiMethods";
import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import ContentTable from "./ContentTable";

const tabs = ['Profiles', 'Collections', 'Cards'];

const parameters = [
    {
        name: "Profiles",
        columnAttributeMap: {
            'name': 'name',
            'exp': 'exp'
        },
        getItemsMethod: getProfiles,
        deleteMethod: deleteProfileByCriteria,
        updateMethod: updateProfile
    },

    {
        name: "Collections",
        columnAttributeMap: {
            'name': 'name',
            'exp': 'exp',
            'profile': {
                type: 'handled',
                handlerParameter: 'profile_id'
            }
        },
        getItemsMethod: getProfiles,
        deleteMethod: deleteProfileByCriteria,
        updateMethod: updateProfile,

        handlers: {
            'profile': async (profileId) => (await getProfilesByCriteria(`?id=${profileId}`)).name
        }
    },
    {
        name: "Cards",
        columnAttributeMap: {
            'question': 'question',
            'answer': 'correct_answer',
            'collection': {
                type: 'handled',
                handlerParameter: 'collection_id'
            },
            'status': {
                type: 'handled',
                handlerParameter: 'status_id'
            },
            'repetition date': 'repeat_date'
        },
        getItemsMethod: getCards,
        deleteMethod: deleteProfileByCriteria,
        updateMethod: updateProfile,
        handlers: {
            'collection': async (collectionId) => (await getCollectionsByCriteria(`?id=${collectionId}`)).name,
            'status': async (statusId) => (await getStatusByCriteria(`?id=${statusId}`)).name
        }
    }

]

export default function Master() {

    const [currentTab, setCurrentTab] = useState(0);


    return (
        <main>
            <Box sx={{borderBottom: 1, borderColor: 'divider', backgroundColor: "white", paddingLeft: "2rem"}}>
                <Tabs value={currentTab} onChange={(event, value) => setCurrentTab(value)}>
                    {tabs.map((tab, index) => (
                        <Tab value={index} key={index} label={tab}></Tab>
                    ))}
                </Tabs>

            </Box>

            {parameters.map((tab, index) => (
                <ContentTable
                    index={index}
                    currentIndex={currentTab}
                    parameters={parameters[index]}
                ></ContentTable>
            ))}
        </main>
    )
}