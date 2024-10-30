import axios from '@utils/axios';
import { ICart } from '@models/cart.models.ts';

export namespace CartApi {
  export const getProducts = async (signal?: AbortSignal): Promise<ICart> => {
    return axios.get<ICart>('carts', { signal }).then(res => res.data);
  };
}
