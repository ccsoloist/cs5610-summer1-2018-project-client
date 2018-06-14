import React from 'react';

export default class DishList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: [
        {id: 1, name: "pasta", price: 11.20},
        {id: 2, name: "seafood boiler", price: 22.20},
        {id: 3, name: "salad", price: 9.20}
      ]
    };
  }


  render() {
    return (
      <table className="table table-stripped">
        <thead>
        <tr>
          <th className="text-center">Name</th>
          <th className="text-center">price</th>
          <th className="text-center">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        {this.state.dishes.map((dish) => {
          return (
            <tr key={dish.id}>
              <td className="text-center">{dish.name}</td>
              <td className="text-center">{dish.price}</td>
              <td className="text-center"><button className="btn btn-primary">Add to Order</button></td>
            </tr>
          );
        })}

        </tbody>
      </table>
    );
  }

}