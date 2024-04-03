import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("explodingKittenGameToken"),
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
    }
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;