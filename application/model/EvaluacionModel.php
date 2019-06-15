<?php

class EvaluacionModel
{
    public static function getAllNotes()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, note_id, note_text FROM notes WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getEvaluacion($solicitud_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT solicitud_id, evaluacion_fecha, evaluacion_comentarios FROM evaluacion WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id));

        return $query->fetch();
    }

    public static function createEvaluacion($solicitud_id, $evaluacion_fecha, $evaluacion_comentarios)
    {
        if (!$solicitud_id) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO evaluacion (solicitud_id, evaluacion_fecha, evaluacion_comentarios) VALUES (:solicitud_id, :evaluacion_fecha, :evaluacion_comentarios)";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id, ':evaluacion_fecha' => $evaluacion_fecha, ':evaluacion_comentarios'  => $evaluacion_comentarios));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updateEvaluacion($solicitud_id, $evaluacion_fecha, $evaluacion_comentarios)
    {
        if (!$solicitud_id || !$evaluacion_fecha) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE evaluacion SET evaluacion_fecha = :evaluacion_fecha, evaluacion_comentarios = :evaluacion_comentarios WHERE solicitud_id = :solicitud_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':solicitud_id' => $solicitud_id, ':evaluacion_fecha' => $evaluacion_fecha, ':evaluacion_comentarios' => $evaluacion_comentarios));

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
