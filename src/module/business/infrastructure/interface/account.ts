import { ProductOrderStatus } from "@module/orders/application/const/statusOrder";

export interface AccountResponse {
	_id: string;
	storeId: string;
	clientName: string;
	tableNumber: number;
	accounts: AccountResponse[];
	cluster: string[];
	payment: string;
	total: number;
	douceur: number;
	dateStart: string;
	orders: Order[];
}

export interface Order {
	_id: string;
	status: string;
	dateStart: string;
	dateEnd?: string;
	products: Product[];
}

export interface Product {
	_id: string;
	name: string;
	image: string;
	price: number;
	total: number;
	upgrade: any[];
	specialOrder: string;
	status: ProductOrderStatus;
	unique: string;
}
