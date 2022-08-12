import {createSlice} from "@reduxjs/toolkit";

const lessonModeSlice = createSlice({
    name: "lessonMode",
    initialState: {
        lessonMode: false
    },
    reducers: {
        toggle: function (state) {
            state.lessonMode = !state.lessonMode;
        }
    }
})

export default lessonModeSlice.reducer;
export const {toggle} = lessonModeSlice.actions;