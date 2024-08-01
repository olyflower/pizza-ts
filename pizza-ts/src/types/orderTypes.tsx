export interface Order {
  id: string;
  customer: string;
  phone?: string;
  address?: string;
  priority: boolean;
  status: string;
  cart: {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    addIngredients: string[];
    removeIngredients: string[];
  }[];
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
}

export interface OrdersState {
	orders: Order[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}

export interface CreateOrderPayload {
	customer: string;
	phone?: string;
	address?: string;
	priority: boolean;
	position?: string; 
	cart: {
			pizzaId: number;
			name: string;
			quantity: number;
			unitPrice: number;
			totalPrice: number;
	}[];
}

export interface UpdateOrderPriorityPayload {
	id: string;
	priority: boolean;
}
