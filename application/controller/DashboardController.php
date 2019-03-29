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
        $comentario = Request::post('comentario');

        if ($interconsulta_aceptada == 0){
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);
        }
        else{
            SolicitudesModel::updateStateSolicitud($solicitud_id, 1);
        }

        EvaluacionModel::createEvaluacion($solicitud_id, $interconsulta_aceptada, $interconsulta_crecimiento, $comentario);
        EmailModel::sendPrimeraRespuesta($solicitud_id,$interconsulta_aceptada, $comentario);
        //updateStateSolicitud($solicitud_id,$solicitud_respuesta)
        //SolicitudesModel::updateStateSolicitud(Request::post('solicitud_id'), Request::post('note_text'));
        Redirect::to('dashboard');
    }

    public function save(){ 
        $solicitud_id = Request::post('solicitud_id');
        $respuesta_proceder = Request::post('respuesta_proceder');
        $respuesta_fecha = Request::post('respuesta_fecha');
        $respuesta_eg = Request::post('respuesta_eg');
        $respuesta_comentarios = Request::post('respuesta_comentarios');
        $respuesta_pfe = Request::post('respuesta_pfe');
        $respuesta_pfe_percentil = Request::post('respuesta_pfe_percentil');
        $respuesta_ccca = Request::post('respuesta_ccca');
        $respuesta_ccca_percentil = Request::post('respuesta_ccca_percentil');
        $respuesta_liquido = Request::post('respuesta_liquido');
        $respuesta_bvm = Request::post('respuesta_bvm');
        $respuesta_uterinas = Request::post('respuesta_uterinas');
        $respuesta_uterinas_percentil = Request::post('respuesta_uterinas_percentil');
        $respuesta_umbilical = Request::post('respuesta_umbilical');
        $respuesta_umbilical_percentil = Request::post('respuesta_umbilical_percentil');
        $respuesta_cm = Request::post('respuesta_cm');
        $respuesta_cm_percentil = Request::post('respuesta_cm_percentil');
        $respuesta_cmau = Request::post('respuesta_cmau');
        $respuesta_cmau_percentil = Request::post('respuesta_cmau_percentil');
        $respuesta_hipotesis = Request::post('respuesta_hipotesis');
        $respuesta_rciu = Request::post('respuesta_rciu');
        $respuesta_lugar = Request::post('respuesta_lugar');
        $respuesta_controlfecha = Request::post('respuesta_controlfecha');
        $respuesta_comentariosexamen = Request::post('respuesta_comentariosexamen');
        $respuesta_ecografista = Request::post('respuesta_ecografista');

        RespuestaModel::createRespuesta($solicitud_id, $respuesta_proceder, $respuesta_fecha, $respuesta_eg, $respuesta_comentarios, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_ccca, $respuesta_ccca_percentil, $respuesta_liquido, $respuesta_bvm, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis,$respuesta_rciu,$respuesta_lugar, $respuesta_controlfecha,$respuesta_comentariosexamen, $respuesta_ecografista);
        SolicitudesModel::updateStateSolicitud($solicitud_id, 2);
        EmailModel::sendRespuestaEmail($solicitud_id, $respuesta_proceder, $respuesta_fecha, $respuesta_eg, $respuesta_comentarios, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_ccca, $respuesta_ccca_percentil, $respuesta_liquido, $respuesta_bvm, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis,$respuesta_rciu,$respuesta_lugar, $respuesta_controlfecha,$respuesta_comentariosexamen, $respuesta_ecografista);

        //updateStateSolicitud($solicitud_id,$solicitud_respuesta)
        //SolicitudesModel::updateStateSolicitud(Request::post('solicitud_id'), Request::post('note_text'));
        Redirect::to('dashboard');
    }

    public function edit($solicitud_id)
    {
        $this->View->render('dashboard/edit', array(
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id)
        ));
    }

    public function ver($solicitud_id)
    {
        $this->View->render('dashboard/ver', array(
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id)
        ));
    }
}
