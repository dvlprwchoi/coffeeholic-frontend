import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';

const CoffeeshopDetail = ({ userInfo, loggedIn }) => {
  const history = useHistory();
  const [coffeeshop, setCoffeeshop] = useState(null);
  const { id } = useParams();
  const getCoffeeshopDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/coffeeholic/${id}`);
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setCoffeeshop(data);
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

  return (
    <Container className="p-5 border rounded-3 bg-light">
      <div className="d-flex justify-content-between">
        <div>
          <h2>{coffeeshop.name}</h2>
        </div>
        {userInfo && userInfo.username === coffeeshop.owner && (
          <div>
            <Button variant="warning">Edit</Button>
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
  );
};

export default CoffeeshopDetail;
