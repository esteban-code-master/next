'use client';

import { GetProduct } from '@module/business/infrastructure/api/get-product';
import { Container } from 'inversify';
import 'reflect-metadata';
import { storeProvider } from './ejemplo';

const container = new Container();
container.load(storeProvider);
container.bind<GetProduct>('GetProduct').to(GetProduct);

export { container };
