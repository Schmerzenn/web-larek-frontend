import { Card } from './Card';
import { IActions, IProductItem } from '../../types';
import { IEvents } from '../base/events';

export interface ICard {
	text: HTMLElement;
	button: HTMLElement;
	render(data: IProductItem): HTMLElement;
}

export class CardPreview extends Card implements ICard {
	text: HTMLElement;
	button: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		super(template, events, actions);
		this.text = this._cardElement.querySelector('.card__text');
		this.button = this._cardElement.querySelector('.card__button');
		this.button.addEventListener('click', () => {
			this.events.emit('card:addBasket');
		});
	}

	notSale(data: IProductItem) {}

	render(data: IProductItem): HTMLElement {}
}
