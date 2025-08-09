import './Home.css'
import ReactPlayer from 'react-player'

const Home = () => {
  return (
    <div className="page-content-container">
      <div className="home-section-container">
        <h1>NEW MUSIC NOW</h1>
        <div className="spotify-widget-container" style={{ width: "100%", background: "var(--page-background)", overflow: "hidden", borderRadius: "15px" }}>
          <iframe
            style={{ border: 'none', overflow: 'hidden', width: '100%' }}
            src="https://open.spotify.com/embed/artist/1L23rbDqrblJpid1WJkBVE?utm_source=generator&theme=0"
            width="100%"
            height="400"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
          </iframe>
        </div>
      </div>
      <div className="home-section-container">
        <h1>MUSIC VIDEO</h1>
        <div className="youtube-video-container">
          <ReactPlayer src='https://www.youtube.com/watch?v=Jv_28yMeXCQ&t=5s' controls light width="100%" height="100%" />
        </div>
      </div>
      <div className="home-section-container">
        <h1>TOUR</h1>
        <img src="/tour-example.jpg" alt="tour image" className="tour-image" />
      </div>
      <div className="visit-counter">
        <a href="https://www.hitwebcounter.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://hitwebcounter.com/counter/counter.php?page=21328088&style=0011&nbdigits=5&type=page&initCount=0"
            title="Counter Widget"
            alt="Visit counter for websites"
            style={{ border: 0 }}
          />
        </a>
      </div>
    </div>
  )
}

export default Home