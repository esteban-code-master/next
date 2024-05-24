'use client';
import { useAppDispatch, useAppSelector } from '@core/store/hooks/hooks';
import { deleteItemShopCart, resetShopCart } from '@core/store/slice/shopCart';
import { ProductOrder } from '@module/orders/application/interface/order';
import { OrderApi } from '@module/orders/infrastructure/api/order';
import { ReviewOrderCard } from '@module/orders/presentation/components/reviewOrderCard';
import { Box, Button, Typography } from '@mui/material';
import { useContainer } from 'inversify-react';
import { useRouter } from 'next/navigation';

const Page = () => {
	const shopCartStore = useAppSelector((state) => state.shopCart);
	const dispatch = useAppDispatch();
	const container = useContainer();
	const orderApi = container.get<OrderApi>('OrderApi');
	const accountStore = useAppSelector((state) => state.account);

	console.log(shopCartStore);
	const router = useRouter();
	return (
		<div className="p-4 flex-1">
			<Typography variant="h1" className="font-bold text-[22px] my-4">
				Resumen de ordenes
			</Typography>
			<Box component={'div'} className="flex flex-col gap-5 h-full">
				{shopCartStore &&
					shopCartStore.map((product, index) => (
						<ReviewOrderCard
							productSelect={product}
							key={index}
							deleteProduct={() => {
								dispatch(deleteItemShopCart(index));
							}}
						/>
					))}
			</Box>

			<Button
				fullWidth
				sx={{ margin: '30px 0' }}
				className="bg-primary text-white rounded-[16px]"
				variant="contained"
				onClick={async () => {
					console.log(
						'productos listo para guardarse ===>',
						shopCartStore,
						accountStore
					);
					const product: ProductOrder[] = shopCartStore.map((shopCart) => ({
						productId: shopCart._id ?? '',
						key: shopCart.key ?? '',
						specialOrder: shopCart.note,
						name: shopCart.name,
						price: shopCart.price,
						count: shopCart.count
					}));

					if (accountStore.id) {
						const response = await orderApi.post({
							accountId: accountStore.id,
							product: product
						});

						console.log(response);

						dispatch(resetShopCart());
						router.push('history-order');
					}
				}}
			>
				<Typography component={'span'}> Realizar pedido</Typography>
			</Button>
		</div>
	);
};

export default Page;
