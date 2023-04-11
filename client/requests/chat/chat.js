export async function getAllMessages() {
    return await fetch(`${process.env.API_URL}/chat`)
        .then(response => { return response.json(); })
        .catch((error) => console.error(error));
}

export async function getSpecifiedUsersMessages(firstUserId, secondUserId) {
    return await fetch(`${process.env.API_URL}/chat/${secondUserId}/${firstUserId}`)
        .then(response => {return response.json(); })
        .catch((error) => console.error(error));
}