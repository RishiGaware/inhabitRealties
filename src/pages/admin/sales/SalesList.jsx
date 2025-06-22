import React, { useState } from 'react';
import {
  Box,
  Button,
  Badge,
  HStack,
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
  Select,
  Textarea,
  useToast,
  IconButton,
  Grid,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import { FaDollarSign, FaCheckCircle, FaHourglassHalf, FaListAlt, FaHandHoldingUsd } from 'react-icons/fa';

import ViewPaymentsModal from './ViewPaymentsModal';
import TableContainer from '../../../components/common/Table/TableContainer';
import CommonTable from '../../../components/common/Table/CommonTable';
import StatCard from '../../../components/common/StatCard';

// Static dummy data for sales
const dummySales = [
  {
    id: '1',
    propertyId: 'PROP001',
    propertyName: 'Luxury Villa in Beverly Hills',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+1-555-0123',
    salePrice: 2500000,
    saleDate: '2024-03-15',
    status: 'completed',
    agentName: 'Sarah Johnson',
    commission: 75000,
    paymentStatus: 'paid',
    installmentPlan: 'lump-sum',
    totalInstallments: 1,
    paidInstallments: 1,
    nextPaymentDate: null,
    notes: 'Premium property with excellent location',
  },
  {
    id: '2',
    propertyId: 'PROP002',
    propertyName: 'Modern Apartment Downtown',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    customerPhone: '+1-555-0456',
    salePrice: 850000,
    saleDate: '2024-03-10',
    status: 'pending',
    agentName: 'Mike Wilson',
    commission: 25500,
    paymentStatus: 'partial',
    installmentPlan: 'monthly',
    totalInstallments: 12,
    paidInstallments: 3,
    nextPaymentDate: '2024-04-10',
    notes: 'Young professional buyer, monthly payment plan',
  },
  {
    id: '3',
    propertyId: 'PROP003',
    propertyName: 'Family Home in Suburbs',
    customerName: 'Robert Brown',
    customerEmail: 'robert.brown@email.com',
    customerPhone: '+1-555-0789',
    salePrice: 1200000,
    saleDate: '2024-03-05',
    status: 'completed',
    agentName: 'Lisa Anderson',
    commission: 36000,
    paymentStatus: 'paid',
    installmentPlan: 'quarterly',
    totalInstallments: 4,
    paidInstallments: 4,
    nextPaymentDate: null,
    notes: 'Family with children, school district important',
  },
  {
    id: '4',
    propertyId: 'PROP004',
    propertyName: 'Investment Property Complex',
    customerName: 'Jennifer Lee',
    customerEmail: 'jennifer.lee@email.com',
    customerPhone: '+1-555-0321',
    salePrice: 3500000,
    saleDate: '2024-02-28',
    status: 'pending',
    agentName: 'David Chen',
    commission: 105000,
    paymentStatus: 'pending',
    installmentPlan: 'custom',
    totalInstallments: 8,
    paidInstallments: 0,
    nextPaymentDate: '2024-04-28',
    notes: 'Investment group, custom payment schedule',
  },
  {
    id: '5',
    propertyId: 'PROP005',
    propertyName: 'Beachfront Condo',
    customerName: 'Michael Taylor',
    customerEmail: 'michael.taylor@email.com',
    customerPhone: '+1-555-0654',
    salePrice: 1800000,
    saleDate: '2024-02-20',
    status: 'completed',
    agentName: 'Sarah Johnson',
    commission: 54000,
    paymentStatus: 'paid',
    installmentPlan: 'lump-sum',
    totalInstallments: 1,
    paidInstallments: 1,
    nextPaymentDate: null,
    notes: 'Retirement property, cash buyer',
  },
];

const SalesList = () => {
  const [sales, setSales] = useState(dummySales);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isViewPaymentsOpen, setIsViewPaymentsOpen] = useState(false);
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [formData, setFormData] = useState({});
  const toast = useToast();

  const totalSales = sales.length;
  const completedSales = sales.filter(s => s.status === 'completed').length;
  const pendingSales = sales.filter(s => s.status === 'pending').length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.salePrice, 0);

  const stats = [
    { title: 'Total Sales', value: totalSales, icon: FaListAlt },
    { title: 'Completed Sales', value: completedSales, icon: FaCheckCircle },
    { title: 'Pending Sales', value: pendingSales, icon: FaHourglassHalf },
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: FaHandHoldingUsd },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSale) {
      // Update existing sale
      setSales(sales.map(sale => 
        sale.id === selectedSale.id 
          ? { ...sale, ...formData, salePrice: parseFloat(formData.salePrice), commission: parseFloat(formData.commission) }
          : sale
      ));
      toast({
        title: 'Sale updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Add new sale
      const newSale = {
        id: Date.now().toString(),
        ...formData,
        salePrice: parseFloat(formData.salePrice),
        commission: parseFloat(formData.commission),
        paidInstallments: 0,
        nextPaymentDate: formData.installmentPlan === 'lump-sum' ? null : new Date().toISOString().split('T')[0],
      };
      setSales([...sales, newSale]);
      toast({
        title: 'Sale added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    onFormClose();
  };

  const handleAddNew = () => {
    setSelectedSale(null);
    setFormData({
      propertyId: '',
      propertyName: '',
      customerName: '',
      salePrice: '',
      saleDate: '',
      status: 'pending',
      paymentStatus: 'pending',
    });
    onFormOpen();
  };

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setFormData(sale);
    onFormOpen();
  };
  
  const handleDelete = () => {
    setSales(sales.filter((sale) => sale.id !== selectedSale.id));
    toast({ title: 'Sale deleted.', status: 'success', duration: 3000, isClosable: true });
    onDeleteClose();
  };

  const openDeleteModal = (sale) => {
    setSelectedSale(sale);
    onDeleteOpen();
  };

  const columns = [
    { Header: 'Property Name', accessor: 'propertyName' },
    { Header: 'Customer', accessor: 'customerName' },
    {
      Header: 'Sale Price',
      accessor: 'salePrice',
      Cell: ({ value }) => `₹${value.toLocaleString()}`,
    },
    {
      Header: 'Sale Date',
      accessor: 'saleDate',
      Cell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <Badge colorScheme={value === 'completed' ? 'green' : 'yellow'}>{value}</Badge>
      ),
    },
    {
      Header: 'Payment',
      accessor: 'paymentStatus',
      Cell: ({ value }) => (
        <Badge colorScheme={value === 'paid' ? 'green' : value === 'partial' ? 'orange' : 'red'}>
          {value}
        </Badge>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <HStack>
          <IconButton icon={<FiEye />} size="sm" onClick={() => { setSelectedSale(row.original); setIsViewPaymentsOpen(true); }} />
          <IconButton icon={<FiEdit2 />} size="sm" onClick={() => handleEdit(row.original)} />
          <IconButton icon={<FiTrash2 />} size="sm" colorScheme="red" onClick={() => openDeleteModal(row.original)} />
        </HStack>
      ),
    },
  ];

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>Sales Management</Text>
      
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} change="" />
        ))}
      </Grid>
      
      <TableContainer
        title="All Sales"
        onAddNew={handleAddNew}
        addNewButtonLabel="Add New Sale"
      >
        <CommonTable columns={columns} data={sales} />
      </TableContainer>

      {/* Add/Edit Sale Modal */}
      <Modal isOpen={isFormOpen} onClose={onFormClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedSale ? 'Edit Sale' : 'Add New Sale'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Property Name</FormLabel>
                  <Input name="propertyName" value={formData.propertyName || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Customer Name</FormLabel>
                  <Input name="customerName" value={formData.customerName || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Sale Price</FormLabel>
                  <Input type="number" name="salePrice" value={formData.salePrice || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Sale Date</FormLabel>
                  <Input type="date" name="saleDate" value={formData.saleDate || ''} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select name="status" value={formData.status || 'pending'} onChange={handleInputChange}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onFormClose}>Cancel</Button>
              <Button colorScheme="purple" type="submit">Save</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete the sale for property "{selectedSale?.propertyName}"?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onDeleteClose}>Cancel</Button>
            <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Payments Modal */}
      {selectedSale && (
        <ViewPaymentsModal
          isOpen={isViewPaymentsOpen}
          onClose={() => setIsViewPaymentsOpen(false)}
          sale={selectedSale}
        />
      )}
    </Box>
  );
};

export default SalesList; 