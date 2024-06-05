const db = require('../database');
const { datosPermiso } = require('./permisos');


// GET /ingresarFila

function ingresarFila(req, res) {
  const { cantidad, fecha, dispositivos } = req.query;
  const codigo = process.env.CODIGO_USUARIO
  const datosFila = { cantidad, fecha, dispositivos, codigo };

  console.log(req.query);
  console.log(fecha);

  try {
    db.query(`SELECT * FROM consumo WHERE fecha = ? AND codigo = ?`, [fecha, codigo], (err, resultado) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).send('Error en el servidor');
      }

      if (resultado.length > 0) {
        db.query('UPDATE consumo SET ? WHERE fecha = ? AND codigo = ?', [datosFila, fecha, codigo], (err, resultado) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Datos de consumo actualizados');
          }
        });
      } else {
        db.query('INSERT INTO consumo SET ?', datosFila, (err, resultado) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Datos insertados correctamente :D');
          }
        });
      }
    });
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).send('Error en el servidor');
  }
}


// GET /datosTabla

async function mostrarDatosTabla (req, res) {
  try {
    const resultados = await new Promise((resolve, reject) => {
      db.query('SELECT cantidad, dispositivos, fecha FROM consumo WHERE codigo = ?', [process.env.CODIGO_USUARIO], (err, resultados) => {
        if (err) reject(err);
        else resolve(resultados);
      });
    });
  
    let dia = 0;
    let filasHTML = '';
    const fechaActual = new Date();
  
    for (let i = 1; i <= 31; i++) {
      dia = i;
  
      const mesActual = fechaActual.getMonth() + 1;
      const anioActual = fechaActual.getFullYear();
  
      const fechaFormateada = `${anioActual}-${mesActual.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
  
      const resultadoEncontrado = resultados.find(resultado => resultado.fecha.getDate() === dia);
  
      if (resultadoEncontrado) {
        filasHTML += `
          <tr>
            <td>${dia}</td>
            <td>${resultadoEncontrado.cantidad}</td>
            <td>${resultadoEncontrado.dispositivos}</td>
            <td>${fechaFormateada}</td>
            <td>
              <button class='editar' onclick="editarFila(this)">Editar</button>
              <button class='guardar' onclick="guardarEdicion(this)">Guardar</button>
            </td>
          </tr>
        `;
      } else {
        filasHTML += `
          <tr>
            <td>${dia}</td>
            <td></td>
            <td></td>
            <td>${fechaFormateada}</td>
            <td>
              <button class='editar' onclick="editarFila(this)">Editar</button>
              <button class='guardar' onclick="guardarEdicion(this)">Guardar</button>
            </td>
          </tr>
        `;
      }
    }
  
    res.send(filasHTML);
  } catch (error) {
    console.error('Error al recuperar los registros de consumo anteriores en la base de datos:', error);
    res.status(500).send('Error al recuperar los registros de consumo anteriores en la base de datos');
  }
}


module.exports = {
  ingresarFila : ingresarFila,
  mostrarDatosTabla : mostrarDatosTabla
}