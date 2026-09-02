import React from 'react';
import { Badge } from '../ui/Badge';

export const WeightStatusBadge = ({ status }) => {
  switch (status) {
    case 'Verified':
      return (
        <Badge variant="success" size="sm" dot>
          Verified
        </Badge>
      );
    case 'Checking':
      return (
        <Badge variant="warning" size="sm" dot>
          Checking
        </Badge>
      );
    case 'Mismatch':
      return (
        <Badge variant="error" size="sm" dot>
          Mismatch
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

export default WeightStatusBadge;
