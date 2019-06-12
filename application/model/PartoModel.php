<?php

class PartosModel
{
    public static function getAllNotes()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT parto_id, solicitud_id, fecha_parto, semanas, dias, peso, talla, imc, estado_nutricional, etnia, paridad, tipo, lugar, pesofetal, tallafetal, craneofetal, apgar_uno, apgar_cinco, sexo, meconio, ipn, peso_eg, peso_eg_estado, ipn_eg, ipn_eg_estado, comentarios FROM partos";
        $query = $database->prepare($sql);
        $query->execute();

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

    public static function createPartos($solicitud_id, $fecha_parto, $semanas, $dias, $peso, $talla, $imc, $estado_nutricional, $etnia, $paridad, $tipo, $lugar, $pesofetal, $tallafetal, $craneofetal, $apgar_uno, $apgar_cinco, $sexo, $meconio, $ipn, $peso_eg, $peso_eg_estado, $ipn_eg, $ipn_eg_estado, $comentarios)
    {

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO partos (solicitud_id, fecha_parto, semanas, dias, peso, talla, imc, estado_nutricional, etnia, paridad, tipo, lugar, pesofetal, tallafetal, craneofetal, apgar_uno, apgar_cinco, sexo, meconio, ipn, peso_eg, peso_eg_estado, ipn_eg, ipn_eg_estado, comentarios) VALUES (:solicitud_id,:fecha_parto,:semanas,:dias,:peso,:talla,:imc,:estado_nutricional,:etnia,:paridad,:tipo,:lugar,:pesofetal,:tallafetal,:craneofetal,:apgar_uno,:apgar_cinco,:sexo,:meconio,:ipn,:peso_eg,:peso_eg_estado,:ipn_eg,:ipn_eg_estado,:comentarios)";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id, ':fecha_parto' => $fecha_parto,':semanas' => $semanas,':dias' => $dias,':peso' => $peso,':talla' => $talla,':imc' => $imc,':estado_nutricional' => $estado_nutricional,':etnia' => $etnia,':paridad' => $paridad,':tipo' => $tipo,':lugar' => $tipo,':pesofetal' => $pesofetal,':tallafetal' => $tallafetal,':craneofetal' => $craneofetal,':apgar_uno' => $apgar_uno,':apgar_cinco' => $apgar_cinco,':sexo' => $sexo,':meconio' => $meconio,':ipn' => $ipn,':peso_eg' => $peso_eg,':peso_eg_estado' => $peso_eg_estado,':ipn_eg' => $ipn_eg,':ipn_eg_estado' => $ipn_eg_estado,':comentarios' => $comentarios));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updateNote($parto_id, $fecha_parto, $semanas, $dias, $peso, $talla, $imc, $estado_nutricional, $etnia, $paridad, $tipo, $lugar, $pesofetal, $tallafetal, $craneofetal, $apgar_uno, $apgar_cinco, $sexo, $meconio, $ipn, $peso_eg, $peso_eg_estado, $ipn_eg, $ipn_eg_estado, $comentarios)
    {

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE partos SET fecha_parto = :fecha_parto,semanas = :semanas,dias = :dias,peso = :peso,talla = :talla,imc = :imc,estado_nutricional = :estado_nutricional,etnia = :etnia,paridad = :paridad,tipo = :tipo,lugar = :lugar,pesofetal = :pesofetal,tallafetal = :tallafetal,craneofetal = :craneofetal,apgar_uno = :apgar_uno,apgar_cinco = :apgar_cinco,sexo = :sexo,meconio = :meconio,ipn = :ipn,peso_eg = :peso_eg,peso_eg_estado = :peso_eg_estado,ipn_eg = :ipn_eg,ipn_eg_estado = :ipn_eg_estado,comentarios = :comentarios WHERE parto_id = :parto_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':parto_id' => $parto_id, ':fecha_parto' => $fecha_parto, ':semanas' => $semanas, ':dias' => $dias, ':peso' => $peso, ':talla' => $talla, ':imc' => $imc, ':estado_nutricional' => $estado_nutricional, ':etnia' => $etnia, ':paridad' => $paridad, ':tipo' => $tipo, ':lugar' => $lugar, ':pesofetal' => $pesofetal, ':tallafetal' => $tallafetal, ':craneofetal' => $craneofetal, ':apgar_uno' => $apgar_uno, ':apgar_cinco' => $apgar_cinco, ':sexo' => $sexo, ':meconio' => $meconio, ':ipn' => $ipn,':peso_eg' => $peso_eg, ':peso_eg_estado' => $peso_eg_estado, ':ipn_eg' => $ipn_eg, ':ipn_eg_estado' => $ipn_eg_estado, ':comentarios' => $comentarios));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deleteParto($parto_id)
    {
        if (!$parto_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM partos WHERE parto_id = :parto_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':parto_id' => $parto_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
