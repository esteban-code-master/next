"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import "./header.css";
export const Header = () => {
	// const storeApi = useMemo(() => new StoreService(), []);
	// const [store, setStore] = useState<IStore>();

	useEffect(() => {
		// const getStore = JSON.parse(localStorage.getItem('store') ?? '{}');
		// if (getStore.storeId) {
		// 	const fetch = async () => {
		// 		const response = await storeApi.getOne(getStore.storeId as string);
		// 		setStore(response.response);
		// 	};
		// 	fetch();
		// }
	}, []);

	return (
		<div className="navbar">
			<div className="navbar-logo">
				<Image
					width={82}
					height={32}
					alt=""
					src={"/icons/quickly.png"}
				/>
				{/* <span>{store?.name}</span> */}
			</div>
			<Link href="/resumen" className="navbar-count">
				<Image width={30} height={30} alt="" src={"/icons/call.svg"} />
				<span className="navbar__title">Mesero</span>
			</Link>
		</div>
	);
};
