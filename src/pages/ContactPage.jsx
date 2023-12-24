import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    content: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Message sent successfully!');
        setFormData({
          subject: '',
          email: '',
          content: '',
        });
      } else {
        console.error('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='contact-page'>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Subject:
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Content:
          <textarea name="content" value={formData.content} onChange={handleChange}></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
