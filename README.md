# account-signup-ex
This is a static website for simple account registration created as an exercise. 

It consists of a web page that asks for some account information (username & password). If the user clicks submit and passes the form validation, the information will be sent to the server. The server will then append the username & password to a JSON file.

There is NO SECURITY whatsoever. This application should only be deployed locally and you should only use dummy data. Passwords are stored in plaintext.

## Technology

For front-end, it uses simple HTML forms, [jQuery](https://jquery.com/), and [Semantic-UI](https://semantic-ui.com/). 

Back-end, it uses [NodeJS](https://nodejs.org/), and [Express](https://expressjs.com/).

## Setup

Clone the repository. Make sure you have npm, NodeJS, and Gulp.

1. Go to the `public/` directory and install Semantic UI. More information on installing Semantic UI [here](https://semantic-ui.com/introduction/getting-started.html).
    ```bash
    cd public/
    npm install semantic-ui --save
    cd semantic/
    gulp build
    ```
    Make sure you are installing the `semantic/` folder in the `public/` directory.
    
    Note: This step can be skipped. It is only necessary for styling the webpage. 

2. Go to the parent directory `account-signup-ex/` and make sure all other dependencies are installed.
    ```bash
    npm install
    ```
  
3. Start the server.
    ```bash
    npm start
    ```
    or
    ```bash
    node server.js
    ```

4. Navigate to [http://localhost:3000/](http://localhost:3000/) in a browser. Enjoy!
