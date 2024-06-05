const db = require('../database')


// GET /desactivarCuenta

function buscarCuentaDesactivar(req, res) {
  let codigo = req.query.codigo
  db.query('SELECT nombre, correo, tipo, activo FROM usuario WHERE codigo = ?', [codigo], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      if (resultado[0].activo == 'Y') {
        res.send(`
        <form hx-put='/desactivarCuenta/desactivar'>     
          <label>Codigo</label><input name='codigo' value='${codigo}' readonly>
          <label>Tipo de usuario</label><input name='tipo' value='${resultado[0].tipo}' readonly>
          <label>Nombre</label><input name='nombre' value='${resultado[0].nombre}' readonly>
          <label>Correo</label><input name='correo' value='${resultado[0].correo}' readonly>
          <label>Actividad</label><input name='actividad' value='Activo' readonly>
          <button>Desactivar</button>
        </form>
        `)
      } else {
        res.send(`
        <form hx-put='/desactivarCuenta/activar''>     
          <label>Codigo</label><input name='codigo' value='${codigo}' readonly>
          <label>Tipo de usuario</label><input name='tipo' value='${resultado[0].tipo}' readonly>
          <label>Nombre</label><input name='nombre' value='${resultado[0].nombre}' readonly>
          <label>Correo</label><input name='correo' value='${resultado[0].correo}' readonly>
          <label>Actividad</label><input name='actividad' value='Inactivo' readonly>
          <button>Activar</button>
        </form>
        `)
      }
    }
  })
}

// app.get('/desactivarCuenta', async (req, res) => {
//   let codigo = req.query.codigo
//   db.query('SELECT nombre, correo, tipo, activo FROM usuario WHERE codigo = ?', [codigo], (err, resultado) => {
//     if (err) {
//       console.error(err)
//     } else {
//       if (resultado[0].activo == 'Y') {
//         res.send(`
//         <form hx-put='/desactivarCuenta/desactivar'>     
//           <label>Codigo</label><input name='codigo' value='${codigo}' readonly>
//           <label>Tipo de usuario</label><input name='tipo' value='${resultado[0].tipo}' readonly>
//           <label>Nombre</label><input name='nombre' value='${resultado[0].nombre}' readonly>
//           <label>Correo</label><input name='correo' value='${resultado[0].correo}' readonly>
//           <label>Actividad</label><input name='actividad' value='Activo' readonly>
//           <button>Desactivar</button>
//         </form>
//         `)
//       } else {
//         res.send(`
//         <form hx-put='/desactivarCuenta/activar''>     
//           <label>Codigo</label><input name='codigo' value='${codigo}' readonly>
//           <label>Tipo de usuario</label><input name='tipo' value='${resultado[0].tipo}' readonly>
//           <label>Nombre</label><input name='nombre' value='${resultado[0].nombre}' readonly>
//           <label>Correo</label><input name='correo' value='${resultado[0].correo}' readonly>
//           <label>Actividad</label><input name='actividad' value='Inactivo' readonly>
//           <button>Activar</button>
//         </form>
//         `)
//       }
//     }
//   })
// })


// PUT /desactivarCuenta/:accion

function desactivarCuenta(req, res) {
  let codigo = req.body.codigo
  let actividad

  console.log(codigo)

  if (req.params.accion == 'desactivar') actividad = 'N'
  if (req.params.accion == 'activar') actividad = 'Y'

  db.query('UPDATE usuario SET activo = ? WHERE codigo = ?', [actividad, codigo], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      res.send('ACTIVIDAD ACTUALIZADA')
    }
  })
}

// app.put('/desactivarCuenta/:accion', async (req, res) => {
//   let codigo = req.body.codigo
//   let actividad

//   console.log(codigo)

//   if (req.params.accion == 'desactivar') actividad = 'N'
//   if (req.params.accion == 'activar') actividad = 'Y'

