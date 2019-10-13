<?php

class GraphController extends Controller
{
    public function __construct(){
        parent::__construct();
    }

    public function informe_dopplercrecimiento($solicitud_id){
        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
        $respuesta->eg = explode (".", $respuesta->eg);
        $respuesta->eg = $respuesta->eg[0];

        $grafico_uno = ($respuesta->pfe > 0) ? array($respuesta->eg => $respuesta->pfe) : array();
        $grafico_dos = ($respuesta->ca > 0) ? array($respuesta->eg => $respuesta->ca) : array();
        $grafico_tres = ($respuesta->uterinas > 0) ? array($respuesta->eg => $respuesta->uterinas) : array();
        $grafico_cuatro = ($respuesta->umbilical > 0) ? array($respuesta->eg => $respuesta->umbilical) : array();
        $grafico_cinco = ($respuesta->cm > 0) ? array($respuesta->eg => $respuesta->cm) : array();
        $grafico_seis = ($respuesta->cmau > 0) ? array($respuesta->eg => $respuesta->cmau) : array();

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'respuesta' => $respuesta,
            'grafico_uno' => GraphModel::pesoFetal($grafico_uno),
            'grafico_dos' => GraphModel::ca($grafico_dos),
            'grafico_tres' => GraphModel::uterinas($grafico_tres),
            'grafico_cuatro' => GraphModel::umbilical($grafico_cuatro),
            'grafico_cinco' => GraphModel::cerebralMedia($grafico_cinco),
            'grafico_seis' => GraphModel::cuocienteCerebroPlacentario($grafico_seis),
        ));
    }

    public function informe_segundotrimestre($solicitud_id){
        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
        $respuesta->eg = explode (".", $respuesta->eg);
        $respuesta->eg = $respuesta->eg[0];

        $grafico_uno = ($respuesta->cc > 0) ? array($respuesta->eg => $respuesta->cc) : array();
        $grafico_dos = ($respuesta->ca > 0) ? array($respuesta->eg => $respuesta->ca) : array();
        $grafico_tres = ($respuesta->lf > 0) ? array($respuesta->eg => $respuesta->lf) : array();
        $grafico_cuatro = ($respuesta->respuesta_lh > 0) ? array($respuesta->eg => $respuesta->respuesta_lh) : array();
        $grafico_cinco = ($respuesta->pfe_segundo > 0) ? array($respuesta->eg => $respuesta->pfe_segundo) : array();
        $grafico_seis = ($respuesta->ccca > 0) ? array($respuesta->eg => $respuesta->ccca) : array();

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'respuesta' => $respuesta,
            'grafico_uno' => GraphModel::cc($grafico_uno),
            'grafico_dos' => GraphModel::ca($grafico_dos),
            'grafico_tres' => GraphModel::lf($grafico_tres),
            'grafico_cuatro' => GraphModel::lh($grafico_cuatro),
            'grafico_cinco' => GraphModel::pesoFetal($grafico_cinco),
            'grafico_seis' => GraphModel::ccca($grafico_seis),
        ));
    }

    public function informe_parto($solicitud_id){
        $respuesta = PartosModel::getPartos($solicitud_id);
        $paciente = SolicitudesModel::getOldSolicitudes($solicitud_id);

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/parto_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'paciente' => $paciente,
            'parto' => $respuesta,
            'grafico_uno' => GraphModel::pesoNacionalRN($respuesta->semanas, $respuesta->pesofetal),
            'grafico_dos' => GraphModel::ipnNacionalRN($respuesta->semanas, $respuesta->ipn),
            'grafico_tres' => GraphModel::tallaNacionalRN($respuesta->semanas, ($respuesta->tallafetal / 10)),
            'grafico_cuatro' => GraphModel::craneoNacionalRN($respuesta->semanas, $respuesta->craneofetal) 
        ));
    }
}
