"use client";
import { useAppDispatch } from "@core/store/hooks/hooks";
import { setAccount } from "@core/store/slice/account";
import { NextApiRequest } from "next";
import { useEffect } from "react";

export interface Params {
	storeId: string;
	tabletId: number;
}

export const saveSessionMiddleware =
	(handler: (req: NextApiRequest) => void) =>
	async (req: NextApiRequest & { params: Params }) => {
		const { storeId, tabletId: tableNumber } = req.params;
		const dispatch = useAppDispatch();

		useEffect(() => {
			dispatch(setAccount({ storeId, tableNumber }));
		}, [dispatch, storeId, tableNumber]);

		return handler(req);
	};

// export const saveSessionMiddleware =
// 	(handler: (req: NextApiRequest) => void) =>
// 	async (req: NextApiRequest & { params: Params }) => {
// 		// const { storeId, tabletId: tableNumber } = req.params;
// 		// const dispatch = useAppDispatch();

// 		// useEffect(() => {
// 		// 	dispatch(setAccount({ storeId, tableNumber }));
// 		// }, [dispatch, storeId, tableNumber]);

// 		return handler(req);
// 	};
