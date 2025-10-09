# MetaMarks Project

This is the official metaMarks Project by Brainiacs

## Members:
- Lakshya Kumar
- Jitendra Prajapat
- Meenakshi Gupta
- Lakshya Puripanda

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm start
```

### Backend Setup

1. **Open terminal and navigate to server directory:**
   ```bash
   cd server
   ```

2. **Compile contracts:**
   ```bash
   npx hardhat compile
   ```

3. **Install Ganache globally:**
   ```bash
   npm install ganache --global
   ```

4. **Start Ganache:**
   ```bash
   ganache-cli
   ```

5. **Open new terminal and deploy contracts:**
   ```bash
   cd server
   npx hardhat run scripts/deploy.js --network localhost
   ```

6. **Copy contract address:**
   - When the deploy command is running, check the previous terminal (Ganache)
   - You will see "Contract created" with an address
   - Copy that address and replace it in:
     - `contractAddress` variable in `contracts.js` file
     - `studentMarks` address variable

7. **Setup MetaMask:**
   - Copy any one of the private keys from the Ganache terminal
   - Go to MetaMask dashboard
   - Click on "Add Account"
   - Click on "Private key"
   - Paste the private key
   - New account is formed

8. **Add custom network in MetaMask:**
   - **Network Name:** Localhost 8545
   - **RPC URL:** http://127.0.0.1:8545/
   - **Chain ID:** 1337
   - **Symbol:** ETH