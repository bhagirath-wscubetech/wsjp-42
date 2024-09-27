import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name: "User",
        initialState: {
            data: null,
            token: null
        },
        reducers: {
            login(state, action) {
                state.data = action.payload.data;
                state.token = action.payload.token;
                localStorage.setItem("user", JSON.stringify(action.payload.data));
                localStorage.setItem("user-token", action.payload.token);
                localStorage.setItem("user-login-stamp", new Date().getTime());
            },
            logout(state) {
                state.data = null;
                localStorage.removeItem("user");
                localStorage.removeItem("user-login-stamp");
            },
            lsToUser(state) {
                const lsUser = localStorage.getItem("user");
                const lsToken = localStorage.getItem("user-token");
                if (lsUser && lsToken) {
                    state.data = JSON.parse(lsUser);
                    state.token = lsToUser;
                }
            }
        }
    }
);

export const { login, logout, lsToUser } = UserSlice.actions;
export default UserSlice.reducer;
