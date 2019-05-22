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
            'axis_min_h'        => '16'
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

    public static function getNote($note_id)
    {
        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "SELECT user_id, note_id, note_text FROM notes WHERE user_id = :user_id AND note_id = :note_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':user_id' => Session::get('user_id'), ':note_id' => $note_id));

        return $query->fetch();
    }

    public static function createNote($note_text)
    {
        if (!$note_text || strlen($note_text) == 0) {
            Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "INSERT INTO notes (note_text, user_id) VALUES (:note_text, :user_id)";
        $query = $database->prepare($sql);
        $query->execute(array(':note_text' => $note_text, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_CREATION_FAILED'));
        return false;
    }

    public static function updateNote($note_id, $note_text)
    {
        if (!$note_id || !$note_text) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "UPDATE notes SET note_text = :note_text WHERE note_id = :note_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':note_id' => $note_id, ':note_text' => $note_text, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_EDITING_FAILED'));
        return false;
    }

    public static function deleteNote($note_id)
    {
        if (!$note_id) {
            return false;
        }

        $database = DatabaseFactory::getFactory()->getConnection();

        $sql = "DELETE FROM notes WHERE note_id = :note_id AND user_id = :user_id LIMIT 1";
        $query = $database->prepare($sql);
        $query->execute(array(':note_id' => $note_id, ':user_id' => Session::get('user_id')));

        if ($query->rowCount() == 1) {
            return true;
        }

        Session::add('feedback_negative', Text::get('FEEDBACK_NOTE_DELETION_FAILED'));
        return false;
    }
}
