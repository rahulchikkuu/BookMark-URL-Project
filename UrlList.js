import React, { useState } from 'react';
import { Button, Container, ListGroup, Form, Modal } from 'react-bootstrap';

function UrlList() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const user = JSON.parse(localStorage.getItem(loggedInUser));
  const [urls, setUrls] = useState(user.urls);
  const [editUrl, setEditUrl] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const urlsPerPage = 3;

  // Logic to calculate pagination
  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const filteredUrls = urls.filter(url => 
    url.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUrls = filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl);

  const handleDelete = () => {
    const updatedUrls = urls.filter((url) => url.shortUrl !== urlToDelete);
    user.urls = updatedUrls;
    localStorage.setItem(loggedInUser, JSON.stringify(user));
    setUrls(updatedUrls);
    setShowDeleteModal(false);
  };

  const handleEdit = (shortUrl) => {
    const updatedUrls = urls.map((url) => url.shortUrl === shortUrl ? { ...url, title: newTitle } : url);
    user.urls = updatedUrls;
    localStorage.setItem(loggedInUser, JSON.stringify(user));
    setUrls(updatedUrls);
    setEditUrl(null);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Search input change handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination when search term changes
  };

  return (
    <Container className="container-custom bg bg-secondary my-4">
      <h2 className="header-custom ">URL Shortener</h2>
      <h3 className="header-custom">Your URLs</h3>

      <Form.Control
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />

      {currentUrls.length === 0 ? (
        <p>No URLs added yet</p>
      ) : (
        <>
          <ListGroup>
            {currentUrls.map((url) => (
              <ListGroup.Item key={url.shortUrl} className="d-flex justify-content-between align-items-center">
                {editUrl === url.shortUrl ? (
                  <>
                    <Form.Control
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="me-2"
                    />
                    <Button variant="success" onClick={() => handleEdit(url.shortUrl)}>Save</Button>
                    <Button variant="secondary" onClick={() => setEditUrl(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <span>{url.title}</span>
                    <a href={url.url} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a>
                    <span>{new Date(url.addedTime).toLocaleString()}</span>
                    <Button variant="primary" onClick={() => { setEditUrl(url.shortUrl); setNewTitle(url.title); }}>Edit</Button>
                    <Button variant="danger" onClick={() => { setUrlToDelete(url.shortUrl); setShowDeleteModal(true); }}>Delete</Button>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <nav>
            <ul className='pagination'>
              {[...Array(Math.ceil(filteredUrls.length / urlsPerPage)).keys()].map(number => (
                <li key={number + 1} className='page-item'>
                  <Button onClick={() => paginate(number + 1)} className='page-link'>
                    {number + 1}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this URL?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UrlList;
