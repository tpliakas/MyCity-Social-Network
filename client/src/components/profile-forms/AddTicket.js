import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTicket } from '../../actions/profile';
import { layout } from '../../utils/other';
import { Button, Form, Input, Select } from 'antd';
import { setAlert } from '../../actions/alert';

const initialState = {
  title: '', //r
  city: '', //r
  area: '', //r
  location: null,
  address: '', //r
  addressNumber: '', //r
  ticketType: '', //r
  importance: '',
  images: [],
  video: '',
  status: '',
  text: '', //r
  name: ''
};

const AddTicket = ({ addTicket, history }) => {
  const [form] = Form.useForm();
  const [position, setPosition] = useState(null);
  const { Option } = Select;

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setAlert('Geolocation is not supported by this browser.', 'error');
    }
  };

  const showPosition = (currentPosition) =>
    setPosition(
      `${currentPosition.coords.longitude}, ${currentPosition.coords.latitude}`
    );

  useEffect(() => {
    form.setFieldsValue({ ...{ location: position } });
  }, [position]);

  return (
    <>
      <h1 className="large text-primary">Add An Issue Ticket</h1>
      <p className="lead">Add your new issue ticket that you want to report.</p>
      <small>
        <span className="red">*</span> = required field
      </small>
      <Form
        {...layout}
        form={form}
        name="add-ticket"
        // onFinish={onFinish}
        initialValues={initialState}
        scrollToFirstError
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input a title for the ticket!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: 'Please input a city!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area"
          rules={[
            {
              required: true,
              message: 'Please input an area!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label={
            <Button type="primary" size="small" onClick={getCurrentLocation}>
              <i className="fas fa-map-marker-alt" style={{ marginRight: 5 }} />{' '}
              Get Location
            </Button>
          }
          colon={false}
        >
          <Input disabled value={position} />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input an address!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="addressNumber"
          label="Address Number"
          rules={[
            {
              required: true,
              message: 'Please input an address number!',
              whitespace: false
            }
          ]}
        >
          <Input style={{ width: '20%' }} />
        </Form.Item>
        <Form.Item
          name="ticketType"
          label="Category"
          rules={[
            {
              required: true,
              message: 'Please pick a category!'
            }
          ]}
        >
          <Input.Group>
            <Select defaultValue="option1">
              <Option value="option1">Option1</Option>
              <Option value="option2">Option1</Option>
            </Select>
          </Input.Group>
        </Form.Item>
        <Form.Item name="importance" label="Importance">
          <Input.Group>
            <Select defaultValue="medium">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Input.Group>
        </Form.Item>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </Form>
    </>
  );
};

AddTicket.propTypes = {
  addTicket: PropTypes.func.isRequired
};

export default connect(null, { addTicket })(withRouter(AddTicket));
