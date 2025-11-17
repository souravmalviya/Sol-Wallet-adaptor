import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function RequestAirdrop({ refreshBalance }) {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [status, setStatus] = useState("");

  async function requestAirdrop() {
    if (!wallet.publicKey) {
      setStatus("⚠️ Please connect your wallet first!");
      return;
    }

    let amount = document.getElementById("airdropAmount").value;
    if (!amount || amount <= 0) {
      setStatus("⚠️ Enter a valid amount.");
      return;
    }

    const lamports = amount * LAMPORTS_PER_SOL;
    setStatus("⏳ Requesting airdrop… please wait.");

    try {
      // Step 1: Request
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        lamports
      );

      setStatus("🔄 Airdrop requested. Confirming transaction…");

      // Step 2: Confirm
      await connection.confirmTransaction(signature, "confirmed");

      // Step 3: Have to wait — Devnet is slow
      await new Promise((res) => setTimeout(res, 1500));

      // Step 4: Refresh balance after confirmation
      if (refreshBalance) await refreshBalance();

      setStatus(`🎉 Successfully received ${amount} SOL!`);
    } catch (err) {
      console.error("Airdrop error:", err);

      if (
        err.message.includes("429") ||
        err.message.includes("rate limit") ||
        err.message.includes("Too many")
      ) {
        setStatus("⚠️ Faucet rate limit exceeded. Wait 30–60 seconds.");
      } else {
        setStatus("❌ Airdrop failed: " + err.message);
      }
    }
  }

  return (
    <div>
      <input
        id="airdropAmount"
        type="number"
        placeholder="Amount in SOL"
        className="airdrop-input"
      />
      <button onClick={requestAirdrop} className="airdrop-button">
        Request Airdrop
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}
