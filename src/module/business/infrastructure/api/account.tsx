import type { Environment } from "@core/environment";
import type { Account } from "@module/business/application/interface/account";
import { ProductOrderStatus } from "@module/orders/application/const/statusOrder";
import axios from "axios";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { AccountResponse, Product } from "../interface/account";

@injectable()
export class AccountApi {
	private readonly endpoint!: string;

	constructor(
		@inject("ACCOUNT") private readonly account: Account,
		@inject("ENVIRONMENT") private readonly environment: Environment
	) {
		this.endpoint = `${this.environment.API_QUICKLY_SERVICE}/account`;
	}

	public async get(): Promise<AccountResponse> {
		const response = await axios.get(`${this.endpoint}/${this.account.id}`);

		return response.data.response[0];
	}

	public async mapperProduct(): Promise<[number, Product[], Product[]]> {
		const account: AccountResponse = await this.get();
		let total = 0;
		const productPending: Product[] = [];
		const productDelivered: Product[] = [];

		account.orders.forEach((order) => {
			order.products.forEach((product) => {
				if (product.status !== ProductOrderStatus.CANCELED) {
					total += product.price;
				}

				//productos cancelados y entregados
				if (
					[ProductOrderStatus.CANCELED, ProductOrderStatus.DELIVERED].includes(
						product.status
					)
				) {
					productDelivered.push(product);

					return;
				}

				productPending.push(product);
			});
		});

		return [total, productPending, productDelivered];
	}
}
