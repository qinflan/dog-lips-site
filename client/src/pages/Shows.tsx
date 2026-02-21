import { Link } from "react-router";
import "./Shows.css"
import shows from './admin/data/ShowData.json';

const today = new Date();
today.setHours(0, 0, 0, 0);

const upcomingShows = shows.filter(show => new Date(show.date) >= today);
const pastShows = shows.filter(show => new Date(show.date) < today);

const ShowTable = ({ shows }: { shows: typeof upcomingShows }) => (
  <div className="shows-table">
    {shows.map((show) => (
      <Link to={`/shows/${show.id}`} className="show-row-link" key={show.id}>
        <div className="show-date-cell">{show.date}</div>
        <div className="show-venue-cell">{show.venue}</div>
        <div className="show-location-cell">{show.city}, {show.state}</div>
      </Link>
    ))}
  </div>
);

const Shows = () => {
  return (
    <div className="page-content-container">
      <div className="shows-section-container">
        <h1>SHOWS</h1>

        {upcomingShows.length > 0 && (
          <div className="shows-section">
            <h2>UPCOMING</h2>
            <ShowTable shows={upcomingShows} />
          </div>
        )}

        <div className="shows-section">
          <h2>PAST</h2>
          <ShowTable shows={pastShows} />
        </div>
      </div>
    </div>
  );
};

export default Shows;