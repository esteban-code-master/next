'use client';

import { useAppDispatch, useAppSelector } from '@core/store/hooks/hooks';
import { setAccount } from '@core/store/slice/account';
import { BusinessPage } from '@module/business/presentation/page';
import { useEffect } from 'react';

const image =
	'public/images/shops/Boneless-871642d1-d8cb-4805-88fc-04fc6c134a9a/202-tortas-de-jamoÌn-y-queso-fbf3-1703640186435.jpg';

const Home = (req: any) => {
	const { storeId, tabletId } = req.params;
	const accountStore = useAppSelector((state) => state.account);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log('exutar..');
		if (accountStore.clientName !== undefined || accountStore) {
			dispatch(setAccount({ storeId, tableNumber: Number(tabletId) }));
		}
	}, [dispatch, storeId, tabletId, accountStore.clientName]);

	return (
		<div className="relative flex-1">
			<BusinessPage />
		</div>
	);
};

export default Home;
