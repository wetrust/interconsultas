<?php

class ApiController extends Controller
{
    public function send()
    {
       if (Session::get('user_account_type') == 4){
        $this->View->renderJSON(InterconsultaModel::solicitarInterconsultaInternal(Request::post('nombreReferente'), Request::post('correoReferente'),Request::post('nombre'), Request::post('rut'), Request::post('fecha'),Request::post('diagnostico'),Request::post('lugar'),Request::post('ciudad'),Request::post('fum'),Request::post('eg'),Request::post('telefono'),Request::post('sistolica'),Request::post('diastolica'),Request::post('media'),Request::post('talla'),Request::post('peso'),Request::post('imc'),Request::post('antecedentes'),Request::post('edadMaterna'),Request::post('paridad')));
       }else{
        $this->View->renderJSON(InterconsultaModel::solicitarInterconsulta(
            Request::post('nombreContrarreferente'),
            Request::post('correoContrarreferente'),
            Request::post('nombre'),
            Request::post('rut'),
            Request::post('fecha'),
            Request::post('diagnostico'),
            Request::post('lugar'),
            Request::post('ciudad'),
            Request::post('profesional'),
            Request::post('nombreReferente'),
            Request::post('correoReferente'),
            Request::post('fum'),
            Request::post('eg'),
            Request::post('telefono'),
            Request::post('sistolica'),
            Request::post('diastolica'),
            Request::post('media'),
            Request::post('talla'),
            Request::post('peso'),
            Request::post('imc'),
            Request::post('antecedentes'),
            Request::post('edadMaterna'),
            Request::post('paridad')
        ));
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
        $paciente = new stdClass();
        $resultado = [];
        
        $paciente->nombre = "juan";
        $paciente->rut = "17726628-0";
        $paciente->fum = "2019-01-21";

        $resultado[0] = $paciente;
        $resultado[1] = $paciente;

        $this->View->renderJSON($resultado);
    }
}