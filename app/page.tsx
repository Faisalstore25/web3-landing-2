"use client";

import { ethers } from "ethers";
import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("MetaMask belum terinstall");
      return;
    }

    const provider = new ethers.BrowserProvider(
      (window as any).ethereum
    );

    const accounts = await provider.send("eth_requestAccounts", []);
    setAddress(accounts[0]);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Web3 Landing Page 🚀
        </h1>

        {address ? (
          <p className="text-green-400">
            Connected: {address}
          </p>
        ) : (
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Connect MetaMask
          </button>
        )}
      </div>
    </main>
  );
}
