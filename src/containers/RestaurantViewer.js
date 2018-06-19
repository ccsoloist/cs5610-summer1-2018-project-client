import React from "react";
import DishList from "./DishList";
import OrderEditor from "./OrderEditor";
import * as constants from "../constants";
import RestaurantServiceClient from "../services/RestaurantServiceClient";

export default class RestaurantViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      yelpId: '',
      restaurant: {}
      // restaurant: {
      //   "id": 1,
      //   "yelpId": "y2w6rFaO0XEiG5mFfOsiFA",
      //   "name": "Neptune Oyster",
      //   "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/oF9AqeZFT3Kg0N4peP_-4A/o.jpg",
      //   "phone": "+16177423474",
      //   "display_phone": "(617) 742-3474",
      //   "address": "63 Salem St, Boston, MA 02113",
      //   "rating": 4,
      //   "category": "Seafood Bars "
      // }
    };

    this.restaurantService = RestaurantServiceClient.instance();
  }

  // componentDidMount() {
  //   let yelpId = this.props.match.params.yelpId;
  //
  //   this.setState({yelpId: yelpId});
  //
  //   let response =
  //     fetch(`http://localhost:8080/api/restaurant/${yelpId}`)
  //       .then(localResponse => {
  //         if (localResponse.status === 404) {
  //           return fetch(`http://localhost:8080/api/yelp/restaurant/${yelpId}`)
  //             .then(yelpResponse => yelpResponse.json())
  //         }
  //         else {
  //           return localResponse.json();
  //         }
  //       });
  //
  //   response.then((restaurant) => {
  //     this.setState({restaurant: restaurant});
  //   });
  // }
  //
  //
  // componentWillReceiveProps(newProps) {
  //   this.setState({yelpId: newProps.match.params.yelpId});
  //
  //
  //   let response =
  //     fetch(`http://localhost:8080/api/restaurant/${newProps.yelpId}`)
  //       .then(localResponse => {
  //         if (localResponse.status === 404) {
  //           return fetch(`http://localhost:8080/api/yelp/restaurant/${newProps.yelpId}`)
  //             .then(yelpResponse => yelpResponse.json())
  //         }
  //         else {
  //           return localResponse.json();
  //         }
  //       });
  //
  //   response.then((restaurant) => {
  //     this.setState({restaurant: restaurant});
  //   });
  // }

  componentDidMount() {
    let yelpId = this.props.match.params.yelpId;
    this.setState({yelpId: yelpId});

    this.restaurantService.findRestaurantByYelpId(yelpId)
      .then(restaurant => this.setState({restaurant: restaurant}));
  }

  componentWillReceiveProps(newProps) {
    let yelpId = newProps.match.params.yelpId;
    this.setState({yelpId: yelpId});

    this.restaurantService.findRestaurantByYelpId(yelpId)
      .then(restaurant => this.setState({restaurant: restaurant}));
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
            <a href="#">Logout</a>
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
                <i className="fa fa-heart-o col-2 text-right"
                   onClick={() => alert('love love')}></i>
              </h1>
            </div>
            <h3>Address: {this.state.restaurant.address}</h3>
            <h3>Phone: {this.state.restaurant.display_phone}</h3>
            <h3>{this.state.restaurant.category} Rating:{this.state.restaurant.rating}</h3>
          </div>
        </div>

        {this.state.restaurant.id !== 0 &&
        <div className='row'>
          <div className='col-4'>
            <h1>OrderEditor</h1>
            <OrderEditor/>
          </div>
          <div className='col-8'>
            <h1>Menu</h1>
            <DishList/>
          </div>
        </div>
        }

        {this.state.restaurant.id === 0 &&
        <div>This restaurant is currently not our partner. We're working on it.</div>
        }

      </div>
    )
  };
}