"use client";
import { configEnvironment } from "@core/environment";
import { useAppSelector } from "@core/store/hooks/hooks";
import { AccountApi } from "@module/business/infrastructure/api/account";
import { Product } from "@module/business/infrastructure/interface/account";
import { formatCurrency } from "@module/core/application/utils/currency/format";
import { ProductOrderStatus } from "@module/orders/application/const/statusOrder";
import { StatusOrderCard } from "@module/orders/presentation/components/statusOrderCard";
import { useSocket } from "@module/socket/aplication/hooks/useSocket";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PaymentsIcon from "@mui/icons-material/Payments";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import {
	Box,
	Button,
	CircularProgress,
	FormControlLabel,
	IconButton,
	Radio,
	RadioGroup,
	Typography
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useContainer } from "inversify-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import "./style.css";

const HistoryOrderPage = () => {
	const options: any = {
		// default is `save`
		method: "open",
		// default is Resolution.MEDIUM = 3, which should be enough, higher values
		// increases the image quality but also the size of the PDF, so be careful
		// using values higher than 10 when having multiple pages generated, it
		// might cause the page to crash or hang.
		resolution: Resolution.NORMAL,
		page: {
			// margin is in MM, default is Margin.NONE = 0
			margin: Margin.SMALL,
			// default is 'A4'
			format: "A4",
			// default is 'portrait'
			orientation: "portrait"
		},
		canvas: {
			// default is 'image/jpeg' for better size performance
			mimeType: "image/jpeg",
			qualityRatio: 1
		},
		// Customize any value passed to the jsPDF instance and html2canvas
		// function. You probably will not need this and things can break,
		// so use with caution.
		overrides: {
			// see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
			pdf: {
				compress: true
			},
			// see https://html2canvas.hertzen.com/configuration for more options
			canvas: {
				useCORS: true
			}
		}
	};

	const container = useContainer();
	const getProduct = container.get<AccountApi>("AccountApi");
	const [orderPending, setOrderPending] = useState<Product[]>([]);
	const [orderOk, setOrderOk] = useState<Product[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [payment, setPayment] = useState<string>("cash");
	const [animation, setAnimation] = useState<boolean>(false);
	const [animationIcon, setAnimationIcon] = useState<boolean>(false);
	const [isNonePayment, setIsNonePayment] = useState<boolean>(true);

	const accountStorage = useAppSelector((state) => state.account);

	const socket = useSocket();

	const getTargetElement = () => document.getElementById("content-id");

	useEffect(() => {
		socket.current?.on("EVENT_CLIENT", () => {
			setRefresh(!refresh);
		});
	}, []);

	useEffect(() => {
		const fetch = async () => {
			const [total, productPending, productDelivered] =
				await getProduct.mapperProduct();

			setOrderOk(productDelivered);
			setOrderPending(productPending);
			setTotal(total);
		};

		fetch();
	}, [refresh]);

	const executePayment = () => {
		setAnimation(true);
		const realizePayment = {
			payment
		};

		fetch(
			`${configEnvironment.API_QUICKLY_SERVICE}/account/${accountStorage.id}`,
			{
				method: "PUT",
				body: JSON.stringify(realizePayment),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		setTimeout(() => {
			setAnimationIcon(true);
			setTimeout(() => {
				setAnimationIcon(false);
				setAnimation(false);
				setIsNonePayment(false);
			}, 1000);
		}, 1500);
	};

	return (
		<Box component="div" className="flex-1 p-4">
			{animation && (
				<Box
					component="div"
					className="bg-primary fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
				>
					{!animationIcon ? (
						<>
							<svg width={0} height={0}>
								<defs>
									<linearGradient
										fontSize={40}
										id="my_gradient"
										x1="0%"
										y1="0%"
										x2="0%"
										y2="100%"
									>
										<stop offset="0%" stopColor="#e01cd5" />
										<stop offset="100%" stopColor="#1CB5E0" />
									</linearGradient>
								</defs>
							</svg>
							<CircularProgress
								sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
							/>
						</>
					) : (
						<Image src="/icon.png" width={50} height={50} alt="" />
					)}
				</Box>
			)}
			<Typography variant="h1" className="font-semibold">
				Historial de Ordenes
			</Typography>
			<Box component="div">
				<div id="content-id">
					{orderPending.length > 0 && (
						<StatusOrderCard
							products={orderPending}
							status={ProductOrderStatus.PROCESSING}
							label="Estatus de la orden"
						/>
					)}

					{orderOk.length > 0 && (
						<StatusOrderCard
							products={orderOk}
							status={ProductOrderStatus.DELIVERED}
							label="Estatus de la orden"
						/>
					)}

					<Box
						component="div"
						className="flex items-center justify-between bg-white p-4  rounded-b-lg border-[#D3DEE4] border-t-2"
					>
						<Typography className="text-title font-bold">Total</Typography>
						<Typography className="text-title font-bold text-[16px]">
							{formatCurrency(total)}
						</Typography>
					</Box>
				</div>

				{isNonePayment && (
					<Box
						component="div"
						className="flex items-center justify-between bg-white p-4  rounded-b-lg  mt-10"
					>
						<Typography>Método de pago</Typography>
						<Box component="div" className="flex gap-5" onClick={() => setOpen(true)}>
							<Typography className="font-bold">
								{payment === "cash" ? "En efectivo" : "En tarjeta"}
							</Typography>
							<ArrowForwardIosOutlinedIcon fontSize="small" />
						</Box>
					</Box>
				)}

				{isNonePayment ? (
					<Button
						disableRipple
						fullWidth
						className="bg-primary text-white mt-6 rounded-xl text-[17px] transform-none p-3"
						onClick={executePayment}
					>
						Realizar pedido
					</Button>
				) : (
					<Button
						fullWidth
						className="bg-primary text-white mt-6 rounded-xl text-[17px] transform-none p-3"
						onClick={() => generatePDF(getTargetElement, options)}
					>
						Descargar ticket
					</Button>
				)}

				<SwipeableDrawer
					open={open}
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					anchor="bottom"
				>
					<Box component="div" className="flex gap-5 p-4 items-center">
						<IconButton
							className="bg-[#989595] text-white"
							onClick={() => setOpen(false)}
						>
							<CloseIcon />
						</IconButton>
						<Typography className="text-[18px] font-bold">
							Selecciona tu método de pago
						</Typography>
					</Box>

					<Box component="div" className="p-5 flex flex-col gap-5">
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="female"
							name="radio-buttons-group"
							onChange={(e) => {
								const typePayment = e.target.value;
								setPayment(typePayment);
								setOpen(false);
							}}
							value={payment}
						>
							<Box
								component="div"
								className="bg-white p-4 rounded-lg flex gap-5 items-center mb-4"
								onClick={() => setOpen(true)}
							>
								<PaymentsIcon />
								<Typography className="font-bold flex-1">Pago en efectivo</Typography>
								<FormControlLabel
									value="cash"
									control={<Radio />}
									labelPlacement="start"
									label=""
								/>
							</Box>

							<Box
								component="div"
								className="bg-white p-4 rounded-lg flex gap-5 items-center"
								onClick={() => setOpen(true)}
							>
								<PointOfSaleIcon />
								<Typography className="font-bold flex-1">Pago en terminal</Typography>
								<FormControlLabel
									value="credit-card"
									control={<Radio />}
									labelPlacement="start"
									label=""
								/>
							</Box>
						</RadioGroup>
					</Box>
				</SwipeableDrawer>
			</Box>
		</Box>
	);
};

export default HistoryOrderPage;
