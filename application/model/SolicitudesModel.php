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
    public static function getAllMyNewSolicitudes($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes WHERE solicitud_email = :solicitud_email AND solicitud_respuesta = 0";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_email' => $solicitud_email));

        return $query->fetchAll();
    }
    public static function getAllAgendadasSolicitudes($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes INNER JOIN evaluacion ON solicitudes.solicitud_id = evaluacion.solicitud_id WHERE solicitud_email = :solicitud_email AND solicitud_respuesta = 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_email' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function confirmarSolicitud($solicitud_id)
    {
        $respuesta = new stdClass();
        $respuesta->result = false;

        if (!$solicitud_id) {
            return $respuesta;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE solicitudes SET solicitud_confirmada = :solicitud_confirmada WHERE solicitud_id = :solicitud_id";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_confirmada' => 'Si', ':solicitud_id' => $solicitud_id));

        if ($query->rowCount() == 1) {
            $respuesta->result = true;
        }

        return $respuesta;
    }
    public static function getAllSolicitudes($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes INNER JOIN evaluacion ON solicitudes.solicitud_id = evaluacion.solicitud_id WHERE solicitud_profesionalemail = :solicitud_profesionalemail AND solicitud_respuesta = 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllSolicitudesFecha($solicitud_email, $fecha)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes INNER JOIN evaluacion ON solicitudes.solicitud_id = evaluacion.solicitud_id WHERE solicitud_profesionalemail = :solicitud_profesionalemail AND solicitud_respuesta = 1 AND evaluacion_fecha = :evaluacion_fecha";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':evaluacion_fecha' => $fecha));

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
    
    public static function getAllOldSolicitudes($solicitud_email){
        $database = DatabaseFactory::getFactory()->getConnection();

        if (Session::get('user_account_type') == 2){
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_rut, solicitudes.solicitud_nombre, solicitudes.solicitud_apellido, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, solicitudes.solicitud_diagnostico, respuestas.tipo, respuestas.eg FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
        }
        else{
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_rut, solicitudes.solicitud_nombre, solicitudes.solicitud_apellido, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, solicitudes.solicitud_diagnostico, respuestas.tipo, respuestas.eg FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
        }
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }

    public static function getAllOldSolicitudesWherePaciente($pacienteId){
        $database = DatabaseFactory::getFactory()->getConnection();

        $paciente = PacientesModel::getPacienteID($pacienteId);

        if (Session::get('user_account_type') == 2){
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_rut, solicitudes.solicitud_nombre, solicitudes.solicitud_apellido, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, solicitudes.solicitud_diagnostico, respuestas.tipo, respuestas.eg FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND solicitudes.solicitud_rut = :solicitud_rut";
        }
        else{
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_rut, solicitudes.solicitud_nombre, solicitudes.solicitud_apellido, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, solicitudes.solicitud_diagnostico, respuestas.tipo, respuestas.eg FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND solicitudes.solicitud_rut = :solicitud_rut";
        }
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => Session::get('user_email'), ':solicitud_rut' => $paciente->rut));

        $resultado= new stdClass();
        $resultado->return = true;
        $resultado->data = $query->fetchAll();

        return $resultado;
    }

    public static function getAllOldSolicitudesSinParto($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        if (Session::get('user_account_type') == 2){
            $sql = "SELECT DISTINCT t.solicitud_id, t.solicitud_rut, t.solicitud_nombre, t.solicitud_apellido, t.solicitud_ciudad, t.solicitud_lugar, t.solicitud_diagnostico, t.solicitud_fum FROM solicitudes t INNER JOIN respuestas ON respuestas.solicitud_id = t.solicitud_id WHERE t.solicitud_email = :solicitud_profesionalemail AND respuestas.tipo <> 3 AND t.solicitud_respuesta = 2 AND t.solicitud_id IN (SELECT max(ti.solicitud_id) FROM solicitudes ti WHERE t.solicitud_rut = ti.solicitud_rut) AND t.solicitud_id NOT IN (select solicitud_id from partos)";
        }
        else{
            $sql = "SELECT DISTINCT t.solicitud_id, t.solicitud_rut, t.solicitud_nombre, t.solicitud_apellido, t.solicitud_ciudad, t.solicitud_lugar, t.solicitud_diagnostico, t.solicitud_fum FROM solicitudes t INNER JOIN respuestas ON respuestas.solicitud_id = t.solicitud_id WHERE t.solicitud_profesionalemail = :solicitud_profesionalemail AND respuestas.tipo <> 3 AND t.solicitud_respuesta = 2 AND t.solicitud_id IN (SELECT max(ti.solicitud_id) FROM solicitudes ti WHERE t.solicitud_rut = ti.solicitud_rut) AND t.solicitud_id NOT IN (select solicitud_id from partos)";
        }
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }
    public static function getEstadistica($solicitud_profesionalemail, $tipo)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        if ($tipo == 2){
            $sql = "SELECT * FROM solicitudes where solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
        }
        else{
            $sql = "SELECT * FROM solicitudes where solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
        }
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_profesionalemail));

        return $query->rowCount();
    }
    public static function getOldSolicitudes($solicitud_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        if (Session::get('user_account_type') == 2){
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_apellido, solicitudes.solicitud_rut, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, solicitudes.solicitud_diagnostico, solicitudes.solicitud_fum, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_id = :solicitud_id AND solicitudes.solicitud_respuesta = 2";
        }
        else{
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_apellido, solicitudes.solicitud_rut, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, solicitudes.solicitud_diagnostico, solicitudes.solicitud_fum, respuestas.tipo FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_id = :solicitud_id AND solicitudes.solicitud_respuesta = 2";
        }
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id));

        return $query->fetch();
    }
    
    public static function getAllOldSolicitudesFilter($solicitud_email,$ciudad,$lugar,$desde,$rut,$tipo)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $ciudad = strval($ciudad);
        $lugar = strval($lugar);
        $desde = strval($desde);
        $rut = strval($rut);
        $tipo = strval($tipo);
        $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_rut, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, respuestas.eg FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail ";
        $query = "";
        $execute = array(':solicitud_profesionalemail' => $solicitud_email);

        if (strlen($ciudad) > 0){
            $sql .= " AND solicitudes.solicitud_ciudad = :ciudad";
            $execute[':ciudad'] = $ciudad;
        }
        if (strlen($lugar) > 0){
            $sql .= " AND solicitudes.solicitud_lugar = :lugar";
            $execute[':lugar'] = $lugar;
        }
        if (strlen($desde) > 0){
            $sql .= " AND respuestas.fecha = :fechauno";
            $execute[':fechauno'] = $desde;
        }
        if (strlen($rut) > 0){
            $sql .= " AND solicitudes.solicitud_rut = :solicitud_rut";
            $execute[':solicitud_rut'] = $rut;
        }
        if (strlen($tipo) > 0){
            $sql .= " AND respuestas.tipo = :tipo";
            $execute[':tipo'] = $tipo; 
        }

        $sql .= " AND solicitudes.solicitud_respuesta = 2";
        $query = $database->prepare($sql);
        $query->execute($execute);

        return $query->fetchAll();
    }
    public static function getAllOldRespuestasFilter($solicitud_email,$ciudad,$lugar,$desde,$hasta,$tipo)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $ciudad = strval($ciudad);
        $lugar = strval($lugar);
        $desde = strval($desde);
        $hasta = strval($hasta);
        $tipo = strval($tipo);
        $sql = "";
        $query = "";

        if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo == 8){
            //no filtra
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo < 8){
            //filtra por tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND solicitudes.solicitud_email = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo == 8){
            //filtra por ciudad
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo == 8){
            //filtra por lugar
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo == 8){
            //filtra por fecha
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo == 8){
            //filtra por fciudad y lugar
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo < 8){
            //filtra por ciudad y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND solicitudes.solicitud_email = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo == 8){
            //filtra por ciudad y fecha
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) > 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo == 8){
            //filtra por lugar y fecha
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo < 8){
            //filtra por lugar y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND solicitudes.solicitud_email = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) == 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo < 8){
            //filtra por fecha y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND solicitudes.solicitud_email = :tipo AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':fechauno' => $desde, ':fechados' => $hasta, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) == 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo < 8){
            //filtra por ciudad, fecha y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND solicitudes.solicitud_email = :tipo AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) == 0 && strlen($hasta) == 0 && $tipo < 8){
            //filtra por ciudad, lugar, fecha y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND solicitudes.solicitud_email = :tipo";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad, ':tipo' => $tipo));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo == 8){
            //filtra por ciudad, lugar, fecha y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta));
        }
        else if (strlen($ciudad) > 0 && strlen($lugar) > 0 && strlen($desde) > 0 && strlen($hasta) > 0 && $tipo < 8){
            //filtra por ciudad, lugar, fecha y tipo
            $sql = "SELECT solicitudes.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, respuestas.fecha, respuestas.tipo, solicitudes.solicitud_email FROM solicitudes INNER JOIN respuestas ON respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_lugar = :lugar AND solicitudes.solicitud_ciudad = :ciudad AND solicitudes.solicitud_email = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2 AND solicitudes.solicitud_email = :tipo AND respuestas.fecha between :fechauno AND :fechados";
            $query = $database->prepare($sql);
            $query->execute(array(':solicitud_profesionalemail' => $solicitud_email, ':lugar' => $lugar, ':ciudad' => $ciudad,':fechauno' => $desde, ':fechados' => $hasta, ':tipo' => $tipo));
        }

        return $query->fetchAll();
    }
    public static function getSolicitud($solicitud_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id));

        return $query->fetch();
    }
    public static function getSolicitudJoin($solicitud_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes INNER JOIN evaluacion ON solicitudes.solicitud_id = evaluacion.solicitud_id WHERE solicitudes.solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id));

        return $query->fetch();
    }
    public static function createSolicitud($solicitud_nombre_referente, $solicitud_profesionalemail,$solicitud_nombre,$solicitud_apellido,$solicitud_rut,$solicitud_fecha,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional,$telefono, $sistolica, $diastolica, $media, $talla, $peso, $imc, $antecedentes, $edadMaterna, $paridad, $parto){
        if (!$solicitud_profesionalemail || strlen($solicitud_profesionalemail) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO solicitudes (solicitud_nombre_referente, solicitud_profesionalemail,solicitud_nombre,solicitud_apellido,solicitud_rut,solicitud_fecha,solicitud_diagnostico,solicitud_lugar,solicitud_ciudad,solicitud_profesional,solicitud_nombreprofesional,solicitud_email,solicitud_fum,solicitud_respuesta,solicitud_egestacional,solicitud_telefono,solicitud_sistolica,solicitud_diastolica,solicitud_media,solicitud_talla,solicitud_peso,solicitud_imc,solicitud_antecedentes,solicitud_ematerna,solicitud_paridad, solicitud_parto) VALUES (:solicitud_nombre_referente, :solicitud_profesionalemail,:solicitud_nombre,:solicitud_apellido,:solicitud_rut,:solicitud_fecha,:solicitud_diagnostico,:solicitud_lugar,:solicitud_ciudad,:solicitud_profesional,:solicitud_nombreprofesional,:solicitud_email,:solicitud_fum,:solicitud_respuesta,:solicitud_egestacional, :solicitud_telefono, :solicitud_sistolica, :solicitud_diastolica, :solicitud_media, :solicitud_talla, :solicitud_peso, :solicitud_imc, :solicitud_antecedentes, :solicitud_ematerna, :solicitud_paridad, :solicitud_parto)";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_nombre_referente' => $solicitud_nombre_referente, ':solicitud_profesionalemail' => $solicitud_profesionalemail,':solicitud_nombre' => $solicitud_nombre,':solicitud_apellido' => $solicitud_apellido,':solicitud_rut' => $solicitud_rut,':solicitud_fecha' => $solicitud_fecha,':solicitud_diagnostico' => $solicitud_diagnostico,':solicitud_lugar' => $solicitud_lugar,':solicitud_ciudad' => $solicitud_ciudad,':solicitud_profesional' => $solicitud_profesional,':solicitud_nombreprofesional' => $solicitud_nombreprofesional,':solicitud_email' => $solicitud_email,':solicitud_fum' => $solicitud_fum,':solicitud_respuesta' => $solicitud_respuesta,':solicitud_egestacional' => $solicitud_egestacional, ':solicitud_telefono' => $telefono, ':solicitud_sistolica' => $sistolica, ':solicitud_diastolica' => $diastolica, ':solicitud_media' => $media, ':solicitud_talla' => $talla, ':solicitud_peso' => $peso, ':solicitud_imc' => $imc, ':solicitud_antecedentes' => $antecedentes, ':solicitud_ematerna' => $edadMaterna, ':solicitud_paridad' => $paridad, ':solicitud_parto' => $parto));

        if ($query->rowCount() == 1) {
            return $database->lastInsertId(); 
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

        if (Session::get('user_account_type') == 2){
            $sql = "SELECT solicitud_ciudad FROM solicitudes Where solicitud_email = :solicitud_profesionalemail group by solicitud_ciudad";
        }
        else{
            $sql = "SELECT solicitud_ciudad FROM solicitudes Where solicitud_profesionalemail = :solicitud_profesionalemail group by solicitud_ciudad";
        }
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }
    public static function getAllLugar($solicitud_email)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        if (Session::get('user_account_type') == 2){
            $sql = "SELECT solicitud_lugar FROM solicitudes Where solicitud_email = :solicitud_profesionalemail group by solicitud_lugar";
        }
        else{
            $sql = "SELECT solicitud_lugar FROM solicitudes Where solicitud_profesionalemail = :solicitud_profesionalemail group by solicitud_lugar";
        }
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetchAll();
    }
    public static function updateSolicitud($solicitud_id)
    {
        $nombre = Request::post("nombre");
        $apellido = Request::post("apellido");
        $telefono = Request::post("telefono");
        $fum = Request::post("fum");
        $fecha = Request::post("fecha");
        $eg = Request::post("eg");
        $edadMaterna = Request::post("edadMaterna");
        $ciudad = Request::post("ciudad");
        $lugar = Request::post("lugar");
        $diagnostico = Request::post("diagnostico");

        $sistolica = Request::post("sistolica");
        $diastolica = Request::post("diastolica");
        $media = Request::post("media");
        $talla = Request::post("talla");
        $peso = Request::post("peso");
        $imc = Request::post("imc");
        $paridad = Request::post("paridad");
        $antecedentes = Request::post("antecedentes");

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE solicitudes SET solicitud_nombre = :solicitud_nombre, solicitud_apellido = :solicitud_apellido, solicitud_telefono = :solicitud_telefono, solicitud_fum = :solicitud_fum, solicitud_fecha = :solicitud_fecha, solicitud_egestacional = :solicitud_egestacional, solicitud_ematerna = :solicitud_ematerna, solicitud_ciudad = :solicitud_ciudad, solicitud_lugar = :solicitud_lugar, solicitud_diagnostico = :solicitud_diagnostico,solicitud_sistolica = :solicitud_sistolica,solicitud_diastolica = :solicitud_diastolica,solicitud_media = :solicitud_media,solicitud_talla = :solicitud_talla,solicitud_peso = :solicitud_peso,solicitud_imc = :solicitud_imc,solicitud_antecedentes = :solicitud_antecedentes,solicitud_paridad = :solicitud_paridad WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id, ':solicitud_nombre' => $nombre, ':solicitud_apellido' => $apellido, ':solicitud_telefono' => $telefono, ':solicitud_fum' => $fum, ':solicitud_fecha' => $fecha, ':solicitud_egestacional' => $eg, ':solicitud_ematerna' => $edadMaterna, ':solicitud_ciudad' => $ciudad, ':solicitud_lugar' => $lugar, ':solicitud_diagnostico' => $diagnostico, ':solicitud_sistolica' => $sistolica,':solicitud_diastolica' =>$diastolica,':solicitud_media' => $media,':solicitud_talla' => $talla,':solicitud_peso' => $peso,':solicitud_imc' => $imc,':solicitud_antecedentes' => $antecedentes,':solicitud_paridad' => $paridad));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function updateSolicitudReferente($solicitud_id,$solicitud_email)
    {
        if (!$solicitud_id || !$solicitud_email) {
            return false;
        }

        $profesionalEmail = DirectorioModel::getDirectorioEmail($solicitud_email);

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE solicitudes SET solicitud_nombreprofesional = :solicitud_nombreprofesional, solicitud_email = :solicitud_email, solicitud_profesional = :solicitud_profesional WHERE solicitud_id = :solicitud_id";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id,':solicitud_nombreprofesional' => $profesionalEmail->email_nombre,':solicitud_email' => $profesionalEmail->email_value, ':solicitud_profesional' => $profesionalEmail->email_profesion));
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

    public static function getSolicitudForImágenes($solicitud_rut, $solicitud_fecha, $solicitud_email){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM solicitudes INNER JOIN respuestas on respuestas.solicitud_id = solicitudes.solicitud_id WHERE solicitudes.solicitud_rut = :solicitud_rut AND respuestas.fecha = :solicitud_fecha AND solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail AND solicitudes.solicitud_respuesta = 2";
        
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_rut' => $solicitud_rut,':solicitud_fecha' => $solicitud_fecha, ':solicitud_profesionalemail' => $solicitud_email));

        return $query->fetch();
    } 
}
