<?php

class ApiController extends Controller
{
    public function send(){
       if (Session::get('user_account_type') == 4){
        $this->View->renderJSON(InterconsultaModel::solicitarInterconsultaInternal(Request::post('nombreReferente'), Request::post('correoReferente'),Request::post('nombre'), Request::post('apellido'), Request::post('rut'), Request::post('fecha'),Request::post('diagnostico'),Request::post('lugar'),Request::post('ciudad'),Request::post('fum'),Request::post('eg'),Request::post('telefono'),Request::post('sistolica'),Request::post('diastolica'),Request::post('media'),Request::post('talla'),Request::post('peso'),Request::post('imc'),Request::post('antecedentes'),Request::post('edadMaterna'),Request::post('paridad')));
       }else{
        $this->View->renderJSON(InterconsultaModel::solicitarInterconsulta(Request::post('nombreContrarreferente'),Request::post('correoContrarreferente'),Request::post('nombre'),Request::post('apellido'),Request::post('rut'),Request::post('fecha'),Request::post('diagnostico'),Request::post('lugar'),Request::post('ciudad'),Request::post('profesional'),Request::post('nombreReferente'),Request::post('correoReferente'),Request::post('fum'),Request::post('eg'),Request::post('telefono'),Request::post('sistolica'),Request::post('diastolica'),Request::post('media'),Request::post('talla'),Request::post('peso'),Request::post('imc'),Request::post('antecedentes'),Request::post('edadMaterna'),Request::post('paridad')));
       }
    }

    public function profesionales(){
        $this->View->renderJSON(UserModel::getMedicos());
    }

    public function cerebelo($eg, $cerebelo){
        $this->View->renderJSON(CurvasModel::cerebelo($eg, $cerebelo));
    }

    public function emails($tipo){
        $this->View->renderJSON(DirectorioModel::getDirectorioTipo($tipo));
    }

    public function pacientes(){
        $this->View->renderJSON(PacientesModel::getAllPacientes());
    }

    public function buscarpaciente(){
        $paciente = trim(Request::get('url'), '/');
        $paciente = explode('/', $paciente);
        $paciente = $paciente[count($paciente)-1];
        $paciente = html_entity_decode($paciente);
        $paciente = Filter::XSSFilter($paciente);
        $paciente = str_replace("_", " ",$paciente); 
        //$this->View->renderJSON($paciente);
        $this->View->renderJSON(PacientesModel::findPacienteID($paciente));
    }


    public function paciente($paciente){
        $this->View->renderJSON(PacientesModel::getPacienteID($paciente));
    }

    public function getPaciente($rut){
        $response = new stdClass();
        $response->return = PacientesModel::getPaciente($rut);
        $this->View->renderJSON($response);
    }

    public function newPacientes(){
        $data = new stdClass();
        $data->nombre = Request::post('nombre');
        $data->apellido = Request::post('apellido');
        $data->rut = Request::post('rut');
        $data->fum = Request::post('fum');
        $data->ciudad = Request::post('ciudad');
        $data->lugar = Request::post('lugar');
        $data->telefono = Request::post('telefono');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = PacientesModel::createPaciente($data);
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function updatePaciente(){
        $data = new stdClass();
        $data->id = Request::post('id');
        $data->nombre = Request::post('nombre');
        $data->apellido = Request::post('apellido');
        $data->rut = Request::post('rut');
        $data->fum = Request::post('fum');
        $data->ciudad = Request::post('ciudad');
        $data->lugar = Request::post('lugar');
        $data->telefono = Request::post('telefono');
        $data->modal = Request::post('modal');

        $response = new stdClass();
        $response->return = PacientesModel::updatePaciente($data);
        $response->modal = $data->modal;
        $this->View->renderJSON($response);
    }

    public function deletePaciente(){
        $data = new stdClass();
        $data->id = Request::post('id');

        $response = new stdClass();
        $response->return = PacientesModel::deletePaciente($data);
        $this->View->renderJSON($response);
    }

    public function getComunas(){
        $this->View->renderJSON(ApiModel::getAllComunas());
    }
}