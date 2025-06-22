import React, { useState } from 'react';
import {
  Box,
  Grid,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
} from '@chakra-ui/react';
import { FaUser, FaHistory, FaShoppingCart } from 'react-icons/fa';
import CustomerDetailsCard from '../../components/customers/CustomerDetailsCard';
import InteractionHistory from '../../components/common/InteractionHistory';

const CustomerProfiles = () => {
  // Sample data - replace with API call
  const [customer] = useState({
    customerId: 'CUST001',
    personalDetails: {
      name: 'Ravi Patel',
      dob: '1988-05-20',
      phone: '+919876543210',
      email: 'ravi@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=ravi-patel',
      address: '123 Tech Park, Bangalore, India',
    },
    purchaseHistory: [
      {
        propertyId: 'PROP1001',
        purchaseDate: '2025-06-01',
        price: 6500000,
        propertyType: '3BHK Apartment',
      },
      {
        propertyId: 'PROP1005',
        purchaseDate: '2023-02-15',
        price: 4500000,
        propertyType: '2BHK Apartment',
      },
    ],
    interactions: [
      {
        type: 'call',
        date: '2025-05-28',
        notes: 'Discussed payment options and loan pre-approval.',
      },
      {
        type: 'email',
        date: '2025-05-25',
        notes: 'Sent brochure and project details.',
      },
      {
        type: 'meeting',
        date: '2025-05-20',
        notes: 'Initial site visit. Interested in south-facing units.',
      },
    ],
  });

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Customer Profile
      </Text>

      <Grid templateColumns={{ base: '1fr', lg: '350px 1fr' }} gap={6}>
        <CustomerDetailsCard customer={customer} />

        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <Tabs colorScheme="purple" variant="soft-rounded">
            <TabList>
              <Tab>
                <Icon as={FaShoppingCart} mr={2} />
                Purchase History
              </Tab>
              <Tab>
                <Icon as={FaHistory} mr={2} />
                Interactions
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box>
                  {customer.purchaseHistory.map((purchase, index) => (
                    <Box
                      key={index}
                      p={4}
                      bg="gray.50"
                      borderRadius="lg"
                      mb={4}
                      borderLeft="4px"
                      borderColor="purple.500"
                    >
                      <Text fontWeight="bold" color="purple.700">
                        {purchase.propertyType}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Property ID: {purchase.propertyId}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Purchased on: {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="gray.800" mt={2}>
                        ₹{purchase.price.toLocaleString()}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </TabPanel>
              <TabPanel>
                <InteractionHistory interactions={customer.interactions} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Grid>
    </Box>
  );
};

export default CustomerProfiles; 