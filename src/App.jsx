import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";  // <-- Make sure this is added

import { RequestAirdrop } from "./RequestAirdrop";
import { ShowSolBalance } from "./ShowBalance";
import { SendTokens } from "./SendTokens";
import { SignMessage } from "./SignMessage";

function App() {

  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>

          {/* Header Wallet Buttons */}
          <div className="header-buttons">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>

          {/* Request Airdrop */}
          <div className="card">
            <h2>Request Airdrop</h2>
            <RequestAirdrop />
          </div>

          {/* Show SOL Balance */}
          <div className="card">
            <h2>Show SOL Balance For Your Account {<WalletMultiButton />}  </h2>
            <ShowSolBalance />
          </div>

          {/* Send Tokens */}
          <div className="card">
            <h2>Send SOL Tokens</h2>
            <SendTokens />
          </div>

          {/* Sign Message */}
          <div className="card">
            <h2>Sign a Message</h2>
            <SignMessage />
          </div>

          <div>
            <p>By Sourav Malviya</p>
          </div>

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>

    
  );
}

export default App;
