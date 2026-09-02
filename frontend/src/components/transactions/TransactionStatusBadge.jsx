import React from 'react';
import { Badge } from '../ui/Badge';

export const TransactionStatusBadge = ({ status }) => {
  switch (status) {
    case 'Completed':
      return (
        <Badge variant="success" size="sm" dot>
          Completed
        </Badge>
      );
    case 'Pending':
      return (
        <Badge variant="warning" size="sm" dot>
          Pending
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
      return (
        <Badge variant="purple" size="sm" dot>
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

export default TransactionStatusBadge;
