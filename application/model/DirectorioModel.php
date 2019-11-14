<?php

class DirectorioModel
{
    public static function getAllDirectorios(){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT email.user_id, email.email_id, email.email_ciudad, email.email_nombre, ciudad.ciudad_name, email.email_value, email.email_profesion FROM email INNER JOIN ciudad ON email.email_ciudad = ciudad.ciudad_id WHERE email.user_id = :user_id  ORDER BY email.email_nombre";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getDirectorio($email_id){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, email_id, email_ciudad,email_nombre, email_value, email_profesion FROM email WHERE user_id = :user_id AND email_id = :email_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':email_id' => $email_id));

        return $query->fetch();
    }

    public static function getDirectorioTipo($email_profesion){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, email_id, email_ciudad,email_nombre, email_value, email_profesion FROM email WHERE user_id = :user_id AND email_profesion = :email_profesion";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':email_profesion' => $email_profesion));

        return $query->fetchAll();
    }

    public static function getAllDirectorioCiudades($email_profesion){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT email.email_ciudad, ciudad.ciudad_name FROM email INNER JOIN ciudad ON email.email_ciudad = ciudad.ciudad_id WHERE email.user_id = :user_id AND ciudad.user_id = :user_id AND email.email_profesion = :email_profesion GROUP BY email.email_ciudad";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':email_profesion' => $email_profesion));

        return $query->fetchAll();
    }

    public static function getAllDirectorioEmail($email_profesion, $email_ciudad){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT email_value, email_nombre FROM email WHERE user_id = :user_id AND email_profesion = :email_profesion AND email_ciudad = :email_ciudad";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':email_profesion' => $email_profesion, ':email_ciudad' => $email_ciudad));

        return $query->fetchAll();
    }

    public static function getDirectorioEmail($email_value){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, email_id,email_ciudad, email_nombre, email_value, email_profesion FROM email WHERE user_id = :user_id AND email_value = :email_value LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':email_value' => $email_value));

        return $query->fetch();
    }

    public static function createDirectorio($email_nombre, $email_ciudad, $email_value, $email_profesion){
        if (!$email_nombre || strlen($email_nombre) == 0 || !$email_value || strlen($email_value) == 0 || !$email_profesion || strlen($email_profesion) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO email (email_nombre, email_ciudad, email_value, email_profesion, user_id) VALUES (:email_nombre, :email_ciudad, :email_value, :email_profesion, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':email_nombre' => $email_nombre, ':email_ciudad' => $email_ciudad, ':email_value' => $email_value, ':email_profesion' => $email_profesion,':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updateDirectorio($email_id, $email_nombre, $email_ciudad, $email_value, $email_profesion){
        if (!$email_id || !$email_nombre || !$email_value) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE email SET email_nombre = :email_nombre, email_ciudad = :email_ciudad, email_value = :email_value, email_profesion = :email_profesion WHERE email_id = :email_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':email_id' => $email_id, ':email_nombre' => $email_nombre, ':email_ciudad' => $email_ciudad,':email_value' => $email_value, ':email_profesion' => $email_profesion, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deleteDirectorio($email_id){
        if (!$email_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM email WHERE email_id = :email_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':email_id' => $email_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
