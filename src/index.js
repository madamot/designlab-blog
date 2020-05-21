import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

const DESIGNLAB_BASE_URL = 'https://wp-arrowvalves.designlab.agency/graphql';

const httpLink = new HttpLink({
  uri: DESIGNLAB_BASE_URL,
  headers: {
    // authorization: `Bearer 5d3795565afb125318a52c3a4a8de92f61245803`
  },
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
