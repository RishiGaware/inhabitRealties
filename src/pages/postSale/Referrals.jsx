import React, { useState } from 'react';
import {
  Box,
  Text,
  Grid,
  Badge,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { FaUsers, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import TableContainer from '../../components/common/Table/TableContainer';
import CommonTable from '../../components/common/Table/CommonTable';
import StatCard from '../../components/common/StatCard';

const dummyReferrals = [
  { id: 'REF-001', referrerName: 'Anjali Sharma', refereeName: 'Vikram Singh', date: '2024-07-15', status: 'Pending' },
  { id: 'REF-002', referrerName: 'Rahul Verma', refereeName: 'Priya Mehta', date: '2024-07-12', status: 'Successful' },
  { id: 'REF-003', referrerName: 'Sunita Patil', refereeName: 'Amit Kumar', date: '2024-07-10', status: 'Pending' },
  { id: 'REF-004', referrerName: 'Karan Gupta', refereeName: 'Neha Reddy', date: '2024-07-05', status: 'Failed' },
  { id: 'REF-005', referrerName: 'Priya Mehta', refereeName: 'Rohan Desai', date: '2024-06-28', status: 'Successful' },
];

const Referrals = () => {
  const [referrals] = useState(dummyReferrals);

  const totalReferrals = referrals.length;
  const successfulReferrals = referrals.filter(r => r.status === 'Successful').length;
  const pendingReferrals = referrals.filter(r => r.status === 'Pending').length;
  const failedReferrals = referrals.filter(r => r.status === 'Failed').length;

  const stats = [
    { title: 'Total Referrals', value: totalReferrals, icon: FaUsers },
    { title: 'Successful', value: successfulReferrals, icon: FaCheckCircle, changeType: 'increase' },
    { title: 'Pending', value: pendingReferrals, icon: FaHourglassHalf },
    { title: 'Failed', value: failedReferrals, icon: FaTimesCircle, changeType: 'decrease' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Successful':
        return <Badge colorScheme="green">Successful</Badge>;
      case 'Pending':
        return <Badge colorScheme="yellow">Pending</Badge>;
      case 'Failed':
        return <Badge colorScheme="red">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const columns = [
    { Header: 'Referral ID', accessor: 'id' },
    { Header: 'Referrer Name', accessor: 'referrerName' },
    { Header: 'Referee Name', accessor: 'refereeName' },
    { Header: 'Date', accessor: 'date', Cell: ({ value }) => new Date(value).toLocaleDateString() },
    { Header: 'Status', accessor: 'status', Cell: ({ value }) => getStatusBadge(value) },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: () => (
        <HStack>
            <IconButton icon={<FiMail />} size="sm" aria-label="Send Reminder" />
        </HStack>
      ),
    },
  ];

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>Referral Management</Text>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        {stats.map((stat, index) => <StatCard key={index} {...stat} change="" />)}
      </Grid>
      
      <TableContainer title="All Referrals">
        <CommonTable columns={columns} data={referrals} />
      </TableContainer>
    </Box>
  );
};

export default Referrals; 