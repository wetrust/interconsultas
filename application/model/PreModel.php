
<?php

class PreModel
{
    public static function getAllPre()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, pre_id, paciente_id, pre_fecha, pre_examen, pre_motivo FROM notes WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getPre($data)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, pre_id, paciente_id, pre_fecha, pre_examen, pre_motivo FROM pre_examen WHERE user_id = :user_id AND pre_id = :pre_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':pre_id' => $data->id));

        return $query->fetch();
    }

    public static function createPre($data)
    {
        if (!$data) { return false; }

        $reserva = ReservasModel::getReserva($data);

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO pre_examen (user_id, paciente_rut, pre_fecha, pre_examen, pre_motivo) VALUES (:user_id, :paciente_rut, :pre_fecha, :pre_examen, :pre_motivo)";
        $query = $database->prepare($sql);
        $query->execute(array(':paciente_rut' => $reserva->reserva_rut, ':pre_fecha' => $data->fecha, ':pre_examen' => $data->examen, ':pre_motivo' => $data->motivo, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) { return $database->lastInsertId(); }

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