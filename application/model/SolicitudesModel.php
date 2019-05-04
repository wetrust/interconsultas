<?php

class SolicitudesModel
{
    public static function getAllNewSolicitudes($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes WHERE solicitud_profesionalemail = :solicitud_profesionalemail AND solicitud_respuesta = 0";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllSolicitudes($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes WHERE solicitud_profesionalemail = :solicitud_profesionalemail AND solicitud_respuesta = 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllOldSolicitudesWhereSolicitante($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();
        $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, respuestas.fecha, solicitudes.solicitud_diagnostico, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_email AND solicitudes.solicitud_respuesta = 2";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_email' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllOldSolicitudes($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, solicitudes.solicitud_diagnostico, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllOldSolicitudesFilter($solicitud_email,$ciudad,$lugar,$desde,$hasta,$tipo)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $ciudad = strval($ciudad);
        $lugar = strval($lugar);
        $desde = strval($desde);
        $hasta = strval($hasta);
        $tipo = intval($tipo);
        $sql = "";
        $query = "";

        if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo == 8){
            //no filtra
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo < 8){
            //filtra por tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.tipo = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo == 8){
            //filtra por ciudad
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo == 8){
            //filtra por lugar
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo == 8){
            //filtra por fecha
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo == 8){
            //filtra por fciudad y lugar
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo < 8){
            //filtra por ciudad y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.tipo = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo == 8){
            //filtra por ciudad y fecha
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) > 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo == 8){
            //filtra por lugar y fecha
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo < 8){
            //filtra por lugar y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.tipo = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo < 8){
            //filtra por fecha y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.tipo = :tipo AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':fechauno' => $desde, ':fechados' => $hasta, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) < 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo < 8){
            //filtra por ciudad, fecha y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.tipo = :tipo AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo < 8){
            //filtra por ciudad, lugar, fecha y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.tipo = :tipo AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta, ':tipo' => $tipo));
        }

        return $query->fetchAll();
    }

    public static function getSolicitud($solicitud_id, $solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes WHERE solicitud_profesionalemail = :solicitud_profesionalemail AND solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':solicitud_id' => $solicitud_id));

        return $query->fetch();
    }
    
    public static function createSolicitud($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        if (!$solicitud_profesionalemail || strlen($solicitud_profesionalemail) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO solicitudes (solicitud_nombre_referente, solicitud_profesionalemail,solicitud_nombre,solicitud_rut,solicitud_fecha,solicitud_eg,solicitud_eco,solicitud_diagnostico,solicitud_lugar,solicitud_ciudad,solicitud_profesional,solicitud_nombreprofesional,solicitud_email,solicitud_fum,solicitud_respuesta,solicitud_egestacional) VALUES (:solicitud_nombre_referente, :solicitud_profesionalemail,:solicitud_nombre,:solicitud_rut,:solicitud_fecha,:solicitud_eg,:solicitud_eco,:solicitud_diagnostico,:solicitud_lugar,:solicitud_ciudad,:solicitud_profesional,:solicitud_nombreprofesional,:solicitud_email,:solicitud_fum,:solicitud_respuesta,:solicitud_egestacional)";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_nombre_referente' => $solicitud_nombre_referente, ':solicitud_profesionalemail' => $solicitud_profesionalemail,':solicitud_nombre' => $solicitud_nombre,':solicitud_rut' => $solicitud_rut,':solicitud_fecha' => $solicitud_fecha,':solicitud_eg' => $solicitud_eg,':solicitud_eco' => $solicitud_eco,':solicitud_diagnostico' => $solicitud_diagnostico,':solicitud_lugar' => $solicitud_lugar,':solicitud_ciudad' => $solicitud_ciudad,':solicitud_profesional' => $solicitud_profesional,':solicitud_nombreprofesional' => $solicitud_nombreprofesional,':solicitud_email' => $solicitud_email,':solicitud_fum' => $solicitud_fum,':solicitud_respuesta' => $solicitud_respuesta,':solicitud_egestacional' => $solicitud_egestacional));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function getAllProfesionales($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT solicitud_email FROM administrador.solicitudes Where solicitud_profesionalemail = :solicitud_profesionalemail group by solicitud_email";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllCiudades($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT solicitud_ciudad FROM solicitudes Where solicitud_profesionalemail = :solicitud_profesionalemail group by solicitud_ciudad";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllLugar($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT solicitud_lugar FROM solicitudes Where solicitud_profesionalemail = :solicitud_profesionalemail group by solicitud_lugar";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function updateSolicitud($solicitud_id,$solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        if (!$solicitud_id || !$solicitud_profesionalemail) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE solicitudes SET solicitud_profesionalemail = :solicitud_profesionalemail, solicitud_nombre = :solicitud_nombre, solicitud_rut = :solicitud_rut, solicitud_fecha = :solicitud_fecha, solicitud_eg = :solicitud_eg, solicitud_eco = :solicitud_eco, solicitud_diagnostico = :solicitud_diagnostico, solicitud_lugar = :solicitud_lugar, solicitud_ciudad = :solicitud_ciudad, solicitud_profesional = :solicitud_profesional, solicitud_nombreprofesional = :solicitud_nombreprofesional, solicitud_email = :solicitud_email, solicitud_fum = :solicitud_fum, solicitud_respuesta = :solicitud_respuesta, solicitud_egestacional = :solicitud_egestacional WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id,':solicitud_profesionalemail' => $solicitud_profesionalemail,':solicitud_nombre' => $solicitud_nombre,':solicitud_rut' => $solicitud_rut,':solicitud_fecha' => $solicitud_fecha,':solicitud_eg' => $solicitud_eg,':solicitud_eco' => $solicitud_eco,':solicitud_diagnostico' => $solicitud_diagnostico,':solicitud_lugar' => $solicitud_lugar,':solicitud_ciudad' => $solicitud_ciudad,':solicitud_profesional' => $solicitud_profesional,':solicitud_nombreprofesional' => $solicitud_nombreprofesional,':solicitud_email' => $solicitud_email,':solicitud_fum' => $solicitud_fum,':solicitud_respuesta' => $solicitud_respuesta,':solicitud_egestacional' => $solicitud_egestacional));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function updateStateSolicitud($solicitud_id,$solicitud_respuesta)
    {
        if (!$solicitud_id || !$solicitud_respuesta) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE solicitudes SET solicitud_respuesta = :solicitud_respuesta WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_respuesta' => $solicitud_respuesta,':solicitud_id' => $solicitud_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deleteSolicitud($solicitud_id)
    {
        if (!$solicitud_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM solicitudes WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
