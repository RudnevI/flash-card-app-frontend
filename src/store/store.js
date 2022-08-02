import {combineReducers, configureStore} from "@reduxjs/toolkit";
import profileSlice from "./slicers/profileSlice";
import backdropSlice from "./slicers/backdropSlice";

const reducer = combineReducers({
    profile: profileSlice,
    backdrop: backdropSlice
})

const store =  configureStore({reducer});
export default store;