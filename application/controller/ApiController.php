<?php

class ApiController extends Controller
{
    public function send()
    {
        header('Access-Control-Allow-Origin: *');
        $this->View->renderJSON(InterconsultaModel::solicitarInterconsulta(Request::post('nombre_para'), Request::post('para'),Request::post('nombre'), Request::post('rut'), Request::post('fecha'),Request::post('eg'),Request::post('eco'),Request::post('diagnostico'),Request::post('lugar'),Request::post('ciudad'),Request::post('profesional'),Request::post('nombreprofesional'),Request::post('email'),Request::post('fum'),0,Request::post('egestacional')));
    }
}