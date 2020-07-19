# ShopCart Online Grocery System

***Grocery Shopping is a necessity even during the pandemics. So the idea is to build an online grocery shopping website so that users can order the groceries online. This website is built using React.js, Node.js, Redux and MySQL.***

### Features

**Role: User**
1. Register/Login onto the system.
2. Reset the password
3. Enable "Two Factor Authentication". If enabled, a OTP will be sent to the user on the registered email address.
4. OAuth to login directly using Google/Facebook account
5. Session Management is done by using the JWT tokens. The tokens are stored in the client browser on successful login/registeration
6. Redux store is used for state management.
7. Add/Remove products to the shopping cart.
8. Search for products.
9. Display related items
10. Checkout the shopping cart
11. Select the delivery time and date
12. Order confirmation email is sent once the payment is successful
13. View the Order Details (like Delivery Person Assigned, order approved by admin)
14. Provide ratings and reviews to the deivery person
15. View the ratings and reviews of the delivery person
16. Edit the Profile and Security Settings
17. View Order History

**Role: Admin**
1. Add new products/categories
2. Approve delivery requests
3. Assign delivery person to each delivery request

### Technologies
1. Developed frontend using React.js, bootstrap and Material-UI
2. Developed backend using node.js and express.js and MySQL for database

### Installation

**To run the project locally**

*Pre-requisites: You should have node.js installer, npm and react.js installed in your system.*

1. Clone the git repository
```
$ git clone https://github.com/bhaktinarvekar/Projects.git ShopCart
```

2. To install all the dependencies
```
$ cd frontend
$ npm install

$ cd backend
$ npm install
```

3. Steps to start the frontend server

open a new terminal/command prompt
```
$ cd frontend
$ npm start
```

4. Steps to start the backend server

open a new terminal/command prompt
```
$ cd backend
$ npm start
```

**Output should similar to this**
```
[6] Listening on port 5006...
[0] Listening on port 5001...
[0] Connection established successfully in login.js...
[3] Listening on port 5004...
[1] Listening on port 5000...
[3] Connection established successfully in checkout.js...
[1] Connection established successfully in register.js...
[2] Listening on port 5003...
[5] Listening on port 5005...
[2] Connection established successfully in admin.js...
[4] Listening on port 5002...
[4] Connection established successfully in items.js...
```

5. Open the browser of your choice (preferrably Chrome). Enter the URL -> http://localhost:3000

