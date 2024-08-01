export interface MenuItem {
	id: number;
	name: string;
	unitPrice: number;
	imageUrl: string;
	ingredients: string[];
	soldOut: boolean;
}

export interface MenuState {
	items: MenuItem[];
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}
