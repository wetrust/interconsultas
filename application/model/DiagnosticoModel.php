<?php

class DiagnosticoModel
{
    public static function getAllDiagnosticos()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, diagnostico_id, diagnostico_name FROM diagnostico WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getLugar($diagnostico_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, diagnostico_id, diagnostico_name FROM diagnostico WHERE user_id = :user_id AND diagnostico_id = :diagnostico_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':diagnostico_id' => $diagnostico_id));

        return $query->fetch();
    }

    public static function createDiagnostico($diagnostico_name)
    {
        if (!$diagnostico_name || strlen($diagnostico_name) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO diagnostico (diagnostico_name, user_id) VALUES (:diagnostico_name, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':diagnostico_name' => $diagnostico_name, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updateLugar($lugar_id, $lugar_name)
    {
        if (!$lugar_id || !$lugar_name) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE lugar SET lugar_name = :lugar_name WHERE lugar_id = :lugar_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':lugar_id' => $lugar_id, ':lugar_name' => $lugar_name, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deleteLugar($lugar_id)
    {
        if (!$lugar_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM lugar WHERE lugar_id = :lugar_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':lugar_id' => $lugar_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
