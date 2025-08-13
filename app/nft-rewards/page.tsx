'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

interface NFTReward {
  id: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  unlocked: boolean;
  progress: number;
  requirement: string;
  image: string;
  attributes: Record<string, string | number>;
  blockchain: 'Ethereum' | 'Polygon' | 'Solana';
}

export default function NFTRewardsPage() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const nftRewards: NFTReward[] = [
    {
      id: 'memory-master-1',
      name: 'Memory Master Genesis',
      description: 'First achievement in memory training mastery',
      rarity: 'Common',
      unlocked: true,
      progress: 100,
      requirement: 'Complete 10 memory games',
      image: '🧠',
      attributes: {
        'Memory Score': 87,
        'Games Completed': 15,
        'Accuracy': '92%'
      },
      blockchain: 'Polygon'
    },
    {
      id: 'gamma-wave-expert',
      name: 'Gamma Wave Expert',
      description: 'Sustained high gamma wave activity during cognitive tasks',
      rarity: 'Rare',
      unlocked: true,
      progress: 100,
      requirement: 'Maintain 40+ Hz gamma waves for 30 minutes',
      image: '⚡',
      attributes: {
        'Peak Gamma': '45 Hz',
        'Duration': '32 min',
        'Cognitive Load': 'High'
      },
      blockchain: 'Ethereum'
    },
    {
      id: 'neural-architect',
      name: 'Neural Architect',
      description: 'Master of 3D neural pathway visualization',
      rarity: 'Epic',
      unlocked: false,
      progress: 75,
      requirement: 'Build 50 neural networks in VR space',
      image: '🏗️',
      attributes: {
        'Networks Built': 37,
        'Complexity Score': 'Advanced',
        'VR Hours': 25
      },
      blockchain: 'Solana'
    },
    {
      id: 'transcendent-mind',
      name: 'Transcendent Mind',
      description: 'Ultimate cognitive enhancement achievement',
      rarity: 'Legendary',
      unlocked: false,
      progress: 45,
      requirement: 'Achieve perfect cognitive balance for 90 days',
      image: '🌟',
      attributes: {
        'Days Streak': 41,
        'Overall Score': '94%',
        'Neural Efficiency': 'Optimal'
      },
      blockchain: 'Ethereum'
    },
    {
      id: 'meditation-sage',
      name: 'Meditation Sage',
      description: 'Deep meditation and mindfulness mastery',
      rarity: 'Rare',
      unlocked: false,
      progress: 60,
      requirement: 'Complete 100 hours of guided meditation',
      image: '🧘',
      attributes: {
        'Meditation Hours': 62,
        'Theta Waves': 'Strong',
        'Stress Reduction': '85%'
      },
      blockchain: 'Polygon'
    },
    {
      id: 'cognitive-olympian',
      name: 'Cognitive Olympian',
      description: 'Champion of multiplayer cognitive challenges',
      rarity: 'Epic',
      unlocked: false,
      progress: 30,
      requirement: 'Win 25 competitive cognitive battles',
      image: '🏆',
      attributes: {
        'Wins': 8,
        'Win Rate': '73%',
        'Rank': 'Diamond'
      },
      blockchain: 'Solana'
    }
  ];

  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setConnectedWallet('0x742d35Cc6643C0532925a3b8F39123456789abcd');
      setIsConnecting(false);
    }, 2000);
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
  };

  const mintNFT = (nftId: string) => {
    // Simulate NFT minting
    console.log(`Minting NFT: ${nftId}`);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return '#94a3b8';
      case 'Rare': return '#4facfe';
      case 'Epic': return '#8338ec';
      case 'Legendary': return '#fbbf24';
      default: return '#94a3b8';
    }
  };

  const getBlockchainColor = (blockchain: string) => {
    switch (blockchain) {
      case 'Ethereum': return '#627eea';
      case 'Polygon': return '#8247e5';
      case 'Solana': return '#00d4aa';
      default: return '#4facfe';
    }
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="progress" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">NFT Cognitive Rewards</h1>
          <p className="dashboard-subtitle">Blockchain-verified achievements for your neural enhancement journey</p>
          <div className="section-divider"></div>
        </div>

        <div className="wallet-section">
          <div className="wallet-card">
            <div className="wallet-info">
              <h3 className="wallet-title">Blockchain Wallet</h3>
              {connectedWallet ? (
                <div className="connected-wallet">
                  <span className="wallet-address">{connectedWallet}</span>
                  <span className="connection-status connected">Connected</span>
                </div>
              ) : (
                <p className="wallet-description">Connect your wallet to mint and manage your cognitive achievement NFTs</p>
              )}
            </div>
            
            <div className="wallet-actions">
              {connectedWallet ? (
                <button className="wallet-button disconnect" onClick={disconnectWallet}>
                  Disconnect Wallet
                </button>
              ) : (
                <button 
                  className="wallet-button connect" 
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Achievement NFTs</h2>
          <div className="section-divider"></div>
          
          <div className="nft-grid">
            {nftRewards.map((nft) => (
              <div key={nft.id} className={`nft-card ${nft.unlocked ? 'unlocked' : 'locked'}`}>
                <div className="nft-header">
                  <div className="nft-image">{nft.image}</div>
                  <div className="nft-badges">
                    <span 
                      className="rarity-badge"
                      style={{ backgroundColor: getRarityColor(nft.rarity) }}
                    >
                      {nft.rarity}
                    </span>
                    <span 
                      className="blockchain-badge"
                      style={{ backgroundColor: getBlockchainColor(nft.blockchain) }}
                    >
                      {nft.blockchain}
                    </span>
                  </div>
                </div>

                <div className="nft-content">
                  <h3 className="nft-name">{nft.name}</h3>
                  <p className="nft-description">{nft.description}</p>
                  
                  <div className="nft-requirement">
                    <strong>Requirement:</strong> {nft.requirement}
                  </div>

                  <div className="nft-progress">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span className="progress-value">{nft.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${nft.progress}%`,
                          backgroundColor: getRarityColor(nft.rarity)
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="nft-attributes">
                    <h4>Attributes</h4>
                    <div className="attributes-grid">
                      {Object.entries(nft.attributes).map(([key, value]) => (
                        <div key={key} className="attribute-item">
                          <span className="attribute-key">{key}:</span>
                          <span className="attribute-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="nft-actions">
                    {nft.unlocked ? (
                      connectedWallet ? (
                        <button 
                          className="mint-button"
                          onClick={() => mintNFT(nft.id)}
                        >
                          Mint NFT
                        </button>
                      ) : (
                        <button className="mint-button disabled">
                          Connect Wallet to Mint
                        </button>
                      )
                    ) : (
                      <button className="mint-button locked">
                        {nft.progress}% Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Blockchain Features</h2>
          <div className="section-divider"></div>
          
          <div className="blockchain-features">
            <div className="feature-card">
              <div className="feature-icon">⛓️</div>
              <h3>Multi-Chain Support</h3>
              <p>Deploy NFTs on Ethereum, Polygon, and Solana for optimal gas fees and performance</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Dynamic Metadata</h3>
              <p>NFT attributes evolve as you progress, creating unique, living digital assets</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Premium Access</h3>
              <p>Unlock exclusive VR environments and advanced cognitive training with NFT ownership</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Cross-Platform</h3>
              <p>Use your cognitive NFTs across different apps and platforms in the neural enhancement ecosystem</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
