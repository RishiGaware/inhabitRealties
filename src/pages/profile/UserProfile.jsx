import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  VStack,
  HStack,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Card,
  CardBody,
  Icon,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FiUser, FiSettings, FiLock, FiActivity, FiCheckCircle } from 'react-icons/fi';

// Placeholder user data
const dummyUser = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  role: 'Sales Agent',
  avatarUrl: 'https://i.pravatar.cc/150?u=sarahjohnson',
  phone: '+1 234 567 8900',
  address: '123 Realty Lane, Realville, USA',
  recentActivity: [
    { id: 1, action: 'Closed sale on PROP001', date: '2024-03-15' },
    { id: 2, action: 'Updated lead status for Emily Davis', date: '2024-03-14' },
    { id: 3, action: 'Added new property listing: Beachfront Condo', date: '2024-03-12' },
  ],
};

const UserProfile = () => {
  const [user, setUser] = useState(dummyUser);
  const [formData, setFormData] = useState({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Placeholder for API call
    setUser({...user, ...formData});
    toast({
      title: 'Profile Updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Placeholder for API call
    toast({
        title: 'Password Changed',
        description: 'Your password has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
    });
  }

  return (
    <Box p={{ base: 4, md: 6 }}>
        <Flex direction={{base: 'column', md: 'row'}} align="center" mb={6}>
            <Avatar size="xl" name={user.name} src={user.avatarUrl} mr={6} />
            <VStack align={{base: 'center', md: 'start'}}>
                <Heading as="h1" size="lg">{user.name}</Heading>
                <Text color="gray.500">{user.role}</Text>
            </VStack>
        </Flex>

      <Card>
        <Tabs variant="enclosed-colored" colorScheme="brand">
          <TabList>
            <Tab><Icon as={FiUser} mr={2} /> Profile</Tab>
            <Tab><Icon as={FiSettings} mr={2} /> Account Settings</Tab>
            <Tab><Icon as={FiActivity} mr={2} /> Recent Activity</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CardBody>
                <Heading size="md" mb={4}>Personal Information</Heading>
                <VStack spacing={4} align="start">
                  <Text><strong>Email:</strong> {user.email}</Text>
                  <Text><strong>Phone:</strong> {user.phone}</Text>
                  <Text><strong>Address:</strong> {user.address}</Text>
                </VStack>
              </CardBody>
            </TabPanel>

            <TabPanel>
              <Flex direction={{base: 'column', lg: 'row'}} gap={10} p={4}>
                {/* Edit Profile Form */}
                <Box flex="1">
                    <Heading size="md" mb={4}>Edit Profile</Heading>
                    <form onSubmit={handleProfileUpdate}>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input name="name" value={formData.name} onChange={handleInputChange}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email Address</FormLabel>
                                <Input name="email" type="email" value={formData.email} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone Number</FormLabel>
                                <Input name="phone" value={formData.phone} onChange={handleInputChange}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input name="address" value={formData.address} onChange={handleInputChange}/>
                            </FormControl>
                            <Button type="submit" colorScheme="brand" alignSelf="start">Save Changes</Button>
                        </VStack>
                    </form>
                </Box>
                {/* Change Password Form */}
                <Box flex="1">
                    <Heading size="md" mb={4}>Change Password</Heading>
                    <form onSubmit={handlePasswordChange}>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Current Password</FormLabel>
                                <Input type="password" placeholder="••••••••"/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>New Password</FormLabel>
                                <Input type="password" placeholder="••••••••" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirm New Password</FormLabel>
                                <Input type="password" placeholder="••••••••" />
                            </FormControl>
                            <Button type="submit" colorScheme="brand" alignSelf="start" leftIcon={<FiLock/>}>Change Password</Button>
                        </VStack>
                    </form>
                </Box>
              </Flex>
            </TabPanel>

            <TabPanel>
                <CardBody>
                    <Heading size="md" mb={4}>User Activity Log</Heading>
                    <List spacing={3}>
                        {user.recentActivity.map(activity => (
                            <ListItem key={activity.id}>
                                <HStack justify="space-between">
                                    <HStack>
                                        <ListIcon as={FiCheckCircle} color="green.500" />
                                        <Text>{activity.action}</Text>
                                    </HStack>
                                    <Text fontSize="sm" color="gray.500">{activity.date}</Text>
                                </HStack>
                            </ListItem>
                        ))}
                    </List>
                </CardBody>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
};

export default UserProfile; 