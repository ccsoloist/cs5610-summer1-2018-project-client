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
      restaurants: []
    };

    this.favoriteService = FavoriteServiceClient.instance();
    this.restaurantService = RestaurantServiceClient.instance();
  }

  componentDidMount() {
    this.favoriteService.findFavoritesForUser(this.props.match.params.userId)
      .then(restaurants => {
        this.setState({restaurants: restaurants});
      })
  }

  componentWillReceiveProps(newProps) {
    this.favoriteService.findFavoritesForUser(newProps.match.params.userId)
      .then(restaurants => {
        this.setState({restaurants: restaurants});
      })
  }

  render() {
    return (
      <div className="col-12">
      <div className="list-group favorite-list">
        <div className="list-group-item list-group-item-primary text-center">Favorite Restaurants</div>
        {this.state.restaurants.map(restaurant => {
          return (
            <div className="list-group-item  text-center"
                 key={restaurant.id}>
              <Link to={`/restaurant/${restaurant.yelpId}`}
                    onClick={() => {
                      this.context.router.push(`/restaurant/${restaurant.yelpId}`)}}>
                {restaurant.name}
              </Link>
            </div>
          );
        })}
      </div>
      </div>
    );
  }
}