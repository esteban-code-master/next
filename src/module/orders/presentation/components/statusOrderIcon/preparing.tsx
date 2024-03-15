import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { Box, Typography } from '@mui/material';

export const StatusOrderPreparing = () => {
	return (
		<Box
			component="div"
			className="bg-blue-dark rounded-lg text-white py-1 px-3 inline-flex items-center gap-2"
		>
			<HourglassEmptyOutlinedIcon />
			<Typography component="span" className="text-[10px]">
				Preparando
			</Typography>
		</Box>
	);
};
