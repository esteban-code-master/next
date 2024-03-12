'use client';

import React, { FunctionComponent, useState } from 'react';

import { configEnvironment } from '@core/environment';
import { formatCurrency } from '@module/core/application/utils/currency/format';
import { IProduct } from '@module/product/application/interface/product';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { ProductDetailSwipeable } from '../productDetailSwipeable';
import { ProductMenuCardProps } from './productMenuCardProps';

export const ProductMenuCard: FunctionComponent<ProductMenuCardProps> = (
	props
) => {
	const { product } = props;

	const [openDrawer, setOpenDrawer] = useState(false);
	const [selectProduct, setSelectProduct] = useState<IProduct>({} as IProduct);

	return (
		<React.Fragment>
			{selectProduct?.default && (
				<ProductDetailSwipeable
					product={selectProduct}
					anchor="bottom"
					open={openDrawer}
					onClose={() => setOpenDrawer(false)}
					onOpen={() => setOpenDrawer(true)}
				/>
			)}

			<Box
				component={'div'}
				className="flex bg-white rounded-lg text-[#131718] justify-between p-4"
				onClick={() => {
					setSelectProduct(product);
					setOpenDrawer(true);
				}}
			>
				<Box>
					<Typography className="text-d font-bold">
						{product.default.name}
					</Typography>
					<Typography className="text-sm">{product.default.description}</Typography>
					<Typography className="text-sm mt-5">
						{formatCurrency(product.default.price)}
					</Typography>
				</Box>
				<Box>
					<Image
						className="rounded-lg"
						alt=""
						width="100"
						height="140"
						src={`${configEnvironment.CONTAINER_IMAGES_SHOPS}/${product.default.image}`}
					/>
				</Box>
			</Box>
		</React.Fragment>
	);
};
