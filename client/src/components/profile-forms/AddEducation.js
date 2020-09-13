import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, DatePicker, Form, Input } from 'antd';
import { addEducation } from '../../actions/profile';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
};

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
      <small>* = required field</small>
      <Form
        {...layout}
        form={form}
        name="add-education"
        onFinish={onFinish}
        initialValues={initialState}
        scrollToFirstError
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            />{' '}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={current}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={onChange}
          />
        </div>
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

export default connect(null, { addEducation })(AddEducation);
