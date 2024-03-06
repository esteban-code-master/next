import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAccount {
	clientName?: string
	storeId?: string
	tableNumber?: number
	id?: string
	_id?: string
}

const initialState: Partial<IAccount> = {} as IAccount

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<IAccount>) => {
			const account = {...state, ...action.payload}

			localStorage.setItem('account', JSON.stringify(account))
			
			return account
		},
		resetAccount: () => {
			localStorage.removeItem('account')

			return {}
		}
    }
})

export const { setAccount, resetAccount } = accountSlice.actions
export default accountSlice.reducer