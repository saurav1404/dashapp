import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers';
import { DefaultLayout } from './containers';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
          <Switch>
            <Route exact path="/500" name="Page 500" component={(e) => { return <h3>not found</h3> }} />
            <Route exact path="/404" name="Page 404" component={(e) => { return <h3>not found</h3> }} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
