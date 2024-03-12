import { useAppDispatch, useAppSelector } from '@core/store/hooks/hooks';
import { setAccount } from '@core/store/slice/account';
import { CreateAccount } from '@module/business/infrastructure/api/create-account';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, Modal, TextField, Typography } from '@mui/material';
import { useContainer } from 'inversify-react';
import { useState } from 'react';

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

export const AccountOpen = () => {
	const [clientName, setClientName] = useState<string>('');
	const dispatch = useAppDispatch();
	const accountStorage = useAppSelector((state) => state.account);
	const container = useContainer();
	const account = container.get<CreateAccount>('CreateAccount');

	const handlerAccountOpen = async () => {
		const accountOpen = await account.execute({ ...accountStorage, clientName });

		if (accountOpen.data.headers.success) {
			dispatch(setAccount({ clientName, id: accountOpen.data.response._id }));
		}
	};

	return (
		<Modal open={true}>
			<Box sx={style}>
				<Typography variant="h2" className="font-bold text-center mb-5">
					Ingresa tu nombre para comenzar a ordenar{' '}
				</Typography>
				<Box className="bg-[#EFF3FF] p-2 mb-4 rounded-lg">
					<ErrorOutlineOutlinedIcon fontSize="small" className="me-3" />
					<Typography variant="caption" className="text-center mb-4">
						Tu nombre solo se solicitará una vez para abrir tu comanda.
					</Typography>
				</Box>
				<TextField
					name="clientName"
					label="Agrega tu nombre aquí"
					className="bg-[#EBF0F3]"
					onChange={(e) => setClientName(e.target.value)}
				/>

				<button
					onClick={handlerAccountOpen}
					className="bg-primary text-white w-full rounded-xl p-2 mt-4"
				>
					Aceptar
				</button>
			</Box>
		</Modal>
	);
};
