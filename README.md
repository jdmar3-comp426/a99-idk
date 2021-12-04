[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=6316511&assignment_repo_type=AssignmentRepo)
# COMP426: User Inventory Management System

## Description
CRUD inventory management system developed with React, ExpressJS and Firebase. Our project allows users to register accounts with Firebase and record price and amounts of items that are saved in Firestore. 

## Installation Requirements
In order to use the project, go ahead and follow the next few steps in order to set up the workspace:
```
git clone git@github.com:jdmar3-comp426/a99-idk.git
cd a99-idk/ && npm i 
cd inventory-management/ && npm i
```
This will install all necessary dependencies and packages from `npm` into your workspace which should allow you to go ahead and start the project.

In order to use the Firebase API, you will need to setup your own project at the [Firebase console](https://console.firebase.google.com/). Once your project is setup, copy and paste your `firebaseConfig` JSON object and replace the blank template found at `/config/default-ex.json` then finally rename the file to `default.json` for the configuration to come into effect.

The clientside app built in React uses a proxy on port `3001` so we must take the following steps to run our application:
1. Run `npm start` in the project root directory to start the Express server. You should see a message saying, _Server running..._ in the terminal
2. Open a new terminal and then run `cd inventory-management/ && npm start` to start the React app. Your local browser should automatically open a new tab on `localhost:3000`

## Dependency List
In our React app:
+ @testing-library/jest-dom@5.16.0
+ @testing-library/react@11.2.7
+ @testing-library/user-event@12.8.3
+ nanoid@3.1.30
+ react-dom@17.0.2
+ react-firebase-hooks@4.0.1
+ react-router-dom@6.0.2
+ react-scripts@3.4.4
+ react@17.0.2
+ web-vitals@1.1.2

In our Express app:
+ express@4.17.1
+ firebase@9.5.0

## Using the Application
1. Make an account on the landing page with an appropriate length password, display name, and email. The application will redirect you to the home inventory page if your account creation was successful.
2. Add names, prices, and amounts of any items that you wish to keep track of in the app. All the items are automatically added to the database once you submit.
3. You may also edit and delete the items using the buttons on the right hand side of the list.
4. Navigate to "My Profile" by clicking on the corresponding button which will take you to a basic screen with your display name and email. 
5. Delete or edit information. You can go back to the main inventory screen at any time.

## Technical Documentation
Technical documentation on our API endpoints, system design and planning can be found in our `docs/` directory.

+ [Team Roles](docs/team-roles.md)
+ [API](docs/api.md)
+ [System Design](docs/system-design.md)

## Demo
+ [Vimeo](https://vimeo.com/653181280)
