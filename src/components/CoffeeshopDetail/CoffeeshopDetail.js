import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Image, Button, Alert, Form } from 'react-bootstrap';
// import CoffeeshopEdit from '../CoffeeshopEdit/CoffeeshopEdit';

const CoffeeshopDetail = ({ userInfo, loggedIn }) => {
  // const initialCoffeeshopData = {
  //   name: coffeeshop.name,
  //   city: coffeeshop.city,
  //   state: '',
  //   website_url: '',
  //   photo_url: '',
  //   memo: '',
  // };

  // Edit mode state
  const [edit, setEdit] = useState(false);
  // const [update, setUpdate] = useState(initialCoffeeshopData);
  const history = useHistory();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [coffeeshop, setCoffeeshop] = useState(null);
  const { id } = useParams();
  const [initialValue, setInitialValue] = useState(null);

  const getCoffeeshopDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/coffeeholic/${id}`);
      const data = await response.json();
      console.log(response);

      if (response.status === 200) {
        setCoffeeshop(data);
        const formData = {
          name: data.name,
          city: data.city,
          state: data.state,
          website_url: data.website_url,
          photo_url: data.photo_url,
          memo: data.memo,
        };
        setInitialValue(formData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCoffeeshopDetail();
  }, []);

  if (!coffeeshop) {
    return null;
  }

  const _handleChange = (e) => {
    setInitialValue((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  // Update handle function
  const _handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/coffeeholic/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(initialValue),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    // Turn off edit mode after update
    setEdit(false);
    // Bring it to detail page after update
    getCoffeeshopDetail();
  };

  // Delete handler function
  const _handleDelete = async (e) => {
    e.preventDefault();
    // Confirmation popup window
    if (window.confirm('Are you 100% sure??')) {
      try {
        const response = await fetch(
          `http://localhost:8000/coffeeholic/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          }
        );
        // if 204(no content) redirect to coffe shops page
        if (response.status === 204) {
          history.push('/coffeeholic');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Edit handler function
  const _handleEdit = async (e) => {
    e.preventDefault();
    setEdit(true);
  };
  console.log(initialValue);

  return (
    <div>
      {/* Regular coffee shop detail view */}
      {!edit && (
        <Container className="p-5 border rounded-3 bg-light">
          <div className="d-flex justify-content-between">
            <div>
              <h2>{coffeeshop.name}</h2>
            </div>
            {userInfo && userInfo.username === coffeeshop.owner && (
              <div>
                <Button variant="warning" onClick={_handleEdit}>
                  Edit
                </Button>
                <Button variant="danger" onClick={_handleDelete}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <Image rounded fluid src={coffeeshop.photo_url} />
          <h3>City: {coffeeshop.city}</h3>
          <h3>State: {coffeeshop.state}</h3>
          <h3>Website: {coffeeshop.website_url}</h3>
          <h3>Memo: {coffeeshop.memo}</h3>
          <h6>
            Posted on {coffeeshop.posted} by {coffeeshop.owner}
          </h6>
          {/* <h2>Reviews: </h2>
			{!coffeeshop.reviews.length && <p>No reviews yet!</p>}
			{loggedIn && <Button>Write a review</Button>}
			{coffeeshop.reviews.length > 0 &&
				coffeeshop.reviews.map((review) => {
					return (
						<Container
							className='p-5 border rounded-3 bg-light'
							key={review.id}>
							<h4>{review.title}</h4>
							<p>{review.body}</p>
							<small>
								Posted by: {review.owner} at{' '}
								{new Date(review.created).toLocaleString()}
							</small>
							{userInfo && userInfo.username === review.owner && (
								<div>
									<Button variant='secondary'>Edit</Button>
									<Button variant='danger'>Delete</Button>
								</div>
							)}
						</Container>
					);
				})} */}
        </Container>
      )}{' '}
      {/* Edit mode view*/}
      {edit && (
        <Container className="p-5 border rounded-3 bg-light">
          <h1>Update coffee shop</h1>
          <Form onSubmit={_handleUpdate}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={initialValue.name}
                onChange={_handleChange}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={initialValue.city}
                onChange={_handleChange}
              />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={initialValue.state}
                onChange={_handleChange}
              />
            </Form.Group>
            <Form.Group controlId="website_url">
              <Form.Label>Website</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={initialValue.website_url}
                onChange={_handleChange}
              />
            </Form.Group>
            <Form.Group controlId="photo_url">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={initialValue.photo_url}
                onChange={_handleChange}
              />
            </Form.Group>
            <Form.Group controlId="memo">
              <Form.Label>Memo</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={initialValue.memo}
                onChange={_handleChange}
              />
            </Form.Group>
            <Button type="submit" disabled={error}>
              Update
            </Button>
            {error && (
              <Alert variant="warning">
                Oops, something went wrong! Please try again!
              </Alert>
            )}
          </Form>
        </Container>
      )}
    </div>
  );
};

export default CoffeeshopDetail;
