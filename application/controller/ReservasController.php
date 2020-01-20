<?php

class ReservasController extends Controller
{
    public function index(){
        $this->View->render('dashboard/reservas');
    }
}