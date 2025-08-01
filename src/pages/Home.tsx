import './Home.css'
import { ToggleTheme } from '../components/theme/toggleTheme'

const Home = () => {
  return (
    <div>
      <div className="page-content-container">
        <div className="spotify-widget-container" style={{width: "100%", background: "var(--page-background)", overflow: "hidden", borderRadius: "15px"}}>
          <iframe
            style={{ border: 'none', overflow: 'hidden', width: '100%'}}
            src="https://open.spotify.com/embed/artist/1L23rbDqrblJpid1WJkBVE?utm_source=generator&theme=0"
            width="100%"
            height="400"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
          </iframe>
        </div>
        <ToggleTheme />
      </div>
    </div>
  )
}

export default Home