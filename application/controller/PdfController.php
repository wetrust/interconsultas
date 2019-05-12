<?php

//Pequeño sistema para generar informes de primer, segundo / tercer trimestre y doppler
//depente de PdfModel(crea los pdf) y de procesadorModel(Evalua las reglas de negocio de los datos enviados)

class PdfController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function informe_crecimiento()
    {
        header("Access-Control-Allow-Origin: *");
        $this->View->renderWithoutHeaderAndFooter('pdf/segundotrimestre/respaldo', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'data' => ProcesadorModel::informeCrecimientoFetal()
        ));
    }

    public function informe_primer_trimestre()
    {
        header("Access-Control-Allow-Origin: *");
        $this->View->renderWithoutHeaderAndFooter('pdf/segundotrimestre/respaldo', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'data' => ProcesadorModel::informeCrecimientoFetal()
        ));
    }

    public function informe_prueba($solicitud_id)
    {
        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
        ));
    }

    public function informe_primertrimestre($solicitud_id){

        $respuesta = RespuestaModel::getRespuesta($solicitud_id);

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/primertrimestre_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'respuesta_utero' => $respuesta->utero_primertrimestre,
            'respuesta_saco_gestacional' => $respuesta->saco_gestacional,
            'respuesta_embrion' => $respuesta->embrion,
            'respuesta_lcn' => $respuesta->lcn,
            'respuesta_anexo_izquierdo_primertrimestre' => $respuesta->anexo_izquierdo_primertrimestre,
            'respuesta_anexo_derecho_primertrimestre' => $respuesta->anexo_derecho_primertrimestre,
            'respuesta_douglas_primertrimestre' => $respuesta->douglas_primertrimestre,
            'respuesta_fecha' => $respuesta->fecha,
            'respuesta_eg' => $respuesta->eg,
            'ecografista' => $respuesta->ecografista,
            'comentariosexamen' => $respuesta->comentariosexamen,
            'respuesta_lcn_eg' => $respuesta->lcn_eg
        ));
    }

    public function informe_segundotrimestre($solicitud_id){

        $respuesta = RespuestaModel::getRespuesta($solicitud_id);

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'respuesta_placenta' => $respuesta->placenta,
            'respuesta_placenta_insercion' => $respuesta->placenta_insercion,
            'respuesta_liquido_amniotico' => $respuesta->liquido_amniotico,
            'respuesta_dbp' => $respuesta->dbp,
            'respuesta_cc' => $respuesta->cc,
            'respuesta_ca' => $respuesta->ca,
            'respuesta_lf' => $respuesta->lf,
            'respuesta_pfe_segundo' => $respuesta->pfe_segundo,
            'respuesta_pfe_pct_segundo' => $respuesta->pfe_pct_segundo,
            'respuesta_ccca' => $respuesta->ccca,
            'respuesta_ccca_pct' => $respuesta->ccca_pct,
            'respuesta_fecha' => $respuesta->fecha,
            'respuesta_eg' => $respuesta->eg,
            'ecografista' => $respuesta->ecografista,
            'comentariosexamen' => $respuesta->comentariosexamen,
            'respuesta_presentacion_segundo' => $respuesta->presentacion_segundo,
            'respuesta_dorso_segundo' => $respuesta->dorso_segundo,
            'respuesta_anatomia_segundo' => $respuesta->anatomia_segundo,
            'respuesta_hipotesis_segundo' => $respuesta->hipotesis_segundo
        ));
    }

    public function informe_ginecologico($solicitud_id){

        $respuesta = RespuestaModel::getRespuesta($solicitud_id);

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/ginecologia_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
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
            'comentariosexamen' => $respuesta->comentariosexamen
        ));
    }

    public function informe_dopplercrecimiento($solicitud_id){
        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
            'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
        ));
    }
}
