const express = require("express");
const app = express();
const PORT = 5000;

app.listen(PORT)
const createUser = require('./routes/createUser');
const getAllTask = require('./routes/getAllTask');
const deleteUser = require('./routes/deleteUser');
const createTask = require('./routes/createTask');
const getParticularTask = require('./routes/getParticularTask');
const deleteTask = require('./routes/deleteTask');
const editTask = require('./routes/editTask');
app.use("/todo",createUser,deleteUser,createTask,getParticularTask,editTask,getAllTask,deleteTask);