'use client';

import { configEnvironment } from '@core/environment';
import { formatCurrency } from '@module/core/application/utils/currency/format';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { ReviewOrderCardProps } from './reviewOrderCardProps';

export const ReviewOrderCard: FunctionComponent<ReviewOrderCardProps> = (
	props
) => {
	const { productSelect, deleteProduct } = props;

	return (
		<Box component={'div'} className="bg-white flex rounded-lg p-4">
			<Image
				className="rounded-lg w-[70px] h-[70px] me-5"
				alt=""
				width="48"
				height="48"
				src={`${configEnvironment.CONTAINER_IMAGES_SHOPS}/${productSelect.image}`}
			/>
			<Box component={'div'} className="me-4">
				<Typography className="font-bold mb-3">{productSelect.name}</Typography>
				<Typography className="text-blue-dark">
					{productSelect.description}
				</Typography>
				<Typography className="text-blue-dark">
					{' '}
					Cantidad: {productSelect.count}
				</Typography>
				<Typography className="mt-3  font-bold">
					{' '}
					Total: {formatCurrency(productSelect.price)}
				</Typography>
			</Box>
			<div className="flex-1 flex  flex-col items-end w-[40px]">
				<Button className="bg-[#EBF0F3] rounded-xl py-4" onClick={deleteProduct}>
					<DeleteIcon className="text-[black]" />
				</Button>
			</div>
		</Box>
	);
};
