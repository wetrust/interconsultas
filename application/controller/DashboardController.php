<?php

class DashboardController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        Auth::checkAuthentication();
    }

    public function index()
    {
        $this->View->render('dashboard/index', array(
            'solicitudes_new' => SolicitudesModel::getAllNewSolicitudes(Session::get('user_email')),
            'solicitudes' => SolicitudesModel::getAllSolicitudes(Session::get('user_email')),
            'solicitudes_old' => SolicitudesModel::getAllOldSolicitudes(Session::get('user_email'))
        ));
    }

    public function agendar($solicitud_id)
    {
        $this->View->render('dashboard/agendar', array(
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email'))
        ));
    }

    public function editSave(){ 
        $solicitud_id = Request::post('solicitud_id');
        $interconsulta_aceptada = Request::post('interconsulta_aceptada');
        $interconsulta_crecimiento = Request::post('interconsulta_crecimiento');

        if ($interconsulta_aceptada == 0){
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);
        }
        else{
            SolicitudesModel::updateStateSolicitud($solicitud_id, 1);
        }

        //updateStateSolicitud($solicitud_id,$solicitud_respuesta)
        //SolicitudesModel::updateStateSolicitud(Request::post('solicitud_id'), Request::post('note_text'));
        Redirect::to('dashboard');
    }

    public function ver($solicitud_id)
    {
        $this->View->render('dashboard/ver', array(
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email'))
        ));
    }
}
