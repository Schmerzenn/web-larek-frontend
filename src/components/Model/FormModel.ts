import { IEvents } from '../base/events';
import { FormErrors } from '../../types/index';

export interface IFormModel {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	setOrderAddress(field: string, value: string): void;
	validateOrder(): boolean;
	setOrderData(field: string, value: string): void;
	validateContacts(): boolean;
	getOrderLot(): object;
}

export class FormModel implements IFormModel {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	formErrors: FormErrors = {};

	constructor(protected events: IEvents) {
		this.payment = '';
		this.email = '';
		this.phone = '';
		this.address = '';
		this.total = 0;
		this.items = [];
	}

	// принимаем значение строки "address"
	setOrderAddress(field: string, value: string) {}

	// валидация данных строки "address"
	validateOrder() {}

	// принимаем значение данных строк "email" и "телефон"
	setOrderData(field: string, value: string) {}

	// Валидация данных строк "email" и "телефон"
	validateContacts() {}

	getOrderLot() {}
}
