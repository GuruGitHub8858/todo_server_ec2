import { addTodo, deleteTodo, getTodo, updateTodo } from "../Controller/todoController.js";

import express from 'express'

const route = express.Router()

route.post('/addtodo', addTodo);
route.get('/gettodo', getTodo)
route.put('/updatetodo/:id', updateTodo)
route.delete('/deletetodo/:id', deleteTodo)
export default route

