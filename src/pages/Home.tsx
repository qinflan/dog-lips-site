import './Home.css'
import { ToggleTheme } from '../components/theme/toggleTheme'

const Home = () => {
  return (
    <div>
      <div className="page-content-container">
        <div className="w-f">
          <iframe
            style={{ borderRadius: '15px', border: 'none', overflow: 'hidden' }}
            src="https://open.spotify.com/embed/artist/1L23rbDqrblJpid1WJkBVE?utm_source=generator&theme=0"
            width="100%"
            height="400"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
          </iframe>

          <ToggleTheme />
        </div>
      </div>
    </div>
  )
}

export default Home