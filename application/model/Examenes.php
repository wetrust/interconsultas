<?php

class Examenes extends ORM
{
    const table = "examenes";

    public function __construct()
    {
        parent::__construct();
    }

    public function get() {
        $sql = "SELECT id, tipo, user_id, fecha, paciente_id, data FROM ". static::table ." WHERE user_id = :user_id AND id = :id LIMIT 1";
        $query = $this->database->prepare($sql);
        $query->execute(array(':user_id' =>  $this->user_id, ':id' =>  $this->id));

        if ($query->rowCount() == 1) {
            $result = $query->fetch();

            $this->id = $result->id;
            $this->tipo = $result->tipo;
            $this->user_id = $result->user_id;
            $this->fecha = $result->fecha;
            $this->paciente_id = $result->paciente_id;
            $this->data = $result->data;
            $this->getData();
            
            return true;
        }

        return false;
    }

    public function create() {
        $sql = "INSERT INTO ". static::table ." (tipo, user_id, fecha, paciente_id, data) VALUES (:tipo, :user_id, :fecha, :paciente_id, :data)";
        $query = $this->database->prepare($sql);
        $query->execute(array(':tipo' => $this->tipo, ':user_id' => $this->user_id, ':fecha' => $this->fecha, ':paciente_id' => $this->paciente_id, ':data' => $this->setData));

        if ($query->rowCount() == 1) { return true; }

        return false;
    }

    public function update() {
        $sql = "UPDATE ". static::table ." SET tipo = :tipo, fecha = :fecha, data = :data WHERE id = :id AND user_id = :user_id LIMIT 1";
        $query = $this->database->prepare($sql);
        $query->execute(array(':tipo' => $this->tipo, ':fecha' => $this->fecha, ':data' => $this->setData, ':id' => $this->id, ':user_id' => $this->user_id));

        if ($query->rowCount() == 1) { return true; }

        return false;
    }
}
