<?php

class ConsentimientoController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->View->render('consentimiento/index');
    }
}
