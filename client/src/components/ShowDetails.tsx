import { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import "./ShowDetails.css";
import shows from '../pages/admin/data/ShowData.json'; // Local fallback data


interface Show {
  id: number;
  date: string;
  time: string;
  venue: string;
  city: string;
  state: string;
  address: string;
  ticketsUrl: string;
  flyerUrl: string;
}

const ShowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShow = async () => {
      setLoading(true);
      setError("");

      try {
        // Simulate fetch from future API
        const response = await axios.get<Show>(`/api/shows/${id}`);
        // Uncomment below when API is ready
        // setShow(response.data);

        throw new Error("Simulating API error to use fallback");
      } catch (err) {
        console.warn("Falling back to local dummy data...");
        const fallbackShow = shows.find((s) => s.id === parseInt(id || "", 10));
        if (fallbackShow) {
          setShow(fallbackShow);
        } else {
          setError("Show not found.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!show) return <p>Show not found.</p>;

  return (
    <div className="page-content-container">
      <div className="show-details-page-container">

        {show.flyerUrl ? (
          <img
            src={show.flyerUrl}
            className="flyer-container"
          />
        ) : (
          <>
          </>
        )}

        <div className="show-text-details-container">
          <p><strong>Date:</strong> {show.date}</p>
          <p><strong>Time:</strong> {show.time}</p>
          <p><strong>Venue:</strong> {show.venue}</p>
          <p><strong>Location:</strong> {show.address}</p>
          {show.ticketsUrl ? (
            <p className="ticket-link"><a href={show.ticketsUrl} target="_blank" rel="noopener noreferrer">BUY TICKETS</a></p>
          ) : (
            <p></p>)
          }
        </div>
      </div>
      <p className="go-back-link" onClick={() => navigate(-1)}>← Back to Shows</p>
    </div>
  );
};

export default ShowDetails;
