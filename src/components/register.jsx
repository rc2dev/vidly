import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './common/input';

class Register extends Component {
  state = {
    account: { username: '', password: '', name: '' },
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

  validate() {
    const errors = {};

    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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
