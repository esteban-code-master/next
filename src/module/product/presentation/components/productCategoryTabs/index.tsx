import { FilterIcon } from '@module/core/presentation/components/icons/customIcons';
import { Box, SwipeableDrawer, Tab, Tabs, Typography } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { ProductCategoryTapProps } from './productCategoryTabsProps';

export const ProductCategoryTabsProps: FunctionComponent<
	ProductCategoryTapProps
> = (props) => {
	const { categories, setCategory } = props;
	const [value, setValue] = useState<number>(0);
	const [open, setOpen] = useState<boolean>(false);

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const renderTabs = () => {
		const renderedTabs = [];

		for (let i = 0; i < 3 && i < categories.length; i++) {
			renderedTabs.push(
				<Tab
					key={i}
					value={i}
					label={categories[i].name}
					onClick={() => setCategory(categories[i]?._id)}
				/>
			);
		}

		return renderedTabs;
	};

	return (
		<Box component="div" className="relative">
			<Tabs
				value={value}
				textColor="secondary"
				indicatorColor="secondary"
				aria-label="secondary tabs example"
				onChange={handleChange}
			>
				{renderTabs()}
			</Tabs>
			<FilterIcon
				className="bg-white absolute right-0 top-1/2 bottom-1/2 -translate-y-[33%]"
				onClick={() => {
					setOpen(true);
				}}
			/>
			<SwipeableDrawer
				anchor="bottom"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				className="rounded-swipeable"
			>
				<Box component="div" className="overflow-auto h-60 p-4">
					<Typography className="border-b-blue-dark border-b-[1px] pb-5 text-center font-medium text-[22px]">
						La casda de tono
					</Typography>
					{categories &&
						categories.map((category, index) => (
							<Box
								component="div"
								className="p-4 border-b-[#D3DEE4] border-b-[1px]"
								key={index}
								onClick={() => {
									setCategory(category._id);
									setOpen(false);
								}}
							>
								{category.name}
							</Box>
						))}
				</Box>
			</SwipeableDrawer>
		</Box>
	);
};
