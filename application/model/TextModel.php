<?php

class TextModel
{
    public static function getAllTexts()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, texto_id, texto_titulo, texto_text FROM textos WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getText($texto_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, texto_id, texto_titulo, texto_text FROM textos WHERE user_id = :user_id AND texto_id = :texto_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':texto_id' => $texto_id));

        return $query->fetch();
    }

    public static function createText($texto_titulo,$texto_text)
    {
        if (!$texto_text || strlen($texto_text) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO textos (texto_titulo, texto_text, user_id) VALUES (:texto_titulo, :texto_text, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':texto_titulo' => $texto_titulo, ':texto_text' => $texto_text, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updateText($texto_id, $texto_titulo, $texto_text)
    {
        if (!$texto_id || !$texto_text) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE textos SET texto_titulo = :texto_titulo, texto_text = :texto_text WHERE texto_id = :texto_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':texto_id' => $texto_id, ':texto_titulo' => $texto_titulo,':texto_text' => $texto_text, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deleteText($texto_id)
    {
        if (!$texto_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM textos WHERE texto_id = :texto_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':texto_id' => $texto_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
