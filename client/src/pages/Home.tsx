import './Home.css'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import {
  getMostRecentAppleRelease,
  getMostRecentSpotifyRelease,
} from '../api/music'
import type { MostRecentSpotifyRelease, MostRecentAppleRelease } from '../api/music'
import { FaSpotify, FaApple } from "react-icons/fa";



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
              <h1 className="music-card-name" style={{ margin: 0, fontWeight: "bold" }}>{spotifyRelease.name}</h1>
              <p className="music-card-date" style={{ margin: 0 }}>{new Date(spotifyRelease.releaseDate).toLocaleDateString()}</p>

              <div className="recent-release-links">
                
              <a className="music-card-icon" href={spotifyRelease.url} target="_blank" rel="noopener noreferrer">
                <FaSpotify size={25} /> spotify
              </a>

              {appleRelease && (
                <>
                  <a className="music-card-icon" href={appleRelease.url} target="_blank" rel="noopener noreferrer">
                    <FaApple size={25} /> apple music
                  </a>
                </>
              )}
              </div>
            </div>
          </div>
        )}
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