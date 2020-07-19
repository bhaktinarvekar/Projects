import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import reducer from './reducers/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


function saveToLocalStorage(state) {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }
  catch(err)
  {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  
  try{

    /**
     *    Check if the localStorage contains "state" object 
     *    If yes, then parse it into the JSON object and return
     *    Else return the initialStore
     */
    const serializedState = localStorage.getItem('state');
    if(serializedState === undefined)
      return initialStore;
    else{
      return JSON.parse(serializedState);
    }
  }
  catch(err)
  {
    return initialStore;
  }
}

//Initial Redux store
const initialStore = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
  step: 1,
  allItems: [],
  categories: [],
  viewItems: [],
  currentItem: [],
  relatedItems: [],
  searchedItems: [],
  searched: false,
  drawer: false,
  days: [],
  dates: [],
  month: '',
  year: '',
  pendingOrders: [],
  orders: [],
  orders_title: [],
  email: '',
  name: '',
  address: '',
  isAuthenticated: false,
  user: {
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    password: '',
    cpassword: '',
    question1: '',
    question2: '',
    answer1: '',
    answer2: '',
    TwoStep: false,
    otp: ''
  },
  onEdit: false,
  ErrorMessages: [],
  loginErrors: [{display: false, message: ''}, {display: false, message: ''}],
  errorIndicator: false,
  registerErrors: [{display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''},
                  {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''},
                  {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''},
                  {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''}],
  delivery: {
    date: '',
    slot: 999
  },
  category: {
    fileUploaded: null,
    category: ''
  },
  product: {
    fileUploaded: null,
    category: '',
    productName: '',
    price: '',
  },
  order: {
    id: '',
    assignedTo: '',
    date: '',
    slot: '',
    email: '',
    status: '',
    assignName: ''
  },
  orderedItems: [],
  subtotal: 0.0,
  ratings: {
    value: 0,
    display: false
  },
  reviews: {
    message: '',
    display: false
  },
  rider: {
    ratings: 0,
    reviews: []
  }
}

/**
 *    Checks if the "state" object is present into the localStorage and if yes then returns the state object.
 *    Else returns the initialStore object
 */
const persistedState = loadFromLocalStorage();


/**
 *    Check if the persistedState is null or not
 *    1. If null then create a store with initialStore object
 *    2. Else create a store with persistedState object
 */
const store = persistedState !== null ? createStore(reducer, persistedState) : createStore(reducer, initialStore);


/**
 *    Each time the components are rendered, the store.subscribed method is called.
 *    Every time the any component is rendered, the "state" is stored into the localStorage
 */
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();