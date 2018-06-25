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
import SearchBar from "../components/SearchBar";

export default class RestaurantViewer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      yelpId: this.props.match.params.yelpId,
      restaurant: {},
      isLiked: false,
      user: {}
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

      this.userService.findCurrentUser()
        .then(user => {
          this.setState({user: user});
        });

      if (restaurant.id !== 0) {
        this.favoriteService.findFavorite(restaurant.id)
          .then(response => {
            if (response) {
              this.setState({isLiked: true})
            }
            else {
              this.setState({isLiked: false})
            }
          });
      }
    })
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

      this.userService.findCurrentUser()
        .then(user => {
          this.setState({user: user});
        });

      if (restaurant.id !== 0) {
        this.favoriteService.findFavorite(restaurant.id)
          .then(response => {
            if (response) {
              this.setState({isLiked: true})
            }
            else {
              this.setState({isLiked: false})
            }
          });
      }
    })
  }

  like(restaurantId) {
    this.favoriteService.customerLikesRestaurant(restaurantId)
      .then((response) => {
        this.setState({isLiked: response})
      });
  }

  unlike(restaurantId) {
    this.favoriteService.customerUnlikesRestaurant(restaurantId)
      .then((response) => {
        this.setState({isLiked: response})
      })
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
          <h2 className="col-2"
              onClick={() => this.props.history.push('/')}>Hungya</h2>
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
                  onClick={this.findRestaurantsByCriteria}>
            <i className="fa fa-search"/>
          </button>

          <div className="col-3 text-right">

            {this.state.user !== undefined &&
            <Link to={`/profile/customer/${this.state.user.id}`}>Profile&nbsp;&nbsp;/&nbsp;&nbsp;</Link>}
            {this.state.user !== undefined &&
            <Link to='/'
                  onClick={() => this.logout()}>Logout</Link>}

            {this.state.user === undefined &&
            <Link to="/login">Login&nbsp;&nbsp;/&nbsp;&nbsp;</Link>}
            {this.state.user === undefined &&
            <Link to="/register">Register</Link>}
          </div>

        </div>

        <div className='row restaurant-detail' style={{marginBottom: 20}}>
          <div className="col-4">
            <img src={this.state.restaurant.image_url} height={180} width={300}/>
          </div>
          <div className="col-1"></div>
          <div className="col-6">
            <div className="row">
              <h3>{this.state.restaurant.name}
                {(this.state.restaurant.id !== 0 && !this.state.isLiked)
                && <i className="fa fa-heart-o col-2 text-right"
                      onClick={() => this.like(this.state.restaurant.id)}/>}
                {(this.state.restaurant.id !== 0 && this.state.isLiked)
                && <i className="fa fa-heart col-2 text-right"
                      onClick={() => this.unlike(this.state.restaurant.id)}/>}
              </h3>
            </div>
            <div>
              <h4>Address: {this.state.restaurant.address}</h4>
              <h4>Phone: {this.state.restaurant.display_phone}</h4>
              <h4>Category: {this.state.restaurant.category}</h4>
              <h4>Rating: {this.state.restaurant.rating}</h4>
            </div>
          </div>
        </div>

        {(this.state.restaurant.id !== undefined && this.state.restaurant.id !== 0)
        && <PlaceOrderWidget restaurantId={this.state.restaurant.id}/>}
      </div>
    )
  };
}