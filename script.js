document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-button');
    const form = document.getElementById('signup-form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('e-mail');
    const phoneNumber = document.getElementById('phone-number');
    const passwordA = document.getElementById('password');
    const passwordB = document.getElementById('cfm-password');

    submitButton.addEventListener('click', function() {
        if(validateForm()) {
            form.submit();
        }
    });

    function validateForm() {
        clearErrorMessages();
        let valid = true;
        if(firstName.value === '') {
            valid = false;
            addErrorMessage(firstName, 'empty');
        }

        if(lastName.value === '') {
            valid = false;
            addErrorMessage(lastName, 'empty');
        }

        if(email.value === '') {
            valid = false;
            addErrorMessage(email, 'empty');
        } else if (!isValidEmail(email.value)) {
            valid = false;
            addErrorMessage(email, 'invalid');
        }

        if(phoneNumber.value === '') {
            valid = false;
            addErrorMessage(phoneNumber, 'empty');
        }

        if(passwordA.value === '') {
            valid = false;
            addErrorMessage(passwordA, 'empty');
        } else if (!isValidPassword(passwordA.value)) {
            valid = false;
            addErrorMessage(passwordA, 'invalid');
        }

        if (passwordB.value === '') {
            valid = false;
            addErrorMessage(passwordB, 'empty');
        } else if (!isValidPassword(passwordB.value)) {
            valid = false;
            addErrorMessage(passwordB, 'invalid');
        }

        if (isValidPassword(passwordA.value)||isValidPassword(passwordB.value)) {
            if (!doPasswordsMatch(passwordA.value, passwordB.value)) {
            valid = false;
            addErrorMessage(passwordA, 'not-matching');
            }
        }
        return valid;
    }

    function addErrorMessage(input, reason) {
        const formRow = input.parentNode;
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('message');
        if (input.type === 'text') {
            errorMessage.textContent = '*Please enter a name';
        } else if (input.type === 'email') {
            if (reason === 'empty') {
                errorMessage.textContent = '*Please enter an email';
            } else if (reason === 'invalid'){
                errorMessage.textContent = '*Please enter a valid email';
            }
        } else if (input.type === 'tel') {
            errorMessage.textContent = '*Please enter a telephone number';
        } else if (input.type === 'password') {
            if (reason === 'empty') {
                errorMessage.textContent = '*Please enter a password';
            } else if (reason === 'invalid'){
                errorMessage.textContent = '*Please enter a valid password';
            } else if (reason === 'not-matching') {
                errorMessage.textContent = '*Passwords do not match';
            }
        }
        formRow.appendChild(errorMessage);
    }

    function clearErrorMessages() {
        const formRows = document.querySelectorAll('.form-row');
        formRows.forEach(formRow => {
            const errorMessages = formRow.querySelectorAll('.message');
            errorMessages.forEach(message => {
                message.remove();
            });
        });
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
        return passwordRegex.test(password);
    }

    function doPasswordsMatch(A, B) {
        return A === B;
    }
});

