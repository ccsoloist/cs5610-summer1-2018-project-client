import React from 'react';
import {Link} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import * as constants from "../constants";
import RestaurantServiceClient from "../services/RestaurantServiceClient";
import YelpServiceClient from "../services/YelpServiceClient";

export default class Home
  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
    };

    this.yelpService = YelpServiceClient.instance();
    this.restaurantService = RestaurantServiceClient.instance();

    this.termChanged = this.termChanged.bind(this);
    this.locationChanged = this.locationChanged.bind(this);
    this.findRestaurantsByCriteria = this.findRestaurantsByCriteria.bind(this);
    this.redirectToRestaurant = this.redirectToRestaurant.bind(this);
    this.updateRestaurants = this.updateRestaurants.bind(this);
  }

  componentDidMount() {
    this.yelpService.findAllRestaurants()
      .then(restaurants => this.setState({restaurants: restaurants}));
  }

  componentWillReceiveProps(newProps) {

  }

  termChanged(event) {
    this.setState({term: event.target.value});
  }

  locationChanged(event) {
    this.setState({location: event.target.value});
  }

  updateRestaurants(term, location) {
    this.setState({term: term});
    this.setState({location: location});

    this.findRestaurantsByCriteria(term, location);
  }


  findRestaurantsByCriteria(term, location) {
    if (location === '') {
      alert('please specify location');
    }

    else {
      if (term !== '') {
        this.yelpService.findRestaurantByTermAndLocation(term, location)
          .then(restaurants => this.setState({restaurants: restaurants}));
      }
      if (term === '' && location !== '') {
        this.yelpService.findRestaurantByLocation(location)
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
        <SearchBar action={this.updateRestaurants}/>

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



