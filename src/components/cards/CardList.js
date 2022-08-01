import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCardsByCriteria} from "../../config/apiMethods";
import {Grid} from "@mui/material";
import ViewTitle from "../ViewTitle";

export default function CardList() {

    const params = useParams();

    const [cards, setCards] = useState([]);

    useEffect(() => {
        const get = async () => {
            const result = await getCardsByCriteria(`?collection_id=${params.colletionId}`);
            setCards(result);
        }
        get();
    }, [])

    return (
        <main>
            <ViewTitle textContent={`Cards in collection ${}`}></ViewTitle>
            <Grid container>

            </Grid>
        </main>
    )

}