import {createSlice} from "@reduxjs/toolkit";

const profileSlice = createSlice({
        name: "currentProfile",
        initialState: {
            name: undefined,
            exp: undefined,
            id: undefined
        },
        reducers: {
            set: function(state, action) {
                state.name = action.payload.name;
                state.exp = action.payload.exp;
                state.id = action.payload.id;
            }
        }

    }
)
export default profileSlice.reducer;
export const {set} = profileSlice.actions;