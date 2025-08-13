'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

interface NFTReward {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  blockchain: 'Ethereum' | 'Polygon';
  unlocked: boolean;
  requirement: string;
  progress: number;
  maxProgress: number;
}

export default function NFTRewardsPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'rewards' | 'collection'>('rewards');

  const nftRewards: NFTReward[] = [
    {
      id: 'memory-master',
      name: 'Memory Master',
      description: 'Achieved mastery in memory training with consistent high scores',
      image: '🧠',
      rarity: 'Epic',
      blockchain: 'Ethereum',
      unlocked: true,
      requirement: 'Score 90%+ in 10 memory games',
      progress: 10,
      maxProgress: 10
    },
    {
      id: 'focus-champion',
      name: 'Focus Champion',
      description: 'Demonstrated exceptional focus and attention control',
      image: '🎯',
      rarity: 'Rare',
      blockchain: 'Polygon',
      unlocked: true,
      requirement: 'Complete 2+ hour focus sessions',
      progress: 5,
      maxProgress: 5
    },
    {
      id: 'meditation-guru',
      name: 'Mindfulness Guru',
      description: 'Achieved deep meditative states with consistent practice',
      image: '🧘',
      rarity: 'Legendary',
      blockchain: 'Ethereum',
      unlocked: false,
      requirement: '30 consecutive days of meditation',
      progress: 23,
      maxProgress: 30
    },
    {
      id: 'eeg-pioneer',
      name: 'EEG Pioneer',
      description: 'Advanced brainwave monitoring and optimization achievements',
      image: '📊',
      rarity: 'Epic',
      blockchain: 'Ethereum',
      unlocked: false,
      requirement: '100 hours of EEG monitoring',
      progress: 78,
      maxProgress: 100
    },
    {
      id: 'cognitive-researcher',
      name: 'Cognitive Researcher',
      description: 'Contributed to neuroscience research through participation',
      image: '🔬',
      rarity: 'Common',
      blockchain: 'Polygon',
      unlocked: true,
      requirement: 'Complete 5 research studies',
      progress: 5,
      maxProgress: 5
    },
    {
      id: 'brain-optimizer',
      name: 'Brain Optimizer',
      description: 'Achieved optimal cognitive performance across all metrics',
      image: '⚡',
      rarity: 'Legendary',
      blockchain: 'Ethereum',
      unlocked: false,
      requirement: 'Score 95%+ overall cognitive score',
      progress: 87,
      maxProgress: 95
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return '#6b7280';
      case 'Rare': return '#3b82f6';
      case 'Epic': return '#8b5cf6';
      case 'Legendary': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getBlockchainColor = (blockchain: string) => {
    switch (blockchain) {
      case 'Ethereum': return '#627eea';
      case 'Polygon': return '#8247e5';
      default: return '#6b7280';
    }
  };

  const connectWallet = () => {
    setWalletConnected(true);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="nft-rewards" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">NFT Rewards</h1>
          <p className="dashboard-subtitle">Earn unique NFTs by achieving cognitive milestones</p>
          <div className="section-divider"></div>
        </div>

        <div className="wallet-section">
          <div className="wallet-card">
            <div>
              <h2 className="wallet-title">Web3 Wallet</h2>
              {walletConnected ? (
                <div className="connected-wallet">
                  <p className="wallet-address">0x742d...5d23</p>
                  <span className="connection-status connected">Connected</span>
                </div>
              ) : (
                <p className="wallet-description">Connect your wallet to mint and manage NFT rewards</p>
              )}
            </div>
            
            {walletConnected ? (
              <button className="wallet-button disconnect" onClick={disconnectWallet}>
                Disconnect
              </button>
            ) : (
              <button className="wallet-button connect" onClick={connectWallet}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        <div className="nft-tabs">
          <button 
            className={`tab-button ${selectedTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setSelectedTab('rewards')}
          >
            Available Rewards
          </button>
          <button 
            className={`tab-button ${selectedTab === 'collection' ? 'active' : ''}`}
            onClick={() => setSelectedTab('collection')}
          >
            My Collection
          </button>
        </div>

        {selectedTab === 'rewards' && (
          <div className="section-card">
            <h2 className="section-title">Cognitive Achievement NFTs</h2>
            <div className="section-divider"></div>
            
            <div className="nft-grid">
              {nftRewards.map((nft) => (
                <div key={nft.id} className={`nft-card ${nft.unlocked ? 'unlocked' : 'locked'}`}>
                  <div className="nft-header">
                    <div className="nft-image">{nft.image}</div>
                    <div className="nft-badges">
                      <span 
                        className="rarity-badge"
                        style={{ backgroundColor: `${getRarityColor(nft.rarity)}20`, color: getRarityColor(nft.rarity) }}
                      >
                        {nft.rarity}
                      </span>
                      <span 
                        className="blockchain-badge"
                        style={{ backgroundColor: `${getBlockchainColor(nft.blockchain)}20`, color: getBlockchainColor(nft.blockchain) }}
                      >
                        {nft.blockchain}
                      </span>
                    </div>
                  </div>

                  <h3 className="nft-name">{nft.name}</h3>
                  <p className="nft-description">{nft.description}</p>

                  <div className="nft-requirement">
                    <strong>Requirement:</strong> {nft.requirement}
                  </div>

                  {!nft.unlocked && (
                    <div className="nft-progress">
                      <div className="progress-header">
                        <span>Progress</span>
                        <span>{nft.progress}/{nft.maxProgress}</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${(nft.progress / nft.maxProgress) * 100}%`,
                            backgroundColor: getRarityColor(nft.rarity)
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="nft-actions">
                    {nft.unlocked ? (
                      walletConnected ? (
                        <button className="nft-button unlocked">Mint NFT</button>
                      ) : (
                        <button className="nft-button disabled">Connect Wallet to Mint</button>
                      )
                    ) : (
                      <button className="nft-button locked" disabled>
                        {Math.round((nft.progress / nft.maxProgress) * 100)}% Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'collection' && (
          <div className="section-card">
            <h2 className="section-title">My NFT Collection</h2>
            <div className="section-divider"></div>
            
            {walletConnected ? (
              <div className="collection-grid">
                {nftRewards.filter(nft => nft.unlocked).map((nft) => (
                  <div key={nft.id} className="collection-item">
                    <div className="collection-image">{nft.image}</div>
                    <h3 className="collection-name">{nft.name}</h3>
                    <div className="collection-meta">
                      <span className="collection-rarity" style={{ color: getRarityColor(nft.rarity) }}>
                        {nft.rarity}
                      </span>
                      <span className="collection-blockchain" style={{ color: getBlockchainColor(nft.blockchain) }}>
                        {nft.blockchain}
                      </span>
                    </div>
                    <button className="collection-button">View on OpenSea</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="connect-prompt">
                <div className="prompt-icon">🔒</div>
                <h3>Connect Your Wallet</h3>
                <p>Connect your Web3 wallet to view your NFT collection</p>
                <button className="prompt-button" onClick={connectWallet}>
                  Connect Wallet
                </button>
              </div>
            )}
          </div>
        )}

        <div className="premium-features">
          <h2 className="section-title">Premium NFT Benefits</h2>
          <div className="section-divider"></div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎮</div>
              <h3>Exclusive Games</h3>
              <p>Access to premium cognitive training games available only to NFT holders</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Advanced Analytics</h3>
              <p>Detailed neuroplasticity reports and personalized optimization recommendations</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🧬</div>
              <h3>Research Access</h3>
              <p>Early access to cutting-edge neuroscience research and experimental features</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">👥</div>
              <h3>Elite Community</h3>
              <p>Join exclusive Discord channels and participate in research collaborations</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
