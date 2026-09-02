import React from 'react';
import { Badge } from '../ui/Badge';

export const StockStatusBadge = ({ status }) => {
  switch (status) {
    case 'In Stock':
      return (
        <Badge variant="success" size="sm" dot>
          In Stock
        </Badge>
      );
    case 'Low Stock':
      return (
        <Badge variant="warning" size="sm" dot>
          Low Stock
        </Badge>
      );
    case 'Out of Stock':
      return (
        <Badge variant="error" size="sm" dot>
          Out of Stock
        </Badge>
      );
    default:
      return (
        <Badge variant="neutral" size="sm">
          {status || 'Unknown'}
        </Badge>
      );
  }
};

export default StockStatusBadge;
