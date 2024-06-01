import { configEnvironment } from "@core/environment";
import type { Account } from "@module/business/application/interface/account";
import { Order } from "@module/orders/application/interface/order";
import axios from "axios";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class OrderApi {
	private readonly endpoint!: string;

	constructor(@inject("ACCOUNT") private readonly account: Account) {
		this.endpoint = `${configEnvironment.API_QUICKLY_SERVICE}/order`;
	}

	public get() {
		console.log(`${configEnvironment.API_QUICKLY_SERVICE}/account/`);
	}

	public async post(order: Order) {
		return await axios.post(this.endpoint, order);
	}
}
