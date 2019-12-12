import React, { Component } from 'react';

class Register extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();

    // Call the server
    console.log('Submitted');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            autoFocus
            id="username"
            autotype="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" className="form-control" />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
    );
  }
}

export default Register;
