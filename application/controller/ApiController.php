<?php

class ApiController extends Controller
{
    public function send()
    {
       if (Session::get('user_account_type') == 4){
        $this->View->renderJSON(InterconsultaModel::solicitarInterconsultaInternal(Request::post('nombreReferente'), Request::post('correoReferente'),Request::post('nombre'), Request::post('rut'), Request::post('fecha'),Request::post('diagnostico'),Request::post('lugar'),Request::post('ciudad'),Request::post('fum'),Request::post('eg'),Request::post('telefono'),Request::post('sistolica'),Request::post('diastolica'),Request::post('media'),Request::post('talla'),Request::post('peso'),Request::post('imc'),Request::post('antecedentes'),Request::post('edadMaterna')));
       }else{
        $this->View->renderJSON(InterconsultaModel::solicitarInterconsulta(Request::post('nombreReferente'), Request::post('correoReferente'), Request::post('nombre'), Request::post('rut'), Request::post('fecha'), Request::post('diagnostico'), Request::post('lugar'), Request::post('ciudad'), Request::post('profesional'), Request::post('nombreprofesional'), Request::post('email'), Request::post('fum'), Request::post('eg'), Request::post('telefono'), Request::post('sistolica'), Request::post('diastolica'), Request::post('media'), Request::post('talla'), Request::post('peso'), Request::post('imc'), Request::post('antecedentes'),Request::post('edadMaterna')));
       }
    }

    public function profesionales(){
        $this->View->renderJSON(UserModel::getMedicos());
    }

    public function cerebelo($eg, $cerebelo){
        $this->View->renderJSON(CurvasModel::cerebelo($eg, $cerebelo));
    }
}