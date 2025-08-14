'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import BrainwaveChart from '../components/BrainwaveChart';

export default function EEGPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [brainwaveData, setBrainwaveData] = useState({
    delta: 20,
    theta: 35,
    alpha: 45,
    beta: 65,
    gamma: 30
  });

  useEffect(() => {
    // Simulate real-time brainwave data
    const interval = setInterval(() => {
      setBrainwaveData({
        delta: Math.random() * 100,
        theta: Math.random() * 100,
        alpha: Math.random() * 100,
        beta: Math.random() * 100,
        gamma: Math.random() * 100
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <Sidebar activeItem="eeg" />
      <main className="main-content">
        <div className="content-header">
          <div className="header-content">
            <h1 className="main-title">🧠 EEG Monitoring</h1>
            <p className="main-subtitle">
              Real-time brainwave monitoring and biofeedback training
            </p>
          </div>
        </div>

        <div className="eeg-status">
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            <div className="status-indicator"></div>
            <span>{isConnected ? 'EEG Device Connected' : 'No Device Connected'}</span>
            <button 
              className="connect-btn"
              onClick={() => setIsConnected(!isConnected)}
            >
              {isConnected ? 'Disconnect' : 'Connect Device'}
            </button>
          </div>
        </div>

        {isConnected ? (
          <div className="eeg-dashboard">
            <BrainwaveChart data={brainwaveData} />

            <div className="brainwave-bands">
              {Object.entries(brainwaveData).map(([band, value]) => (
                <div key={band} className="band-meter">
                  <h4>{band.charAt(0).toUpperCase() + band.slice(1)} Waves</h4>
                  <div className="meter-bar">
                    <div 
                      className="meter-fill"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(value)}%</span>
                </div>
              ))}
            </div>

            <div className="eeg-insights">
              <div className="insight-card">
                <h3>🎯 Current State</h3>
                <p>Focused attention with moderate relaxation</p>
              </div>
              <div className="insight-card">
                <h3>💡 Recommendations</h3>
                <p>Consider alpha wave training for enhanced creativity</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="device-setup">
            <h3>🔗 Connect Your EEG Device</h3>
            <p>Supported devices: Muse, NeuroSky, OpenBCI</p>
            <div className="setup-steps">
              <div className="step">1. Turn on your EEG headset</div>
              <div className="step">2. Enable Bluetooth</div>
              <div className="step">3. Click Connect Device</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}