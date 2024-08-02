import { API_DATA, API_ORDER } from "../constants/constants";
import { MenuItem } from "../types/menuTypes";
import {
	CreateOrderPayload,
	Order,
	UpdateOrderPriorityPayload,
} from "../types/orderTypes";
import { ApiResponse } from "../types/apiTypes";

const service = {
	get: async (id?: number): Promise<ApiResponse<MenuItem[]>> => {
		try {
			const request = await fetch(id ? `${API_DATA}/${id}` : API_DATA);
			if (!request.ok) {
				throw new Error(`Error status: ${request.status}`);
			}
			const response: ApiResponse<MenuItem[]> = await request.json();
			return response;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	post: async (
		orderData: CreateOrderPayload
	): Promise<ApiResponse<Order>> => {
		try {
			const request = await fetch(API_ORDER, {
				method: "POST",
				body: JSON.stringify(orderData),
				headers: {
					"Content-type": "application/json",
				},
			});
			if (!request.ok) {
				const errorResponse = await request.text();
				console.error("Error response text:", errorResponse);
				throw new Error(`Error status: ${request.status}`);
			}
			const response = await request.json();
			return response;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},

	patch: async (
		id: string,
		updateData: UpdateOrderPriorityPayload
	): Promise<ApiResponse<Order>> => {
		try {
			const response = await fetch(`${API_ORDER}/${id}`, {
				method: "PATCH",
				body: JSON.stringify(updateData),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`Error status: ${response.status}`);
			}
			const data: ApiResponse<Order> = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default service;
