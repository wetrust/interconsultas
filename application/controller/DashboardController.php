<?php

class DashboardController extends Controller{
    public function __construct(){
        parent::__construct();
        Auth::checkAuthentication();
    }

    public function index(){
        $this->View->render('dashboard/index');
    }

    public function agendar($solicitud_id){
        $this->View->renderJSON(SolicitudesModel::getSolicitud($solicitud_id));
    }

    public function veragendadas($solicitud_id){
        $this->View->renderJSON(SolicitudesModel::getSolicitudJoin($solicitud_id));
    }

    public function editSave(){
        $solicitud_id = Request::post('solicitud_id');
        $evaluacion_fecha = Request::post('evaluacion_fecha');
        $comentario = Request::post('comentario');

        SolicitudesModel::updateStateSolicitud($solicitud_id, 1);

        EvaluacionModel::createEvaluacion($solicitud_id, $evaluacion_fecha, $comentario);
        EmailModel::sendPrimeraRespuesta($solicitud_id,$evaluacion_fecha, $comentario);
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
        $respuesta_sexo_fetal = Request::post('respuesta_sexo_fetal');

        //para ecografía de primer trimestre
        $respuesta_utero_primertrimestre = Request::post('respuesta_utero_primertrimestre');
        $respuesta_saco_gestacional = Request::post('respuesta_saco_gestacional');
        $respuesta_embrion = Request::post('respuesta_embrion');
        $respuesta_lcn = Request::post('respuesta_lcn');
        $respuesta_anexo_izquierdo_primertrimestre = Request::post('respuesta_anexo_izquierdo_primertrimestre');
        $respuesta_anexo_derecho_primertrimestre = Request::post('respuesta_anexo_derecho_primertrimestre');
        $respuesta_douglas_primertrimestre = Request::post('respuesta_douglas_primertrimestre');
        $respuesta_lcn_eg = Request::post('respuesta_lcn_eg');
        $respuesta_saco_valor = intval(Request::post('respuesta_saco'));
        $respuesta_saco_eg = Request::post('respuesta_saco_eg');

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
        $respuesta_dof = Request::post('respuesta_dof');
        $respuesta_ic = Request::post('respuesta_ic');
        $respuesta_bvm = Request::post('respuesta_bvm');
        $respuesta_lh = Request::post('respuesta_lh');
        $respuesta_lh_pct = Request::post('respuesta_lh_pct');
        $respuesta_cerebelo = Request::post('respuesta_cerebelo');
        $respuesta_cerebelo_pct = Request::post('respuesta_cerebelo_pct');

        //para ginecología
        $respuesta_utero_ginecologica = Request::post('respuesta_utero_ginecologica');
        $respuesta_endometrio = Request::post('respuesta_endometrio');
        $respuesta_anexo_izquierdo_ginecologica = Request::post('respuesta_anexo_izquierdo_ginecologica');
        $respuesta_anexo_derecho_ginecologica = Request::post('respuesta_anexo_derecho_ginecologica');
        $respuesta_ovario_izquierdo = Request::post('respuesta_ovario_izquierdo');
        $respuesta_ovario_derecho = Request::post('respuesta_ovario_derecho');
        $respuesta_douglas_ginecologica = Request::post('respuesta_douglas_ginecologica');

        $respuesta_uterina_derecha = Request::post('respuesta_uterina_derecha');
        $respuesta_uterina_derecha_percentil = Request::post('respuesta_uterina_derecha_percentil');
        $respuesta_uterina_izquierda = Request::post('respuesta_uterina_izquierda');
        $respuesta_uterina_izquierda_percentil = Request::post('respuesta_uterina_izquierda_percentil');
        $respuesta_fcf = Request::post('respuesta_fcf');
        $respuesta_translucencia_nucal = Request::post('respuesta_translucencia_nucal');

        $respuesta_translucidez_nucal = Request::post('respuesta_translucidez_nucal');
        $respuesta_hueso_nasal = Request::post('respuesta_hueso_nasal');
        $respuesta_hueso_nasal_valor = Request::post('respuesta_hueso_nasal_valor');
        $respuesta_ductus_venoso = Request::post('respuesta_ductus_venoso');
        $respuesta_reflujo_tricuspideo = Request::post('respuesta_reflujo_tricuspideo');
        $respuesta_saco_vitelino = Request::post('respuesta_saco_vitelino');
        $respuesta_saco_vitelino_mm = Request::post('respuesta_saco_vitelino_mm');


        //nuevos eco23
        $respuesta_atrio_posterior = Request::post('respuesta_atrio_posterior');
        $respuesta_atrio_posterior_mm = Request::post('respuesta_atrio_posterior_mm');
        $respuesta_cerebelo_text = Request::post('respuesta_cerebelo_text');
        $respuesta_cisterna_m = Request::post('respuesta_cisterna_m');
        $respuesta_cisterna_m_mm = Request::post('respuesta_cisterna_m_mm');
        
        if ($respuesta_crecimiento == 0){
            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_pct, $respuesta_liquido, $respuesta_presentacion, $respuesta_dorso, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista, $respuesta_doppler_materno, $respuesta_anatomia, $respuesta_crecimiento, "", "", "", "", "", "", "", "", $respuesta_placenta,$respuesta_placenta_insercion, "", $respuesta_dbp, $respuesta_cc, $respuesta_ca, $respuesta_lf, "", $respuesta_ccca, "", "", "", "", $respuesta_ccca_pct, "", "", "", "", "", "", "","","", $respuesta_doppler_fetal,$respuesta_cc_pct,$respuesta_ca_pct,$respuesta_lf_pct,$respuesta_anatomia_extra, $respuesta_uterina_derecha, $respuesta_uterina_derecha_percentil, $respuesta_uterina_izquierda, $respuesta_uterina_izquierda_percentil, $respuesta_fcf, "", $respuesta_dof, "", $respuesta_bvm, "", "", "", "",$respuesta_sexo_fetal, 0, "", "", "", "", "", "","","", "", "", "", "", "");
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);

