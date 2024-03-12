'use client';
import {
	Box,
	Button,
	Radio,
	RadioGroup,
	SwipeableDrawer,
	TextField,
	Typography
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useEffect, useState } from 'react';

import { configEnvironment } from '@core/environment';
import { useAppDispatch } from '@core/store/hooks/hooks';
import { IProductSelect, addProductSelect } from '@core/store/slice/shopCart';
import { formatCurrency } from '@module/core/application/utils/currency/format';
import { RecommendationsCard } from '@module/core/presentation/components/cards/recommendation';
import { ISubProduct } from '@module/product/application/interface/product';
import { ProductDetailSwipeableProps } from './productDetailSwipeableProps';
import './style.css';

export const ProductDetailSwipeable: FunctionComponent<
	ProductDetailSwipeableProps
> = (props) => {
	const { product, ...swipeableProps } = props;
	const [productSelect, setProductSelect] = useState<IProductSelect>(
		{} as IProductSelect
	);

	const [countRadioButton, setCountRadioButton] = useState<number>(0);

	const increment = () =>
		setProductSelect({
			...productSelect,
			count: productSelect.count + 1
		});

	const decrement = () => {
		if (productSelect.count > 1) {
			setProductSelect({
				...productSelect,
				count: productSelect.count - 1
			});
		}
	};

	const dispatch = useAppDispatch();
	const router = useRouter();

	const saveOrder = () => {
		if (productSelect.price !== 0) {
			console.log('select product', productSelect);
			dispatch(addProductSelect(productSelect));
			router.push('/shop-cart');
		}
	};

	useEffect(() => {
		if (product.subProduct?.length === 0) {
			setProductSelect({
				_id: product._id,
				name: product.default?.name,
				description: product.default?.description,
				note: '',
				count: 1,
				price: product.default.price,
				image: product.default?.image,
				key: product.default.key
			});

			return;
		}

		setCountRadioButton(product.subProduct?.length);

		setProductSelect({
			_id: product._id,
			name: product.default?.name,
			description: product.default?.description,
			note: '',
			count: 1,
			price: 0,
			image: product.default?.image,
			key: ''
		});
	}, [product]);

	return (
		<SwipeableDrawer {...swipeableProps}>
			<Image
				className="w-full rounded-br-lg rounded-bl-xl h-[226px] object-cover"
				src={`${configEnvironment.CONTAINER_IMAGES_SHOPS}/${product?.default?.image}`}
				width={100}
				height={100}
				alt=""
			/>
			<Box component="div" className="p-4 overflow-auto max-h-96">
				<Typography
					variant="h3"
					className="capitalize text-title font-semibold text-[18px] pb-2 mb-2 border-b-blue-dark border-b-[1px]"
				>
					{product.default.name}
				</Typography>
				<Typography
					component={'p'}
					className="capitalize text-blue-dark text-[14px] mb-4"
				>
					{product.default.description}
				</Typography>
				<Box component={'div'}>
					<RadioGroup className="sub-product-card" name="radio-buttons-group">
						{product.subProduct?.length > 0 && (
							<>
								<RecommendationsCard
									label="Escoge tu opción favorita"
									subtitle="Selecciona 1"
									buttonName="Obligatorio"
								/>
								{product.subProduct.map((subProduct: ISubProduct, index: number) => (
									<Box
										component={'label'}
										className="sub-product-item bg-[#ffff] border-b-[#D3DEE4] border-b-2 p-3"
										key={index}
									>
										<Typography
											component={'p'}
											className="flex justify-between items-center w-full text-[16px] text-title capitalize"
										>
											<span className=""> {subProduct.name} </span>
											<span className=""> {formatCurrency(subProduct.price)} </span>
										</Typography>

										<Radio
											value={index}
											checked={countRadioButton === index}
											name={'grupo'}
											color="primary"
											onChange={(e) => {
												if (typeof Number(e.target.value) === 'number') {
													setCountRadioButton(Number(e.target.value));
												}

												if (e.target.checked) {
													setProductSelect({
														...productSelect,
														name: subProduct.name,
														price: subProduct.price,
														key: subProduct.key
													});

													return;
												}

												setProductSelect({
													...productSelect,
													name: '',
													price: 0,
													key: ''
												});
											}}
										/>
									</Box>
								))}
							</>
						)}
					</RadioGroup>

					<RecommendationsCard
						label="¿Algo que no quieras en tu pedido ?"
						subtitle={'(Condimento o Ingrediente)'}
						buttonName="Opcional"
					/>
					<TextField
						sx={{ margin: '25px 0' }}
						placeholder="¿Algún comentario antes de ordenar?"
						onChange={(e) => {
							setProductSelect({
								...productSelect,
								note: e.target.value
							});
						}}
						value={productSelect.note}
						multiline
						rows={5}
					/>

					<Box className="shop-cart-action p-4">
						<Box className="flex flex-1 items-center">
							<button className="rounded-full button me-5" onClick={decrement}>
								-
							</button>
							<span> {productSelect.count} </span>
							<button className="rounded-full button ms-5" onClick={increment}>
								+
							</button>
						</Box>

						<Button
							fullWidth
							sx={{ margin: '30px 0' }}
							className="guardar bg-primary text-white"
							onClick={saveOrder}
							disabled={productSelect.price === 0}
							variant="contained"
						>
							<Typography component={'span'}> Agrega</Typography>
						</Button>
					</Box>
				</Box>
			</Box>
		</SwipeableDrawer>
	);
};
