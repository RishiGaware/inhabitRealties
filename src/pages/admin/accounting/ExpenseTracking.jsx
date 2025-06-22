import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  IconButton,
  HStack,
  Grid,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaDollarSign } from 'react-icons/fa';
import TableContainer from '../../../components/common/Table/TableContainer';
import CommonTable from '../../../components/common/Table/CommonTable';
import StatCard from '../../../components/common/StatCard';

const dummyExpenses = [
    { id: 'exp1', date: '2024-06-25', category: 'Maintenance', property: 'Sunset Apartments', amount: 250.75, vendor: 'City Plumbers', description: 'Fixed leak in Unit A-101 bathroom.' },
    { id: 'exp2', date: '2024-06-22', category: 'Utilities', property: 'Oceanview Condos', amount: 850.00, vendor: 'City Power & Light', description: 'Monthly electricity bill.' },
    { id: 'exp3', date: '2024-06-20', category: 'Marketing', property: 'N/A', amount: 500.00, vendor: 'Online Ads Inc.', description: 'Digital marketing campaign.' },
];

const ExpenseTracking = () => {
  const [expenses, setExpenses] = useState(dummyExpenses);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({});
  const toast = useToast();

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const stat = {
    title: 'Total Expenses',
    value: `₹${totalExpenses.toLocaleString()}`,
    icon: FaDollarSign,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = { ...formData, amount: parseFloat(formData.amount) || 0 };

    if (selectedExpense) {
      setExpenses(expenses.map(exp => (exp.id === selectedExpense.id ? { ...expenseData, id: exp.id } : exp)));
      toast({ title: 'Expense updated.', status: 'success', duration: 3000, isClosable: true });
    } else {
      setExpenses([{ ...expenseData, id: `exp${Date.now()}` }, ...expenses]);
      toast({ title: 'Expense added.', status: 'success', duration: 3000, isClosable: true });
    }
    onClose();
    setFormData({});
  };

  const handleAddNew = () => {
    setSelectedExpense(null);
    setFormData({ date: new Date().toISOString().slice(0,10), category: '', amount: '', vendor: '', property: '', description: '' });
    onOpen();
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setFormData(expense);
    onOpen();
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
    toast({ title: 'Expense deleted.', status: 'info', duration: 3000, isClosable: true });
  };

  const columns = [
    { Header: 'Date', accessor: 'date', Cell: ({value}) => new Date(value).toLocaleDateString() },
    { Header: 'Category', accessor: 'category' },
    { Header: 'Property', accessor: 'property' },
    { Header: 'Vendor', accessor: 'vendor' },
    { Header: 'Amount', accessor: 'amount', Cell: ({value}) => `₹${value ? value.toLocaleString() : '0.00'}` },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <HStack>
          <IconButton icon={<FiEdit2 />} size="sm" onClick={() => handleEdit(row.original)} />
          <IconButton icon={<FiTrash2 />} size="sm" colorScheme="red" onClick={() => handleDelete(row.original.id)} />
        </HStack>
      ),
    },
  ];

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>Expense Tracking</Text>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
        <StatCard {...stat} change="" />
      </Grid>
      
      <TableContainer
        title="All Expenses"
        onAddNew={handleAddNew}
        addNewButtonLabel="Add Expense"
      >
        <CommonTable columns={columns} data={expenses} />
      </TableContainer>

      {/* Add/Edit Expense Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedExpense ? 'Edit Expense' : 'Add New Expense'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input type="date" name="date" value={formData.date || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Input name="category" placeholder="e.g., Maintenance, Utilities" value={formData.category || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Property</FormLabel>
                  <Input name="property" placeholder="e.g., Sunset Apartments" value={formData.property || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Amount</FormLabel>
                  <Input type="number" name="amount" placeholder="0.00" value={formData.amount || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Vendor</FormLabel>
                  <Input name="vendor" placeholder="e.g., City Plumbers" value={formData.vendor || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea name="description" placeholder="Describe the expense" value={formData.description || ''} onChange={handleInputChange} />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>Cancel</Button>
              <Button colorScheme="purple" type="submit">Save</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ExpenseTracking; 