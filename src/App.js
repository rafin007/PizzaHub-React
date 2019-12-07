import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import PizzaBuilder from './Containers/PizzaBuilder/PizzaBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';

function App() {
  return (
    <Layout>
      <Route path="/" exact component={PizzaBuilder} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/auth" component={Auth} />
    </Layout>
  );
}

export default App;
