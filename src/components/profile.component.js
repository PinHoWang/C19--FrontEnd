import React from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { Toolbar } from '../components/Toolbar';
import { getUserInfo, updateUserInfo } from '../actions/userInfoActions';
import { withRouter } from 'react-router-dom';
import './profile.component.css';
import { Row, Col } from 'reactstrap';
import { FaUserEdit } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import MultiValuedSelect from './MultivaluedSelect';
import { skillsData } from '../constants';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import NotificationAlert from 'react-notification-alert';
/*
 * mapDispatchToProps
 */
const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (userId, access_token) =>
    dispatch(getUserInfo(userId, access_token)),
  updateUserInfo: (userId, access_token, userData) =>
    dispatch(updateUserInfo(userId, access_token, userData)),
});

const mapStateToProps = (state) => {
  const { getUserInfoReducer } = state;
  return {
    firstName: getUserInfoReducer.data.firstName,
    lastName: getUserInfoReducer.data.lastName,
    email: getUserInfoReducer.data.email,
    dateofBirth: getUserInfoReducer.data.dateofBirth,
    education: getUserInfoReducer.data.education,
    skills: getUserInfoReducer.data.skills,
    portfolioLink: getUserInfoReducer.data.portfolioLink,
    type: getUserInfoReducer.data.type,
  };
};
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      portfolio: null,
      type: '',
      skills: [],
      editMode: false,
    };
    this.update = this.update.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleCancel() {
    if (window.confirm('Are you sure you wish to cancel the changes?')) {
      ///reset data and disable edit mode
      this.setState({
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        skills: this.props.skills,
        portfolio: this.props.portfolioLink,
        editMode: false,
      });
    }
  }

  handleSave() {
    var postBody = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.props.email,
      dateofBirth: this.props.dateofBirth,
      education: this.props.education,
      skills: this.state.skills.toString(),
      portfolioLink: this.state.portfolio,
      type: this.state.type,
    };
    for (var key in postBody) {
      if (postBody[key] === null || postBody[key] === '') {
        this.refs.notify.notificationAlert({
          place: 'tc',
          message: (
            <div class="alert alert-danger" role="alert">
              Please input all the values!
            </div>
          ),
          type: 'danger',
          autoDismiss: 7,
        });
        return;
      }
    }
    const { updateUserInfo, cookies } = this.props;
    const accessInfo = cookies.get('access_info');
    updateUserInfo(accessInfo.userid, accessInfo.token, postBody)
      .then((message) => {
        console.log(message);
        this.refs.notify.notificationAlert({
          place: 'tc',
          message: (
            <div class="alert alert-success" role="alert">
              User changes saved successfully!
            </div>
          ),
          type: 'success',
          autoDismiss: 7,
        });
        this.setState({
          editMode: false,
        });
      })
      .catch((message) => {
        console.log(message);
        this.refs.notify.notificationAlert({
          place: 'tc',
          message: (
            <div class="alert alert-danger" role="alert">
              {message}
            </div>
          ),
          type: 'danger',
          autoDismiss: 7,
        });
      });
  }

  componentWillMount() {
    const { cookies, getUserInfo } = this.props;
    const accessInfo = cookies.get('access_info');
    if (accessInfo !== undefined) {
      ///user logged in
      getUserInfo(accessInfo.userid, accessInfo.token);
    } else {
      ///redirect to login page
      this.props.history.push('/');
    }
  }
  handleEdit() {
    this.setState({
      editMode: true,
    });
  }
  update(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  updateSkill(key, value) {
    this.setState({
      [key]: value,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.firstName,
      lastName: nextProps.lastName,
      skills: nextProps.skills,
      portfolio: nextProps.portfolioLink,
      type: nextProps.type,
    });
  }
  render() {
    return (
      <div>
        <Toolbar />
        <div class="card">
          <div class="container">
            <NotificationAlert ref="notify" />

            <Row>
              <Col md={8}>
                {' '}
                <h4>
                  <b>Profile</b>
                </h4>
              </Col>
              {!this.state.editMode && (
                <Col md={4}>
                  <button onClick={this.handleEdit} className="styledBtn">
                    Edit Profile <FaUserEdit />
                  </button>
                </Col>
              )}
            </Row>
            <label>First Name</label>
            <input
              required
              readOnly={!this.state.editMode}
              type="text"
              autoComplete="firstname"
              value={this.state.firstName}
              className="form-control"
              name="firstName"
              placeholder="First Name"
              onChange={this.update}
            />
            <label>Last Name</label>
            <input
              required
              readOnly={!this.state.editMode}
              type="text"
              autoComplete="lastname"
              className="form-control"
              name="lastName"
              value={this.state.lastName}
              placeholder="Last Name"
              onChange={this.update}
            />
            <div>
              <label>User type</label> <br />
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="type"
                  name="type"
                  value={this.state.type}
                >
                  <FormControlLabel
                    value="Researcher"
                    disabled
                    control={<Radio style={{ height: 10 }} />}
                    label="Researcher"
                  />
                  <FormControlLabel
                    disabled
                    value="Volunteer"
                    control={<Radio style={{ height: 10 }} />}
                    label="Volunteer"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <label>Skills</label>
              <MultiValuedSelect
                readOnly={!this.state.editMode}
                name="skills"
                selectedData={this.state.skills}
                data={skillsData}
                updateForm={(key, value) => this.updateSkill(key, value)}
              />
            </div>
            <div>
              <label>Portfolio link</label>
              <input
                readOnly={!this.state.editMode}
                required
                type="text"
                autoComplete="portfolio"
                className="form-control"
                name="portfolio"
                value={this.state.portfolio}
                placeholder="Portfolio link"
                onChange={this.update}
              />
            </div>
            {this.state.editMode && (
              <div>
                <button onClick={this.handleSave} className="styledBtn">
                  Save Changes <FaSave />
                </button>
                <button onClick={this.handleCancel} className="styledBtn">
                  Cancel <GiCancel />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))
);
