import './Home.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import ReactPlayer from 'react-player'
import {
  getMostRecentAppleRelease,
  getMostRecentSpotifyRelease,
} from '../api/music'
import type { MostRecentSpotifyRelease, MostRecentAppleRelease } from '../api/music'
import { FaSpotify, FaApple, FaBandcamp } from "react-icons/fa";


const Home = () => {

  const [spotifyRelease, setSpotifyRelease] = useState<MostRecentSpotifyRelease | null>(null)
  const [appleRelease, setAppleRelease] = useState<MostRecentAppleRelease | null>(null)

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const spotify = await getMostRecentSpotifyRelease()
        const apple = await getMostRecentAppleRelease()

        setSpotifyRelease(spotify)
        setAppleRelease(apple)
      } catch (err) {
        console.error("Error fetching music releases: ", err)
      }
    }

    fetchReleases()
  }, [])



  return (
    <div className="page-content-container">
      <div className="home-section-container">
        <h1>NEW MUSIC NOW</h1>

        {spotifyRelease && (
          <div className="music-card-container">
            <img className="music-card-img" src={spotifyRelease.images[1]?.url || spotifyRelease.images[0]?.url} alt={spotifyRelease.name} />

            <div className="music-card-text">
              <p className="music-card-date">{new Date(spotifyRelease.releaseDate).toLocaleDateString()}</p>
              <h1 className="music-card-name">{spotifyRelease.name}</h1>
              <p className="release-info">
                All proceeds from our tapes go straight to{" "}
                <Link 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="release-info-link" 
                  to="https://nhbailfund.wordpress.com/"
                >
                  The New Hampshire Bail Fund
                </Link> 
                {" "}helping free people unjustly locked up in ICE detention centers in Dover, NH and Plymouth, MA.
              </p>
              <div className="recent-release-links">
              <a className="music-card-icon" href="https://strangemono.bandcamp.com/album/danger-forward" target="_blank" rel="noopener noreferrer">
                <FaBandcamp size={20}/> Buy on Bandcamp
              </a>
              <a className="music-card-icon" href={spotifyRelease.url} target="_blank" rel="noopener noreferrer">
                <FaSpotify size={20} /> Spotify
              </a>
              {appleRelease && (
                <>
                  <a className="music-card-icon" href={appleRelease.url} target="_blank" rel="noopener noreferrer">
                    <FaApple size={20} /> Apple Music
                  </a>
                </>
              )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="home-section-container">
        <div className="bio-preview-container">
        <p className="artist-bio">
          Hailing from Portsmouth, New Hampshire, Dog Lips deliver a raw and relentless blend of punk, hard rock, and new wave on their sophomore album, Danger Forward. These nine tracks tear through themes of warped Americana, B-movie delirium, and the absurdity of modern life, punctuated by the unrelenting drums, confrontational vocals, and sleazy riffage. It’s an album that refuses to sit still. Dog Lips are brash, unapologetic, and wired for maximum impact.
        <br/> - Strange Mono</p>

        <iframe 
          data-testid="embed-iframe" 
          style={{"borderRadius": "15px"}}
          src="https://open.spotify.com/embed/artist/1L23rbDqrblJpid1WJkBVE?utm_source=generator&theme=0" 
          width="100%" 
          height="400" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy">
        </iframe>
      </div>
      </div>
      <div className="home-section-container">
        <h1>TOUR DATES</h1>
        <img src="/danger_forward_tour.jpeg" alt="tour image" className="tour-image" />
      </div>
      <div className="home-section-container">
        <h1>VOICEMAIL BOMB THREAT</h1>
        <div className="youtube-video-container">
          <ReactPlayer src='https://www.youtube.com/watch?v=BZRTEi5O2ck' controls width="100%" height="100%" />
        </div>
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