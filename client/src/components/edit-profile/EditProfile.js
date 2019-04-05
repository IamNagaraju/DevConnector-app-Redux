import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/textAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import { Link } from 'react-router-dom';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      company: '',
      handle: '',
      display: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      gitHubUserName: '',
      bio: '',
      twitter: '',
      facebook: '',
      instagram: '',
      linkedIn: '',
      youtube: '',
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //Bring skills array back to csv
      profile.skills = profile.skills ? profile.skills.join(',') : '';
      //If profile field doesn't exist make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.gitHubUserName = !isEmpty(profile.gitHubUserName)
        ? profile.gitHubUserName
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedIn = !isEmpty(profile.social.linkedIn)
        ? profile.social.linkedIn
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';
      //set component fields state
      this.setState({
        handle: profile.handle,
        website: profile.website,
        company: profile.company,
        location: profile.location,
        status: profile.status,
        skills: profile.skills,
        gitHubUserName: profile.gitHubUserName,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram,
        linkedIn: profile.linkedIn,
        youtube: profile.youtube,
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      website: this.state.website,
      company: this.state.company,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      gitHubUserName: this.state.gitHubUserName,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedIn: this.state.linkedIn,
      youtube: this.state.youtube,
    };
    this.props.createProfile(profileData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fa fa-twitter-square"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fa fa-facebook-official"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedIn"
            icon="fa fa-linkedin"
            value={this.state.linkedIn}
            onChange={this.onChange}
            error={errors.linkedIn}
          />
          <InputGroup
            placeholder="Youtube Channel URL"
            name="youtube"
            icon="fa fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fa fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    const options = [
      { label: '* Select Professional Status', value: 0 },
      {
        label: 'Developer',
        value: 'Developer',
      },
      {
        label: 'Junior Developer',
        value: 'Junior Developer',
      },
      {
        label: 'Senior Developer',
        value: 'Senior Developer',
      },
      {
        label: 'Manager',
        value: 'Manager',
      },
      {
        label: 'Student or Learning',
        value: 'Student or Learning',
      },
      {
        label: 'Instructor or Learning',
        value: 'Instructor or Learning',
      },
      {
        label: 'Intern',
        value: 'Intern',
      },
      {
        label: 'Other',
        value: 'Other',
      },
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              {/* <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p> */}
              <small className="d-block pb-3">* = required fields </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                  onChange={this.onChange}
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be Your Own company or one you work"
                />
                <TextFieldGroup
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be Your Own Website or company one"
                />
                <TextFieldGroup
                  placeholder="location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separeted values"
                />
                <TextFieldGroup
                  placeholder="gitHubUserName"
                  name="gitHubUserName"
                  value={this.state.gitHubUserName}
                  onChange={this.onChange}
                  error={errors.gitHubUserName}
                  info="YOur latest git repo link"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us little about your self"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                {/* {mt-margin top} */}
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
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
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
