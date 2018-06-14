import React from 'react';


export default class OrderEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: [
        {id: 1, name: "pasta", price: 11.20, amount: 1},
        {id: 2, name: "seafood boiler", price: 22.20, amount: 2},
        {id: 3, name: "salad", price: 9.20, amount: 3}
      ]
    };
  }

  render() {
    return (
      <div>
      <ul>
        {this.state.dishes.map((dish) => {
          return (
            <li key={dish.id}>
              {dish.name}
              <button>+</button>
              {dish.amount}
              <button>-</button>
            </li>
          );
        })}
      </ul>
      <button className="btn btn-primary">Place Order</button>
      </div>
    );
  }
}