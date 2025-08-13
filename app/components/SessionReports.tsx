'use client';

import { useState, useEffect } from 'react';

interface SessionData {
  id: string;
  timestamp: number;
  duration: number;
  gameType: string;
  score: number;
  accuracy: number;
  reactionTime: number;
  difficulty: number;
  cognitiveMetrics: {
    attention: number;
    memory: number;
    processing: number;
    cognitiveLoad: number;
  };
  brainwaveData?: {
    alpha: number;
    beta: number;
    gamma: number;
    theta: number;
    delta: number;
  }[];
}

interface SessionReportsProps {
  sessions: SessionData[];
  onExport?: (type: 'csv' | 'pdf', data: any) => void;
}

export default function SessionReports({ sessions, onExport }: SessionReportsProps) {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [filteredSessions, setFilteredSessions] = useState<SessionData[]>([]);
  const [reportType, setReportType] = useState<'summary' | 'detailed' | 'analytics'>('summary');

  // Filter sessions based on date range
  useEffect(() => {
    const startDate = new Date(dateRange.start).getTime();
    const endDate = new Date(dateRange.end).getTime() + 24 * 60 * 60 * 1000; // End of day

    const filtered = sessions.filter(session => 
      session.timestamp >= startDate && session.timestamp <= endDate
    );

    setFilteredSessions(filtered);
  }, [sessions, dateRange]);

  // Toggle session selection
  const toggleSessionSelection = (sessionId: string) => {
    setSelectedSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  // Select all filtered sessions
  const selectAllSessions = () => {
    setSelectedSessions(filteredSessions.map(s => s.id));
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedSessions([]);
  };

  // Get selected session data
  const getSelectedSessionData = () => {
    return filteredSessions.filter(session => selectedSessions.includes(session.id));
  };

  // Generate CSV report
  const generateCSVReport = () => {
    const selectedData = getSelectedSessionData();
    
    if (selectedData.length === 0) {
      alert('Please select at least one session to export.');
      return;
    }

    let csvContent = '';

    if (reportType === 'summary') {
      // Summary report
      csvContent = [
        'Session ID,Date,Time,Game Type,Duration (min),Score,Accuracy (%),Avg Reaction Time (ms),Difficulty,Attention,Memory,Processing,Cognitive Load',
        ...selectedData.map(session => [
          session.id,
          new Date(session.timestamp).toLocaleDateString(),
          new Date(session.timestamp).toLocaleTimeString(),
          session.gameType,
          (session.duration / 60000).toFixed(2),
          session.score,
          session.accuracy.toFixed(1),
          session.reactionTime.toFixed(0),
          session.difficulty.toFixed(1),
          session.cognitiveMetrics.attention.toFixed(1),
          session.cognitiveMetrics.memory.toFixed(1),
          session.cognitiveMetrics.processing.toFixed(1),
          session.cognitiveMetrics.cognitiveLoad.toFixed(1)
        ].join(','))
      ].join('\n');
    } else if (reportType === 'detailed') {
      // Detailed report with brainwave data
      const headers = [
        'Session ID', 'Date', 'Time', 'Game Type', 'Duration (min)', 'Score', 'Accuracy (%)',
        'Avg Reaction Time (ms)', 'Difficulty', 'Attention', 'Memory', 'Processing', 'Cognitive Load',
        'Alpha Avg', 'Beta Avg', 'Gamma Avg', 'Theta Avg', 'Delta Avg'
      ];
      
      csvContent = [
        headers.join(','),
        ...selectedData.map(session => {
          const brainwaveAvg = session.brainwaveData?.length ? {
            alpha: session.brainwaveData.reduce((sum, d) => sum + d.alpha, 0) / session.brainwaveData.length,
            beta: session.brainwaveData.reduce((sum, d) => sum + d.beta, 0) / session.brainwaveData.length,
            gamma: session.brainwaveData.reduce((sum, d) => sum + d.gamma, 0) / session.brainwaveData.length,
            theta: session.brainwaveData.reduce((sum, d) => sum + d.theta, 0) / session.brainwaveData.length,
            delta: session.brainwaveData.reduce((sum, d) => sum + d.delta, 0) / session.brainwaveData.length
          } : { alpha: 0, beta: 0, gamma: 0, theta: 0, delta: 0 };

          return [
            session.id,
            new Date(session.timestamp).toLocaleDateString(),
            new Date(session.timestamp).toLocaleTimeString(),
            session.gameType,
            (session.duration / 60000).toFixed(2),
            session.score,
            session.accuracy.toFixed(1),
            session.reactionTime.toFixed(0),
            session.difficulty.toFixed(1),
            session.cognitiveMetrics.attention.toFixed(1),
            session.cognitiveMetrics.memory.toFixed(1),
            session.cognitiveMetrics.processing.toFixed(1),
            session.cognitiveMetrics.cognitiveLoad.toFixed(1),
            brainwaveAvg.alpha.toFixed(2),
            brainwaveAvg.beta.toFixed(2),
            brainwaveAvg.gamma.toFixed(2),
            brainwaveAvg.theta.toFixed(2),
            brainwaveAvg.delta.toFixed(2)
          ].join(',');
        })
      ].join('\n');
    } else {
      // Analytics report
      const analytics = generateAnalytics(selectedData);
      csvContent = [
        'Metric,Value',
        `Total Sessions,${analytics.totalSessions}`,
        `Total Training Time (hours),${analytics.totalTrainingTime.toFixed(2)}`,
        `Average Score,${analytics.averageScore.toFixed(1)}`,
        `Average Accuracy,${analytics.averageAccuracy.toFixed(1)}%`,
        `Average Reaction Time,${analytics.averageReactionTime.toFixed(0)}ms`,
        `Most Played Game,${analytics.mostPlayedGame}`,
        `Improvement Trend,${analytics.improvementTrend}`,
        `Best Session Score,${analytics.bestScore}`,
        `Best Session Date,${analytics.bestSessionDate}`,
        '',
        'Game Type Breakdown:',
        ...Object.entries(analytics.gameTypeStats).map(([game, stats]) => 
          `${game} - Sessions: ${stats.count} - Avg Score: ${stats.avgScore.toFixed(1)} - Avg Accuracy: ${stats.avgAccuracy.toFixed(1)}%`
        )
      ].join('\n');
    }

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `neuromind_${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onExport?.('csv', { type: reportType, sessions: selectedData, csvContent });
  };

  // Generate PDF report
  const generatePDFReport = () => {
    const selectedData = getSelectedSessionData();
    
    if (selectedData.length === 0) {
      alert('Please select at least one session to export.');
      return;
    }

    // Create PDF content using a virtual canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 1000;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add title
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('NeuroMind Pro - Session Report', 50, 50);

    // Add date range
    ctx.font = '14px Arial';
    ctx.fillText(`Report Period: ${dateRange.start} to ${dateRange.end}`, 50, 80);
    ctx.fillText(`Generated: ${new Date().toLocaleString()}`, 50, 100);

    // Add analytics summary
    const analytics = generateAnalytics(selectedData);
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Summary Statistics', 50, 140);

    ctx.font = '14px Arial';
    let yPos = 170;
    const summaryData = [
      `Total Sessions: ${analytics.totalSessions}`,
      `Total Training Time: ${analytics.totalTrainingTime.toFixed(2)} hours`,
      `Average Score: ${analytics.averageScore.toFixed(1)}`,
      `Average Accuracy: ${analytics.averageAccuracy.toFixed(1)}%`,
      `Average Reaction Time: ${analytics.averageReactionTime.toFixed(0)}ms`,
      `Most Played Game: ${analytics.mostPlayedGame}`,
      `Improvement Trend: ${analytics.improvementTrend}`
    ];

    summaryData.forEach(text => {
      ctx.fillText(text, 50, yPos);
      yPos += 25;
    });

    // Add session table
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Session Details', 50, yPos + 20);
    yPos += 50;

    ctx.font = '12px Arial';
    // Table headers
    const headers = ['Date', 'Game', 'Score', 'Accuracy', 'Duration'];
    let xPos = 50;
    headers.forEach((header, index) => {
      ctx.fillText(header, xPos, yPos);
      xPos += index === 0 ? 100 : index === 1 ? 120 : 80;
    });

    yPos += 20;
    ctx.strokeStyle = '#cccccc';
    ctx.beginPath();
    ctx.moveTo(50, yPos);
    ctx.lineTo(750, yPos);
    ctx.stroke();
    yPos += 10;

    // Table data
    selectedData.slice(0, 25).forEach(session => { // Limit to 25 sessions for PDF
      xPos = 50;
      const rowData = [
        new Date(session.timestamp).toLocaleDateString(),
        session.gameType,
        session.score.toString(),
        `${session.accuracy.toFixed(1)}%`,
        `${(session.duration / 60000).toFixed(1)}m`
      ];

      rowData.forEach((data, index) => {
        ctx.fillText(data, xPos, yPos);
        xPos += index === 0 ? 100 : index === 1 ? 120 : 80;
      });
      yPos += 20;

      if (yPos > 950) return; // Page limit
    });

    // Convert canvas to PDF-like image and download
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `neuromind_${reportType}_report_${new Date().toISOString().split('T')[0]}.png`;
    link.click();

    onExport?.('pdf', { type: reportType, sessions: selectedData, dataURL });
  };

  // Generate analytics
  const generateAnalytics = (sessionData: SessionData[]) => {
    if (sessionData.length === 0) {
      return {
        totalSessions: 0,
        totalTrainingTime: 0,
        averageScore: 0,
        averageAccuracy: 0,
        averageReactionTime: 0,
        mostPlayedGame: 'None',
        improvementTrend: 'No data',
        bestScore: 0,
        bestSessionDate: 'N/A',
        gameTypeStats: {}
      };
    }

    const totalSessions = sessionData.length;
    const totalTrainingTime = sessionData.reduce((sum, s) => sum + s.duration, 0) / (1000 * 60 * 60); // Convert to hours
    const averageScore = sessionData.reduce((sum, s) => sum + s.score, 0) / totalSessions;
    const averageAccuracy = sessionData.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions;
    const averageReactionTime = sessionData.reduce((sum, s) => sum + s.reactionTime, 0) / totalSessions;

    // Game type statistics
    const gameTypes = [...new Set(sessionData.map(s => s.gameType))];
    const gameTypeStats: Record<string, { count: number; avgScore: number; avgAccuracy: number }> = {};
    
    gameTypes.forEach(gameType => {
      const gameSessions = sessionData.filter(s => s.gameType === gameType);
      gameTypeStats[gameType] = {
        count: gameSessions.length,
        avgScore: gameSessions.reduce((sum, s) => sum + s.score, 0) / gameSessions.length,
        avgAccuracy: gameSessions.reduce((sum, s) => sum + s.accuracy, 0) / gameSessions.length
      };
    });

    const mostPlayedGame = Object.entries(gameTypeStats).reduce((prev, [game, stats]) => 
      stats.count > (gameTypeStats[prev]?.count || 0) ? game : prev, gameTypes[0] || 'None'
    );

    // Improvement trend
    const sortedSessions = [...sessionData].sort((a, b) => a.timestamp - b.timestamp);
    const firstHalf = sortedSessions.slice(0, Math.floor(sortedSessions.length / 2));
    const secondHalf = sortedSessions.slice(Math.floor(sortedSessions.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, s) => sum + s.score, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, s) => sum + s.score, 0) / secondHalf.length;
    
    let improvementTrend = 'Stable';
    if (secondHalfAvg > firstHalfAvg * 1.1) improvementTrend = 'Improving';
    else if (secondHalfAvg < firstHalfAvg * 0.9) improvementTrend = 'Declining';

    // Best session
    const bestSession = sessionData.reduce((prev, current) => 
      current.score > prev.score ? current : prev
    );

    return {
      totalSessions,
      totalTrainingTime,
      averageScore,
      averageAccuracy,
      averageReactionTime,
      mostPlayedGame,
      improvementTrend,
      bestScore: bestSession.score,
      bestSessionDate: new Date(bestSession.timestamp).toLocaleDateString(),
      gameTypeStats
    };
  };

  return (
    <div className="session-reports">
      <div className="reports-header">
        <h2 className="reports-title">Session Reports & Analytics</h2>
        <p className="reports-subtitle">Export and analyze your cognitive training data</p>
      </div>

      <div className="reports-controls">
        <div className="date-range-controls">
          <label>
            From:
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="date-input"
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="date-input"
            />
          </label>
        </div>

        <div className="report-type-controls">
          <label>
            Report Type:
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value as any)}
              className="report-select"
            >
              <option value="summary">Summary</option>
              <option value="detailed">Detailed</option>
              <option value="analytics">Analytics</option>
            </select>
          </label>
        </div>

        <div className="selection-controls">
          <button className="control-btn" onClick={selectAllSessions}>
            Select All ({filteredSessions.length})
          </button>
          <button className="control-btn" onClick={clearSelection}>
            Clear Selection
          </button>
          <span className="selection-count">
            {selectedSessions.length} selected
          </span>
        </div>
      </div>

      <div className="export-controls">
        <button 
          className="export-btn csv-btn"
          onClick={generateCSVReport}
          disabled={selectedSessions.length === 0}
        >
          📊 Export CSV
        </button>
        <button 
          className="export-btn pdf-btn"
          onClick={generatePDFReport}
          disabled={selectedSessions.length === 0}
        >
          📄 Export PDF
        </button>
      </div>

      <div className="sessions-table-container">
        <table className="sessions-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedSessions.length === filteredSessions.length && filteredSessions.length > 0}
                  onChange={selectedSessions.length === filteredSessions.length ? clearSelection : selectAllSessions}
                />
              </th>
              <th>Date</th>
              <th>Time</th>
              <th>Game Type</th>
              <th>Duration</th>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Reaction Time</th>
              <th>Difficulty</th>
              <th>Attention</th>
              <th>Memory</th>
              <th>Processing</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map(session => (
              <tr 
                key={session.id}
                className={selectedSessions.includes(session.id) ? 'selected' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedSessions.includes(session.id)}
                    onChange={() => toggleSessionSelection(session.id)}
                  />
                </td>
                <td>{new Date(session.timestamp).toLocaleDateString()}</td>
                <td>{new Date(session.timestamp).toLocaleTimeString()}</td>
                <td className="game-type">{session.gameType}</td>
                <td>{(session.duration / 60000).toFixed(1)}m</td>
                <td className="score">{session.score}</td>
                <td className="accuracy">{session.accuracy.toFixed(1)}%</td>
                <td className="reaction-time">{session.reactionTime.toFixed(0)}ms</td>
                <td className="difficulty">{session.difficulty.toFixed(1)}</td>
                <td className="attention">{session.cognitiveMetrics.attention.toFixed(1)}</td>
                <td className="memory">{session.cognitiveMetrics.memory.toFixed(1)}</td>
                <td className="processing">{session.cognitiveMetrics.processing.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSessions.length === 0 && (
          <div className="no-sessions">
            <p>No sessions found for the selected date range.</p>
          </div>
        )}
      </div>

      {filteredSessions.length > 0 && (
        <div className="quick-analytics">
          <h3>Quick Analytics</h3>
          <div className="analytics-grid">
            {(() => {
              const analytics = generateAnalytics(filteredSessions);
              return (
                <>
                  <div className="analytics-card">
                    <div className="analytics-value">{analytics.totalSessions}</div>
                    <div className="analytics-label">Total Sessions</div>
                  </div>
                  <div className="analytics-card">
                    <div className="analytics-value">{analytics.totalTrainingTime.toFixed(1)}h</div>
                    <div className="analytics-label">Training Time</div>
                  </div>
                  <div className="analytics-card">
                    <div className="analytics-value">{analytics.averageScore.toFixed(0)}</div>
                    <div className="analytics-label">Avg Score</div>
                  </div>
                  <div className="analytics-card">
                    <div className="analytics-value">{analytics.averageAccuracy.toFixed(1)}%</div>
                    <div className="analytics-label">Avg Accuracy</div>
                  </div>
                  <div className="analytics-card">
                    <div className="analytics-value">{analytics.mostPlayedGame}</div>
                    <div className="analytics-label">Most Played</div>
                  </div>
                  <div className="analytics-card">
                    <div className="analytics-value">{analytics.improvementTrend}</div>
                    <div className="analytics-label">Trend</div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
