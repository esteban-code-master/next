import { StatusOrder as StatusOrderType } from "../types/statusOrder";

export const StatusOrder: StatusOrderType  = {
	preparing:  '@order/preparing',
	ok: '@order/ok'
}

export enum ProductOrderStatus {
	PENDING = 'PENDING',
	PROCESSING = 'PROCESSING',
	PREPARING = 'PREPARING',
	DELIVERING = 'DELIVERING',
	DELIVERED = 'DELIVERED',
	CANCELED = 'CANCELED'
}
