/**
 * Any component decorated with reduxForm() may be used multiple times on a single page by passing
 * in a formKey prop, which will be used as a unique key for a nested object in the Redux state.
 * Each instance will be connected only to its Redux state slice.
 */

import React, { Component, PropTypes } from 'react'
import BandForm from './common/band-form';
const options = [5, 10, 20, 50];

class BandsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bands: []
    }
  }

  componentWillMount() {
    this.updateBands(options[0])
  }

  onSubmit(index) {
    return data => {
      return this.props.onSubmit(data)
        .then(() => {
          const bands = this.state.bands.slice();
          bands[index] = data;
          this.setState({bands})
        })
    }
  }

  updateBands(num) {
    const { bands } = this.state;
    this.setState({
      num,
      bands: bands.length < num ? bands.concat(generateBands(num - bands.length)) : bands.slice(0, num)
    })
  }

  handleChange(event) {
    this.updateBands(event.target.value)
  }

  render() {
    const { num, bands } = this.state;
    return (
      <div>
        <div style={{ width: 200, margin: '10px auto' }} className="form-inline">
          <div className="form-group">
            <label htmlFor="numRecords">Number of records</label>
            <select className="form-control" style={{ marginLeft: 15, width: 50 }} value={num}
                    id="numRecords"
                    onChange={this.handleChange.bind(this)}>
              {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, fontWeight: 'bold', padding: '5px 13px' }}>Band Name</div>
          <div style={{ flex: 1, fontWeight: 'bold', padding: '5px 13px' }}>Favorite Color</div>
          <div style={{ width: 144 }}></div>
        </div>
        {bands.map((band, index) =>
          <BandForm
            style={{ marginTop: 10 }} key={index} // required by React
            formKey={index.toString()}          // formKey should be a string
            initialValues={band}
            onSubmit={this.onSubmit(index)}/>
        )}
      </div>
    )
  }
}

BandsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};


export default BandsForm