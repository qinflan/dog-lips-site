import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "./Contact.css";

const Contact = () => {

  // declare state for email contents to be validated in backend
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formResponse = await axios.post("https://example-api.com/send-email",  // setup backend first
        {
          Name,
          email,
          subject,
          body
        });

      if (formResponse.status == 200) {
        toast.success("Thank you for contacting me!")
        setEmail('');
        setSubject('');
        setBody('');
        setName('');
      }
    } catch (error) {
      console.error("Error sending email: ", error)
      toast.error("Message failed to send")
    }

  }

  return (
    <div className="page-content-container">
      <div className="form-section-container">
        <h1 className="section-title">CONTACT</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-fields-container">
            <input
              type="text"
              className="input-field"
              placeholder="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required />

            <input
              type="text"
              className="input-field"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />

            <input
              type="text"
              className="input-field"
              placeholder="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required />

            <textarea
              className="input-field"
              placeholder="body"
              value={body}
              maxLength={370}
              onChange={(e) => setBody(e.target.value)}
              required />

            <button type="submit" className="form-submit-btn">
              send email
            </button>

          </div>

          <ToastContainer position="bottom-right" />
        </form>
      </div>
    </div>
  )
}

export default Contact