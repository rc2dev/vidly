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
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput('username', 'Username')}
        {this.renderInput('password', 'Password')}
        {this.renderInput('name', 'Name')}
        {this.renderButton('Register')}
      </form>
    );
  }
}

export default RegisterForm;
