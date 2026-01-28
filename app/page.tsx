'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask belum terpasang');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const addr = await signer.getAddress();
    const bal = await provider.getBalance(addr);
    const net = await provider.getNetwork();

    setAddress(addr);
    setBalance(ethers.formatEther(bal));
    setNetwork(net.name);
  };

  const disconnectWallet = () => {
    setAddress(null);
    setBalance(null);
    setNetwork(null);
  };

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #020617, #000)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '420px',
          width: '100%',
          background: '#020617',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '1.9rem', marginBottom: '6px' }}>
          Web3 Portfolio – Faisal 🚀
        </h1>
        <p style={{ opacity: 0.75, fontSize: '0.95rem' }}>
          Frontend Web3 Developer · Next.js · ethers.js
        </p>

        <p
          style={{
            marginTop: '10px',
            fontSize: '0.85rem',
            color: '#22c55e',
          }}
        >
          Available for Web3 Frontend Freelance
        </p>

        {!address ? (
          <button
            onClick={connectWallet}
            style={{
              marginTop: '22px',
              width: '100%',
              padding: '12px',
              background: '#2563eb',
              color: 'white',
              borderRadius: '10px',
              fontWeight: 600,
            }}
          >
            Connect MetaMask
          </button>
        ) : (
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <p><b>Address:</b> {shortAddress}</p>
            <p><b>Balance:</b> {Number(balance).toFixed(4)} ETH</p>
            <p><b>Network:</b> {network}</p>

            <button
              onClick={disconnectWallet}
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '10px',
                background: '#dc2626',
                color: 'white',
                borderRadius: '10px',
              }}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
