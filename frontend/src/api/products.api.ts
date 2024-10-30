import axios from '@utils/axios';
import { IProduct } from '@models/product.models.ts';

export namespace ProductsApi {
  export const getProducts = async (
    signal?: AbortSignal
  ): Promise<IProduct[]> => {
    return axios
      .get<IProduct[]>('shop/products', { signal })
      .then(res => res.data);
  };
}
