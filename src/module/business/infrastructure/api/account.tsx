import type { Environment } from '@core/environment';
import type { Account } from '@module/business/application/interface/account';
import axios from 'axios';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class AccountApi {
	private readonly endpoint!: string;

	constructor(
		@inject('ACCOUNT') private readonly account: Account,
		@inject('ENVIRONMENT') private readonly environment: Environment
	) {
		this.endpoint = `${this.environment.API_QUICKLY_SERVICE}/account`;
	}

	public get() {
		return axios.get(`${this.endpoint}/${this.account.id}`);
	}
}
