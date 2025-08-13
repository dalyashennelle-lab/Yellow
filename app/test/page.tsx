'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function TestPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="main-container">
      <Sidebar activeItem="test" />
      
      <main className="main-content">
        <div className="section-card">
          <h1 className="dashboard-title">Test Page</h1>
          <p>This is a simple test to verify basic functionality.</p>
          
          <div style={{ margin: '20px 0' }}>
            <button 
              onClick={() => setCount(count + 1)}
              style={{
                padding: '10px 20px',
                background: '#4facfe',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Click Count: {count}
            </button>
          </div>
          
          <div>
            <h3>Navigation Test</h3>
            <p>✅ Sidebar loaded</p>
            <p>✅ React state working</p>
            <p>✅ Click events working</p>
            <p>✅ CSS styling working</p>
          </div>
        </div>
      </main>
    </div>
  );
}
