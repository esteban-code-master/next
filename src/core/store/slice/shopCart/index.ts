import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { IProduct } from "@menu/interface/product";


export interface IShopCart {
	product: any;
	note: string;
}



export interface IProductSelect {
	_id?: string;
	name: string;
	description: string;
	price: number;
	note: string;
	count: number;
	image?: string | undefined;
	key: string
}

const initialState: IProductSelect[] = []

export const shopCartSlice = createSlice({
    name: 'shopCart',
    initialState: initialState,
    reducers: {
		addProductSelect: (state, action: PayloadAction<IProductSelect>) => {
			console.log("==>", state)
			state.push(action.payload)
			localStorage.setItem('shopCart', JSON.stringify(state))
		},
        // addItemShoCart: (state, action: PayloadAction<IProductSelect>) => {
		// 	state.push(action.payload)
		// },
		deleteItemShopCart: (state, action: PayloadAction<number>) => {
			const shopCart = state.filter((_, index) =>  index !== action.payload)

			localStorage.setItem('shopCart', JSON.stringify(shopCart))
			return shopCart
		},
		resetShopCart: () => {
			console.log('ejecutando....')
			localStorage.removeItem('shopCart');
			localStorage.setItem('shopCart', JSON.stringify([]))
			return []
		}
    }
})

export const { deleteItemShopCart, resetShopCart, addProductSelect } = shopCartSlice.actions
export default shopCartSlice.reducer