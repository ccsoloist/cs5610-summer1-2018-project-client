import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import RestaurantGrid from "./containers/RestaurantGrid";
import Home from "./containers/Home";
import {Router} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import RestaurantViewer from "./containers/RestaurantViewer";


ReactDOM.render(
  <Home/>,
  document.getElementById('root')
);


{/*<Home/>,*/}

{/*<div>*/
}
{/*<Route path='/signin' component={SignIn}></Route>*/
}
{/*<Route path='/register' component={Register}></Route>*/
}
{/*</div>*/
}