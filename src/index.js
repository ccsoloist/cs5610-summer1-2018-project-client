import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';


import RestaurantGrid from "./containers/RestaurantGrid";
import {Router} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import RestaurantViewer from "./containers/RestaurantViewer";
import App from "./containers/App";


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);