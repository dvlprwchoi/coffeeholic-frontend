import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

const Signup = () => {
  const initialFormData = {
    username: '',
    email: '',
    password: '',
    re_password: '',
  };

  const history = useHistory();
  const [formData, setFormData] = useState(initialFormData);
  //   error state and success state -> feedback for user
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  //   password error description
  const [errorMessage, setErrorMessage] = useState('');

  const _handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  //   Check if password is match
  const _handlePasswordCheck = (e) => {
    if (formData.password !== formData.re_password) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const _handleSignUp = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      } else {
        //   Password setting error message
        const data = await response.json();
        setError(true);
        setErrorMessage(data.password[0]);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Sign Up Page</h3>
      <Form onSubmit={_handleSignUp}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            value={formData.username}
            onChange={_handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            required
            autoFocus
            type="email"
            value={formData.email}
            onChange={_handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={formData.password}
            onChange={_handleChange}
          />
        </Form.Group>
        <Form.Group controlId="re_password">
          <Form.Label>Re-type Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={formData.re_password}
            onChange={_handleChange}
            // When user leave the form
            onBlur={_handlePasswordCheck}
          />
        </Form.Group>
        <Button type="submit" disabled={error}>
          Sign Up
        </Button>
        {error && (
          <Alert variant="warning">
            {errorMessage} Passwords must be matched. Try it again!
          </Alert>
        )}
        {success && (
          <Alert variant="success">
            A new user account has been created successfully! You will be
            automatically redirected to log in page otherwise, you can{' '}
            {<Link to="/login">CLICK HERE.</Link>}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default Signup;
