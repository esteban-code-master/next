import { StatusOrder } from '@module/orders/application/types/statusOrder';

export interface StatusOrderCardProps {
	label: string;
	status: StatusOrder[keyof StatusOrder];
}
