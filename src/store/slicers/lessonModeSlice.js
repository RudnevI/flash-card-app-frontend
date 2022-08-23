import {createSlice} from "@reduxjs/toolkit";

const lessonModeSlice = createSlice({
    name: "lessonMode",
    initialState: {
        lessonMode: localStorage.getItem("lessonModeOn") || false
    },
    reducers: {
        toggle: function (state) {
            state.lessonMode = !state.lessonMode;
            localStorage.setItem("lessonModeOn", state.lessonMode);
        }
    }
})

export default lessonModeSlice.reducer;
export const {toggle} = lessonModeSlice.actions;