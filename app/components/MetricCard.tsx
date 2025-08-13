interface MetricCardProps {
  icon: string;
  value: string;
  label: string;
  color?: string;
}

export default function MetricCard({ icon, value, label, color = '#4facfe' }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-icon" style={{ color }}>{icon}</div>
      <div className="metric-value" style={{ color }}>{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}
