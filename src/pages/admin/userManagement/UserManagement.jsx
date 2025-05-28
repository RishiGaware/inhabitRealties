import { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  Text,
  useToast,
  IconButton,
  InputGroup,
  InputLeftElement,
  Spinner,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';

// Dummy data based on the schema
const dummyUsers = [
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();

  const itemsPerPage = 5;

  // Modal controls
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(searchQuery);
    
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    
    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const validateForm = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    if (!formData.get('email') || !emailRegex.test(formData.get('email'))) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.get('firstName') || formData.get('firstName').length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    if (!formData.get('lastName') || formData.get('lastName').length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    if (!formData.get('phoneNumber') || !phoneRegex.test(formData.get('phoneNumber'))) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!isEditing && !formData.get('password')) {
      errors.password = 'Password is required for new users';
    }
    if (formData.get('password') && formData.get('password').length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setFormErrors({});
    onFormOpen();
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    const userData = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phoneNumber: formData.get('phoneNumber'),
      role: formData.get('role'),
      published: formData.get('published') === 'true',
      createdByUserId: 'admin1',
      updatedByUserId: 'admin1',
    };

    if (isEditing) {
      // Update existing user
      setUsers(users.map(user => 
        user._id === selectedUser._id ? { ...user, ...userData } : user
      ));
      toast({
        title: 'User updated',
        status: 'success',
        duration: 3000,
      });
    } else {
      // Create new user
      const newUser = {
        _id: Date.now().toString(),
        ...userData,
        password: formData.get('password'), // In real app, this would be hashed
      };
      setUsers([...users, newUser]);
      toast({
        title: 'User created',
        status: 'success',
        duration: 3000,
      });
    }

    setIsLoading(false);
    onFormClose();
    setSelectedUser(null);
    setIsEditing(false);
    setFormErrors({});
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    setUsers(users.filter(user => user._id !== selectedUser._id));
    toast({
      title: 'User deleted',
      status: 'success',
      duration: 3000,
    });
    setIsLoading(false);
    onDeleteClose();
    setSelectedUser(null);
  };

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" >
          User Management
        </Text>
        <Button
          className="bg-brand-primary text-darkText font-bold rounded-lg px-6 py-2 shadow hover:bg-brand-secondary hover:shadow-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-colors"
          onClick={() => {
            setSelectedUser(null);
            setIsEditing(false);
            setFormErrors({});
            onFormOpen();
          }}
        >
          Add New User
        </Button>
      </HStack>

      {/* Search and Filter */}
      <HStack spacing={4} mb={6}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Select
          placeholder="Filter by role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          maxW="200px"
        >
          <option value="ADMIN">Admin</option>
          <option value="SALES">Sales</option>
          <option value="EXECUTIVE">Executive</option>
          <option value="USER">User</option>
        </Select>
      </HStack>

      {/* Users Table */}
      <Box
        overflowX="auto"
        bg="light.cardBackground"
        borderRadius="lg"
        boxShadow="md"
        borderWidth="1px"
        borderColor="gray.200"
        p={0}
        sx={{
          'table': { minWidth: '700px' },
        }}
      >
        {isLoading && (
          <Flex
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(255, 255, 255, 0.7)"
            justify="center"
            align="center"
            zIndex="1"
          >
            <Spinner size="xl" color="brand.primary" />
          </Flex>
        )}
        <Table variant="simple" size="md">
          <Thead bg="brand.primary">
            <Tr>
              <Th color="white" fontWeight="bold" py={3} px={4} borderTopLeftRadius="lg">Email</Th>
              <Th color="white" fontWeight="bold" py={3} px={4}>Name</Th>
              <Th color="white" fontWeight="bold" py={3} px={4}>Phone</Th>
              <Th color="white" fontWeight="bold" py={3} px={4}>Role</Th>
              <Th color="white" fontWeight="bold" py={3} px={4}>Status</Th>
              <Th color="white" fontWeight="bold" py={3} px={4} borderTopRightRadius="lg">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedUsers.map((user, idx) => (
              <Tr
                key={user._id + idx}
                bg={idx % 2 === 0 ? 'gray.100' : 'white'}
                _hover={{ bg: 'blue.50' }}
                transition="background 0.2s"
              >
                <Td py={3} px={4} color="light.darkText">{user.email}</Td>
                <Td py={3} px={4} color="light.darkText">{`${user.firstName} ${user.lastName}`}</Td>
                <Td py={3} px={4} color="light.darkText">{user.phoneNumber}</Td>
                <Td py={3} px={4} color="light.darkText">{user.role}</Td>
                <Td py={3} px={4}>
                  <Text
                    color={user.published ? 'light.success' : 'light.danger'}
                    fontWeight="medium"
                  >
                    {user.published ? 'Active' : 'Inactive'}
                  </Text>
                </Td>
                <Td py={3} px={4}>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Edit user"
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="brand"
                      variant="outline"
                      className="text-light-darkText"
                      onClick={() => handleEdit(user)}
                    />
                    <IconButton
                      aria-label="Delete user"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      className="text-light-darkText"
                      onClick={() => handleDelete(user)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <HStack justify="center" mt={6} spacing={2}>
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </HStack>

      {/* Add/Edit User Form Modal */}
      <Modal isOpen={isFormOpen} onClose={onFormClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="light.darkText">
            {isEditing ? 'Edit User' : 'Add New User'}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleFormSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired isInvalid={formErrors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    defaultValue={selectedUser?.email}
                    type="email"
                  />
                  <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={formErrors.firstName}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    defaultValue={selectedUser?.firstName}
                  />
                  <FormErrorMessage>{formErrors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={formErrors.lastName}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    defaultValue={selectedUser?.lastName}
                  />
                  <FormErrorMessage>{formErrors.lastName}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={formErrors.phoneNumber}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phoneNumber"
                    defaultValue={selectedUser?.phoneNumber}
                  />
                  <FormErrorMessage>{formErrors.phoneNumber}</FormErrorMessage>
                </FormControl>
                {!isEditing && (
                  <FormControl isRequired isInvalid={formErrors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                    />
                    <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                  </FormControl>
                )}
                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select name="role" defaultValue={selectedUser?.role}>
                    <option value="ADMIN">Admin</option>
                    <option value="SALES">Sales</option>
                    <option value="EXECUTIVE">Executive</option>
                    <option value="USER">User</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Select
                    name="published"
                    defaultValue={selectedUser?.published?.toString()}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-gray-200 text-darkText font-bold rounded-lg px-6 py-2 shadow hover:bg-gray-300 hover:shadow-lg focus:ring-2 focus:ring-gray-400 focus:outline-none transition-colors mr-3"
                onClick={onFormClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand-primary text-light-darkText font-bold rounded-lg px-6 py-2 shadow hover:bg-brand-secondary hover:shadow-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-colors"
                isLoading={isLoading}
              >
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="light.darkText">Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete the user{' '}
              <Text as="span" fontWeight="bold">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </Text>
              ? This action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-gray-200 text-darkText font-bold rounded-lg px-6 py-2 shadow hover:bg-gray-300 hover:shadow-lg focus:ring-2 focus:ring-gray-400 focus:outline-none transition-colors mr-3"
              onClick={onDeleteClose}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-light-darkText font-bold rounded-lg px-6 py-2 shadow hover:bg-red-700 hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
              onClick={handleDeleteConfirm}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserManagement; 