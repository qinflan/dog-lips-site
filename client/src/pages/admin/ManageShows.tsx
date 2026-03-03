import "./ManageShows.css"
import { fetchShows } from '../../api/shows';
import AddShow from "@/components/AddShow";
import Tabs from "@/components/Tabs";
import type { Show } from '../../types/show';
import { useState, useEffect } from "react";
import SnogSpinner from "@/components/SnogSpinner";
import { useNavigate } from "react-router";

const ManageShows = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const tabs = [
    {
      label: "edit shows",
      content: 
            <div className="shows-table">
              {shows.length > 0 && shows.map((show) => (
              <div className="edit-show-row" key={show.id} onClick={() => {
                navigate(`/admin/shows/${show.id}`);
              }}>
                <div className="show-date-cell">{show.date}</div>
                <div className="show-venue-cell">{show.venue}</div>
                <div className="show-location-cell">{show.city}, {show.state}</div>
              </div>
            ))}
            {shows.length === 0 && <h2 className="error-msg">404 no shows found :3</h2>}
          </div>
    },
    {
      label: "add show",
      content: <AddShow />
    }
  ];

  return (
    <>
    <div className="page-content-container">
      <div className="edit-shows-container">
        {loading ? <SnogSpinner /> : <Tabs tabs={tabs} />}
      </div>
    </div>
    </>
  )
}

export default ManageShows