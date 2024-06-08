import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import UrlList from './UrlList';
import AddUrl from './AddUrl';
import Navbar from './Navabar';

function Dashboard() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (!loggedInUser) {
    navigate('/login');
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div>
      <Navbar/>
    <Container className="container-custom 
   bg-success my-4">
      <h2 className="header-custom">Dashboard</h2>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
      <AddUrl />
      <UrlList />
    </Container>
    </div>
  );
}

export default Dashboard;
