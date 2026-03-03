import { Link } from "react-router";
import "./Shows.css"
import { fetchShows } from '../api/shows';
import type { Show } from '../types/show';
import { useState, useEffect } from "react";
import SnogSpinner from "../components/SnogSpinner";

const today = new Date();
today.setHours(0, 0, 0, 0);

const Shows = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadShows = async () => {
      setLoading(true);
      try {
        const data = await fetchShows();
        setShows(data);
      } catch (err) {
        console.error("Error loading shows: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadShows();
  }, []);

  // separate shows into upcoming and past based on today's date
  const upcomingShows = shows.filter((show) => {
    const showDate = new Date(show.date);
    showDate.setHours(0, 0, 0, 0);
    return showDate >= today;
  });

  const pastShows = shows.filter((show) => {
    const showDate = new Date(show.date);
    showDate.setHours(0, 0, 0, 0);
    return showDate < today;
  }).reverse(); // most recent past shows first

  const ShowTable = ({ shows }: { shows: Show[] }) => (
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

  return (
    <div className="page-content-container">
      <div className="shows-section-container">
        <h1>SHOWS</h1>
        {loading ? (
          <SnogSpinner />
        ) : shows.length === 0 ? (
          <h2 className="error-msg">404 no shows found :3</h2>
        ) : (
          <>
            {upcomingShows.length > 0 && (
              <div className="shows-section">
                <h2>UPCOMING</h2>
                <ShowTable shows={upcomingShows} />
              </div>
            )}

            {pastShows.length > 0 && (
              <div className="shows-section">
                <h2>PAST</h2>
                <ShowTable shows={pastShows} />
              </div>
            )}
          </>
        )} 
      </div>
    </div>
  );
};

export default Shows;