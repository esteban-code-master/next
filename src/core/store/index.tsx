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
			// const storedAccount = window.localStorage.getItem("account");
			// return storedAccount ? JSON.parse(storedAccount) : {};

			if (typeof localStorage === 'function') {
				// La función no está definida o es null
				console.log('localstorage', localStorage);
			}

			return {};
		})(),
		shopCart: (() => {
			// const shopCartStorage = localStorage.getItem('shopCart');

			// const shopCartStorage = '{}'
			// return shopCartStorage ? JSON.parse(shopCartStorage) : [];
			return [];
		})()
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
