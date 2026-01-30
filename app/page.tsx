"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("");
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [loading, setLoading] = useState(true);
   
   useEffect(() => {
  const checkWallet = async () => {
    if (!window.ethereum) {
      setLoading(false);
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_accounts", []);

    if (accounts.length > 0) {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const bal = await provider.getBalance(address);
      const net = await provider.getNetwork();

      setAccount(address);
      setBalance(ethers.formatEther(bal));
      let networkName = "Unknown Network";
if (net.chainId === 1n) networkName = "Ethereum Mainnet";
if (net.chainId === 11155111n) networkName = "Sepolia Testnet";

setNetwork(networkName);

    }

    setLoading(false);
  };

  checkWallet();
}, []);

 useEffect(() => {
  if (!window.ethereum) return;

  const handleChainChanged = () => {
    window.location.reload();
  };

  window.ethereum.on("chainChanged", handleChainChanged);

  return () => {
    window.ethereum.removeListener("chainChanged", handleChainChanged);
  };
}, []);

const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask belum terpasang");
    return;
  }

  try {
    setIsConnecting(true);

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const address = await signer.getAddress();
    const bal = await provider.getBalance(address);
    const net = await provider.getNetwork();

    setWrongNetwork(net.chainId !== 1n && net.chainId !== 11155111n);

    setAccount(address);
    setBalance(ethers.formatEther(bal));
    setNetwork(
      net.chainId === 1n ? "Ethereum Mainnet" : "Sepolia Testnet"
    );
  } catch (err) {
    console.error(err);
  } finally {
    setIsConnecting(false);
  }
};


  const disconnectWallet = () => {
    setAccount(null);
    setBalance("");
    setNetwork("");
    setWrongNetwork(false);
  };

  return (
  <main className="min-h-screen bg-black text-white px-6">
    <div className="max-w-4xl mx-auto py-20">

      {/* HERO */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Web3 Frontend Developer
        </h1>

        <p className="text-zinc-400 max-w-xl">
          Building secure, modern Web3 interfaces using Next.js, ethers.js,
          and MetaMask integration.
        </p>

        <div className="flex gap-4 mt-6">
          <a
            href="https://github.com/Faisalstore25"
            target="_blank"
            className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
          >
            GitHub
          </a>

          <a
            href="#contact"
            className="px-5 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-900 transition"
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* WALLET CARD */}
      <div className="max-w-md w-full border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
        <h2 className="text-xl font-bold mb-2">
          Wallet Connection
        </h2>

        {loading ? (
  <p className="text-zinc-400 text-sm">
    Checking wallet...
  </p>
) : account ? (
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

    {wrongNetwork && (
      <div className="mt-3 text-yellow-400 text-sm">
        ⚠️ Please switch to Ethereum Mainnet or Sepolia Testnet
      </div>
    )}

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
    disabled={isConnecting}
    className={`w-full py-2 rounded-lg transition
      ${isConnecting
        ? "bg-zinc-600 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"}
    `}
  >
    {isConnecting ? "Connecting..." : "Connect Wallet"}
  </button>
)}
</div>

      {/* SKILLS */}
<div className="mt-20">
  <h2 className="text-2xl font-semibold mb-6">Skills</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
    {[
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "React", url: "https://react.dev" },
      { name: "TypeScript", url: "https://www.typescriptlang.org" },
      { name: "ethers.js", url: "https://docs.ethers.org/v6/" },
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Web3 Wallet", url: "https://ethereum.org/en/wallets/" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com" },
      { name: "Git & GitHub", url: "https://github.com/Faisalstore25" },
    ].map((skill) => (
      <a
        key={skill.name}
        href={skill.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-zinc-800 rounded-lg px-4 py-3 text-center bg-zinc-950 
                   hover:border-green-500 hover:text-green-400 transition"
      >
        {skill.name}
      </a>
    ))}
  </div>
</div>


      {/* PROJECTS */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-950">
            <h3 className="font-semibold text-lg mb-2">
              Web3 Wallet Connect
            </h3>

            <p className="text-sm text-zinc-400 mb-4">
              A Web3 landing page that connects MetaMask wallet and displays
              address, balance, and network using ethers.js.
            </p>

            <a
              href="https://github.com/Faisalstore25/web3-landing-2"
              target="_blank"
              className="text-green-400 hover:underline text-sm"
            >
              GitHub Repository
            </a>
          </div>

          <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-950 opacity-60">
            <h3 className="font-semibold text-lg mb-2">
              Upcoming Web3 Project
            </h3>

            <p className="text-sm text-zinc-400">
              More decentralized apps coming soon.
            </p>
          </div>
        </div>
      </div>
      {/* CONTACT */}
<div id="contact" className="mt-24">
   <h2 className="text-2xl font-semibold mb-6">Contact</h2>

   <div className="grid md:grid-cols-3 gap-4 text-sm">
     <a
      href="https://wa.me/62XXXXXXXXXX"
      target="_blank"
      className="border border-zinc-800 rounded-xl p-4 bg-zinc-950 hover:border-green-500 transition"
     >
      📱 WhatsApp
      <p className="text-zinc-400 mt-1">Fast response</p>
     </a>
 
     <a
      href="https://t.me/USERNAME"
      target="_blank"
      className="border border-zinc-800 rounded-xl p-4 bg-zinc-950 hover:border-green-500 transition"
     >
      ✈️ Telegram
      <p className="text-zinc-400 mt-1">Preferred for Web3</p>
     </a>

     <a
      href="mailto:emailkamu@gmail.com"
      className="border border-zinc-800 rounded-xl p-4 bg-zinc-950 hover:border-green-500 transition"
     >
      📧 Email
      <p className="text-zinc-400 mt-1">Formal inquiry</p>
     </a>
    </div>
    </div>


    </div>
  </main>
);
}