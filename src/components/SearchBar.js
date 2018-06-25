import React from 'react';
import {Link}from "react-router-dom";
import YelpServiceClient from "../services/YelpServiceClient";
import RestaurantServiceClient from "../services/RestaurantServiceClient";
import UserServiceClient from "../services/UserServiceClient";


export default class SearchBar
  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      location: ''
    };

    this.termChanged = this.termChanged.bind(this);
    this.locationChanged = this.locationChanged.bind(this);

    this.userService = UserServiceClient.instance();
  }

  termChanged(event) {
    this.setState({term: event.target.value});
  }

  locationChanged(event) {
    this.setState({location: event.target.value});
  }

  logout() {
    this.userService.logout();
  }

  render() {
    return (
      <div className="row container-fluid home-search-bar">
        <h2 className="col-2">Hungya</h2>

        <input className="form-control col-3"
               placeholder="Restaurant, Category..."
               type="text"
               onChange={this.termChanged}/>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input className="form-control col-3"
               placeholder="Location"
               type="text"
               onChange={this.locationChanged}/>
        <button className="btn btn-primary"
                onClick={() => this.props.action(this.state.term, this.state.location)}>
          <i className="fa fa-search"></i>
        </button>

        <div className="col-3 text-right">
          {this.props.user !== undefined &&
          <Link to={`/profile/customer/${this.props.user.id}`}>Profile&nbsp;&nbsp;/&nbsp;&nbsp;</Link>}
          {this.props.user !== undefined &&
          <Link to='/'
                onClick={() => this.logout()}>Logout</Link>}

          {this.props.user === undefined &&
          <Link to="/login">Login&nbsp;&nbsp;/&nbsp;&nbsp;</Link>}
          {this.props.user === undefined &&
          <Link to="/register">Register</Link>}
        </div>

      </div>
      );
  }
}