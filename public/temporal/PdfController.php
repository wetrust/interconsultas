<?php

class PdfController extends Controller
{
    /**
     * Construct this object by extending the basic Controller class
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Handles what happens when user moves to URL/index/index - or - as this is the default controller, also
     * when user moves to /index or enter your application at base level
     */
    public function img($user_id = null, $img_id = null, $StudyDate = null)
    {
        if ($user_id != null && $img_id != null && $StudyDate != null){
            
            $nombre = NombreModel::getAll($user_id);
            $nombre = explode("^", $nombre[0]->PatientNam);
            $nombre = $nombre[1] . " " . $nombre[0];
            
            $files = DicomModel::getAllImages($user_id, $StudyDate);
            $files = $files->JPGFiles;
            $filesJPG = [];
            $contador = 0;

            $img_id = json_decode("[" . $img_id . "]", true);
            foreach($files as $file){
                if (in_array($contador, $img_id)) {
                    array_push($filesJPG, $file);
                }
                $contador++;
            }
     
            $StudyDate = (string)$StudyDate;
            
            $StudyDate = substr($StudyDate, 6, 8) . "/" . substr($StudyDate, 4, 2) . "/" .substr($StudyDate, 0, 4);
            
            
            
            $this->View->renderWithoutHeaderAndFooter('pdf/index', array(
                'user_id' => $user_id,
                'user_name' => $nombre,
                'img_id' => $img_id,
                'StudyDate' => $StudyDate,
                'user_images' => $filesJPG
            ));
        }
        else{
            Redirect::to('examen/express');
        }
    }

    public function crecimiento($user_id = null, $StudyDate = null)
    {
        //if ($user_id != null && $img_id != null && $StudyDate != null){
            
        //    $nombre = NombreModel::getAll($user_id);
        //    $nombre = explode("^", $nombre[0]->PatientNam);
        //    $nombre = $nombre[1] . " " . $nombre[0];
     
        //    $StudyDate = (string)$StudyDate;
            
        //    $StudyDate = substr($StudyDate, 6, 8) . "/" . substr($StudyDate, 4, 2) . "/" .substr($StudyDate, 0, 4);
            
            
        //    $this->View->renderWithoutHeaderAndFooter('pdf/crecimiento', array(
        //        'user_id' => $user_id,
        //        'user_name' => $nombre,
        //        'StudyDate' => $StudyDate
        //    ));

            $this->View->renderWithoutHeaderAndFooter('pdf/crecimiento');
        //}
        //else{
        //    Redirect::to('examen/express');
        //}
    }
}
