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
            'solicitudes_old' => SolicitudesModel::getAllOldSolicitudes(Session::get('user_email')),
            'profesionales' => SolicitudesModel::getAllProfesionales(Session::get('user_email'))
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
        $evaluacion_fecha = Request::post('evaluacion_fecha');
        $comentario = Request::post('comentario');

        SolicitudesModel::updateStateSolicitud($solicitud_id, 1);

        EvaluacionModel::createEvaluacion($solicitud_id, $evaluacion_fecha, $comentario);
        EmailModel::sendPrimeraRespuesta($solicitud_id,$evaluacion_fecha, $comentario);
        //updateStateSolicitud($solicitud_id,$solicitud_respuesta)
        //SolicitudesModel::updateStateSolicitud(Request::post('solicitud_id'), Request::post('note_text'));
        Redirect::to('dashboard');
    }

    public function save(){ 
        $solicitud_id = Request::post('solicitud_id');
        $respuesta_fecha = Request::post('respuesta_fecha');
        $respuesta_eg = Request::post('respuesta_eg');
        $respuesta_pfe = Request::post('respuesta_pfe');
        $respuesta_pfe_percentil = Request::post('respuesta_pfe_percentil');
        $respuesta_liquido = Request::post('respuesta_liquido');
        $respuesta_presentacion = Request::post('respuesta_presentacion');
        $respuesta_dorso = Request::post('respuesta_dorso');
        $respuesta_uterinas = Request::post('respuesta_uterinas');
        $respuesta_uterinas_percentil = Request::post('respuesta_uterinas_percentil');
        $respuesta_umbilical = Request::post('respuesta_umbilical');
        $respuesta_umbilical_percentil = Request::post('respuesta_umbilical_percentil');
        $respuesta_cm = Request::post('respuesta_cm');
        $respuesta_cm_percentil = Request::post('respuesta_cm_percentil');
        $respuesta_cmau = Request::post('respuesta_cmau');
        $respuesta_cmau_percentil = Request::post('respuesta_cmau_percentil');
        $respuesta_hipotesis = Request::post('respuesta_hipotesis');
        $respuesta_controlfecha = Request::post('respuesta_controlfecha');
        $respuesta_comentariosexamen = Request::post('respuesta_comentariosexamen');
        $respuesta_ecografista = Request::post('respuesta_ecografista');
        $respuesta_doppler = Request::post('respuesta_doppler');
        $respuesta_anatomia = Request::post('respuesta_anatomia');
        $respuesta_anatomia_final = "";
        foreach($respuesta_anatomia as $yek => $out){
            $respuesta_anatomia_final = $respuesta_anatomia_final . ", ".$out;
        }
        $respuesta_anatomia = $respuesta_anatomia_final;

        RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_presentacion,$respuesta_dorso,$respuesta_doppler, $respuesta_anatomia);
        SolicitudesModel::updateStateSolicitud($solicitud_id, 2);

        $usuario = UserModel::getPublicProfileOfUser(Session::get('user_id'));

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
        ));
        
        if ($usuario->user_almacenamiento == 0){
            EmailModel::sendRespuestaReferenteEmail(Session::get('user_email'),$solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_doppler,$respuesta_anatomia);
            SolicitudesModel::deleteSolicitud($solicitud_id);
        }

        EmailModel::sendRespuestaEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_doppler,$respuesta_anatomia);

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
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
        ));
    }
    public function delete($note_id)
    {
        RespuestaModel::deleteNote($note_id);
        Redirect::to('dashboard');
    }
}
