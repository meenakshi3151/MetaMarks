import { useState } from 'react';
import { useWalletStore } from '../store/walletStore';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

export default function TeacherDashboard() {
  // Get the addMarks function and error state from your wallet store
  const { addMarks, error } = useWalletStore();

  // State for the form inputs
  const [studentIndex, setStudentIndex] = useState('');
  const [teacherIndex, setTeacherIndex] = useState('');
  const [mark, setMark] = useState('');

  const submitMarks = async (e) => {
    e.preventDefault();

    // Convert string inputs to numbers as required by the smart contract
    const sIndex = Number(studentIndex);
    const tIndex = Number(teacherIndex);
    const m = Number(mark);

    // Basic validation to ensure inputs are valid numbers
    if (!isNaN(sIndex) && !isNaN(tIndex) && !isNaN(m)) {
      // Call the addMarks function from the store
      await addMarks(sIndex, tIndex, m);

      // Clear the form inputs after submission
      setStudentIndex('');
      setTeacherIndex('');
      setMark('');
    } else {
      alert("Please enter valid numbers for student, teacher, and marks.");
    }
  };

  const border = useColorModeValue('gray.200', 'whiteAlpha.200');
  const panelBg = useColorModeValue('white', 'whiteAlpha.100');
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="xl" fontWeight={800}>Teacher</Text>
        {error && <Text color="red.300">Error: {error}</Text>}
      </Box>
      <Box p={5} borderWidth="1px" borderColor={border} borderRadius="lg" bg={panelBg}>
        <Text fontWeight={700} mb={3}>Submit Marks</Text>
        <HStack as="form" onSubmit={submitMarks} spacing={3}>
          <Input placeholder="Student Index" type="number" value={studentIndex} onChange={(e) => setStudentIndex(e.target.value)} />
          <Input placeholder="Teacher Index" type="number" value={teacherIndex} onChange={(e) => setTeacherIndex(e.target.value)} />
          <Input placeholder="Marks" type="number" value={mark} onChange={(e) => setMark(e.target.value)} />
          <Button type="submit">Submit Marks</Button>
        </HStack>
      </Box>
    </VStack>
  );
}