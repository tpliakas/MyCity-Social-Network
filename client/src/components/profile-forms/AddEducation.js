import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, DatePicker, Form, Input } from 'antd';
import { addEducation } from '../../actions/profile';
import { dateFormat, layout } from '../../utils/other';

const initialState = {
  school: '',
  degree: '',
  fieldofstudy: '',
  from: '',
  to: '',
  current: false,
  description: ''
};

const AddEducation = ({ addEducation, history }) => {
  const [form] = Form.useForm();
  const [isCurrent, setIsCurrent] = useState(false);

  const handleChangeCurrent = (e) => setIsCurrent(e.target.checked);

  const onFinish = (values) => {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      description,
      current
    } = values;
    addEducation(
      { school, degree, fieldofstudy, from, to, description, current },
      history
    );
  };

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">Add any school or bootcamp that you have attended</p>
      <small>
        <span className="red">*</span> = required field
      </small>
      <Form
        {...layout}
        form={form}
        name="add-education"
        onFinish={onFinish}
        initialValues={initialState}
        scrollToFirstError
      >
        <Form.Item
          name="school"
          label="School or Bootcamp"
          rules={[
            {
              required: true,
              message: 'Please input your school or bootcamp!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="degree"
          label="Degree or Certificate"
          rules={[
            {
              required: true,
              message: 'Please input your degree or certificate!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="fieldofstudy" label="Field of Study">
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
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item name="current" label="Current">
          <Checkbox onChange={handleChangeCurrent} />
        </Form.Item>
        {!isCurrent && (
          <Form.Item name="to" label="To Date">
            <DatePicker format={dateFormat} />
          </Form.Item>
        )}
        <Form.Item name="description" label="Program Description">
          <Input.TextArea />
        </Form.Item>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </Form>
    </>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
