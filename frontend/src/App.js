import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useWalletStore } from './store/walletStore';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

function ConnectWallet() {
  const { address, isConnecting, error, connect, disconnect } = useWalletStore();
  return (
    <div style={{ padding: 16, display: 'flex', gap: 8 }}>
      {address ? (
        <>
          <span>Connected: {address.slice(0, 6)}...{address.slice(-4)}</span>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={connect} disabled={isConnecting}>
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>
      )}
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
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
      <ConnectWallet />
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
