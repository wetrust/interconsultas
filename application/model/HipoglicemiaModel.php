<?php

class HipoglicemiaModel
{
    public static function getAllHipoglicemia($parto_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT * FROM hipoglicemia where parto_id = :parto_id";
        
        $query = $database->prepare($sql);
        $query->execute(array(':parto_id' => $parto_id));

        return $query->fetchAll();
    }


    public static function createHipoglicemia($parto_id, $hora, $dextro, $conducta)
    {

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO hipoglicemia (parto_id, hora, valor, conducta) VALUES (:parto_id,:hora,:valor,:conducta)";
        $query = $database->prepare($sql);
        $query->execute(array(':parto_id' => $parto_id, ':hora' => $hora,':valor' => $dextro,':conducta' => $conducta));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function deleteHipoglicemia($hipoglicemia_id)
    {
        if (!$hipoglicemia_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM hipoglicemia WHERE hipoglicemia_id = :hipoglicemia_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':hipoglicemia_id' => $hipoglicemia_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
