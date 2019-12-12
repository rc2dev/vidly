import React, { Component } from 'react';
import Input from './common/input';

class Register extends Component {
  state = {
    account: { username: '', password: '', name: '' },
    errors: {}
  };

  validate() {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === '')
      errors.username = 'Username is required';
    if (account.password.trim() === '')
      errors.password = 'Password is required';
    if (account.name.trim() === '') errors.name = 'Password is required';

    return errors;
  }

  validateProperty = ({ name, value }) => {
    if (name === 'username') {
      if (value.trim() === '') return 'Username is required';
    }
    if (name === 'password') {
      if (value.trim() === '') return 'Password is required';
    }
    if (name === 'name') {
      if (value.trim() === '') return 'Name is required';
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    // Call the server
    console.log('Submitted');
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          error={errors.username}
          onChange={this.handleChange}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
          error={errors.password}
          onChange={this.handleChange}
        />
        <Input
          name="name"
          label="Name"
          value={account.name}
          error={errors.name}
          onChange={this.handleChange}
        />
        <button className="btn btn-primary">Register</button>
      </form>
    );
  }
}

export default Register;
