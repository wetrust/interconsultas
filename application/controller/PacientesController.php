<?php

class PacientesController extends Controller
{
    public function index(){
        $this->View->render('dashboard/pacientes');
    }
}