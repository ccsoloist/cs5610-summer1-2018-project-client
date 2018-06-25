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
import UserServiceClient from "../services/UserServiceClient";
import DishList from "./DishList";
import FavoriteList from "./FavoriteList";
import RestaurantViewer from "./RestaurantViewer";
import Home from "./Home";
import FollowerList from "./FollowerList";


class ProfileEditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType:'',
      userId:'',
      user:{},
      isAdmin: false
    };

    this.userService = UserServiceClient.instance();
  }

  componentDidMount() {
    this.setState({isAdmin: window.location.pathname.split('/')[1] === "admin"});
    var address = window.location.pathname.split('/profile/')[1].split('/');
    let userType = address[0];
    let userId = address[1];
    this.setState({userType: userType, userId: userId});

    this.userService.findAccountInfoForUser(userType, userId)
      .then(user => this.setState({user: user}));
  }

  componentWillReceiveProps(newProps) {
    var address = window.location.pathname.split('/profile/')[1].split('/');
    let userType = address[0];
    let userId = address[1];
    this.setState({userType: userType, userId: userId});

    this.userService.findAccountInfoForUser(userType, userId)
      .then(user => this.setState({user: user}));
  }

  render() {
    return (
      <Router>
        <div className="profile-editor-container">
          <div className="profile-editor form-group container-fluid">
            <ProfileTabs isAdmin={this.state.isAdmin}
                         userId={this.state.userId}
                         userType={this.state.userType}/>
            <div className="row">
              <Switch className="container-fluid">
                <Route path="/profile/:userType/:userId/account" component={AccountEditor}/>
                <Route path="/profile/:userType/:userId/orders" component={OrderList}/>
                <Route path="/profile/:userType/:userId/dishes" component={DishList}/>
                <Route path="/profile/:userType/:userId/favorite" component={FavoriteList}/>
                <Route path="/profile/:userType/:userId/followers" component={FollowerList}/>

                <Route path="/:isAdmin/profile/:userType/:userId/account" component={AccountEditor}/>
                <Route path="/:isAdmin/profile/:userType/:userId/orders" component={OrderList}/>
                <Route path="/:isAdmin/profile/:userType/:userId/dishes" component={DishList}/>
                <Route path="/:isAdmin/profile/:userType/:userId/favorite" component={FavoriteList}/>
                <Route path="/:isAdmin/profile/:userType/:userId/followers" component={FollowerList}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

const stateToPropsMapper = (state, ownProps) => {
  if (state !== undefined) {
    return state;
  }
  return ownProps;
};

const dispatcherToPropsMapper = dispatch => ({});

const ProfileEditorConnected = connect(
  stateToPropsMapper,
  dispatcherToPropsMapper)
(ProfileEditorContainer);

const store = createStore(reducer);

const ProfileEditor = state => (
  <Provider store={store}>
    <ProfileEditorConnected/>
  </Provider>
);

export default ProfileEditor;