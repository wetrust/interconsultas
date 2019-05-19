<?php

class ContactoController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->View->render('contacto/index');
    }

    public function enviar()
    {
        ContactoModel::sendEmail(
            Request::post('nombre_text'),
            Request::post('direccion_text'),
            Request::post('email_text'),
            Request::post('telefono_text'),
            Request::post('mensaje_text')
        );
        Redirect::to('contacto');
    }
}
