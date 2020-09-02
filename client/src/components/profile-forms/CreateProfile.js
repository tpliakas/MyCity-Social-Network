import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
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

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

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
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <Form
        {...formItemLayout}
        form={form}
        name="create-profile"
        onFinish={onFinish}
        initialValues={initialState}
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
            <Form.Item name="twitter">
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x" />
              </div>
              <Input placeholder="Twitter URL" />
            </Form.Item>
            <Form.Item name="facebook">
              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x" />
              </div>
              <Input placeholder="Facebook URL" />
            </Form.Item>
            <Form.Item name="youtube">
              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x" />
              </div>
              <Input placeholder="Youtube URL" />
            </Form.Item>
            <Form.Item name="linkedin">
              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x" />
              </div>
              <Input placeholder="Linkedin URL" />
            </Form.Item>
            <Form.Item name="instagram">
              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x" />
              </div>
              <Input placeholder="Instagram URL" />
            </Form.Item>
          </>
        )}
      </Form>
      <input type="submit" className="btn btn-primary my-1" value="Submit" />
      <Link className="btn btn-light my-1" to="/dashboard">
        Go Back
      </Link>
    </>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
