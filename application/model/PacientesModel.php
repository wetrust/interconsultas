<?php

class PacientesModel
{
    public static function getAllPacientes()
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id, nombre, apellido, rut, fum, ciudad, lugar, telefono FROM pacientes WHERE user_id = :user_id";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id')));

        return $query->fetchAll();
    }

    public static function findPacienteID($paciente){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id, nombre, apellido, rut, fum, ciudad, lugar, telefono FROM pacientes WHERE user_id = :user_id AND (rut like :rut OR apellido like :apellido) LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':rut' => '%'.$paciente.'%', ':apellido' => '%'.$paciente.'%'));

        return $query->fetch();
    }

    public static function getPaciente($rut){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id, nombre, apellido, rut, fum, ciudad, lugar, telefono FROM pacientes WHERE user_id = :user_id AND rut = :rut LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':rut' => $rut));

        return $query->fetch();
    }

    public static function getPacienteID($id){
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT id, nombre, apellido, rut, fum, ciudad, lugar, telefono FROM pacientes WHERE user_id = :user_id AND id = :id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':id' => $id));

        return $query->fetch();
    }

    public static function createPaciente($data)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO pacientes (rut, nombre, apellido, fum, ciudad, lugar, telefono, user_id) VALUES (:rut, :nombre, :apellido, :fum, :ciudad, :lugar, :telefono, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':rut' => $data->rut, ':nombre' => $data->nombre, ':apellido' => $data->apellido, ':fum' => $data->fum, ':ciudad' => $data->ciudad, ':lugar' => $data->lugar, ':telefono' => $data->telefono, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updatePaciente($data)
    {

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE pacientes SET rut = :rut, nombre = :nombre, apellido = :apellido, fum = :fum,  ciudad = :ciudad, lugar = :lugar, telefono = :telefono WHERE id = :id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':id' => $data->id, ':rut' => $data->rut, ':nombre' => $data->nombre, ':apellido' => $data->apellido, ':fum' => $data->fum, ':ciudad' => $data->ciudad, ':lugar' => $data->lugar, ':telefono' => $data->telefono, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) { return true; }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deletePaciente($data)
    {

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM pacientes WHERE id = :id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':id' => $data->id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
