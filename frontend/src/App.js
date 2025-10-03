import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link as RouterLink } from 'react-router-dom';
import { useWalletStore } from './store/walletStore';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function ConnectWallet() {
  const { address, isConnecting, error, connect, disconnect } = useWalletStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const cardBg = useColorModeValue('white', 'whiteAlpha.100');
  const border = useColorModeValue('gray.200', 'whiteAlpha.200');
  return (
    <Flex as="header" px={4} py={3} align="center" justify="space-between" borderBottomWidth="1px" borderColor={border} backdropFilter="saturate(150%) blur(6px)" position="sticky" top={0} zIndex={10} bg={useColorModeValue('whiteAlpha.700', 'blackAlpha.500')}>
      <HStack spacing={3}>
        <Text fontWeight={700}>MetaMarks</Text>
        <HStack spacing={2}>
          <Button as={RouterLink} to="/admin" size="sm" variant="ghost">Admin</Button>
          <Button as={RouterLink} to="/teacher" size="sm" variant="ghost">Teacher</Button>
          <Button as={RouterLink} to="/student" size="sm" variant="ghost">Student</Button>
        </HStack>
      </HStack>
      <HStack spacing={2}>
        {address ? (
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.300">{address.slice(0, 6)}...{address.slice(-4)}</Text>
            <Button size="sm" onClick={disconnect} variant="outline">Disconnect</Button>
          </HStack>
        ) : (
          <Button size="sm" onClick={connect} isLoading={isConnecting}>Connect MetaMask</Button>
        )}
        <IconButton aria-label="Toggle color mode" size="sm" onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} variant="ghost" />
      </HStack>
    </Flex>
  );
}

function useRole() {
  const role = useWalletStore((s) => s.role);
  return role; // 'ADMIN' | 'TEACHER' | 'STUDENT' | null
}

function ProtectedRoute({ roles, children }) {
  const address = useWalletStore((s) => s.address);
  const role = useRole();
  if (!address) return <Navigate to="/" replace />;
  if (roles && role && !roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}

function Home() {
  const role = useRole();
  const panelBg = useColorModeValue('white', 'whiteAlpha.100');
  const border = useColorModeValue('gray.200', 'whiteAlpha.200');
  return (
    <VStack spacing={6} align="stretch" px={6} py={8} maxW="5xl" mx="auto">
      <Box>
        <Text fontSize="2xl" fontWeight={800}>MetaMarks</Text>
        <Text color="gray.400">Choose a dashboard to continue.</Text>
      </Box>
      <Flex gap={4} wrap="wrap">
        <Box flex="1 1 220px" p={5} borderWidth="1px" borderColor={border} borderRadius="lg" bg={panelBg} _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }} transition="all .2s" as={RouterLink} to="/admin">
          <Text fontWeight={700} mb={2}>Admin</Text>
          <Text fontSize="sm" color="gray.400">Manage teachers and students.</Text>
        </Box>
        <Box flex="1 1 220px" p={5} borderWidth="1px" borderColor={border} borderRadius="lg" bg={panelBg} _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }} transition="all .2s" as={RouterLink} to="/teacher">
          <Text fontWeight={700} mb={2}>Teacher</Text>
          <Text fontSize="sm" color="gray.400">Add marks and assessments.</Text>
        </Box>
        <Box flex="1 1 220px" p={5} borderWidth="1px" borderColor={border} borderRadius="lg" bg={panelBg} _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }} transition="all .2s" as={RouterLink} to="/student">
          <Text fontWeight={700} mb={2}>Student</Text>
          <Text fontSize="sm" color="gray.400">View CPI and download result.</Text>
        </Box>
      </Flex>
      <Text color="gray.500">Current role: {role || 'Unknown'}</Text>
    </VStack>
  );
}



function App() {
  return (
    <BrowserRouter>
      <ConnectWallet />
      <Box px={4} py={6}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
