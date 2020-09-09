import React from 'react';
import { connect } from 'react-redux';
import { dismissAlert } from '../../actions/common_actions.js';

// Alert toast which appears on screen when a message or an error is to be displayed
class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  closeAlert(e) {
    // Prevent default behaviour
    e.preventDefault();
    // Close alert
    this.props.dismissAlert();
  }

  render() {

    if (!this.props.alertMessage) {
      return <div/>;
    }

    return (
      <div className='toast-container'>
        <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <small className="mr-auto">Alert</small>
            <button type="button" className="ml-2 mb-1 close" onClick={e => this.closeAlert(e)}  data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className={`toast-body text-${this.props.alertType}`}>
            {this.props.alertMessage}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alertType: state.commonReducer.alertType,
  alertMessage: state.commonReducer.alertMessage
});

const mapDispatchToProps = {
  dismissAlert: dismissAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
