import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

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
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

export default Signup;
