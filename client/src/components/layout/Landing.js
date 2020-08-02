import React from 'react';
import { Button, Col, Row } from 'antd';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">MyCity Social Network</h1>
          <p className="lead">
            Create a profile, share posts and add issues to make your city
            better!qd
          </p>
          <div className="buttons">
            <Row>
              <Col span={12}>
                <Button type="primary" size="large" href="register.html">
                  Sign Up
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" size="large" href="login.html">
                  Login
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
