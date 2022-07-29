import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
        name: "currentProfile",
        initialState: {
            name: undefined,
            exp: undefined
        },
        reducers: {
            set: function(state, action) {
                state.name = action.payload.name;
                state.exp = action.payload.exp;
            }
        }

    }
)
export default profileSlice.reducer;
export const {set} = profileSlice.actions;