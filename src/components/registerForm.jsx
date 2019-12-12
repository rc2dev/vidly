import React, { Component } from 'react';
import Input from './common/input';
import Form from './common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .label('Username'),
    password: Joi.string()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  };

  doSubmit() {
    console.log('Submitted');
  }

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={data.username}
          error={errors.username}
          onChange={this.handleChange}
        />
        <Input
          name="password"
          label="Password"
          value={data.password}
          error={errors.password}
          onChange={this.handleChange}
        />
        <Input
          name="name"
          label="Name"
          value={data.name}
          error={errors.name}
          onChange={this.handleChange}
        />
        <button disabled={this.validate()} className="btn btn-primary">
          Register
        </button>
      </form>
    );
  }
}

export default RegisterForm;
