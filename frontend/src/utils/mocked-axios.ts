import AxiosMockAdapter from 'axios-mock-adapter';
import { ILoginResponse, IRegisterResponse } from '@models/auth.models.ts';
import { getAccessToken } from '@utils/local-storage.service.ts';
import { IProduct } from '@models/product.models.ts';
import { ICart } from '@models/cart.models.ts';

export const applyMockInterceptors = (adapter: AxiosMockAdapter) => {
  // USERS
  adapter.onPost('auth/login').reply<ILoginResponse>(200, {
    access: 'access-token',
  });

  adapter.onPost('auth/register').reply<IRegisterResponse>(200, {
    message: 'success',
  });

  adapter.onGet('auth/profile').reply(
    () =>
      new Promise((res, rej) => {
        const token = getAccessToken();

        if (token === null) {
          rej([401, { success: false }]);
        }

        res([
          200,
          {
            address: 'address',
            email: 'email@gmail.com',
            first_name: 'Sviatoslav',
            last_name: 'Last',
            phone_number: '+333333333',
            orders: [],
          },
        ]);
      })
  );

  // PRODUCTS
  adapter.onGet('shop/products').reply<IProduct[]>(200, [
    {
      id: 1,
      name: 'Name',
      description: 'Description',
      price: 3.1,
      category: [{ id: 1, name: 'Category1 ' }],
      tags: [{ id: 1, name: 'Tag1' }],
    },
  ]);

  // CART
  adapter.onGet('carts').reply<ICart>(200, {
    id: 2,
    created_at: '',
    total_items: 2,
    total_price: 9.1,
    user_id: 1,
    items: [
      {
        id: 1,
        total_price: 10,
        price: '10',
        product: 'Product',
        quantity: 2,
      },
    ],
  });
};
