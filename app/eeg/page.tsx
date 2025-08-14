'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BrainwaveChart from '../components/BrainwaveChart';

export default function EEGPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState('disconnected');

  const handleConnect = () => {
    setDeviceStatus('connecting');
    setTimeout(() => {
      setIsConnected(true);
      setDeviceStatus('connected');
    }, 2000);
  };

  return (
    <div className="app-container">
      <Sidebar activeItem="eeg" />
      <main className="main-content">
        <div className="content-header">
          <div className="header-content">
            <h1 className="main-title">🧠 EEG Monitoring</h1>
            <p className="main-subtitle">
              Real-time brainwave analysis and neurofeedback training
            </p>
          </div>
          <div className="section-divider"></div>
        </div>

        {isConnected ? (
          <div className="eeg-dashboard">
            <BrainwaveChart />

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
            <button 
              className="connect-btn"
              onClick={handleConnect}
              disabled={deviceStatus === 'connecting'}
            >
              {deviceStatus === 'connecting' ? 'Connecting...' : 'Connect Device'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}