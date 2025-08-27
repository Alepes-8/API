# How to run

The program contains different components, it contains the swagger, the apis, and the go file that runs the overall system. So in order to run it, we will need to run the correct elements. Note each API has their own running system 

## The swagger-UI execution

Running the swagger-UI will allow the user to open the local enivronments and examn the different entry points that exist.  However, that doesn't mean the entry points for each api represented is running, and avaliable, as they need to be started individually.

- How to start the swagger-UI
    1. Open a terminal in the openAICheck folder
    2. Enter "go run main.go" in the terminal
    3. Then open http://localhost:8080/docs/ in your browser
        - This should open up the swagger module and in turn should allow the user to verify the different apis.

### recipe_manager_api

- How to start it
    1. open power shell or terminal as admin but make sure it is just in the normal opening, as it is dependent on finding the mongodb setup on the computer
    2. Run "mongod" to start MongoDB server
    3. in a new terminal, run "node server.js" to start the server, this should be inside the recipe_manager_api folder.
    4. In Postman, test the API endpoints
        1. open postman 
        2. Set the request type to POST
        3. Enter the URL http://localhost:5000/api/recipes
        4. In the body tab, select raw and set the type to JSON
        5. Enter a JSON object like: {
            "title": "Spaghetti Carbonara",
            "ingredients": ["Pasta", "Eggs", "Bacon"],
            "instructions": "Boil pasta, fry bacon, mix with eggs.",
            "category": "Italian"
        }