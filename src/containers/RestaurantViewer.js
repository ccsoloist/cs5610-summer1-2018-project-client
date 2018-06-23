import React from "react";
import OrderEditor from "./OrderEditor";
import * as constants from "../constants";
import RestaurantServiceClient from "../services/RestaurantServiceClient";
import DishServiceClient from "../services/DishServiceClient";
import Menu from "./Menu";
import OrderWidget from "../components/OrderWidget";
import PlaceOrderWidget from "./PlaceOrderWidget";
import Link from "react-router-dom/es/Link";
import UserServiceClient from "../services/UserServiceClient";
import FavoriteServiceClient from "../services/FavoriteServiceClient";

export default class RestaurantViewer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      yelpId: this.props.match.params.yelpId,
      restaurant: {},
    };

    this.logout = this.logout.bind(this);
    this.restaurantService = RestaurantServiceClient.instance();
    this.userService = UserServiceClient.instance();
    this.favoriteService = FavoriteServiceClient.instance();
  }

  componentDidMount() {
    let yelpId = this.props.match.params.yelpId;
    this.setState({yelpId: yelpId});

    let response =
      fetch(`http://localhost:8080/api/restaurant/yelp/${yelpId}`)
        .then(localResponse => {
          if (localResponse.status === 404) {
            return fetch(`http://localhost:8080/api/yelp/restaurant/${yelpId}`)
              .then(yelpResponse => yelpResponse.json())
          }
          else {
            return localResponse.json();
          }
        });

    response.then((restaurant) => {
      this.setState({restaurant: restaurant});
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({yelpId: newProps.match.params.yelpId});

    let response =
      fetch(`http://localhost:8080/api/restaurant/yelp/${newProps.yelpId}`)
        .then(localResponse => {
          if (localResponse.status === 404) {
            return fetch(`http://localhost:8080/api/yelp/restaurant/${newProps.yelpId}`)
              .then(yelpResponse => yelpResponse.json())
          }
          else {
            return localResponse.json();
          }
        });

    response.then((restaurant) => {
      this.setState({restaurant: restaurant});
    });
  }

  likes(restaurantId) {
    this.favoriteService.customerLikesRestaurant(restaurantId);
  }

  // componentDidMount() {
  //   let restaurantId = this.props.match.params.restaurantId;
  //
  //   this.setState({restaurantId: restaurantId});
  //   this.restaurantService.findRestaurantById(restaurantId)
  //     .then(restaurant => this.setState({restaurant: restaurant}));
  // }
  //
  // componentWillReceiveProps(newProps) {
  //   let restaurantId = newProps.match.params.restaurantId;
  //
  //   this.setState({restaurantId: restaurantId});
  //   this.restaurantService.findRestaurantById(restaurantId)
  //     .then(restaurant => this.setState({restaurant: restaurant}));
  // }

  logout() {
    this.userService.logout();
  }

  render() {
    return (
      <div className="container-fluid">

        <div className="row restaurant-search-bar">
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

          <div className="col-3 text-center">
            <i className="fa fa-user"></i>
            <span>Welcome, username!</span>
            <Link to="/"
            onClick={() => this.logout()}>Logout</Link>
            <i className="fa fa-sign-out col-1"></i>
          </div>
        </div>

        <div className='row' style={{marginBottom: 20}}>
          <div className="col-4">
            <img src={this.state.restaurant.image_url} height={180} width={300}/>
          </div>

          <div className="col-8">
            <div className="row">
              <h1>{this.state.restaurant.name}
                {this.state.restaurant.id !== 0 && <i className="fa fa-heart-o col-2 text-right"
                   onClick={() => this.likes(this.state.restaurant.id)}></i>}
              </h1>
            </div>
            <h3>Address: {this.state.restaurant.address}</h3>
            <h3>Phone: {this.state.restaurant.display_phone}</h3>
            <h3>{this.state.restaurant.category} Rating:{this.state.restaurant.rating}</h3>
          </div>
        </div>


        {(this.state.restaurant.id !== undefined && this.state.restaurant.id !== 0)
        && <PlaceOrderWidget restaurantId={this.state.restaurant.id}/>}
      </div>
    )
  };
}