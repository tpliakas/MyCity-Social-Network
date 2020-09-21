import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert as AntdAlert, notification } from 'antd';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) =>
    notification.open({
      description: (
        <AntdAlert
          message={alert.alertType}
          description={alert.msg}
          type={alert.alertType}
          key={alert.id}
          showIcon
        />
      ),
      placement: `bottomRight`
    })
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
