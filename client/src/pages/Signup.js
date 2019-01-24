import React, { Component } from "react";
import { FormGroup, FormControl, Button, Radio } from 'react-bootstrap';
import axios from 'axios';

class Signup extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    image: '',
    selectedOption: 'employer'
  }

  handleChange = key => (event) => {
    const { target: { value } } = event;
    this.setState({ [key]: value });
  }

  handleOptionChange = event => {
    this.setState({
      selectedOption: event.target.value
    });
    console.log(this.state.selectedOption)
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, first_name, last_name, selectedOption, image } = this.state;
    axios.post('/api/newUser', {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      user_type: selectedOption,
      image: image
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push('/dashboard');
      })
  }

  render() {
    const { email, password, first_name, last_name, image, selectedOption } = this.state;
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
          <FormGroup>
            <FormControl
            type="name"
            placeholder="image url"
            value={image}
            onChange={this.handleChange('image')}
              />
          </FormGroup>
          <FormGroup>
            <Radio
            name="radioGroup"
            value="employer"
            onChange={this.handleOptionChange}
            checked={selectedOption === 'employer'}
            inline>
              Employer
            </Radio>{' '}
            <Radio
            name="radioGroup"
            value="employee"
            onChange={this.handleOptionChange}
            checked={selectedOption === 'employee'}
            inline>
              Employee
            </Radio>{' '}
          </FormGroup>
          <Button className="justo-button" type="submit">Submit</Button>
        </form>
      </div>
    )
  }
}

export default Signup;
