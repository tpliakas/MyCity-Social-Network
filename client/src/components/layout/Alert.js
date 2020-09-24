import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) =>
    alert.alertType === 'success'
      ? message.success(alert.msg)
      : alert.alertType === 'error'
      ? message.error(alert.msg)
      : alert.alertType === 'danger'
      ? message.warning(alert.msg)
      : message.info(alert.msg)
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
