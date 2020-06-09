import { Bookstore } from './bookstore';
import { Environment } from './environment.store';
import { Search } from './search.store';
import { AuthStore } from './auth.store';
import { BaseStore } from './base.store';
import { Subscriber } from './subscriber.store';
import { Product } from './product.store';

export const APP_STORES = [
  Environment,
  Search,
  AuthStore,
  Bookstore,
  BaseStore,
  Subscriber,
  Product
];
