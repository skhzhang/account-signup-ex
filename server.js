var express = require('express');
var app = express();
var bodyParser = require( 'body-parser' );
var fs = require('fs');

// Make sure accounts.json is a valid JSON file before running.
// If it is not, fix any syntax errors or 
// create the file and initialize it with '{}' if necessary.
var accountFile = require('./accounts.json');

app.use(express.static(__dirname + '/public'));

app.use( bodyParser.urlencoded({
  extended: true
}));
app.use( bodyParser.json() );

app.listen(3000, function() {
    console.log('Listening for requests...')
});

app.post('/accountNew', function(req, res){

    let newAccount = req.body;
    let accountExists = function(account) {
        return (account['username'] === newAccount['username']);
    };

    console.log(`Request to register account \'${newAccount.username}\' received. Processing...`)

    // Make sure accounts.json has a property "accounts" with value array.
    if (!accountFile.hasOwnProperty("accounts") || !Array.isArray(accountFile["accounts"])) {

        console.log('accounts.json does not have a property \'accounts\'. Creating now. ')

        // If not, assign it to empty array [].
        accountFile["accounts"] = [];
    }

    if (!(/[A-z0-9]{5,20}/).test(newAccount.username) || 
        !(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/).test(newAccount.password) || 
        (newAccount.username.length > 20) || 
        (newAccount.password.length > 20)) {
        // Server-side form validation.
        // Username and/or password does not fulfill constraints.

        // Send message that the username/password failed constraints.
        console.log(`Username and/or password failed form validation.`);
        res.send({status : 'FAILURE', message : `Username and/or password does not fulfill constraints required.`});

    }
    else if (accountFile['accounts'].find(accountExists)) {
        // Account with this username already exists.

        // Send message that the account already exists.
        console.log(`Account \'${req.body.username}\' already exists.`);
        res.send({status : 'FAILURE', message : `An account with the username \'${newAccount.username}\' already exists.`});
    }
    else if (!accountFile['accounts'].find(accountExists)) {
        // If this account has a unique username, add it to the accounts file.

        accountFile['accounts'].push(newAccount);

        fs.writeFile('accounts.json', JSON.stringify(accountFile), function(err) {
            if(err) {
                return console.log('Error encountered:', err);
            }

            // Send message that the account was successfully registered.
            console.log(`Account \'${req.body.username}\' successfully registered.`);
            res.send({status : 'SUCCESS', message : `Account \'${newAccount.username}\' successfully registered.`});
        })
    }
    else {

    }

});