            $data = SolicitudesModel::getSolicitud($solicitud_id);
            $respuesta = RespuestaModel::getRespuesta($solicitud_id);

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'solicitud_resultado' => $respuesta
            ));

            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];
    
            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'respuesta' => $respuesta,
                'grafico_uno' => GraphModel::pesoFetal(array($respuesta->eg => $respuesta->pfe)),
                'grafico_dos' => GraphModel::ca(array($respuesta->eg => $respuesta->ca)),
                'grafico_tres' => GraphModel::uterinas(array($respuesta->eg => $respuesta->uterinas)),
                'grafico_cuatro' => GraphModel::umbilical(array($respuesta->eg => $respuesta->umbilical)),
                'grafico_cinco' => GraphModel::cerebralMedia(array($respuesta->eg => $respuesta->cm)),
                'grafico_seis' => GraphModel::cuocienteCerebroPlacentario(array($respuesta->eg =>$respuesta->cmau)),
            ));

            
            EmailModel::sendRespuestaContrarreferente($data, 'Solicitud eco crecimiento',$respuesta_crecimiento);
        }
        else if ($respuesta_crecimiento == 1){
            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, "", "", "", "", "", "", "", "", "", "", "", "", "", "", $respuesta_comentariosexamen, $respuesta_ecografista, "", "", $respuesta_crecimiento, $respuesta_utero_primertrimestre, $respuesta_saco_gestacional, $respuesta_embrion, $respuesta_lcn, $respuesta_anexo_izquierdo_primertrimestre, $respuesta_anexo_derecho_primertrimestre, $respuesta_douglas_primertrimestre, $respuesta_lcn_eg, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","","","","","",$respuesta_anatomia_extra, "", "", "", "", $respuesta_fcf, "", "", "", "", "", "", "", "","", $respuesta_saco_valor, "", $respuesta_saco_eg, "", "", "", "", $respuesta_saco_vitelino,$respuesta_saco_vitelino_mm, "", "", "", "", "");
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);

            $data = SolicitudesModel::getSolicitud($solicitud_id);

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/primertrimestre', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_utero' => $respuesta_utero_primertrimestre,
                'respuesta_saco_gestacional' => $respuesta_saco_gestacional,
                'respuesta_saco_valor' => $respuesta_saco_valor,
                'respuesta_saco_eg' => $respuesta_saco_eg,
                'respuesta_embrion' => $respuesta_embrion,
                'respuesta_lcn' => $respuesta_lcn,
                'respuesta_fcf' => $respuesta_fcf,
                'respuesta_anexo_izquierdo_primertrimestre' => $respuesta_anexo_izquierdo_primertrimestre,
                'respuesta_anexo_derecho_primertrimestre' => $respuesta_anexo_derecho_primertrimestre,
                'respuesta_douglas_primertrimestre' => $respuesta_douglas_primertrimestre,
                'respuesta_fecha' => $respuesta_fecha,
                'respuesta_eg' => $respuesta_eg,
                'ecografista' => $respuesta_ecografista,
                'comentariosexamen' => $respuesta_comentariosexamen,
                'respuesta_lcn_eg' => $respuesta_lcn_eg,
                'respuesta_saco_vitelino' => $respuesta_saco_vitelino,
                'respuesta_saco_vitelino_mm' => $respuesta_saco_vitelino_mm
            ));
            
            EmailModel::sendRespuestaContrarreferente($data, 'Solicitud eco primer trimestre',$respuesta_crecimiento);
        }
        else if ($respuesta_crecimiento == 2){
            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, "", "", "", "", "", $respuesta_uterinas, $respuesta_uterinas_percentil, "", "", "", "", "", "", "", $respuesta_comentariosexamen, $respuesta_ecografista, "", "", $respuesta_crecimiento, "", "", "", "", "", "", "", "", $respuesta_placenta,$respuesta_placenta_insercion, $respuesta_liquido_amniotico, $respuesta_dbp, $respuesta_cc, $respuesta_ca, $respuesta_lf, $respuesta_pfe, $respuesta_ccca, $respuesta_presentacion, $respuesta_dorso_segundo, $respuesta_anatomia, $respuesta_pfe_pct, $respuesta_ccca_pct, $respuesta_hipotesis, "", "", "", "", "", "", "",$respuesta_crecimiento_ccca, "",$respuesta_cc_pct,$respuesta_ca_pct,$respuesta_lf_pct,$respuesta_anatomia_extra, $respuesta_uterina_derecha, $respuesta_uterina_derecha_percentil, $respuesta_uterina_izquierda, $respuesta_uterina_izquierda_percentil, $respuesta_fcf, "", $respuesta_dof, $respuesta_ic, $respuesta_bvm, $respuesta_lh, $respuesta_lh_pct, $respuesta_cerebelo, $respuesta_cerebelo_pct,$respuesta_sexo_fetal, 0, "", "", "", "", "","","","",$respuesta_atrio_posterior, $respuesta_atrio_posterior_mm, $respuesta_cerebelo_text, $respuesta_cisterna_m, $respuesta_cisterna_m_mm);
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);

            $data = SolicitudesModel::getSolicitud($solicitud_id);
            $respuesta = RespuestaModel::getRespuesta($solicitud_id);

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
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
                'respuesta_dof' => $respuesta_dof,
                'respuesta_ic' => $respuesta_ic,
                'respuesta_bvm' => $respuesta_bvm,
                'respuesta_fcf' => $respuesta_fcf,
                'respuesta_lh' => $respuesta_lh,
                'respuesta_lh_pct' => $respuesta_lh_pct,
                'respuesta_cerebelo' => $respuesta_cerebelo,
                'respuesta_cerebelo_pct' => $respuesta_cerebelo_pct,
                'respuesta_sexo_fetal' => $respuesta_sexo_fetal,
                'respuesta_atrio_posterior' => $respuesta_atrio_posterior,
                'respuesta_atrio_posterior_mm' => $respuesta_atrio_posterior_mm,
                'respuesta_cerebelo_text' => $respuesta_cerebelo_text,
                'respuesta_cisterna_m' => $respuesta_cisterna_m,
                'respuesta_cisterna_m_mm' => $respuesta_cisterna_m_mm
            ));

            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];

            $grafico_seis = GraphModel::ccca(array($respuesta->eg => $respuesta->ccca));

            if (strlen($respuesta->uterinas_percentil) > 1){
                $grafico_seis = GraphModel::uterinas(array($respuesta->eg => $respuesta->uterinas));
            }

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_grafico', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'respuesta' => $respuesta,
                'grafico_uno' => GraphModel::cc(array($respuesta->eg => $respuesta->cc)),
                'grafico_dos' => GraphModel::ca(array($respuesta->eg => $respuesta->ca)),
                'grafico_tres' => GraphModel::lf(array($respuesta->eg => $respuesta->lf)),
                'grafico_cuatro' => GraphModel::lh(array($respuesta->eg => $respuesta->respuesta_lh)),
                'grafico_cinco' => GraphModel::pesoFetal(array($respuesta->eg => $respuesta->pfe_segundo)),
                'grafico_seis' => $grafico_seis
            ));

            EmailModel::sendRespuestaContrarreferente($data, 'Solicitud eco primer trimestre',$respuesta_crecimiento);
        }
        else if ($respuesta_crecimiento == 3){
            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, "", "", "", "", "", "", "", "", "", "", "", "", "", "", $respuesta_comentariosexamen, $respuesta_ecografista, "", "", $respuesta_crecimiento, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", $respuesta_utero_ginecologica, $respuesta_endometrio, $respuesta_anexo_izquierdo_ginecologica, $respuesta_anexo_derecho_ginecologica, $respuesta_ovario_izquierdo, $respuesta_ovario_derecho, $respuesta_douglas_ginecologica,"","","","","", $respuesta_anatomia_extra, "", "", "", "", "", "", "", "", "", "", "", "", "","", 0, "", "","","", "", "","","", "", "", "", "", "");
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);

            $data = SolicitudesModel::getSolicitud($solicitud_id);

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/ginecologia', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
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
                'comentariosexamen' => $respuesta_comentariosexamen,
                'respuesta_eg' => $respuesta_eg
            ));

            EmailModel::sendRespuestaContrarreferente($data, 'Solicitud de examen ecografico',$respuesta_crecimiento);
        }
        else if($respuesta_crecimiento == 4){
            RespuestaModel::createRespuesta($solicitud_id, $respuesta_fecha, $respuesta_eg, "", "", "", "", "", $respuesta_uterinas, $respuesta_uterinas_percentil, "", "", "", "", "", "", "", $respuesta_comentariosexamen, $respuesta_ecografista, "", $respuesta_anatomia, $respuesta_crecimiento, "", "", $respuesta_embrion, $respuesta_lcn, "", "", "", $respuesta_lcn_eg, "", "", "", $respuesta_dbp, $respuesta_cc, $respuesta_ca, $respuesta_lf, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",$respuesta_cc_pct,$respuesta_ca_pct,$respuesta_lf_pct,$respuesta_anatomia_extra, $respuesta_uterina_derecha, $respuesta_uterina_derecha_percentil, $respuesta_uterina_izquierda, $respuesta_uterina_izquierda_percentil, $respuesta_fcf, $respuesta_translucencia_nucal, "", "", "", "", "", "", "","",0, $respuesta_hueso_nasal_valor, "", $respuesta_translucidez_nucal, $respuesta_ductus_venoso, $respuesta_reflujo_tricuspideo, $respuesta_hueso_nasal,"","", "", "", "", "", "");
            SolicitudesModel::updateStateSolicitud($solicitud_id, 2);
            $data = SolicitudesModel::getSolicitud($solicitud_id);

            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/doppler', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_fecha' => $respuesta_fecha,
                'respuesta_eg' => $respuesta_eg,
                'respuesta_anatomia' => $respuesta_anatomia,
                'respuesta_anatomia_extra' => $respuesta_anatomia_extra,
                'respuesta_embrion' => $respuesta_embrion,
                'respuesta_lcn' => $respuesta_lcn,
                'respuesta_lcn_eg' => $respuesta_lcn_eg,
                'respuesta_fcf' => $respuesta_fcf,
                'respuesta_translucidez_nucal' => $respuesta_translucidez_nucal,
                'respuesta_translucencia_nucal' => $respuesta_translucencia_nucal,
                'respuesta_hueso_nasal_valor' => $respuesta_hueso_nasal_valor,
                'respuesta_hueso_nasal' => $respuesta_hueso_nasal,
                'respuesta_ductus_venoso' => $respuesta_ductus_venoso,
                'respuesta_reflujo_tricuspideo' => $respuesta_reflujo_tricuspideo,
                'uterina_derecha' => $respuesta_uterina_derecha,
                'uterina_derecha_percentil' => $respuesta_uterina_derecha_percentil,
                'uterina_izquierda' => $respuesta_uterina_izquierda,
                'uterina_izquierda_percentil' => $respuesta_uterina_izquierda_percentil,
                'uterinas' => $respuesta_uterinas,
                'uterinas_percentil' => $respuesta_uterinas_percentil,
                'ecografista' => $respuesta_ecografista,
                'comentariosexamen' => $respuesta_comentariosexamen,
                'dbp' => $respuesta_dbp,
                'cc' => $respuesta_cc,
                'cc_pct' => $respuesta_cc_pct,
                'ca' => $respuesta_ca,
                'ca_pct' => $respuesta_ca_pct,
                'lf' => $respuesta_lf,
                'lf_pct' => $respuesta_lf_pct,
            ));
            EmailModel::sendRespuestaContrarreferente($data, 'Solicitud de ecografia 11-14',$respuesta_crecimiento);
        }
    }

    public function edit($solicitud_id){
        $this->View->renderJSON(EvaluacionModel::getEvaluacion($solicitud_id));
    }

    public function ver($solicitud_id){
        $this->View->render('dashboard/ver', array(
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
        ));
    }

    public function delete($note_id){
        RespuestaModel::deleteRespuesta($note_id);
        Redirect::to('dashboard');
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

    public function email_manual_autorreferido(){
        $this->View->renderJSON(EmailModel::sendEmailManualAutorreferido());
    }

    public function filtro_resuelto(){
        $this->View->renderJSON(SolicitudesModel::getAllOldSolicitudesFilter(Session::get('user_email'),Request::post('ciudad'),Request::post('lugar'),Request::post('desde'),Request::post('rut'),Request::post('tipo')));
    }

    public function filtro_respuestas(){
        $this->View->renderJSON(SolicitudesModel::getAllOldRespuestasFilter(Session::get('user_email'),Request::post('ciudad'),Request::post('lugar'),Request::post('desde'),Request::post('hasta'),Request::post('tipo')));
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
    public function processdate($fecha){
        $this->View->renderJSON(SolicitudesModel::getAllSolicitudesFecha(Session::get('user_email'), $fecha));
    }

    public function finish(){
        $this->View->renderJSON(SolicitudesModel::getAllOldSolicitudes(Session::get('user_email')));
    }

    public function sinpartos(){
        $this->View->renderJSON(SolicitudesModel::getAllOldSolicitudesSinParto(Session::get('user_email')));
    }

    public function partos(){
        $this->View->renderJSON(PartosModel::getAllPartos(Session::get('user_email')));
    }

    public function baseParto($user_id){
        $this->View->renderJSON(SolicitudesModel::getOldSolicitudes($user_id));
    }

    public function dataPartos($parto_id){
        $this->View->renderJSON(PartosModel::getPartos($parto_id));
    }

    public function savePartos(){
        $solicitud_id = Request::post('solicitud_id');
        $fecha_parto = Request::post('fecha_parto');
        $semanas = Request::post('semanas');
        $dias = Request::post('dias');
        $peso = Request::post('peso');
        $talla = Request::post('talla');
        $imc = Request::post('imc');
        $estado_nutricional = Request::post('estado_nutricional');
        $etnia = Request::post('etnia');
        $paridad = Request::post('paridad');
        $tipo = Request::post('tipo');
        $lugar = Request::post('lugar');
        $pesofetal = Request::post('pesofetal');
        $tallafetal = Request::post('tallafetal');
        $craneofetal = Request::post('craneofetal');
        $apgar_uno = Request::post('apgar_uno');
        $apgar_cinco = Request::post('apgar_cinco');
        $sexo = Request::post('sexo');
        $meconio = Request::post('meconio');
        $ipn = Request::post('ipn');
        $peso_eg = Request::post('peso_eg');
        $peso_eg_estado = Request::post('peso_eg_estado');
        $ipn_eg = Request::post('ipn_eg');
        $ipn_eg_estado = Request::post('ipn_eg_estado');
        $comentarios = Request::post('comentarios');
        $hipoglicemia = Request::post('hipoglicemia');
        $alta = Request::post('alta');
        $protocolo_hipoglicemia = Request::post('protocolo_hipoglicemia');

        $this->View->renderJSON(PartosModel::createPartos($solicitud_id, $fecha_parto, $semanas, $dias, $peso, $talla, $imc, $estado_nutricional, $etnia, $paridad, $tipo, $lugar, $pesofetal, $tallafetal, $craneofetal, $apgar_uno, $apgar_cinco, $sexo, $meconio, $ipn, $peso_eg, $peso_eg_estado, $ipn_eg, $ipn_eg_estado, $comentarios, $hipoglicemia, $alta,$protocolo_hipoglicemia));
    }

    public function actualizarPartos(){
        $parto_id = Request::post('parto_id');
        $solicitud_id = Request::post('solicitud_id');
        $fecha_parto = Request::post('fecha_parto');
        $semanas = Request::post('semanas');
        $dias = Request::post('dias');
        $peso = Request::post('peso');
        $talla = Request::post('talla');
        $imc = Request::post('imc');
        $estado_nutricional = Request::post('estado_nutricional');
        $etnia = Request::post('etnia');
        $paridad = Request::post('paridad');
        $tipo = Request::post('tipo');
        $lugar = Request::post('lugar');
        $pesofetal = Request::post('pesofetal');
        $tallafetal = Request::post('tallafetal');
        $craneofetal = Request::post('craneofetal');
        $apgar_uno = Request::post('apgar_uno');
        $apgar_cinco = Request::post('apgar_cinco');
        $sexo = Request::post('sexo');
        $meconio = Request::post('meconio');
        $ipn = Request::post('ipn');
        $peso_eg = Request::post('peso_eg');
        $peso_eg_estado = Request::post('peso_eg_estado');
        $ipn_eg = Request::post('ipn_eg');
        $ipn_eg_estado = Request::post('ipn_eg_estado');
        $comentarios = Request::post('comentarios');
        $hipoglicemia = Request::post('hipoglicemia');
        $alta = Request::post('alta');
        $protocolo_hipoglicemia = Request::post('protocolo_hipoglicemia');
        
        $this->View->renderJSON(PartosModel::updatePartos($parto_id, $fecha_parto, $semanas, $dias, $peso, $talla, $imc, $estado_nutricional, $etnia, $paridad, $tipo, $lugar, $pesofetal, $tallafetal, $craneofetal, $apgar_uno, $apgar_cinco, $sexo, $meconio, $ipn, $peso_eg, $peso_eg_estado, $ipn_eg, $ipn_eg_estado, $comentarios, $hipoglicemia, $alta, $protocolo_hipoglicemia));
    }

    public function deleteParto($solicitud_id){
        $this->View->renderJSON(PartosModel::deleteParto($solicitud_id));
    }

    public function solicitadas(){
        $this->View->renderJSON(SolicitudesModel::getAllMyNewSolicitudes(Session::get('user_email')));
    }

    public function agendadas(){
        $this->View->renderJSON(SolicitudesModel::getAllAgendadasSolicitudes(Session::get('user_email')));
    }

    public function confirmar(){
        $solicitud_id = Request::post('solicitud_id');
        $this->View->renderJSON(SolicitudesModel::confirmarSolicitud($solicitud_id));
    }

    public function reagendar(){
        $solicitud_id = Request::post('solicitud_id');
        $solicitud_fecha = Request::post('solicitud_fecha');
        $solicitud_comentarios = Request::post('solicitud_comentarios');
        $this->View->renderJSON(EvaluacionModel::updateEvaluacion($solicitud_id,$solicitud_fecha,$solicitud_comentarios));
    }

    public function filtroparto(){
        $ciudad = Request::post('ciudad');
        $lugar = Request::post('lugar');
        $desde = Request::post('desde');
        $hasta = Request::post('hasta');
        $fecha = Request::post('fecha');
        $this->View->renderJSON(InterconsultaModel::getFiltroParto($ciudad,$lugar,$desde,$hasta,$fecha));
    }

    public function directorio(){
        $this->View->renderJSON(DirectorioModel::getAllDirectorios());
    }

    public function directorioSave(){
        $this->View->renderJSON(DirectorioModel::createDirectorio(Request::post('nombre'), Request::post('email'), Request::post('profesion'))); 
    }

    public function directorioDelete($id){
        $this->View->renderJSON(DirectorioModel::deleteDirectorio($id)); 
    }

    public function membrete(){
        $this->View->renderJSON(MembreteModel::createMembrete(Request::post('membrete')));
    }

    public function mymembrete(){
        $this->View->renderJSON(MembreteModel::getMembrete());
    }

    public function lugarSave(){
        $this->View->renderJSON(LugarModel::createLugar(Request::post('lugar_name')));   
    }

    public function ciudadSave(){
        $this->View->renderJSON(CiudadModel::createCiudad(Request::post('ciudad_name')));   
    }

    public function ciudades_configuracion(){
        $this->View->renderJSON(CiudadModel::getAllCiudades());
    }

    public function ciudades_configuracion_delete($id){
        $this->View->renderJSON(CiudadModel::deleteCiudad($id)); 
    }

    public function lugares_configuracion(){
        $this->View->renderJSON(LugarModel::getAllLugares());
    }

    public function lugares_configuracion_delete($id){
        $this->View->renderJSON(LugarModel::deleteLugar($id)); 
    }

    public function guardarsolicitud($solicitud_id){
        $this->View->renderJSON(SolicitudesModel::updateSolicitud($solicitud_id));
    }

    public function diagnostico_configuracion(){
        $this->View->renderJSON(DiagnosticoModel::getAllDiagnosticos());
    }

    public function diagnostico_configuracion_delete($id){
        $this->View->renderJSON(DiagnosticoModel::deleteDiagnostico($id)); 
    }

    public function diagnosticoSave(){
        $this->View->renderJSON(DiagnosticoModel::createDiagnostico(Request::post('diagnostico_name')));
    }

    public function send_fotos(){
        $mail = new PHPMailer;
        
        $mail->CharSet = 'UTF-8';

        if (Config::get('EMAIL_USE_SMTP')) {

            $mail->IsSMTP();
            $mail->SMTPDebug = 0;
            $mail->SMTPAuth = Config::get('EMAIL_SMTP_AUTH');
            if (Config::get('EMAIL_SMTP_ENCRYPTION')) {
                $mail->SMTPSecure = Config::get('EMAIL_SMTP_ENCRYPTION');
            }

            $mail->Host = Config::get('EMAIL_SMTP_HOST');
            $mail->Username = Config::get('EMAIL_SMTP_USERNAME');
            $mail->Password = Config::get('EMAIL_SMTP_PASSWORD');
            $mail->Port = Config::get('EMAIL_SMTP_PORT');

        } else {

            $mail->IsMail();
        }

        $mail->From = Config::get('EMAIL_VERIFICATION_FROM_EMAIL');
        $mail->FromName = Config::get('EMAIL_VERIFICATION_FROM_NAME');
        $mail->AddAddress(Request::post('email'));
        $mail->Subject = "Sistema interconsulta - Envío de imágenes";
        $mail->Body = "Sistema interconsulta adjunda gráficas de exámen ecográfico";
        
        $attach = Config::get('DICOM_DIRECTORY');
        $fotos = Request::post('fotos');
        $fotos = explode(",", $fotos);

        $contador_fotos = 0;

        foreach($fotos as $foto){
            $nombre_foto = 'Ecografía ' . $contador_fotos . '.jpg';
            $mail->AddAttachment("$attach/$foto", $name = $nombre_foto,  $encoding = 'base64', $type = 'image/jpeg');
            $contador_fotos++;
        }
        
        $wasSendingSuccessful = $mail->Send();

        $response = new stdClass();

        $response->result = false;

        if ($wasSendingSuccessful) {
            $response->result =  true;

        } else {
            $response->mensaje = $mail->ErrorInfo;
        }

        $this->View->renderJSON($response);
        
    }

    public function informe_fotos(){
        $fotos = Request::post('fotos');
        $fotos = explode(",", $fotos);
        $attach = Config::get('DICOM_DIRECTORY');
        $contador_fotos = 0;
        $user_images = array();

        $response = new stdClass();

        $response->result = false;

        foreach($fotos as $foto){
            $user_images[$contador_fotos] = "$attach/$foto";
            $contador_fotos++;
        }

        if ($contador_fotos > 0){
            $response->result = true;

            $pdf = new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

            $pdf->SetCreator(PDF_CREATOR);
            $pdf->SetAuthor('WT');
            $pdf->SetTitle('Evaluación ecográfica del crecimiento fetal');
            $pdf->SetSubject('TCPDF Tutorial');
            $pdf->SetKeywords('TCPDF, PDF, example, test, guide');
            $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
        
            // set margins
            $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP+5, PDF_MARGIN_RIGHT);
            $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
            $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
            $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        
            $pdf->AddPage('P', 'LETTER');
        
            // set JPEG quality
            $pdf->setJPEGQuality(90);
            $pdf->SetFont('Helvetica', '', 9);
        
        
            if (count($user_images) != 4){
                $pdf->Ln(6);
            }
            $html = '<h3 style="border-bottom:2px double #000;text-align: center;"><strong>Impresión de Imágenes Gineco-Obstétrica</strong></h3>';
            $pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
            $pdf->Ln(4);
            
            // Image example with resizing
            if (count($user_images) == 1){
                $pdf->Image($user_images[0], '', '', 180, 140, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
            }
            else if (count($user_images) == 2){
                $pdf->Image($user_images[0], '60', '', 100, 88, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
                $pdf->Image($user_images[1], '60', 170, 100, 88, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
            }
            else if (count($user_images) == 4){
                $pdf->Image($user_images[0], '', '', 88, 74, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
                $pdf->Image($user_images[1], '110', '', 88, 74, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
                $pdf->Image($user_images[2], PDF_MARGIN_LEFT, '125', 88, 74, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
                $pdf->Image($user_images[3], '110', '', 88, 74, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
            }
            else if (count($user_images) == 6){
                $pdf->Image($user_images[0], '', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
                $pdf->Image($user_images[1], '110', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
                $pdf->Image($user_images[2], PDF_MARGIN_LEFT, '115', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
                $pdf->Image($user_images[3], '110', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
                $pdf->Image($user_images[4], PDF_MARGIN_LEFT, '186', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
                $pdf->Image($user_images[5], '110', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
            }
         
            $pdf->Output('Informe.pdf', 'I');
        }
    }

    public function informe_envio(){
        $fotos = Request::post('fotos');
        $email = Request::post('email');
        $fotos = explode(",", $fotos);
        $attach = Config::get('DICOM_DIRECTORY');
        $contador_fotos = 0;
        $user_images = array();

        $response = new stdClass();

        $response->result = false;

        foreach($fotos as $foto){
            $user_images[$contador_fotos] = "$attach/$foto";
            $contador_fotos++;
        }

        if ($contador_fotos > 0){
            $internalView = new View;

            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/imagen', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'user_images' => $user_images
            ));

            $titulo_email = "Sistema interconsulta";
            $body = "Sistema interconsulta adjunta gráficas de exámen ecográfico" ;

            $mail = new Mail;
            $mail_sent = $mail->sendMailWithPHPMailerAndAttach($email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), $titulo_email, $body, 3);
            if ($mail_sent) { 
                $response->result = true; 
            }
        }
        
        $this->View->renderJSON($response);
    }
}