import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import * as models from './models';

import './index.css';

ReactDOM.render(
  <Provider {...models}>
    <BrowserRouter>
       <Route path='/' component={App} />
    </BrowserRouter>
  </Provider>,
   document.getElementById('root')
);
registerServiceWorker();
