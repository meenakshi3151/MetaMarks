import { useState } from 'react';
import { useWalletStore } from '../store/walletStore';
import { generateResultPDF } from '../utils/pdf';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

export default function StudentDashboard() {
  // Get the functions and error state from your wallet store
  const { calculateCPI, getStudent, error } = useWalletStore();

  // State for the student's data
  const [studentIndex, setStudentIndex] = useState('');
  const [studentName, setStudentName] = useState('N/A');
  const [studentCPI, setStudentCPI] = useState(null);
  
  // This state is not directly from the contract, as your ABI doesn't have a 'subjects' function
  const [subjects, setSubjects] = useState([]); 
  const [classLabel, setClassLabel] = useState('PENDING');

  const handleGetResult = async () => {
    const sIndex = Number(studentIndex);
    if (!isNaN(sIndex)) {
      try {
        // Fetch student name and CPI from the smart contract
        const name = await getStudent(sIndex);
        const cpi = await calculateCPI(sIndex);
        
        // Update the component's state
        setStudentName(name);
        setStudentCPI(cpi);
        
        // Example logic to determine class label based on CPI
        if (cpi >= 8.0) setClassLabel('DISTINCTION');
        else if (cpi >= 6.0) setClassLabel('FIRST CLASS');
        else setClassLabel('SECOND CLASS');
        
        // TODO: You will need to get the subjects and their marks from the contract
        // The ABI you provided doesn't have a function for this, so this is a placeholder.
        // For now, let's use a dummy array for the PDF
        setSubjects([
          { name: 'Subject 1', marks: 85 },
          { name: 'Subject 2', marks: 92 },
        ]);

      } catch (err) {
        console.error("Failed to fetch student data:", err);
      }
    }
  };

  const download = () => {
    // Check if we have fetched data before generating the PDF
    if (studentName === 'N/A' || studentCPI === null) {
      alert("Please fetch your result first.");
      return;
    }
    
    // Use the fetched data to generate the PDF
    const doc = generateResultPDF({
      name: studentName,
      rollNo: `Student Index: ${studentIndex}`,
      subjects,
      percentage: studentCPI,
      classLabel,
      hashToSign: '0x', // Replace with a real transaction hash if available
    });
    doc.save(`${studentName}-result.pdf`);
  };

  const border = useColorModeValue('gray.200', 'whiteAlpha.200');
  const panelBg = useColorModeValue('white', 'whiteAlpha.100');
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="xl" fontWeight={800}>Student</Text>
        {error && <Text color="red.300">Error: {error}</Text>}
      </Box>

      <Box p={5} borderWidth="1px" borderColor={border} borderRadius="lg" bg={panelBg}>
        <Text fontWeight={700} mb={3}>Get My Result</Text>
        <HStack spacing={3}>
          <Input type="number" value={studentIndex} onChange={(e) => setStudentIndex(e.target.value)} placeholder="Enter your student index" />
          <Button onClick={handleGetResult}>Get My Result</Button>
        </HStack>
      </Box>

      <Box p={5} borderWidth="1px" borderColor={border} borderRadius="lg" bg={panelBg}>
        <Text fontWeight={700} mb={3}>My Result</Text>
        <VStack align="start" spacing={1}>
          <Text>Name: {studentName}</Text>
          <Text>CPI: {studentCPI !== null ? studentCPI.toFixed(2) : 'N/A'}</Text>
          <Text>Status: {classLabel}</Text>
        </VStack>
        <Button onClick={download} mt={4} variant="outline">Download Result PDF</Button>
      </Box>
    </VStack>
  );
}