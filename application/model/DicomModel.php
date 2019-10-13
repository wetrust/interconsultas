<?php

class DicomModel
{
    public static function getAllImages($solicitud_rut, $fecha)
    {
            $database = "";
            $result = new stdClass();

            try {
                $options = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ, PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING);
                $database = new PDO(
                   Config::get('DB_TYPE') . ':host=' . Config::get('DB_HOST') . ';dbname=dicom' .
                    ';port=' . Config::get('DB_PORT') . ';charset=' . Config::get('DB_CHARSET'),
                   Config::get('DB_USER'), Config::get('DB_PASS'), $options
                   );
            } catch (PDOException $e) {
    
                // Echo custom message. Echo error code gives you some info.
                echo 'Database connection can not be estabilished. Please try again later.' . '<br>';
                echo 'Error code: ' . $e->getCode();
    
                // Stop application :(
                // No connection, reached limit connections etc. so no point to keep it running
                exit;
            }
            $sql = "SELECT DICOMPatients.PatientID, DICOMPatients.PatientNam, DICOMStudies.StudyDate, DICOMStudies.StudyTime, DICOMStudies.StudyModal, DICOMStudies.StudyInsta, DICOMSeries.SeriesInst, DICOMImages.ObjectFile FROM DICOMPatients INNER JOIN DICOMStudies ON DICOMPatients.PatientID = DICOMStudies.PatientID INNER JOIN DICOMSeries ON DICOMStudies.StudyInsta = DICOMSeries.StudyInsta INNER JOIN DICOMImages ON DICOMSeries.SeriesInst = DICOMImages.SeriesInst WHERE DICOMPatients.PatientID = :PatientID AND DICOMStudies.StudyDate = :StudyDate";
            $query = $database->prepare($sql);
            $query->execute(array(':PatientID' => $solicitud_rut,':StudyDate' => $fecha));

            if ($query->rowCount() > 0) {
                $imagenes = $query->fetchAll();
                $result->exist = true;

                $archivos = scandir(Config::get('DICOM_DIRECTORY') . $rut . "/");

                if ($archivos == false){
                    $result->empty = true;
                }
                else{
                    $result->empty = false;
                    $archivosJPG = array();
                    $archivosJPG = array();

                    foreach($imagenes as $imagen){
                        $strArchivoJPG = Config::get('DICOM_DIRECTORY') . substr($imagen->ObjectFile, 0, strlen($imagen->ObjectFile) -3) . "jpg";
                        $JPGData = array();

                        if ($imagen->NumberOfFr > 0){
                            array_push($JPGData, true);
                        }
                        else{
                            array_push($JPGData, false);  
                        }

                        if(file_exists($strArchivoJPG)){
                            $strArchivoJPG = str_replace($rut . "/", '', $strArchivoJPG);
                            array_push($JPGData, substr($imagen->ObjectFile, 0, strlen($imagen->ObjectFile) -3) . "jpg");
                            array_push($archivosJPG,$JPGData);
                        }
                        else{
                            $strCommand =  "/usr/bin/dcmj2pnm +fo +oj " . Config::get('DICOM_DIRECTORY') . $imagen->ObjectFile .  " " . $strArchivoJPG;
                            $out = exec($strCommand);
                            if(file_exists($strArchivoJPG)){
                                $strArchivoJPG = str_replace($rut . "/", '', $strArchivoJPG);
                                array_push($JPGData, substr($imagen->ObjectFile, 0, strlen($imagen->ObjectFile) -3) . "jpg");
                                array_push($archivosJPG,$JPGData);
                            }   
                        }
                    }

                    $result->JPGFiles = $archivosJPG;
                }
            }
            else{
                $result->exist = false;
            }

        return $result;
    }
}