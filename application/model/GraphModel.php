<?php

class GraphModel
{

    public static function pesoFetal($EG, $PESO)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Peso Fetal Estimado';
        $settings["axis_min_h"] = '16';
        $settings["axis_min_v"] = '100';
        $settings["axis_max_v"] = '4900';
        $settings["grid_division_v"] = '1630';
        $settings["grid_division_h"] = '6';
        $values = DataModel::pesoFetal();

        if (is_numeric($PESO)){
            $punto = array($EG => $PESO);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function ccca($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Índice Cráneo / Abdomen';
        $settings["axis_min_h"] = '15';
        $settings["axis_min_v"] = '0.7';
        $settings["axis_max_v"] = '1.35';
        $settings["grid_division_v"] = '0.3';
        $settings["grid_division_h"] = '5';

        $values = DataModel::ccca();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function uterinas($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'IP Promedio de Uterina';
        $settings["axis_min_h"] = '10';
        $settings["axis_min_v"] = '0.1';
        $settings["axis_max_v"] = '3.6';
        $settings["grid_division_v"] = '1.2';
        $settings["grid_division_h"] = '7.5';
        $values = DataModel::uterinas();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
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
        $settings["axis_max_v"] = '1.8';
        $settings["grid_division_v"] = '0.6';
        $settings["grid_division_h"] = '5';
        $values = DataModel::umbilical();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
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
        $settings["axis_max_v"] = '2.75';
        $settings["grid_division_v"] = '0.9';
        $settings["grid_division_h"] = '5';
        $values = DataModel::cerebralMedia();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function cuocienteCerebroPlacentario($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Índice Cerebro / Placentario';
        $settings["axis_min_h"] = '20';
        $settings["axis_min_v"] = '0.35';
        $settings["axis_max_v"] = '3.35';
        $settings["grid_division_v"] = '1.1';
        $settings["grid_division_h"] = '5';
        $values = DataModel::cuocienteCerebroPlacentario();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function cc($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Cráneo';
        $settings["axis_min_h"] = '12';
        $settings["axis_min_v"] = '30';
        $settings["axis_max_v"] = '480';
        $settings["grid_division_v"] = '160';
        $settings["grid_division_h"] = '7';

        $values = DataModel::cc();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }
    public static function ca($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Abdómen';
        $settings["axis_min_h"] = '12';
        $settings["axis_min_v"] = '20';
        $settings["axis_max_v"] = '480';
        $settings["grid_division_v"] = '160';
        $settings["grid_division_h"] = '7';
        $values = DataModel::ca();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }
    public static function lf($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Femur';
        $settings["axis_min_h"] = '12';
        $settings["axis_min_v"] = '5';
        $settings["axis_max_v"] = '105';
        $settings["grid_division_v"] = '35';
        $settings["grid_division_h"] = '7';
        $values = DataModel::lf();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }
    public static function lh($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Húmero';
        $settings["axis_min_h"] = '12';
        $settings["axis_min_v"] = '5';
        $settings["axis_max_v"] = '105';
        $settings["grid_division_v"] = '35';
        $settings["grid_division_h"] = '7';
        $values = DataModel::lh();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function pesoNacionalRN($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Peso Fetal';
        $settings["axis_min_h"] = '24';
        $settings["axis_max_h"] = '42';
        $settings["axis_min_v"] = '600';
        $settings["axis_max_v"] = '4400';
        $settings["grid_division_v"] = '200';
        $settings["grid_division_h"] = '6';
        $values = DataModel::PesoNacionalRN();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function tallaNacionalRN($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Talla fetal';
        $settings["axis_min_h"] = '26';
        $settings["axis_max_h"] = '42';
        $settings["axis_min_v"] = '30';
        $settings["axis_max_v"] = '52';
        $settings["grid_division_v"] = '5';
        $settings["grid_division_h"] = '7';
        $values = DataModel::TallaNacionalRN();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function craneoNacionalRN($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'Craneo fetal';
        $settings["axis_min_h"] = '24';
        $settings["axis_min_v"] = '200';
        $settings["axis_max_v"] = '340';
        $settings["grid_division_v"] = '40';
        $settings["grid_division_h"] = '7';
        $values = DataModel::CraneoNacionalRN();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    public static function ipnNacionalRN($EG, $valor)
    {
        $settings = self::settings();
        $settings["graph_title"] = 'IPN';
        $settings["axis_min_h"] = '24';
        $settings["axis_max_h"] = '42';
        $settings["axis_min_v"] = '0.7';
        $settings["axis_max_v"] = '3.5';
        $settings["grid_division_v"] = '0.3';
        $settings["grid_division_h"] = '7';
        $values = DataModel::IPNNacionalRN();

        if (is_numeric($valor)){
            $punto = array($EG => $valor);
            array_push($values,$punto);
        }

        $graph = new Goat1000\SVGGraph\SVGGraph(200, 160, $settings);
        $graph->colours(self::colours());
        $graph->values($values);
        return $graph->fetch('MultiLineGraph');
    }

    


    public static function settings(){
        $settings = array(
            'auto_fit'          => true,
            'back_colour'       => '#FFF',
            'stroke_colour'     => '#F00',
            'back_stroke_width' => 0,
            'back_stroke_colour'=> '#f6f6f6',
            'axis_colour'       => '#333',
            'axis_overlap'      => 2,
            'axis_font'         => 'Helvetica',
            'axis_font_size'    => 4,
            'grid_colour'       => '#f6f6f6',
            'label_colour'      => '#000',
            'pad_right'         => 0,
            'pad_left'          => 0,
            'link_base'         => '/',
            'link_target'       => '_top',
            'fill_under'        => array(false, false),
            'marker_size'       => array(0, 0, 2),
            'marker_type'       => array('circle', 'circle', 'cross'),
            'label_x'           => "Semanas",
            'label_font_size'   => 6,
            'axis_min_h'        => '15',
            'axis_min_v'        => '0.75',
            'graph_title'       => 'Cc / Ca',
            'graph_title_font_size' => 7,
            'graph_title_space' => 3,
            'show_grid_h'       => true,
            'show_grid_v'       => true,
            'semantic_classes'  => false,
            'show_data_labels'  => false,
            'show_tooltips'     => false,
            'line_stroke_width' => 1,
            'axis_stroke_width' => 1
        );

        return $settings;
    }

    public static function colours(){
        $colours = array('blue', 'blue', 'red');
        return $colours;
    }
}
