'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    eegReminders: true,
    dailyCheckIn: true,
    theme: 'light',
    language: 'english',
    timezone: 'UTC-5',
    dataSharing: false,
    autoSync: true
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelect = (setting: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="settings" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Settings</h1>
          <p className="dashboard-subtitle">Customize your NeuroMind Pro experience</p>
          <div className="section-divider"></div>
        </div>

        <div className="settings-grid">
          <div className="settings-section">
            <h2 className="settings-title">Notifications</h2>
            <div className="settings-items">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Push Notifications</h3>
                  <p>Receive general app notifications</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={() => handleToggle('notifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>EEG Session Reminders</h3>
                  <p>Get reminded for scheduled EEG sessions</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.eegReminders}
                    onChange={() => handleToggle('eegReminders')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Daily Check-in Reminders</h3>
                  <p>Daily prompts for mood and wellness tracking</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.dailyCheckIn}
                    onChange={() => handleToggle('dailyCheckIn')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="settings-title">Appearance</h2>
            <div className="settings-items">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Theme</h3>
                  <p>Choose your preferred color scheme</p>
                </div>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSelect('theme', e.target.value)}
                  className="setting-select"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Language</h3>
                  <p>Select your preferred language</p>
                </div>
                <select
                  value={settings.language}
                  onChange={(e) => handleSelect('language', e.target.value)}
                  className="setting-select"
                >
                  <option value="english">English</option>
                  <option value="spanish">Español</option>
                  <option value="french">Français</option>
                  <option value="german">Deutsch</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="settings-title">Privacy & Data</h2>
            <div className="settings-items">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Data Sharing</h3>
                  <p>Share anonymous data for research purposes</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.dataSharing}
                    onChange={() => handleToggle('dataSharing')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Auto Sync</h3>
                  <p>Automatically sync data across devices</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.autoSync}
                    onChange={() => handleToggle('autoSync')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="settings-title">Account</h2>
            <div className="settings-items">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Export Data</h3>
                  <p>Download your complete data archive</p>
                </div>
                <button className="setting-button">Export</button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Delete Account</h3>
                  <p>Permanently delete your account and data</p>
                </div>
                <button className="setting-button danger">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <div className="device-connections">
          <h2 className="section-title">Device Connections</h2>
          <div className="section-divider"></div>
          
          <div className="devices-grid">
            <div className="device-card">
              <div className="device-icon">🧠</div>
              <h3>EEG Headset</h3>
              <p>Muse S (Gen 2)</p>
              <div className="device-status connected">Connected</div>
              <button className="device-button">Disconnect</button>
            </div>

            <div className="device-card">
              <div className="device-icon">⌚</div>
              <h3>Smart Watch</h3>
              <p>Not connected</p>
              <div className="device-status disconnected">Disconnected</div>
              <button className="device-button">Connect</button>
            </div>

            <div className="device-card">
              <div className="device-icon">💤</div>
              <h3>Sleep Tracker</h3>
              <p>Not connected</p>
              <div className="device-status disconnected">Disconnected</div>
              <button className="device-button">Connect</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
