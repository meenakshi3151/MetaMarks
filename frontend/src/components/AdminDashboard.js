import { useState } from 'react';
import { useWalletStore } from '../store/walletStore';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

export default function AdminDashboard() {
  // Get the functions and state from your wallet store
  const { addTeacher, addStudent, error } = useWalletStore();
  
  // State for the forms
  const [teacherName, setTeacherName] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (teacherName && teacherSubject) {
      // Call the addTeacher function from the store
      await addTeacher(teacherName, teacherSubject);
      setTeacherName('');
      setTeacherSubject('');
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (studentName) {
      // Call the addStudent function from the store
      await addStudent(studentName);
      setStudentName('');
    }
  };

  // The `processResults` and `publishResults` functions are placeholders. 
  // You would need corresponding functions in your smart contract and wallet store to implement them.
  const processResults = () => {
    // TODO: Implement this logic if you have a contract function for it
    alert('Processing results...');
  };

  const publishResults = () => {
    // TODO: Implement this logic if you have a contract function for it
    alert('Publishing results...');
  };

  const border = useColorModeValue('gray.200', 'whiteAlpha.200');
  const panelBg = useColorModeValue('white', 'whiteAlpha.100');
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="xl" fontWeight={800}>Admin</Text>
        {error && <Text color="red.300">Error: {error}</Text>}
      </Box>

      <Box p={5} borderWidth="1px" borderColor={border} borderRadius="lg" bg={panelBg}>
        <Text fontWeight={700} mb={3}>Add Teacher</Text>
        <HStack as="form" onSubmit={handleAddTeacher} spacing={3}>
          <Input placeholder="Teacher Name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
          <Input placeholder="Subject" value={teacherSubject} onChange={(e) => setTeacherSubject(e.target.value)} />
          <Button type="submit">Add Teacher</Button>
        </HStack>
      </Box>

      <Box p={5} borderWidth="1px" borderColor={border} borderRadius="lg" bg={panelBg}>
        <Text fontWeight={700} mb={3}>Add Student</Text>
        <HStack as="form" onSubmit={handleAddStudent} spacing={3}>
          <Input placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
          <Button type="submit">Add Student</Button>
        </HStack>
      </Box>

      <Box p={5} borderWidth="1px" borderColor={border} borderRadius="lg" bg={panelBg}>
        <Text fontWeight={700} mb={3}>Actions</Text>
        <HStack>
          <Button onClick={processResults} variant="outline">Process Results</Button>
          <Button onClick={publishResults} variant="outline">Publish Results</Button>
        </HStack>
      </Box>
    </VStack>
  );
}