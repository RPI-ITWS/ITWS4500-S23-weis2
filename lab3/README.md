Lab 3 
Node+Express

MY APIs for this lab:

http://localhost:3000/api/v1/pokemon/

http://localhost:3000/api/v1/pokemon/{id}

http://localhost:3000/api/v1/pokemon/{name}

http://localhost:3000/api/v1/type

http://localhost:3000/api/v1/type/{id}


The struggle for me is to figure out the pipeline. The front-end requests the express interface. Express requests the external api and then encapsulates the data and returns it to the front-end for rendering. The front-end request first goes to the controller layer of the back-end, and the controller calls the service layer service and then calls the external api. And the api requested will be stored as json file in the json folder. And also, I learned about how to use postman to test my api.

Creativity: For this lab, I find the api that I'm interested in: PokeAPI. This api has massive data that can be processed. And for this lab I mainly used the pokemon's id, name, image and type. The front-end page is a card-style website. Each pokemon is in one card with its unique id name image and type. The background color of each card is based on the pokemon's first type. In addition, I implement the search function which can search particular pokemon by its id or full name. Finally, I created a filtering function, which can filter out all Pokémon of any type.
