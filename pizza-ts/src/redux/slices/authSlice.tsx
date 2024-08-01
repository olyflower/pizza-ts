import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload } from "../../types/authTypes";

const initialState: AuthState = {
	isAuth: false,
	userName: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<LoginPayload>) => {
			state.isAuth = true;
			state.userName = action.payload.userName;
		},
		logout: (state) => {
			state.isAuth = false;
			state.userName = "";
		},
	},
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
