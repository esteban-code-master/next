import type { Environment } from '@core/environment';
import type { Account } from '@module/business/application/interface/account';
import { ErrorHandler } from '@module/core/infrastructure/decorator/errorHandler';
import type { ApiResponse } from '@module/core/infrastructure/interface/apiResponse';
import { Category } from '@module/product/application/interface/category';
import axios, { AxiosResponse } from 'axios';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class CategoryApi {
	private readonly endpoint: string;

	constructor(
		@inject('ACCOUNT') private readonly account: Account,
		@inject('ENVIRONMENT') private readonly environment: Environment
	) {
		this.endpoint = `${this.environment.API_QUICKLY_SERVICE}/category`;
	}

	@ErrorHandler
	public async get(): Promise<Category[]> {
		const response: AxiosResponse<ApiResponse<Category[]>> = await axios.get(
			`${this.endpoint}/${this.account.storeId}`
		);
		return response.data.response;
	}
}
