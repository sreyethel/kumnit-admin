export interface IProduct {
  key?: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  period: number;
  name: string;
  price: number;
  discount: number;
  note?: string;
  book: Array<any>;
  productType:any;
}
export interface IProductByBook {
  key?: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  period: number;
  name: string;
  price: number;
  discount: number;
  note?: string;

}

export interface ISubscriber {
  key?: string;
  status?: any;
  page_key?: number;
  create_date?: Date;
  create_by?: object;
  update_date?: Date;
  update_by?: object;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  phoneNumber?: string;
  email?: string;
  isPaid?: boolean;
  product?: any;
  active_by?: any;
  active_date?: Date;
  expiredDate?: Date;
  expiredDateKey?: number;
}
