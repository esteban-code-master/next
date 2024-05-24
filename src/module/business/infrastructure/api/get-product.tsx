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
		return await axios.get(`${this.Endpoint}?category=${category}`, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiX2lkIjoiNjRjNDM3MmQyMTc3Njc3M2NlZmM1OTk0IiwiaWF0IjoxNzE2MzMzNTA0fQ.WOuVE22NyO9eNSDYMPPQjSwpoY4R00Rwb58oOUhyDlA`
			}
		});
	}
}
