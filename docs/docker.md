# Docker

Creating and setting up a Docker container for a project allows each API or service to be containerized, making deployment much easier. The Dockerization process involves creating a **Dockerfile**, which contains all the dependencies and configuration needed for the application to run. From this Dockerfile, a **Docker image** is built, which is then used to deploy and run the container.

## Changes

Developers can adjust and update containers as needed without affecting the original image or Dockerfile. However, if a change should be shared with everyone, it is important to update the image and redeploy the containers based on it.  

It is important to note that updating or removing a container may result in the loss of any data stored inside that container. To preserve immutable or persistent data, Docker **volumes** are used.

### Volumes

Volumes are storage areas separate from application or database containers. They allow containers to read and write data in a persistent way. Containers can access this data through Docker networking and configured connections.  

By using volumes, data is preserved even if containers are updated or replaced, making the system more resilient and future-proof. This ensures that updates or changes to the system do not result in data loss.

## Docker in this Project

For each small project within this experimental setup, it is important that each project has its **own individual Docker setup**, rather than running one container setup for all projects at once.  

This ensures that projects are independent of each other. For example, the `task_tracker` project can run without depending on whether `recipe_manager_api` is running or working correctly.

## Setup

When setting up the project, it can be setup without a docker setup, and can run localy on your computer without any issues. However, if so desired the system can be setup and ran on docker desktop. In order to do so it is nesusary to run the nessusary commands to set the system and docker envirnoment up. 

1. Install docker desktop on your local system.
2. Open docker desktop your local system
2. while docker desktop is running, open a terminal in the root direktory of the api projekt
3. write `docker-compose up --build ` and let the code run to completion.
    - This will setup everything

## Update

When you make changes to the system and want to verify that it still works in the Docker environment, it is important to rebuild and restart the containers. Here are some useful commands:

### Rebuild and start containers
```bash
    docker-compose up --build
```
### Stop running containers
```bash
    docker-compose down
```     

### Remove all containers, networks, and volumes (clean slate)
```bash
    docker-compose down -v --remove-orphans
```

### Rebuild a specific service
```bash
    docker-compose build <service_name>
```

### Start a specific service
```bash
    docker-compose up <service_name>
```

