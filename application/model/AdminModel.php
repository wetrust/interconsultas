<?php

class AdminModel
{
    public static function setAccountSuspensionAndDeletionStatus($save, $suspensionInDays, $softDelete, $userId)
    {

        if ($userId == Session::get('user_id')) {
            Session::add('feedback_negative', Text::get('FEEDBACK_ACCOUNT_CANT_DELETE_SUSPEND_OWN'));
            return false;
        }

        self::almacenarFunction($userId, $save);

        if ($suspensionInDays > 0) {
            $suspensionTime = time() + ($suspensionInDays * 60 * 60 * 24);
        } else {
            $suspensionTime = null;
        }

        if ($softDelete == 1) {
            $delete = 1;
        } else {
            $delete = 0;
        }

        self::writeDeleteAndSuspensionInfoToDatabase($userId, $suspensionTime, $delete);

        if ($suspensionTime != null OR $delete = 1) {
            self::resetUserSession($userId);
        }
    }

    private static function almacenarFunction($userId, $save)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("UPDATE users SET user_almacenamiento = :user_almacenamiento WHERE user_id = :user_id LIMIT 1");
        $query->execute(array(
                ':user_almacenamiento' => $save,
                ':user_id' => $userId
        ));

        if ($query->rowCount() == 1) {
            Session::add('feedback_positive', Text::get('FEEDBACK_ACCOUNT_SUSPENSION_DELETION_STATUS'));
            return true;
        }
    }

    private static function categoriaProfesionalFunction($userId, $categoria)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("UPDATE users SET user_account_type = :user_account_type WHERE user_id = :user_id LIMIT 1");
        $query->execute(array(
                ':user_account_type' => $categoria,
                ':user_id' => $userId
        ));

        if ($query->rowCount() == 1) {
            Session::add('feedback_positive', Text::get('FEEDBACK_ACCOUNT_SUSPENSION_DELETION_STATUS'));
            return true;
        }
    }

    private static function writeDeleteAndSuspensionInfoToDatabase($userId, $suspensionTime, $delete)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("UPDATE users SET user_suspension_timestamp = :user_suspension_timestamp, user_deleted = :user_deleted  WHERE user_id = :user_id LIMIT 1");
        $query->execute(array(
                ':user_suspension_timestamp' => $suspensionTime,
                ':user_deleted' => $delete,
                ':user_id' => $userId
        ));

        if ($query->rowCount() == 1) {
            Session::add('feedback_positive', Text::get('FEEDBACK_ACCOUNT_SUSPENSION_DELETION_STATUS'));
            return true;
        }
    }

    private static function resetUserSession($userId)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $query = $database->prepare("UPDATE users SET session_id = :session_id  WHERE user_id = :user_id LIMIT 1");
        $query->execute(array(
                ':session_id' => null,
                ':user_id' => $userId
        ));

        if ($query->rowCount() == 1) {
            Session::add('feedback_positive', Text::get('FEEDBACK_ACCOUNT_USER_SUCCESSFULLY_KICKED'));
            return true;
        }
    }

    public static function deleteUser($user_id)
    {
        if (!$user_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM users WHERE user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => $user_id));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
