<?php

//Pequeño sistema para generar informes de primer, segundo / tercer trimestre y doppler
//depente de PdfModel(crea los pdf) y de procesadorModel(Evalua las reglas de negocio de los datos enviados)

class ProfesionalesController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->View->render('profesionales/index', array(
            'profesionales' => SolicitudesModel::getAllProfesionales(Session::get('user_email'))
        ));
    }

}