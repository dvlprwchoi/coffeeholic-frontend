import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Login = ({ _handleSetLogIn }) => {
  const initialFormData = {
    email: '',
    password: '',
  };
  const history = useHistory();
  const [formData, setFormData] = useState(initialFormData);

  // Handeler functions
  const _handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  // Getting auth token with log in information
  const _handleLogin = async (e) => {
    e.preventDefault();
    console.log('You have submitted a form.');
    try {
      const response = await fetch('http://localhost:8000/token/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = await response.json();
      console.log(token);
      // Passing _handleSetLogIn from app.js
      _handleSetLogIn(token.auth_token);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Log In Page</h3>
      <Form onSubmit={_handleLogin}>
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
        <Button type="submit">Log In</Button>
      </Form>
    </div>
  );
};

export default Login;
