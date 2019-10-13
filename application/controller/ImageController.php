<?php

class ImageController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        Auth::checkAuthentication();
    }

    public function index($solicitud_rut, $fecha)
    {
        $this->View->renderWithoutHeaderAndFooter(DicomModel::getAllImages($solicitud_rut, $fecha));
    }
}
