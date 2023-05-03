
# Task Management App Documentation

Welcome to the documentation for our task management app. This app provides a user-friendly interface for managing tasks, including adding, viewing, deleting, and updating them. Additionally, the app includes a chat system for communicating with other users.

## Authentication

The app uses Keycloak for authentication. To use the app, you need to log in with your credentials. Once you are logged in, the app will obtain an access token from Keycloak, which is a JWT that includes information about your identity and permissions.

## Task Management

The main feature of the app is task management. You can use the app to create tasks, view tasks, update tasks, and delete tasks that belong to you.

### View tasks

The app provides a list of all your tasks. You can click on a task to view its details.

### Add a task

You can add a new task by clicking the "Add Task" button. This will open a form where you can enter the title, description, and status of the new task.

### Update a task

To update a task, click on the task to view its details. From there, you can edit the title, description, and status of the task.

### Delete a task

To delete a task, click on the task to view its details. From there, you can click the "Delete Task" button to delete the task.

## Chat System

The app also includes a chat system that allows you to communicate with other users. You can use the chat system to send messages to other users and receive messages from them in real-time.

### Chat with other users

To use the chat system, click on the "Chat" button. This will open the chat window, where you can see the messages sent by other users and send messages yourself.

## Websockets

The app uses WebSockets for real-time communication with the server. This allows the app to receive updates in real-time without having to constantly refresh the page.
