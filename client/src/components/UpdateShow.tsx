import './UpdateShow.css';
import type { Show } from '../types/show';
import { updateShow, deleteShow, getPresignedUrl, uploadToS3 } from '../api/admin';
import { fetchShowById } from '../api/shows';
import { useEffect, useState } from 'react';
import SnogSpinner from './SnogSpinner';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import DateInputMask from './DateInputMask';
import { formatDate } from '@/common/utils';

const UpdateShow = ({ showId }: { showId: number }) => {
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [ticketsUrl, setTicketsUrl] = useState('');
  const [flyer, setFlyer] = useState<File | null>(null);

  useEffect(() => {
    const loadShow = async () => {
      setLoading(true);
      try {
        const data = await fetchShowById(showId);
        setShow(data);
        setDate(data.date);
        setVenue(data.venue);
        setCity(data.city);
        setState(data.state);
        setAddress(data.address || '');
        setTime(data.time);
        setPrice(data.price || '');
        setTicketsUrl(data.ticketsUrl || '');
        setFlyer(null);
      } catch (err) {
        console.error("Error loading show: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadShow();
  }, [showId]);

  const handleUpdateShow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!show) return;
    
    setLoading(true);
    try {
  
        // If a flyer file is selected, get a presigned URL and upload it to S3
        if (flyer) {
          const presignedUrl = await getPresignedUrl(flyer.name);
          await uploadToS3(presignedUrl, flyer);
        }


      // Construct the complete Show object with updated values
      const updatedShow: Show = {
        id: show.id, // Keep the original ID (non-editable)
        date: formatDate(date),
        venue,
        city,
        state,
        address,
        time,
        price,
        ticketsUrl,
        flyer: flyer ? flyer.name : show.flyer
      };
      
      await updateShow(updatedShow);
      const data = await fetchShowById(showId);
      setShow(data);
      toast.success('Show updated successfully!');
    } catch (err) {
      console.error("Error updating show: ", err);
      toast.error('Failed to update show');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShow = async () => {
    try {
      await deleteShow(showId);
      navigate('/admin/shows');
    } catch (err) {
      console.error("Error deleting show: ", err);
    }
  };

  return (
    <div className="page-content-container">
      { loading && <SnogSpinner /> }
      { show && (
    <form onSubmit={handleUpdateShow} className="form-container">
        <div className="input-fields-container">

          <DateInputMask
            className="input-field"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            className="input-field"
            placeholder="venue"
            type="text"
            id="venue"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />

          <input
            className="input-field"
            placeholder="city"
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <input
            className="input-field"
            placeholder="state/country"
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />

          <input
            className="input-field"
            placeholder="address"
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            className="input-field"
            type="text"
            id="time"
            name="time"
            placeholder="time (e.g. 8:00 PM)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <input
            className="input-field"
            type="text"
            id="price"
            name="price"
            placeholder="price (e.g 15)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="url"
            id="ticketsUrl"
            name="ticketsUrl"
            placeholder="tickets link"
            value={ticketsUrl}
            onChange={(e) => setTicketsUrl(e.target.value)}
          />

          <input
            type="file"
            id="flyer"
            accept="image/*"
            onChange={(e) => setFlyer(e.target.files ? e.target.files[0] : null)}
            style={{ display: 'none' }}
          />
          <label htmlFor="flyer" className="input-field custom-file-label">
            {flyer ? flyer.name : "choose new flyer"}
          </label>
          {<img src={show.flyerUrl} alt="current flyer" />}

        <button type="submit" disabled={loading} className="form-btn">
          {loading ? 'updating...' : 'update show'}
        </button>
        <button className="form-btn" onClick={handleDeleteShow}>delete show</button>
        </div>
        <ToastContainer toastStyle={{ fontFamily: '"Consolas", monospace, Times, sans-serif' }} position="bottom-right" />
      </form>
      )}
    </div>

  )
}

export default UpdateShow