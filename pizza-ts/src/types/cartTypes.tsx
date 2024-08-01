export interface CartItemType {
	id: number;
	name: string;
	unitPrice: number;
	quantity: number;
}

export interface CartState {
	items: CartItemType[];
	totalPrice: number;
	totalItems: number;
}

export interface AddToCartPayload {
	id: number;
	name: string;
	unitPrice: number;
}
