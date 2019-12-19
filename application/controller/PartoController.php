<?php

class PartoController extends Controller
{
    public function index(){
        $this->View->renderWithoutHeaderAndFooter('parto/index');
    }
}