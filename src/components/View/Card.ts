import { IActions, IProductItem } from '../../types';
import { IEvents } from '../base/events';

export interface ICard {
	render(data: IProductItem): HTMLElement;
}

export class Card implements ICard {
	protected _cardElement: HTMLElement;
	protected _cardCategory: HTMLElement;
	protected _cardTitle: HTMLElement;
	protected _cardImage: HTMLImageElement;
	protected _cardPrice: HTMLElement;
	protected _colors = <Record<string, string>>{
		дополнительное: 'additional',
		'софт-скил': 'soft',
		кнопка: 'button',
		'хард-скил': 'hard',
		другое: 'other',
	};

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		this._cardElement = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;
		this._cardCategory = this._cardElement.querySelector('.card__category');
		this._cardTitle = this._cardElement.querySelector('.card__title');
		this._cardImage = this._cardElement.querySelector('.card__image');
		this._cardPrice = this._cardElement.querySelector('.card__price');
	}

	protected setText(element: HTMLElement, value: unknown): string {}

	set cardCategory(value: string) {}

	protected setPrice(value: number | null): string {}

	render(data: IProductItem): HTMLElement {}
}
