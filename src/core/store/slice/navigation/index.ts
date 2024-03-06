import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface INavigation {
	storeId?: string;
	tableId?: string;
	categoryId?: string;
}

const initialState: INavigation = {} as INavigation

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: initialState,
    reducers: {
        setNavigation: (_, action: PayloadAction<INavigation>) => action.payload
    }
})

export const { setNavigation: setNavigation } = navigationSlice.actions
export default navigationSlice.reducer