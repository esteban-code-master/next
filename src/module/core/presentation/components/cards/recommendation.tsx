import { Box, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

interface RecommendationsCardProps {
	label: string;
	subtitle: string;
	buttonName: string;
}
export const RecommendationsCard: FunctionComponent<
	RecommendationsCardProps
> = (props) => {
	const { label, subtitle, buttonName } = props;

	return (
		<Box
			component={'div'}
			className="bg-[#EBF0F3] border-b-blue-dark border-b-2 p-3 rounded-t-lg"
		>
			<Typography variant="h3" className="text-title font-semibold text-[16px]">
				{label}
			</Typography>
			<Box component={'div'} className="flex justify-between items-center">
				<Typography component={'span'} className="text-title text-sm">
					{subtitle}
				</Typography>
				<button className="bg-blue-dark text-white py-1 px-3 rounded-lg">
					{buttonName}
				</button>
			</Box>
		</Box>
	);
};
