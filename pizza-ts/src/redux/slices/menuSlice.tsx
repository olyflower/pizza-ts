import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import service from "../../services/services";
import { MenuItem } from "../../types/menuTypes";
import { ApiResponse } from "../../types/apiTypes";

interface MenuState {
	items: MenuItem[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

const initialState: MenuState = {
	items: [],
	status: "idle",
	error: null,
};

export const getData = createAsyncThunk<
	ApiResponse<MenuItem[]>, 
	void,
	{ rejectValue: string }
>("menu/getData", async (_, { rejectWithValue }) => {
	try {
		const response: ApiResponse<MenuItem[]> = await service.get();
		return response; 
	} catch (error) {
		return rejectWithValue("Failed to fetch data");
	}
});

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				getData.fulfilled,
				(state, action: PayloadAction<ApiResponse<MenuItem[]>>) => {
					state.status = "succeeded";
					state.items = action.payload.data;
				}
			)
			.addCase(getData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message || "Failed to fetch";
			});
	},
});

export default menuSlice.reducer;
export const selectMenu = (state: { menu: MenuState }) => state.menu;
