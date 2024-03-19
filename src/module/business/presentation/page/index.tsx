'use client';
import { configEnvironment } from '@core/environment';
import { useAppSelector } from '@core/store/hooks/hooks';
import { useGetCategory } from '@module/product/application/hooks/useGetCategory';
import { IProduct } from '@module/product/application/interface/product';
import { ProductCategoryTabsProps } from '@module/product/presentation/components/productCategoryTabs';
import { ProductMenuCard } from '@module/product/presentation/components/productMenuCard';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AccountOpen } from '../components/account-open';
import { useGetProduct } from '../hooks/use-get-product';
const image =
	'public/images/shops/Boneless-871642d1-d8cb-4805-88fc-04fc6c134a9a/202-tortas-de-jamoÌn-y-queso-fbf3-1703640186435.jpg';

export const BusinessPage = () => {
	const account = useAppSelector((state) => state.account);
	const categories = useGetCategory();
	const [selectCategory, setSelectCategory] = useState<string>('');
	const products = useGetProduct(selectCategory);

	useEffect(() => {
		setSelectCategory(categories[0]?._id);
	}, [categories]);

	return (
		<>
			{!account.clientName && <AccountOpen />}

			<Box>
				<Image
					className="w-full h-[200px] object-cover"
					src={`${configEnvironment.CONTAINER_IMAGES_SHOPS}/${image}`}
					width={100}
					height={100}
					alt=""
				/>
			</Box>
			<Box className="container bg-white sticky top-0 z-20">
				<Box component="div" className="flex gap-4 p-4 mt-10">
					<Image
						className="w-[59px] h-[58px] object-cover rounded-lg"
						src={`${configEnvironment.CONTAINER_IMAGES_SHOPS}/${image}`}
						width={100}
						height={100}
						alt=""
					/>
					<Typography className="text-[22px] font-medium">
						La casa de tono
					</Typography>
				</Box>
				<ProductCategoryTabsProps
					categories={categories}
					setCategory={setSelectCategory}
				/>
			</Box>

			<Box component="div" className="flex flex-col gap-5 container my-7 ">
				{products &&
					products.map((product: IProduct, index: number) => (
						<ProductMenuCard key={index} product={product} />
					))}
			</Box>
		</>
	);
};
