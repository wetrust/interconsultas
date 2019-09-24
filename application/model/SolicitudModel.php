<?php

class SolicitudModel
{
    public static function getAllNotes()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, note_id, note_text FROM notes WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getNote($note_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, note_id, note_text FROM notes WHERE user_id = :user_id AND note_id = :note_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':note_id' => $note_id));

        return $query->fetch();
    }

    public static function createSolicitud($referente_id, $contrarreferente_id, $solicitud_nombre, $solicitud_rut, $solicitud_telefono, $solicitud_fecha_solicitud, $solicitud_fecha_agendada, $solicitud_eg_conocida, $solicitud_alteraciones, $solicitud_fum, $solicitud_eg, $solicitud_diagnostico, $solicitud_diagnostico_extra, $solicitud_ciudad, $solicitud_lugar)
    {
        if (!$referente_id || $contrarreferente_id) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO solicitud (referente_id, contrarreferente_id, solicitud_nombre, solicitud_rut, solicitud_telefono, solicitud_fecha_solicitud, solicitud_fecha_agendada, solicitud_eg_conocida, solicitud_alteraciones, solicitud_fum, solicitud_eg, solicitud_diagnostico, solicitud_diagnostico_extra, solicitud_ciudad, solicitud_lugar, solicitud_estado) VALUES (:referente_id, :contrarreferente_id, :solicitud_nombre, :solicitud_rut, :solicitud_telefono, :solicitud_fecha_solicitud, :solicitud_fecha_agendada, :solicitud_eg_conocida, :solicitud_alteraciones, :solicitud_fum, :solicitud_eg, :solicitud_diagnostico, :solicitud_diagnostico_extra, :solicitud_ciudad, :solicitud_lugar, 0)";
        $query = $database->prepare($sql);
        $query->execute(array(':referente_id' => $referente_id,
        ':contrarreferente_id' => $contrarreferente_id,
        ':solicitud_nombre' => $solicitud_nombre,
        ':solicitud_rut' => $solicitud_rut,
        ':solicitud_telefono' => $solicitud_telefono,
        ':solicitud_fecha_solicitud' => $solicitud_fecha_solicitud,
        ':solicitud_fecha_agendada' => $solicitud_fecha_agendada,
        ':solicitud_eg_conocida' => $solicitud_eg_conocida,
        ':solicitud_alteraciones' => $solicitud_alteraciones,
        ':solicitud_fum' => $solicitud_fum,
        ':solicitud_eg' => $solicitud_eg,
        ':solicitud_diagnostico' => $solicitud_diagnostico,
        ':solicitud_diagnostico_extra' => $solicitud_diagnostico_extra,
        ':solicitud_ciudad' => $solicitud_ciudad,
        ':solicitud_lugar' => $solicitud_lugar));

        if ($query->rowCount() == 1) {
            return return $database->lastInsertId();
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

    public static function deleteNote($note_id)
    {
        if (!$note_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM notes WHERE note_id = :note_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':note_id' => $note_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}