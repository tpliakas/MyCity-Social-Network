import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Form, Input, Tooltip, Checkbox, Button, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { formItemLayout, tailFormItemLayout } from './formLayoutSpan';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email, password, confirm, name, agreement } = values;

    if (password !== confirm) {
      setAlert('Passwords do not match', 'error');
    } else if (!agreement) {
      setAlert('You have to accept the agreement', 'error');
    } else {
      register({ name, email, password });
    }
  };

  const showAgreementAction = () => setShowModal(false);

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          extra="This site uses Gravatar so if you want a profile image, use a
            Gravatar email."
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
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'The two passwords that you entered do not match!'
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="name"
          label={
            <span>
              Full Name &nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('Should accept agreement')
            }
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the{' '}
            <a href="#0" onClick={() => setShowModal(true)}>
              agreement
            </a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Terms of Service"
        visible={showModal}
        onOk={showAgreementAction}
        onCancel={showAgreementAction}
        cancelButtonProps={{ style: { display: 'none' } }}
        maskClosable
      >
        <p>
          Facebook builds technologies and services that enable people to
          connect with each other, build communities, and grow businesses. These
          Terms govern your use of Facebook, Messenger, and the other products,
          features, apps, services, technologies, and software we offer (the
          Facebook Products or Products), except where we expressly state that
          separate terms (and not these) apply. These Products are provided to
          you by Facebook Ireland Limited.{' '}
        </p>
        <p>
          We don’t charge you to use Facebook or the other products and services
          covered by these Terms. Instead, businesses and organizations pay us
          to show you ads for their products and services. By using our
          Products, you agree that we can show you ads that we think will be
          relevant to you and your interests. We use your personal data to help
          determine which ads to show you.{' '}
        </p>
        <p>
          We don’t sell your personal data to advertisers, and we don’t share
          information that directly identifies you (such as your name, email
          address or other contact information) with advertisers unless you give
          us specific permission. Instead, advertisers can tell us things like
          the kind of audience they want to see their ads, and we show those ads
          to people who may be interested. We provide advertisers with reports
          about the performance of their ads that help them understand how
          people are interacting with their content. See Section 2 below to
          learn more.{' '}
        </p>
        <p>
          Our Data Policy explains how we collect and use your personal data to
          determine some of the ads you see and provide all of the other
          services described below. You can also go to your settings at any time
          to review the privacy choices you have about how we use your data.{' '}
        </p>{' '}
      </Modal>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
