<?php

class InterconsultaModel
{
    public static function solicitarInterconsulta($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional, $telefono){
        //verificar si el profesional está habilitado para recibir interconsultas
        $contrareferente = UserModel::getUserDataByUserNameOrEmail($solicitud_profesionalemail);
        $response = new stdClass();

        if (isset($contrareferente->user_email)){
            if ($contrareferente->user_email == $solicitud_profesionalemail){
                if (Session::userIsLoggedIn()) {
                    $solicitud_profesional = UserModel::getPublicProfileOfUser(Session::get('user_id'))->user_profesion;
                    $solicitud_nombreprofesional = Session::get('user_name');
                    $solicitud_email = Session::get('user_email');
                }
                $solicitud_id = SolicitudesModel::createSolicitud($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional, $telefono);
                //enviar un email al médico contrareferente
                EmailModel::sendContrareferenteEmail($solicitud_id);
                EmailModel::sendSolicitanteEmail($solicitud_id);
                $response->result = true;
            }
        }
        else{ $response->result = false; }
        return $response;
    }

    public static function solicitarInterconsultaInternal($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional, $telefono){
        $response = new stdClass();
        $contrareferente = UserModel::getUserDataByUserNameOrEmail($solicitud_profesionalemail);
        $solicitud_profesional = UserModel::getPublicProfileOfUser(Session::get('user_id'))->user_profesion;
        $solicitud_nombreprofesional = Session::get('user_name');
        $solicitud_nombre_referente = $solicitud_nombreprofesional;
        $solicitud_email = Session::get('user_email');
        $solicitud_profesionalemail = $solicitud_email;
        $solicitud_id = SolicitudesModel::createSolicitud($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional, $telefono);
        EvaluacionModel::createEvaluacion($solicitud_id, $solicitud_fecha, "");
        SolicitudesModel::updateStateSolicitud($solicitud_id, 1);
        $response->result = true;
        return $response;
    }

    public static function getFiltroParto($ciudad,$lugar,$desde,$hasta,$fecha)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $ciudad = strval($ciudad);
        $lugar = strval($lugar);
        $desde = strval($desde);
        $hasta = strval($hasta);
        $fecha = intval($fecha);
        $sql = "";
        $query = "";

        if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && strlen($fecha) == 0){
            //no filtra
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && strlen($fecha) > 0){
            //filtra por tipo
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.semanas = :semanas";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':semanas' => $fecha));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && strlen($fecha) == 0){
            //filtra por ciudad
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && strlen($fecha) == 0){
            //filtra por lugar
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_email = :solicitud_profesionalemail";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && strlen($fecha) == 0){
            //filtra por fecha
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.fecha_parto between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && strlen($fecha) == 0){
            //filtra por fciudad y lugar
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && strlen($fecha) > 0){
            //filtra por ciudad y tipo
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.semanas = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && strlen($fecha) == 0){
            //filtra por ciudad y fecha
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.fecha_parto between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) > 0 && strlen($desde) > 0 && strlen($hasta) > 0 && strlen($fecha) == 0){
            //filtra por lugar y fecha
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.fecha_parto between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && strlen($fecha) > 0){
            //filtra por lugar y tipo
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.semanas = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && strlen($fecha) > 0){
            //filtra por fecha y tipo
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.semanas = :tipo AND partos.fecha_parto between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':fechauno' => $desde, ':fechados' => $hasta, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && strlen($fecha) > 0){
            //filtra por ciudad, fecha y tipo
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.semanas = :tipo AND partos.fecha_parto between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && strlen($fecha) > 0){
            //filtra por ciudad, lugar, fecha y tipo
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.semanas = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) > 0 && strlen($hasta) > 0 && strlen($fecha) == 0){
            //filtra por ciudad, lugar, fecha y tipo
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.fecha_parto between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) > 0 && strlen($hasta) > 0 && strlen($fecha) > 0){
            //filtra por ciudad, lugar, fecha y tipo
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, partos.fecha_parto, partos.semanas FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND partos.semanas = :tipo AND partos.fecha_parto between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta, ':tipo' => $tipo));
        }

        return $query->fetchAll();
    }
}
