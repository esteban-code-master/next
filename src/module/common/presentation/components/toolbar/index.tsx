"use client";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HomeIcon from "@mui/icons-material/Home";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useEffect, useState } from "react";

// import { useSocket } from '@socket/hooks/use-socket';
import "./style.css";

export const Toolbar = () => {
	// const socket = io(configEnvironment.API_QUICKLY_SERVICE_WEBSOCKET);
	const [store, setStore] = useState({
		storeId: "",
		tableId: "",
	});

	// const socketRef = useSocket();

	useEffect(() => {
		// const getStore = JSON.parse(localStorage.getItem('store') ?? '{}');
		// if (getStore && getStore != '{}') {
		// 	setStore(getStore);
		// }
	}, []);

	return (
		<div className="tollbar">
			<Link
				className="tollbar-item"
				href={`/${store.storeId}/${store.tableId}`}
			>
				<HomeIcon sx={{ color: "black" }} />
			</Link>

			<Link
				className="tollbar-item"
				href=""
				onClick={() => {
					// socketRef.current?.emit(`notification`, {
					// 	storeId: store.storeId,
					// 	tableId: store.tableId
					// });
				}}
			>
				<PhoneEnabledIcon sx={{ color: "black" }} />
			</Link>

			<Link className="tollbar-item" href="/contact-us">
				<ContactMailIcon sx={{ color: "black" }} />
			</Link>

			<Link className="tollbar-item" href="/shop-cart">
				<ShoppingCartIcon sx={{ color: "black" }} />
			</Link>

			<CameraAltIcon sx={{ color: "black" }} />
		</div>
	);
};
