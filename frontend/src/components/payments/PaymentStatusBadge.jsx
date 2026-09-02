import React from 'react';
import { Badge } from '../ui/Badge';

export const PaymentStatusBadge = ({ status }) => {
  switch (status) {
    case 'Paid':
      return (
        <Badge variant="success" size="sm" dot>
          Paid
        </Badge>
      );
    case 'Pending':
    case 'Processing':
      return (
        <Badge variant="warning" size="sm" dot>
          {status}
        </Badge>
      );
    case 'Failed':
      return (
        <Badge variant="error" size="sm" dot>
          Failed
        </Badge>
      );
    case 'Cancelled':
      return (
        <Badge variant="neutral" size="sm" dot>
          Cancelled
        </Badge>
      );
    case 'Refunded':
    case 'Partially Refunded':
      return (
        <Badge variant="purple" size="sm" dot>
          {status}
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
