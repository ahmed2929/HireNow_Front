import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import {createStore,applyMiddleware,compose,combineReducers} from "redux"
import thunk from "redux-thunk"
import AuthReducer from "./store/reducer/Auth"

import { ApolloClient, InMemoryCache ,ApolloProvider,createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

const rootRducer=combineReducers({
  Auth:AuthReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootRducer,composeEnhancers(applyMiddleware(thunk)));



const cache = new InMemoryCache();


const httpLink = createHttpLink({
  uri: 'http://localhost:3006/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: authLink.concat(httpLink),

  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});





ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}  >
      <Provider  store={store}>

      <BrowserRouter >
    <App />
    </BrowserRouter>

      </Provider>
   
    </ApolloProvider>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
