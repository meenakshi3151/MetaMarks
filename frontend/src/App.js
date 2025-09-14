import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useWalletStore } from './store/walletStore';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

function useRole() {
  const role = useWalletStore((s) => s.role);
  return role; // 'ADMIN' | 'TEACHER' | 'STUDENT' | null
}

export function ConnectWalletButton() {
  const { address, connect, isConnecting } = useWalletStore();

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
    >
      {isConnecting
        ? "Connecting..."
        : address
        ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
}


function Home() {
  const role = useRole();
  return (
    <div style={{ padding: 24 }}>
      <h2>MetaMarks</h2>
      <p>Select your dashboard:</p>
      <ul>
        <li><a href="/admin">Admin</a></li>
        <li><a href="/teacher">Teacher</a></li>
        <li><a href="/student">Student</a></li>
      </ul>
      <p>Current role: {role || 'Unknown'}</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
    <ConnectWalletButton/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
