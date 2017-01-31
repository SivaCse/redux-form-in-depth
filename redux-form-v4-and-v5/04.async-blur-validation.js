/**
 * To provide asynchronous validation, provide redux-form with an asynchronous validation
 * function (asyncValidate) that takes an object of form values, and the Redux dispatch function,
 * and returns a promise that either rejects with an object of errors or resolves.
 *
 * You will also need to specify which fields should fire the asynchronous validation when they are
 * blurred with the asyncBlurFields config property.
 */

import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = ['username', 'password'];

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
};

const asyncValidate = (values/*, dispatch */) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
        reject({username: 'That username is taken'})
      } else {
        resolve()
      }
    }, 1000); // simulate server latency
  })
};

class AsynchronousBlurValidationForm extends Component {
  render() {
    const { asyncValidating, fields: { username, password }, resetForm, handleSubmit, submitting } = this.props;
    return (<form className="form-horizontal" onSubmit={handleSubmit}>
        <div className={'form-group' + (username.touched && username.error ? ' has-error' : '')}>
          <label className="col-xs-4 control-label">Username</label>
          <div className={'col-xs-' + (username.touched && username.error ? '5' : '8')}
               style={{ position: 'relative' }}>
            <input type="text" className="form-control" placeholder="Username" {...username}/>
            {asyncValidating === 'username' && <i className="fa fa-cog fa-spin" /* spinning cog */ style={{
              position: 'absolute',
              right: 25,
              top: 10
            }}/>}
          </div>
          {username.touched && username.error && <div className="col-xs-3 help-block">{username.error}</div>}
        </div>
        <div className={'form-group' + (password.touched && password.error ? ' has-error' : '')}>
          <label className="col-xs-4 control-label">Password</label>
          <div className={'col-xs-' + (password.touched && password.error ? '5' : '8')}>
            <input type="password" className="form-control" placeholder="Password" {...password}/>
          </div>
          {password.touched && password.error && <div className="col-xs-3 help-block">{password.error}</div>}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg" style={{ margin: 10 }} disabled={submitting}>
            {submitting ? <i className="fa fa-cog fa-spin"/> : <i className="fa fa-paper-plane"/>} Sign Up
          </button>
          <button type="button" className="btn btn-default btn-lg" style={{ margin: 10 }} disabled={submitting}
                  onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

AsynchronousBlurValidationForm.propTypes = {
  asyncValidating: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};


export default reduxForm({
  form: 'asynchronousBlurValidation',
  fields,
  asyncValidate,
  asyncBlurFields: ['username'],
  validate
})(AsynchronousBlurValidationForm)