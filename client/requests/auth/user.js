export function handleLoginPost(user, req, res) {
    fetch(`${process.env.API_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify({
            username: user.username,
            password: user.password
        }),
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.json())
        .then(user => {
            if (user.statusCode !== 422) {
                req.session.user = JSON.parse(JSON.stringify(user))
                res.redirect('/task')
            } else {
                console.warn("Failed to login");
                res.redirect('/')
            }
        })
        .catch(err => console.error(err));
}

export async function getAllUsers() {
    return await fetch(`${process.env.API_URL}/user`)
        .then(users => { return users.json() })
        .catch(err => { return err.message })
}

export async function getUserById(id) {
    return await fetch(`${process.env.API_URL}/user/${id}`)
        .then(user => { return user.json() })
        .catch(err => console.error(err))
}