'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// import { useSocket } from '@socket/hooks/use-socket';
import {
	HomeIcon,
	QrIcon,
	ShopCartIcon,
	TicketIcon
} from '@module/core/presentation/components/icons/customIcons';
import { Box, Typography } from '@mui/material';
import './style.css';

export const Toolbar = () => {
	// const socket = io(configEnvironment.API_QUICKLY_SERVICE_WEBSOCKET);
	const [store, setStore] = useState({
		storeId: '',
		tableId: ''
	});

	// const socketRef = useSocket();

	useEffect(() => {
		// const getStore = JSON.parse(localStorage.getItem('store') ?? '{}');
		// if (getStore && getStore != '{}') {
		// 	setStore(getStore);
		// }
	}, []);

	return (
		<Box className="toolbar">
			<Link
				className=" flex flex-col items-center"
				href={`/${store.storeId}/${store.tableId}`}
			>
				<HomeIcon />
				<Typography component="span" className="text-[10px] text-text">
					Home
				</Typography>
			</Link>

			<Link className=" flex flex-col items-center" href="/contact-us">
				<TicketIcon />
				<Typography component="span" className="text-[10px] text-text">
					Ordenes
				</Typography>
			</Link>

			<Link className=" flex flex-col items-center" href="/shop-cart">
				<ShopCartIcon />
				<Typography component="span" className="text-[10px] text-text">
					Carrito
				</Typography>
			</Link>

			<Link className=" flex flex-col items-center" href="/shop-cart">
				<QrIcon />
				<Typography component="span" className="text-[10px] text-text">
					Unir cuentas
				</Typography>
			</Link>
		</Box>
	);
};
