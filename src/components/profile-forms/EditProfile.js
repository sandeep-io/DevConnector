import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CreateProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  CreateProfile,
  getCurrentProfile
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  useEffect(() => {
    setFormData({
      company: loading || !profile?.company ? '' : profile.company,
      website: loading || !profile?.website ? '' : profile.website,
      location: loading || !profile?.location ? '' : profile.location,
      status: loading || !profile?.status ? '' : profile.status,
      skills:
        loading || !profile?.skills ? '' : profile.skills.join(','),
      githubusername:
        loading || !profile?.githubusername ? '' : profile.githubusername,
      bio: loading || !profile?.bio ? '' : profile.bio,
      twitter:
        loading || !profile?.social?.twitter ? '' : profile.social.twitter,
      facebook:
        loading || !profile?.social?.facebook ? '' : profile.social.facebook,
      linkedin:
        loading || !profile?.social?.linkedin ? '' : profile.social.linkedin,
      youtube:
        loading || !profile?.social?.youtube ? '' : profile.social.youtube,
      instagram:
        loading || !profile?.social?.instagram ? '' : profile.social.instagram
    });
  }, [loading, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    CreateProfile(formData, navigate, true); // true = edit mode
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>

      <p className="lead">
        <i className="fas fa-user"></i> Update your profile information
      </p>

      <small>* = required field</small>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Skills (comma separated)" name="skills" value={skills} onChange={onChange} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={onChange} />
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChange} />
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span> Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={onChange} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <button type="button" className="btn btn-light my-1" onClick={() => navigate('/dashboard')}>
          Go Back
        </button>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  CreateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  CreateProfile,
  getCurrentProfile
})(EditProfile);
