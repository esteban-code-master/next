import { ProductOrderStatus } from "@module/orders/application/const/statusOrder";
import { ProductOrderCard } from "@module/product/presentation/components/productOrderCard";
import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { StatusOrderDelivered } from "../statusOrderIcon/delivered";
import { StatusOrderPreparing } from "../statusOrderIcon/preparing";
import { StatusOrderCardProps } from "./statusOrderCardProps";

const SwitchStatusOrderIcon: FunctionComponent<{ status: any }> = ({
	status
}) => {
	if (status === ProductOrderStatus.PROCESSING) return <StatusOrderPreparing />;
	if (status === ProductOrderStatus.DELIVERED) return <StatusOrderDelivered />;
};

export const StatusOrderCard: FunctionComponent<StatusOrderCardProps> = (
	props
) => {
	const { label, status, products } = props;

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
				{products &&
					products.map((product, index) => (
						<ProductOrderCard product={product} key={index} />
					))}
				{/* <Box
					component="div"
					className="flex items-center justify-between bg-white p-4  rounded-b-lg"
				>
					<Typography className="text-title font-bold">Subtotal</Typography>
					<Typography className="text-title font-bold text-[16px]">
						{formatCurrency(sumarPrecios(products))}
					</Typography>
				</Box> */}
			</Box>
		</Box>
	);
};
