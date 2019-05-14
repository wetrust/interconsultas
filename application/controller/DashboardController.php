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
            'profesionales' => SolicitudesModel::getAllProfesionales(Session::get('user_email'))
        ));
    }

    public function agendar($solicitud_id)
    {
        $this->View->renderJSON(SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')));
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
    }

    public function save(){

        $respuesta_crecimiento = Request::post('solicitud_crecimiento');

        $solicitud_id = Request::post('solicitud_id');
        $respuesta_fecha = Request::post('respuesta_fecha');
        $respuesta_eg = Request::post('respuesta_eg');
        $respuesta_pfe = Request::post('respuesta_pfe');
        $respuesta_pfe_pct = Request::post('respuesta_pfe_pct');
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
        $respuesta_doppler_materno = Request::post('respuesta_doppler_materno');
        $respuesta_doppler_fetal = Request::post('respuesta_doppler_fetal');
        $respuesta_anatomia = Request::post('respuesta_anatomia');
        $respuesta_anatomia_extra = Request::post('respuesta_anatomia_extra');

        //para ecografía de primer trimestre
        $respuesta_utero_primertrimestre = Request::post('respuesta_utero_primertrimestre');
        $respuesta_saco_gestacional = Request::post('respuesta_saco_gestacional');
        $respuesta_embrion = Request::post('respuesta_embrion');
        $respuesta_lcn = Request::post('respuesta_lcn');
        $respuesta_anexo_izquierdo_primertrimestre = Request::post('respuesta_anexo_izquierdo_primertrimestre');
        $respuesta_anexo_derecho_primertrimestre = Request::post('respuesta_anexo_derecho_primertrimestre');
        $respuesta_douglas_primertrimestre = Request::post('respuesta_douglas_primertrimestre');
        $respuesta_lcn_eg = Request::post('respuesta_lcn_eg');

        //para ecografía de segundo trimestre
        $respuesta_placenta = Request::post('respuesta_placenta');
        $respuesta_placenta_insercion = Request::post('respuesta_placenta_insercion');
        $respuesta_liquido_amniotico = Request::post('respuesta_liquido_amniotico');
        $respuesta_dbp = Request::post('respuesta_dbp');
        $respuesta_cc = Request::post('respuesta_cc');
        $respuesta_cc_pct = Request::post('respuesta_cc_pct');
        $respuesta_ca = Request::post('respuesta_ca');
        $respuesta_ca_pct = Request::post('respuesta_ca_pct');
        $respuesta_lf = Request::post('respuesta_lf');
        $respuesta_lf_pct = Request::post('respuesta_lf_pct');
        $respuesta_ccca = Request::post('respuesta_ccca');
        $respuesta_dorso_segundo = Request::post('respuesta_dorso_segundo');
        $respuesta_ccca_pct = Request::post('respuesta_ccca_pct');
        $respuesta_crecimiento_ccca = Request::post('respuesta_crecimiento_ccca');

        //para ginecología
        $respuesta_utero_ginecologica = Request::post('respuesta_utero_ginecologica');
        $respuesta_endometrio = Request::post('respuesta_endometrio');
        $respuesta_anexo_izquierdo_ginecologica = Request::post('respuesta_anexo_izquierdo_ginecologica');
        $respuesta_anexo_derecho_ginecologica = Request::post('respuesta_anexo_derecho_ginecologica');
        $respuesta_ovario_izquierdo = Request::post('respuesta_ovario_izquierdo');
        $respuesta_ovario_derecho = Request::post('respuesta_ovario_derecho');
        $respuesta_douglas_ginecologica = Request::post('respuesta_douglas_ginecologica');

        if ($respuesta_crecimiento == 0){

            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_pct, $respuesta_liquido, $respuesta_presentacion, $respuesta_dorso, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista, $respuesta_doppler_materno, $respuesta_anatomia, $respuesta_crecimiento, "", "", "", "", "", "", "", "", $respuesta_placenta,$respuesta_placenta_insercion, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","","", $respuesta_doppler_fetal,"","","",$respuesta_anatomia_extra);
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);

            $usuario = UserModel::getPublicProfileOfUser(Session::get('user_id'));

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
            ));

            EmailModel::sendRespuestaEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_pct, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_doppler_materno,$respuesta_anatomia);

            if ($usuario->user_almacenamiento == 0){
                EmailModel::sendRespuestaReferenteEmail(Session::get('user_email'),$solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_pct, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_doppler_materno,$respuesta_anatomia);
                SolicitudesModel::deleteSolicitud($solicitud_id);
            }
        }
        else if ($respuesta_crecimiento == 1){

            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, "", "", "", "", "", "", "", "", "", "", "", "", "", "", $respuesta_comentariosexamen, $respuesta_ecografista, "", "", $respuesta_crecimiento, $respuesta_utero_primertrimestre, $respuesta_saco_gestacional, $respuesta_embrion, $respuesta_lcn, $respuesta_anexo_izquierdo_primertrimestre, $respuesta_anexo_derecho_primertrimestre, $respuesta_douglas_primertrimestre, $respuesta_lcn_eg, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","","","","","",$respuesta_anatomia_extra);
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/primertrimestre', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_utero' => $respuesta_utero_primertrimestre,
                'respuesta_saco_gestacional' => $respuesta_saco_gestacional,
                'respuesta_embrion' => $respuesta_embrion,
                'respuesta_lcn' => $respuesta_lcn,
                'respuesta_anexo_izquierdo_primertrimestre' => $respuesta_anexo_izquierdo_primertrimestre,
                'respuesta_anexo_derecho_primertrimestre' => $respuesta_anexo_derecho_primertrimestre,
                'respuesta_douglas_primertrimestre' => $respuesta_douglas_primertrimestre,
                'respuesta_fecha' => $respuesta_fecha,
                'respuesta_eg' => $respuesta_eg,
                'ecografista' => $respuesta_ecografista,
                'comentariosexamen' => $respuesta_comentariosexamen,
                'respuesta_lcn_eg' => $respuesta_lcn_eg
        
            ));

            $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));
            $solicitud = $solicitud->solicitud_email;

            EmailModel::sendRespuestaEcoPrimerTrimestreEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_utero_primertrimestre, $respuesta_saco_gestacional, $respuesta_embrion, $respuesta_lcn, $respuesta_anexo_izquierdo_primertrimestre, $respuesta_anexo_derecho_primertrimestre, $respuesta_douglas_primertrimestre, $respuesta_comentariosexamen, $respuesta_ecografista, $solicitud);
            $usuario = UserModel::getPublicProfileOfUser(Session::get('user_id'));

            if ($usuario->user_almacenamiento == 0){
                EmailModel::sendRespuestaEcoPrimerTrimestreEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_utero_primertrimestre, $respuesta_saco_gestacional, $respuesta_embrion, $respuesta_lcn, $respuesta_anexo_izquierdo_primertrimestre, $respuesta_anexo_derecho_primertrimestre, $respuesta_douglas_primertrimestre, $respuesta_comentariosexamen, $respuesta_ecografista, Session::get('user_email'));
                SolicitudesModel::deleteSolicitud($solicitud_id);
            }
        }
        else if ($respuesta_crecimiento == 2){

            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);

            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, "","", "", "", "", "", "", "", "", "", "", "", "", "", $respuesta_comentariosexamen, $respuesta_ecografista, "", "", $respuesta_crecimiento, "", "", "", "", "", "", "", "", $respuesta_placenta,$respuesta_placenta_insercion, $respuesta_liquido_amniotico, $respuesta_dbp, $respuesta_cc, $respuesta_ca, $respuesta_lf, $respuesta_pfe, $respuesta_ccca, $respuesta_presentacion, $respuesta_dorso_segundo, $respuesta_anatomia, $respuesta_pfe_pct, $respuesta_ccca_pct, $respuesta_hipotesis, "", "", "", "", "", "", "",$respuesta_crecimiento_ccca, "",$respuesta_cc_pct,$respuesta_ca_pct,$respuesta_lf_pct,$respuesta_anatomia_extra);

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_placenta' => $respuesta_placenta,
                'respuesta_placenta_insercion' => $respuesta_placenta_insercion,
                'respuesta_liquido_amniotico' => $respuesta_liquido_amniotico,
                'respuesta_dbp' => $respuesta_dbp,
                'respuesta_cc' => $respuesta_cc,
                'respuesta_cc_pct' => $respuesta_cc_pct,
                'respuesta_ca' => $respuesta_ca,
                'respuesta_ca_pct' => $respuesta_ca_pct,
                'respuesta_lf' => $respuesta_lf,
                'respuesta_lf_pct' => $respuesta_lf_pct,
                'respuesta_pfe' => $respuesta_pfe,
                'respuesta_pfe_pct' => $respuesta_pfe_pct,
                'respuesta_ccca' => $respuesta_ccca,
                'respuesta_ccca_pct' => $respuesta_ccca_pct,
                'respuesta_fecha' => $respuesta_fecha,
                'respuesta_eg' => $respuesta_eg,
                'ecografista' => $respuesta_ecografista,
                'comentariosexamen' => $respuesta_comentariosexamen,
                'respuesta_presentacion' => $respuesta_presentacion,
                'respuesta_dorso_segundo' => $respuesta_dorso_segundo,
                'respuesta_anatomia_segundo' => $respuesta_anatomia,
                'anatomia_fetal_extra' => $respuesta_anatomia_extra,
                'respuesta_hipotesis' => $respuesta_hipotesis,
                'respuesta_crecimiento_ccca' => $respuesta_crecimiento_ccca
            ));

            $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));
            $solicitud = $solicitud->solicitud_email;

            EmailModel::sendRespuestaEcoSegundoTrimestreEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_placenta, $respuesta_liquido_amniotico, $respuesta_dbp, $respuesta_cc, $respuesta_ca, $respuesta_lf, $respuesta_pfe, $respuesta_ccca, $respuesta_comentariosexamen, $respuesta_ecografista, $solicitud);
            $usuario = UserModel::getPublicProfileOfUser(Session::get('user_id'));

            if ($usuario->user_almacenamiento == 0){
                EmailModel::sendRespuestaEcoSegundoTrimestreEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_placenta, $respuesta_liquido_amniotico, $respuesta_dbp, $respuesta_cc, $respuesta_ca, $respuesta_lf, $respuesta_pfe, $respuesta_ccca, $respuesta_comentariosexamen, $respuesta_ecografista, Session::get('user_email'));
                SolicitudesModel::deleteSolicitud($solicitud_id);
            }
        }
        else if ($respuesta_crecimiento == 3){

            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", $respuesta_comentariosexamen, $respuesta_ecografista, "", "", $respuesta_crecimiento, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", $respuesta_utero_ginecologica, $respuesta_endometrio, $respuesta_anexo_izquierdo_ginecologica, $respuesta_anexo_derecho_ginecologica, $respuesta_ovario_izquierdo, $respuesta_ovario_derecho, $respuesta_douglas_ginecologica,"","","","","", $respuesta_anatomia_extra);
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/ginecologia', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_utero_ginecologica' => $respuesta_utero_ginecologica,
                'respuesta_endometrio' => $respuesta_endometrio,
                'respuesta_anexo_izquierdo_ginecologica' => $respuesta_anexo_izquierdo_ginecologica,
                'respuesta_anexo_derecho_ginecologica' => $respuesta_anexo_derecho_ginecologica,
                'respuesta_ovario_izquierdo' => $respuesta_ovario_izquierdo,
                'respuesta_ovario_derecho' => $respuesta_ovario_derecho,
                'respuesta_douglas_ginecologica' => $respuesta_douglas_ginecologica,
                'respuesta_fecha' => $respuesta_fecha,
                'ecografista' => $respuesta_ecografista,
                'comentariosexamen' => $respuesta_comentariosexamen
            ));

            $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));

            $solicitud = $solicitud->solicitud_email;
            EmailModel::sendRespuestaGinecologiaEmail($solicitud_id, $respuesta_fecha, $respuesta_utero_ginecologica, $respuesta_endometrio, $respuesta_anexo_izquierdo_ginecologica, $respuesta_anexo_derecho_ginecologica, $respuesta_ovario_izquierdo, $respuesta_ovario_derecho, $respuesta_douglas_ginecologica, $respuesta_comentariosexamen, $respuesta_ecografista, $solicitud);

            $usuario = UserModel::getPublicProfileOfUser(Session::get('user_id'));
            if ($usuario->user_almacenamiento == 0){
                EmailModel::sendRespuestaGinecologiaEmail($solicitud_id, $respuesta_fecha, $respuesta_utero_ginecologica, $respuesta_endometrio, $respuesta_anexo_izquierdo_ginecologica, $respuesta_anexo_derecho_ginecologica, $respuesta_ovario_izquierdo, $respuesta_ovario_derecho, $respuesta_douglas_ginecologica, $respuesta_comentariosexamen, $respuesta_ecografista, Session::get('user_email'));
                SolicitudesModel::deleteSolicitud($solicitud_id);
            }
        }
        else if($respuesta_crecimiento == 4){

            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, "", "", "", "", "", "", "", "", "", "", "", "", "", $respuesta_comentariosexamen, $respuesta_ecografista,"","","", "", $respuesta_crecimiento,"");
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

    }

    public function edit($solicitud_id)
    {
        $this->View->renderJSON(EvaluacionModel::getEvaluacion($solicitud_id));
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

    public function profesionales_email(){
        $this->View->renderJSON(SolicitudesModel::getAllProfesionales(Session::get('user_email')));
    }

    public function email_manual(){
        $this->View->renderJSON(EmailModel::sendEmailManual());
    }

    public function filtro_resuelto(){
        $this->View->renderJSON(SolicitudesModel::getAllOldSolicitudesFilter(Session::get('user_email'),Request::post('ciudad'),Request::post('lugar'),Request::post('desde'),Request::post('hasta'),Request::post('tipo')));
    }

    public function ciudades(){
        $this->View->renderJSON(SolicitudesModel::getAllCiudades(Session::get('user_email')));
    }

    public function lugar(){
        $this->View->renderJSON(SolicitudesModel::getAllLugar(Session::get('user_email')));
    }

    public function interconsultasEmail($email){
        $this->View->renderJSON(SolicitudesModel::getAllOldSolicitudesWhereSolicitante($email));
    }

    public function news(){
        $this->View->renderJSON(SolicitudesModel::getAllNewSolicitudes(Session::get('user_email')));
    }

    public function process(){
        $this->View->renderJSON(SolicitudesModel::getAllSolicitudes(Session::get('user_email')));
    }

    public function finish(){
        $this->View->renderJSON(SolicitudesModel::getAllOldSolicitudes(Session::get('user_email')));
    }
}
