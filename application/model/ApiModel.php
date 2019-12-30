<?php

class ApiModel
{
    public static function getAllComunas()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT comuna_id, comuna_name FROM comunas ORDER BY comuna_name ASC";
        $query = $database->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    public static function partoUser()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_name, user_email FROM users where user_active = 1 AND user_account_type = 5";
        $query = $database->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    public static function getAllPartos($token)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_email FROM users where user_active = 1 AND session_id = :session_id";
        $query = $database->prepare($sql);
        $query->execute(array(":session_id" => $token));

        $respuesta = $query->fetch();
        if ($query->rowCount() == 1){
            return SolicitudesModel::getAllOldSolicitudesSinParto($respuesta->user_email);
        }
        else{
            return '{"return":false}';
        }
    }

    public static function getSolicitud($token, $solicitud_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_email FROM users where user_active = 1 AND session_id = :session_id";
        $query = $database->prepare($sql);
        $query->execute(array(":session_id" => $token));

        if ($query->rowCount() == 1){
            $sql = "SELECT * FROM solicitudes WHERE solicitud_id = :solicitud_id LIMIT 1";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_id' => $solicitud_id));
    
            return $query->fetch();
        } else{
            return '{"return":false}';
        }
    }

    public static function getOldSolicitudes($token, $solicitud_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_account_type, user_email FROM users where user_active = 1 AND session_id = :session_id";
        $query = $database->prepare($sql);
        $query->execute(array(":session_id" => $token));

        if ($query->rowCount() == 1){

            if ($query->fetch()->user_account_type == 2){
                $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_apellido, solicitudes.solicitud_rut, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, solicitudes.solicitud_diagnostico, solicitudes.solicitud_fum, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_id = :solicitud_id AND solicitudes.solicitud_respuesta = 2";
            }
            else{
                $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_apellido, solicitudes.solicitud_rut, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, solicitudes.solicitud_diagnostico, solicitudes.solicitud_fum, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_id = :solicitud_id AND solicitudes.solicitud_respuesta = 2";
            }
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_id' => $solicitud_id));

            return $query->fetch();
        }
        else{
            return '{"return":false}';
        }
    } 

    public static function getAllPartos($token)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_account_type, user_email FROM users where user_active = 1 AND session_id = :session_id";
        $query = $database->prepare($sql);
        $query->execute(array(":session_id" => $token));

        if ($query->rowCount() == 1){

            $respuesta = $query->fetch();
            return PartosModel::getAllPartos($respuesta->user_email);
        } else{
            return '{"return":false}';
        }
    }
}