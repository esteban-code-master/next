import { SubProduct } from "@module/product/application/interface/product";

export interface Order {
	accountId: string;
	products: Array<ProductOrder>;
}

export interface ProductOrder {
	productId: string;
	specialOrder?: string;
	name: string;
	price: number;
	count: number;
	upgrade: SubProduct[];
}
