<?php
//Pequeño sistema para generar informes de primer, segundo / tercer trimestre y doppler
//depente de PdfModel(crea los pdf) y de procesadorModel(Evalua las reglas de negocio de los datos enviados)

class PdfController extends Controller{

    public function __construct(){
        parent::__construct();
    }

    public function informe_crecimiento(){
        header("Access-Control-Allow-Origin: https://administrador.crecimientofetal.cl");
        header("Content-Type: application/pdf");
        $this->View->renderWithoutHeaderAndFooter('pdf/segundotrimestre/respaldo', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'data' => ProcesadorModel::informeCrecimientoFetal()
        ));
    }

    public function informe_primer_trimestre(){
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/pdf");
        $this->View->renderWithoutHeaderAndFooter('pdf/segundotrimestre/respaldo', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'data' => ProcesadorModel::informeCrecimientoFetal()
        ));
    }

    public function informe_prueba($solicitud_id){
        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
        ));
    }

    public function informe_primertrimestre($solicitud_id){
        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/pdf");
        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/primertrimestre_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'respuesta_utero' => $respuesta->utero_primertrimestre,
            'respuesta_saco_gestacional' => $respuesta->saco_gestacional,
            'respuesta_embrion' => $respuesta->embrion,
            'respuesta_saco_valor' => $respuesta->saco_gestacional_valor,
            'respuesta_saco_eg' => $respuesta->respuesta_saco_eg,
            'respuesta_lcn' => $respuesta->lcn,
            'respuesta_fcf' => $respuesta->respuesta_fcf,
            'respuesta_anexo_izquierdo_primertrimestre' => $respuesta->anexo_izquierdo_primertrimestre,
            'respuesta_anexo_derecho_primertrimestre' => $respuesta->anexo_derecho_primertrimestre,
            'respuesta_douglas_primertrimestre' => $respuesta->douglas_primertrimestre,
            'respuesta_fecha' => $respuesta->fecha,
            'respuesta_eg' => $respuesta->eg,
            'ecografista' => $respuesta->ecografista,
            'comentariosexamen' => $respuesta->comentariosexamen,
            'respuesta_lcn_eg' => $respuesta->lcn_eg,
            'respuesta_saco_vitelino' => $respuesta->respuesta_saco_vitelino,
            'respuesta_saco_vitelino_mm' => $respuesta->respuesta_saco_vitelino_mm
        ));
    }

    public function informe_segundotrimestre($solicitud_id){

        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/pdf");
        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'respuesta_placenta' => $respuesta->placenta,
            'respuesta_placenta_insercion' => $respuesta->placenta_insercion,
            'respuesta_liquido_amniotico' => $respuesta->liquido_amniotico,
            'respuesta_dbp' => $respuesta->dbp,
            'respuesta_cc' => $respuesta->cc,
            'respuesta_cc_pct' => $respuesta->cc_pct,
            'respuesta_ca' => $respuesta->ca,
            'respuesta_ca_pct' => $respuesta->ca_pct,
            'respuesta_lf' => $respuesta->lf,
            'respuesta_lf_pct' => $respuesta->lf_pct,
            'respuesta_pfe' => $respuesta->pfe_segundo,
            'respuesta_pfe_pct' => $respuesta->pfe_pct_segundo,
            'respuesta_ccca' => $respuesta->ccca,
            'respuesta_ccca_pct' => $respuesta->ccca_pct,
            'respuesta_fecha' => $respuesta->fecha,
            'respuesta_eg' => $respuesta->eg,
            'respuesta_fcf' => $respuesta->respuesta_fcf,
            'ecografista' => $respuesta->ecografista,
            'comentariosexamen' => $respuesta->comentariosexamen,
            'respuesta_presentacion' => $respuesta->presentacion_segundo,
            'respuesta_dorso_segundo' => $respuesta->dorso_segundo,
            'respuesta_anatomia_segundo' => $respuesta->anatomia_segundo,
            'anatomia_fetal_extra' => $respuesta->anatomia_extra,
            'respuesta_hipotesis' => $respuesta->hipotesis_segundo,
            'respuesta_dof' => $respuesta->respuesta_dof,
            'respuesta_ic' => $respuesta->respuesta_ic,
            'respuesta_bvm' => $respuesta->respuesta_bvm,
            'respuesta_lh' => $respuesta->respuesta_lh,
            'respuesta_lh_pct' => $respuesta->respuesta_lh_pct,
            'respuesta_cerebelo' => $respuesta->respuesta_cerebelo,
            'respuesta_cerebelo_pct' => $respuesta->respuesta_cerebelo_pct,
            'respuesta_sexo_fetal' => $respuesta->sexo_fetal,
            'uterinas' => $respuesta->uterinas,
            'uterinas_percentil' => $respuesta->uterinas_percentil,
            'respuesta_atrio_posterior' => $respuesta->respuesta_atrio_posterior,
            'respuesta_atrio_posterior_mm' => $respuesta->respuesta_atrio_posterior_mm,
            'respuesta_cerebelo_text' => $respuesta->respuesta_cerebelo_text,
            'respuesta_cisterna_m' => $respuesta->respuesta_cisterna_m,
            'respuesta_cisterna_m_mm' => $respuesta->respuesta_cisterna_m_mm
        ));
    }

    public function informe_ginecologico($solicitud_id){

        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/pdf");
        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/ginecologia_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'respuesta_utero_ginecologica' => $respuesta->utero_ginecologica,
            'respuesta_endometrio' => $respuesta->endometrio,
            'respuesta_anexo_izquierdo_ginecologica' => $respuesta->anexo_izquierdo_ginecologica,
            'respuesta_anexo_derecho_ginecologica' => $respuesta->anexo_derecho_ginecologica,
            'respuesta_ovario_izquierdo' => $respuesta->ovario_izquierdo,
            'respuesta_ovario_derecho' => $respuesta->ovario_derecho,
            'respuesta_douglas_ginecologica' => $respuesta->douglas_ginecologica,
            'respuesta_fecha' => $respuesta->fecha,
            'ecografista' => $respuesta->ecografista,
            'comentariosexamen' => $respuesta->comentariosexamen,
            'respuesta_eg' => $respuesta->eg
        ));
    }

    public function informe_dopplercrecimiento($solicitud_id){
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/pdf");
        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
        ));
    }

    public function informe_doppler($solicitud_id){
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/pdf");
        $respuesta = RespuestaModel::getRespuesta($solicitud_id);

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/doppler_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'respuesta_fecha' => $respuesta->fecha,
            'respuesta_eg' => $respuesta->eg,
            'respuesta_anatomia' => $respuesta->anatomia_fetal,
            'respuesta_anatomia_extra' => $respuesta->anatomia_extra,
            'respuesta_embrion' => $respuesta->embrion,
            'respuesta_lcn' => $respuesta->lcn,
            'respuesta_lcn_eg' => $respuesta->lcn_eg,
            'respuesta_fcf' => $respuesta->respuesta_fcf,
            'respuesta_translucidez_nucal' => $respuesta->respuesta_translucidez_nucal,
            'respuesta_translucencia_nucal' => $respuesta->translucencia_nucal,
            'respuesta_hueso_nasal_valor' => $respuesta->hueso_nasal,
            'respuesta_hueso_nasal' => $respuesta->respuesta_hueso_nasal,
            'respuesta_ductus_venoso' => $respuesta->respuesta_ductus_venoso,
            'respuesta_reflujo_tricuspideo' => $respuesta->respuesta_reflujo_tricuspideo,
            'uterina_derecha' => $respuesta->uterina_derecha,
            'uterina_derecha_percentil' => $respuesta->uterina_derecha_percentil,
            'uterina_izquierda' => $respuesta->uterina_izquierda,
            'uterina_izquierda_percentil' => $respuesta->uterina_izquierda_percentil,
            'uterinas' => $respuesta->uterinas,
            'uterinas_percentil' => $respuesta->uterinas_percentil,
            'ecografista' => $respuesta->ecografista,
            'comentariosexamen' => $respuesta->comentariosexamen,
            'dbp' => $respuesta->dbp,
            'cc' => $respuesta->cc,
            'cc_pct' => $respuesta->cc_pct,
            'ca' => $respuesta->ca,
            'ca_pct' => $respuesta->ca_pct,
            'lf' => $respuesta->lf,
            'lf_pct' => $respuesta->lf_pct,
        ));
    }
}
