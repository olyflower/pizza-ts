import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
	OrdersState,
	Order,
	CreateOrderPayload,
	UpdateOrderPriorityPayload,
} from "../../types/orderTypes";
import { ApiResponse } from "../../types/apiTypes";
import service from "../../services/services";

const initialState: OrdersState = {
	orders: [],
	status: "idle",
	error: null,
};

export const createOrder = createAsyncThunk<
	ApiResponse<Order>,
	CreateOrderPayload,
	{ rejectValue: string }
>("orders/createOrder", async (orderData, { rejectWithValue }) => {
	try {
		const response = await service.post(orderData);
		return response as ApiResponse<Order>;
	} catch (error) {
		return rejectWithValue("Something went wrong");
	}
});

export const updateOrderPriority = createAsyncThunk<
	ApiResponse<Order>,
	{ id: string; priority: boolean },
	{ rejectValue: string }
>(
	"orders/updateOrderPriority",
	async ({ id, priority }, { rejectWithValue }) => {
		try {
			const response = await service.patch(id, { priority });
			return response as Order;
		} catch (error) {
			return rejectWithValue("Something went wrong");
		}
	}
);

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(
				createOrder.fulfilled,
				(state, action: PayloadAction<Order>) => {
					state.status = "succeeded";
					state.orders.push(action.payload.data);
				}
			)
			.addCase(createOrder.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})
			.addCase(updateOrderPriority.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(
				updateOrderPriority.fulfilled,
				(state, action: PayloadAction<Order>) => {
					state.status = "succeeded";
					const updatedOrder = action.payload.data;
					const index = state.orders.findIndex(
						(order) => order.id === updatedOrder.id
					);
					if (index !== -1) {
						state.orders[index] = updatedOrder;
					}
				}
			)
			.addCase(updateOrderPriority.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			});
	},
});

export default ordersSlice.reducer;
