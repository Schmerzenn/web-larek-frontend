import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/Model/ApiModel';
import { DataModel } from './components/Model/DataModel';
import { Card } from './components/View/Card';
import { CardPreview } from './components/View/CardPreview';
import { IOrderForm, IProductItem } from './types';
import { Modal } from './components/View/Modal';
import { ensureElement } from './utils/utils';
import { BasketModel } from './components/Model/BasketModel';
import { Basket } from './components/View/Basket';
import { BasketItem } from './components/View/BasketItem';
import { FormModel } from './components/Model/FormModel';
import { Order } from './components/View/FormOrder';
import { Contacts } from './components/View/FormContacts';
import { Success } from './components/View/Success';

const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;
const successTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;

const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const dataModel = new DataModel(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(basketTemplate, events);
const basketModel = new BasketModel();
const formModel = new FormModel(events);
const order = new Order(orderTemplate, events);
const contacts = new Contacts(contactsTemplate, events);

// Отображения карточек товара на странице
events.on('productCards:receive', () => {});

// Получение Объекта данных "IProductItem" карточки по клику
events.on('card:select', (item: IProductItem) => {});

// Открытие модального окна карточки товара
events.on('modalCard:open', (item: IProductItem) => {});

// Добавление карточки товара в корзину
events.on('card:addBasket', () => {});

// Открытие модального окна корзины
events.on('basket:open', () => {});

// Удаление карточки товара из корзины
events.on('basket:basketItemRemove', (item: IProductItem) => {});

// Открытие "способа оплаты" и "адреса доставки" модального окна
events.on('order:open', () => {});

// передаём способ оплаты
events.on('order:paymentSelection', (button: HTMLButtonElement) => {});

// Отслеживаем изменение в поле в вода "адреса доставки"
events.on(
	`order:changeAddress`,
	(data: { field: string; value: string }) => {}
);

// Валидация данных строки "address" и payment
events.on('formErrors:address', (errors: Partial<IOrderForm>) => {});

// Открытие модального окна "email" и "телефон"
events.on('contacts:open', () => {});

// Отслеживаем изменение в полях вода "email" и "телефон"
events.on(
	`contacts:changeInput`,
	(data: { field: string; value: string }) => {}
);

// Валидация данных строки "email" и "телефон"
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {});

// Открытие модального окна "Заказ оформлен"
events.on('success:open', () => {});

// Закрытие модального окна "Заказ оформлен"
events.on('success:close', () => {});

// Блокировка прокрутку страницы при открытие модального окна
events.on('modal:open', () => {});

// Разблокируем прокрутку страницы при закрытие модального окна
events.on('modal:close', () => {});

// Получаем данные с сервера
apiModel
	.getListProductCard()
	.then(function (data: IProductItem[]) {
		dataModel.productCards = data;
	})
	.catch((error) => console.log(error));
