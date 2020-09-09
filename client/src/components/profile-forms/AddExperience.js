import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Checkbox, DatePicker, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
};

const initialState = {
  company: '',
  title: '',
  location: '',
  from: '',
  to: '',
  current: false,
  description: ''
};

const AddExperience = ({ addExperience, history }) => {
  const [form] = Form.useForm();
  const [isCurrent, setIsCurrent] = useState(false);

  const handleChangeCurrent = (e) => setIsCurrent(e.target.checked);

  const onFinish = (values) => {
    const { company, title, location, from, to, current, description } = values;
    console.log({ values });
    addExperience(
      { company, title, location, from, to, current, description },
      history
    );
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        Add any job positions that you have had in the past
      </p>
      <small>
        <span className="red">*</span> = required field
      </small>
      <Form
        {...layout}
        form={form}
        name="create-profile"
        onFinish={onFinish}
        initialValues={initialState}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="Job Title"
          rules={[
            {
              required: true,
              message: 'Please input your Job title!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="company"
          label="Company"
          rules={[
            {
              required: true,
              message: 'Please input your Job title!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input />
        </Form.Item>
        <Form.Item
          name="from"
          label="From Date"
          rules={[
            {
              required: true,
              message: 'Please input your From Date!'
            }
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="current" label="Current">
          <Checkbox onChange={handleChangeCurrent} />
        </Form.Item>
        {!isCurrent && (
          <Form.Item name="to" label="To Date">
            <DatePicker />
          </Form.Item>
        )}
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </Form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(AddExperience);