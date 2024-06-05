const express = require('express')
const loginRoutes = require('./routes/login')
const session = require('express-session')
const bodyParser = require('body-parser')
const { Server } = require('socket.io')
const { createServer } = require('node:http')
const db = require('./database')

const app = express()
port = process.env.PORT ?? 1234
const server = createServer(app)

const io = new Server(server, {
  connectionStateRecovery: {}
})

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

io.on('connection', (socket) => {
  console.log('A user has connected')

  socket.on('chat message', (msg) => {
    io.emit('chat message', { message: msg, username: process.env.NOMBRE, code: process.env.CODIGO_USUARIO })
  })

  socket.on('chat message', async (msg) => {
    let result
    try {
      result = db.query('INSERT INTO mensajes (contenido, usuario) VALUES (?, ?)', [msg, process.env.NOMBRE])
    } catch (e) {
      console.error(e)
      return
    }
  })
})

app.get('/historial', (req, res) => {
  try {
    db.query('SELECT contenido, usuario FROM mensajes', (err, resultados) => {
      const mensajesHTML = resultados.map(resultado => `<li><strong>${resultado.usuario}</strong> ${resultado.contenido}</li>`).join('')
      res.send(`<ul>${mensajesHTML}</ul>`)
    });
  } catch (error) {
    console.error('Error al recuperar mensajes anteriores de la base de datos:', error);
  }
})

// Nav

app.get('/nav', (req, res) => {

  if (process.env.TIPO == 'empleado') {
    res.send(`
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Reddit+Mono:wght@200..900&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Reddit Mono', sans-serif;
    }
    
    #nav {
      background-color: #fff;
      padding: 20px;
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid;
      margin-bottom: 50px;
    }
    
    #nav span {
      font-weight: bold;
      font-size: large;
    }
    
    #nav ul {
      display: flex;
      list-style: none;
      gap: 50px;
    }
    </style>
    <nav id="nav">
    <span>Envirosense</span>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/consumo">Consumo</a></li>
      <li><a href="/chat">Chat</a></li>
      <li><a href="/objetivos">Objetivos</a></li>
      <li><a href="/listado">Listado</a></li>
      <li><a href="/perfil">Perfil</a></li>
      <li><a href="/logout">Cerrar sesión</a></li>
    </ul>
  </nav>
  `)
  }

  if (process.env.TIPO == 'subgerente') {
    res.send(`
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Reddit+Mono:wght@200..900&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Reddit Mono', sans-serif;
    }
    
    #nav {
      background-color: #fff;
      padding: 20px;
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid;
      margin-bottom: 50px;
    }
    
    #nav span {
      font-weight: bold;
      font-size: large;
    }
    
    #nav ul {
      display: flex;
      list-style: none;
      gap: 50px;
    }
    </style>
    <nav id="nav">
    <span>Envirosense</span>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/consumo">Consumo</a></li>
      <li><a href="/chat">Chat</a></li>
      <li><a href="/objetivos">Objetivos</a></li>
      <li><a href="/listado">Listado</a></li>
      <li><a href="/perfil">Perfil</a></li>
      <li><a href="/panel">Panel</a></li>
      <li><a href="/logout">Cerrar sesión</a></li>
    </ul>
  </nav>
  `)
  }

  if (process.env.TIPO == 'gerente') {
    res.send(`
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Reddit+Mono:wght@200..900&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Reddit Mono', sans-serif;
    }
    
    #nav {
      background-color: #fff;
      padding: 20px;
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid;
      margin-bottom: 50px;
    }
    
    #nav span {
      font-weight: bold;
      font-size: large;
    }
    
    #nav ul {
      display: flex;
      list-style: none;
      gap: 50px;
    }
    </style>
    <nav id="nav">
    <span>Envirosense</span>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/consumo">Consumo</a></li>
      <li><a href="/chat">Chat</a></li>
      <li><a href="/listado">Listado</a></li>
      <li><a href="/perfil">Perfil</a></li>
      <li><a href="/panel">Panel</a></li>
      <li><a href="/permisos">Permisos</a></li>
      <li><a href="/logout">Cerrar sesión</a></li>
    </ul>
  </nav>
  `)
  }
})

app.use('/', loginRoutes)

server.listen(port, (req, res) => {
  console.log(`server listening on port http://localhost:${port}`)
})

app.use((req, res) => {
  res.sendFile(process.cwd() + '/src/view/pageNotFound.html')
})