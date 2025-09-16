# How to run

The program contains different components, it contains the swagger, the apis, and the go file that runs the overall system. So in order to run it, we will need to run the correct elements. Note each API has their own running system 

## Install dependencies

In order to run any of the necessary small projects, it is important to download the respective dependencies for that project.  
Each one can run independently from each other. However, if the goal is to present the code on Swagger UI, you are also responsible for setting up the Swagger UI part.

1. Open a terminal and navigate to the project, or Swagger UI, that you want to set up.  
2. Run `npm install` in the terminal.  
   - This will install all the necessary dependencies for the project.

### Install dev dependencies

There are some differences between the dependencies that exist. Most importantly, some are set up for **development only**, as they are not required for the system to run in production. Instead, they are used for testing or other development activities.  

These dependencies are separated into `devDependencies`. Running `npm install` will install both regular dependencies and dev dependencies. However, if you only want to install development dependencies, you can do the following:

1. Open a terminal and navigate to the project, or Swagger UI, that you want to set up.  
2. Run `npm install --only=dev` in the terminal.  


## The swagger-UI execution

Running the swagger-UI will allow the user to open the local enivronments and examn the different entry points that exist.  However, that doesn't mean the entry points for each api represented is running, and avaliable, as they need to be started individually.

- How to start the swagger-UI
    1. Open a terminal in the openAICheck folder
    2. Enter `go run main.go` in the terminal
    3. Then open http://localhost:8080/docs/ in your browser
        - This should open up the swagger module and in turn should allow the user to verify the different apis.

### recipe_manager_api

- How to start it
    1. open power shell or terminal as admin but make sure it is just in the normal opening, as it is dependent on finding the mongodb setup on the computer
    2. Run "mongod" to start MongoDB server
    3. in a new terminal in the smallProjects\recipe_manager_api folder run "node server.js" to start the server, this should be inside the recipe_manager_api folder.
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

### task_tracker_api

- How to start it.
    1. open power shell or terminal as admin but make sure it is just in the normal opening, as it is dependent on finding the mongodb setup on the computer
    2. Run "mongod" to start MongoDB server
    3. in a new terminal in the smallProjects\task_tracker_api folder run "node server.js" to start the server, this should be inside the task_tracker_api folder.
    4. In Postman, test the API endpoints
        1. open postman 
        2. Set the request type to POST
        3. Enter the URL http://localhost:5001/api/auth/register
        4. In the body tab, select raw and set the type to JSON
        5. Enter a JSON object like: {
            "email": "test@example.localhost",
            "password": "123test"
        }
        6. repeate step 4.2 - 4.5 but with http://localhost:5001/api/auth/login
            - keep eamil and password the same
        7. Copy the response token, locate the authentication tab for the postman collection, select "bearer token" and enter the token from the response.
        8. repeate step 4.2-4.4 but with http://localhost:5001/api/auth/login
            - body should follow this structure [text](../smallProjects/task_tracker_api/models/task.js)