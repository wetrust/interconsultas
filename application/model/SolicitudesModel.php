<?php

class SolicitudesModel
{
    public static function getAllNewSolicitudes($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes WHERE solicitud_email = :solicitud_email AND solicitud_respuesta = 0";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_email' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllSolicitudes($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes WHERE solicitud_email = :solicitud_email AND solicitud_respuesta = 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_email' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllOldSolicitudes($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes WHERE solicitud_email = :solicitud_email  AND solicitud_respuesta = 2";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_email' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getSolicitud($solicitud_id, $solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes WHERE solicitud_email = :solicitud_email AND solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_email' => $solicitud_email, ':solicitud_id' => $solicitud_id));

        return $query->fetch();
    }
    
    public static function createSolicitud($solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        if (!$solicitud_text || strlen($solicitud_text) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO solicitudes (solicitud_profesionalemail,solicitud_nombre,solicitud_rut,solicitud_fecha,solicitud_eg,solicitud_eco,solicitud_diagnostico,solicitud_lugar,solicitud_ciudad,solicitud_profesional,solicitud_nombreprofesional,solicitud_email,solicitud_fum,solicitud_respuesta,solicitud_egestacional) VALUES (:solicitud_profesionalemail,:solicitud_nombre,:solicitud_rut,:solicitud_fecha,:solicitud_eg,:solicitud_eco,:solicitud_diagnostico,:solicitud_lugar,:solicitud_ciudad,:solicitud_profesional,:solicitud_nombreprofesional,:solicitud_email,:solicitud_fum,:solicitud_respuesta,:solicitud_egestacional)";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_profesionalemail,':solicitud_nombre' => $solicitud_nombre,':solicitud_rut' => $solicitud_rut,':solicitud_fecha' => $solicitud_fecha,':solicitud_eg' => $solicitud_eg,':solicitud_eco' => $solicitud_eco,':solicitud_diagnostico' => $solicitud_diagnostico,':solicitud_lugar' => $solicitud_lugar,':solicitud_ciudad' => $solicitud_ciudad,':solicitud_profesional' => $solicitud_profesional,':solicitud_nombreprofesional' => $solicitud_nombreprofesional,':solicitud_email' => $solicitud_email,':solicitud_fum' => $solicitud_fum,':solicitud_respuesta' => $solicitud_respuesta,':solicitud_egestacional' => $solicitud_egestacional));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updateSolicitud($solicitud_id,$solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        if (!$solicitud_id || !$solicitud_text) {
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
