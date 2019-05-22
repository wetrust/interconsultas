<?php

class GraphModel
{
    public static function pesoFetal()
    {
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
            'marker_size'       => 3,
            'marker_type'       => array('circle', 'circle'),
            'marker_colour'     => array('blue', 'blue'),
            'label_x'           => "Semanas",
            'label_y'           => "Gramos",
            'axis_min_h'        => '16',
            'graph_title'             => 'Peso fetal estimado',
            'show_grid_v'       => false
          );
          
          $values = array(
           array('16' => 121,'17' => 150,'18' => 185,'19' => 227,'20' => 275,'21' => 331,'22' => 398,'23' => 471,'24' => 556,'25' => 652,'26' => 758,'27' => 876,'28' => 1004,'29' => 1145,'30' => 1294,'31' => 1453,'32' => 1621,'33' => 1794,'34' => 1973,'35' => 2154,'36' => 2335,'37' => 2513,'38' => 2686,'39' => 2851,'40' => 2985),
           array('16' => 171,'17' => 212,'18' => 261,'19' => 319,'20' => 387,'21' => 467,'22' => 559,'23' => 665,'24' => 784,'25' => 918,'26' => 1068,'27' => 1234,'28' => 1416, '29' => 1613,'30' => 1824,'31' => 2049,'32' => 2285,'33' => 2530,'34' => 2781,'35' => 3036,'36' => 3291,'37' => 3543,'38' => 3786,'39' => 4019,'40' => 4234)
        );
          
          $colours = array(
            array('blue', 'yellow'), array('blue', 'white')
          );
          $links = array(
            'Dough' => 'jpegsaver.php', 'Ray' => 'crcdropper.php',
            'Me' => 'svggraph.php'
          );
           
          $graph = new Goat1000\SVGGraph\SVGGraph(300, 200, $settings);
          
          $graph->colours($colours);
          $graph->values($values);
          //$graph->links($links);
          $graph->render('MultiLineGraph');
    }

    public static function ccca()
    {
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
            'marker_size'       => 3,
            'marker_type'       => array('circle', 'circle'),
            'marker_colour'     => array('blue', 'blue'),
            'label_x'           => "Semanas",
            'axis_min_h'        => '15',
            'axis_min_v'        => '0.75',
            'graph_title'       => 'Cc / Ca',
            'show_grid_v'       => false,
            'semantic_classes'  => false,
            'show_data_labels'  => false,
            'show_tooltips'     => false,
        );
          
        $values = array(
            array('15' => 1.1,'16' => 1.09,'17' => 1.08,'18' => 1.07,'19' => 1.06,'20' => 1.06,'21' => 1.05,'22' => 1.04,'23' => 1.03,'24' => 1.02,'25' => 1.01,'26' => 1,'27' => 1,'28' => 0.99,'29' => 0.98,'30' => 0.97,'31' => 0.96,'32' => 0.95,'33' => 0.95,'34' => 0.94,'35' => 0.93,'36' => 0.92,'37' => 0.91,'38' => 0.9,'39' => 0.89,'40' => 0.89),
            array('15' => 1.29,'16' => 1.28,'17' => 1.27,'18' => 1.26,'19' => 1.25,'20' => 1.24,'21' => 1.24,'22' => 1.23,'23' => 1.22,'24' => 1.21,'25' => 1.2,'26' => 1.19,'27' => 1.18,'28' => 1.18,'29' => 1.17,'30' => 1.17,'31' => 1.16,'32' => 1.15,'33' => 1.14,'34' => 1.13,'35' => 1.12,'36' => 1.11,'37' => 1.1,'38' => 1.09,'39' => 1.08,'40' => 1.08)
        );
          
        $colours = array(
            array('blue', 'yellow'), array('blue', 'white')
        );
        $links = array(
            'Dough' => 'jpegsaver.php', 'Ray' => 'crcdropper.php',
            'Me' => 'svggraph.php'
        );
           
          $graph = new Goat1000\SVGGraph\SVGGraph(300, 200, $settings);
          
          $graph->colours($colours);
          $graph->values($values);
          //$graph->links($links);
          $graph->render('MultiLineGraph');
    }
}
