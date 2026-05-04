import {IApi, IProductsResponse, IOrderRequest, IOrderResponse} from '../../types';

export class WebLarekApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getProducts(): Promise<IProductsResponse> {
        return this.api
            .get<IProductsResponse>('/product/')
    }

    createOrder(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order/', order);
    }
}