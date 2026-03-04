import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "./ShowDetails.css";
import type { Show } from '../types/show';
import { fetchShowById } from "@/api/shows";
import SnogSpinner from "./SnogSpinner";

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
        if (id) {
          const data = await fetchShowById(Number(id));
          setShow(data);
        } else {
          setError("Invalid show ID.");
        }
      } catch (err) {
        console.error("Error fetching show: ", err);
        setError("Error fetching show.");
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  if (loading) return <div className="page-content-container"><SnogSpinner /></div>;
  if (error) return <div className="page-content-container"><p>{error}</p></div>;
  if (!show) return <div className="page-content-container"><p>Show not found.</p></div>;

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
          <p><strong>date:</strong> {show.date}</p>
          <p><strong>time:</strong> {show.time}</p>
          <p><strong>venue:</strong> {show.venue}</p>
          <p><strong>city:</strong> {show.city}</p>
          <p><strong>state/country:</strong> {show.state}</p>
          {show.address && <p><strong>address:</strong> {show.address}</p>}
          {show.ticketsUrl ? (
            <p className="ticket-link"><a href={show.ticketsUrl} target="_blank" rel="noopener noreferrer">BUY TICKETS</a></p>
          ) : (
            <p></p>)
          }
        </div>
      </div>
      <p className="go-back-link" onClick={() => navigate(-1)}>← back to shows</p>
    </div>
  );
};

export default ShowDetails;
