import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import PizzaBuilder from './Containers/PizzaBuilder/PizzaBuilder';
import Checkout from './Containers/Checkout/Checkout';

function App() {
  return (
    <Layout>
      <Route path="/" exact component={PizzaBuilder} />
      <Route path="/checkout" exact component={Checkout} />
      <Route path="/checkout/contact-data" render={() => <h1 style={{ marginTop: '10rem' }} >yellow!</h1>} />
    </Layout>
  );
}

export default App;
