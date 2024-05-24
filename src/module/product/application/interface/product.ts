import { Language } from "@module/core/application/interface/language"


export interface Product {
	_id: string
	image: string
	name: string
	price: number
	description: string
	upgrade: Upgrade[]
	storeId: string
	areaId: string
	categoryId: string[]
	language: Language
	status: boolean
	check: boolean
}

export interface Upgrade {
	titulo: string
	requiere: boolean
	multiple: boolean
	limit: number
	subProduct: SubProduct[]
}

export interface SubProduct {
	_id?: string
	name: string
	price: number
	status: boolean
	description: string
}