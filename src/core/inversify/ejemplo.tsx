'use client';

import { Environment, configEnvironment } from '@core/environment';
import { IAccount } from '@core/store/slice/account';
import { ContainerModule } from 'inversify';

export const storeProvider = new ContainerModule((bind) => {
	bind<IAccount>('ACCOUNT').toDynamicValue((context) => {
		if (typeof localStorage !== 'undefined') {
			return JSON.parse(localStorage.getItem('account') ?? '{}');
		}

		return {};
	});
});

export const EnvironmentProvider = new ContainerModule((bind) => {
	bind<Environment>('ENVIRONMENT').toDynamicValue(() => configEnvironment);
});
