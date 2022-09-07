import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { cartStore } from './store/cartStore';

const CartStore = new cartStore();

const stores = {
  CartStore,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>
);
