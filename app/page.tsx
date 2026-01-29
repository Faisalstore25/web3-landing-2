"use client";

import { useState } from "react";

export default function Home() {
  const [account, setAccount] = useState<string | null>(
    "0x0FC7C4424BB116aD4C6fcAf76bCf754C65524610"
  );
  const [balance, setBalance] = useState("0.0000 ETH");
  const [network, setNetwork] = useState("mainnet");

  const disconnectWallet = () => {
    setAccount(null);
    setBalance("");
    setNetwork("");
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
        <h1 className="text-2xl font-bold mb-2">
          Web3 Developer · Next.js · ethers.js
        </h1>

        <p className="text-sm text-zinc-400 mb-6">
          Available for Web3 Frontend Freelance
        </p>

        {account ? (
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-zinc-400">Address:</span>{" "}
              {account.slice(0, 6)}...{account.slice(-4)}
            </p>

            <p>
              <span className="text-zinc-400">Balance:</span> {balance}
            </p>

            <p>
              <span className="text-zinc-400">Network:</span> {network}
            </p>

            <button
              onClick={disconnectWallet}
              className="w-full mt-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <p className="text-center text-zinc-500">
            Wallet not connected
          </p>
        )}
      </div>
    </main>
  );
}
