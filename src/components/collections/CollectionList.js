import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Stack, TextField} from "@mui/material";
import {Diamond} from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {createCollection, getCollections, getCollectionsByCriteria} from "../../config/apiMethods";
import {useDispatch, useSelector} from "react-redux";
import ViewTitle from "../ViewTitle";
import {setBackdropShown} from "../../store/slicers/backdropSlice";

export default function CollectionList() {
    const params = useParams();
    const [collections, setCollections] = useState([]);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const [collectionName, setCollectionName] = useState('');
    const [collectionNameAlreadyExists, setCollectionNameAlreadyExists] = useState(false);

    const currentProfile = useSelector(state => state.profile);

    useEffect(() => {
        const get = async () => {
            dispatch(setBackdropShown(true));
            const result = await getCollectionsByCriteria(`?profile_id=${params.profileId}`);
            dispatch(setBackdropShown(false));
            setCollections(result);
        }

        get();


    }, [params.profileId, dispatch]);


    useEffect(() => {
        const getCollectionByName = async () => {
            const result = await getCollectionsByCriteria(`?name=${collectionName}`);
            setCollectionNameAlreadyExists(result.length > 0)
        }
        getCollectionByName();
    }, [collectionName])


    const saveCollection = async () => {
        const result = await createCollection({
            name: collectionName,
            profile_id: currentProfile.id,
            exp: 0
        })
        setCollections([...collections, result]);
    }

    return (
        <main>
            <ViewTitle textContent="Collections">

            </ViewTitle>
            <Dialog open={open}>
                <DialogTitle>
                    Create collection
                </DialogTitle>
                <DialogContent>

                    <TextField
                        fullWidth
                        required
                        label="Collection name"
                        style={{marginTop: "1rem"}}
                        onChange={(event) => setCollectionName(event.target.value)}
                    >

                    </TextField>


                    <Stack spacing={1} direction="row" style={{marginTop: "1rem"}}>
                        <Button disabled={collectionName === '' || collectionNameAlreadyExists}
                                onClick={() => saveCollection()}
                        >Save</Button>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Grid container spacing={"2rem"} style={{padding: "2rem"}}>
                {
                    collections.map(collection => (
                        <Grid item xs={12} md={4} key={collection.id}>
                            <Link to={`/collection/${collection.id}`} style={{
                                padding: "5rem",
                                textAlign: "center",
                                backgroundColor: "white",
                                display: "flex",
                                justifyContent: "space-between",
                                textDecoration: "none",
                                color: "black"
                            }}
                            state={{name: collection.name}}

                            >
                                {collection.name}
                                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <Diamond></Diamond>
                                    <div>{collection.exp}</div>
                                </div>
                            </Link>

                        </Grid>

                    ))
                }

            </Grid>
            <div style={{display: "flex", justifyContent: "center", backgroundColor: "#b8bfba", width: '100%'}}>
                <IconButton aria-label="add new profile" component="label" onClick={() => setOpen(true)}>

                    <AddCircleIcon></AddCircleIcon>
                </IconButton>
            </div>
        </main>
    )
}