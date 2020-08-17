import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">MyCity Social Network</h1>
          <p className="lead">
            Create a profile, share posts and add issues to make your city
            better!
          </p>
          <div className="buttons">
            <Button type="primary" size="large">
              <Link to="/register">Sign Up</Link>
            </Button>

            <Button type="default" size="large" className="login">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
