import { create } from 'zustand';
import detectEthereumProvider from '@metamask/detect-provider';
import { fetchRoleFor } from '../services/blockchain';

export const useWalletStore = create((set, get) => ({
  address: null,
  chainId: null,
  role: null, // 'ADMIN' | 'TEACHER' | 'STUDENT' | null
  isConnecting: false,
  error: null,

  setRole: (role) => set({ role }),

  connect: async () => {
    try {
      set({ isConnecting: true, error: null });
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (!provider) throw new Error('MetaMask not found. Please install it.');
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const chainId = await provider.request({ method: 'eth_chainId' });
      const address = accounts[0] || null;
      set({ address, chainId });

      // Resolve role from chain/service
      if (address) {
        try {
          const role = await fetchRoleFor(address);
          set({ role });
        } catch {}
      }

      if (provider && provider.on) {
        const handleAccountsChanged = async (accs) => {
          const next = accs[0] || null;
          set({ address: next });
          if (next) {
            try {
              const role = await fetchRoleFor(next);
              set({ role });
            } catch {}
          } else {
            set({ role: null });
          }
        };
        const handleChainChanged = (cid) => set({ chainId: cid });
        provider.removeListener?.('accountsChanged', handleAccountsChanged);
        provider.removeListener?.('chainChanged', handleChainChanged);
        provider.on('accountsChanged', handleAccountsChanged);
        provider.on('chainChanged', handleChainChanged);
      }
    } catch (e) {
      set({ error: e.message });
    } finally {
      set({ isConnecting: false });
    }
  },

  disconnect: () => set({ address: null, chainId: null, role: null }),
}));


