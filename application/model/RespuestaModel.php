<?php

class RespuestaModel
{
    public static function getAllNotes()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, note_id, note_text FROM notes WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getRespuesta($solicitud_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM respuestas WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id));

        return $query->fetch();
    }

    public static function createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis,$respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_presentacion,$respuesta_dorso, $respuesta_doppler, $respuesta_anatomia)
    {
        if (!$solicitud_id) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO respuestas (solicitud_id, fecha, eg, pfe, pfe_percentil, liquido, uterinas, uterinas_percentil, umbilical, umbilical_percentil, cm, cm_percentil, cmau, cmau_percentil, hipotesis, comentariosexamen, ecografista, presentacion, dorso, doppler, anatomia_fetal) VALUES (:solicitud_id, :fecha, :solicitud_eg, :pfe, :pfe_percentil, :liquido, :uterinas, :uterinas_percentil, :umbilical, :umbilical_percentil, :cm, :cm_percentil, :cmau, :cmau_percentil, :hipotesis, :comentariosexamen, :ecografista, :presentacion, :dorso, :doppler, :anatomia_fetal)";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id, ':fecha' => $respuesta_fecha, ':solicitud_eg' => $respuesta_eg, ':pfe' => $respuesta_pfe, ':pfe_percentil' => $respuesta_pfe_percentil, ':liquido' => $respuesta_liquido, ':uterinas' => $respuesta_uterinas, ':uterinas_percentil' => $respuesta_uterinas_percentil, ':umbilical' => $respuesta_umbilical, ':umbilical_percentil' => $respuesta_umbilical_percentil, ':cm' => $respuesta_cm, ':cm_percentil' => $respuesta_cm_percentil, ':cmau' => $respuesta_cmau, ':cmau_percentil' => $respuesta_cmau_percentil, ':hipotesis' => $respuesta_hipotesis, ':comentariosexamen' => $respuesta_comentariosexamen, ':ecografista' => $respuesta_ecografista, ':presentacion' => $respuesta_presentacion, ':dorso' => $respuesta_dorso, ':doppler' => $respuesta_doppler, ':anatomia_fetal'=> $respuesta_anatomia));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updateNote($note_id, $note_text)
    {
        if (!$note_id || !$note_text) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE notes SET note_text = :note_text WHERE note_id = :note_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':note_id' => $note_id, ':note_text' => $note_text, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deleteNote($solicitud_id)
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
