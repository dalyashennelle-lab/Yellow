interface RecommendationCardProps {
  icon: string;
  title: string;
  content: string;
  highlight?: string;
}

export default function RecommendationCard({ icon, title, content, highlight }: RecommendationCardProps) {
  const formatContent = (text: string, highlightText?: string) => {
    if (!highlightText) return text;
    
    const parts = text.split(highlightText);
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className="highlight">{highlightText}</span>
        )}
      </span>
    ));
  };

  return (
    <div className="recommendation-item">
      <div className="recommendation-header">
        <span className="recommendation-icon">{icon}</span>
        <h3 className="recommendation-title">{title}</h3>
      </div>
      <div className="recommendation-content">
        {formatContent(content, highlight)}
      </div>
    </div>
  );
}
