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
        $respuesta_crecimiento = Request::post('solicitud_crecimiento');


        $respuesta_utero = Request::post('respuesta_utero');
        $respuesta_saco_gestacional = Request::post('respuesta_saco_gestacional');
        $respuesta_embrion = Request::post('respuesta_embrion');
        $respuesta_lcn = Request::post('respuesta_lcn');
        $respuesta_anexo_izquierdo = Request::post('respuesta_anexo_izquierdo');
        $respuesta_anexo_derecho = Request::post('respuesta_anexo_derecho');
        $respuesta_douglas = Request::post('respuesta_douglas');

        if ($respuesta_crecimiento == 0){

            if (is_array ($respuesta_anatomia)){
                foreach($respuesta_anatomia as $yek => $out){
                    $respuesta_anatomia_final = $respuesta_anatomia_final . ", ".$out;
                }
            }
            else{
                $respuesta_anatomia = "";
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
            
    
            EmailModel::sendRespuestaEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_doppler,$respuesta_anatomia);
    
            if ($usuario->user_almacenamiento == 0){
                EmailModel::sendRespuestaReferenteEmail(Session::get('user_email'),$solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_doppler,$respuesta_anatomia);
                SolicitudesModel::deleteSolicitud($solicitud_id);
            }
        }
        else if ($respuesta_crecimiento == 1){
            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/primertrimestre', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_utero' => $respuesta_utero,
                'respuesta_saco_gestacional' => $respuesta_saco_gestacional,
                'respuesta_embrion' => $respuesta_embrion,
                'respuesta_lcn' => $respuesta_lcn,
                'respuesta_anexo_izquierdo' => $respuesta_anexo_izquierdo,
                'respuesta_anexo_derecho' => $respuesta_anexo_derecho,
                'respuesta_douglas' => $respuesta_douglas,
                'respuesta_fecha' => $respuesta_fecha,
                'respuesta_eg' => $respuesta_eg,
                'ecografista' => $respuesta_ecografista
        
            ));
        }
        else if($respuesta_crecimiento == 4){
            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, "", "", "", "", "", "", "", "", "", "", "", "", "", $respuesta_comentariosexamen, $respuesta_ecografista,"","","", "");
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);
            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/breve', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
            ));

            EmailModel::sendRespuestaEmailBreve($solicitud_id, $respuesta_comentariosexamen, $respuesta_ecografista);
            $usuario = UserModel::getPublicProfileOfUser(Session::get('user_id'));
            if ($usuario->user_almacenamiento == 0){
                EmailModel::sendRespuestaReferenteEmailBreve(Session::get('user_email'), $solicitud_id, $respuesta_comentariosexamen, $respuesta_ecografista);
                SolicitudesModel::deleteSolicitud($solicitud_id);
            }
        }
        

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
        RespuestaModel::deleteRespuesta($note_id);
        Redirect::to('dashboard');
    }
    
    public function configuracion(){
        $this->View->render('dashboard/configuracion', array(
            'textos' =>  TextModel::getAllTexts())
        );
    }

    public function config_new(){
        $this->View->render('dashboard/nuevo');
    }

    public function config_create(){
        TextModel::createText(Request::post('texto_titulo'),Request::post('texto_text'));
        Redirect::to('dashboard/configuracion');
    }

    public function config_edit($text_id){
        $this->View->render('dashboard/modificar', array(
            'textos' => TextModel::getText($text_id)
        ));
    }

    public function config_save(){
        TextModel::updateText(Request::post('texto_id'), Request::post('texto_titulo'), Request::post('texto_text'));
        Redirect::to('dashboard/configuracion');
    }

    public function config_delete($text_id){
        TextModel::deleteText($text_id);
        Redirect::to('dashboard/configuracion');
    }

    public function configuracion_api(){
        $accion = Request::post('action');
        $resultado = "";
        switch ($accion) {
            case "get":
                $resultado = TextModel::getAllTexts();
                break;
            case "new":
                $resultado = TextModel::createText(Request::post('texto_titulo'),Request::post('texto_text'));
                break;
            case "set":
                $resultado = TextModel::updateText(Request::post('texto_id'), Request::post('texto_titulo'), Request::post('texto_text'));
                break;
            case "read":
                $resultado = TextModel::getText(Request::post('texto_id'));
                break;
            case "delete":
                $resultado = TextModel::deleteText(Request::post('texto_id'));
                break;
        }
        return $this->View->renderJSON($resultado);  
    }
}
