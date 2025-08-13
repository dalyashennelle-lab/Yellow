interface ActivityItemProps {
  icon: string;
  title: string;
  details: string;
  time: string;
}

export default function ActivityItem({ icon, title, details, time }: ActivityItemProps) {
  return (
    <div className="activity-item">
      <div className="activity-header">
        <span className="activity-icon">{icon}</span>
        <h3 className="activity-title">{title}</h3>
      </div>
      <div className="activity-details">{details}</div>
      <div className="activity-time">{time}</div>
    </div>
  );
}
