import { IProductItem } from '../../types';
import { IEvents } from '../base/events';

export interface IDataModel {
	productCards: IProductItem[];
	selectedСard: IProductItem;
	setPreview(item: IProductItem): void;
}

export class DataModel implements IDataModel {
	protected _productCards: IProductItem[];
	selectedСard: IProductItem;

	constructor(protected events: IEvents) {
		this._productCards = [];
	}

	set productCards(data: IProductItem[]) {}

	get productCards() {}

	setPreview(item: IProductItem) {}
}
