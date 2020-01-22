<?php

class ConfiguracionModel
{
    public static function getAllNacionalidades()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, nacionalidad_id, nacionalidad_name FROM c_nacionalidad WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getAllCiudades()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, ciudad_id, ciudad_name FROM c_ciudad WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getAllLugares()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, lugar_id, lugar_name FROM c_lugar WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function getAllPatologias()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, patologia_id, patologia_name FROM c_patologia WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function createNacionalidad($data)
    {
        if (!$data->nacionalidad || strlen($data->nacionalidad) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO c_nacionalidad (nacionalidad_name, user_id) VALUES (:nacionalidad_name, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':nacionalidad_name' => $data->nacionalidad, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function createCiudad($data)
    {
        if (!$data->ciudad || strlen($data->ciudad) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO c_ciudad (ciudad_name, user_id) VALUES (:ciudad_name, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':ciudad_name' => $data->ciudad, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function createLugar($data)
    {
        if (!$data->lugar || strlen($data->lugar) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO c_lugar (lugar_name, user_id) VALUES (:lugar_name, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':lugar_name' => $data->lugar, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function createPatologia($data)
    {
        if (!$data->patologia || strlen($data->patologia) == 0) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO c_patologia (patologia_name, user_id) VALUES (:patologia_name, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':patologia_name' => $data->patologia, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteNacionalidad($data)
    {
        if (!$data->id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM c_nacionalidad WHERE nacionalidad_id = :nacionalidad_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':nacionalidad_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteCiudad($data)
    {
        if (!$data->id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM c_ciudad WHERE ciudad_id = :ciudad_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':ciudad_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteLugar($data)
    {
        if (!$data->id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM c_lugar WHERE lugar_id = :lugar_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':lugar_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deletePatologia($data)
    {
        if (!$data->id) { return false; }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM c_patologia WHERE patologia_id = :patologia_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':patologia_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

}
