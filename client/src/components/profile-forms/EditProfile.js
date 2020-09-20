import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input } from 'antd';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [sendData, setSendData] = useState(false);

  const onFinish = (values) => {
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    } = values;
    setFormData({
      ...formData,
      company,
      website,
      location,
      status,
      skills,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    });
    setSendData(true);
  };

  useEffect(() => {
    if (sendData) createProfile(formData, history, !!profile);
    // eslint-disable-next-line
  }, [sendData]);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
      facebook:
        loading || !profile.social.facebook ? '' : profile.social.facebook,
      linkedin:
        loading || !profile.social.linkedin ? '' : profile.social.linkedin,
      youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
      instagram:
        loading || !profile.social.instagram ? '' : profile.social.instagram
    });

    form.setFieldsValue(formData);
    // eslint-disable-next-line
  }, [loading]);

  useEffect(
    () => form.resetFields(),
    // eslint-disable-next-line
    [formData]
  );

  useEffect(() => {
    if (profile?.social) {
      toggleSocialInputs(true);
    }
  }, [profile]);

  return (
    <>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <Form
        {...formItemLayout}
        form={form}
        name="edit-profile"
        onFinish={onFinish}
        initialValues={formData}
        scrollToFirstError
      >
        <Form.Item
          name="status"
          label="Job/Status"
          extra="Give us an idea of what you do for a living"
          rules={[
            {
              required: true,
              message: 'Please input your Job/Status!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="company"
          label="Company"
          extra="Could be your company or one you work for"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
          extra="Could be your own or a company website"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          extra="City & state suggested (eg. Athens, Marousi)"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="skills"
          label="Skills & Hobbies"
          extra="Please use comma separated values (eg. Photography, coding, traveling)"
          rules={[
            {
              required: true,
              message: 'Please input your Skills & Hobbies!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bio"
          label="Bio"
          extra="Tell us a little about yourself"
        >
          <Input.TextArea />
        </Form.Item>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="social-network-field">
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x" />
              </div>
              <Form.Item name="twitter">
                <Input
                  placeholder="Twitter URL"
                  className="social-network-input"
                />
              </Form.Item>
            </div>
            <div className="social-network-field">
              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x" />
              </div>
              <Form.Item name="facebook">
                <Input
                  placeholder="Facebook URL"
                  className="social-network-input"
                />
              </Form.Item>
            </div>
            <div className="social-network-field">
              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x" />
              </div>

              <Form.Item name="youtube">
                <Input
                  placeholder="Youtube URL"
                  className="social-network-input"
                />
              </Form.Item>
            </div>
            <div className="social-network-field">
              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x" />
              </div>
              <Form.Item name="linkedin">
                <Input
                  placeholder="Linkedin URL"
                  className="social-network-input"
                />
              </Form.Item>
            </div>
            <div className="social-network-field">
              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x" />
              </div>
              <Form.Item name="instagram">
                <Input
                  placeholder="Instagram URL"
                  className="social-network-input"
                />
              </Form.Item>
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </Form>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
