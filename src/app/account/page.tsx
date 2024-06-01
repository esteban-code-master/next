"use client";

import { configEnvironment } from "@core/environment";
import { useAppSelector } from "@core/store/hooks/hooks";
import CreditScoreSharpIcon from "@mui/icons-material/CreditScoreSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
// import { QrReader } from "react-qr-reader";
import { AccountApi } from "@module/business/infrastructure/api/account";
import { AccountResponse } from "@module/business/infrastructure/interface/account";
import { useContainer } from "inversify-react";
import QRCode from "qrcode.react";
import QrReader from "react-web-qr-reader";

export interface QrReaderProps {
	data: string;
}

const Page = () => {
	const [openScanner, setOpenScanner] = useState<boolean>(false);
	const [openQr, setOpenQr] = useState<boolean>(false);
	const [account, setAccount] = useState<AccountResponse>();
	const [refresh, setRefresh] = useState<boolean>(false);

	const container = useContainer();
	const getProduct = container.get<AccountApi>("AccountApi");

	const accountStorage = useAppSelector((state) => state.account);

	const previewStyle = {
		height: 300,
		width: "100%",
		background: "white"
	};

	useEffect(() => {
		const fetch = async () => {
			const accountResponse = await getProduct.get();

			setAccount(accountResponse);
		};

		fetch();
	}, [refresh]);

	const [error, setError] = useState(null);

	const handleError = useCallback((err: any) => {
		setError(err);
	}, []);

	const handleScan = useCallback(async (data: QrReaderProps) => {
		if (data) {
			const body = {
				cluster: data.data
			};

			await fetch(
				`${configEnvironment.API_QUICKLY_SERVICE}/account/${accountStorage.id}/cluster`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
				}
			);

			setOpenScanner(false);
		}
	}, []);

	const deleteClusterAccount = async (accountId: string) => {
		await fetch(
			`${configEnvironment.API_QUICKLY_SERVICE}/account/${accountStorage.id}/cluster/${accountId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		setRefresh(!refresh);
	};

	return (
		<Box component="div" className="p-4">
			{account &&
				account.accounts.map((cluster) => (
					<List sx={{ width: "100%", bgcolor: "background.paper" }}>
						<ListItem
							secondaryAction={
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={() => deleteClusterAccount(cluster._id)}
								>
									<DeleteSharpIcon sx={{ color: "red" }} />
								</IconButton>
							}
						>
							<ListItemAvatar>
								<Avatar className="bg-[#0e4a4d]">
									<CreditScoreSharpIcon sx={{ color: "white" }} />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={
									<Typography className="font-bold">{cluster.clientName}</Typography>
								}
								secondary={cluster._id}
							/>
						</ListItem>
					</List>
				))}

			{openScanner && (
				<Box
					component="div"
					className="fixed top-0 left-0 w-full h-full z-50 flex flex-col justify-between bg-[#000]"
				>
					<Box component="div" className="flex-1 flex items-center p-4">
						<QrReader
							className="relative"
							style={previewStyle}
							onError={handleError}
							onScan={handleScan}
						/>
					</Box>

					<Box component="div" className="p-4">
						<Button
							className="bg-primary text-white rounded-lg"
							fullWidth
							onClick={() => {
								setOpenScanner(false);
							}}
						>
							Cerrar
						</Button>
					</Box>
				</Box>
			)}

			{accountStorage.id && openQr && (
				<Box
					component="div"
					className="p-4 fixed top-0 left-0 w-full h-full z-50 flex flex-col  justify-between items-center bg-white"
				>
					<Box component="div" className="flex-1 flex items-center">
						<QRCode
							className="w-80 h-80"
							value={accountStorage.id}
							renderAs="canvas"
						/>
					</Box>
					<Button
						variant="outlined"
						className="border-primary border-2 text-primary mt-5 rounded-lg"
						fullWidth
						onClick={() => {
							setOpenQr(false);
						}}
					>
						Cerrar
					</Button>
				</Box>
			)}

			<Button
				variant="outlined"
				className="border-primary border-2 text-primary mt-5 rounded-lg"
				fullWidth
				onClick={() => {
					setOpenQr(true);
				}}
			>
				Ver mi Qr
			</Button>

			<Button
				className="bg-primary text-white mt-5 rounded-lg"
				fullWidth
				onClick={() => {
					setOpenScanner(true);
				}}
			>
				Escáner cuenta
			</Button>
		</Box>
	);
};

export default Page;
