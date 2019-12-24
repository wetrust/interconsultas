<?php

class ApiModel
{
    public static function getAllComunas()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT comuna_id, comuna_name FROM comunas ORDER BY comuna_name ASC";
        $query = $database->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    public static function partoUser()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_name, user_email FROM users where user_active = 1 AND user_account_type = 5";
        $query = $database->prepare($sql);
        $query->execute();

        return $query->fetchAll();
    }

    public static function getAllPartos($token)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, user_email FROM users where user_active = 1 AND session_id = :session_id";
        $query = $database->prepare($sql);
        $query->execute(array(":session_id" => $token));

        $respuesta = $query->fetch();
        return $respuesta->user_email;
        //return SolicitudesModel::getAllOldSolicitudesSinParto($respuesta->user_email);
    }


    
}
