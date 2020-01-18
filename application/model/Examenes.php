<?php

class Examenes
{
    private $database;

    protected const table = "examenes";
    protected $id;
    protected $tipo;
    protected $user_id;
    protected $fecha;
    protected $paciente_id;
    protected $data;

    public function __construct() {
        $this->database = DatabaseFactory::getFactory()->getConnection();
        $this->user_id = Session::get('user_id');
    }

    private function getData(){
        $this->data = json_decode($this->data);
    }

    private function setData(){
        $this->data = json_encode($this->data);
    }

    public function getAll() {
        $sql = "SELECT id, tipo, user_id, fecha, paciente_id, data FROM :table WHERE user_id = :user_id";
        $query = $this->database->prepare($sql);
        $query->execute(array(':table'=> self::table, ':user_id' => $this->user_id));

        return $query->fetchAll();
    }

    public function get() {
        $sql = "SELECT id, tipo, user_id, fecha, paciente_id, data FROM :table WHERE user_id = :user_id AND id = :id LIMIT 1";
        $query = $this->database->prepare($sql);
        $query->execute(array(':table'=> self::table, ':user_id' =>  $this->user_id, ':id' =>  $this->id));

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
        $sql = "INSERT INTO :table (tipo, user_id, fecha, paciente_id, data) VALUES (:tipo, :user_id, :fecha, :paciente_id, :data)";
        $query = $this->database->prepare($sql);
        $query->execute(array(':table'=> self::table, ':tipo' => $this->tipo, ':user_id' => $this->user_id, ':fecha' => $this->fecha, ':paciente_id' => $this->paciente_id, ':data' => $this->setData));

        if ($query->rowCount() == 1) { return true; }

        return false;
    }

    public function update() {
        $sql = "UPDATE :table SET tipo = :tipo, fecha = :fecha, data = :data WHERE id = :id AND user_id = :user_id LIMIT 1";
        $query = $this->database->prepare($sql);
        $query->execute(array(':table'=> self::table, ':tipo' => $this->tipo, ':fecha' => $this->fecha, ':data' => $this->setData, ':id' => $this->id, ':user_id' => $this->user_id));

        if ($query->rowCount() == 1) { return true; }

        return false;
    }

    public function delete() {
        $sql = "DELETE FROM :table WHERE id = :id AND user_id = :user_id LIMIT 1";
        $query = $this->database->prepare($sql);
        $query->execute(array(':table'=> self::table, ':id' => $this->id, ':user_id' =>  $this->user_id));

        if ($query->rowCount() == 1) { return true; }
        
        return false;
    }
}
