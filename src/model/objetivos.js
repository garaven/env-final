const db = require('../database')

// PUT /actualizarObjetivo

function actualizarObjetivo(req, res) {
  console.log(req.body)
  let id = req.body.id
  let nuevoValor = req.body.completado == 'Y' ? 'N' : 'Y'

  db.query('UPDATE objetivo SET completado = ? WHERE id = ?', [nuevoValor, id], (err, resultado) => {
    console.log('Objetivo actualizado')
    res.send('<div hx-swap="outerHTML" hx-trigger="load" hx-target="this" hx-get="/datosObjetivos"></div>')
  })
}

// app.put('/actualizarObjetivo', (req, res) => {
//   console.log(req.body)
//   let id = req.body.id
//   let nuevoValor = req.body.completado == 'Y' ? 'N' : 'Y'

//   db.query('UPDATE objetivo SET completado = ? WHERE id = ?', [nuevoValor, id], (err, resultado) => {
//     console.log('Objetivo actualizado')
//     res.send('<div hx-swap="outerHTML" hx-trigger="load" hx-target="this" hx-get="/datosObjetivos"></div>')
//   })
// })


// GET /datosObjetivos

function obtenerObjetivos(req, res) {
  db.query('SELECT id, descripcion, completado FROM objetivo WHERE receptor = ?', [process.env.CODIGO_USUARIO], (err, resultados) => {
    if (err) {
      console.error(err)
    } else {
      let completados = `<div>
      <h2>Completados</h2>`
      let pendientes = `<div>
      <h2>Pendientes</h2>`

      resultados.forEach(element => {
        if (element.completado == 'Y') {
          completados += `
          <form hx-put='/actualizarObjetivo' hx-swap='innerHTML' hx-target='#contenedor'>
            <input type='hidden' name='id' value='${element.id}'>
            <input type='hidden' name='completado' value='Y'>
            <button>            
              <input id='${element.id}' type='checkbox' checked>
              <label for='${element.id}'>${element.descripcion}</label>
            </button>
          </form>`
        } else {
          pendientes += `
          <form hx-put='/actualizarObjetivo' hx-swap='innerHTML' hx-target='#contenedor'>
            <input type='hidden' name='id' value='${element.id}'>
            <input type='hidden' name='completado' value='N'>
            <button>            
              <input id='${element.id}' type='checkbox'>
              <label for='${element.id}'>${element.descripcion}</label>
            </button>
          </form>`
        }
      })
      completados += '</div>'
      pendientes += '</div>'

      res.send(`${completados}${pendientes}`)
    }
  });
}

// app.get('/datosObjetivos', async (req, res) => {
//   db.query('SELECT id, descripcion, completado FROM objetivo WHERE receptor = ?', [process.env.CODIGO_USUARIO], (err, resultados) => {
//     if (err) {
//       console.error(err)
//     } else {
//       let completados = `<div>
//       <h2>Completados</h2>`
//       let pendientes = `<div>
//       <h2>Pendientes</h2>`

//       resultados.forEach(element => {
//         if (element.completado == 'Y') {
//           completados += `
//           <form hx-put='/actualizarObjetivo' hx-swap='innerHTML' hx-target='#contenedor'>
//             <input type='hidden' name='id' value='${element.id}'>
//             <input type='hidden' name='completado' value='Y'>
//             <button>            
//               <input id='${element.id}' type='checkbox' checked>
//               <label for='${element.id}'>${element.descripcion}</label>
//             </button>
//           </form>`
//         } else {
//           pendientes += `
//           <form hx-put='/actualizarObjetivo' hx-swap='innerHTML' hx-target='#contenedor'>
//             <input type='hidden' name='id' value='${element.id}'>
//             <input type='hidden' name='completado' value='N'>
//             <button>            
//               <input id='${element.id}' type='checkbox'>
//               <label for='${element.id}'>${element.descripcion}</label>
//             </button>
//           </form>`
//         }
//       })
//       completados += '</div>'
//       pendientes += '</div>'

