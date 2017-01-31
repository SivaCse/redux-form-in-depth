/**
 * In redux-form, every config property given to reduxForm can also be supplied as a prop
 * to the decorated component. This includes the fields array!
 */

import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const labels = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  age: 'Age',
  street: 'Street',
  city: 'City'
};

class DynamicForm extends Component {
  render() {
    const { fields, handleSubmit, submitting } = this.props;
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {Object.keys(fields).map(name => {
          const field = fields[name]
          return (<div className="form-group" key={name}>
            <label className="col-xs-4 control-label">{labels[name]}</label>
            <div className="col-xs-8">
              <input type="text" className="form-control" placeholder={labels[name]} {...field}/>
            </div>
          </div>)
        })}
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg" style={{ margin: 10 }} disabled={submitting}>
            {submitting ? <i className="fa fa-cog fa-spin"/> : <i className="fa fa-paper-plane"/>} Submit
          </button>
        </div>
      </form>
    )
  }
}

DynamicForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};


export default reduxForm({ form: 'dynamic' })(DynamicForm)