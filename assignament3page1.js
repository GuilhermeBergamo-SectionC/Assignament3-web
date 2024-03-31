const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "test" && password === "123") {
       
        window.location.href = "Assignament3.html";
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})
