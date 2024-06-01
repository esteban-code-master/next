import { Product } from "@module/business/infrastructure/interface/account";
import { ProductOrderStatus } from "@module/orders/application/const/statusOrder";

export interface StatusOrderCardProps {
	label: string;
	status: ProductOrderStatus;
	products: Product[];
}
