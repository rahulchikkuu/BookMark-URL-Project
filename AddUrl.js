import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';

function AddUrl() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAddUrl = () => {
    // Your existing logic
    const shortUrl = Math.random().toString(36).substring(2, 7);
    const loggedInUser = localStorage.getItem('loggedInUser');
    const user = JSON.parse(localStorage.getItem(loggedInUser));
    
    if (user.urls.length >= 5) {
      alert('You can only add 5 URLs');
      return;
    }
    
    user.urls.push({ title, url, shortUrl, addedTime: new Date() });
    localStorage.setItem(loggedInUser, JSON.stringify(user));
    setTitle('');
    setUrl('');
    
    // Reload the page to update the URLs
    window.location.reload();
  };

  return (
    <Container className="container-custom bg-primary my-4">
      <h3 className="header-custom">Add URL</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        </Form.Group>
        <Button className="button-custom" onClick={handleAddUrl}>Add URL</Button>
      </Form>
    </Container>
  );
}

export default AddUrl;
