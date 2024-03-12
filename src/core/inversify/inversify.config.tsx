'use client';

import { CreateAccount } from '@module/business/infrastructure/api/create-account';
import { GetProduct } from '@module/business/infrastructure/api/get-product';
import { Container } from 'inversify';
import 'reflect-metadata';
import { storeProvider } from './ejemplo';

const container = new Container();
container.load(storeProvider);
container.bind<GetProduct>('GetProduct').to(GetProduct);
container.bind<CreateAccount>('CreateAccount').to(CreateAccount);

export { container };
