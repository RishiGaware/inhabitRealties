import React, { useState } from 'react';
import {
  Box,
  Text,
  Grid,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { FaMoneyBillWave, FaCheckCircle, FaHourglassHalf, FaExclamationCircle } from 'react-icons/fa';
import TableContainer from '../../components/common/Table/TableContainer';
import CommonTable from '../../components/common/Table/CommonTable';
import StatCard from '../../components/common/StatCard';

const dummyPayments = [
  { id: 'PAY-001', propertyName: 'Sunset Villa', customerName: 'John Doe', amount: 50000, date: '2024-07-20', status: 'Paid' },
  { id: 'PAY-002', propertyName: 'Garden Heights', customerName: 'Jane Smith', amount: 75000, date: '2024-07-22', status: 'Pending' },
  { id: 'PAY-003', propertyName: 'Ocean View Apt', customerName: 'Mike Johnson', amount: 62000, date: '2024-07-18', status: 'Paid' },
  { id: 'PAY-004', propertyName: 'Downtown Loft', customerName: 'Emily White', amount: 30000, date: '2024-07-25', status: 'Upcoming' },
  { id: 'PAY-005', propertyName: 'Sunset Villa', customerName: 'John Doe', amount: 50000, date: '2024-06-20', status: 'Overdue' },
];

const PaymentStatus = () => {
  const [payments] = useState(dummyPayments);

  const totalPayments = payments.length;
  const paidPayments = payments.filter(p => p.status === 'Paid').length;
  const pendingPayments = payments.filter(p => p.status === 'Pending' || p.status === 'Upcoming').length;
  const overduePayments = payments.filter(p => p.status === 'Overdue').length;

  const stats = [
    { title: 'Total Payments', value: totalPayments, icon: FaMoneyBillWave },
    { title: 'Paid', value: paidPayments, icon: FaCheckCircle, changeType: 'increase' },
    { title: 'Pending/Upcoming', value: pendingPayments, icon: FaHourglassHalf },
    { title: 'Overdue', value: overduePayments, icon: FaExclamationCircle, changeType: 'decrease' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return <Badge colorScheme="green">Paid</Badge>;
      case 'Pending':
        return <Badge colorScheme="yellow">Pending</Badge>;
      case 'Upcoming':
        return <Badge colorScheme="blue">Upcoming</Badge>;
      case 'Overdue':
        return <Badge colorScheme="red">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const columns = [
    { Header: 'Payment ID', accessor: 'id' },
    { Header: 'Property Name', accessor: 'propertyName' },
    { Header: 'Customer Name', accessor: 'customerName' },
    { Header: 'Amount', accessor: 'amount', Cell: ({ value }) => `₹${value.toLocaleString()}` },
    { Header: 'Date', accessor: 'date', Cell: ({ value }) => new Date(value).toLocaleDateString() },
    { Header: 'Status', accessor: 'status', Cell: ({ value }) => getStatusBadge(value) },
  ];

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>Payment Status</Text>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        {stats.map((stat, index) => <StatCard key={index} {...stat} change="" />)}
      </Grid>
      
      <TableContainer title="All Payments">
        <CommonTable columns={columns} data={payments} />
      </TableContainer>
    </Box>
  );
};

export default PaymentStatus; 