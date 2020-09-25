import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <motion.div
            initial={{ x: '500px', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 1.2 } }}
          >
            <h1 className="x-large">MyCity Social Network</h1>
            <p className="lead">
              Create a profile, share posts and add issues to make your city
              better!
            </p>
          </motion.div>
          <motion.div
            initial={{ x: '-500px', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 1.2 } }}
          >
            <div className="buttons">
              <Button type="primary" size="large">
                <Link to="/register">Sign Up</Link>
              </Button>

              <Button type="default" size="large" className="login">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
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
