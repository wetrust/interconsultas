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
            $response = new stdClass();
            $response->return = false;
            return $response;
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
            $response = new stdClass();
            $response->return = false;
            return $response;
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
            $response = new stdClass();
            $response->return = false;
            return $response;
        }
    } 

    public static function getAllPartosEfectuados($token)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_account_type, user_email FROM users where user_active = 1 AND session_id = :session_id";
        $query = $database->prepare($sql);
        $query->execute(array(":session_id" => $token));

        if ($query->rowCount() == 1){

            $respuesta = $query->fetch();
            return PartosModel::getAllPartos($respuesta->user_email);
        } else{
            $response = new stdClass();
            $response->return = false;
            return $response;
        }
    }

    public static function getPartos($token, $parto_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_account_type, user_email FROM users where user_active = 1 AND session_id = :session_id";
        $query = $database->prepare($sql);
        $query->execute(array(":session_id" => $token));

        if ($query->rowCount() == 1){
            return PartosModel::getPartos($parto_id);
        }else{
            $response = new stdClass();
            $response->return = false;
            return $response;
        }
    }

    public static function createPartos($token, $solicitud_id, $fecha_parto, $semanas, $dias, $peso, $talla, $imc, $estado_nutricional, $etnia, $paridad, $lugar, $pesofetal, $tallafetal, $craneofetal, $apgar_uno, $apgar_cinco, $sexo, $meconio, $ipn, $peso_eg, $peso_eg_estado, $ipn_eg, $ipn_eg_estado, $comentarios, $hipoglicemia, $alta, $protocolo_hipoglicemia, $edad_materna)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_account_type, user_email FROM users where user_active = 1 AND session_id = :session_id";
        $query = $database->prepare($sql);
        $query->execute(array(":session_id" => $token));

        if ($query->rowCount() == 1){
            return PartosModel::createPartos($solicitud_id, $fecha_parto, $semanas, $dias, $peso, $talla, $imc, $estado_nutricional, $etnia, $paridad, $lugar, $pesofetal, $tallafetal, $craneofetal, $apgar_uno, $apgar_cinco, $sexo, $meconio, $ipn, $peso_eg, $peso_eg_estado, $ipn_eg, $ipn_eg_estado, $comentarios, $hipoglicemia, $alta, $protocolo_hipoglicemia, $edad_materna);
        }else{
            $response = new stdClass();
            $response->return = false;
            return $response;
        }
    }

    public static function deleteParto($token, $parto_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_account_type, user_email FROM users where user_active = 1 AND session_id = :session_id";
        $query = $database->prepare($sql);
        $query->execute(array(":session_id" => $token));

        if ($query->rowCount() == 1){
            return PartosModel::deleteParto($parto_id);
        }else{
            $response = new stdClass();
            $response->return = false;
            return $response;
        }
    }

}