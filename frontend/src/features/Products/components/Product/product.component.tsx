import * as React from 'react';
import { IProduct } from '@models/product.models.ts';
import { Box, Paper, Stack, Typography } from '@mui/material';

export const Product: React.FC<IProduct> = ({
  name,
  price,
  tags,
  category,
  description,
}) => {
  const combinedTags = tags.map(tag => tag.name).join(', ');
  const combinedCategories = category.map(tag => tag.name).join(', ');

  return (
    <Paper sx={{ width: 340, p: 4 }}>
      <Stack gap={4}>
        <Typography>{name}</Typography>
        <Typography>{description}</Typography>
        <Typography>{price} UAH</Typography>
        <Box>
          <Typography>{combinedTags}</Typography>
          <Typography>{combinedCategories}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};
