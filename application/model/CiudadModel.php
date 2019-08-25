<?php

class CiudadModel
{
    public static function getAllCiudades()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, ciudad_id, ciudad_name FROM ciudad WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getCiudad($ciudad_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, ciudad_id, ciudad_name FROM ciudad WHERE user_id = :user_id AND ciudad_id = :ciudad_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':ciudad_id' => $ciudad_id));

        return $query->fetch();
    }

    public static function createCiudad($ciudad_name)
    {
        if (!$ciudad_name || strlen($ciudad_name) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO ciudad (ciudad_name, user_id) VALUES (:ciudad_name, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':ciudad_name' => $ciudad_name, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updateCiudad($ciudad_id, $ciudad_name)
    {
        if (!$ciudad_id || !$ciudad_name) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE ciudad SET ciudad_name = :ciudad_name WHERE ciudad_id = :ciudad_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':ciudad_id' => $ciudad_id, ':ciudad_name' => $ciudad_name, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deleteCiudad($ciudad_id)
    {
        if (!$ciudad_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM ciudad WHERE ciudad_id = :ciudad_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':ciudad_id' => $ciudad_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
