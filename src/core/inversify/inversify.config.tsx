'use client';

import { AccountApi } from '@module/business/infrastructure/api/account';
import { CreateAccount } from '@module/business/infrastructure/api/create-account';
import { GetProduct } from '@module/business/infrastructure/api/get-product';
import { CategoryApi } from '@module/product/infrastructure/api/category';
import { Container } from 'inversify';
import 'reflect-metadata';
import { EnvironmentProvider, storeProvider } from './ejemplo';

const container = new Container();
container.load(storeProvider);
container.load(EnvironmentProvider);
container.bind<GetProduct>('GetProduct').to(GetProduct);
container.bind<CreateAccount>('CreateAccount').to(CreateAccount);
container.bind<AccountApi>('AccountApi').to(AccountApi);
container.bind<CategoryApi>('CategoryApi').to(CategoryApi);

export { container };
