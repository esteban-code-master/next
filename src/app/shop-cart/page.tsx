'use client';
import { useAppSelector } from '@core/store/hooks/hooks';
import { ReviewOrderCard } from '@module/orders/presentation/components/reviewOrderCard';
import { Box, Button, Typography } from '@mui/material';

const Page = () => {
	const shopCartStore = useAppSelector((state) => state.shopCart);

	console.log(shopCartStore);
	return (
		<div className="p-4 h-full">
			<Typography variant="h1" className="font-bold text-[22px] my-4">
				Resumen de ordenes
			</Typography>
			<Box component={'div'} className="flex flex-col gap-5">
				{shopCartStore &&
					shopCartStore.map((product, index) => (
						<ReviewOrderCard productSelect={product} key={index} />
					))}
			</Box>

			<Button
				fullWidth
				sx={{ margin: '30px 0' }}
				className="bg-primary text-white rounded-[16px]"
				variant="contained"
			>
				<Typography component={'span'}> Realizar pedido</Typography>
			</Button>
		</div>
	);
};

export default Page;
