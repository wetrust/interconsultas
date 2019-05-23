<?php

class GraphModel
{

    public static function pesoFetal($EG, $PESO)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Peso Fetal';
        $settings["axis_min_h"] = '16';
        $settings["axis_min_v"] = '100';
        $settings["axis_max_v"] = '4900';
        $settings["grid_division_v"] = '460';
        $values = DataModel::pesoFetal();

        $punto = array($EG => $PESO);
        array_push($values,$punto);

        $graph = new Goat1000\SVGGraph\SVGGraph(180, 180, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
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

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 150, $settings);
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

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 150, $settings);
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

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 150, $settings);
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

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 150, $settings);
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

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 150, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function settings(){
        $settings = array(
            'auto_fit'          => true,
            'back_colour'       => '#FFF',
            'stroke_colour'     => '#000',
            'back_stroke_width' => 0,
            'back_stroke_colour'=> '#eee',
            'axis_colour'       => '#333',
            'axis_overlap'      => 2,
            'axis_font'         => 'Helvetica',
            'axis_font_size'    => 4,
            'grid_colour'       => '#666',
            'label_colour'      => '#000',
            'pad_right'         => 0,
            'pad_left'          => 0,
            'link_base'         => '/',
            'link_target'       => '_top',
            'fill_under'        => array(false, false),
            'marker_size'       => array(1, 1, 5),
            'marker_type'       => array('circle', 'circle', 'cross'),
            'label_x'           => "Semanas",
            'label_font_size'   => 6,
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
