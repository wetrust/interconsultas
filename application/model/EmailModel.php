<?php

class EmailModel
{
    public static function sendContrareferenteEmail($solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        $solicitud_fecha = explode("-", $solicitud_fecha);
        $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];

        $body =  "Junto con saludar, comentamos a ud que le ha solicitado una interconsulta ecográfica:" . "\n\nFecha: " . $solicitud_fecha . "\nNombre: " . $solicitud_nombre . "\nRut: " . $solicitud_rut . "\nCiudad: " . $solicitud_ciudad . "\nLugar de control: " . $solicitud_lugar . "\nFUM: ". $solicitud_fum . "\nEdad Gestacional:" . $solicitud_egestacional . "\nDiagnóstico de referencia: " . $solicitud_diagnostico .  "\nProfesional referente: " . $solicitud_profesional . "\nNombre profesional: " . $solicitud_nombreprofesional . "\nEmail: " . $solicitud_email . "\nSolicitud enviada a correo electrónico: " . $solicitud_profesionalemail . "\n\n";

        $mail = new Mail;
        $mail_sent = $mail->sendMail($solicitud_profesionalemail, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendSolicitanteEmail($solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        $solicitud_fecha = explode("-", $solicitud_fecha);
        $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];
        $body =  "Recepcionada interconsulta solicitada al Email ". $solicitud_profesionalemail . " adjuntamos copia de los datos ingresados por ud. : \n\nFecha: " . $solicitud_fecha . "\nNombre: " . $solicitud_nombre . "\nRut: " . $solicitud_rut . "\nCiudad: " . $solicitud_ciudad . "\nLugar de control: " . $solicitud_lugar . "\nFUM: ". $solicitud_fum . "\nEdad Gestacional:" . $solicitud_egestacional . "\nDiagnóstico de referencia: " . $solicitud_diagnostico .  "\nProfesional referente: " . $solicitud_profesional . "\nNombre profesional: " . $solicitud_nombreprofesional . "\nCorreo electrónico: " . $solicitud_email;

        $mail = new Mail;
        $mail_sent = $mail->sendMail($solicitud_email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendPrimeraRespuesta($solicitud_id,$evaluacion_fecha, $evaluacion_comentario)
    {

        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));
        $evaluacion_fecha = explode("-", $evaluacion_fecha);
        $evaluacion_fecha = $evaluacion_fecha[2] . "-". $evaluacion_fecha[1]. "-". $evaluacion_fecha[0];

        $body =  "Informamos a ud que la interconsulta para: " . $solicitud->solicitud_nombre . ", Rut: " . $solicitud->solicitud_rut . " ha sido recepcionada con fecha " . $evaluacion_fecha . "\nCOMENTARIO:\n". strip_tags($evaluacion_comentario);

        $mail = new Mail;
        $mail_sent = $mail->sendMail($solicitud->solicitud_email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendRespuestaEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_doppler, $respuesta_anatomia)
    {
        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));

