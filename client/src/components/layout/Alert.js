import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'antd';

/**
 * Alert types: error, warning, info, success
 * @param alerts
 * @returns {JSX.Element[]}
 * @constructor
 */
const AlertMsg = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Alert
      message={alert.alertType}
      description={alert.msg}
      type={alert.alertType}
      showIcon
    />
  ));

AlertMsg.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(AlertMsg);
