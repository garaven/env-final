-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for app_env
CREATE DATABASE IF NOT EXISTS `app_env` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `app_env`;

-- Dumping structure for table app_env.consumo
CREATE TABLE IF NOT EXISTS `consumo` (
  `fecha` date NOT NULL,
  `codigo` varchar(5) DEFAULT NULL,
  `tipo_usuario` varchar(10) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `dispositivos` varchar(150) DEFAULT NULL,
  KEY `FK_consumo_usuario` (`codigo`),
  CONSTRAINT `FK_consumo_usuario` FOREIGN KEY (`codigo`) REFERENCES `usuario` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table app_env.consumo: ~10 rows (approximately)
INSERT INTO `consumo` (`fecha`, `codigo`, `tipo_usuario`, `cantidad`, `dispositivos`) VALUES
	('2024-06-01', 'E-001', NULL, 20, 'Hola'),
	('2024-06-02', 'G-001', NULL, 13, 'Hoguera'),
	('2024-06-03', 'G-001', NULL, 18, 'Nevera'),
	('2024-06-02', 'E-001', NULL, 35, 'Televisor Samsung'),
	('2024-06-01', 'S-002', NULL, 31, 'iPhone'),
	('2024-06-03', 'E-001', NULL, 56, 'Lavadora'),
	('2024-06-12', 'E-001', NULL, 17, 'hola again'),
	('2024-06-04', 'E-001', NULL, 89, 'Cargador'),
	('2024-06-05', 'E-001', NULL, 67, 'Televisor'),
	('2024-06-06', 'E-001', NULL, 23, 'Nevera');

-- Dumping structure for table app_env.mensajes
CREATE TABLE IF NOT EXISTS `mensajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenido` text DEFAULT NULL,
  `usuario` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table app_env.mensajes: ~6 rows (approximately)
INSERT INTO `mensajes` (`id`, `contenido`, `usuario`) VALUES
	(105, 'hola', 'Camilo Molina'),
	(106, 'hola', 'Camilo Marulanda'),
	(107, 'a', 'Camilo Munoz'),
	(108, 'hola', 'Camilo Munoz'),
	(109, 'hola camilo haz esto por favor', 'Mario Garcia'),
	(110, 'hola chicos', 'Carlos Rodriguez');

-- Dumping structure for table app_env.objetivo
CREATE TABLE IF NOT EXISTS `objetivo` (
  `descripcion` varchar(150) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emisor` varchar(5) DEFAULT NULL,
  `receptor` varchar(5) DEFAULT NULL,
  `completado` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_objetivo_usuario` (`emisor`),
  KEY `FK_objetivo_usuario_2` (`receptor`),
  CONSTRAINT `FK_objetivo_usuario` FOREIGN KEY (`emisor`) REFERENCES `usuario` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_objetivo_usuario_2` FOREIGN KEY (`receptor`) REFERENCES `usuario` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table app_env.objetivo: ~2 rows (approximately)
INSERT INTO `objetivo` (`descripcion`, `id`, `emisor`, `receptor`, `completado`) VALUES
	('objetivo numero uno', 1, 'S-004', 'E-001', 'Y'),
	('hola', 2, 'S-002', 'E-004', 'N'),
	('Gastar de 60kwh en consumo el mes de junio', 3, 'S-002', 'E-004', 'N');

-- Dumping structure for table app_env.permiso
CREATE TABLE IF NOT EXISTS `permiso` (
  `cambio_contrasena` char(1) DEFAULT NULL,
  `desactivar_cuenta` char(1) DEFAULT NULL,
  `crear_cuenta` char(1) DEFAULT NULL,
  `cod_subgerente` varchar(5) NOT NULL,
  PRIMARY KEY (`cod_subgerente`),
  CONSTRAINT `FK_permiso_usuario` FOREIGN KEY (`cod_subgerente`) REFERENCES `usuario` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table app_env.permiso: ~5 rows (approximately)
INSERT INTO `permiso` (`cambio_contrasena`, `desactivar_cuenta`, `crear_cuenta`, `cod_subgerente`) VALUES
	('Y', 'Y', 'Y', 'S-001'),
	('Y', 'N', 'N', 'S-002'),
	('Y', 'Y', 'N', 'S-003'),
	('N', 'N', 'N', 'S-004'),
	('N', 'N', 'N', 'S-005');

-- Dumping structure for table app_env.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `codigo` varchar(5) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  `activo` char(1) DEFAULT NULL,
  `tipo` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table app_env.usuario: ~12 rows (approximately)
INSERT INTO `usuario` (`codigo`, `nombre`, `correo`, `contrasena`, `activo`, `tipo`) VALUES
	('E-001', 'Camilo Martinez', 'camilo@mail.com', 'chao', 'Y', 'empleado'),
	('E-002', 'Laura Jaramillo', 'laura@mail.com', 'hola', 'N', 'empleado'),
	('E-003', 'Jaime', 'jaime@correo.com', 'hola', 'Y', 'empleado'),
	('E-004', 'Camilo Molina', 'camilo@co.com', 'camilo', 'Y', 'empleado'),
	('E-005', 'Carlos Alvarez', 'carlitos@mail.com', 'carlitos', 'Y', 'empleado'),
	('E-006', 'Oscar Fernandez', 'oscar@mail.com', 'hola', 'Y', 'empleado'),
	('E-007', 'Oscar Perez', 'oscar@mail.com', 'oscar', 'Y', 'empleado'),
	('G-001', 'Carlos Rodriguez', 'carlos@mail.com', 'carlos123', 'Y', 'gerente'),
	('S-001', 'Juan Ortegon', 'juan@gmail.com', 'chao', 'Y', 'subgerente'),
	('S-002', 'Mario Perez', 'mariog@gmail.com', 'mario', 'Y', 'subgerente'),
	('S-003', 'Maicol Ceballos', 'maicol@mail.com', 'maicol', 'Y', 'subgerente'),
	('S-004', 'Juan Aguirre', 'juan@mail.com', 'juan', 'Y', 'subgerente'),
	('S-005', 'Martin Palomino', 'martina54@mail.com', 'holis', 'Y', 'subgerente');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
