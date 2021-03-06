import React from 'react';
import {Link} from "react-router-dom";
import * as constants from "../constants";
import RestaurantServiceClient from "../services/RestaurantServiceClient";
import YelpServiceClient from "../services/YelpServiceClient";


export default class RestaurantGrid
  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      term: '',
      location: ''
    };

    this.yelpService = YelpServiceClient.instance();
    this.restaurantService = RestaurantServiceClient.instance();

    this.termChanged = this.termChanged.bind(this);
    this.locationChanged = this.locationChanged.bind(this);
    this.findRestaurantsByCriteria = this.findRestaurantsByCriteria.bind(this);
    this.redirectToRestaurant = this.redirectToRestaurant.bind(this);
  }

  componentDidMount() {
    this.yelpService.findAllRestaurants()
      .then(restaurants => this.setState({restaurants: restaurants}));
  }

  termChanged(event) {
    this.setState({term: event.target.value});
  }

  locationChanged(event) {
    this.setState({location: event.target.value});
  }
  
  findRestaurantsByCriteria() {
    if (this.state.location === '') {
      alert('please specify location');
    }

    else {
      if (this.state.term !== '') {
        this.yelpService.findRestaurantByTermAndLocation(this.state.term, this.state.location)
          .then(restaurants => this.setState({restaurants: restaurants}));
      }
      if (this.state.term === '' && this.state.location !== '') {
        this.yelpService.findRestaurantByLocation(this.state.location)
          .then(restaurants => this.setState({restaurants: restaurants}));
      }
    }
  }

  redirectToRestaurant(yelpId) {
    this.restaurantService.findRestaurantByYelpId(yelpId)
      .then(restaurant => {
        if (restaurant === null) {
          alert("Sorry, this restaurant is not our partner. We're working on it.");

        }
        else {
          this.props.history.push(`restaurant/${yelpId}`);
        }
      })
  }

  render() {
    return (
      <div>

        <div className="row container-fluid home-head">
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
                  onClick={this.findRestaurantsByCriteria}>
            <i className="fa fa-search"></i>
          </button>

          <div className="col-3 text-right">
            <Link to="/login">Login</Link>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            <Link to="/register">Register</Link>
          </div>
        </div>

        <div className="row" style={{margin: 20}}>
          {this.state.restaurants !== undefined &&
          this.state.restaurants.map((restaurant) => {
            return (
              <div className="col-3" key={restaurant.yelpId}>
              <div className="card" style={{marginBottom: 10}}>
                <img className="card-img-top" style={{width: 250, height: 200}}
                     src={restaurant.image_url} alt="Restaurant Image"/>
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{restaurant.category}</h6>
                  <small className="card-text">{restaurant.address}</small>
                </div>
                <div className="card-footer">
                  {/*<Link to={`restaurant/${restaurant.yelpId}`}>*/}
                  {/*View Detail*/}
                  {/*</Link>*/}
                  <button className="btn btn-outline-primary"
                          onClick={() => this.redirectToRestaurant(restaurant.yelpId)}>
                    View Detail
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>

      </div>
    );
  }
}



