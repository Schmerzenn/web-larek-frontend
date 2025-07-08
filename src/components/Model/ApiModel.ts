import { ApiListResponse, Api } from '../base/api';
import { IOrderLot, IOrderResult, IProductItem } from '../../types';

export interface IApiModel {
	cdn: string;
	items: IProductItem[];
	getListProductCard: () => Promise<IProductItem[]>;
	postOrderLot: (order: IOrderLot) => Promise<IOrderResult>;
}

export class ApiModel extends Api {
	cdn: string;
	items: IProductItem[];

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getListProductCard(): Promise<IProductItem[]> {}

	// получаем ответ от сервера по сделанному заказу
	postOrderLot(order: IOrderLot): Promise<IOrderResult> {}
}
