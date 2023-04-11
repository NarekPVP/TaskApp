export async function getAllTasks() {
    return await fetch(`${process.env.API_URL}/tasks`)
    .then((response) => response.json())
    .then((tasks) => {
        return tasks;
    })
    .catch((error) => console.error(error))
}

export async function getTaskById(id) {
    return await fetch(`${process.env.API_URL}/tasks/${id}`)
        .then((response) => { return response.json() })
        .catch(() => { return false })
}

export async function createTask(body) {
    return await fetch(`${process.env.API_URL}/tasks/}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch((err) => console.warn(err))
}

export async function updateTask(id, body) {
    return await fetch(`${process.env.API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
    .catch(err => console.error(err))
}

export async function deleteTask(id) {
    return await fetch(`${process.env.API_URL}/tasks/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .catch(err => console.error(err))
}