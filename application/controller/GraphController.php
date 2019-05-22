<?php

class GraphController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        GraphModel::pesoFetal();
    }

    public function index()
    {
        GraphModel::ccca();
    }

}
