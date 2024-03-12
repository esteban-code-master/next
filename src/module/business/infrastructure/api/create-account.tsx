import { configEnvironment } from '@core/environment';
import { IAccount } from '@core/store/slice/account';
import axios from 'axios';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class CreateAccount {
	private readonly endpoint: string = `${configEnvironment.API_QUICKLY_SERVICE}/account`;

	public async execute(account: IAccount) {
		console.log('account', account);
		return axios.post(this.endpoint, account);
	}
}
