import { AccountApi } from '@module/business/infrastructure/api/account';
import { formatCurrency } from '@module/core/application/utils/currency/format';
import { StatusOrder } from '@module/orders/application/const/statusOrder';
import { Order } from '@module/orders/application/interface/order-response';
import { ProductOrderCard } from '@module/product/presentation/components/productOrderCard';
import { Box, Typography } from '@mui/material';
import { useContainer } from 'inversify-react';
import { FunctionComponent, useEffect, useState } from 'react';
import { StatusOrderDelivered } from '../statusOrderIcon/delivered';
import { StatusOrderPreparing } from '../statusOrderIcon/preparing';
import { StatusOrderCardProps } from './statusOrderCardProps';

const SwitchStatusOrderIcon: FunctionComponent<{ status: any }> = ({
	status
}) => {
	if (status === StatusOrder.preparing) return <StatusOrderPreparing />;
	if (status === StatusOrder.ok) return <StatusOrderDelivered />;
};

function sumarPrecios(orders) {
	let total = 0;

	// Recorremos cada pedido
	orders.forEach((order) => {
		// Recorremos cada producto en el pedido
		order.product.forEach((product) => {
			// Recorremos cada subproducto y sumamos su precio
			product.subProduct.forEach((subProduct) => {
				total += subProduct.price;
			});
		});
	});

	return total;
}

export const StatusOrderCard: FunctionComponent<StatusOrderCardProps> = (
	props
) => {
	const { label, status } = props;

	const [orders, setOrders] = useState<Order[]>([]);
	const container = useContainer();
	const api = container.get<AccountApi>('AccountApi');

	useEffect(() => {
		api.get().then((response) => {
			console.log('resonise', response.data);

			setOrders(response.data.response[0].orders);
		});
	}, []);

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
				{orders &&
					orders.map((order) =>
						order.product.map((product, index) => (
							<ProductOrderCard product={product} key={index} />
						))
					)}
				<Box
					component="div"
					className="flex items-center justify-between bg-white p-4  rounded-b-lg"
				>
					<Typography className="text-title font-bold">Total</Typography>
					<Typography className="text-title font-bold text-[24px]">
						{formatCurrency(sumarPrecios(orders))}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
