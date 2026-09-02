import React from 'react';
import { Badge } from '../ui/Badge';

export const CartStatusBadge = ({ status }) => {
  switch (status) {
    case 'Shopping':
      return (
        <Badge variant="info" size="sm" dot>
          Shopping
        </Badge>
      );
    case 'Verification Required':
      return (
        <Badge variant="warning" size="sm" dot>
          Verification Required
        </Badge>
      );
    case 'Payment Pending':
      return (
        <Badge variant="purple" size="sm" dot>
          Payment Pending
        </Badge>
      );
    case 'Checkout Ready':
      return (
        <Badge variant="success" size="sm" dot>
          Checkout Ready
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

export default CartStatusBadge;
