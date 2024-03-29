# Demo Patient Tracker App Frontend
<!-- [Publicly hosted](http://jessemartindev.com/login) on GCP (Use username and password combo from the [login with](https://github.com/JayMartMedia/patient-js#login-with) section) -->

## Purpose
This app was built as a way to get more familiar with some popular development frameworks and libraries.

This app allows a user to view, add, edit, and delete patients stored in the PostgreSQL database through a web gui. The app has a simple UI. It is not visually spectacular. The purpose is to demonstrate the knowledge of the tools listed below, not to demonstrate graphic design skills.

## Business Use Case
This app has the major components used in most any production web app:
+ A frontend UI for the user to interact with
+ A backend REST API for the frontend to talk to
+ A database to store patient data
+ The ability to create, read, update and delete data in the database
+ User login and authentication
+ Cloud hosted (on Google Cloud Platform)

The use case could be any web application where you need a user to be able to view, add, edit, and/or delete items specifically from a table. For example, keeping a list of patients, users, customers, orders, etc.

## Tools Used
+ #### Frontend (this repo)
    + [React.js](https://reactjs.org/) - Most popular JavaScript framework on NPM according to [NPM Trends](https://www.npmtrends.com/react-vs-angular-vs-vue-vs-ember-source-vs-@angular/core)
    + [Jest](https://jestjs.io/) - JavaScript testing libary included with create-react-app
    + [Enzyme](https://enzymejs.github.io/enzyme/) - Popular React testing framework originally developed by Airbnb
    + [react-table](https://react-table.tanstack.com/) - Popular lightweight table library for React (One of the highest starred React table libraries on Github ~13.5k)
    + [CSS Modules](https://github.com/css-modules/css-modules) - CSS libary used to locally scope classes
    + [SASS](https://sass-lang.com/) - CSS preprocessor which adds the usage of variables, nesting and more to standard CSS
+ #### Backend [patient-service](https://github.com/JayMartMedia/patient-service)
    + [Spring Boot](https://spring.io/projects/spring-boot) - Popular Java framework for building REST APIs
    + [Spring Boot Security](https://spring.io/projects/spring-security#overview) - Used for user login and protecting rest endpoints
    + [PostgreSQL](https://www.postgresql.org/) - Open source relational database system
+ #### Infrastructure [patient-infrastructure](https://github.com/JayMartMedia/patient-infrastructure)
    + [Docker](https://www.docker.com/) - Containerization tool used for deployment flexibility
    + [NGINX](https://www.nginx.com/) - Open source tool used for all things networking, used to set up a reverse proxy in this project
    
## Starting the Application

1. Clone each of the repositories listed above
2. In the patient-infrastructure project
    1. Run the `./start-service.sh` script to start the PostgreSQL docker container and create the initial database
    2. Start nginx using the nginx.conf file in the project `nginx -c $(pwd)/nginx.conf`
3. In the patient-service project
    1. Run the `./start-service.sh` script to start the Spring application in a docker container
3. In the patient-js project
    + Run the `./start-service.sh` script to start up the React application in a docker container
    + (Alternative) Run `npm start` if you would like the React app to update changes in realtime (i.e. when developing)
#### View the application at [http://localhost/patient-js/](http://localhost/patient-js/)

## Login with:
+ username `linda`, password: `password` - Trainee, has patient:read permission only
+ username `annasmith`, password: `password` - Administrator, has patient:read and patient:write permission

## Areas of Improvement
+ Add sorting to table columns
+ Make the tables prettier
+ Implement web-sockets so that data tables are updated in real time between multiple users
+ Add SSL certificate (important if using actual passwords, ok for now since dummy password is used)
+ Make IE11 friendly (may not be important as IE is being phased out by Microsoft)
