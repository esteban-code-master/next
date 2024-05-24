import { configEnvironment } from '@core/environment';
import { formatCurrency } from '@module/core/application/utils/currency/format';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { ProductOrderCardProps } from './productOrderCardProps';

const image =
	'public/images/shops/Boneless-871642d1-d8cb-4805-88fc-04fc6c134a9a/202-tortas-de-jamoÌn-y-queso-fbf3-1703640186435.jpg';
const ProductOrderCard: FunctionComponent<ProductOrderCardProps> = (props) => {
	const { product } = props;

	return (
		<Box
			component="div"
			className="bg-white p-4  flex border-b-[#D3DEE4] border-b-2"
		>
			<Image
				className="rounded-lg w-[50px] h-[50px] me-5"
				alt=""
				width="48"
				height="48"
				src={`${configEnvironment.CONTAINER_IMAGES_SHOPS}/${product.subProduct[0].image}`}
			/>
			<Box component="div" className="flex flex-col justify-between flex-1">
				<Typography className="font-bold text-title">
					{product.subProduct[0].name}
				</Typography>
				<Typography className="text-blue-dark">
					{product.subProduct.length} orden
				</Typography>
			</Box>
			<Box component="div">
				<Typography className="text-title">
					{formatCurrency(product.subProduct[0].price)}
				</Typography>
			</Box>
		</Box>
	);
};

export { ProductOrderCard };
