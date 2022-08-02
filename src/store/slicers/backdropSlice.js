import {createSlice} from "@reduxjs/toolkit";

const backdropSlice = createSlice({
    name: "backdrop",
    initialState: {
        value: false
    },
    reducers: {
        setBackdropShown: (state, action) => {
            state.value = action.payload;
        }
    }
})

export default backdropSlice.reducer;
export const {setBackdropShown} = backdropSlice.actions;