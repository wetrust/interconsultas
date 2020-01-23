<?php

class ReservasModel
{
    public static function getAllReservas($fecha)
    {

        $database = DatabaseFactory::getFactory()->getConnection();
        $sql = "SELECT user_id, reserva_id, reserva_nombre, reserva_apellido, reserva_rut, reserva_dia, reserva_hora, reserva_minutos FROM reservas WHERE user_id = :user_id AND reserva_dia = :reserva_dia";        
        $query = $database->prepare($sql);

        if ($fecha == NULL){
            $fecha = date("Y-m-d");
        }
        $query->execute(array(':user_id' => Session::get('user_id'), ':reserva_dia' => $fecha));

        return $query->fetchAll();
    }

    public static function getReserva($data)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, reserva_id, reserva_nombre, reserva_apellido, reserva_rut, reserva_dia, reserva_hora, reserva_minutos FROM reservas WHERE user_id = :user_id AND reserva_id = :reserva_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':reserva_id' => $data->id));

        return $query->fetch();
    }

    public static function createReserva($data)
    {

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO reservas (user_id, reserva_nombre, reserva_apellido, reserva_rut, reserva_dia, reserva_hora, reserva_minutos) VALUES (:user_id, :reserva_nombre, :reserva_apellido, :reserva_rut, :reserva_dia, :reserva_hora, :reserva_minutos)";
        $query = $database->prepare($sql);
        $query->execute(array(':reserva_nombre' => $data->nombre, ':reserva_apellido' => $data->apellido, ':reserva_rut' => $data->rut, ':reserva_dia' => $data->dia, ':reserva_hora' => $data->hora, ':reserva_minutos' => $data->minutos, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }

    public static function deleteReserva($data)
    {
        if (!$data->id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM reservas WHERE reserva_id = :reserva_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':reserva_id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        return false;
    }
}
