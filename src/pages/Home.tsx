import './Home.css'

const Home = () => {
  return (
    <div>
        <div className="home-page-container">
            <h1>dog lips</h1>
            <iframe 
                style={{ borderRadius: '15px', border: 'none', overflow: 'hidden' }} 
                src="https://open.spotify.com/embed/artist/1L23rbDqrblJpid1WJkBVE?utm_source=generator&theme=0" 
                width="100%" 
                height="352" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
            </iframe>
        </div>
    </div>
  )
}

export default Home