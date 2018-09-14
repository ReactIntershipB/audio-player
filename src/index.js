import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import * as models from './models/index';
import { appUI } from './AppUI';

ReactDOM.render(
  <Provider appUI={appUI} { ...models}>
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);
registerServiceWorker();
