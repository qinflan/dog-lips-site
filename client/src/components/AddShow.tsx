import React, { useState } from 'react'
import { createShow, getPresignedUrl, uploadToS3 } from '@/api/admin';
import type { Show } from '@/types/show';
import { ToastContainer, toast } from 'react-toastify';
import DateInputMask from './DateInputMask';
import { formatDate } from '@/common/utils';
  
const AddShow = () => {
    const [formData, setFormData] = useState<Omit<Show, 'id'>>({
      date: '',
      venue: '',
      city: '',
      state: '',
      time: '',
      address: '',
      price: '',
      flyer: '',
      ticketsUrl: '',
    });
  
    const [flyerFile, setFlyerFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFlyerFile(e.target.files[0]);
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        let flyerFilename = '';
  
        // If a flyer file is selected, get a presigned URL and upload it to S3
        if (flyerFile) {
          const presignedUrl = await getPresignedUrl(flyerFile.name);
          await uploadToS3(presignedUrl, flyerFile);
          flyerFilename = flyerFile.name;
        }
  
        const showData = {
          ...formData,
          date: formatDate(formData.date),
          flyer: flyerFilename || formData.flyer,
        };
  
        await createShow(showData);
        
        toast.success("show uploaded to database")
        // Reset form
        setFormData({
          date: '',
          venue: '',
          city: '',
          state: '',
          time: '',
          address: '',
          price: '',
          flyer: '',
          ticketsUrl: '',
        });
        setFlyerFile(null);
      } catch (err) {
        toast.error("Failed to create show");
        console.error("Error creating show: ", err);
      } finally {
        setLoading(false);
      }
    };
    
  return (
    <form onSubmit={handleSubmit} className="form-container">
        <div className="input-fields-container">

          <DateInputMask
            className="input-field"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />

          <input
            className="input-field"
            placeholder="venue"
            type="text"
            id="venue"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            required
          />

          <input
            className="input-field"
            placeholder="city"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />

          <input
            className="input-field"
            placeholder="state/country"
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          />

          <input
            className="input-field"
            placeholder="address"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <input
            className="input-field"
            type="text"
            id="time"
            name="time"
            placeholder="time (e.g. 8:00 PM)"
            value={formData.time}
            onChange={handleInputChange}
            required
          />

          <input
            className="input-field"
            type="text"
            id="price"
            name="price"
            placeholder="price (e.g 15)"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input
            className="input-field"
            type="url"
            id="ticketsUrl"
            name="ticketsUrl"
            placeholder="tickets link"
            value={formData.ticketsUrl}
            onChange={handleInputChange}
          />

          <input
            type="file"
            id="flyer"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            required
          />
          <label htmlFor="flyer" className="input-field custom-file-label">
            {flyerFile ? flyerFile.name : 'choose flyer image'}
          </label>

        <button type="submit" disabled={loading} className="form-btn">
          {loading ? 'uploading...' : 'upload show'}
        </button>
        </div>
        <ToastContainer toastStyle={{ fontFamily: '"Consolas", monospace, Times, sans-serif' }} position="bottom-right" />
      </form>
  )
}

export default AddShow