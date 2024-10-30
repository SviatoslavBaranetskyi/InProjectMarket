import * as React from 'react';
import { IProductContext } from '@context/ProductData/product.context.models.ts';
import { RequestStatus } from '@models/common.api.models.ts';
import { ProductsApi } from '@api/products.api.ts';
import { IProduct } from '@models/product.models.ts';

const ProductContext = React.createContext({} as IProductContext);

export const ProductDataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [products, setProducts] = React.useState<IProduct[]>([]);
  const [status, setStatus] = React.useState<RequestStatus>(
    RequestStatus.PENDING
  );
  const [error, setError] = React.useState<string | null>(null);

  const getProducts = async (signal?: AbortSignal) => {
    try {
      setStatus(RequestStatus.PENDING);

      const products = await ProductsApi.getProducts(signal);

      setProducts(products);
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

    getProducts(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const context = React.useMemo(
    () => ({
      products,
      error,
      status,
    }),
    [products, error, status]
  );

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductData = () => {
  const context = React.useContext(ProductContext);

  if (!context) {
    throw new Error('useProductData is not inside provider');
  }

  return context;
};
