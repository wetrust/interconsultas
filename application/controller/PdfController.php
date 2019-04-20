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
