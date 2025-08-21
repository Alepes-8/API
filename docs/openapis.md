# The openapis

This documentation will underline the different openapis that exist in the project, but also underline how one would connect a new on into the system. This way, if the desire is to add another api into the system, this documentation should ease that process.

To clarify something, the openapi is one part of the system, while swagger UI is another. Swagger UI is used in order to clarify and ease the user in order to understand what types of contents the openapi.yaml files contain. Swagger UI is it's own extension and would be something that is to be setup if it isn't just for local use, and an account or subscription would probably be required.

## What is an openapi

In this context an openapi is the content and descirption of an api call. This descibes and allows the user to navigate swagger ui with the current setup in order to verify if it works and how it works. With it being yaml files, it has its own structure of being setup and coded, but everything that is coded will be converted and shown in the Swagger UI setup.

## Current structure

The current structure of the project is that it contains the following folders:
* Swagger-UI
    * Is an extension which helps visualise the api connections that has been descibed and setup inside the different openapi.yaml files.
* openAICheck
    * This folder runs the overall swagger-UI setup, as well as setting upp any different connections and prerequites that is needed between different projects.
* smallProjects
    * Contains different APIs that are setup depending on the projects and propose of them. Each of the different projects inside of the folder contains their own openapi.yaml(no matter the name) which describes their own different api connections. This means if it contains recipes for example, then it may decribe the GET, POST, and DELETE actions for it self, with no dependencies to the other projects.
* openapis
    * contains a combined openapi which referense the different openapi.yaml in respective projects. so that each project can handle their own endpoints, but then we have one place that handles the overall structure.

## set up a new openapi

When setting up a new openapi, for a new or old api it is important to note that it is dependent on what form of structure that the project is built up on. But given the structure that is setup for this project, it has one combined.yaml that handles referenses to other openapi.yaml setups. In where the main.go file facilitates this connection, and without any of these sections it would not work, and an error would be given. 

Setting up a new api is done with the following setup
1. create an openapi.yaml inside the project API that is create
    - this includes any paths that is required and any other form of information that is desired.
2. Create a function handler inside of the main.go file
    - Create one following the structure that already exist for the file.
    - adjust the 'http.HandleFunc("/docs/openapi.yaml"...' to a name that represent the apis own project, such as docs/expense_counter.yaml. 
        - This does not need to be the same name as the projects yaml file.
    - ServeFile should point to the openapi.yaml that exist in the project folder.
3. When the function handler is setup and a name is given. copy that name with docs included and add it to the swagger.initializer.js file, on the URL content.
    - This file is located swagger-ui\dist\swagger-initializer.js.
4. Then go to the combined.yaml file and create a new path to the new project using the name given to it in the handlefunc. 
    - we do this so that it is not dependent on the file name, and allow the project to be easier to maintain.
    - $ref: '/docs/recipe_api.yaml#/paths/~1recipes~1{id}' where paths picks the paths from the openapi.yaml file, and select the '/name' that is given to a path. MEaning that it can pick up all of some of the paths in the openapi.yaml dependent on onces desire.
5. Now test if it works, by running the swagger-UI and check if it is visable.
    - possible errors: 
        1. the name created in the handlefunc isn't the same in both the swagger-initializer and the ref in the combined.yaml file.
        2. the openapi.yaml isn't correctly written, or that it doesn't contain any paths to begin with.
        3. some time it cashes the information from a previous instance, reload page or restart the swagger-ui.

## existing apis

### recipe_manager_api

The recipe_manager_api handles the creation and deletion and look up of recpies through a local dbmongo database. So in this it is important to know how to work the different components

How to run, check the how_to_run.md file.