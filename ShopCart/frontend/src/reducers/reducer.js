import {ADD_ITEM, DELETE_ITEM, ALL_CATEGORIES, VIEW_ITEMS, ALL_ITEMS, REMOVE_ITEM, 
    TOGGLE_DRAWER, TOTAL_AMOUNT, FETCH_ITEM, ADD_TO_CART, RELATED_ITEMS, SEARCHED_ITEMS, UPDATE_ITEM, 
    UPDATE_DELIVERY_DATE, UPDATE_ORDERS, UPDATE_PENDING_ORDERS, PAYMENT_COMPLETE, LOAD_ORDERS,
    UPDATE_USER, UPDATE_EDIT, UPDATE_USER_ITEM, LOGIN_ERROR, REG_ERROR, EMPTY_ERRORS,REMOVE_USER, 
    UPDATE_REG_ERRORS, UPDATE_LOGIN_ERRORS, ERROR_MESSAGES, UPDATE_DATE_TIME, CHANGE_STEP, GRAB_ITEM,
    TOGGLE_CHANGE, UPDATE_CATEGORY, UPDATE_PRODUCTS, CLEAR_CATEGORY, CLEAR_PRODUCTS, UPDATE_ORDER,
    UPDATE_ORDER_ITEMS, UPDATE_RATINGS, UPDATE_REVIEWS, SUBMIT_RATINGS, UPDATE_RIDER} from './actions';

import {timings} from '../store/menulist';

