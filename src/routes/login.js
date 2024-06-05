const express = require('express')
const controlLogin = require('../controller/controlLogin')
const controlPages = require('../controller/controlPages')
const chat = require('../model/chat')
const consumo = require('../model/consumo')
const listado = require('../model/listado')
const objetivos = require('../model/objetivos')
const permisos = require('../model/permisos')
const perfil = require('../model/perfil')

const router = express.Router()

// Paginas
router.get('/', controlPages.pageIndex)
router.get('/login', controlPages.pageLogin)
router.get('/perfil', controlPages.pagePerfil)
router.get('/chat', controlPages.pageChat)
router.get('/home', controlPages.pageHome)
router.get('/objetivos', controlPages.pageObjetivos)
router.get('/listado', controlPages.pageListado)
router.get('/consumo', controlPages.pageConsumo)
router.get('/cuentaInactiva', controlPages.pageCuentaInactiva)
router.get('/panel/desactivarCuenta', controlPages.pageDesactivarCuenta)
router.get('/noAcceso', controlPages.pageNoAcceso)
router.get('/panel', controlPages.pagePanel)
router.get('/panel/crearCuenta', controlPages.pageCrearCuenta)
router.get('/panel/desactivarCuenta', controlPages.pageDesactivarCuenta)
router.get('/panel/actualizarDatos', controlPages.pageActualizarDatos)
router.get('/permisos', controlPages.pagePermisos)

// Login
router.post('/login', controlLogin.auth)
router.get('/logout', controlLogin.logout)

// Chat
// router.get('/historial', chat.obtenerMensajes)

// Consumo
router.get('/ingresarFila', consumo.ingresarFila)
router.get('/datosTabla', consumo.mostrarDatosTabla)

// Listado
router.get('/listado/:usuario', listado.listarPorUsuario)
router.get('/listadoGeneral', listado.listadoGeneral)
router.get('/listadoPermiso/:permiso', listado.listarPorPermiso)
router.get('/listadoActividad/:actividad', listado.listarPorActividad)

// Objetivos
router.put('/actualizarObjetivo', objetivos.actualizarObjetivo)
router.get('/datosObjetivos', objetivos.obtenerObjetivos)
router.get('/listaObjetivos/:tipo', objetivos.listarObjetivos)
router.get('/agregarObjetivos', objetivos.agregarObjetivo)
router.get('/optionEmpleados', objetivos.asignarEmpleado)

// Permisos
router.get('/desactivarCuenta', permisos.buscarCuentaDesactivar)
router.put('/desactivarCuenta/:accion', permisos.desactivarCuenta)
router.put('/actualizarCuenta/actualizar', permisos.actualizarCuenta)
router.get('/actualizarCuenta', permisos.buscarCuentaActualizar)
router.post('/crearCuenta', permisos.crearCuenta)
router.get('/crearCuenta/:tipo', permisos.tipoCuenta)
router.put('/asignarPermiso', permisos.asignarPermiso)
router.get('/asignarPermiso', permisos.datosPermiso)

// Perfil
router.get('/infoUsuario/:dato', perfil.info)
router.put('/editarPerfil', perfil.editarPerfil)

module.exports = router