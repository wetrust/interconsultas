<?php

class PartosModel
{
    public static function getAllPartos($solicitud_profesionalemail)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        if (Session::get('user_account_type') == 2){
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_rut, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, solicitudes.solicitud_fum,partos.fecha_parto, partos.semanas, partos.dias, partos.peso, partos.talla, partos.imc, partos.estado_nutricional, partos.etnia, partos.paridad, partos.tipo, partos.lugar, partos.pesofetal, partos.tallafetal, partos.craneofetal, partos.apgar_uno, partos.apgar_cinco, partos.sexo, partos.meconio, partos.ipn, partos.peso_eg, partos.peso_eg_estado, partos.ipn_eg, partos.ipn_eg_estado, partos.comentarios FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id where solicitudes.solicitud_email = :solicitud_profesionalemail";
        }
        else{
            $sql = "SELECT partos.parto_id, partos.solicitud_id, solicitudes.solicitud_nombre, solicitudes.solicitud_rut, solicitudes.solicitud_ciudad, solicitudes.solicitud_lugar, solicitudes.solicitud_fum,partos.fecha_parto, partos.semanas, partos.dias, partos.peso, partos.talla, partos.imc, partos.estado_nutricional, partos.etnia, partos.paridad, partos.tipo, partos.lugar, partos.pesofetal, partos.tallafetal, partos.craneofetal, partos.apgar_uno, partos.apgar_cinco, partos.sexo, partos.meconio, partos.ipn, partos.peso_eg, partos.peso_eg_estado, partos.ipn_eg, partos.ipn_eg_estado, partos.comentarios FROM partos INNER JOIN solicitudes ON partos.solicitud_id = solicitudes.solicitud_id where solicitudes.solicitud_profesionalemail = :solicitud_profesionalemail";
        }
        
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_profesionalemail' => $solicitud_profesionalemail));

        return $query->fetchAll();
    }

    public static function getPartos($solicitud_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();
        $sql = "SELECT parto_id, solicitud_id, fecha_parto, semanas, dias, peso, talla, imc, estado_nutricional, etnia, paridad, tipo, lugar, pesofetal, tallafetal, craneofetal, apgar_uno, apgar_cinco, sexo, meconio, ipn, peso_eg, peso_eg_estado, ipn_eg, ipn_eg_estado, comentarios FROM partos WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id));
        return $query->fetch();
    }

    public static function createPartos($solicitud_id, $fecha_parto, $semanas, $dias, $peso, $talla, $imc, $estado_nutricional, $etnia, $paridad, $tipo, $lugar, $pesofetal, $tallafetal, $craneofetal, $apgar_uno, $apgar_cinco, $sexo, $meconio, $ipn, $peso_eg, $peso_eg_estado, $ipn_eg, $ipn_eg_estado, $comentarios, $hipoglicemia, $alta)
    {

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO partos (solicitud_id, fecha_parto, semanas, dias, peso, talla, imc, estado_nutricional, etnia, paridad, tipo, lugar, pesofetal, tallafetal, craneofetal, apgar_uno, apgar_cinco, sexo, meconio, ipn, peso_eg, peso_eg_estado, ipn_eg, ipn_eg_estado, comentarios,hipoglicemia,alta) VALUES (:solicitud_id,:fecha_parto,:semanas,:dias,:peso,:talla,:imc,:estado_nutricional,:etnia,:paridad,:tipo,:lugar,:pesofetal,:tallafetal,:craneofetal,:apgar_uno,:apgar_cinco,:sexo,:meconio,:ipn,:peso_eg,:peso_eg_estado,:ipn_eg,:ipn_eg_estado,:comentarios,:hipoglicemia,:alta)";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id, ':fecha_parto' => $fecha_parto,':semanas' => $semanas,':dias' => $dias,':peso' => $peso,':talla' => $talla,':imc' => $imc,':estado_nutricional' => $estado_nutricional,':etnia' => $etnia,':paridad' => $paridad,':tipo' => $tipo,':lugar' => $tipo,':pesofetal' => $pesofetal,':tallafetal' => $tallafetal,':craneofetal' => $craneofetal,':apgar_uno' => $apgar_uno,':apgar_cinco' => $apgar_cinco,':sexo' => $sexo,':meconio' => $meconio,':ipn' => $ipn,':peso_eg' => $peso_eg,':peso_eg_estado' => $peso_eg_estado,':ipn_eg' => $ipn_eg,':ipn_eg_estado' => $ipn_eg_estado,':comentarios' => $comentarios,':hipoglicemia' => $comentarios,':alta' => $comentarios));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updatePartos($parto_id, $apgar_uno, $apgar_cinco) {
        $database = DatabaseFactory::getFactory()->getConnection();
        $sql = "UPDATE partos SET apgar_uno = :apgar_uno, apgar_cinco = :apgar_cinco WHERE parto_id = :parto_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':parto_id' => $parto_id, ':apgar_uno' => $apgar_uno, ':apgar_cinco' => $apgar_cinco));
        if ($query->rowCount() == 1) { return true; }
        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deleteParto($solicitud_id)
    {
        if (!$solicitud_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM partos WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
