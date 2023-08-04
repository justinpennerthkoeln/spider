window.addEventListener("DOMContentLoaded", (event) => {
    const urlParams = new URLSearchParams(window.location.search)
    const error = urlParams.get('error');
    const success = urlParams.get('success');

    switch(error) {
        case "wrong_credentials": showErrorMessage("Wrong E-mail / password!", "error"); break;
        case "not_logged_in": showErrorMessage("Log in first!", "error"); break;
    }
    switch(success) {
        case "logged_out": showSuccessMessage("Successfully logged out!", "success"); break;
        case "login": showSuccessMessage("Successfully logged in!", "success"); break;
    }

    function showErrorMessage(message, style_class) {
        document.querySelector("#error-msg p").innerHTML = message;
        document.querySelector("#error-msg p").classList.add(style_class);
        document.querySelector("#error-msg").classList.remove("hidden");
    }

    function showSuccessMessage(message, style_class) {
        document.querySelector("#error-msg p").innerHTML = message;
        document.querySelector("#error-msg p").classList.add(style_class);
        document.querySelector("#error-msg").classList.remove("hidden");
    }
});