import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {mainSource} from "../../config/sources";
import {Typography} from "@mui/material";

export default function CollectionList() {
    const params = useParams();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const getCollections = async () => {
            const response = await fetch(`${mainSource}collections/criteria?profile_id=${params.profileId}`)
            const result = await response.json();
            setCollections(result);

        }
        getCollections();
    }, [params.profileId]);

    return (
        <main>

                {collections.map(collection => (
                    <Typography
                        key={collection.id}>{collection.name}
                    </Typography>
                ))}

        </main>
    )
}