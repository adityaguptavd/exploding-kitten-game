import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || '/api/v1';

export const registerApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl}),
    reducerPath: "registerApi",
    tagTypes: ["Token"],
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: ({body}) => ({
                url: "/auth/register",
                method: 'POST',
                body,
                headers: {'content-type': 'application/json'}
            }),
            invalidatesTags: ["Token"]
        }),
    })
});

export const loginApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl}),
    reducerPath: "loginApi",
    tagTypes: ["Token"],
    endpoints: (build) => ({
        getToken: build.mutation({
            query: ({body}) => ({
                url: "/auth/login",
                method: 'POST',
                body,
                headers: {'content-type': 'application/json'},
            }),
            invalidatesTags: ["Token"]
        }),
    })
});

export const leaderboardApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    reducerPath: "leaderboardApi",
    tagTypes: ["Leaderboard"],
    endpoints: (build) => ({
        getLeaderboard: build.query({
            query: ({token}) => ({
                url: "/game/leaderboard",
                method: "GET",
                headers: {token},
            }),
        }),
    })
});

export const fetchUserApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    reducerPath: "fetchUserApi",
    tagTypes: ["User"],
    endpoints: (build) => ({
        fetchUser: build.query({
            query: ({token}) => ({
                url: "/game/fetchUser",
                method: "GET",
                headers: {token},
            }),
        }),
    })
});

export const saveGameApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl}),
    reducerPath: "saveGameApi",
    tagTypes: ["Save"],
    endpoints: (build) => ({
        saveGame: build.mutation({
            query: ({token, body}) => ({
                url: "/game/saveGame",
                method: 'PATCH',
                body,
                headers: {'content-type': 'application/json', token},
            }),
            invalidatesTags: ["Save"]
        }),
    })
});

export const { useRegisterUserMutation } = registerApi;
export const { useGetTokenMutation } = loginApi;
export const { useGetLeaderboardQuery } = leaderboardApi;
export const { useFetchUserQuery } = fetchUserApi;
export const { useSaveGameMutation } = saveGameApi;