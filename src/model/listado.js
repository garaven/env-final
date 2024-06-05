const db = require('../database')


// GET /listado/:usuario

async function listarPorUsuario(req, res) {
  const tipo_usuario = req.params.usuario

  try {
    const resultado = await new Promise((resolve, reject) => {
      db.query('SELECT codigo, tipo, nombre, correo, activo FROM usuario WHERE tipo = ?', [tipo_usuario], (err, resultado) => {
        if (err) reject(err);
        else resolve(resultado);
      });
    });

    let filasHTML = '';

    resultado.forEach(usuario => {
      filasHTML += `
        <tr>
          <td>${usuario.codigo}</td>
          <td>${usuario.tipo}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.activo}</td>
        </tr>
      `;
    });

    const tablaHTML = `
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          ${filasHTML}
        </tbody>
      </table>
    `;

    res.send(tablaHTML);
  } catch (error) {
    console.error('Error al recuperar el listado general de usuarios:', error);
    res.status(500).send('Error al recuperar el listado general de usuarios');
  }
}

// app.get('/listado/:usuario', async (req, res) => {
//   const tipo_usuario = req.params.usuario

//   try {
//     const resultado = await new Promise((resolve, reject) => {
//       db.query('SELECT codigo, tipo, nombre, correo, activo FROM usuario WHERE tipo = ?', [tipo_usuario], (err, resultado) => {
//         if (err) reject(err);
//         else resolve(resultado);
//       });
//     });

//     let filasHTML = '';

//     resultado.forEach(usuario => {
//       filasHTML += `
//         <tr>
//           <td>${usuario.codigo}</td>
//           <td>${usuario.tipo}</td>
//           <td>${usuario.nombre}</td>
//           <td>${usuario.correo}</td>
//           <td>${usuario.activo}</td>
//         </tr>
//       `;
//     });

//     const tablaHTML = `
//       <table>
//         <thead>
//           <tr>
//             <th>Código</th>
//             <th>Tipo</th>
//             <th>Nombre</th>
//             <th>Correo</th>
//             <th>Activo</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${filasHTML}
//         </tbody>
//       </table>
//     `;

//     res.send(tablaHTML);
//   } catch (error) {
//     console.error('Error al recuperar el listado general de usuarios:', error);
//     res.status(500).send('Error al recuperar el listado general de usuarios');
//   }
// })


// GET /listadoGeneral

async function listadoGeneral(req, res) {
  try {
    const resultado = await new Promise((resolve, reject) => {
      db.query('SELECT codigo, tipo, nombre, correo, activo FROM usuario', (err, resultado) => {
        if (err) reject(err);
        else resolve(resultado);
      });
    });

    let filasHTML = '';

    resultado.forEach(usuario => {
      filasHTML += `
        <tr>
          <td>${usuario.codigo}</td>
          <td>${usuario.tipo}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.activo}</td>
        </tr>
      `;
    });

    const tablaHTML = `
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          ${filasHTML}
        </tbody>
      </table>
    `;

    res.send(tablaHTML);
  } catch (error) {
    console.error('Error al recuperar el listado general de usuarios:', error);
    res.status(500).send('Error al recuperar el listado general de usuarios');
  }
}

// app.get('/listadoGeneral', async (req, res) => {
//   try {
//     const resultado = await new Promise((resolve, reject) => {
//       db.query('SELECT codigo, tipo, nombre, correo, activo FROM usuario', (err, resultado) => {
//         if (err) reject(err);
//         else resolve(resultado);
//       });
//     });

//     let filasHTML = '';

//     resultado.forEach(usuario => {
//       filasHTML += `
//         <tr>
//           <td>${usuario.codigo}</td>
//           <td>${usuario.tipo}</td>
//           <td>${usuario.nombre}</td>
//           <td>${usuario.correo}</td>
//           <td>${usuario.activo}</td>
//         </tr>
//       `;
//     });

//     const tablaHTML = `
//       <table>
//         <thead>
//           <tr>
//             <th>Código</th>
//             <th>Tipo</th>
//             <th>Nombre</th>
//             <th>Correo</th>
//             <th>Activo</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${filasHTML}
//         </tbody>
//       </table>
//     `;

//     res.send(tablaHTML);
//   } catch (error) {
//     console.error('Error al recuperar el listado general de usuarios:', error);
//     res.status(500).send('Error al recuperar el listado general de usuarios');
//   }
// });


// GET /listadoPermiso/:permiso

