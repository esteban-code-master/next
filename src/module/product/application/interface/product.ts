import { Language } from "@module/core/application/interface/language"

export interface IProduct {
	_id: string
	storeId: string
	areaId: string
	categoryId: Array<string>
	language:  Language
	status: boolean
	check: boolean
	default: ISubProduct
	subProduct: Array<ISubProduct>
}

export interface ISubProduct {
	name: string
	image: string
	description: string
	price: number
	default: boolean
	key: string
}