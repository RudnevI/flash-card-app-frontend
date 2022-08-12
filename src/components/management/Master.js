import {
    deleteCardByCriteria,
    deleteCollectionByCriteria,
    deleteProfileByCriteria, getCards, getCardsWithRelations,
    getCollectionsByCriteria, getCollectionsWithRelations, getProfiles,
    getProfilesByCriteria, getStatusByCriteria, updateCard, updateCollection,
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
                type: 'relation',
                attribute: 'name'
            }
        },
        getItemsMethod: getCollectionsWithRelations,
        deleteMethod: deleteCollectionByCriteria,
        updateMethod: updateCollection,

    },
    {
        name: "Cards",
        columnAttributeMap: {
            'question': 'question',
            'answer': 'correct_answer',
            'collection': {
                type: 'relation',
                attribute: 'name',
            },
            'status': {
                type: 'relation',
                attribute: 'name',
            },
            'repetition date': 'repeat_date'
        },
        getItemsMethod: getCardsWithRelations,
        deleteMethod: deleteCardByCriteria,
        updateMethod: updateCard,

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
                    key={index}
                    index={index}
                    currentIndex={currentTab}
                    parameters={parameters[index]}
                ></ContentTable>
            ))}
        </main>
    )
}