import { useEffect, useState } from "react";
import { useParams } from "react-router";
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
  ticketsUrl: string;
  flyerUrl: string;
}

const ShowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchShow = async () => {
      setLoading(true);
      setError("");

      try {
        // Simulate fetch from future API
        const response = await axios.get<Show>(`/api/shows/${id}`);

        // Only if you have a real backend; comment out for now
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
        <img
          src={show.flyerUrl}
          className="flyer-container"
        />
        <div className="show-text-details-container">
          <p><strong>Date:</strong> {show.date}</p>
          <p><strong>Time:</strong> {show.time}</p>
          <p><strong>Venue:</strong> {show.venue}</p>
          <p><strong>Location:</strong> {show.city}, {show.state}</p>
          <p className="ticket-link">
            <a href={show.ticketsUrl} target="_blank" rel="noopener noreferrer">
              Buy Tickets
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
