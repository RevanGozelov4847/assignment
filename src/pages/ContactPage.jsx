import React, { useState } from 'react';

const ContactPage = () => {
  const [formInputs, setFormInputs] = useState({
    messageSubject: '',
    emailAddress: '',
    messageContent: '',
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInputs),
      });

      if (response.ok) {
        console.log('Message sent successfully!');
        // Clear form inputs on successful submission
        setFormInputs({
          messageSubject: '',
          emailAddress: '',
          messageContent: '',
        });
      } else {
        console.error('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <div className='contact-page'>
      <h1>Contact Us</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Subject:
          <input type="text" name="messageSubject" value={formInputs.messageSubject} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="emailAddress" value={formInputs.emailAddress} onChange={handleInputChange} />
        </label>
        <label>
          Content:
          <textarea name="messageContent" value={formInputs.messageContent} onChange={handleInputChange}></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
