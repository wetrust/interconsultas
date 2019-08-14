<?php

class MembreteModel
{
    public static function getMembrete()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, membrete_text FROM membrete WHERE user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetch();
    }

    public static function haveMembrete()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, membrete_text FROM membrete WHERE user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function createMembrete($membrete_text)
    {
        if (!$membrete_text || strlen($membrete_text) == 0) {
            return false;
        }

        $have = self::haveMembrete();

        if ($have == true){
            return self::updateMembrete($membrete_text)
        }
        else{

            $database = DatabaseFactory::getFactory()->getConnection();

            $sql = "INSERT INTO membrete (membrete_text, user_id) VALUES (:membrete_text, :user_id)";
            $query = $database->prepare($sql);
            $query->execute(array(':membrete_text' => $membrete_text, ':user_id' => Session::get('user_id')));
    
            if ($query->rowCount() == 1) {
                return true;
            }
            return false;
        }
    }

    public static function updateMembrete($membrete_text)
    {
        if (!$membrete_text) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE membrete SET membrete_text = :membrete_text WHERE user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':membrete_text' => $membrete_text, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteMembrete()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM membrete WHERE user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }
}
