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
        <div className="dashboard-header">
          <h1 className="dashboard-title">EEG Neural Analysis</h1>
          <p className="dashboard-subtitle">Real-time brainwave monitoring and cognitive state analysis</p>
          <div className="section-divider"></div>
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
