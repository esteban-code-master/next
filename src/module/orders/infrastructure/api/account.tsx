import { configEnvironment } from '@core/environment';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class AccountApi {
	constructor(@inject('ACCOUNT') private readonly account: any) {}

	public get() {
		console.log(this.account);
		console.log(`${configEnvironment.API_QUICKLY_SERVICE}/account/`);
	}
}
