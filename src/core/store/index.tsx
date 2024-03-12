'use client';
import { configureStore } from '@reduxjs/toolkit';

import account from '@core/store/slice/account';
import navigation from '@core/store/slice/navigation';
import shopCart from '@core/store/slice/shopCart';

export const store = configureStore({
	reducer: {
		navigation,
		shopCart,
		account
	},
	preloadedState: {
		account: (() => {
			if (typeof localStorage !== 'undefined') {
				const storedAccount = localStorage.getItem('account');
				return storedAccount ? JSON.parse(storedAccount) : {};
			}
		})(),
		shopCart: (() => {
			if (typeof localStorage !== 'undefined') {
				const shopCartStorage = localStorage.getItem('shopCart');
				return shopCartStorage ? JSON.parse(shopCartStorage) : [];
			}
		})()
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
