import { configEnvironment } from "@core/environment";
import { formatCurrency } from "@module/core/application/utils/currency/format";
import { ProductOrderStatus } from "@module/orders/application/const/statusOrder";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { FunctionComponent } from "react";
import { ProductOrderCardProps } from "./productOrderCardProps";

const ProductOrderCard: FunctionComponent<ProductOrderCardProps> = (props) => {
	const { product } = props;

	return (
		<Box
			component="div"
			className="bg-white p-4  flex border-b-[#D3DEE4] border-b-2"
		>
			<Box component="div" className="relative w-[60px] h-[60px] me-5 rounded-lg">
				<Image
					className="rounded-lg w-full h-full"
					alt=""
					width="48"
					height="48"
					src={`${configEnvironment.CONTAINER_IMAGES_SHOPS}/${product.image}`}
				/>
				{product.status === ProductOrderStatus.CANCELED && (
					<div className="bg-[#000] rounded-lg opacity-60 absolute w-full h-full top-0 left-0"></div>
				)}
			</Box>
			{/* {`${configEnvironment.CONTAINER_IMAGES_SHOPS}/${product.image}`} */}
			<Box component="div" className="flex flex-col justify-between flex-1">
				<Typography className="font-bold text-title">{product.name}</Typography>
				<Typography className="text-blue-dark">
					{/* {product.length} orden */}
				</Typography>
			</Box>
			<Box component="div">
				{product.status === ProductOrderStatus.CANCELED ? (
					<div className="bg-[#7F9FB1] rounded-lg py-1 px-4 text-[12px] text-white">
						Cancelado
					</div>
				) : (
					<Typography className="text-title">
						{formatCurrency(product.price)}
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export { ProductOrderCard };
