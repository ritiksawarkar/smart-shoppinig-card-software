import React from 'react';
import { Badge } from '../ui/Badge';

export const ReconciliationBadge = ({ status }) => {
  switch (status) {
    case 'Matched':
      return (
        <Badge variant="success" size="sm">
          Matched
        </Badge>
      );
    case 'Pending Review':
      return (
        <Badge variant="warning" size="sm">
          Pending Review
        </Badge>
      );
    case 'Mismatch':
      return (
        <Badge variant="error" size="sm">
          Mismatch
        </Badge>
      );
    case 'N/A':
    default:
      return (
        <Badge variant="neutral" size="sm">
          {status || 'N/A'}
        </Badge>
      );
  }
};

export default ReconciliationBadge;
