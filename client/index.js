import express from 'express'
import path from 'path'
import dotenv from "dotenv";
import bodyParser from 'body-parser'
import { handleLoginPost, getAllUsers, getUserById } from './requests/auth/user.js';
import { getAllTasks, getTaskById, updateTask, deleteTask, createTask } from './requests/tasks/tasks.js'
import { getSpecifiedUsersMessages } from './requests/chat/chat.js';
import cors from 'cors'
import session from 'express-session'

dotenv.config()

const __dirname = path.resolve()
const PORT = process.env.PORT ?? 7266
const app = express()

app.use(cors())
app.use(session({
    secret: 's%3Al3ozSdvQ83TtC5RvJ.CibaQoHtaY0H3QOB1kqR8H2A', // A secret string used to sign the session ID cookie
    resave: false, // Whether to save the session if it was not modified
    saveUninitialized: true // Whether to save the session if it is new but not modified
}));
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))
// app.use(checkUser)

app.get('/', (req, res) => {
    if(req.session.user) {
        res.redirect('/task')
    }

    res.render(path.resolve(__dirname, 'static', 'login.ejs'), {loggedIn: false})
})

// Authentication

app.post('/login', (req, res) => {
    handleLoginPost({
        username: req.body.username,
        password: req.body.password
    }, req, res)
})

app.get('/logout', (req, res) => {
    delete req.session.user
    res.redirect('/')
})

// Tasks

app.get('/task', async (req, res) => {
    let user = req.session.user
    if(user) {
        const tasks = await getAllTasks()
        res.render(path.resolve(__dirname, 'static', 'main.ejs'), {tasks: tasks, user: user, loggedIn: true})
    }
})

app.get('/task/add', (req, res) => {
    let user = req.session.user
    res.render(path.resolve(__dirname, 'static', 'add.ejs'), {user: user, loggedIn: true})
})

app.post('/task/add', async (req, res) => {
    let user = req.session.user

    const body = {
        userId: user.id,
        title: req.body.title,
        description: req.body.description
    }

    const newTask = await createTask(body);
    console.log(newTask);

    const tasks = await getAllTasks()
    res.render(path.resolve(__dirname, 'static', 'main.ejs'), {tasks: tasks, user: user, loggedIn: true})
})

app.get('/task/edit/:id', async (req, res) => {
    const taskId = req.params.id;
    const taskToEdit = await getTaskById(taskId);

    if(taskToEdit) {
        // load view
        res.render(path.resolve(__dirname, 'static', 'edit.ejs'), {task: taskToEdit, loggedIn: true})
    } else {
        res.redirect('/task')
    }
})

app.post('/task/edit', async (req, res) => {
    let user = req.session.user
    if(!user) {
        res.redirect('/login')
    }

    const body = {
        title: req.body.title,
        description: req.body.description,
        updatedAt: new Date().toISOString()
    }

    await updateTask(req.params.id, body)

    const tasks = await getAllTasks()
    res.render(path.resolve(__dirname, 'static', 'main.ejs'), {tasks: tasks, user: user, loggedIn: true})
})

app.get('/task/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        await deleteTask(id)
        const previousPage = req.header('Referer') || '/';
        res.redirect(previousPage);
    } catch (err) {
        console.warn(err)
    }
})

app.get('/chat', async (req, res) => {
    const user = req.session.user
    const users = await getAllUsers()
    console.log(users)
    res.render(path.resolve(__dirname, 'static', 'chats.ejs'), {user: user, users: users, loggedIn: true})
})

app.get('/chat/:id/:currentUserId', async (req, res) => {
    const id = req.params.id
    const currentUser = req.session.user
    const userToChat = await getUserById(id)
    const users = await getAllUsers()
    const currentChatMessages = await getSpecifiedUsersMessages(req.params.currentUserId, id)

    console.log("user to chat with ", userToChat)
    console.log("current user", currentUser)

    res.render(path.resolve(__dirname, 'static', 'chat.ejs'), {user: currentUser, userToChat: userToChat, users: users, messages: currentChatMessages, loggedIn: true})
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
}); 