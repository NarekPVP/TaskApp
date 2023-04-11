### Authentication API (KeyCloak)

#### Login

**POST** `http://{url}/user/login`

##### Body

```json
{
    "username": "narekprog2",
    "password": "nareknarek"
}
```

##### success login

```json
{
    "id": "f0439c86-0429-4fda-8da1-e5ce403c8342",
    "createdTimestamp": 1680711118964,
    "username": "narekprog2",
    "enabled": true,
    "totp": false,
    "emailVerified": false,
    "firstName": "Narek",
    "lastName": "Hovhannisyan",
    "email": "hnarek20052@gmail.com",
    "disableableCredentialTypes": [],
    "requiredActions": [],
    "notBefore": 0,
    "access": {
        "manageGroupMembership": true,
        "view": true,
        "mapRoles": true,
        "impersonate": false,
        "manage": true
    }
}
```

##### failed login
```json
{
    "statusCode": 422, // Unprocessable Entity
    "message": "Login credentials are not correct"
}
```

#### Get all users

**GET** `http://{url}/user`

Response
```json
[
    {
        "id": "f0439c86-0429-4fda-8da1-e5ce403c8342",
        "createdTimestamp": 1680711118964,
        "username": "narekprog2",
        "enabled": true,
        "totp": false,
        "emailVerified": false,
        "firstName": "Narek",
        "lastName": "Hovhannisyan",
        "email": "hnarek20052@gmail.com",
        "disableableCredentialTypes": [],
        "requiredActions": [],
        "notBefore": 0,
        "access": {
            "manageGroupMembership": true,
            "view": true,
            "mapRoles": true,
            "impersonate": false,
            "manage": true
        }
    },
    {
        "id": "683a8d17-86aa-4009-b011-3ea7d83e903b",
        "createdTimestamp": 1680702567401,
        "username": "narekpvp",
        "enabled": true,
        "totp": false,
        "emailVerified": false,
        "firstName": "Narek",
        "lastName": "Hovhannisyan",
        "email": "hnarek2005@gmail.com",
        "disableableCredentialTypes": [],
        "requiredActions": [],
        "notBefore": 0,
        "access": {
            "manageGroupMembership": true,
            "view": true,
            "mapRoles": true,
            "impersonate": false,
            "manage": true
        }
    }
]
```

#### Get user by id

**GET** `http://{url}/user/{id:guid}`

If user found with specified id

```json
{
    "id": "f0439c86-0429-4fda-8da1-e5ce403c8342",
    "createdTimestamp": 1680711118964,
    "username": "narekprog2",
    "enabled": true,
    "totp": false,
    "emailVerified": false,
    "firstName": "Narek",
    "lastName": "Hovhannisyan",
    "email": "hnarek20052@gmail.com",
    "disableableCredentialTypes": [],
    "requiredActions": [],
    "notBefore": 0,
    "access": {
        "manageGroupMembership": true,
        "view": true,
        "mapRoles": true,
        "impersonate": false,
        "manage": true
    }
}
```

else we will get

```json
{
    "statusCode": 404,
    "message": "User with specified id %id not found!",
    "error": "Not Found"
}
```

#### Tasks API

##### Get all tasks

**GET** `http://{url}/tasks`

**response**

```json
[
    {
        "id": 10,
        "title": "How to create Unit test in Nest.js",
        "description": "Read documentation...",
        "createdAt": "2023-04-01",
        "updatedAt": null
    },
    {
        "id": 9,
        "title": "How to create Unit test in C#",
        "description": "use Microsoft.Testing lib",
        "createdAt": "2023-04-01",
        "updatedAt": null
    }
    // ...
]
```

##### Create a new task

**POST** `http://{url}/tasks`

##### Body

```json
{
    "title": "Some task",
    "description": "Some task description",
    "createdAt": "2023-04-01T13:07:13.154Z"
}
```

**response**

```json
{
    "id": 22,
    "title": "Some task",
    "description": "Some task description",
    "createdAt": "2023-04-01T13:07:13.154Z",
    "updatedAt": null
}
```

##### Get task with specified id

**GET** `http://{url}/tasks/{id:int}`

If task found with specified id

```json
{
    "id": 2,
    "title": "How to create Unit test in C#",
    "description": "use Microsoft.Testing lib",
    "createdAt": "2023-03-30",
    "updatedAt": "2023-03-30"
}
```

If task not found with specified id

```json
{
    "statusCode": 404,
    "message": "Task not found with specified id: {id}"
}
```

##### Update an existing task
**PUT** `http://{url}/tasks/{id:int}`

##### Body

```json
{
    "title": "Updated title",
    "description": "Updated description",
    "updatedAt": "2023-04-01"
}
```

Success response

```json
{
    "status": 200,
    "message": "task has been updated"
}
```

If something went wrong we will get

```json
{
    "statusCode": 422,
    "message": "Task credentials are not correct"
}
```

##### Delete task with specifed id
**DELETE** `http://{url}/tasks/{id:int}`

if task was found with specified id

```json
{
    "status": 200,
    "message": "Task with id: %id has been deleted"
}
```

else

```json
{
    "statusCode": 404,
    "message": "Task with specified id %id not found!"
}
```