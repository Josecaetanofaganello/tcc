var http = require('http');
var app = require('./config/express');
var database = require('./config/database');

var porta = 3000;

const uri = 'mongodb://teste:teste@127.0.0.1/dbcondominio';
database(uri);


http.createServer(app)
    .listen(porta, function(){
      console.log('Serviço iniciado na porta ' + porta)
    });
