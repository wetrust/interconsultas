CREATE TABLE IF NOT EXISTS `administrador`.`solicitudes` (
 `solicitud_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `solicitud_profesionalemail` text NOT NULL,
 `solicitud_nombre` text NOT NULL,
 `solicitud_rut` text NOT NULL,
 `solicitud_fecha` date NOT NULL,
 `solicitud_eg` int(11) NOT NULL,
 `solicitud_eco` int(11) NOT NULL,
 `solicitud_diagnostico` text NOT NULL,
 `solicitud_lugar` text NOT NULL,
 `solicitud_ciudad` text NOT NULL,
 `solicitud_profesional` int(11) NOT NULL,
 `solicitud_nombreprofesional` text NOT NULL,
 `solicitud_email` text NOT NULL,
 `solicitud_fum` date NOT NULL,
 `solicitud_respuesta` int(11),
 `solicitud_egestacional` text NOT NULL,
 PRIMARY KEY (`solicitud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='solicitudes de interconsulta';
