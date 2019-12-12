import React, { Component } from 'react';
import Input from './common/input';

class Register extends Component {
  state = { account: { username: '', password: '', name: '' } };

  handleSubmit = e => {
    e.preventDefault();

    // Call the server
    console.log('Submitted');
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          onChange={this.handleChange}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
          onChange={this.handleChange}
        />
        <Input
          name="name"
          label="Name"
          value={account.name}
          onChange={this.handleChange}
        />
        <button className="btn btn-primary">Register</button>
      </form>
    );
  }
}

export default Register;
