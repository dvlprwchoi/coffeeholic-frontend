import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
// import CoffeeshopForm from '../CoffeeshopForm/CoffeeshopForm';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const CoffeeshopCreate = ({ loggedIn }) => {
  const initialCoffeeshopData = {
    name: '',
    city: '',
    state: '',
    website_url: '',
    photo_url: '',
    memo: '',
  };

  const history = useHistory();
  const [newCoffeeshop, setNewCoffeeshop] = useState(initialCoffeeshopData);
  //   error state and success state -> feedback for user
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const _handleChange = (e) => {
    setNewCoffeeshop((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  const _handleCreateNew = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/coffeeholic/', {
        method: 'POST',
        body: JSON.stringify(newCoffeeshop),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        history.push('/coffeeholic');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Container className="p-5 border rounded-3 bg-light">
      <h1>New coffee shop</h1>
      <Form onSubmit={_handleCreateNew}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            value={newCoffeeshop.name}
            onChange={_handleChange}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            value={newCoffeeshop.city}
            onChange={_handleChange}
          />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            value={newCoffeeshop.state}
            onChange={_handleChange}
          />
        </Form.Group>
        <Form.Group controlId="website">
          <Form.Label>Website</Form.Label>
          <Form.Control
            // required
            autoFocus
            type="text"
            value={newCoffeeshop.website_url}
            onChange={_handleChange}
          />
        </Form.Group>
        <Form.Group controlId="photo">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            // required
            autoFocus
            type="text"
            value={newCoffeeshop.photo_url}
            onChange={_handleChange}
          />
        </Form.Group>
        <Form.Group controlId="memo">
          <Form.Label>Memo</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            value={newCoffeeshop.memo}
            onChange={_handleChange}
          />
        </Form.Group>
        <Button type="submit" disabled={error}>
          Post
        </Button>
        {error && (
          <Alert variant="warning">
            Oops, something went wrong! Please try again!
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default CoffeeshopCreate;
