import React from 'react';
import { Badge } from '../ui/Badge';

export const VerificationStatusBadge = ({ status }) => {
  switch (status) {
    case 'Verified':
      return (
        <Badge variant="success" size="sm" dot>
          Verified
        </Badge>
      );
    case 'Verification Required':
      return (
        <Badge variant="warning" size="sm" dot>
          Verification Required
        </Badge>
      );
    case 'Pending':
      return (
        <Badge variant="neutral" size="sm" dot>
          Pending
        </Badge>
      );
    case 'Resolved':
      return (
        <Badge variant="purple" size="sm" dot>
          Resolved
        </Badge>
      );
    case 'Sensor Error':
      return (
        <Badge variant="error" size="sm" dot>
          Sensor Error
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

export default VerificationStatusBadge;
