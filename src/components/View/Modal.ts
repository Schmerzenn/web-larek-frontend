import { IEvents } from '../base/events';

export interface IModal {
	open(): void;
	close(): void;
	render(): HTMLElement;
}

export class Modal implements IModal {
	protected modalContainer: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected _content: HTMLElement;
	protected _pageWrapper: HTMLElement;

	constructor(modalContainer: HTMLElement, protected events: IEvents) {
		this.modalContainer = modalContainer;
		this.closeButton = modalContainer.querySelector('.modal__close');
		this._content = modalContainer.querySelector('.modal__content');
		this._pageWrapper = document.querySelector('.page__wrapper');

		this.closeButton.addEventListener('click', this.close.bind(this));
		this.modalContainer.addEventListener('click', this.close.bind(this));
		this.modalContainer
			.querySelector('.modal__container')
			.addEventListener('click', (event) => event.stopPropagation());
	}

	// принимает элемент разметки которая будет отображаться в "modal__content" модального окна
	set content(value: HTMLElement) {}

	// открытие модального окна
	open() {}

	// закрытие модального окна
	close() {}

	set locked(value: boolean) {}

	render(): HTMLElement {}
}
