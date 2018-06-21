import React from 'react';
import DishListItem from "../components/DishListItem";
import {reducer} from "../reducers";
import {createStore} from "redux";
import {connect, Provider} from "react-redux";
import * as actions from "../actions/index";


class DishListContainer extends React.Component {

  constructor(props) {
    super(props);

    this.props.findAllDishesForRestaurant(this.props.restaurantId);
    // this.state = {
    //   dishes: this.props.dishes
    // }
  }

  // componentDidMount() {
  //   this.props.findAllDishesForRestaurant(this.props.restaurantId);
  // }

  componentWillReceiveProps(newProps) {
    if (newProps.restaurantId !== this.props.restaurantId) {
      this.props.findAllDishesForRestaurant(newProps.restaurantId);
    }
  }


  // componentDidMount() {
  //   this.setState({dishes: this.props.dishes});
  // }


  render() {
    let nameElement;
    let priceElement;

    console.log('in dish list render');
    console.log(this.props);

    // console.log(this.props.dishes);
    return (
      <div className="container-fluid">
        <div>
          <input className="form-control col-4"
                 placeholder="Dish Name"
                 type="text"
                 ref={(node) => (nameElement = node)}/>
          <input className="form-control col-4"
                 placeholder="Dish Price"
                 type="text"
                 ref={(node) => (priceElement = node)}/>
          <button className="btn btn-primary col-2"
                  onClick={() => this.props.addDish(nameElement.value,
                    priceElement.value,
                    this.props.dishes,
                    this.props.restaurantId)}>
            Add Dish
          </button>
        </div>

        <table className="table table-hover">
          <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">price</th>
            <th className="text-center">&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          {this.props.dishes.map((dish) => {
            alert('dish');
            console.log(dish);

            return (
              <DishListItem dish={dish}
                            key={dish.position}
                // deleteDish={() => this.props.deleteDish}
                            dishes={this.state.dishes}
                            restaurantId={this.props.restaurantId}/>
            );
          })}
          </tbody>
        </table>
        <button className="btn btn-primary btn-block"
                onClick={() => this.props.saveAllDishesForRestaurant(this.props.restaurantId, this.props.dishes)}>Save
          changes
        </button>

      </div>
    )
  }
};

const stateToPropsMapper = (state, ownProps) => {
  if (state !== undefined) {
    console.log(state.dishes);
    return {
      dishes: state.dishes,
      restaurantId: ownProps.restaurantId
    }
  }
  // if (ownProps !== undefined) {
  return {
    dishes: [],
    restaurantId: ownProps.restaurantId,
  }
  // }
};

const dispatcherToPropsMapper = (dispatch) => ({
  deleteDish: (dishId, position, dishes, restaurantId) => actions.deleteDish(dispatch, dishId, position, dishes, restaurantId),
  addDish: (dishName, dishPrice, dishes, restaurantId) => actions.addDish(dispatch, dishName, dishPrice, dishes, restaurantId),
  findAllDishesForRestaurant: (restaurantId) => actions.findAllDishesForRestaurant(dispatch, restaurantId),
  saveAllDishesForRestaurant: (restaurantId, dishes) => actions.saveAllDishesForRestaurantId(dispatch, restaurantId, dishes)
});

const DishListConnected =
  connect(
    stateToPropsMapper,
    dispatcherToPropsMapper)(DishListContainer);

const store = createStore(reducer);

const DishList2 = state => {
  return (
    <Provider store={store}>
      <DishListConnected restaurantId={state.restaurantId}/>
    </Provider>
  );
};

export default DishList2;