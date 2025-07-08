# Проектная работа "Веб-ларек"

https://github.com/Schmerzenn/web-larek-frontend

## Описание

В проекте применён паттерн MVP (Model–View–Presenter), обеспечивающий чёткое разделение ответственностей и слабую связанность компонентов. Каждый слой выполняет строго определённую роль:

Model — отвечает за работу с данными. Загружает их через API, обрабатывает, хранит и предоставляет бизнес-логику. Также принимает данные, введённые пользователем (например, адрес, e-mail и содержимое корзины).

View — отображает интерфейс для взаимодействия с пользователем: карточки товаров, формы, кнопки. Обрабатывает пользовательские действия (клики, ввод данных) и генерирует события, не содержащие логики.

Presenter — реализован через EventEmitter (брокер событий) и вспомогательные классы, которые подписаны на события от View и от Model. Именно Presenter координирует поток данных и управляет связью между слоями. Он обрабатывает события, полученные от View, обновляет Model и триггерит обновление View, если данные изменились.

## Стек

```
HTML, SCSS, TS, Webpack
```

## Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Документация

### 1. Типы и интерфейсы

```ts
// Описывает товар на витрине
interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// Обработчик клика мыши по элементу
interface IActions {
	onClick: (event: MouseEvent) => void;
}

// Интерфейс данных формы оформления заказа
interface IOrderForm {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}

// Расширяет IOrderForm, добавляя список товаров в заказе
interface IOrder extends IOrderForm {
	items: string[];
}

// Полная структура заказа для отправки на сервер
interface IOrderLot {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

// Результат успешного создания заказа
interface IOrderResult {
	id: string;
	total: number;
}

type FormErrors = Partial<Record<keyof IOrder, string>>;
```

---

### 2. Модели данных

#### 2.1. ApiModel

Работа с сервером (в `base/api.ts` — HTTP‑клиент).

- **Методы**

  - `getListProductCard(): Promise<IProductItem[]>`
    Выполняет `GET /product`, получает массив `IProductItem`,
  - `postOrderLot(order: IOrderLot): Promise<IOrderResult>`
    Отправляет `POST /order` с телом `order`.

#### 2.2. DataModel

Хранит каталог и выбранный товар.

- **Свойства**

  - `productCards: IProductItem[]`

- **Методы**

  - `setPreview(item: IProductItem): void`
    Устанавливает `selectedCard`

- **События**

  | Событие                | Когда эмитится                                   |
  | ---------------------- | ------------------------------------------------ | --- |
  | `productCards:receive` | После присваивания нового массива `productCards` |     |

#### 2.3. BasketModel

Управляет списком товаров в корзине.

- **Свойства**

  - `basketProducts: IProductItem[]`

- **Методы**

  - `setSelectedСard(data: IProductItem): void`
  - `deleteCardToBasket(item: IProductItem): void`
  - `clearBasketProducts(): void`
  - `getCounter(): number` — число элементов
  - `getSumAllProducts(): number` — суммарная стоимость

- **События**
  Модель корзины сама не эмитит события;

#### 2.4. FormModel

Хранит данные текущего заказа перед отправкой.

- **Свойства**

  - `email: string`
  - `phone: string`
  - `address: string`
  - `payment: string`
  - `items: string[]`
  - `total: number`

- **Методы**

  - `setOrderData(field: string, value: string): void;`
  - `setOrderAddress(field: "address", value: string): void`
  - `validateContacts(): boolean`
  - `validateOrder(): boolean`
  - `getOrderLot(): object`

- **События**

  | Событие             | Когда эмитится                                      |
  | ------------------- | --------------------------------------------------- |
  | `formErrors:change` | При изменении ошибок валидации (отображение ошибок) |

---

### 3. EventEmitter

Общий механизм коммуникации.

- Методы:

  - `on(event: string, handler: Function): void`
  - `emit(event: string, payload?: any): void`
  - `trigger(event: string, payload?: any): void`

Используется всеми моделями и компонентами для подписки и оповещения.

---

### 4. Компоненты представления

#### 4.1. Modal (`View/Modal.ts`)

Базовый класс для модальных окон.

```ts
constructor(modalContainer: HTMLElement, protected events: IEvents)
set content(node: HTMLElement)
open(): void   // добавляет CSS-класс, emit "modal:open"
close(): void  // убирает класс, emit "modal:close"
```

#### 4.2. Card (`View/Card.ts`)

Карточка товара.

```ts
constructor(
  template: HTMLTemplateElement,
  protected events: IEvents
  actions: {
    onClick?: () => void;   // обработка клика по карточке
  }
)
render(data: IProductItem): HTMLElement
```

#### 4.3. CardPreview (`View/CardPreview.ts`)

Подробная карточка (расширяет Card).

- При клике на кнопку «Добавить в корзину» эмитит `card:addBasket`.
- `render(data: IProductItem)`: показывает описание и кнопку.

#### 4.4. Basket (`View/Basket.ts`)

Отображает список товаров и контролы корзины.

```ts
constructor(template: HTMLTemplateElement, protected events: IEvents)
set items(items: HTMLElement[])
renderHeaderBasketCounter(value: number): void  // обновляет счётчик
```

- При клике на иконку эмитит `basket:open`.
- При клике на кнопку «Оформить» — `order:open`.

#### 4.5. BasketItem (`View/BasketItem.ts`)

Одиночный элемент корзины.

```ts
constructor(
  template: HTMLTemplateElement,
  events: EventEmitter,
  actions: { onClick?: () => void }  // удаление
)
render(data: IProductItem, index: number): HTMLElement
```

#### 4.6. Contacts (`View/FormContacts.ts`)

Форма ввода контактов.

- Поля: Email, Телефон
- События:

  - `contacts:changeInput` при каждом вводе `{ field, value }`
  - `success:open` при submit (открыть окно успеха)

#### 4.7. Order (`View/FormOrder.ts`)

Форма выбора оплаты и ввода адреса.

- Поля: способ оплаты (`select`), адрес (`input`)
- События:

  - `order:paymentSelection` при выборе оплаты
  - `order:changeAddress` при вводе адреса
  - `contacts:open` при submit (переход к форме контактов)

#### 4.8. Success (`View/Success.ts`)

Окно успешного оформления.

- Показывает сообщение «Списано X синапсов»
- Кнопка «За новыми покупками!» эмитит `success:close`

---

### 5. Основные события

| Событие                  | Отправитель | Описание                                    |
| ------------------------ | ----------- | ------------------------------------------- |
| `productCards:receive`   | DataModel   | Получен новый список товаров                |
| `modalCard:open`         | DataModel   | Открыть подробную карточку                  |
| `card:addBasket`         | CardPreview | Пользователь добавил товар из превью        |
| `basket:open`            | Basket      | Открыть окно корзины                        |
| `order:open`             | Basket      | Перейти к форме оформления заказа           |
| `order:paymentSelection` | Order       | Выбран способ оплаты                        |
| `order:changeAddress`    | Order       | Введён адрес доставки                       |
| `contacts:open`          | Order       | Перейти к форме ввода контактов             |
| `contacts:changeInput`   | Contacts    | Изменён ввод поля (email или phone)         |
| `success:open`           | Contacts    | Открыть окно об успешном оформлении         |
| `success:close`          | Success     | Закрыть окно и вернуться к каталогу товаров |
