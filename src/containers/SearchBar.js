import React from 'react';
import {Link} from "react-router-dom";

export default class SearchBar extends React.Component {
  render() {
    return (
      <div className="row">
        <h2 className="col-2">Hungya</h2>
        <input className="form-control"
               placeholder="Restaurant, Category..."
               type="text"/>
        <input className="form-control"
               placeholder="Location"
               type="text"/>
        <i className="fa fa-search"></i>
        <span>
        <a href="#">Signin</a>
          &nbsp;/&nbsp;
          <a href="#">Register</a>
        </span>
      </div>
    );
  }
}


// {/*<div className='row container-fluid'>*/}
//   {/*<input className='form-control col-7'*/}
//          {/*type='text'*/}
//          {/*placeholder='restaurant, category, location...'/>*/}
//   {/*<button className="btn btn-primary">*/}
//     {/*<i className='fa fa-search'></i>*/}
//   {/*</button>*/}
//   {/*<div className='col-4'>*/}
//     {/*<a href='#'>Sign In</a>*/}
//     {/*&nbsp;/&nbsp;*/}
//     {/*<a href='#'>Sign Up</a>*/}
//     {/*/!*<Link to='/signin'>Sign In</Link>*!/*/}
//     {/*/!*/*!/*/}
//     {/*/!*<Link to='/register'>Sign Up</Link>*!/*/}
//   {/*</div>*/}
// {/*</div>*/}