'use client';
import { configEnvironment } from '@core/environment';
import { useAppDispatch } from '@core/store/hooks/hooks';
import { addProductSelect } from '@core/store/slice/shopCart';
import { formatCurrency } from '@module/core/application/utils/currency/format';
import { RecommendationsCard } from '@module/core/presentation/components/cards/recommendation';
import {
	SubProduct,
	Upgrade
} from '@module/product/application/interface/product';
import {
	Box,
	Button,
	Checkbox,
	RadioGroup,
	SwipeableDrawer,
	TextField,
	Typography
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useRef, useState } from 'react';
import { ProductDetailSwipeableProps } from './productDetailSwipeableProps';
import './style.css';

export const ProductDetailSwipeable: FunctionComponent<
	ProductDetailSwipeableProps
> = (props) => {
	const { product, ...swipeableProps } = props;
	const [note, setNote] = useState<string>('');
	const [count, setCount] = useState<number>(1);
	const [listUpgrade, setLisUpgrade] = useState<SubProduct[]>([]);
	const [isDisabled, setDisabled] = useState(false);
	const refer = useRef<any>([]);

	const increment = () => setCount((count) => count + 1);

	const decrement = () => {
		if (count > 1) {
			setCount((count) => count - 1);
		}
	};

	const dispatch = useAppDispatch();
	const router = useRouter();

	const saveOrder = () => {
		dispatch(addProductSelect({ ...product, upgrade: listUpgrade, count, note }));
		router.push('/shop-cart');
	};

	return (
		<SwipeableDrawer {...swipeableProps}>
			<Image
				className="w-full rounded-br-lg rounded-bl-xl h-[226px] object-cover"
				src={`${configEnvironment.CONTAINER_IMAGES_SHOPS}/${product?.image}`}
				width={100}
				height={100}
				alt=""
			/>
			<Box
				component="form"
				className="p-4 overflow-auto max-h-96"
				onSubmit={(event) => {
					event.preventDefault();

					const upgradeInfo: string[] = refer.current.filter(
						(item: string) => item !== undefined
					);

					const numberStep = upgradeInfo.length;
					let stepVerification = 0;

					upgradeInfo.forEach((item: string) => {
						const convertTObject: Upgrade = JSON.parse(item);
						let countSubProduct = 0;

						convertTObject.subProduct.forEach((subItem) => {
							if (listUpgrade.some((a) => a._id === subItem._id)) {
								countSubProduct++;
							}
						});

						if (convertTObject.limit >= 0 && countSubProduct >= 1) {
							stepVerification++;
						}
					});

					if (numberStep === stepVerification) {
						setDisabled(true);
						saveOrder();

						return;
					}

					alert('faltan opciones por escoger');
				}}
			>
				<Typography
					variant="h3"
					className="capitalize text-title font-semibold text-[18px] pb-2 mb-2 border-b-blue-dark border-b-[1px]"
				>
					{product.name}
				</Typography>
				<Typography
					component={'p'}
					className="capitalize text-blue-dark text-[14px] mb-4"
				>
					{product.description}
				</Typography>
				<Box component={'div'}>
					<RadioGroup className="sub-product-card" name="radio-buttons-group">
						{product.upgrade?.length > 0 &&
							product?.upgrade.map((upgrade, a) => (
								<div key={a}>
									<RecommendationsCard
										label={upgrade.titulo}
										subtitle={
											upgrade.limit > 0
												? `Selecciona hasta ${upgrade.limit}`
												: upgrade.multiple
												? `Selecciona mas de 1`
												: 'selecciona solo uno 1'
										}
										buttonName={upgrade.requiere ? 'Obligatorio' : 'Opcional'}
									/>

									{upgrade.subProduct.map((subProduct, index) => (
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

											<Checkbox
												ref={(el) => (refer.current[a] = el?.dataset.value)}
												data-value={
													upgrade.requiere === true ? JSON.stringify(upgrade) : undefined
												}
												checked={listUpgrade.includes(subProduct)}
												onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
													const _upgrade = [...listUpgrade];
													const isAddUpgrade = event.target.checked;
													const limitAddUpgrade = upgrade.limit;

													let count = 0;
													upgrade.subProduct.forEach((_subProduct) => {
														if (listUpgrade.includes(_subProduct)) {
															count = count + 1;
														}
													});

													if (isAddUpgrade) {
														if (count < limitAddUpgrade || limitAddUpgrade === 0) {
															_upgrade.push(subProduct);
															0;
															setLisUpgrade(_upgrade);
														}
														return;
													}

													const popUpgrade = _upgrade.filter(
														(item) => item._id !== subProduct._id
													);

													setLisUpgrade(popUpgrade);
												}}
											/>
										</Box>
									))}
								</div>
							))}
					</RadioGroup>

					<RecommendationsCard
						label="¿Algo que no quieras en tu pedido ?"
						subtitle={'(Condimento o Ingrediente)'}
						buttonName="Opcional"
					/>
					<TextField
						sx={{ margin: '10px 0 80px' }}
						placeholder="¿Algún comentario antes de ordenar?"
						onChange={(e) => {
							setNote(e.target.value);
						}}
						value={note}
						multiline
						rows={5}
					/>

					<Box className="shop-cart-action p-4">
						<Box className="flex flex-1 items-center">
							<button
								className="rounded-full button me-5"
								onClick={decrement}
								type="button"
							>
								-
							</button>
							<span> {count} </span>
							<button
								className="rounded-full button ms-5"
								onClick={increment}
								type="button"
							>
								+
							</button>
						</Box>

						<Button
							fullWidth
							sx={{ margin: '30px 0' }}
							className={`guardar bg-primary text-white`}
							variant="contained"
							type="submit"
							disabled={isDisabled}
						>
							<Typography component={'span'}> Agregar</Typography>
						</Button>
					</Box>
				</Box>
			</Box>
		</SwipeableDrawer>
	);
};
