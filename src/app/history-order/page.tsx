'use client';
import { AccountApi } from '@module/business/infrastructure/api/account';
import { StatusOrder } from '@module/orders/application/const/statusOrder';
import { StatusOrderCard } from '@module/orders/presentation/components/statusOrderCard';
import { Box, Typography } from '@mui/material';
import { useContainer } from 'inversify-react';

const HistoryOrderPage = () => {
	const container = useContainer();
	const getProduct = container.get<AccountApi>('AccountApi');

	console.log(getProduct.get());

	return (
		<Box>
			<Typography variant="h1" className="font-semibold">
				Historial de Ordenes
			</Typography>
			<Box component="div" className="">
				<StatusOrderCard status={StatusOrder.ok} label="Estatus de la orden" />
			</Box>
		</Box>
	);
};

export default HistoryOrderPage;
