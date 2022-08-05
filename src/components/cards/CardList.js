import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCardsByCriteria} from "../../config/apiMethods";
import {Stack} from "@mui/material";
import ViewTitle from "../ViewTitle";
import CardSection from "./CardSection";
import moment from "moment";

export default function CardList() {

    const params = useParams();

    const [cards, setCards] = useState([]);

    const [rerender, setRerender] = useState(false);

    const location = useLocation();

    const updateComponent = () => {
        setRerender(!rerender);
    }




    useEffect(() => {
        const get = async () => {
            const result = await getCardsByCriteria(`?collection_id=${params.collectionId}`);
            return result;
        }
        get().then((result) => setCards(result));
    }, [params.collectionId, rerender])


    return (
        <main>


            <ViewTitle textContent={`Cards in collection ${location.state.name}`}></ViewTitle>
            <Stack>
                <CardSection cards={cards.filter(card => card.status_id === 1)} title={"New Cards"} canAdd={true}
                             collectionId={params.collectionId} rerenderList={updateComponent}></CardSection>

                <CardSection
                    cards={cards.filter(card => moment(card.repeat_date).format('d.M.Y') === moment(new Date()).format('d.M.Y') && card.status_id === 2)}
                    title={"Scheduled for today"} collectionId={params.collectionId} canAdd={false} rerenderList={updateComponent}></CardSection>

                <CardSection cards={cards.filter(card => card.status_id === 3)}
                             title={"Cards that need repetition right now"} collectionId={params.collectionId} canAdd={false} rerenderList={updateComponent}>

                </CardSection>

            </Stack>

        </main>
    )

}