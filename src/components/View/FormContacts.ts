import { IEvents } from '../base/events';

export interface IContacts {
	formContacts: HTMLFormElement;
	inputAll: HTMLInputElement[];
	buttonSubmit: HTMLButtonElement;
	formErrors: HTMLElement;
	render(): HTMLElement;
}

export class Contacts implements IContacts {
	formContacts: HTMLFormElement;
	inputAll: HTMLInputElement[];
	buttonSubmit: HTMLButtonElement;
	formErrors: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.formContacts = template.content
			.querySelector('.form')
			.cloneNode(true) as HTMLFormElement;
		this.inputAll = Array.from(
			this.formContacts.querySelectorAll('.form__input')
		);
		this.buttonSubmit = this.formContacts.querySelector('.button');
		this.formErrors = this.formContacts.querySelector('.form__errors');
	}

	set valid(value: boolean) {}

	render() {}
}
