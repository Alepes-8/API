# API project

This project is created in order to create different apis, that can be used and experiemented on. This includeds different forms of apis, as well as different call formats, all in order to learn and train on the subject with hands on experience. In order to do this, the project contains a Swagger-ui, which will assist in representing the different apis that is setup and their respective end points. 

If more information is desired read the documents that exist in the docs file, as here documentations will explain different elements of system.

This is the current look and content contained in the project(visualised by swagger UI).
<img width="1192" height="1263" alt="bild" src="https://github.com/user-attachments/assets/084f35dd-83a9-4834-9be4-beb4b16328a3" />

# How to setup and install.

Follow the `docs/how_to_run.md` documentation as this describes the process that needs to be setup and installed.

## Old Setup and installation
1. Open a teminal where you desire to setup the project.
2. run the following commands in the given order
    - https://github.com/Alepes-8/API.git
    - cd API
    - npm install
3. On your machine, install MongoDB Community Edition
4. Then start mongod in powershell to verify that it works.
5. Create a .env file in each of the API projects that you wish to test or use
    - task_tracker_api
    - recipe_manager_api
6. That env should contain the following information(the port and address can be adjusted based on your own desire. As well as the JWT_SECRET is something you should keep secret)
    - recipe_manager_api
        ``` 
        PORT=5000
        MONGO_URI=mongodb://127.0.0.1:27017/recipe-manager
        ```
    - task_tracker_api
        ``` 
        PORT=5001
        MONGO_URI=mongodb://127.0.0.1:27017/task_tracker
        JWT_SECRET=supersecret-task
        ```
7. Follow the docs/how_to_run.md documentation in order to run it successfully.
