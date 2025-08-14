
import Sidebar from '../components/Sidebar';
import VideoPlayer from '../components/VideoPlayer';

export default function MindfulnessPage() {
  const mindfulnessContent = [
    {
      videoId: 'j734gLbQFbU',
      title: '🧘‍♀️ Guided Meditation Session',
      description: 'Meditation designed to promote relaxation and mental clarity.',
      icon: '🧘‍♀️'
    },
    {
      videoId: 'LiUnFJ8P4gM', 
      title: '🌬️ Breathing Exercises for Focus',
      description: 'A series of breathing exercises aimed at enhancing focus and reducing stress.',
      icon: '🌬️'
    },
    {
      videoId: 'yPK7ISPEu3M',
      title: '🧘‍♂️ Full-Body Yoga Routine', 
      description: 'A comprehensive yoga session targeting flexibility and strength.',
      icon: '🧘‍♂️'
    }
  ];

  return (
    <div className="main-container">
      <Sidebar activeItem="mindfulness" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Mindfulness & Meditation</h1>
          <p className="dashboard-subtitle">Enhance your cognitive wellness through guided meditation, breathing exercises, and yoga</p>
          <div className="section-divider"></div>
        </div>

        <div className="mindfulness-grid">
          {mindfulnessContent.map((content, index) => (
            <VideoPlayer
              key={index}
              videoId={content.videoId}
              title={content.title}
              description={content.description}
              icon={content.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
