import React from 'react';
import { Badge } from '../ui/Badge';

export const ProductStatusBadge = ({ status }) => {
  const isAvailable = status === 'Active';
  return (
    <Badge variant={isAvailable ? 'success' : 'neutral'} size="sm" dot>
      {status}
    </Badge>
  );
};

export const StockLevelBadge = ({ stock }) => {
  if (stock === 0) {
    return <Badge variant="error" size="sm">Out of Stock</Badge>;
  }
  if (stock <= 10) {
    return <Badge variant="warning" size="sm">Low Stock ({stock})</Badge>;
  }
  return <Badge variant="neutral" size="sm">{stock} in stock</Badge>;
};

export default ProductStatusBadge;
