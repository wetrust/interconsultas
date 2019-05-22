<?php

class GraphController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        GraphModel::uterinas('22', 1);
    }

}
