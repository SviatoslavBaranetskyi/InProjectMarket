import { IProduct } from '@models/product.models.ts';
import { RequestStatus } from '@models/common.api.models.ts';

export interface IProductContext {
  products: IProduct[],
  error: string | null,
  status: RequestStatus,
}