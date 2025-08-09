import "./Footer.css"
import { DynamicSnog } from "./theme/DynamicSnog"

const Footer = () => {
  return (
    <div className="footer-container">
        <div className="footer-content">
            <div className="footer-logo">
                <DynamicSnog className="snog-rotate"/>
            </div>
            <div className="footer-links">
                <a className="footer-link" href="https://www.instagram.com/doglipsband/" target="_blank" rel="noopener noreferrer">instagram</a>
                <a className="footer-link" href="https://www.youtube.com/@doglips6359" target="_blank" rel="noopener noreferrer">youtube</a>
                <a className="footer-link" href="https://open.spotify.com/artist/1L23rbDqrblJpid1WJkBVE" target="_blank" rel="noopener noreferrer">spotify</a>
                <a className="footer-link" href="https://music.apple.com/us/artist/dog-lips/1609694043" target="_blank" rel="noopener noreferrer">apple music</a>
                <a className="footer-link" href="https://doglipsband.bandcamp.com/" target="_blank" rel="noopener noreferrer">bandcamp</a>
            </div>
            <div className="footer-logo">
                <DynamicSnog className="snog-rotate"/>
            </div>
        </div>
            
    </div>
  )
}

export default Footer