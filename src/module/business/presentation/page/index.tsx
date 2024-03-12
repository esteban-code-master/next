'use client';
import { useAppSelector } from '@core/store/hooks/hooks';
import { IProduct } from '@module/product/application/interface/product';
import { ProductMenuCard } from '@module/product/presentation/components/productMenuCard';
import { AccountOpen } from '../components/account-open';
import { useGetProduct } from '../hooks/use-get-product';

export const BusinessPage = () => {
	const account = useAppSelector((state) => state.account);
	const products = useGetProduct();

	return (
		<>
			{!account.clientName && <AccountOpen />}

			{products &&
				products.map((product: IProduct, index: number) => (
					<ProductMenuCard key={index} product={product} />
				))}
		</>
	);
};
