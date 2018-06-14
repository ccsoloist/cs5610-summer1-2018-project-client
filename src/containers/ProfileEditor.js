import React, {Component} from 'react'
import * as constants from '../constants'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from '../reducers'
import {Link} from 'react-router-dom'
import * as actions from '../actions'
import '../styles/index.css'
import ProfileTabs from './ProfileTabs'
import AccountEditor from './AccountEditor'
import OrderList from './OrderList'
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


class ProfileEditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType:'',
      userId:''
    };
  }

  componentDidMount() {
    // this.setState({userType:this.props.match.params.userType,
    // userId: this.props.match.params.userId});

    var address = window.location.pathname.split('/profile/')[1].split('/');
    let userType = address[0];
    let userId = address[1];
    this.setState({userType: userType, userId: userId});
  }

  render() {
    return (
      <Router>
        <div className="profile-editor-container">
          <div className="profile-editor form-group row container-fluid">
            <div className="col-4">
              <ProfileTabs userId={this.state.userId} userType={this.state.userType}/>
            </div>
            <div className="col-8">
              <Switch className="container-fluid">
                <Route path="/profile/:userType/:userId/account" component={AccountEditor}/>
                <Route path="/profile/:userType/:userId/orders" component={OrderList}/>
                {/*<Route path="/profile/dishes" component={DishList}/>*/}
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
};

// const stateToPropsMapper = state => (state);

const dispatcherToPropsMapper = dispatch => ({});

const ProfileEditorConnected = connect(
  // stateToPropsMapper,
  dispatcherToPropsMapper)
(ProfileEditorContainer);

const store = createStore(reducer);

const ProfileEditor = state => (
  <Provider store={store}>
    <ProfileEditorConnected/>
  </Provider>
);

export default ProfileEditor;