# Lab 5


Step 1. In the express directory, you can run:


### `npm intall`
### `npm start`


Step 2. In the react directory, you can run:


### `npm intall`
### `npm start`


Then React will automatically assign the port, thereby avoiding express port duplication and opening the website automatically.


In this lab the struggle for me was figuring out how to build REST API with express node and mongoDB, which is a bit different from what we did before. After reading the tutorial from mongodb.com. I learned about using collection.find, insert, update, and delete to enable the endpoint listening on four HTTP verbs including GET, POST, PUT and DELETE. 


For Mongodb, I add IP address 0.0.0.0/0 to network access, which enable everyone to having access from anywhere. And because the data structure from pokeapi is so complex. In my initDB.js, I only extract the data I need and restructure it to make the lab easier. 


The website includes two parts. The first search bar enabling user to fetch external api to get data by pokemon's id or name. And then user can add pokemon data to form and they are able to change any feature and interact with the DB by four http verbs. For the frontend, I learned about using react bootstrap to make the website looks clean and easy to interact with. User can search to get front and back picture, abilities, types and stats for each pokemon. 


REFERENCE:

https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial

https://react-bootstrap.github.io/getting-started/introduction

https://blog.logrocket.com/using-bootstrap-with-react-tutorial-with-examples/

https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/

https://pokeapi.co/

https://stackoverflow.com/questions/71169840/how-to-display-react-bootstrap-card-component-side-by-side-horizontally
