'use client';

import { GetProduct } from '@module/business/infrastructure/api/get-product';
import { IProduct } from '@module/product/application/interface/product';
import { useContainer } from 'inversify-react';
import { useEffect, useState } from 'react';

export const useGetProduct = () => {
	const [product, setProduct] = useState<IProduct[]>();
	const container = useContainer();
	const getProduct = container.get<GetProduct>('GetProduct');

	useEffect(() => {
		getProduct.execute().then((response: any) => {
			if (response.data.headers.success) {
				setProduct(response.data.response);
			}
		});
	}, []);

	return product;
};
