import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Components/Layout/Layout';
import PizzaBuilder from './Containers/PizzaBuilder/PizzaBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Signup from './Containers/Auth/Signup';
import Signin from './Containers/Auth/Signin';
import Orders from './Containers/Orders/Orders';
import Logout from './Containers/Auth/Logout/Logout';
import * as actionTypes from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.checkAuthenticationState();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/" exact component={PizzaBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={PizzaBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.idToken
  }
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthenticationState: () => dispatch(actionTypes.authCheckState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
