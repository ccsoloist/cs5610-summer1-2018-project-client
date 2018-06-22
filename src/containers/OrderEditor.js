import React from 'react';
import {connect} from "react-redux";



const OrderEditorContainer = () => {
  return (
    <div>
      <ul>
        {/*{this.props.dishes.map((dish) => {*/}
          {/*return (*/}
            {/*<li key={dish.id}>*/}
              {/*{dish.name}*/}
              {/*<button>+</button>*/}
              {/*{dish.amount}*/}
              {/*<button>-</button>*/}
            {/*</li>*/}
          {/*);*/}
        {/*})}*/}
        hello
      </ul>
      <button className="btn btn-primary">Place Order</button>
    </div>
  );
} ;

const dispatcherToPropsMapper = (dispatch) => ({

});

const stateToPropsMapper = (state, ownProps) => {
  console.log('in order editor');
  console.log(state);



  if (state === undefined) {
    return {
      items: []
    };
  }
};

const OrderEditor = connect(stateToPropsMapper, dispatcherToPropsMapper)(OrderEditorContainer);

export default OrderEditor;