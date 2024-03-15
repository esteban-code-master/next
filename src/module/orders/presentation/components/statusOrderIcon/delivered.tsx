import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';

export const StatusOrderDelivered = () => {
	return (
		<Box
			component="div"
			className="bg-success rounded-lg text-white py-1 px-3 inline-flex items-center gap-2"
		>
			<CheckCircleOutlineIcon />
			<Typography component="span" className="text-[10px]">
				Orden Lista
			</Typography>
		</Box>
	);
};
