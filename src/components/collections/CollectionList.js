import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {mainSource} from "../../config/sources";
import {Grid, Typography} from "@mui/material";
import {Diamond} from "@mui/icons-material";

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
            <Grid container spacing={"2rem"} style={{padding: "2rem"}}>
                {
                    collections.map(collection => (
                        <Grid item xs={12} md={4} key={collection.id}>
                            <div style={{
                                padding: "5rem",
                                textAlign: "center",
                                backgroundColor: "white",
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                {collection.name}
                                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                                    <Diamond></Diamond>
                                    <div>{collection.exp}</div>
                                </div>
                            </div>

                        </Grid>
                    ))
                }

            </Grid>
        </main>
    )
}