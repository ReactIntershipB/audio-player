import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import * as models from './models';
import { appUI } from './AppUI';

import './index.css';

ReactDOM.render(
  <Provider {...models} appUI={appUI}>
    <Router>
       <Route path='/' component={App} />
    </Router>
  </Provider>,
   document.getElementById('root')
);
registerServiceWorker();
