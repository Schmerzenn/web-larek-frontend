import { IProductItem } from '../../types';

export interface IBasketModel {
	basketProducts: IProductItem[];
	getCounter: () => number;
	getSumAllProducts: () => number;
	setSelectedСard(data: IProductItem): void;
	deleteCardToBasket(item: IProductItem): void;
	clearBasketProducts(): void;
}

export class BasketModel implements IBasketModel {
	protected _basketProducts: IProductItem[]; // список карточек товара в корзине

	constructor() {
		this._basketProducts = [];
	}

	set basketProducts(data: IProductItem[]) {}

	get basketProducts() {}

	// количество товара в корзине
	getCounter() {}

	// сумма всех товаров в корзине
	getSumAllProducts() {}

	// добавить карточку товара в корзину
	setSelectedСard(data: IProductItem) {}

	// удалить карточку товара из корзины
	deleteCardToBasket(item: IProductItem) {}

	clearBasketProducts() {}
}
