<?php

class ImagenesController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index($paciente, $fecha)
    {
        if (empty($paciente) OR empty($fecha)) {
            Redirect::home();
        }

        $this->View->render('imagenes/index', array(
            'paciente' => $paciente,
            'fecha' => $fecha
        ));
    }
}
