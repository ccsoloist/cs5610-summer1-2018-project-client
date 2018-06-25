import React from 'react';
import {connect} from "react-redux";
import FavoriteServiceClient from "../services/FavoriteServiceClient";
import Link from "react-router-dom/es/Link";
import RestaurantServiceClient from "../services/RestaurantServiceClient";

export default class FavoriteList
  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.userId,
      customers: []
    };

    this.favoriteService = FavoriteServiceClient.instance();
    this.restaurantService = RestaurantServiceClient.instance();
  }

  componentDidMount() {
    this.restaurantService.findRestaurantByOwner(this.props.match.params.userId)
      .then(restaurant => {
        this.favoriteService.findFollowersForRestaurant(restaurant.id)
          .then(customers => {
            this.setState({customers: customers})
          })
      })
  }

  componentWillReceiveProps(newProps) {
    this.restaurantService.findRestaurantByOwner(newProps.match.params.userId)
      .then(restaurant => {
        this.favoriteService.findFollowersForRestaurant(restaurant.id)
          .then(customers => {
            this.setState({customers: customers})
          })
      })
  }

  render() {
    return (
      <div className="col-12">
      <div className="list-group  favorite-list">
        <div className="list-group-item list-group-item-primary text-center">Followers</div>
        {this.state.customers.map(customer => {
          return (
            <div className="list-group-item  text-center"
                 key={customer.id}>
              {customer.username}
            </div>
          );
        })}
      </div>
      </div>
    );
  }
}