import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Form extends Component {
  constructor (props) {
    super(props);
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    };
    return (
      <div>
        {this.props.formType === 'Login' &&
          <h1 className="title is-1">Log In</h1>
        }
        {this.props.formType === 'Register' &&
          <h1 className="title is-1">Register</h1>
        }
        <hr/><br/>
        <form onSubmit={(event) => this.props.handleUserFormSubmit(event)}>
          {this.props.formType === 'Register' &&
            <div className="field">
              <input
                name="username"
                className="input is-medium"
                type="text"
                placeholder="Enter a username"
                required
                value={this.props.formData.username}
                onChange={this.props.handleFormChange}
              />
            </div>
          }
          <div className="field">
            <input
              name="email"
              className="input is-medium"
              type="email"
              placeholder="Enter an email address"
              required
              value={this.props.formData.email}
              onChange={this.props.handleFormChange}
            />
          </div>
          <div className="field">
            <input
              name="password"
              className="input is-medium"
              type="password"
              placeholder="Enter a password"
              required
              value={this.props.formData.password}
              onChange={this.props.handleFormChange}
            />
          </div>
          <input
            type="submit"
            className="button is-primary is-medium is-fullwidth"
            value="Submit"
          />
        </form>
      </div>
    )
  };
};

export default Form;