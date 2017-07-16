(function () {
"use strict";

    let form = document.getElementsByTagName('form')[0];
    let username = document.getElementsByName('username')[0];
    let password = document.getElementsByName('password')[0];
    let usernameDesc = document.querySelector('.username .text-desc');
    let passwordDesc = document.querySelector('.password .text-desc');
    let messageElem = document.querySelector('#message');
    let messageHead = document.querySelector('#message .header');
    let messageBody = document.querySelector('#message p');

    // Each time something is typed in the username field.
    username.addEventListener("input", function (event) {

        if (!username.validity.valid) {
            $('.username').addClass('error');
        }
        else {
            $('.username').removeClass('error');
        }

    }, false);

    // Each time something is typed in the username field.
    password.addEventListener("input", function (event) {

        if (!password.validity.valid) {
            $('.password').addClass('error');
        }
        else {
            $('.password').removeClass('error');
        }

    }, false);

    // Each time form is submitted.
    form.addEventListener('submit', function(event) {

        let resultErrorMsg = "<ul>";
        let showErrorMsg = false;
        let usernameVal = username.value;
        let passwordVal = password.value;

        // Username validation.
        if (username.validity.valueMissing) {
            // No username entered.

            resultErrorMsg += "<li>Please enter a username.</li>";
            showErrorMsg = true;
        }
        else {
            if (!(/([A-z0-9])+/).test(usernameVal)) {
                // Alphanumeric characters.

                resultErrorMsg += "<li>Username must contain only alphanumeric characters.</li>";
                showErrorMsg = true;
            }
            else if (!(/.{5,}/).test(usernameVal)) {
                // At least 5 characters.

                resultErrorMsg += "<li>Username must contain at least 5 characters.</li>";
                showErrorMsg = true;
            }
            else if (!(/.{5,20}/).test(usernameVal) || (usernameVal.length > 20)) {
                // Cannot contain more than 20 characters.

                resultErrorMsg += "<li>Username cannot contain more than 20 characters.</li>";
                showErrorMsg = true;
            }
        }

        // Password validation.
        if (password.validity.valueMissing) {
            // No password entered.

            resultErrorMsg += "<li>Please enter a password.</li>";
            showErrorMsg = true;
        }
        else {
            if (!(/.{8,}/).test(passwordVal) || (passwordVal.length > 20)) {
                // 8-20 characters.

                resultErrorMsg += "<li>Password must contain 8-20 characters.</li>";
                showErrorMsg = true;
            }
            if (!(/.*\d/).test(passwordVal)) {
                // At least 1 number.

                resultErrorMsg += "<li>Password must contain at least 1 number.</li>";
                showErrorMsg = true;
            }
            if (!(/.*[A-Z]/).test(passwordVal)) {
                // At least 8 characters.

                resultErrorMsg += "<li>Password must contain at least 1 uppercase letter.</li>";
                showErrorMsg = true;
            }
            if (!(/.*[a-z]/).test(passwordVal)) {
                // At least 8 characters.

                resultErrorMsg += "<li>Password must contain at least 1 lowercase letter.</li>";
                showErrorMsg = true;
            }
        }

        if (!username.validity.valid || !password.validity.valid) {

            resultErrorMsg += resultErrorMsg !== "<ul>" ? "" : "There is an unknown error."; // Passed tests but not valid.

            resultErrorMsg += "</ul>";

            $('#message').removeClass('success');
            $('#message').addClass('error');

            messageHead.innerHTML = 'Action Forbidden';
            messageBody.innerHTML = resultErrorMsg;
            messageElem.style.display = "block"; // Show the error message if there are any errors.
        }
        else {
            // The username and password are valid! Send the account information to the server.

            // Use jQuery to do Ajax POST.
            $.post('/accountNew', $('#account').serialize(), function(data) {

                    if (data.status === 'SUCCESS') {
                        // Account registered successfully.

                        $('#message').removeClass('error');
                        $('#message').addClass('success');

                        messageHead.innerHTML = 'Success!';
                        messageBody.innerHTML = data.message;
                    }
                    else {
                        // Account could not be registered.

                        $('#message').removeClass('success');
                        $('#message').addClass('error');

                        messageHead.innerHTML = 'Error registering account';
                        messageBody.innerHTML = data.message;
                    }

                    messageElem.style.display = "block";
                }
            );
        }



        event.preventDefault();

    }, false);

})();