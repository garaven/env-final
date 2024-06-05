const db = require('../database')

// GET /historial

function obtenerMensajes(req, res) {
  try {
    db.query('SELECT contenido, usuario FROM mensajes', (err, resultados) => {
      const mensajesHTML = resultados.map(resultado => `<li><strong>${resultado.usuario}</strong> ${resultado.contenido}</li>`).join('')
      res.send(`<ul>${mensajesHTML}</ul>`)
    });
  } catch (error) {
    console.error('Error al recuperar mensajes anteriores de la base de datos:', error);
  }
}

module.exports = {
  obtenerMensajes: obtenerMensajes
}