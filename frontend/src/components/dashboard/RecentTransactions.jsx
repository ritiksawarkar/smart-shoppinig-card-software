import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, ArrowRight, Smartphone, CreditCard, Banknote } from 'lucide-react';
import { Card } from '../ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const RecentTransactions = ({ transactions = [] }) => {
  const navigate = useNavigate();

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'UPI':
        return <Smartphone className="h-3.5 w-3.5 text-blue-600 inline mr-1" />;
      case 'Card':
        return <CreditCard className="h-3.5 w-3.5 text-indigo-600 inline mr-1" />;
      case 'Cash':
        return <Banknote className="h-3.5 w-3.5 text-emerald-600 inline mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card
      title="Recent Transactions"
      subtitle="Latest completed customer shopping checkouts"
      footer={
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">Digital & Cash counter audit</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/transactions')}
            className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto"
          >
            View All Transactions <ArrowRight className="h-3.5 w-3.5 ml-1 inline" />
          </Button>
        </div>
      }
    >
      {transactions.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500">
          <Receipt className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          No completed transactions yet today.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeadCell>TXN ID</TableHeadCell>
              <TableHeadCell>Cart</TableHeadCell>
              <TableHeadCell>Items</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Method</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell className="text-right">Time</TableHeadCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell className="font-bold text-slate-900">{txn.id}</TableCell>
                <TableCell className="font-semibold text-slate-700">{txn.cartId}</TableCell>
                <TableCell>{txn.itemsCount} items</TableCell>
                <TableCell className="font-extrabold text-slate-900">
                  ₹{txn.amount.toLocaleString('en-IN')}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center">
                    {getPaymentIcon(txn.paymentMethod)}
                    <span className="font-semibold">{txn.paymentMethod}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={txn.status === 'Completed' ? 'success' : 'warning'} size="sm">
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-slate-500">{txn.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};

export default RecentTransactions;
