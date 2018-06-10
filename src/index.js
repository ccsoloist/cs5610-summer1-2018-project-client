import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(
    <div>
        <h1>Are you hungry?</h1>
        <button onClick={() => alert('Frostmourne hungers')}>no</button>
    </div>
    ,
    document.getElementById('root')
);

