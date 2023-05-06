const express = require('express');

const server = express();
server.use(express.json())

const cursos = ['Node.js', 'JavaScript', 'React Native']

//Criando um middleware global
server.use((req, res, next) =>{
  console.log(`Url chamada ${req.url}`);
  return next();
})

//Criando um middleware especifico.
function checkCurso(req, res, next){
  if(!req.body.name){
    return res.status(400).json({error: 'Nome do curso é obrigatório.'});
  }

  return next();
}

function checkIndexCurso(req, res, next) {
  const { index } = req.params;
  if(!cursos.indexOf(index)){
    return res.status(404).json({error: 'Id informado não encontrado.'})
  }
}

server.get('/cursos/:index', (req, res) => {
  const { index } = req.params;
  return res.json(cursos[index]);
})

server.get('/cursos', (req, res) =>{
  return res.json(cursos); 
})

server.post('/cursos', checkCurso, (req, res) =>{
  const { name } = req.body;
  cursos.push(name);
  return res.json(cursos);
})

server.put('/cursos/:index', checkCurso, (req, res) =>{
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