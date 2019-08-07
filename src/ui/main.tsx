/*
|--------------------------------------------------------------------------
| React and Router
|--------------------------------------------------------------------------
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
/*
|--------------------------------------------------------------------------
| Some security things
|--------------------------------------------------------------------------
*/

// @ts-ignore
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`);
};

/*
|--------------------------------------------------------------------------
| Render the app
|--------------------------------------------------------------------------
*/

ReactDOM.render(<App/>,document.getElementById('wrap'));