        $respuesta_fecha = explode("-", $respuesta_fecha);
        $respuesta_fecha = $respuesta_fecha[2] . "-". $respuesta_fecha[1]. "-". $respuesta_fecha[0];
        $respuesta_comentariosexamen = str_replace("&nbsp;", " ", $respuesta_comentariosexamen);
        $body = "Estimado(a) ". $solicitud->solicitud_nombreprofesional . "\n\n" .
         "Junto con saludar, envío informe de paciente: " . 
         $solicitud->solicitud_nombre . "\n RUT (DNI): " .$solicitud->solicitud_rut ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($solicitud->solicitud_email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body, $tmp);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendRespuestaEmailBreve($solicitud_id, $respuesta_comentariosexamen, $respuesta_ecografista)
    {
        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));
        $respuesta_comentariosexamen = str_replace("&nbsp;", " ", $respuesta_comentariosexamen);
        $body = "Estimado(a) ". $solicitud->solicitud_nombreprofesional . "\n\n" .
         "Junto con saludar, adjuntamos respuesta a su interconsulta ecográfica para la paciente: " . 
         $solicitud->solicitud_rut ." ". $solicitud->solicitud_nombre . "
         \n\nCOMENTARIOS:\n " . html_entity_decode(strip_tags($respuesta_comentariosexamen)) .
         "\nEcografista: " . $respuesta_ecografista ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($solicitud->solicitud_email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body, $tmp);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendRespuestaReferenteEmail($email_referente, $solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_pfe, $respuesta_pfe_percentil, $respuesta_liquido, $respuesta_uterinas, $respuesta_uterinas_percentil, $respuesta_umbilical, $respuesta_umbilical_percentil, $respuesta_cm, $respuesta_cm_percentil, $respuesta_cmau, $respuesta_cmau_percentil, $respuesta_hipotesis, $respuesta_comentariosexamen, $respuesta_ecografista,$respuesta_doppler, $respuesta_anatomia)
    {
        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));

        $respuesta_fecha = explode("-", $respuesta_fecha);
        $respuesta_fecha = $respuesta_fecha[2] . "-". $respuesta_fecha[1]. "-". $respuesta_fecha[0];

        $respuesta_comentariosexamen = str_replace("&nbsp;", " ", $respuesta_comentariosexamen);

        $body = "Estimado(a) ". $solicitud->solicitud_nombreprofesional . "\n\n" .
         "Junto con saludar, envío informe de la paciente: " . 
         $solicitud->solicitud_nombre . ", RUT " .$solicitud->solicitud_rut ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($email_referente, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body, $tmp);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendRespuestaReferenteEmailBreve($email_referente, $solicitud_id, $respuesta_comentariosexamen, $respuesta_ecografista)
    {
        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));
        $respuesta_comentariosexamen = str_replace("&nbsp;", " ", $respuesta_comentariosexamen);
        $body = "Estimado(a) ". $solicitud->solicitud_nombreprofesional . "\n\n" .
         "Junto con saludar, adjuntamos respuesta a su interconsulta ecográfica para la paciente: " . 
         $solicitud->solicitud_nombre . ", RUT:  ". $solicitud->solicitud_rut ."
         \n\nCOMENTARIOS:\n " . html_entity_decode(strip_tags($respuesta_comentariosexamen)) .
         "\nEcografista: " . $respuesta_ecografista ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($email_referente, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body, $tmp);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendRespuestaEcoPrimerTrimestreEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_utero_primertrimestre, $respuesta_saco_gestacional, $respuesta_embrion, $respuesta_lcn, $respuesta_anexo_izquierdo_primertrimestre, $respuesta_anexo_derecho_primertrimestre, $respuesta_douglas_primertrimestre, $respuesta_comentariosexamen, $respuesta_ecografista, $email)
    {
        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));

        $respuesta_fecha = explode("-", $respuesta_fecha);
        $respuesta_fecha = $respuesta_fecha[2] . "-". $respuesta_fecha[1]. "-". $respuesta_fecha[0];

        $respuesta_comentariosexamen = str_replace("&nbsp;", " ", $respuesta_comentariosexamen);

        $body = "Estimado(a) ". $solicitud->solicitud_nombreprofesional . "\n\n" .
         "Junto con saludar, envío informe de paciente: " . 
         $solicitud->solicitud_nombre . "\n RUT (DNI): " .$solicitud->solicitud_rut ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco primer trimestre', $body, $tmp);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendRespuestaEcoSegundoTrimestreEmail($solicitud_id, $respuesta_fecha, $respuesta_eg, $respuesta_placenta, $respuesta_liquido_amniotico, $respuesta_dbp, $respuesta_cc, $respuesta_ca, $respuesta_lf, $respuesta_pfe, $respuesta_ccca, $respuesta_comentariosexamen, $respuesta_ecografista, $email)
    {
        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));

        $respuesta_fecha = explode("-", $respuesta_fecha);
        $respuesta_fecha = $respuesta_fecha[2] . "-". $respuesta_fecha[1]. "-". $respuesta_fecha[0];

        $respuesta_comentariosexamen = str_replace("&nbsp;", " ", $respuesta_comentariosexamen);

        $body = "Estimado(a) ". $solicitud->solicitud_nombreprofesional . "\n\n" .
         "Junto con saludar, envío informe de paciente: " . 
         $solicitud->solicitud_nombre . "\n RUT (DNI): " .$solicitud->solicitud_rut ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco primer trimestre', $body, $tmp);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendRespuestaGinecologiaEmail($solicitud_id, $respuesta_fecha, $respuesta_utero_ginecologica, $respuesta_endometrio, $respuesta_anexo_izquierdo_ginecologica, $respuesta_anexo_derecho_ginecologica, $respuesta_ovario_izquierdo, $respuesta_ovario_derecho, $respuesta_douglas_ginecologica, $respuesta_comentariosexamen, $respuesta_ecografista, $email)
    {
        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));

        $respuesta_fecha = explode("-", $respuesta_fecha);
        $respuesta_fecha = $respuesta_fecha[2] . "-". $respuesta_fecha[1]. "-". $respuesta_fecha[0];

        $respuesta_comentariosexamen = str_replace("&nbsp;", " ", $respuesta_comentariosexamen);

         $body = "Estimado(a) ". $solicitud->solicitud_nombreprofesional . "\n\n" .
         "Junto con saludar, envío informe de paciente: " . 
         $solicitud->solicitud_nombre . "\n RUT (DNI): " .$solicitud->solicitud_rut ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco primer trimestre', $body, $tmp);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendEmailManual()
    {
        $solicitud_id = intval(Request::post('solicitud'));
        $email = Request::post('email');
        $informe = intval(Request::post('informe'));
        $response = new stdClass();
        $internalView = new View;

        $response->result = false;

        if (!$solicitud_id || !$email || strlen($email) == 0 || $informe < 0 || $informe > 4){
            return $response;
        }

        //verify if "respuesta" exist in database
        if (RespuestaModel::countRespuesta($solicitud_id) == false){
            return $response;
        }

        $tmp = Config::get('PATH_AVATARS');
        if (file_exists("$tmp/informe.pdf")) unlink("$tmp/informe.pdf");

        $respuesta = RespuestaModel::getRespuesta($solicitud_id);

        //create PDF in temporal folder
        if($informe == 1){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/primertrimestre', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_utero' => $respuesta->utero_primertrimestre,
                'respuesta_saco_gestacional' => $respuesta->saco_gestacional,
                'respuesta_embrion' => $respuesta->embrion,
                'respuesta_lcn' => $respuesta->lcn,
                'respuesta_anexo_izquierdo_primertrimestre' => $respuesta->anexo_izquierdo_primertrimestre,
                'respuesta_anexo_derecho_primertrimestre' => $respuesta->anexo_derecho_primertrimestre,
                'respuesta_douglas_primertrimestre' => $respuesta->douglas_primertrimestre,
                'respuesta_fecha' => $respuesta->fecha,
                'respuesta_eg' => $respuesta->eg,
                'ecografista' => $respuesta->ecografista,
                'comentariosexamen' => $respuesta->comentariosexamen,
                'respuesta_lcn_eg' => $respuesta->lcn_eg
            ));
        } else if ($informe == 2){
    
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_placenta' => $respuesta->placenta,
                'respuesta_liquido_amniotico' => $respuesta->liquido_amniotico,
                'respuesta_dbp' => $respuesta->dbp,
                'respuesta_cc' => $respuesta->cc,
                'respuesta_ca' => $respuesta->ca,
                'respuesta_lf' => $respuesta->lf,
                'respuesta_pfe_segundo' => $respuesta->pfe_segundo,
                'respuesta_pfe_pct_segundo' => $respuesta->pfe_pct_segundo,
                'respuesta_ccca' => $respuesta->ccca,
                'respuesta_ccca_pct' => $respuesta->ccca_pct,
                'respuesta_fecha' => $respuesta->fecha,
                'respuesta_eg' => $respuesta->eg,
                'ecografista' => $respuesta->ecografista,
                'comentariosexamen' => $respuesta->comentariosexamen,
                'respuesta_presentacion_segundo' => $respuesta->presentacion_segundo,
                'respuesta_dorso_segundo' => $respuesta->dorso_segundo,
                'respuesta_anatomia_segundo' => $respuesta->anatomia_segundo,
                'respuesta_hipotesis_segundo' => $respuesta->hipotesis_segundo
            ));
    
        } else if($informe == 3){
    
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/ginecologia', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_utero_ginecologica' => $respuesta->utero_ginecologica,
                'respuesta_endometrio' => $respuesta->endometrio,
                'respuesta_anexo_izquierdo_ginecologica' => $respuesta->anexo_izquierdo_ginecologica,
                'respuesta_anexo_derecho_ginecologica' => $respuesta->anexo_derecho_ginecologica,
                'respuesta_ovario_izquierdo' => $respuesta->ovario_izquierdo,
                'respuesta_ovario_derecho' => $respuesta->ovario_derecho,
                'respuesta_douglas_ginecologica' => $respuesta->douglas_ginecologica,
                'respuesta_fecha' => $respuesta->fecha,
                'ecografista' => $respuesta->ecografista,
                'comentariosexamen' => $respuesta->comentariosexamen
            ));
    
        }else if($informe == 0){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/index', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id)
            ));
        }

        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));

        $body = "Estimado(a) ". $solicitud->solicitud_nombreprofesional . "\n\n" .
         "Junto con saludar, envío informe de paciente: " . 
         $solicitud->solicitud_nombre . "\n RUT (DNI): " .$solicitud->solicitud_rut ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Reenvio de informe', $body, $tmp);

        if ($mail_sent) {$response->result = true;}

        return $response;
    }
}
