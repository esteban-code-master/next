"use client";
import { useAppSelector } from "@core/store/hooks/hooks";
import {
	HomeIcon,
	QrIcon,
	ShopCartIcon,
	TicketIcon
} from "@module/core/presentation/components/icons/customIcons";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import "./style.css";

export const Toolbar = () => {
	const accountStorage = useAppSelector((state) => state.account);

	console.log("account", accountStorage);
	return (
		<Box className="toolbar">
			<Link
				className=" flex flex-col items-center"
				href={`/${accountStorage.storeId}/${accountStorage.tableNumber}`}
			>
				<HomeIcon />
				<Typography component="span" className="text-[10px] text-text">
					Home
				</Typography>
			</Link>

			<Link className=" flex flex-col items-center" href="/shop-cart">
				<TicketIcon />
				<Typography component="span" className="text-[10px] text-text">
					Ordenes
				</Typography>
			</Link>

			<Link className=" flex flex-col items-center" href="/history-order">
				<ShopCartIcon />
				<Typography component="span" className="text-[10px] text-text">
					Carrito
				</Typography>
			</Link>

			<Link className=" flex flex-col items-center" href="/account">
				<QrIcon />
				<Typography component="span" className="text-[10px] text-text">
					Unir cuentas
				</Typography>
			</Link>
		</Box>
	);
};
