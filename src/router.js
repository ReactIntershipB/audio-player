import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';

const Router = () => (
    <Switch>
      <Route exact path='/' component={App}/>
    </Switch>
)

export default Router;