import * as React from 'react';
import { useProductData } from '@context/ProductData/product.context.tsx';
import { Box } from '@mui/material';
import { Product } from './components/Product/product.component.tsx';

export const ProductsList: React.FC = () => {
  const { products } = useProductData();

  return (
    <Box>
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </Box>
  );
};
