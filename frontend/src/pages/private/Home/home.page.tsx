import * as React from 'react';
import { ProductDataProvider } from '@context/ProductData/product.context.tsx';
import { ProductsList } from '@features/Products/products-list.component.tsx';

export const HomePage: React.FC = () => {
  return (
    <ProductDataProvider>
      <ProductsList />
    </ProductDataProvider>
  );
};
