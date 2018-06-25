import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import RestaurantGrid from "./containers/RestaurantGrid";
import {Router} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import RestaurantViewer from "./containers/RestaurantViewer";
import App from "./containers/App";
import DishList from "./containers/DishList";
import {reducer} from "./reducers";
import {createStore} from "redux";
import {Provider} from "react-redux";
import Menu from "./containers/Menu";
import Home from "./containers/Home";
import FavoriteList from "./containers/FavoriteList";
import AdminPage from "./containers/AdminPage";


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);