export default function CognitiveChart() {
  // Simplified chart representation using CSS
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const memoryScores = [8, 6, 9, 8, 7, 8, 9];
  const focusScores = [7, 7, 8, 9, 8, 7, 7];

  return (
    <div className="chart-container">
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '3px', background: '#4facfe', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Memory Score</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '3px', background: '#ff006e', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Focus Score</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', height: '200px', alignItems: 'end', justifyContent: 'space-between', gap: '1rem' }}>
          {days.map((day, index) => (
            <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' }}>
              <div style={{ position: 'relative', height: '160px', width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                <div style={{ 
                  position: 'absolute',
                  bottom: 0,
                  width: '8px',
                  height: `${memoryScores[index] * 18}px`,
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  borderRadius: '4px',
                  marginRight: '6px'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  bottom: 0,
                  width: '8px',
                  height: `${focusScores[index] * 18}px`,
                  background: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
                  borderRadius: '4px',
                  marginLeft: '6px'
                }}></div>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
