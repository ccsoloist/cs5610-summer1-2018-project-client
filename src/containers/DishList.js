import React from 'react';
import DishListItem from "../components/DishListItem";
import {reducer} from "../reducers";
import {DishListReducer} from "../reducers";
import {createStore} from "redux";
import {connect, Provider} from "react-redux";
import * as actions from "../actions/index";
import RestaurantServiceClient from "../services/RestaurantServiceClient";


class DishListContainer extends React.Component {

  constructor(props) {
    super(props);

    this.props.findAllDishesByOwner(this.props.restaurateurId);
  }

  // componentDidMount() {
  //   this.props.findAllDishesForRestaurant(this.props.restaurantId);
  // }

  componentWillReceiveProps(newProps) {
    if (newProps.restaurantId !== this.props.restaurantId) {
      this.props.findAllDishesForRestaurant(newProps.restaurantId);
    }
  }

  render() {
    let nameElement;
    let priceElement;

    return (
      <div className="col-12">
      <div className="container-fluid dish-list-editor">
        <div className="row text-center" style={{marginLeft: 30}}>
          <input className="form-control col-4"
                 placeholder="Dish Name"
                 type="text"
                 ref={(node) => (nameElement = node)}/>
          &nbsp;&nbsp;
          <input className="form-control col-4"
                 placeholder="Dish Price"
                 type="text"
                 ref={(node) => (priceElement = node)}/>
          &nbsp;&nbsp;
          <button className="btn btn-primary col-2"
                  onClick={() => this.props.addDish(nameElement.value,
                    priceElement.value,
                    this.props.dishes,
                    this.props.restaurantId)}>
            <i className="fa fa-plus"/>
          </button>
        </div>

        <br/>
        <table className="dish-list-table table table-hover">
          <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">price</th>
            <th className="text-center">&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {this.props.dishes.map(dish => {
            return (
              <DishListItem dish={dish}
                            key={dish.id}
                            restaurantId={this.props.restaurantId}
                            dishes={this.props.dishes}/>
            );
          })}
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}

const stateToPropsMapper = (state, ownProps) => {
  if (state !== undefined) {
    // console.log(state)
    return {
      dishes: state.dishes,
      restaurantId: state.restaurantId
    }
  }
  if (ownProps !== undefined) {
    return {
      dishes: [],
      restaurantId: ownProps.restaurantId,
    }
  }
};

const dispatcherToPropsMapper = (dispatch) => ({
  addDish: (dishName, dishPrice, dishes, restaurantId) =>
    actions.addDish(dispatch, dishName, dishPrice, dishes, restaurantId),
  findAllDishesForRestaurant: (restaurantId) =>
    actions.findAllDishesForRestaurant(dispatch, restaurantId),
  findAllDishesByOwner: (restaurateurId) =>
    actions.findAllDishesByOwner(dispatch, restaurateurId)
});

const DishListConnected =
  connect(
    stateToPropsMapper,
    dispatcherToPropsMapper)(DishListContainer);

const store = createStore(DishListReducer);


class DishList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurateurId: this.props.match.params.userId,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <DishListConnected restaurateurId={this.state.restaurateurId}/>
      </Provider>
    );
  }
}

export default DishList;