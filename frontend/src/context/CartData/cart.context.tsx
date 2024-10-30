import * as React from 'react';
import { ICartContext } from '@context/CartData/cart.context.models.ts';
import { RequestStatus } from '@models/common.api.models.ts';
import { ICart } from '@models/cart.models.ts';
import { CartApi } from '@api/cart.api.ts';

const CartContext = React.createContext({} as ICartContext);

export const CartDataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [cart, setCart] = React.useState<ICart | null>(null);
  const [status, setStatus] = React.useState<RequestStatus>(
    RequestStatus.PENDING
  );
  const [error, setError] = React.useState<string | null>(null);

  const fetchCart = async (signal?: AbortSignal) => {
    try {
      setStatus(RequestStatus.PENDING);

      const cart = await CartApi.getProducts(signal);

      setCart(cart);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setStatus(RequestStatus.INACTIVE);
    }
  };

  React.useEffect(() => {
    const controller = new AbortController();

    fetchCart(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const context = React.useMemo(
    () => ({
      cart,
      status,
      error,
    }),
    [cart, status, error]
  );

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};

export const useCartData = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCartData should be used inside context');
  }

  return context;
};
