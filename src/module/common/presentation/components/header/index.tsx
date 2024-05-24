'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Box, Modal, TextField, Typography } from '@mui/material';
import './header.css';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	bgcolor: 'background.paper',
	border: 'none',
	color: 'black',
	boxShadow: 24,
	p: 4,
	borderRadius: '8px'
};

export const Header = () => {
	// const storeApi = useMemo(() => new StoreService(), []);
	// const [store, setStore] = useState<IStore>();
	const [open, setOpen] = useState(false);

	const [openText, setOpenText] = useState(false);
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
				<Image width={82} height={32} alt="" src={'/icons/quickly.png'} />
				{/* <span>{store?.name}</span> */}
			</div>
			<Box className="navbar-count" component="div" onClick={() => setOpen(true)}>
				<Image width={30} height={30} alt="" src={'/icons/call.svg'} />
				<span className="navbar__title">Mesero</span>
			</Box>

			<Modal open={open}>
				<Box sx={style}>
					<Typography variant="h2" className="font-bold text-center mb-5">
						Necesitas Asistencia
					</Typography>

					<Typography
						className="text-center mb-5 text-primary underline"
						onClick={() => setOpenText(!openText)}
					>
						Enviar un mensaje a tu mesero
					</Typography>
					{/* <Box className="bg-[#EFF3FF] p-2 mb-4 rounded-lg">
					<ErrorOutlineOutlinedIcon fontSize="small" className="me-3" />
					<Typography variant="caption" className="text-center mb-4">
						Tu nombre solo se solicitará una vez para abrir tu comanda.
					</Typography>
				</Box>
			 */}

					{openText && (
						<TextField
							name="clientName"
							label="Agrega tu nombre aquí"
							className="bg-[#EBF0F3]"
							onChange={(e) => {}}
						/>
					)}
					<button
						className="bg-primary text-white w-full rounded-xl p-2 mt-4"
						onClick={() => {
							setOpen(false);
							setOpenText(false);
						}}
					>
						Solicitar un mesero
					</button>
				</Box>
			</Modal>
		</div>
	);
};
 