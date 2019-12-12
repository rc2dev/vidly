import React, { Component } from 'react';

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
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            autoFocus
            id="username"
            name="username"
            type="text"
            className="form-control"
            value={account.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="text"
            className="form-control"
            value={account.password}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={account.name}
            onChange={this.handleChange}
          />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    );
  }
}

export default Register;
