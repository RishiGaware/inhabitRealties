import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Grid,
  Icon,
  Spinner,
  Center,
  Divider,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import { FaArrowUp, FaArrowDown, FaDollarSign } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import StatCard from "../../../components/common/StatCard";

// Placeholder for API call
const fetchIncomeStatementData = async (period) => {
  console.log(`Fetching income statement data for period: ${period}`);
  // In a real app, you would fetch data based on the period.
  // This would involve aggregating data from sales, rent, expenses, etc.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        revenue: {
          propertySales: 150000,
          rentalIncome: 25000,
          otherIncome: 2500,
        },
        expenses: {
          maintenance: 15000,
          marketing: 5000,
          utilities: 8000,
          commissions: 45000,
          taxes: 22000,
          other: 3000,
        },
        chartData: [
            { name: 'Jan', revenue: 40000, expenses: 24000, profit: 16000 },
            { name: 'Feb', revenue: 30000, expenses: 13980, profit: 16020 },
            { name: 'Mar', revenue: 50000, expenses: 38000, profit: 12000 },
            { name: 'Apr', revenue: 47800, expenses: 39080, profit: 8720 },
            { name: 'May', revenue: 58900, expenses: 48000, profit: 10900 },
            { name: 'Jun', revenue: 63900, expenses: 38000, profit: 25900 },
          ]
      });
    }, 1000);
  });
};

const IncomeStatement = () => {
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState("quarterly");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const result = await fetchIncomeStatementData(period);
      setData(result);
      setIsLoading(false);
    };
    getData();
  }, [period]);

  const totalRevenue = data ? Object.values(data.revenue).reduce((a, b) => a + b, 0) : 0;
  const totalExpenses = data ? Object.values(data.expenses).reduce((a, b) => a + b, 0) : 0;
  const netProfit = totalRevenue - totalExpenses;
  
  const stats = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: FaArrowUp, changeType: 'increase' },
    { title: 'Total Expenses', value: `₹${totalExpenses.toLocaleString()}`, icon: FaArrowDown, changeType: 'decrease' },
    { title: 'Net Profit', value: `₹${netProfit.toLocaleString()}`, icon: FaDollarSign, changeType: netProfit > 0 ? 'increase' : 'decrease' },
  ];

  const DataRow = ({ label, value, isTotal = false }) => (
    <Flex justify="space-between" py={2}>
      <Text color="gray.600">{label}</Text>
      <Text fontWeight={isTotal ? 'bold' : 'medium'}>{`₹${value.toLocaleString()}`}</Text>
    </Flex>
  );

  if (isLoading) {
    return (
      <Center p={10}>
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.primary" />
          <Text>Generating Income Statement...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box p={6}>
        <Flex justify="space-between" align="center" mb={6}>
            <Heading as="h1" size="lg">Income Statement</Heading>
            <Select maxW="200px" value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="monthly">This Month</option>
                <option value="quarterly">This Quarter</option>
                <option value="yearly">This Year</option>
            </Select>
      </Flex>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} spacing={6} mb={8}>
        {stats.map((stat, index) => <StatCard key={index} {...stat} change="" />)}
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
            <Heading size="md" mb={4}>Financial Summary</Heading>
            <VStack divider={<Divider />} spacing={4} align="stretch">
                <Box>
                    <Heading size="sm" mb={2} color="green.600">Revenue</Heading>
                    {data && Object.entries(data.revenue).map(([key, value]) => (
                        <DataRow key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} value={value} />
                    ))}
                    <Divider my={2}/>
                    <DataRow label="Total Revenue" value={totalRevenue} isTotal />
                </Box>
                <Box>
                    <Heading size="sm" mb={2} color="red.600">Expenses</Heading>
                    {data && Object.entries(data.expenses).map(([key, value]) => (
                        <DataRow key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} value={value} />
                    ))}
                    <Divider my={2}/>
                    <DataRow label="Total Expenses" value={totalExpenses} isTotal />
                </Box>
                <Box pt={4} borderTopWidth="2px" borderColor="gray.300">
                    <Flex justify="space-between" align="center">
                        <Text fontSize="lg" fontWeight="bold">Net Profit</Text>
                        <Text fontSize="lg" fontWeight="bold" color={netProfit > 0 ? 'green.500' : 'red.500'}>
                            {`₹${netProfit.toLocaleString()}`}
                        </Text>
                    </Flex>
                </Box>
            </VStack>
        </Box>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="sm">
            <Heading size="md" mb={4}>Performance Over Time</Heading>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data?.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#6C026B" name="Revenue" />
                    <Bar dataKey="expenses" fill="#A300A3" name="Expenses" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
      </Grid>
    </Box>
  );
};

export default IncomeStatement; 