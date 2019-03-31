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
        $this->View->renderWithoutHeaderAndFooter('pdf/segundotrimestre/crecimiento', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'data' => ProcesadorModel::informeCrecimientoFetal()
        ));
    }
}
