const bcrypt = require('bcrypt')
const bd = require('../database')
let nombre

function auth(req, res) {
  const data = req.body
  console.log(data)
  bd.query('SELECT * FROM usuario WHERE codigo = ? AND tipo = ?', [data.codigo, data.tipoUsuario], (err, userdata) => {
    if (userdata.length > 0) {
      nombre = userdata[0].nombre
      process.env.NOMBRE = userdata[0].nombre
      process.env.CORREO = userdata[0].correo
      process.env.ACTIVO = userdata[0].activo
      process.env.TIPO = userdata[0].tipo
      process.env.CONTRASENA = userdata[0].contrasena
      process.env.CODIGO_USUARIO = userdata[0].codigo

      console.log('Usuario encontrado')
      console.log(data)
      console.log('contra:' + userdata[0].contrasena)
      if (data.contrasena != userdata[0].contrasena) {
        console.log('Contrasena incorrecta')
        res.send('<span>Contrasena incorrecta</span>')
      } else {
        if (userdata[0].activo == 'N') {
          res.redirect('/cuentaInactiva')
        } else {          
          req.session.userdata = userdata[0]
          // console.log(userdata[0])
          console.log('Ingreso satisfactorio :O')
          req.session.loggedin = true
          req.session.codigo = userdata[0].codigo
          res.redirect('/home')
        }
      }
    } else {
      res.send('<span>Usuario no registrado<span>')
    }
  })
}

function logout(req, res) {
  if (req.session.loggedin == true) {
    req.session.destroy()
  }

  res.redirect('/login')

}

module.exports = {
  auth: auth,
  logout: logout,
  nombre: nombre
}