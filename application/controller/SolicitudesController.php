<?php

class SolicitudesController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function crear()
    {
        $this->View->renderJSON(SolicitudModel::solicitud(
            Session::get('referente_id'),
            Session::get('contrarreferente_id'),
            Session::get('solicitud_nombre'),
            Session::get('solicitud_rut'),
            Session::get('solicitud_telefono'),
            Session::get('solicitud_fecha_solicitud'),
            Session::get('solicitud_fecha_agendada'),
            Session::get('solicitud_eg_conocida'),
            Session::get('solicitud_eco_previa'),
            Session::get('solicitud_fum'),
            Session::get('solicitud_eg'),
            Session::get('solicitud_diagnostico'),
            Session::get('solicitud_diagnostico_extra'),
            Session::get('solicitud_ciudad'),
            Session::get('solicitud_lugar')
        ));
    }
}
