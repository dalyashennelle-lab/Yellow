'use client';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  icon: string;
}

export default function VideoPlayer({ videoId, title, description, icon }: VideoPlayerProps) {
  return (
    <div className="video-card">
      <div className="video-header">
        <span className="video-icon">{icon}</span>
        <div className="video-info">
          <h3 className="video-title">{title}</h3>
          <p className="video-description">{description}</p>
        </div>
      </div>
      
      <div className="video-container">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}?si=4CrafZZgC88lS9yY`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-iframe"
        />
      </div>
    </div>
  );
}
