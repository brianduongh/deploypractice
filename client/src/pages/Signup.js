import React, { Component } from "react";
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

class Signup extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  handleChange = key => (event) => {
    const { target: { value } } = event;
    this.setState({ [key]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, first_name, last_name } = this.state;
    axios.post('/api/newUser', {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push('/dashboard');
      })
  }

  render() {
    const { email, password, first_name, last_name } = this.state;
    return(
      <div className="login-page">
        <form onSubmit={this.handleSubmit}>
        <h1>Signup</h1>
          <FormGroup>
            <FormControl
            type="name"
            placeholder="first name"
            value={first_name}
            onChange={this.handleChange('first_name')}
              />
          </FormGroup>
          <FormGroup>
            <FormControl
            type="name"
            placeholder="last name"
            value={last_name}
            onChange={this.handleChange('last_name')}
              />
          </FormGroup>
          <FormGroup>
            <FormControl
            type="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange('email')}
              />
          </FormGroup>
          <FormGroup>
            <FormControl
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange('password')}
              />
          </FormGroup>
          <Button className="justo-button" type="submit">Submit</Button>
        </form>
      </div>
    )
  }
}

export default Signup;