//       res.send(`${completados}${pendientes}`)
//     }
//   });
// });


// GET /listaObjetivos/:tipo

function listarObjetivos(req, res) {
  let estado
  let input
  if (req.params.tipo == 'completados') {
    estado = 'Y'
    input = `<input type='checkbox' checked disabled>`
  }
  if (req.params.tipo == 'pendientes') {
    estado = 'N'
    input = `<input type='checkbox' disabled>`
  }

  db.query('SELECT descripcion, receptor FROM objetivo WHERE completado = ?', [estado], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      let innerHTML = ''
      resultado.forEach(element => {
        innerHTML += `<div>${input} ${element.descripcion}, ${element.receptor}</div>`
      })

      res.send(innerHTML)
    }
  })
}

// app.get('/listaObjetivos/:tipo', async (req, res) => {
//   let estado
//   let input
//   if (req.params.tipo == 'completados') {
//     estado = 'Y'
//     input = `<input type='checkbox' checked disabled>`
//   }
//   if (req.params.tipo == 'pendientes') {
//     estado = 'N'
//     input = `<input type='checkbox' disabled>`
//   }

//   db.query('SELECT descripcion, receptor FROM objetivo WHERE completado = ?', [estado], (err, resultado) => {
//     if (err) {
//       console.error(err)
//     } else {
//       let innerHTML = ''
//       resultado.forEach(element => {
//         innerHTML += `<div>${input} ${element.descripcion}, ${element.receptor}</div>`
//       })

//       res.send(innerHTML)
//     }
//   })
// })


// GET /agregarObjetivos

function agregarObjetivo(req, res) {
  const emisor = process.env.CODIGO_USUARIO
  const receptor = req.query.receptor
  const descripcion = req.query.descripcion

  db.query('INSERT INTO objetivo (descripcion, emisor, receptor, completado) VALUES (?, ?, ?, ?)', [descripcion, emisor, receptor, 'N'], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      res.status(200).send('OK')
      console.log('Objetivo ingresado correctamente')
    }
  })
}

// app.get('/agregarObjetivos', async (req, res) => {
//   const emisor = process.env.CODIGO_USUARIO
//   const receptor = req.query.receptor
//   const descripcion = req.query.descripcion

//   db.query('INSERT INTO objetivo (descripcion, emisor, receptor, completado) VALUES (?, ?, ?, ?)', [descripcion, emisor, receptor, 'N'], (err, resultado) => {
//     if (err) {
//       console.error(err)
//     } else {
//       res.status(200).send('OK')
//       console.log('Objetivo ingresado correctamente')
//     }
//   })
// })


// GET /optionEmpleados

function asignarEmpleado(req, res) {
  db.query('SELECT codigo, nombre FROM usuario WHERE tipo = ?', ['empleado'], (err, resultado) => {
    if (err) {
      console.error(err)
    } else {
      let innerHTML
      resultado.forEach(element => {
        innerHTML += `<option value='${element.codigo}'>${element.codigo}, ${element.nombre}</option>`
      })
      res.send(innerHTML)
    }
  })
}

// app.get('/optionEmpleados', async (req, res) => {
//   db.query('SELECT codigo, nombre FROM usuario WHERE tipo = ?', ['empleado'], (err, resultado) => {
//     if (err) {
//       console.error(err)
//     } else {
//       let innerHTML
//       resultado.forEach(element => {
//         innerHTML += `<option value='${element.codigo}'>${element.codigo}, ${element.nombre}</option>`
//       })
//       res.send(innerHTML)
//     }
//   })
// })


module.exports = {
  actualizarObjetivo : actualizarObjetivo,
  obtenerObjetivos : obtenerObjetivos,
  listarObjetivos : listarObjetivos,
  agregarObjetivo : agregarObjetivo,
  asignarEmpleado : asignarEmpleado
}