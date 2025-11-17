import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function requestAirdrop() {
    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    let amount = document.getElementById("airdropAmount").value;
    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const lamports = amount * LAMPORTS_PER_SOL;

    try {
      const signature = await connection.requestAirdrop(wallet.publicKey, lamports);

      // MUST CONFIRM
      await connection.confirmTransaction(signature, "confirmed");

      alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);
    } catch (err) {
      alert("Airdrop failed: " + err.message);
    }
  }

  return (
    <div>
      <input id="airdropAmount" type="number" placeholder="Amount" />
      <button onClick={requestAirdrop}>Request Airdrop</button>
    </div>
  );
}
