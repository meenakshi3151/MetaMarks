// src/store/walletStore.js

import { create } from 'zustand';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../constants/contract';

export const useWalletStore = create((set, get) => ({
  address: null,
  chainId: null,
  role: null, // 'ADMIN' | 'TEACHER' | 'STUDENT' | null
  isConnecting: false,
  error: null,
  provider: null,
  signer: null,

  setRole: (role) => set({ role }),

  connect: async () => {
    try {
      set({ isConnecting: true, error: null });
      const detectedProvider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (!detectedProvider) throw new Error('MetaMask not found. Please install it.');

      const provider = new ethers.BrowserProvider(detectedProvider);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const chainId = (await provider.getNetwork()).chainId.toString();

      // IMPORTANT: Removed the role-checking logic.
      // Your contract's ABI does not contain the `isAdmin`, `isTeacher`, or `isStudent` functions.
      // The `role` will be set to null initially. You'll set it manually for testing.
      let userRole = null;
      
      set({ 
        address, 
        chainId, 
        role: userRole, 
        provider, 
        signer, 
        isConnecting: false 
      });

      if (detectedProvider.on) {
        const handleAccountsChanged = async (accs) => {
          const newAddress = accs[0] || null;
          set({ address: newAddress });
          if (!newAddress) {
            set({ role: null, signer: null, provider: null });
          }
        };
        const handleChainChanged = (cid) => set({ chainId: cid });
        detectedProvider.removeListener?.('accountsChanged', handleAccountsChanged);
        detectedProvider.removeListener?.('chainChanged', handleChainChanged);
        detectedProvider.on('accountsChanged', handleAccountsChanged);
        detectedProvider.on('chainChanged', handleChainChanged);
      }
    } catch (e) {
      set({ error: e.message, isConnecting: false });
      console.error(e);
    }
  },

  disconnect: () => {
    set({ address: null, chainId: null, role: null, provider: null, signer: null });
  },

  // Centralized functions for interacting with the contract.

  addStudent: async (name) => {
    const { signer } = get();
    if (!signer) {
      set({ error: "Wallet not connected. Please connect first." });
      return;
    }
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.addStudent(name);
      await transaction.wait();
      set({ error: null });
      console.log(`Student "${name}" added successfully.`);
    } catch (err) {
      set({ error: err.message });
      console.error("Error adding student:", err);
    }
  },
  
  // New function to add a teacher
  addTeacher: async (name, subject) => {
    const { signer } = get();
    if (!signer) {
      set({ error: "Wallet not connected. Please connect first." });
      return;
    }
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.addTeacher(name, subject);
      await transaction.wait();
      set({ error: null });
      console.log(`Teacher "${name}" added successfully.`);
    } catch (err) {
      set({ error: err.message });
      console.error("Error adding teacher:", err);
    }
  },

  // New function to add marks
  addMarks: async (studentIndex, teacherIndex, mark) => {
    const { signer } = get();
    if (!signer) {
      set({ error: "Wallet not connected. Please connect first." });
      return;
    }
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.addMarks(studentIndex, teacherIndex, mark);
      await transaction.wait();
      set({ error: null });
      console.log(`Marks added successfully for student ${studentIndex}.`);
    } catch (err) {
      set({ error: err.message });
      console.error("Error adding marks:", err);
    }
  },

  // Example read functions
  getTotalStudents: async () => {
    const { provider } = get();
    if (!provider) {
      set({ error: "Provider not available. Please connect wallet." });
      return null;
    }
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const total = await contract.totalStudents();
      set({ error: null });
      return Number(total);
    } catch (err) {
      set({ error: err.message });
      console.error("Error fetching total students:", err);
      return null;
    }
  },
  
  getTotalTeachers: async () => {
    const { provider } = get();
    if (!provider) {
      set({ error: "Provider not available. Please connect wallet." });
      return null;
    }
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const total = await contract.totalTeachers();
      set({ error: null });
      return Number(total);
    } catch (err) {
      set({ error: err.message });
      console.error("Error fetching total teachers:", err);
      return null;
    }
  },

  // New function to calculate CPI
  calculateCPI: async (studentIndex) => {
    const { provider } = get();
    if (!provider) {
      set({ error: "Provider not available. Please connect wallet." });
      return null;
    }
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const cpi = await contract.calculateCPI(studentIndex);
      set({ error: null });
      return Number(cpi);
    } catch (err) {
      set({ error: err.message });
      console.error("Error calculating CPI:", err);
      return null;
    }
  },
  
  // New function to get a single student's data
  getStudent: async (studentIndex) => {
    const { provider } = get();
    if (!provider) {
      set({ error: "Provider not available. Please connect wallet." });
      return null;
    }
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const student = await contract.students(studentIndex);
      set({ error: null });
      return student;
    } catch (err) {
      set({ error: err.message });
      console.error("Error fetching student:", err);
      return null;
    }
  },
}));
