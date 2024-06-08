import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withNavigate from './withNavigate'; // Import the HOC

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    console.log('Submitting login:', email, password); // Log form submission data

    axios.post('https://authentication-back.vercel.app/login', { email, password })
      .then(result => {
        console.log(result);
        // Redirect to home page after successful login
        if (result.data === "Success") {
          this.props.navigate('/home'); // Use navigate prop
        }
      })
      .catch(err => {
        console.error('Login request error:', err.response || err.message || err); // Log error details
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">
            Login
          </button>
          <p>Don't Have an Account?</p>
          <Link to="/signup">
            <button type="button">
              Signup
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default withNavigate(Login); // Wrap the Login component