function reducer(state, action) 
{
    //An item is added
    if(action.type===ADD_ITEM)
    {
        let {cartItems, viewItems, searchedItems, allItems, searched} = state;
        const {item} = action.payload;

        //Iterate through the list that contains all the items and returns the item whose id matches to the id of an item that is
        //to be added and increase the quatity of that item by 1
        let allItemsTemp = allItems.map(elem => {
            if(elem.id === item.id){
                elem = {...elem, quantity: elem.quantity + 1};
            }
            return elem;
        });

        //Find the item from the list that contains all items
        let tempItem = allItemsTemp.find(elem => elem.id === item.id);

        let viewItemsTemp = viewItems.map(elem => {
            if(elem.id === item.id)
            {
                elem = {...tempItem};
            }
            return elem;
        })

        //Search for the item in searched items list and if found, update the item with tempItem
        let searchedItemsTemp = [];
        if(searched){
            searchedItemsTemp = searchedItems.map(elem => {
                if(elem.id === item.id) {
                    elem = {...tempItem};
                }
                return elem;
            })
        }

        /**
         *      If the list of cartItems is empty then add the item into the list else search for the item in the list.
         *      If the item is found then update the item with the tempItem else add the tempItem into the list
         */
        let cartItemsTemp = [];
        if(cartItems === null || cartItems === undefined || cartItems.length === 0)
        {
            cartItemsTemp = [{...tempItem}];
        }
        else if(cartItems.find(elem => elem.id === item.id)){
            cartItemsTemp = cartItems.map(elem => {
                if(elem.id === item.id){
                    elem = {...tempItem};
                }
                return elem;
            })
        }
        else {
            cartItemsTemp = [...cartItems, {...tempItem}];
        }

        return {...state, cartItems: cartItemsTemp, viewItems: viewItemsTemp, searchedItems: searchedItemsTemp, 
            totalItems: cartItemsTemp.length, allItems: allItemsTemp};

    }
    //if an item is deleted
    if(action.type===DELETE_ITEM)
    {
        const {cartItems, viewItems, allItems, searchedItems, searched} = state;
        const {id} = action.payload;

        let tempItem = allItems.find(elem => elem.id === id);
        let cartItemsTemp = [...cartItems];
        let viewItemsTemp = [...viewItems];
        let searchedItemsTemp = [...searchedItems];
        let allItemsTemp = [...allItems];


        /**
         *      If the quantity of the item to be deleted is 1 then remove the item from the cart item list.
         *      If the quantity of the item is greater than 1 then reduce the quantity of the item by 1
         */
        if(tempItem.quantity === 1) {
            cartItemsTemp = cartItems.filter(elem => elem.id !== id);
        }
        else if(tempItem.quantity > 1) {

            cartItemsTemp = cartItems.map(elem => {
                if(elem.id === id && elem.quantity > 0){
                    elem = {...elem, quantity: elem.quantity - 1};
                }
                return elem;
            });
        }

        allItemsTemp = allItems.map(elem => {
            if(elem.id === id && elem.quantity > 0) {
                elem = {...elem, quantity: elem.quantity - 1};
            }
            return elem;
        });

        viewItemsTemp = viewItems.map(elem => {
            if(elem.id === id && elem.quantity > 0){
                elem = {...elem, quantity: elem.quantity - 1};
            }
            return elem;
        });

        if(searched){
            searchedItemsTemp = searchedItems.map(elem => {
                if(elem.id === id && elem.quantity > 0) {
                    elem = {...elem, quantity: elem.quantity - 1};
                }
            });
        }

        return {...state, allItems: allItemsTemp, searchedItems: searchedItemsTemp, cartItems: cartItemsTemp,
        viewItems: viewItemsTemp, totalItems: cartItemsTemp.length};
    }
    //remove the item from the cart
    if(action.type === REMOVE_ITEM)
    {
        let {cartItems, viewItems, currentItem} = state;
        const {id} = action.payload;
        let cartItemsTemp = cartItems.filter(elem => elem.id !== id);
        let viewItemsTemp = viewItems.map(elem => {
            if(elem.id === id)
            {
                elem = {...elem, quantity: 0};
            }
            return elem;
        })

        return {...state, cartItems: cartItemsTemp, viewItems: viewItemsTemp, totalItems: cartItemsTemp.length,
        currentItem: {...currentItem, quantity: 0}};
    }
    //to keep track of all the categories
    if(action.type === ALL_CATEGORIES)
    {
        let {categories} = action.payload;
        return {...state, categories, searched: false};
    }
    //to keep the track of all the items that are to be displayed for a category
    if(action.type === VIEW_ITEMS)
    {
        const {cartItems} = state;
        const {viewItems} = action.payload;
        let item;

        /**
         *      Iterate through the items in view items list and check if the item is present in cart items.
         *      If the item is present in the cart items list then update it with the item.
         * 
         *      Note: This is to update the quantity field on Cards
         */
        let viewItemsTemp = viewItems.map(elem => {
            item = cartItems ? cartItems.find(e => e.id === elem.id) : undefined;
            if(item !== undefined)
            {
                elem = {...item};
            }
            return elem;
        });

        let totalItemsTemp = cartItems ? cartItems.length : 0;

        return {...state, viewItems: viewItemsTemp, totalItems: totalItemsTemp, searched: false};
    }
    //to keep the track of all the items
    if(action.type === ALL_ITEMS)
    {
        let totalItemsTemp = state.cartItems ? state.cartItems.length : 0;
        const {allItems} = action.payload;
        let allItemsTemp = allItems.map(elem => {
            elem = {...elem, quantity: 0}
            return elem;
        })

        return {...state, allItems: allItemsTemp, totalItems: totalItemsTemp, searched: false};
    }
    //Update the state of the drawer.
    if(action.type === TOGGLE_DRAWER)
    {
        let totalItemsTemp = state.cartItems ? state.cartItems.length : 0;
        return {...state, drawer: !state.drawer, totalItems: totalItemsTemp};
    }
    //to maintain the state for total amount
    if(action.type === TOTAL_AMOUNT)
    {
        if(state)
        {
            /**
             *      Iterate through all the items in the car items list and calculate the total cost for each item and it
             *      to the accumulator
             */
            let tempAmount = state.cartItems ? state.cartItems.reduce((accumulator, elem) => {
                accumulator += (elem.quantity * elem.price);
                return accumulator;
            }, 0) : 0;

            tempAmount = parseFloat(tempAmount.toFixed(2));
            let totalItemsTemp = state.cartItems ? state.cartItems.length : 0;
            
            return {...state, totalAmount: tempAmount, totalItems: totalItemsTemp};
        }
    }
    //to display a single item when clicked on the card
    if(action.type===FETCH_ITEM)
    {
        const {item} = action.payload;
        const {allItems} = state;

        let currentItemTemp = allItems.find(elem => elem.id === item.id);
        
        //If the quantity of that item is less than or equal to zero, then increase the quantity by 1
        if(currentItemTemp.quantity <= 0){
            currentItemTemp = {...currentItemTemp, quantity: currentItemTemp.quantity + 1};
        }

        return {...state, currentItem: currentItemTemp, totalItems: state.cartItems.length};
    }
    //add an item to the cart using "Add to cart" option
    if(action.type===ADD_TO_CART)
    {
        let {cartItems, viewItems, relatedItems, currentItem} = state;
        let item = {...currentItem};
        let cartItemsTemp = [];
        let viewItemsTemp = [];
        let cartItemTemp = cartItems.find(elem => elem.id === item.id);
        
        /**
         *      If the item is not present in the cart then add the item into the cart else update the item with the
         *      item that is passed.
         */
        if(cartItemTemp === undefined)
        {
            cartItemsTemp = [...cartItems, item];
        } 
        else
        {
            cartItemsTemp = cartItems.map(elem => {
                if(elem.id === item.id)
                {
                    elem = {...item};
                }
                return elem;
            });
        }
        
        viewItemsTemp = viewItems.map(elem => {
            if(elem.id === item.id)
            {
                elem = {...item};
            }
            return elem;
        })

        let relatedItemsTemp = relatedItems ? relatedItems.map(elem => {
            if(elem.id === item.id)
            {
                elem = {...item}
            }
            return elem;
        }) : undefined;

        return {...state, cartItems: cartItemsTemp, viewItems: viewItemsTemp, totalItems: cartItemsTemp.length,
        relatedItems: relatedItemsTemp};
    }
    //to maintain the state for the related items
    if(action.type === RELATED_ITEMS)
    {
        const {viewItems, cartItems, allItems} = state;
        const {id} = action.payload;

        let tempItem = allItems.find(elem => elem.id === id);
        let relatedItemsTemp = allItems.filter(elem => {
            if(elem.category === tempItem.category && elem.id !== id)
            return elem
        });
        let totalItemsTemp = cartItems ? cartItems.length : 0;
        return {...state, relatedItems: relatedItemsTemp, totalItems: totalItemsTemp, searched: false}
    }
    //searched items list
    if(action.type === SEARCHED_ITEMS)
    {
        const {searchedItems, viewItems, cartItems} = state;
        const {items} = action.payload;
        
        let totalItemsTemp = cartItems ? cartItems.length : 0;

        return {...state, searchedItems: [...items], searched: true, totalItems: totalItemsTemp};
    }
    //update the quantity for the current item
    if(action.type === UPDATE_ITEM)
    {
        const {currentItem, cartItems} = state;
        const {value} = action.payload
        let currentItemTemp = {...currentItem};
        currentItemTemp.quantity = value
        let totalItemsTemp = cartItems ? cartItems.length : 0;
        
        return {...state, currentItem: currentItemTemp, totalItems: totalItemsTemp}
    }
    //update delivery date
    if(action.type === UPDATE_DELIVERY_DATE)
    {
        const {dates, month, year, days} = action.payload;

        return {...state, dates: dates, month: month, year: year, days: days};
    }
    //fetch all the pending orders to display on Admin Dashboard
    if(action.type === UPDATE_ORDERS)
    {
        const {orders, cartItems} = action.payload;
        let totalItemsTemp = cartItems ? cartItems.length : 0;

        return {...state, pendingOrders: [...orders], totalItems: totalItemsTemp};
    }
    //Remove an order from pending orders list
    if(action.type === UPDATE_PENDING_ORDERS)
    {
        const {id} = action.payload;
        const {pendingOrders, cartItems} = state;

        let pendingOrdersTemp = pendingOrders.filter(elem => elem.order_id !== id);
        let totalItemsTemp = cartItems ? cartItems.length : 0;

        return {...state, pendingOrders: [...pendingOrdersTemp], totalItems: totalItemsTemp};
    }
    //update the items in the cart and totalItems once the payment is done
    if(action.type === PAYMENT_COMPLETE) {
        let cartItemsTemp = [];
        return {...state, cartItems: [...cartItemsTemp], totalItems: cartItemsTemp.length};
    }
    //Fetch all the past orders for a user
    if(action.type === LOAD_ORDERS) 
    {
        const {my_orders} = action.payload;
        let {orders, orders_title} = state;

        let orders_title_temp = [];


        //Iterate through all the orders and calculate the total cost for each order by adding the tax and shipping cost
        for(var i=0; i<my_orders.length; i++) 
        {
            let totalPrice = 0;

            for(var j=0; j<my_orders[i].length; j++)
            {
                totalPrice += parseFloat(my_orders[i][j].price) + parseFloat(15 * parseFloat(my_orders[i][j].price)/100) + parseFloat(18 * parseFloat(my_orders[i][j].price)/100);
            }
            let temp = {price: totalPrice.toFixed(2), date: my_orders[i][0].date, items: my_orders[i].length};
            orders_title_temp.push(temp);
        }

        return {...state, orders: my_orders, orders_title: orders_title_temp};
    }
    //update User
    if(action.type === UPDATE_USER) {
        const {user} = action.payload;
        
        let user1 = {
            email: user.email ? user.email: '',
            firstname: user.firstname ? user.firstname : '',
            lastname: user.lastname ? user.lastname: '',
            address: user.address ? user.address : '',
            state: user.state ? user.state : '',
            city: user.city ? user.city : '',
            pincode: user.pincode ? user.pincode : '',
            phone: user.phone === undefined ? '': user.phone
        }

        return {...state, user: {...user1}, TwoStep: user.two_factor};
    }
    //update state for Edit button on My Profile page
    if(action.type === UPDATE_EDIT) 
    {   
        return {...state, onEdit: !state.onEdit};
    }
    //Update user properties when "onChange" is triggered
    if(action.type === UPDATE_USER_ITEM) {
        
        let {name, value} = action.payload;
        let userTemp = state.user !== null ? {...state.user} : {};

        userTemp[name] = value;
        return {...state, user: {...userTemp}};
    }
    //Maintain an array to keep track of login errors
    if(action.type === LOGIN_ERROR) 
    {
        const {loginErrorMessages} = state;
        const {message} = action.payload;
        let messagesArray = [];

        let checkMessage = loginErrorMessages.find(mes => mes === message);

        //If the new message is not found in an array then add the error message into the list
        if(!checkMessage)
        {
            messagesArray = [...loginErrorMessages, message];
        }

        return {...state, loginErrorMessages: [...messagesArray]};
    }
    //Error to keep track of registration error
    if(action.type === REG_ERROR) 
    {
        const {registerErrorMessages} = state;
        const {message} = action.payload;
        let messagesArray = [];

        //If the new message is not the error message list then add the error message into the list
        if(!registerErrorMessages.find(message))
        {
            messagesArray = [...registerErrorMessages, message];
        }

        return {...state, registerErrorMessages: [...messagesArray]};
    }
    //To empty all the error messages
    if(action.type === EMPTY_ERRORS) 
    {
        let loginErrorInit = [{display: false, message: ''}, {display: false, message: ''}];
        let regErrorInit = [{display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''},
        {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''},
        {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''},
        {display: false, message: ''}, {display: false, message: ''}, {display: false, message: ''}];
        return {...state, registerErrorMessages: [], loginErrorMessages: [], loginErrors: [...loginErrorInit], errorIndicator: false, registerErrors: [...regErrorInit], ErrorMessages: []};
    }
    //To remove a user
    if(action.type === REMOVE_USER)
    {
        let userTemp = {
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
            answer2: ''
          }
        return {...state, user: {...userTemp}};
    }
    //To update the login errors to display the helper text in red below each "input text" element
    if(action.type === UPDATE_LOGIN_ERRORS)
    {
        const {index, message} = action.payload;
        const {loginErrors} = state
        let loginErrorTemp = [...loginErrors];
        loginErrorTemp[index].display = true;
        loginErrorTemp[index].message = message;

        return {...state, loginErrors: [...loginErrorTemp], errorIndicator: true};
    }
    //To update registration errors to display the helper text in red below each "input text" element
    if(action.type === UPDATE_REG_ERRORS)
    {
        const {index, message} = action.payload;
        const {registerErrors} = state
        let registerErrorsTemp = [...registerErrors];
        registerErrorsTemp[index].display = true;
        registerErrorsTemp[index].message = message;
        
        return {...state, registerErrors: [...registerErrorsTemp], errorIndicator: true};
    }
    //Maintain an array to keep track of all the error messages
    if(action.type === ERROR_MESSAGES)
    {
        const {ErrorMessages} = state;
        const {message} = action.payload;
        let messagesArray = [...ErrorMessages];

        let checkMessage = ErrorMessages.find(mes => mes === message);

        if(!checkMessage)
        {
            messagesArray = [...ErrorMessages, message];
        }

        return {...state, ErrorMessages: [...messagesArray]};
    }
    //update the date and slot for delivery on "Checkout" page 
    if(action.type === UPDATE_DATE_TIME)
    {
        const {name, value} = action.payload;
        let deliveryTemp = {...state.delivery};
        
        deliveryTemp[name] = value;
        return {...state, delivery: {...deliveryTemp}}
    }
    //Updating the state of step on "My Profile" page
    if(action.type === CHANGE_STEP)
    {
        const {value} = action.payload;
        return {...state, step: value};
    }
    //update the state when the user enters OTP
    if(action.type === GRAB_ITEM)
    {
        const {value} = action.payload;
        return {...state, otp: value};
    }
    //Update the state for "2 Step Authentication" on "My Profile" page
    if(action.type === TOGGLE_CHANGE)
    {
        var change = !state.TwoStep;
        return {...state, TwoStep: change};
    }
    //triggers on "OnChange" when the admin adds up a new category
    if(action.type === UPDATE_CATEGORY)
    {
        const {name, value} = action.payload;
        const {category} = state;
        let categoryTemp = {...category};
        categoryTemp[name] = value;
        return {...state, category: {...categoryTemp}};
    }
    //triggers on "onChange" when the admin adds up a new product
    if(action.type === UPDATE_PRODUCTS)
    {
        const {name, value} = action.payload;
        const {product} = state;
        let productTemp = {...product};
        productTemp[name] = value;
        return {...state, product: {...productTemp}};
    }
    //triggers on "onSubmit" on Admin side "New Category" page to clear the input
    if(action.type === CLEAR_CATEGORY)
    {
        const {category} = state;
        let categoryTemp = {...category};
        categoryTemp['category'] = '';
        return {...state, category: {...categoryTemp}};
    }
    //triggers on "onSubmit" on Admin side "New Product" page to clear the input
    if(action.type === CLEAR_PRODUCTS)
    {
        const {product} = state;
        let productTemp = {...product};
        productTemp['category'] = '';
        productTemp['fileUploaded'] = '';
        productTemp['productName'] = '';
        productTemp['price'] = '';
        return {...state, product: {...productTemp}};
    }
    //Update the order object to be displayed on "Order" page
    if(action.type === UPDATE_ORDER)
    {
        const { order, email } = action.payload;
        let orderTemp = {...state.order};
        orderTemp.assignedTo = order.assign;
        orderTemp.date = order.date;
        orderTemp.email = email;
        orderTemp.id = order.order_id;
        orderTemp.slot = timings[order.slot-1];
        orderTemp.status = (order.status).toUpperCase();
        orderTemp.assignName = order.assignName;

        return {...state, order: {...orderTemp}};
    }
    //update the orderedItems and the subtotal that is to be displayed "Order" page
    if(action.type === UPDATE_ORDER_ITEMS)
    {
        const { tempArray, totalPrice } = action.payload.response;
        let subTotaltemp = parseFloat(totalPrice);
        return {...state, orderedItems: [...tempArray], subtotal: subTotaltemp };
    }
    //update the user's rating in ratings object
    if(action.type === UPDATE_RATINGS)
    {
        let {value, display} = action.payload;
        let ratingsTemp = {...state.ratings};
        ratingsTemp.value = value;

        return {...state, ratings: {...ratingsTemp}};
    }
    //Update the user review in reviews object
    if(action.type === UPDATE_REVIEWS)
    {
        const { message } = action.payload;
        let reviewTemp = {...state.reviews};
        reviewTemp.message = message;
        return {...state, reviews: {...reviewTemp}};
    }
    //Triggers on "onSubmit" when the user submits the review and updates the display for review and rating
    if(action.type === SUBMIT_RATINGS)
    {
        const {display} = action.payload;
        let reviewTemp = {...state.reviews};
        reviewTemp.display = display;

        let ratingsTemp = {...state.ratings}
        ratingsTemp.display = display;

        return {...state, reviews: reviewTemp, ratings: ratingsTemp};
    }
    //Update the review and ratings for the Rider
    if(action.type === UPDATE_RIDER)
    {
        const { reviews, ratings } = action.payload;

        let riderTemp = {...state.rider};
        riderTemp.reviews = reviews;
        riderTemp.ratings = ratings;

        return {...state, rider: riderTemp};
    }


    return state;
}

export default reducer;