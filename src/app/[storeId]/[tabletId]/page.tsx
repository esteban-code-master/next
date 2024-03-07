'use client';

import { useAppDispatch } from '@core/store/hooks/hooks';
import { setAccount } from '@core/store/slice/account';
import { BusinessPage } from '@module/business/presentation/page';
import { useEffect } from 'react';

const Home = (req: any) => {
	const { storeId, tabletId: tableNumber } = req.params;
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setAccount({ storeId, tableNumber }));
	}, [dispatch, storeId, tableNumber]);

	return (
		<div>
			<BusinessPage />
		</div>
	);
};

export default Home;