//   db.query('UPDATE usuario SET activo = ? WHERE codigo = ?', [actividad, codigo], (err, resultado) => {
//     if (err) {
//       console.error(err)
//     } else {
//       res.send('ACTIVIDAD ACTUALIZADA')
//     }
//   })
// })


// PUT /actualizarCuenta/actualizar

function actualizarCuenta(req, res) {
  const datos = req.body;

  db.query('UPDATE usuario SET nombre = ?, correo = ?, contrasena = ? WHERE codigo = ?',
    [datos.nombre, datos.correo, datos.contrasena, datos.codigo],
    async (err, resultado) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error interno del servidor')
      } else {
        res.send('<span>Datos actualizados correctamente</span>')
      }
    });
}

// app.put('/actualizarCuenta/actualizar', async (req, res) => {
//   const datos = req.body;

//   db.query('UPDATE usuario SET nombre = ?, correo = ?, contrasena = ? WHERE codigo = ?',
//     [datos.nombre, datos.correo, datos.contrasena, datos.codigo],
//     async (err, resultado) => {
//       if (err) {
//         console.error(err)
//         res.status(500).send('Error interno del servidor')
//       } else {
//         res.send('<span>Datos actualizados correctamente</span>')
//       }
//     });
// });


// GET /actualizarCuenta

function buscarCuentaActualizar(req, res) {
  const codigo = req.query.codigo;

  db.query('SELECT nombre, correo, contrasena FROM usuario WHERE codigo = ?', [codigo], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      if (resultado.length > 0) {
        const { nombre, correo, contrasena } = resultado[0]

        res.send(`
          <form hx-put="/actualizarCuenta/actualizar" hx-target="this" hx-swap="outerHTML">
            <label>Codigo</label>
            <input autocomplete='off' readonly type="text" name="codigo" value="${codigo}">
            <label>Nombre</label>
            <input autocomplete='off' type="text" name="nombre" value="${nombre}">
            <label>Correo</label>
            <input autocomplete='off' type="email" name="correo" value="${correo}">
            <label>Contrasena</label>
            <input type="password" name="contrasena" value="${contrasena}">
            <button>Actualizar</button>
          </form>
        `)
      } else {
        console.log('No se encontraron resultados')
        res.status(404).send('No se encontraron resultados')
      }
    }
  });
}

// app.get('/actualizarCuenta', async (req, res) => {
//   const codigo = req.query.codigo;

//   db.query('SELECT nombre, correo, contrasena FROM usuario WHERE codigo = ?', [codigo], (err, resultado) => {
//     if (err) {
//       console.error(err)
//     } else {
//       if (resultado.length > 0) {
//         const { nombre, correo, contrasena } = resultado[0]

//         res.send(`
//           <form hx-put="/actualizarCuenta/actualizar" hx-target="this" hx-swap="outerHTML">
//             <label>Codigo</label>
//             <input autocomplete='off' readonly type="text" name="codigo" value="${codigo}">
//             <label>Nombre</label>
//             <input autocomplete='off' type="text" name="nombre" value="${nombre}">
//             <label>Correo</label>
//             <input autocomplete='off' type="email" name="correo" value="${correo}">
//             <label>Contrasena</label>
//             <input type="password" name="contrasena" value="${contrasena}">
//             <button>Actualizar</button>
//           </form>
//         `)
//       } else {
//         console.log('No se encontraron resultados')
//         res.status(404).send('No se encontraron resultados')
//       }
//     }
//   });
// });


// POST /crearCuenta

