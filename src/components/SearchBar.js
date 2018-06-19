import React from 'react';
import Link from "react-router-dom/es/Link";
import YelpServiceClient from "../services/YelpServiceClient";
import RestaurantServiceClient from "../services/RestaurantServiceClient";


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
  }

  termChanged(event) {
    this.setState({term: event.target.value});
  }

  locationChanged(event) {
    this.setState({location: event.target.value});
  }

  render() {
    return (
      <div className="row container-fluid home-search-bar">
        <h2 className="col-2">Hungya</h2>

        <input className="form-control col-3"
               placeholder="Restaurant, Category..."
               type="text"
               onChange={this.termChanged}/>
        <input className="form-control col-3"
               placeholder="Location"
               type="text"
               onChange={this.locationChanged}/>
        <button className="btn btn-primary"
                onClick={() => this.props.action(this.state.term, this.state.location)}>
          <i className="fa fa-search"></i>
        </button>

        <div className="col-3 text-right">
          <Link to="/login">Login</Link>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <Link to="/register">Register</Link>
        </div>
      </div>
      );
  }
}