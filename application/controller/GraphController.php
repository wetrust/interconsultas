<?php

class GraphController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index($solicitud_id)
    {
        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
        $respuesta->eg = explode (".", $respuesta->eg);
        $respuesta->eg = $respuesta->eg[0];

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id,Session::get('user_email')),
            'grafico_uno' => GraphModel::pesoFetal($respuesta->eg, $respuesta->pfe),
            'grafico_dos' => GraphModel::ccca($respuesta->eg, $respuesta->ccca),
            'grafico_tres' => GraphModel::uterinas($respuesta->eg, $respuesta->uterinas),
            'grafico_cuatro' => GraphModel::umbilical($respuesta->eg, $respuesta->umbilical),
            'grafico_cinco' => GraphModel::cerebralMedia($respuesta->eg, $respuesta->cm),
            'grafico_seis' => GraphModel::cuocienteCerebroPlacentario($respuesta->eg, $respuesta->cmau),
        ));
    }

}
