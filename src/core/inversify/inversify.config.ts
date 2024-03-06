import { GetProduct } from '@module/business/infrastructure/api/get-product';
import { Container, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class Example {
    public get() {
        return "prueba de inversify";
    }
}


const container = new Container();
container.bind<GetProduct>('GetProduct').to(GetProduct);

export { container };

