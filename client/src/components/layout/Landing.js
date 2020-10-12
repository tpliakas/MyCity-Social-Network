import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import logo from '../../img/logo.png';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const responseSuccessGoogle = (res) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}/google-login`,
      data: { idToken: res.tokenId }
    })
      .then((res) => {
        console.log('google signin success', res);
      })
      .catch((err) => {
        console.log('google signin error', err);
      });
  };

  const responseErrorGoogle = (res) => {};

  return (
    <section className="landing">
      <div className="landing-inner">
        <img src={logo} alt="big-logo" width="200" />
        <div className="landing-slogan">
          <motion.div
            initial={{ x: '150px', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 1.2 } }}
          >
            <h1 className="x-large">MyCity Social Network</h1>
            <p className="lead">
              Create a profile, share posts and add issues to make your city
              better!
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ x: '-150px', opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 1.2 } }}
        >
          <div className="buttons">
            <Button type="primary" size="large">
              <Link to="/register">Sign Up</Link>
            </Button>

            <Button type="default" size="large" className="login">
              <Link to="/login">Sign In</Link>
            </Button>
            <br />
            <br />
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <>
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    type="default"
                    size="large"
                    className="login"
                  >
                    <i className="fab fa-google" />
                    Login with Google
                  </Button>
                </>
              )}
            />
          </div>
        </motion.div>
      </div>
      <div className="green-city" />
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
