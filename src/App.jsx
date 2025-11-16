//import React, { useMemo } from "react";
//import "@solana/wallet-adapter-react-ui/styles.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
//import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import {RequestAirdrop} from "./RequestAirdrop"
import { SendTokens } from "./SendTokens";
import { ShowSolBalance } from "./ShowBalance";


function App() {
 // const network = WalletAdapterNetwork.Devnet;

  //const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <RequestAirdrop></RequestAirdrop>
          <div>
            <SendTokens/>
            <ShowSolBalance/>
          </div>
  
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;