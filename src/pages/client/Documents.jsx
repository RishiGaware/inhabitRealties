import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Flex
} from '@chakra-ui/react';
import { FaFilePdf, FaFileWord, FaFileImage, FaFolder, FaDownload, FaEye } from 'react-icons/fa';

const documents = [
  { name: 'Sale Agreement.pdf', type: 'pdf', size: '2.5 MB', date: '2024-06-10' },
  { name: 'Booking Form.pdf', type: 'pdf', size: '1.2 MB', date: '2024-05-20' },
  { name: 'ID Proof.jpg', type: 'jpg', size: '800 KB', date: '2024-05-18' },
  { name: 'Payment Plan.docx', type: 'docx', size: '300 KB', date: '2024-05-22' },
];

const getFileIcon = (type) => {
  if (type === 'pdf') return FaFilePdf;
  if (type === 'docx') return FaFileWord;
  if (type === 'jpg') return FaFileImage;
  return FaFolder;
};

const Documents = () => {
  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">My Documents</Text>
        <Button colorScheme="purple" size="sm">Upload New Document</Button>
      </Flex>
      
      <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Size</Th>
              <Th>Date Uploaded</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {documents.map((doc) => (
              <Tr key={doc.name}>
                <Td>
                  <HStack>
                    <Icon as={getFileIcon(doc.type)} color={doc.type === 'pdf' ? 'red.500' : 'blue.500'}/>
                    <Text>{doc.name}</Text>
                  </HStack>
                </Td>
                <Td>{doc.size}</Td>
                <Td>{new Date(doc.date).toLocaleDateString()}</Td>
                <Td>
                  <HStack>
                    <IconButton icon={<FaDownload />} size="sm" aria-label="Download Document" />
                    <IconButton icon={<FaEye />} size="sm" aria-label="View Document" />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Documents; 