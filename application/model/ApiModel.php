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
}
