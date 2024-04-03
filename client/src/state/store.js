import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./user/tokenSlice";
import userReducer from "./user/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { registerApi, loginApi, leaderboardApi, fetchUserApi, saveGameApi } from "./api";


const apis = [registerApi, loginApi, leaderboardApi, fetchUserApi, saveGameApi];

const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
        [registerApi.reducerPath] : registerApi.reducer,
        [loginApi.reducerPath] : loginApi.reducer,
        [leaderboardApi.reducerPath] : leaderboardApi.reducer,
        [fetchUserApi.reducerPath] : fetchUserApi.reducer,
        [saveGameApi.reducerPath] : saveGameApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(apis.flatMap(api => api.middleware)),
});

setupListeners(store.dispatch);

export default store;