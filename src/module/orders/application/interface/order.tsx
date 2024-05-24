export interface Order {
	accountId: string;
	product: Array<ProductOrder>;
}

export interface ProductOrder {
	productId: string;
	key?: string;
	specialOrder?: string;
	name: string;
	price: number;
	count: number;
}
