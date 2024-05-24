export interface ProductDetail {
	productId: string;
	specialOrder: string;
	status: boolean;
	name: string;
	price: number;
	key: string;
	_id: string;
}

export interface SubProduct {
	name: string;
	image: string;
	description: string;
	price: number;
	key: string;
	default: boolean;
	status: boolean;
	detail: ProductDetail[];
}

export interface Product {
	_id: string;
	subProduct: SubProduct[];
	storeId: string;
	areaId: string;
	categoryId: string[];
	status: boolean;
	check: boolean;
	__v: number;
}

export interface Order {
	_id: string;
	product: Product[];
	status: string;
	dateStart: Date;
	accountId: string;
	__v: number;
}

export interface OrdersResponse {
	orders: Order[];
}