function crearCuenta(req, res) {
  datos = req.body
  db.query('INSERT INTO usuario (codigo, nombre, correo, contrasena, tipo, activo) VALUES (?, ?, ?, ?, ?, ?)', [datos.codigo, datos.nombre, datos.correo, datos.contrasena, datos.tipo, 'Y'], (err, resultado) => {
    console.log('Cuenta creada correctamente')
    if (datos.tipo == 'subgerente') {
      db.query('INSERT INTO permiso (cambio_contrasena, desactivar_cuenta, crear_cuenta, cod_subgerente) VALUES (?, ?, ?, ?)', ['N', 'N', 'N', datos.codigo], (err, resultado) => {
        if (err) {
          console.error(err)
        } else {
          console.log('Subgerente ingresado en la tabla permiso correctamente')
        }
      })
    }
  })
  res.send('<span>Cuenta creada exitosamente</span>')
}

// app.post('/crearCuenta', async (req, res) => {
//   datos = req.body
//   db.query('INSERT INTO usuario (codigo, nombre, correo, contrasena, tipo, activo) VALUES (?, ?, ?, ?, ?, ?)', [datos.codigo, datos.nombre, datos.correo, datos.contrasena, datos.tipo, 'Y'], (err, resultado) => {
//     console.log('Cuenta creada correctamente')
//     if (datos.tipo == 'subgerente') {
//       db.query('INSERT INTO permiso (cambio_contrasena, desactivar_cuenta, crear_cuenta, cod_subgerente) VALUES (?, ?, ?, ?)', ['N', 'N', 'N', datos.codigo], (err, resultado) => {
//         if (err) {
//           console.error(err)
//         } else {
//           console.log('Subgerente ingresado en la tabla permiso correctamente')
//         }
//       })
//     }
//   })
//   res.send('<span>Cuenta creada exitosamente</span>')
// })


// GET /crearCuenta/:tipo

function tipoCuenta(req, res) {
  tipo = req.params.tipo
  let numero
  let usuario
  let codigo

  db.query('SELECT nombre FROM usuario WHERE tipo = ?', [tipo], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      numero = resultado.length + 1

      if (tipo == 'empleado') usuario = 'E'
      if (tipo == 'subgerente') usuario = 'S'
      if (tipo == 'gerente') usuario = 'G'

      if (numero < 10) codigo = `${usuario}-00${numero}`
      if (numero >= 10 && numero < 100) codigo = `${usuario}-0${numero}`
      if (numero >= 100) codigo = `${usuario}-${numero}`

      res.send(`
        <form hx-post="/crearCuenta" hx-target="this" hx-swap="outerHTML">
          <label for="codigo">Codigo</label><input name='codigo' type="text" id="codigo" value='${codigo}' readonly />
          <label for="tipo">Tipo de usuario</label><input name='tipo' value='${tipo}' id="tipo" type="text" readonly />
          <label for="nombre">Nombre</label><input name='nombre' id="nombre" type="text" required />
          <label for="correo">Correo</label><input name='correo' id="correo" type="text" required/>
          <label for="contrasena">Contrasena</label><input name='contrasena' id="contrasena" type="text" required />
          <button>Crear cuenta</button>
        </form>
        `)
    }
  })
}


// PUT /asignarPermiso

function asignarPermiso(req, res) {
  let codigo = req.body.codigo

  db.query('UPDATE permiso SET cambio_contrasena = ?, desactivar_cuenta = ?, crear_cuenta = ? WHERE cod_subgerente = ?', [req.body.cambio_contrasena, req.body.desactivar_cuenta, req.body.crear_cuenta, codigo], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      res.send('<span>Permisos actualizados correctamente</span>')
    }
  })
}


// GET /asignarPermiso

