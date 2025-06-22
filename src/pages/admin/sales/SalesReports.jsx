import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  Select,
  useToast,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FiDownload, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FaChartBar, FaChartPie, FaDollarSign, FaMoneyBillWave, FaBuilding } from 'react-icons/fa';
import StatCard from '../../../components/common/StatCard';

// Dummy data for reports
const dummyMonthlyData = [
  { month: 'Jan', sales: 2500000, installments: 1800000, rent: 500000 },
  { month: 'Feb', sales: 3200000, installments: 2200000, rent: 550000 },
  { month: 'Mar', sales: 2800000, installments: 1900000, rent: 520000 },
  { month: 'Apr', sales: 4500000, installments: 3100000, rent: 600000 },
  { month: 'May', sales: 3800000, installments: 2600000, rent: 580000 },
  { month: 'Jun', sales: 5200000, installments: 3500000, rent: 650000 },
];

const dummySalesData = [
    { name: 'Completed', value: 56 },
    { name: 'Pending', value: 12 },
    { name: 'Cancelled', value: 3 },
];

const SalesReports = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    loadReportData();
  }, [selectedYear]);

  const loadReportData = () => {
    try {
      // Using dummy data
      setMonthlyData(dummyMonthlyData);
      setSalesData(dummySalesData);
    } catch (error) {
      toast({
        title: "Error loading reports",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalSalesRevenue = monthlyData.reduce((sum, item) => sum + item.sales, 0);
  const totalInstallments = monthlyData.reduce((sum, item) => sum + item.installments, 0);
  const totalIncome = totalSalesRevenue + totalInstallments;
  const totalTransactions = salesData.reduce((sum, item) => sum + item.value, 0);

  const stats = [
    { title: 'Total Revenue', value: formatCurrency(totalIncome), icon: FaDollarSign, change: '+5.2%', changeType: 'increase' },
    { title: 'Sales Revenue', value: formatCurrency(totalSalesRevenue), icon: FaMoneyBillWave, change: '+8.1%', changeType: 'increase' },
    { title: 'Installments', value: formatCurrency(totalInstallments), icon: FaChartBar, change: '+3.5%', changeType: 'increase' },
    { title: 'Total Transactions', value: totalTransactions, icon: FaBuilding, change: '+10', changeType: 'increase' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p={3} border="1px" borderColor="gray.200" borderRadius="md" shadow="lg">
          <Text fontWeight="bold" mb={2}>{label}</Text>
          {payload.map((entry, index) => (
            <Text key={index} color={entry.color} fontSize="sm">
              {entry.name}: {formatCurrency(entry.value)}
            </Text>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">Sales Reports</Text>
        <HStack>
          <Select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} maxW="150px">
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          <Button leftIcon={<FiDownload />} colorScheme="purple" variant="outline">
            Export Report
          </Button>
        </HStack>
      </Flex>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
      </Grid>
      
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
            <HStack mb={4}>
                <Icon as={FaChartBar} color="brand.primary" />
                <Text fontSize="lg" fontWeight="semibold">Monthly Revenue (Sales vs Installments)</Text>
            </HStack>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="sales" fill="#6C026B" name="Sales" />
                <Bar dataKey="installments" fill="#A300A3" name="Installments" />
                </BarChart>
            </ResponsiveContainer>
        </Box>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
            <HStack mb={4}>
                <Icon as={FaChartPie} color="brand.primary" />
                <Text fontSize="lg" fontWeight="semibold">Sales Status Breakdown</Text>
            </HStack>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#8884d8" name="Count" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
      </Grid>
    </Box>
  );
};

export default SalesReports; 