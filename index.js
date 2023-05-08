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
  const curso = cursos[req.params.index];
  if(!curso){
    return res.status(404).json({error: 'Id informado não encontrado.'})
  }

  req.curso = curso;

  return next();
}

server.get('/cursos/:index', checkIndexCurso, (req, res) => {
  return res.json(req.curso);
})

server.get('/cursos', (req, res) =>{
  return res.json(cursos); 
})

server.post('/cursos', checkCurso, (req, res) =>{
  const { name } = req.body;
  cursos.push(name);
  return res.json(cursos);
})

//Podemos utilizar quantos middlewares forem necessários
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) =>{
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