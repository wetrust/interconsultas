<?php

class ExamenesController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getall()
    {
        $this->View->renderJSON(ExamenesModel::getAllExamenes());
    }
}
