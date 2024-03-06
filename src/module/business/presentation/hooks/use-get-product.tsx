"use client";
import { GetProduct } from "@module/business/infrastructure/api/get-product";
import { useContainer } from "inversify-react";
import { useEffect, useState } from "react";

export const UseGetProduct = () => {
	const [product, setProduct] = useState<any>();

	const container = useContainer();
	const getProduct = container.get<GetProduct>("GetProduct");

	useEffect(() => {
		getProduct.execute().then((response) => {
			console.log(response);
		});
	}, []);

	return product;
};
