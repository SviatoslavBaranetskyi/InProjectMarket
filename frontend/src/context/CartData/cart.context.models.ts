import { ICart } from '@models/cart.models.ts';
import { RequestStatus } from '@models/common.api.models.ts';

export interface ICartContext {
  cart: ICart | null;
  status: RequestStatus;
  error: string | null;
}
