import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    firstname: "",
    lastname: "",
    wonMatches: 0,
    loseMatches: 0,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.wonMatches = action.payload.wonMatches;
            state.loseMatches = action.payload.loseMatches;
            state.username = action.payload.username;
        },
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;