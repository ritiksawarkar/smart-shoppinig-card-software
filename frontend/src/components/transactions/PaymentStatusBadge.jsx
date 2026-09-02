import React from 'react';
import { Badge } from '../ui/Badge';

export const PaymentStatusBadge = ({ status }) => {
  switch (status) {
    case 'Paid':
      return (
        <Badge variant="success" size="sm">
          Paid
        </Badge>
      );
    case 'Pending':
      return (
        <Badge variant="warning" size="sm">
          Pending
        </Badge>
      );
    case 'Failed':
      return (
        <Badge variant="error" size="sm">
          Failed
        </Badge>
      );
    case 'Refunded':
      return (
        <Badge variant="purple" size="sm">
          Refunded
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

export default PaymentStatusBadge;
