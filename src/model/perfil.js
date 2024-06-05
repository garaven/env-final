const db = require('../database')

// GET /infoUsuario/:dato

function info(req, res) {
  if (req.params.dato == 'nombre') {
    res.send(process.env.NOMBRE)
  }
  if (req.params.dato == 'correo') {
    res.send(process.env.CORREO)
  }
  if (req.params.dato == 'activo') {
    res.send(process.env.ACTIVO)
  }
  if (req.params.dato == 'tipo') {
    res.send(process.env.TIPO)
  }
  if (req.params.dato == 'contrasena') {
    res.send(process.env.CONTRASENA)
  }
  if (req.params.dato == 'codigo') {
    res.send(process.env.CODIGO_USUARIO)
  }
  if (req.params.dato == 'perfil') {
    res.send(`
      <div hx-target="this" hx-swap="outerHTML">
        <div><label>Nombre</label>: ${process.env.NOMBRE}</div>
        <div><label>Correo</label>: ${process.env.CORREO}</div>
        <div><label>Contrasena</label>: <input value='${process.env.CONTRASENA}' type='password' readonly></input></div>
        <button hx-get="/infoUsuario/editarPerfil" class="btn btn-primary">
        Click To Edit
        </button>
      </div>
    `)
  }
  if (req.params.dato == 'editarPerfil') {
    res.send(`
      <form id='contenedor' hx-put="/editarPerfil" hx-target="this" hx-swap="outerHTML">
        <div>
          <label>Nombre</label>
          <input autocomplete='off' type="text" name="nombre" value="${process.env.NOMBRE}">
        </div>
        <div class="form-group">
          <label>Correo</label>
          <input autocomplete='off' type="email" name="correo" value="${process.env.CORREO}">
        </div>
        <div class="form-group">
          <label>Contrasena</label>
          <input type="password" name="contrasena" value="${process.env.CONTRASENA}">
        </div>
        <button class="btn">Submit</button>
        <button class="btn" hx-get="/infoUsuario/perfil">Cancel</button>
      </form>
    `)
  }
}

// PUT /editarPerfil

function editarPerfil(req, res) {
  codigo = process.env.CODIGO_USUARIO
  datos = req.body
  db.query('UPDATE usuario SET nombre = ?, correo = ?, contrasena = ? WHERE codigo = ?', [datos.nombre, datos.correo, datos.contrasena, codigo], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      console.log('DATOS ACTUALIZADOS CORRECTAMENTE')
      db.query('SELECT nombre, correo, contrasena FROM usuario WHERE codigo = ?', [codigo], (err, resultado) => {
        if (err) {
          console.error(err)
        } else {
          process.env.NOMBRE = resultado[0].nombre
          process.env.CORREO = resultado[0].correo
          process.env.CONTRASENA = resultado[0].contrasena
          res.send(`
        <div hx-target="this" hx-swap="outerHTML">
          <div><label>Nombre</label>: ${process.env.NOMBRE}</div>
          <div><label>Correo</label>: ${process.env.CORREO}</div>
          <div><label>Contrasena</label>: <input value='${process.env.CONTRASENA}' type='password' readonly></input></div>
          <button hx-get="/infoUsuario/editarPerfil" class="btn btn-primary">
          Click To Edit
          </button>
        </div>
      `)
        }
      })

    }
  })
}


module.exports = {
  info : info,
  editarPerfil : editarPerfil
}