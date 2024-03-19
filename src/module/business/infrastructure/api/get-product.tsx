import { configEnvironment } from '@core/environment';
import axios from 'axios';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class GetProduct {
	constructor(@inject('ACCOUNT') private readonly accountState: any) {}

	get Endpoint() {
		console.log('account => url', this.accountState);
		return `${configEnvironment.API_QUICKLY_SERVICE}/restaurant/${this.accountState.storeId}/product`;
	}

	public async execute(category: string) {
		return await axios.get(`${this.Endpoint}?category=${category}`);
	}
}
