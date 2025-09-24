# The OpenAPIs

This documentation explains the different OpenAPIs in the project and provides guidance on how to integrate a new one. If you want to add another API to the system, this guide should make the process easier.

To clarify, the OpenAPI specification describes the API endpoints, while Swagger UI is a tool that visualizes these endpoints and makes them easier to understand. Swagger UI is a separate extension that needs to be set up if you are not using it locally; in some cases, an account or subscription may be required.

## What is an OpenAPI

In this context, an OpenAPI is a YAML file that describes the structure and content of an API. It allows users to navigate and test the API using Swagger UI. The YAML files have a specific structure, and everything defined in them is rendered and shown in the Swagger UI interface.

## Current Structure

The project has the following folder structure:

* **swagger-ui**
    * An extension that visualizes API connections defined in the different OpenAPI YAML files.
* **openAICheck**
    * This folder runs the overall Swagger UI setup and handles any necessary connections or prerequisites between different projects.
* **smallProjects**
    * Contains individual APIs, each with its own `openapi.yaml` file (name may vary). Each file describes the API endpoints for its project independently.
* **openapis**
    * Contains a combined OpenAPI YAML file that references the individual OpenAPI YAML files in the respective projects. This allows each project to manage its own endpoints while providing a centralized structure.

## Setting Up a New OpenAPI

When adding a new OpenAPI, it is important to follow the structure of the existing project. The project has a `combined.yaml` that references other OpenAPI YAML files. The `main.go` file facilitates this connection, and missing sections can result in errors.

### Steps to Add a New API

1. **Create an OpenAPI YAML file**
    * Place it inside the new project folder.
    * Include all required paths and responses. Ensure it is fully defined to avoid errors.

2. **Add a function handler in `main.go`**
    * Follow the structure of existing handlers.
    * Adjust the `http.HandleFunc("/docs/openapi.yaml", ...)` to a name representing the API project, e.g., `/docs/expense_counter.yaml`.  
        * The name does not need to match the file name.
    * Ensure `ServeFile` points to the correct OpenAPI YAML in the project folder.

3. **Update Swagger initializer**
    * Add the handler path to the `swagger-initializer.js` file at `swagger-ui/dist/swagger-initializer.js` under the `url` configuration.

4. **Update `combined.yaml`**
    * Add a new path referencing the new project using the name defined in the handler function.  
    * Example:

    ```yaml
    $ref: '/docs/recipe_api.yaml#/paths/~1recipes~1{id}'
    ```

    * This allows selecting specific paths in the OpenAPI YAML while maintaining flexibility and easy maintenance.

5. **Test**
    * Run Swagger UI and ensure the new API is visible.  
    * Possible errors:
        1. The handler name does not match the Swagger initializer or the reference in `combined.yaml`.
        2. The OpenAPI YAML is incomplete or incorrectly written.
        3. Cached data from a previous session—reload the page or restart Swagger UI.
        4. The OpenAPI YAML lacks necessary information to render properly.

## Existing APIs

### mini-api-for-writing-tests

This small project demonstrates how to write and execute integration and unit tests. It does not include Docker setup instructions and is intended as a learning resource.

### recipe_manager_api

Handles creation, deletion, and lookup of recipes using a local MongoDB database.  

**How to run:** See `how_to_run.md`.

### task_tracker_api

Handles creation and updates of tasks using a local MongoDB database. Authentication is required for modifications: users must be created and logged in to obtain the required bearer token.  

**How to run:** See `how_to_run.md`.
