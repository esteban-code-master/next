"use client";
import { useGetProduct } from "../hooks/use-get-product";

export const BusinessPage = () => {
	const product = useGetProduct();

	console.log(product);
	return <>iniciando</>;
};
