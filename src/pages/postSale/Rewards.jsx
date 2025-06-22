import React, { useState } from 'react';
import {
  Box,
  Text,
  Grid,
  Button,
  VStack,
  HStack,
  Icon,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { FaGift, FaStar, FaHistory } from 'react-icons/fa';
import TableContainer from '../../components/common/Table/TableContainer';
import CommonTable from '../../components/common/Table/CommonTable';

const availableRewards = [
  { id: 'REW-01', name: '₹500 Gift Card', points: 500 },
  { id: 'REW-02', name: 'Smart Home Hub', points: 5000 },
  { id: 'REW-03', name: 'Weekend Getaway', points: 20000 },
  { id: 'REW-04', name: '1% Off Next Purchase', points: 10000 },
];

const claimedRewards = [
    { id: 'CLAIM-01', name: '₹500 Gift Card', points: 500, date: '2024-06-15' },
    { id: 'CLAIM-02', name: 'Smart Home Hub', points: 5000, date: '2024-05-20' },
];

const RewardCard = ({ reward, onClaim, userPoints }) => {
  const canClaim = userPoints >= reward.points;
  return (
    <VStack p={5} bg="white" borderRadius="lg" boxShadow="sm" spacing={3} align="stretch" borderTop="4px" borderColor="purple.500">
      <HStack justify="space-between">
        <Text fontWeight="bold" fontSize="lg">{reward.name}</Text>
        <Icon as={FaGift} w={6} h={6} color="purple.500" />
      </HStack>
      <HStack>
        <Icon as={FaStar} color="yellow.400" />
        <Text>{reward.points.toLocaleString()} Points</Text>
      </HStack>
      <Button colorScheme="purple" onClick={() => onClaim(reward)} isDisabled={!canClaim}>
        {canClaim ? 'Claim Reward' : 'Not Enough Points'}
      </Button>
    </VStack>
  );
};

const Rewards = () => {
  const [userPoints, setUserPoints] = useState(7500);
  const toast = useToast();

  const handleClaim = (reward) => {
    if (userPoints >= reward.points) {
      setUserPoints(userPoints - reward.points);
      toast({
        title: 'Reward Claimed!',
        description: `You have successfully claimed "${reward.name}".`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const columns = [
      { Header: 'Reward', accessor: 'name' },
      { Header: 'Points', accessor: 'points', Cell: ({ value }) => `${value.toLocaleString()}`},
      { Header: 'Date Claimed', accessor: 'date', Cell: ({ value }) => new Date(value).toLocaleDateString() },
  ];

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">Rewards Program</Text>
        <HStack bg="purple.100" px={4} py={2} borderRadius="full">
            <Icon as={FaStar} color="purple.600" />
            <Text fontWeight="bold" color="purple.800">Your Points: {userPoints.toLocaleString()}</Text>
        </HStack>
      </HStack>

      <Text fontSize="xl" fontWeight="semibold" mb={4}>Available Rewards</Text>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
        {availableRewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} onClaim={handleClaim} userPoints={userPoints} />
        ))}
      </Grid>
      
      <TableContainer title="Claimed Rewards History" icon={FaHistory}>
          <CommonTable columns={columns} data={claimedRewards} />
      </TableContainer>
    </Box>
  );
};

export default Rewards; 