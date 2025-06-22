import React, { useState } from 'react';
import {
  Box,
  Badge,
  HStack,
  Text,
  useToast,
  IconButton,
  Grid,
} from '@chakra-ui/react';
import { FiMail } from 'react-icons/fi';
import { FaHourglassHalf, FaExclamationTriangle, FaCalendarDay } from 'react-icons/fa';

import TableContainer from '../../../components/common/Table/TableContainer';
import CommonTable from '../../../components/common/Table/CommonTable';
import StatCard from '../../../components/common/StatCard';

// Dummy data
const dummyPendingPayments = [
  {
    _id: "1",
    propertyName: "Sunset Villa",
    buyerName: "John Doe",
    dueAmount: 500000,
    dueDate: "2024-04-15",
    status: "OVERDUE",
    overdueDays: 5,
  },
  {
    _id: "2",
    propertyName: "Garden Heights",
    buyerName: "Mike Johnson",
    dueAmount: 800000,
    dueDate: "2024-04-20",
    status: "DUE_TODAY",
    overdueDays: 0,
  },
  {
    _id: "3",
    propertyName: "Ocean View Apartment",
    buyerName: "Jane Smith",
    dueAmount: 400000,
    dueDate: "2024-04-25",
    status: "UPCOMING",
    overdueDays: -5,
  },
];

const PendingPayments = () => {
  const [payments] = useState(dummyPendingPayments);
  const toast = useToast();

  const handleSendReminder = (payment) => {
    toast({
      title: 'Reminder Sent',
      description: `Payment reminder sent to ${payment.buyerName}.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const getStatusBadge = (status, overdueDays) => {
    if (status === 'OVERDUE') {
      return <Badge colorScheme="red">Overdue ({overdueDays} days)</Badge>;
    }
    if (status === 'DUE_TODAY') {
      return <Badge colorScheme="orange">Due Today</Badge>;
    }
    return <Badge colorScheme="blue">Upcoming</Badge>;
  };

  const overduePayments = payments.filter(p => p.status === 'OVERDUE');
  const dueTodayPayments = payments.filter(p => p.status === 'DUE_TODAY');
  const totalOverdueAmount = overduePayments.reduce((sum, p) => sum + p.dueAmount, 0);

  const stats = [
    { title: 'Total Pending', value: payments.length, icon: FaHourglassHalf, changeType: '' },
    { title: 'Overdue Payments', value: overduePayments.length, icon: FaExclamationTriangle, change: `₹${totalOverdueAmount.toLocaleString()}`, changeType: 'decrease' },
    { title: 'Due Today', value: dueTodayPayments.length, icon: FaCalendarDay, changeType: '' },
  ];

  const columns = [
    { Header: 'Property Name', accessor: 'propertyName' },
    { Header: 'Buyer Name', accessor: 'buyerName' },
    {
      Header: 'Due Amount',
      accessor: 'dueAmount',
      Cell: ({ value }) => `₹${value.toLocaleString()}`,
    },
    {
      Header: 'Due Date',
      accessor: 'dueDate',
      Cell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => getStatusBadge(row.original.status, row.original.overdueDays),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <IconButton
          icon={<FiMail />}
          size="sm"
          onClick={() => handleSendReminder(row.original)}
          aria-label="Send Reminder"
        />
      ),
    },
  ];

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Pending Payments
      </Text>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </Grid>

      <TableContainer title="All Pending Payments">
        <CommonTable columns={columns} data={payments} />
      </TableContainer>
    </Box>
  );
};

export default PendingPayments; 