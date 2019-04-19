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
         "Junto con saludar, adjuntamos respuesta a su interconsulta ecográfica para la paciente: " . 
         $solicitud->solicitud_rut ." ". $solicitud->solicitud_nombre . "
         \n\nFecha evaluación interconsulta: " . $respuesta_fecha . 
         "\nEdad Gestacional: " . $respuesta_eg . 
         "\nPeso Fetal Estimado: " . $respuesta_pfe . ", Pct: " . $respuesta_pfe_percentil.
         "\nIP Promedio de uterinas: " . $respuesta_uterinas . ", Pct: " . $respuesta_uterinas_percentil.
         "\nIP Arteria Umbilical: " . $respuesta_umbilical . ", Pct: " . $respuesta_umbilical_percentil.
         "\nIP Arteria Cerebral media: " . $respuesta_cm . ", Pct: " . $respuesta_cm_percentil.
         "\nCuociente Cm / Au: " . $respuesta_cmau . ", Pct: " . $respuesta_cmau_percentil.
         "\nHIPÓTESIS DIAGÓSTICA: " . 
         "\nCrecimiento fetal: " . $respuesta_hipotesis . 
         "\nFlujometría Doppler: " . $respuesta_doppler .
         "\nLíquido amniótico: " . $respuesta_liquido .
         "\nAnatomía fetal: " . $respuesta_anatomia .
         "\nCOMENTARIOS:\n " . html_entity_decode(strip_tags($respuesta_comentariosexamen)) .
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
         "Junto con saludar, adjuntamos respuesta a su interconsulta ecográfica para la paciente: " . 
         $solicitud->solicitud_rut ." ". $solicitud->solicitud_nombre . "
         \n\nFecha evaluación interconsulta: " . $respuesta_fecha . 
         "\nEdad Gestacional: " . $respuesta_eg . 
         "\nPeso Fetal Estimado: " . $respuesta_pfe . ", Pct: " . $respuesta_pfe_percentil.
         "\nIP Promedio de uterinas: " . $respuesta_uterinas . ", Pct: " . $respuesta_uterinas_percentil.
         "\nIP Arteria Umbilical: " . $respuesta_umbilical . ", Pct: " . $respuesta_umbilical_percentil.
         "\nIP Arteria Cerebral media: " . $respuesta_cm . ", Pct: " . $respuesta_cm_percentil.
         "\nCuociente Cm / Au: " . $respuesta_cmau . ", Pct: " . $respuesta_cmau_percentil.
         "\nHIPÓTESIS DIAGÓSTICA: " . 
         "\nCrecimiento fetal: " . $respuesta_hipotesis . 
         "\nFlujometría Doppler: " . $respuesta_doppler .
         "\nLíquido amniótico: " . $respuesta_liquido .
         "\nAnatomía fetal: " . $respuesta_anatomia .
         "\nCOMENTARIOS:\n " . html_entity_decode(strip_tags($respuesta_comentariosexamen)) .
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

    public static function sendRespuestaReferenteEmailBreve($email_referente, $solicitud_id, $respuesta_comentariosexamen, $respuesta_ecografista)
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
         "Junto con saludar, adjuntamos respuesta a su interconsulta ecográfica para la paciente: " . 
         $solicitud->solicitud_rut ." ". $solicitud->solicitud_nombre . "
         \n\nFecha evaluación interconsulta: " . $respuesta_fecha . 
         "\nEdad Gestacional: " . $respuesta_eg . 
         "\nUtero: " . $respuesta_utero_primertrimestre.
         "\nSaco Gestacional: " . $respuesta_saco_gestacional .
         "\nEmbrión: " . $respuesta_embrion .
         "\nLCN: " . $respuesta_lcn .
         "\nAnexo Izquierdo: " . $respuesta_anexo_izquierdo_primertrimestre .
         "\nAnexo Derecho: " . $respuesta_anexo_derecho_primertrimestre . 
         "\nDouglas: " . $respuesta_douglas_primertrimestre .
         "\nCOMENTARIOS:\n " . html_entity_decode(strip_tags($respuesta_comentariosexamen)) .
         "\nEcografista: " . $respuesta_ecografista ;
    
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
         "Junto con saludar, adjuntamos respuesta a su interconsulta ecográfica para la paciente: " . 
         $solicitud->solicitud_rut ." ". $solicitud->solicitud_nombre . "
         \n\nFecha evaluación interconsulta: " . $respuesta_fecha . 
         "\nEdad Gestacional: " . $respuesta_eg . 
         "\nPlacenta: " . $respuesta_placenta.
         "\nLíquido amniótico: " . $respuesta_liquido_amniotico .
         "\nDBP: " . $respuesta_dbp .
         "\nCC: " . $respuesta_cc .
         "\nCA: " . $respuesta_ca .
         "\nLF: " . $respuesta_lf . 
         "\nPFE: " . $respuesta_pfe .
         "\nCC/CA: " . $respuesta_ccca .
         "\nCOMENTARIOS:\n " . html_entity_decode(strip_tags($respuesta_comentariosexamen)) .
         "\nEcografista: " . $respuesta_ecografista ;
    
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
         "Junto con saludar, adjuntamos respuesta a su interconsulta ginecológica para la paciente: " . 
         $solicitud->solicitud_rut ." ". $solicitud->solicitud_nombre . "
         \n\nFecha evaluación interconsulta: " . $respuesta_fecha .  
         "\nÚtero: " . $respuesta_utero_ginecologica.
         "\nEndometrio: " . $respuesta_endometrio .
         "\nAnexo Izquierdo: " . $respuesta_anexo_izquierdo_ginecologica .
         "\nAnexo Derecho: " . $respuesta_anexo_derecho_ginecologica .
         "\nOvario Izquierdo: " . $respuesta_ovario_izquierdo .
         "\nOvario Derecho: " . $respuesta_ovario_derecho . 
         "\nDouglas: " . $respuesta_douglas_ginecologica .
         "\nCOMENTARIOS:\n " . html_entity_decode(strip_tags($respuesta_comentariosexamen)) .
         "\nEcografista: " . $respuesta_ecografista ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco primer trimestre', $body, $tmp);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

}
