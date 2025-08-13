import React, { useState, useEffect } from 'react'
import { 
  Coins,
  Trophy,
  Star,
  Zap,
  Crown,
  Shield,
  Gem,
  Sparkles,
  TrendingUp,
  Lock,
  Unlock,
  ChevronRight,
  Wallet,
  Link as LinkIcon,
  Gift,
  Award,
  Hexagon
} from 'lucide-react'

const BlockchainNFT = ({ user, cognitiveData, achievements }) => {
  const [connectedWallet, setConnectedWallet] = useState(null)
  const [userNFTs, setUserNFTs] = useState([])
  const [availableNFTs, setAvailableNFTs] = useState([])
  const [nftEvolution, setNftEvolution] = useState({})
  const [composableUnlocks, setComposableUnlocks] = useState([])
  const [crossChainAssets, setCrossChainAssets] = useState({
    ethereum: [],
    polygon: [],
    solana: []
  })

  // NFT Rarity Levels
  const rarityLevels = {
    common: { color: '#9CA3AF', glow: 'rgba(156, 163, 175, 0.3)', name: 'Common' },
    uncommon: { color: '#10B981', glow: 'rgba(16, 185, 129, 0.3)', name: 'Uncommon' },
    rare: { color: '#3B82F6', glow: 'rgba(59, 130, 246, 0.3)', name: 'Rare' },
    epic: { color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.3)', name: 'Epic' },
    legendary: { color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.3)', name: 'Legendary' },
    mythic: { color: '#EF4444', glow: 'rgba(239, 68, 68, 0.3)', name: 'Mythic' }
  }

  // Initialize NFT Collection
  useEffect(() => {
    const initializeNFTs = () => {
      // User's current NFTs (dynamic based on performance)
      const currentNFTs = [
        {
          id: 'memory-enhancer-001',
          name: 'Memory Enhancer Crystal',
          description: 'Evolves based on memory training performance',
          rarity: 'rare',
          level: Math.floor(cognitiveData.memoryHealth / 10),
          evolution: {
            stage: cognitiveData.memoryHealth > 90 ? 'master' : cognitiveData.memoryHealth > 75 ? 'advanced' : 'basic',
            nextEvolution: cognitiveData.memoryHealth > 90 ? null : cognitiveData.memoryHealth > 75 ? 'master' : 'advanced',
            progressToNext: cognitiveData.memoryHealth % 25
          },
          abilities: ['Memory Boost +15%', 'Focus Enhancement', 'Pattern Recognition'],
          unlocks: ['Advanced Memory Games', 'Neural Landscape Access'],
          image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fd3b03ef89de9467b9610092b5db3e912?format=webp&width=800',
          chain: 'ethereum'
        },
        {
          id: 'focus-guardian-002',
          name: 'Focus Guardian Amulet',
          description: 'Adaptive NFT that strengthens with attention training',
          rarity: 'epic',
          level: Math.floor(cognitiveData.focusLevel / 8),
          evolution: {
            stage: cognitiveData.focusLevel > 85 ? 'transcendent' : cognitiveData.focusLevel > 70 ? 'evolved' : 'nascent',
            nextEvolution: cognitiveData.focusLevel > 85 ? null : 'transcendent',
            progressToNext: (cognitiveData.focusLevel % 15) * 6.67
          },
          abilities: ['Attention Lock', 'Distraction Shield', 'Flow State Access'],
          unlocks: ['VR Focus Chambers', 'EEG Biofeedback Premium'],
          image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F75afea9da9634afeaab85d2c89eaebc3?format=webp&width=800',
          chain: 'polygon'
        },
        {
          id: 'stress-healer-003',
          name: 'Stress Healer Orb',
          description: 'Calming NFT that evolves with mindfulness practice',
          rarity: 'legendary',
          level: Math.floor((100 - cognitiveData.stressLevel) / 5),
          evolution: {
            stage: cognitiveData.stressLevel < 30 ? 'zen-master' : cognitiveData.stressLevel < 50 ? 'harmonized' : 'awakening',
            nextEvolution: cognitiveData.stressLevel < 30 ? null : 'zen-master',
            progressToNext: Math.max(0, 50 - cognitiveData.stressLevel) * 2
          },
          abilities: ['Instant Calm', 'Stress Immunity', 'Emotional Balance'],
          unlocks: ['Ocean VR Environments', 'Advanced Breathing Protocols'],
          image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa64b4be64d5743b4821735e5a99d3a87?format=webp&width=800',
          chain: 'solana'
        }
      ]

      setUserNFTs(currentNFTs)

      // Available NFTs to unlock
      const availableForUnlock = [
        {
          id: 'neural-architect-004',
          name: 'Neural Architect Crown',
          description: 'Unlock by completing 50 brain training sessions',
          rarity: 'mythic',
          requirements: {
            sessions: 50,
            currentProgress: achievements?.sessionsCompleted || 0
          },
          abilities: ['Brain Network Visualization', 'Cognitive Architecture Access', 'Advanced AI Insights'],
          unlocks: ['Neural Landscape Creator', 'Custom VR Worlds'],
          image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2Fa15f3559262c4c23a96a8b8edac690bd?format=webp&width=800',
          chain: 'ethereum'
        },
        {
          id: 'time-master-005',
          name: 'Time Master Hourglass',
          description: 'Achieve 30-day consistent practice streak',
          rarity: 'legendary',
          requirements: {
            streak: 30,
            currentProgress: user.streak || 0
          },
          abilities: ['Time Dilation Training', 'Chronotype Optimization', 'Circadian Sync'],
          unlocks: ['Time-based Challenges', 'Chronobiology Insights'],
          image: 'https://cdn.builder.io/api/v1/image/assets%2Fdc3782de61224ee6afee73d63ac0f50c%2F7e4c6421330e4951ac66f311c1531449?format=webp&width=800',
          chain: 'polygon'
        }
      ]

      setAvailableNFTs(availableForUnlock)

      // Composable unlocks (combining NFTs)
      const composableOptions = [
        {
          id: 'ultimate-focus',
          name: 'Ultimate Focus Mastery',
          description: 'Combine Memory Enhancer + Focus Guardian for supreme cognitive power',
          requiredNFTs: ['memory-enhancer-001', 'focus-guardian-002'],
          unlocks: ['Superhuman Mode', 'Advanced Neural Interfaces', 'Cognitive Amplification'],
          rarity: 'mythic'
        },
        {
          id: 'zen-architect',
          name: 'Zen Architect Fusion',
          description: 'Merge Stress Healer + Neural Architect for enlightened creation',
          requiredNFTs: ['stress-healer-003', 'neural-architect-004'],
          unlocks: ['Meditation VR Worlds', 'Calm Neural Landscapes', 'Therapeutic Environments'],
          rarity: 'mythic'
        }
      ]

      setComposableUnlocks(composableOptions)
    }

    initializeNFTs()
  }, [cognitiveData, user, achievements])

  // Simulate wallet connection
  const connectWallet = (chain) => {
    setConnectedWallet(chain)
    // Simulate connecting to different chains
    console.log(`Connected to ${chain} wallet`)
  }

  const getRarityStyle = (rarity) => rarityLevels[rarity] || rarityLevels.common

  const canUnlockNFT = (nft) => {
    if (nft.requirements.sessions) {
      return nft.requirements.currentProgress >= nft.requirements.sessions
    }
    if (nft.requirements.streak) {
      return nft.requirements.currentProgress >= nft.requirements.streak
    }
    return false
  }

  const canComposeNFTs = (composable) => {
    return composable.requiredNFTs.every(nftId => 
      userNFTs.some(nft => nft.id === nftId)
    )
  }

  const getEvolutionStageIcon = (stage) => {
    switch (stage) {
      case 'basic': case 'nascent': case 'awakening': return Star
      case 'advanced': case 'evolved': case 'harmonized': return Zap
      case 'master': case 'transcendent': case 'zen-master': return Crown
      default: return Sparkles
    }
  }

  return (
    <div className="blockchain-nft-container">
      {/* Header */}
      <div className="nft-header">
        <div className="header-info">
          <h3>Cognitive NFT Collection</h3>
          <p>Dynamic NFTs that evolve with your cognitive performance</p>
        </div>
        <div className="wallet-section">
          <div className="chain-selector">
            {['ethereum', 'polygon', 'solana'].map(chain => (
              <button
                key={chain}
                className={`chain-btn ${connectedWallet === chain ? 'connected' : ''}`}
                onClick={() => connectWallet(chain)}
              >
                <LinkIcon size={16} />
                {chain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User NFTs */}
      <div className="nft-section">
        <h4>Your Evolving NFTs</h4>
        <div className="nft-grid">
          {userNFTs.map((nft, index) => {
            const rarity = getRarityStyle(nft.rarity)
            const EvolutionIcon = getEvolutionStageIcon(nft.evolution.stage)
            
            return (
              <div 
                key={nft.id} 
                className={`nft-card owned scale-in animate-delay-${index + 1}`}
                style={{ 
                  borderColor: rarity.color,
                  boxShadow: `0 0 20px ${rarity.glow}`
                }}
              >
                <div className="nft-image-container">
                  <img src={nft.image} alt={nft.name} className="nft-image theme-image" />
                  <div className="nft-overlay">
                    <div className="rarity-badge" style={{ background: rarity.color }}>
                      {rarity.name}
                    </div>
                    <div className="chain-badge">
                      <LinkIcon size={12} />
                      {nft.chain}
                    </div>
                  </div>
                  <div className="evolution-indicator">
                    <EvolutionIcon size={16} className="neural-pulse" />
                    <span>Lv.{nft.level}</span>
                  </div>
                </div>

                <div className="nft-info">
                  <h5 className="nft-name">{nft.name}</h5>
                  <p className="nft-description">{nft.description}</p>
                  
                  <div className="evolution-progress">
                    <div className="evolution-header">
                      <span className="current-stage">{nft.evolution.stage}</span>
                      {nft.evolution.nextEvolution && (
                        <>
                          <ChevronRight size={12} />
                          <span className="next-stage">{nft.evolution.nextEvolution}</span>
                        </>
                      )}
                    </div>
                    {nft.evolution.nextEvolution && (
                      <div className="evolution-bar">
                        <div 
                          className="evolution-fill neural-pulse"
                          style={{ width: `${nft.evolution.progressToNext}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <div className="nft-abilities">
                    <h6>Abilities:</h6>
                    <div className="abilities-list">
                      {nft.abilities.map((ability, i) => (
                        <span key={i} className="ability-tag">{ability}</span>
                      ))}
                    </div>
                  </div>

                  <div className="nft-unlocks">
                    <h6>Unlocks:</h6>
                    <div className="unlocks-list">
                      {nft.unlocks.map((unlock, i) => (
                        <div key={i} className="unlock-item">
                          <Unlock size={12} />
                          <span>{unlock}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Available NFTs */}
      <div className="nft-section">
        <h4>Unlock New NFTs</h4>
        <div className="nft-grid">
          {availableNFTs.map((nft, index) => {
            const rarity = getRarityStyle(nft.rarity)
            const canUnlock = canUnlockNFT(nft)
            
            return (
              <div 
                key={nft.id} 
                className={`nft-card available ${canUnlock ? 'unlockable' : 'locked'} scale-in animate-delay-${index + 1}`}
                style={{ 
                  borderColor: canUnlock ? rarity.color : '#666',
                  boxShadow: canUnlock ? `0 0 20px ${rarity.glow}` : 'none'
                }}
              >
                <div className="nft-image-container">
                  <img 
                    src={nft.image} 
                    alt={nft.name} 
                    className={`nft-image ${!canUnlock ? 'locked-image' : ''}`}
                  />
                  <div className="nft-overlay">
                    <div className="rarity-badge" style={{ background: rarity.color }}>
                      {rarity.name}
                    </div>
                    {canUnlock ? (
                      <Unlock size={24} className="unlock-icon neural-pulse" />
                    ) : (
                      <Lock size={24} className="lock-icon" />
                    )}
                  </div>
                </div>

                <div className="nft-info">
                  <h5 className="nft-name">{nft.name}</h5>
                  <p className="nft-description">{nft.description}</p>
                  
                  <div className="requirements">
                    <h6>Requirements:</h6>
                    {nft.requirements.sessions && (
                      <div className="requirement-item">
                        <div className="req-progress">
                          <span>{nft.requirements.currentProgress} / {nft.requirements.sessions} sessions</span>
                          <div className="req-bar">
                            <div 
                              className="req-fill"
                              style={{ 
                                width: `${Math.min((nft.requirements.currentProgress / nft.requirements.sessions) * 100, 100)}%`,
                                background: canUnlock ? 'var(--neural-success)' : 'var(--neural-warning)'
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {nft.requirements.streak && (
                      <div className="requirement-item">
                        <div className="req-progress">
                          <span>{nft.requirements.currentProgress} / {nft.requirements.streak} day streak</span>
                          <div className="req-bar">
                            <div 
                              className="req-fill"
                              style={{ 
                                width: `${Math.min((nft.requirements.currentProgress / nft.requirements.streak) * 100, 100)}%`,
                                background: canUnlock ? 'var(--neural-success)' : 'var(--neural-warning)'
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {canUnlock && (
                    <button className="unlock-btn breathe-glow">
                      <Gift size={16} />
                      Claim NFT
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Composable NFTs */}
      <div className="nft-section">
        <h4>Composable NFT Fusions</h4>
        <div className="composable-grid">
          {composableUnlocks.map((composable, index) => {
            const canCompose = canComposeNFTs(composable)
            const rarity = getRarityStyle(composable.rarity)
            
            return (
              <div 
                key={composable.id} 
                className={`composable-card ${canCompose ? 'available' : 'locked'} scale-in animate-delay-${index + 1}`}
                style={{ 
                  borderColor: canCompose ? rarity.color : '#666',
                  boxShadow: canCompose ? `0 0 20px ${rarity.glow}` : 'none'
                }}
              >
                <div className="composable-header">
                  <Hexagon size={32} className={canCompose ? 'neural-pulse' : ''} />
                  <h5 className="composable-name">{composable.name}</h5>
                  <div className="rarity-badge" style={{ background: rarity.color }}>
                    {rarity.name}
                  </div>
                </div>

                <p className="composable-description">{composable.description}</p>

                <div className="required-nfts">
                  <h6>Required NFTs:</h6>
                  <div className="required-list">
                    {composable.requiredNFTs.map(nftId => {
                      const hasNFT = userNFTs.some(nft => nft.id === nftId)
                      const nftName = userNFTs.find(nft => nft.id === nftId)?.name || nftId
                      
                      return (
                        <div key={nftId} className={`required-nft ${hasNFT ? 'owned' : 'missing'}`}>
                          {hasNFT ? <Award size={12} /> : <Lock size={12} />}
                          <span>{nftName}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="composable-unlocks">
                  <h6>Fusion Unlocks:</h6>
                  <div className="unlocks-list">
                    {composable.unlocks.map((unlock, i) => (
                      <div key={i} className="unlock-item">
                        <Sparkles size={12} />
                        <span>{unlock}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {canCompose && (
                  <button className="compose-btn breathe-glow">
                    <Zap size={16} />
                    Fuse NFTs
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .blockchain-nft-container {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--border-primary);
        }

        .nft-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          gap: 20px;
        }

        .header-info h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .header-info p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .chain-selector {
          display: flex;
          gap: 8px;
        }

        .chain-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: var(--bg-glass);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: capitalize;
        }

        .chain-btn.connected {
          background: var(--neural-primary);
          color: white;
          border-color: var(--neural-primary);
        }

        .nft-section {
          margin-bottom: 40px;
        }

        .nft-section h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .nft-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .nft-card {
          background: var(--bg-glass);
          border: 2px solid var(--border-primary);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .nft-card:hover {
          transform: translateY(-5px);
        }

        .nft-card.locked {
          opacity: 0.6;
        }

        .nft-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .nft-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .nft-card:hover .nft-image {
          transform: scale(1.05);
        }

        .locked-image {
          filter: grayscale(100%) brightness(0.5);
        }

        .nft-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .rarity-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        .chain-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 6px;
          font-size: 0.75rem;
          color: white;
          text-transform: uppercase;
        }

        .evolution-indicator {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 8px;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .unlock-icon, .lock-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          background: rgba(0, 0, 0, 0.7);
          padding: 8px;
          border-radius: 50%;
        }

        .nft-info {
          padding: 20px;
        }

        .nft-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .nft-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.4;
          margin-bottom: 16px;
        }

        .evolution-progress {
          margin-bottom: 16px;
          padding: 12px;
          background: var(--bg-tertiary);
          border-radius: 8px;
        }

        .evolution-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 0.875rem;
        }

        .current-stage {
          color: var(--neural-primary);
          font-weight: 600;
          text-transform: capitalize;
        }

        .next-stage {
          color: var(--text-secondary);
          text-transform: capitalize;
        }

        .evolution-bar {
          height: 4px;
          background: var(--bg-primary);
          border-radius: 2px;
          overflow: hidden;
        }

        .evolution-fill {
          height: 100%;
          background: var(--neural-primary);
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        .nft-abilities, .nft-unlocks, .requirements {
          margin-bottom: 16px;
        }

        .nft-abilities h6, .nft-unlocks h6, .requirements h6 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .abilities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .ability-tag {
          padding: 4px 8px;
          background: var(--neural-primary);
          color: white;
          font-size: 0.75rem;
          border-radius: 6px;
        }

        .unlocks-list {
          display: grid;
          gap: 4px;
        }

        .unlock-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.75rem;
        }

        .requirement-item {
          margin-bottom: 8px;
        }

        .req-progress span {
          font-size: 0.875rem;
          color: var(--text-primary);
          margin-bottom: 4px;
          display: block;
        }

        .req-bar {
          height: 6px;
          background: var(--bg-tertiary);
          border-radius: 3px;
          overflow: hidden;
        }

        .req-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .unlock-btn, .compose-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: var(--gradient-neural);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .unlock-btn:hover, .compose-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
        }

        .composable-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
        }

        .composable-card {
          background: var(--bg-glass);
          border: 2px solid var(--border-primary);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .composable-card:hover {
          transform: translateY(-5px);
        }

        .composable-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .composable-name {
          flex: 1;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .composable-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.4;
          margin-bottom: 16px;
        }

        .required-nfts, .composable-unlocks {
          margin-bottom: 16px;
        }

        .required-nfts h6, .composable-unlocks h6 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .required-list {
          display: grid;
          gap: 6px;
        }

        .required-nft {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
        }

        .required-nft.owned {
          color: var(--neural-success);
        }

        .required-nft.missing {
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  )
}

export default BlockchainNFT
