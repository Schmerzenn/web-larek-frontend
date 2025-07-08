// Описывает товар на витрине 
export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Обработчик клика мыши по элементу 
export interface IActions {
  onClick: (event: MouseEvent) => void;
}

// Интерфейс данных формы оформления заказа 
export interface IOrderForm {
  payment?: string;
  address?: string;
  phone?: string;
  email?: string;
  total?: string | number;
}

// Расширяет IOrderForm, добавляя список товаров в заказе 
export interface IOrder extends IOrderForm {
  items: string[];
}

// Полная структура заказа для отправки на сервер 
export interface IOrderLot {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

// Результат успешного создания заказа 
export interface IOrderResult {
  id: string;
  total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
