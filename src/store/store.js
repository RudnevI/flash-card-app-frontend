import {combineReducers, configureStore} from "@reduxjs/toolkit";
import profileSlice from "./slicers/profileSlice";
import backdropSlice from "./slicers/backdropSlice";
import lessonModeSlice from "./slicers/lessonModeSlice";

const reducer = combineReducers({
    profile: profileSlice,
    backdrop: backdropSlice,
    lessonMode: lessonModeSlice

})

const store =  configureStore({reducer});
export default store;