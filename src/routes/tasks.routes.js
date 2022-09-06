const { Router } = require('express');
const { getAlltasks, getSingleTask, createTask, deleteTask, updateTask } = require('../controllers/tasks.controllers');
//const pool = require('../db');

const router = Router();

router.get('/tasks', getAlltasks);

router.get('/tasks/:id', getSingleTask);

router.post('/tasks', createTask);

router.delete('/tasks/:id', deleteTask);

router.put('/tasks/:id', updateTask);

module.exports = router;