'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BrainwaveChart from '../components/BrainwaveChart';

export default function EEGPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleDeviceConnection = () => {
    setDeviceConnected(!deviceConnected);
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="eeg" />
      
      <main className="main-content">
        <div className="eeg-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="dashboard-title">EEG Neural Analysis</h1>
              <p className="hero-description">
                Real-time brainwave monitoring and cognitive state analysis with professional-grade equipment
              </p>
              <div className="section-divider"></div>
            </div>
            <div className="hero-image">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F07e9cfb94d0443d29c8064da41e57c5b%2F0bf7dd9df1d8477fa5d5ed112e4d08fc?format=webp&width=800"
                alt="NeuroMind Pro medical facility front desk with doctors and patients"
                className="hero-img"
              />
            </div>
          </div>
        </div>

        <div className="eeg-controls">
          <div className="device-status">
            <div className={`status-indicator ${deviceConnected ? 'connected' : 'disconnected'}`}>
              <div className="status-dot"></div>
              <span>EEG Device: {deviceConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            
            <button 
              className={`control-button ${deviceConnected ? 'disconnect' : 'connect'}`}
              onClick={handleDeviceConnection}
            >
              {deviceConnected ? 'Disconnect' : 'Connect Device'}
            </button>
          </div>

          <div className="recording-controls">
            <button 
              className={`control-button ${isRecording ? 'stop' : 'start'}`}
              onClick={handleStartRecording}
              disabled={!deviceConnected}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        </div>

        <BrainwaveChart isRecording={isRecording} />

        <div className="section-card">
          <h2 className="section-title">Neuroscience Insights</h2>
          <div className="section-divider"></div>
          
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon">🧠</div>
              <h3 className="insight-title">Cognitive Load Analysis</h3>
              <p className="insight-description">
                Monitor gamma and beta waves to assess mental workload and optimize task difficulty in real-time.
              </p>
              <div className="insight-metrics">
                <span className="metric">Current Load: <strong>Moderate</strong></span>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">⚡</div>
              <h3 className="insight-title">Attention State</h3>
              <p className="insight-description">
                Alpha wave suppression indicates focused attention, while theta increases suggest mind-wandering.
              </p>
              <div className="insight-metrics">
                <span className="metric">Focus Level: <strong>High</strong></span>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">🌊</div>
              <h3 className="insight-title">Stress & Relaxation</h3>
              <p className="insight-description">
                Beta/alpha ratio indicates stress levels. High theta suggests deep relaxation or meditative states.
              </p>
              <div className="insight-metrics">
                <span className="metric">Stress Level: <strong>Low</strong></span>
              </div>
            </div>

            <div className="insight-card">
              <div className="insight-icon">💭</div>
              <h3 className="insight-title">Memory Formation</h3>
              <p className="insight-description">
                Gamma-theta coupling during learning enhances memory consolidation and information encoding.
              </p>
              <div className="insight-metrics">
                <span className="metric">Memory State: <strong>Optimal</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Compatible EEG Devices</h2>
          <div className="section-divider"></div>
          
          <div className="device-grid">
            <div className="device-item">
              <h4>OpenBCI Cyton</h4>
              <p>8-channel research-grade EEG</p>
              <span className="device-status-badge supported">Supported</span>
            </div>
            <div className="device-item">
              <h4>Muse Headband</h4>
              <p>Consumer meditation EEG</p>
              <span className="device-status-badge supported">Supported</span>
            </div>
            <div className="device-item">
              <h4>Emotiv EPOC X</h4>
              <p>14-channel wireless EEG</p>
              <span className="device-status-badge supported">Supported</span>
            </div>
            <div className="device-item">
              <h4>NeuroSky MindWave</h4>
              <p>Single-channel EEG headset</p>
              <span className="device-status-badge beta">Beta</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
