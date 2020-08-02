import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Tooltip, Checkbox, Button, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { formItemLayout, tailFormItemLayout } from './formLayoutSpan';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm: '',
    name: '',
    agreement: ''
  });

  const onValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const { email, password } = formData;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    // MAKE POST REQUEST
  };

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <Form
        {...formItemLayout}
        form={form}
        name="login"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};

export default Register;
