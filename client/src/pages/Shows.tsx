import { Link } from "react-router";
import "./Shows.css"
import shows from './admin/data/ShowData.json';

const Shows = () => {
  return (
    <div className="page-content-container">
      <div className="shows-section-container">
      <h1>SHOWS</h1>
      <div className="shows-table">
        {shows.map((show) => (
          <Link to={`/shows/${show.id}`} className="show-row-link">
            <div className="show-date-cell">{show.date}</div>
            <div className="show-venue-cell">{show.venue}</div>
            <div className="show-location-cell">{show.city}, {show.state}</div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Shows