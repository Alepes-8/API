# Testing

The project is built to be tested in multiple ways in order to increase stability and increase security by lowering faults in the system. The testing is executed on multiple levels, where there are postman scripts that are run localy to verify system setups, which is then implemented to be run by the CI/CD git actions for each pullrequest, as well as push to main. While a more code based testing occurs within the code, as it is setup to run integration, dao, and unit testing when required.

## CI/CD git actions

The CI/CD setup uses the postman scripts that are setup on postman, and then exported and added to the respective projects own folder within a postman folder. This way it is easier to identify where respective projects own tests are located. Then in order to run respective CI setup it is important that the git action has the correct setup so that it knows where to look and how to act. In order to do that ".github" is created with a workflow folder inside of it. Can read a bit more about that within CI_CD_learn.md. This way the tests of respective API can be run for each pullrequest.

The actions does not run localy, rather it will only run through the github actions, or if desired the postman script can be run in postman.

## integration, unit testing

Compared to the CI/CD actions that are run through postman or github actions, these can be run localy within the system even when the port and api isn't taking in any requests. Rather these test verify the integraty and functionality of the code, that it acts as desired. In order to run these do the following steps:

1. open a terminal and navigate to the respective project that is desired to be tested
2. in the terminal enter `npm test`
    - this should show the tests running, and then the results.
        - such as this as a result![alt text](image.png)
        - or this if it fails ![alt text](image-1.png)