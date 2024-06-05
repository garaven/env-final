const db = require('../database')

function pageIndex(req, res) {
  res.sendFile(process.cwd() + '/src/index.html')
}

function pageLogin(req, res) {
  if (req.session.loggedin == true) {
    res.redirect('/home')
  } else {
    res.sendFile(process.cwd() + '/src/view/login.html')
  }
}

function pagePerfil(req, res) {
  if (req.session.loggedin == true) {
    res.sendFile(process.cwd() + '/src/view/perfil.html')
  } else {
    res.redirect('/login')
  }
}

function pageConsumo(req, res) {
  if (req.session.loggedin == true) {
    res.sendFile(process.cwd() + '/src/view/consumo.html')
  } else {
    res.redirect('/login')
  }
}

function pageChat(req, res) {
  if (req.session.loggedin == true) {
    res.sendFile(process.cwd() + '/src/view/chat.html')
  } else {
    res.redirect('/login')
  }
}

function pageObjetivos(req, res) {
  if (req.session.loggedin == true) {
    if (process.env.TIPO == 'subgerente') {
      res.sendFile(process.cwd() + '/src/view/objetivosSubgerente.html')
    }

    if (process.env.TIPO == 'empleado') {
      res.sendFile(process.cwd() + '/src/view/objetivosEmpleado.html')
    }
  } else {
    res.redirect('/login')
  }
}

function pageListado(req, res) {
  if (req.session.loggedin == true) {
    res.sendFile(process.cwd() + '/src/view/listado.html')
  } else {
    res.redirect('/login')
  }
}

function pageCuentaInactiva(req, res) {
  res.sendFile(process.cwd() + '/src/view/cuentaInactiva.html')
}

function pageHome(req, res) {
  if (req.session.loggedin == true) {
    res.sendFile(process.cwd() + '/src/view/home.html')
  } else {
    res.redirect('/login')
  }
}

function pagePermisos(req, res) {
  if (req.session.loggedin == true) {
    if (process.env.TIPO == 'gerente') {
      res.sendFile(process.cwd() + '/src/view/permisos.html')
    } else {
      res.redirect('/noAcceso')
    }
  } else {
    res.redirect('/login')
  }
}

function pagePanel(req, res) {
  if (req.session.loggedin == true) {
    if (process.env.TIPO == 'gerente' || process.env.TIPO == 'subgerente') {
      res.sendFile(process.cwd() + '/src/view/panelControl.html')
    } else {
      res.redirect('/noAcceso')
    }
  } else {
    res.redirect('/login')
  }
}

function pageDesactivarCuenta(req, res) {
  if (req.session.loggedin == true) {
    if (process.env.TIPO != 'gerente' && process.env.TIPO != 'subgerente') {
      res.redirect('/noAcceso')
    } else {
      if (process.env.TIPO == 'subgerente') {
        db.query('SELECT desactivar_cuenta FROM permiso WHERE cod_subgerente = ?', [process.env.CODIGO_USUARIO], (err, resultado) => {
          if (err) {
            return res.status(500).send('Error interno del servidor');
          }
          if (resultado[0].desactivar_cuenta == 'N') {
            res.redirect('/noAcceso')
          } else {
            res.sendFile(process.cwd() + '/src/view/desactivarCuenta.html')
          }
        })
      } else {
        res.sendFile(process.cwd() + '/src/view/desactivarCuenta.html')
      }
    }
  } else {
    res.redirect('/login')
  }
}

function pageActualizarDatos(req, res) {
  if (req.session.loggedin == true) {
    if (process.env.TIPO != 'gerente' && process.env.TIPO != 'subgerente') {
      res.redirect('/noAcceso')
    } else {
      if (process.env.TIPO == 'subgerente') {
        db.query('SELECT cambio_contrasena FROM permiso WHERE cod_subgerente = ?', [process.env.CODIGO_USUARIO], (err, resultado) => {
          if (err) {
            return res.status(500).send('Error interno del servidor');
          }
          if (resultado[0].cambio_contrasena == 'N') {
            res.redirect('/noAcceso')
          } else {
            res.sendFile(process.cwd() + '/src/view/actualizarDatos.html')
          }
        })
      } else {
        res.sendFile(process.cwd() + '/src/view/actualizarDatos.html')
      }
    }
  } else {
    res.redirect('/login')
  }
}

function pageCrearCuenta(req, res) {
  if (req.session.loggedin == true) {
    if (process.env.TIPO != 'gerente' && process.env.TIPO != 'subgerente') {
      res.redirect('/noAcceso')
    } else {
      if (process.env.TIPO == 'subgerente') {
        db.query('SELECT crear_cuenta FROM permiso WHERE cod_subgerente = ?', [process.env.CODIGO_USUARIO], (err, resultado) => {
          if (err) {
            return res.status(500).send('Error interno del servidor');
          }
          if (resultado[0].crear_cuenta == 'N') {
            res.redirect('/noAcceso')
          } else {
            res.sendFile(process.cwd() + '/src/view/crearCuenta.html')
          }
        })
      } else {
        res.sendFile(process.cwd() + '/src/view/crearCuenta.html')
      }
    }
  } else {
    res.redirect('/login')
  }
}


function pageNoAcceso(req, res) {
  if (req.session.loggedin == true) {
    res.sendFile(process.cwd() + '/src/view/noAcceso.html')
  } else {
    res.redirect('/login')
  }
}

module.exports = {
  pageIndex: pageIndex,
  pageLogin: pageLogin,
  pagePerfil: pagePerfil,
  pageConsumo: pageConsumo,
  pageChat: pageChat,
  pageHome: pageHome,
  pageListado: pageListado,
  pageObjetivos: pageObjetivos,
  pageCuentaInactiva: pageCuentaInactiva,
  pagePermisos: pagePermisos,
  pagePanel: pagePanel,
  pageDesactivarCuenta: pageDesactivarCuenta,
  pageActualizarDatos: pageActualizarDatos,
  pageCrearCuenta: pageCrearCuenta,
  pageNoAcceso: pageNoAcceso
}