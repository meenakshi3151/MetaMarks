import { ethers } from 'ethers';
import StudentMarks from '../abis/StudentMarks.json';

let cachedProvider = null;

export function getProvider() {
  if (!window.ethereum) throw new Error('MetaMask not available');
  if (!cachedProvider) {
    cachedProvider = new ethers.BrowserProvider(window.ethereum);
  }
  return cachedProvider;
}

export async function getSigner() {
  const provider = getProvider();
  return await provider.getSigner();
}

import StudentMarks from '../abis/StudentMarks.json';

// Replace with your deployed contract address from Remix
export const CONTRACTS = {
  studentMarks: {
    address: "0x540d7E428D5207B30EE03F2551Cbb5751D3c7569",
    abi: StudentMarks.abi,
  },
};


export async function getContract(name, withSigner = true) {
  const def = CONTRACTS[name];
  if (!def) throw new Error(`Unknown contract: ${name}`);
  const provider = getProvider();
  const runner = withSigner ? await provider.getSigner() : provider;
  return new ethers.Contract(def.address, def.abi, runner);
}

// Role helpers - to be implemented via contract calls
export async function fetchRoleFor(address) {
  // TODO: call registry to resolve role
  // Return one of 'ADMIN' | 'TEACHER' | 'STUDENT' or null
  return null;
}

// Marks services - to be implemented
export async function fetchStudentTranscript(address) {
  // return { subjects: [{ name, marks }], percentage, status }
  return { subjects: [], percentage: 0, status: 'PENDING' };
}

export async function submitMarks(subjectId, studentAddress, marks) {
  // teacher action
  return { txHash: '0x' };
}

export async function adminPublishResults() {
  return { txHash: '0x' };
}
