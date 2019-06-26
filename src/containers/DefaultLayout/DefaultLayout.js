import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import routes from '../../routes';
import DefaultHeader from './DefaultHeader';
import DefaultFooter from './DefaultFooter';

/* eslint eqeqeq: 0 */
export class DefaultLayout extends Component {
  render() {
    return (
      <div className="app">
        <DefaultHeader />
        <Switch>
          {
            routes.map((route, idx) => {
              return route.component ? (<Route key={idx} path={route.path} exact={route.exact}
                name={route.name}
                render={props => (
                  <route.component {...props} />
                )} />)
                : '';
            })
          }
          < Redirect from="/" to="/dashboard" />
        </Switch>
        <DefaultFooter />
      </div>
    );
  }
}

// export default DefaultLayout;

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(DefaultLayout);