let username = document.getElementById("username");
let password = document.getElementById("password");

let loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(username.value, password.value);
    sendLoginRequest({
        username: username.value,
        password: password.value
    });
});

let sendLoginRequest = (loginData) => {
    fetch('http://localhost:3000/user/login', {
        method: "POST",
        body: JSON.stringify({
            username: loginData.username,
            password: loginData.password
        }),
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.json())
        .then(user => {
            if (user) {
                console.log(user);
                // TODO: add user to LocalStorage
            } else {
                console.warn("Failed to login");
            }
        })
        .catch(err => console.error(err));
}