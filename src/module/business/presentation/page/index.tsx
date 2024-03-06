"use client";
import { UseGetProduct } from "../hooks/use-get-product";

export const BusinessPage = () => {
	const product = UseGetProduct();

	console.log(product);
	return <>iniciando</>;
};
