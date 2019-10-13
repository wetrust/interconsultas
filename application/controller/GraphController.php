<?php

class GraphController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function informe_dopplercrecimiento($solicitud_id)
    {
        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
        $respuesta->eg = explode (".", $respuesta->eg);
        $respuesta->eg = $respuesta->eg[0];

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'respuesta' => $respuesta,
            'grafico_uno' => GraphModel::pesoFetal(array($respuesta->eg => $respuesta->pfe)),
            'grafico_dos' => GraphModel::ca(array($respuesta->eg => $respuesta->ca)),
            'grafico_tres' => GraphModel::uterinas(array($respuesta->eg => $respuesta->uterinas)),
            'grafico_cuatro' => GraphModel::umbilical(array($respuesta->eg => $respuesta->umbilical)),
            'grafico_cinco' => GraphModel::cerebralMedia(array($respuesta->eg => $respuesta->cm)),
            'grafico_seis' => GraphModel::cuocienteCerebroPlacentario(array($respuesta->eg =>$respuesta->cmau)),
        ));
    }

    public function informe_segundotrimestre($solicitud_id)
    {
        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
        $respuesta->eg = explode (".", $respuesta->eg);
        $respuesta->eg = $respuesta->eg[0];

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'respuesta' => $respuesta,
            'grafico_uno' => GraphModel::cc(array($respuesta->eg => $respuesta->cc)),
            'grafico_dos' => GraphModel::ca(array($respuesta->eg => $respuesta->ca)),
            'grafico_tres' => GraphModel::lf(array($respuesta->eg => $respuesta->lf)),
            'grafico_cuatro' => GraphModel::lh(array($respuesta->eg => $respuesta->respuesta_lh)),
            'grafico_cinco' => GraphModel::pesoFetal(array($respuesta->eg => $respuesta->pfe_segundo)),
            'grafico_seis' => GraphModel::ccca(array($respuesta->eg => $respuesta->ccca)),
        ));
    }

    public function informe_parto($solicitud_id)
    {
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