function datosPermiso(req, res) {
  let codigo = req.query.codigo

  db.query('SELECT usuario.nombre, usuario.correo, permiso.cambio_contrasena, permiso.desactivar_cuenta, permiso.crear_cuenta FROM usuario JOIN permiso ON usuario.codigo = permiso.cod_subgerente WHERE usuario.codigo = ?', [codigo], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      let cambio_contrasena = (resultado[0].cambio_contrasena == 'N') ? 'No aplica' : 'Aplica'
      let desactivar_cuenta = (resultado[0].desactivar_cuenta == 'N') ? 'No aplica' : 'Aplica'
      let crear_cuenta = (resultado[0].crear_cuenta == 'N') ? 'No aplica' : 'Aplica'

      let cambio_otorgar_input = (cambio_contrasena == 'Aplica')? '<input id="cambio_otorgar" type="radio" checked name="cambio_contrasena" value="Y">' : '<input value="Y" id="cambio_otorgar" type="radio" name="cambio_contrasena">'
      let cambio_remover_input = (cambio_contrasena == 'No aplica')? '<input id="cambio_remover" type="radio" checked name="cambio_contrasena" value="N">' : '<input id="cambio_remover" type="radio" name="cambio_contrasena" value="N">'

      let desactivar_otorgar_input = (desactivar_cuenta == 'Aplica')? '<input id="desactivar_otorgar" type="radio" checked name="desactivar_cuenta" value="Y">' : '<input id="desactivar_otorgar" value="Y" type="radio" name="desactivar_cuenta">'
      let desactivar_remover_input = (desactivar_cuenta == 'No aplica')? '<input id="desactivar_remover" type="radio" checked name="desactivar_cuenta" value="N">' : '<input id="desactivar_remover" type="radio" name="desactivar_cuenta" value="N">'

      let crear_otorgar_input = (crear_cuenta == 'Aplica')? '<input id="crear_otorgar" type="radio" checked name="crear_cuenta" value="Y">' : '<input id="crear_otorgar" value="Y" type="radio" name="crear_cuenta">'
      let crear_remover_input = (crear_cuenta == 'No aplica')? '<input id="crear_remover" type="radio" checked name="crear_cuenta" value="N">' : '<input id="crear_remover" type="radio" name="crear_cuenta" value="N">'

      res.send(`
        <form>
          <label>Codigo</label>
          <input autocomplete='off' readonly type="text" name="codigo" value="${codigo}">
          <label>Nombre</label>
          <input autocomplete='off' readonly type="text" name="nombre" value="${resultado[0].nombre}">
          <label>Correo</label>
          <input autocomplete='off' readonly type="email" name="correo" value="${resultado[0].correo}">
          <label>Cambio de contrasena</label>
          <input autocomplete='off' readonly type="text" name="cambio_contrasena" value="${cambio_contrasena}">
          <label>Desactivar cuenta</label>
          <input autocomplete='off' readonly type="text" name="desactivar_cuenta" value="${desactivar_cuenta}">
          <label>Crear cuenta</label>
          <input autocomplete='off' readonly type="text" name="crear_cuenta" value="${crear_cuenta}">
        </form>

        <form hx-put="/asignarPermiso" hx-swap="outerHTML" hx-target="this">
          <label>Codigo</label>
          <input autocomplete='off' readonly type="text" name="codigo" value="${codigo}">
          <p>Cambio de contrasena</p>
            ${cambio_otorgar_input}<label for="cambio_otorgar">Asignado</label>
            ${cambio_remover_input}<label for="cambio_remover">Denegado</label>
          <p>Desactivar cuenta</p>
            ${desactivar_otorgar_input}<label for="desactivar_otorgar">Asignado</label>
            ${desactivar_remover_input}<label for="desactivar_remover">Denegado</label>
          <p>Crear cuenta</p>
            ${crear_otorgar_input}<label for="crear_otorgar">Asignado</label>
            ${crear_remover_input}<label for="crear_remover">Denegado</label>
            <button>Guardar cambios</button>
        </form>
      `)
    }
  })
}


module.exports = {
  buscarCuentaDesactivar : buscarCuentaDesactivar,
  desactivarCuenta : desactivarCuenta,
  buscarCuentaActualizar : buscarCuentaActualizar,
  actualizarCuenta : actualizarCuenta,
  asignarPermiso : asignarPermiso,
  tipoCuenta : tipoCuenta,
  datosPermiso : datosPermiso,
  crearCuenta : crearCuenta
}