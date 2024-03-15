import { formatCurrency } from '@module/core/application/utils/currency/format';
import { StatusOrder } from '@module/orders/application/const/statusOrder';
import { ProductOrderCard } from '@module/product/presentation/components/productOrderCard';
import { Box, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { StatusOrderDelivered } from '../statusOrderIcon/delivered';
import { StatusOrderPreparing } from '../statusOrderIcon/preparing';
import { StatusOrderCardProps } from './statusOrderCardProps';

const SwitchStatusOrderIcon: FunctionComponent<{ status: any }> = ({
	status
}) => {
	if (status === StatusOrder.preparing) return <StatusOrderPreparing />;
	if (status === StatusOrder.ok) return <StatusOrderDelivered />;
};

export const StatusOrderCard: FunctionComponent<StatusOrderCardProps> = (
	props
) => {
	const { label, status } = props;

	return (
		<Box>
			<Box
				component="div"
				className="bg-[#EBF0F3] p-4 rounded-t-lg flex justify-between items-center"
			>
				<Typography className="text-title font-semibold	text-[14px]">
					Estatus de la Orden
				</Typography>

				<SwitchStatusOrderIcon status={status} />
			</Box>
			<Box component="div" className="">
				<ProductOrderCard />
				<ProductOrderCard />
				<ProductOrderCard />
				<Box
					component="div"
					className="flex items-center justify-between bg-white p-4  rounded-b-lg"
				>
					<Typography className="text-title font-bold">Total</Typography>
					<Typography className="text-title font-bold text-[24px]">
						{formatCurrency(200)}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
