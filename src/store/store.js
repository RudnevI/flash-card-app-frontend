import {configureStore} from "@reduxjs/toolkit";
import profileSlice from "./slicers/profileSlice";

export default configureStore({
    reducer: {
        profile: profileSlice
    }
});