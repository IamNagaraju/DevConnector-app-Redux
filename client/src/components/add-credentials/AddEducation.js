import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/textAreaFieldGroup';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      current: '',
      description: '',
      errors: {},
      disabled: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.errors, 'hi');
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    // console.log('submit');
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };
    this.props.addEducation(eduData, this.props.history);
    // console.log(expData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school , bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  className="form-control form-control-lg"
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                  // required
                />
                <TextFieldGroup
                  type="text"
                  placeholder="* FieldOfStudy"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.onChange}
                  error={errors.fieldOfStudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  name="from"
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    onChange={this.onCheck}
                    checked={this.state.current}
                    id="current"
                  />
                  <label className="form-check-label">Current Job</label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Programm Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
