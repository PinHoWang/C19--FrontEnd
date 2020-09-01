import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import NotificationAlert from 'react-notification-alert';
import { RecentJobs } from './components';
import { getUserInfo } from '../../actions/userInfoActions';
import { Toolbar } from '../Toolbar';
import './styles/index.css';

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (userId, access_token) =>
    dispatch(getUserInfo(userId, access_token)),
});

const mapStateToProps = (state) => {
  const { getUserInfoReducer } = state;
  return {
    status: getUserInfoReducer.status,
    data: getUserInfoReducer.data,
    message: getUserInfoReducer.message,
    error: getUserInfoReducer.error,
  };
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
  }
  componentWillMount() {
    const { cookies, getUserInfo } = this.props;
    const accessInfo = cookies.get('access_info');
    if (accessInfo !== undefined) {
      ///user logged in
      getUserInfo(accessInfo.userid, accessInfo.token);
    } else {
      ///redirect to homepage
      this.props.history.push('/');
    }
  }
  componentDidUpdate() {
    this.props.status === 'error' &&
      this.refs.errornotify.notificationAlert({
        place: 'tc',
        message: <div>{this.props.error}</div>,
        type: 'danger',
        autoDismiss: 7,
      });
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true });
  }

  render() {
    const { data } = this.props;
    const { dialogOpen } = this.state;
    return (
      <div>
        <NotificationAlert ref="errornotify" />
        <Toolbar />
        <div className="outerContainer">
          <RecentJobs
            viewer={data}
            dialogOpen={dialogOpen}
            handleDialogClose={this.handleDialogClose}
            handleDialogOpen={this.handleDialogOpen}
          />
          <div
            class="card text-white mb-3"
            style={{
              marginLeft: 10,
              height: 'max-content',
              backgroundColor: '#d41b2c',
            }}
          >
            <div class="card-body">
              <h5 class="card-title">
                Welcome back!
                <br /> {data.firstName} {data.lastName}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(
  withCookies(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
);
