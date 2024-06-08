import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;

    
    axios.post('https://authentication-frontend-psi.vercel.app/register', { name: username, email, password })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Name"
              autoComplete="off"
              name="username"
              onChange={this.handleChange}
            />
          </div>
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
            Register
          </button>
          <p>Already Have an Account?</p>
          <Link to="/login">
            <button type="button">
              Login
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Signup;
