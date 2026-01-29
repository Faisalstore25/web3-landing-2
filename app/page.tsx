"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("");
  const [network, setNetwork] = useState<string>("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask belum terpasang");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const address = await signer.getAddress();
      const bal = await provider.getBalance(address);
      const net = await provider.getNetwork();

      setAccount(address);
      setBalance(ethers.formatEther(bal));
      setNetwork(net.name);
    } catch (err) {
      console.error(err);
      alert("Gagal connect wallet");
    }
  };

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
              <span className="text-zinc-400">Balance:</span>{" "}
              {Number(balance).toFixed(4)} ETH
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
          <button
            onClick={connectWallet}
            className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </main>
  );
}
