import React from 'react';
import { Box, Grid, Text, Icon } from '@chakra-ui/react';
import { FaChartBar, FaUsers, FaBuilding, FaDollarSign, FaTasks } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/common/StatCard'; // Assuming a StatCard component exists or will be created

// Dummy data for charts and stats
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const leadsData = [
  { name: 'Website', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'Direct', value: 200 },
  { name: 'Social', value: 278 },
];

const Reports = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '₹1,250,000',
      icon: FaDollarSign,
      change: '+12%',
      changeType: 'increase',
    },
    {
      title: 'New Leads',
      value: '350',
      icon: FaUsers,
      change: '+8%',
      changeType: 'increase',
    },
    {
      title: 'Properties Sold',
      value: '12',
      icon: FaBuilding,
      change: '-5%',
      changeType: 'decrease',
    },
    {
      title: 'Open Tasks',
      value: '28',
      icon: FaTasks,
      change: '+15%',
      changeType: 'increase',
    },
  ];

  return (
    <Box p={{ base: 4, md: 6 }}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Admin Reports
      </Text>

      {/* Stats Cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </Grid>

      {/* Charts */}
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={8}>
        {/* Sales Chart */}
        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
          <HStack mb={4}>
            <Icon as={FaChartBar} color="brand.primary" />
            <Text fontSize="lg" fontWeight="semibold">
              Monthly Sales
            </Text>
          </HStack>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#6C026B" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Leads by Source Chart */}
        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
          <HStack mb={4}>
            <Icon as={FaUsers} color="brand.primary" />
            <Text fontSize="lg" fontWeight="semibold">
              Leads by Source
            </Text>
          </HStack>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#A300A3" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </Box>
  );
};

export default Reports; 