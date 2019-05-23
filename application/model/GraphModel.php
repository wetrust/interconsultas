<?php

class GraphModel
{
    private static $factory;
    private $graph;

    public static function getFactory()
    {
        if (!self::$factory) {
            self::$factory = new GraphModel();
        }
        return self::$factory;
    }

    public static function getInstance(){
        if (!self::$graph) {
            self::$graph = new Goat1000\SVGGraph\SVGGraph(300, 200, self::settings());
        }
        return self::$graph;
    }

    public static function pesoFetal($EG, $PESO)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Peso Fetal';
        $settings["axis_min_h"] = '16';
        $settings["axis_min_v"] = '100';
        $values = DataModel::pesoFetal();

        $punto = array($EG => $PESO);
        array_push($values,$punto);

        $graph = self::getFactory()->getInstance();
        $graph->colours(self::colours());
        $graph->values($values);
        //$graph->settings($settings);
        return $graph->fetch('MultiLineGraph');
    }

    public static function ccca($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Cc / Ca';
        $settings["axis_min_h"] = '15';
        $settings["axis_min_v"] = '0.75';
        $values = DataModel::ccca();

        $punto = array($EG => $valor);
        array_push($values,$punto);

        $graph = new Goat1000\SVGGraph\SVGGraph(500, 500, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function uterinas($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'IP Uterina Promedio';
        $settings["axis_min_h"] = '10';
        $settings["axis_min_v"] = '0.1';
        $values = DataModel::uterinas();

        $punto = array($EG => $valor);
        array_push($values,$punto);

        $graph = new Goat1000\SVGGraph\SVGGraph(500, 500, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function umbilical($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'IP Arteria Umbilical';
        $settings["axis_min_h"] = '20';
        $settings["axis_min_v"] = '0.2';
        $values = DataModel::umbilical();

        $punto = array($EG => $valor);
        array_push($values,$punto);

        $graph = new Goat1000\SVGGraph\SVGGraph(500, 500, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function cerebralMedia($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'IP Arteria Cerebral Media';
        $settings["axis_min_h"] = '20';
        $settings["axis_min_v"] = '0.35';
        $values = DataModel::cerebralMedia();

        $punto = array($EG => $valor);
        array_push($values,$punto);

        $graph = new Goat1000\SVGGraph\SVGGraph(500, 500, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function cuocienteCerebroPlacentario($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'IP de CCP';
        $settings["axis_min_h"] = '20';
        $settings["axis_min_v"] = '0.35';
        $values = DataModel::cuocienteCerebroPlacentario();

        $punto = array($EG => $valor);
        array_push($values,$punto);

        $graph = new Goat1000\SVGGraph\SVGGraph(500, 500, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function settings(){
        $settings = array(
            'back_colour'       => '#FFF',
            'stroke_colour'     => '#000',
            'back_stroke_width' => 0,
            'back_stroke_colour'=> '#eee',
            'axis_colour'       => '#333',
            'axis_overlap'      => 2,
            'axis_font'         => 'Georgia',
            'axis_font_size'    => 10,
            'grid_colour'       => '#666',
            'label_colour'      => '#000',
            'pad_right'         => 20,
            'pad_left'          => 20,
            'link_base'         => '/',
            'link_target'       => '_top',
            'fill_under'        => array(false, false),
            'marker_size'       => array(1, 1, 5),
            'marker_type'       => array('circle', 'circle', 'cross'),
            'label_x'           => "Semanas",
            'axis_min_h'        => '15',
            'axis_min_v'        => '0.75',
            'graph_title'       => 'Cc / Ca',
            'show_grid_v'       => false,
            'semantic_classes'  => false,
            'show_data_labels'  => false,
            'show_tooltips'     => false,
        );

        return $settings;
    }

    public static function colours(){
        $colours = array('blue', 'blue', 'red');
        return $colours;
    }
}
