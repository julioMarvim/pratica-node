const express = require('express');

const server = express();
server.use(express.json())

const cursos = ['Node.js', 'JavaScript', 'React Native']

server.get('/cursos/:index', (req, res) => {
  const { index } = req.params;
  return res.json(cursos[index]);
})

server.get('/cursos', (req, res) =>{
  return res.json(cursos); 
})

server.post('/cursos', (req, res) =>{
  const { name } = req.body;
  cursos.push(name);
  return res.json(cursos);
})

server.put('/cursos/:index', (req, res) =>{
  const { index } = req.params;
  const { name }  = req.body;

  cursos[index] = name;
  return res.json(cursos);
})

server.delete('/cursos/:index', (req, res) => {
  const { index } = req.params;
  cursos.splice(index);
  return res.send();
})

server.listen(3000); 