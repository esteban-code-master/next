import { configureStore } from '@reduxjs/toolkit'

import account from "@core/store/slice/account"
import navigation from '@core/store/slice/navigation'
import shopCart from '@core/store/slice/shopCart'


export const store = configureStore({
    reducer: {
        navigation,
		shopCart,
		account
    },
	preloadedState: {
		account: (()=> {
			// const storedAccount = localStorage.getItem('account');
			// const storedAccount = '{}'
			// return storedAccount ? JSON.parse(storedAccount) : {};

			return {}
		})(),
		shopCart: (()=>{
			// const shopCartStorage = localStorage.getItem('shopCart');

			// const shopCartStorage = '{}'
			// return shopCartStorage ? JSON.parse(shopCartStorage) : [];
			return []
		})()
	},
	
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