function listarPorPermiso(req, res) {
  const permiso = req.params.permiso;

  db.query(`SELECT usuario.codigo, usuario.tipo, usuario.nombre, usuario.correo, usuario.activo, permiso.cambio_contrasena, permiso.desactivar_cuenta, permiso.crear_cuenta 
                  FROM usuario 
                  INNER JOIN permiso ON usuario.codigo = permiso.cod_subgerente 
                  WHERE permiso.${permiso} = ?`, ['Y'],
    (err, resultado) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error en el servidor')
      } else {
        let filasHTML = ''

        resultado.forEach(usuario => {
          filasHTML += `
            <tr>
              <td>${usuario.codigo}</td>
              <td>${usuario.tipo}</td>
              <td>${usuario.nombre}</td>
              <td>${usuario.correo}</td>
              <td>${usuario.activo}</td>
              <td>${usuario.cambio_contrasena}</td>
              <td>${usuario.desactivar_cuenta}</td>
              <td>${usuario.crear_cuenta}</td>
            </tr>
          `
        })

        const tablaHTML = `
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Activo</th>
                <th>Cambio Contraseña</th>
                <th>Desactivar Cuenta</th>
                <th>Crear Cuenta</th>
              </tr>
            </thead>
            <tbody>
              ${filasHTML}
            </tbody>
          </table>
        `

        res.send(tablaHTML)
      }
    });
}

// app.get('/listadoPermiso/:permiso', async (req, res) => {
//   const permiso = req.params.permiso;

//   db.query(`SELECT usuario.codigo, usuario.tipo, usuario.nombre, usuario.correo, usuario.activo, permiso.cambio_contrasena, permiso.desactivar_cuenta, permiso.crear_cuenta 
//                   FROM usuario 
//                   INNER JOIN permiso ON usuario.codigo = permiso.cod_subgerente 
//                   WHERE permiso.${permiso} = ?`, ['Y'],
//     (err, resultado) => {
//       if (err) {
//         console.error(err)
//         res.status(500).send('Error en el servidor')
//       } else {
//         let filasHTML = ''

//         resultado.forEach(usuario => {
//           filasHTML += `
//             <tr>
//               <td>${usuario.codigo}</td>
//               <td>${usuario.tipo}</td>
//               <td>${usuario.nombre}</td>
//               <td>${usuario.correo}</td>
//               <td>${usuario.activo}</td>
//               <td>${usuario.cambio_contrasena}</td>
//               <td>${usuario.desactivar_cuenta}</td>
//               <td>${usuario.crear_cuenta}</td>
//             </tr>
//           `
//         })

//         const tablaHTML = `
//           <table>
//             <thead>
//               <tr>
//                 <th>Código</th>
//                 <th>Tipo</th>
//                 <th>Nombre</th>
//                 <th>Correo</th>
//                 <th>Activo</th>
//                 <th>Cambio Contraseña</th>
//                 <th>Desactivar Cuenta</th>
//                 <th>Crear Cuenta</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${filasHTML}
//             </tbody>
//           </table>
//         `

//         res.send(tablaHTML)
//       }
//     });
// });


// GET /listadoActividad/:actividad

function listarPorActividad(req, res) {
  let actividad
  if (req.params.actividad == 'activo') {
    actividad = 'Y'
  } else {
    actividad = 'N'
  }

  db.query('SELECT codigo, tipo, nombre, correo, activo FROM usuario WHERE activo = ?', [actividad], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      let filasHTML = ''

      resultado.forEach(usuario => {
        filasHTML += `
        <tr>
          <td>${usuario.codigo}</td>
          <td>${usuario.tipo}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.activo}</td>
        </tr>
      `
      })

      const tablaHTML = `
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          ${filasHTML}
        </tbody>
      </table>
    `

      res.send(tablaHTML)
    }
  })
}

// app.get('/listadoActividad/:actividad', async (req, res) => {
//   let actividad
//   if (req.params.actividad == 'activo') {
//     actividad = 'Y'
//   } else {
//     actividad = 'N'
//   }

//   db.query('SELECT codigo, tipo, nombre, correo, activo FROM usuario WHERE activo = ?', [actividad], (err, resultado) => {
//     if (err) {
//       console.error(err)
//     } else {
//       let filasHTML = ''

//       resultado.forEach(usuario => {
//         filasHTML += `
//         <tr>
//           <td>${usuario.codigo}</td>
//           <td>${usuario.tipo}</td>
//           <td>${usuario.nombre}</td>
//           <td>${usuario.correo}</td>
//           <td>${usuario.activo}</td>
//         </tr>
//       `
//       })

//       const tablaHTML = `
//       <table>
//         <thead>
//           <tr>
//             <th>Código</th>
//             <th>Tipo</th>
//             <th>Nombre</th>
//             <th>Correo</th>
//             <th>Activo</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${filasHTML}
//         </tbody>
//       </table>
//     `

//       res.send(tablaHTML)
//     }
//   })
// })


module.exports = {
  listadoGeneral: listadoGeneral,
  listarPorActividad : listarPorActividad,
  listarPorPermiso : listarPorPermiso,
  listarPorUsuario : listarPorUsuario,
}