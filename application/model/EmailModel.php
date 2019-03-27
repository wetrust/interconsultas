<?php

class EmailModel
{
    public static function sendContrareferenteEmail($solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        $body =  "Junto con saludar, comentamos a ud que " . $solicitud_email ." le ha solicitado una interconsulta ecográfica:" . "\n\nNombre: " . $solicitud_nombre . "\nRut: " . $solicitud_rut . "\nFecha: " . $solicitud_fecha . "\nEge conocida precozmente: " . $solicitud_eg . "\nFUM: ". $solicitud_fum . "\nEdad Gestacional:" . $solicitud_egestacional ."\nEcografía previa de crecimiento: " . $solicitud_eco . "\nDiagnóstico de referencia: " . $solicitud_diagnostico . "\nLugar de control: " . $solicitud_lugar . "\nCiudad: " . $solicitud_ciudad . "\nProfesional referente: " . $solicitud_profesional . "\nNombre profesional: " . $solicitud_nombreprofesional . "\nCorreo electrónico: " . $solicitud_email . "\nSolicitud enviada a correo electrónico: " . $solicitud_profesionalemail . "\n\n\nPuede ver la solicitud en el siguiente link: https://administrador.crecimientofetal.cl/login";

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
        $body =  "Gracias por solicitar una interconsulta para ". $solicitud_profesionalemail . " adjuntamos copia de los datos ingresados por ud. : \n\nNombre: " . $solicitud_nombre . "\nRut: " . $solicitud_rut . "\nFecha: " . $solicitud_fecha . "\nFUM: ". $solicitud_fum . "\nEdad Gestacional:" . $solicitud_egestacional . "\nDiagnóstico de referencia: " . $solicitud_diagnostico . "\nCiudad: " . $solicitud_ciudad . "\nLugar de control: " . $solicitud_lugar .  "\nProfesional referente: " . $solicitud_profesional . "\nNombre profesional: " . $solicitud_nombreprofesional . "\nCorreo electrónico: " . $solicitud_email . "\nSolicitud enviada a correo electrónico: " . $solicitud_profesionalemail;

        $mail = new Mail;
        $mail_sent = $mail->sendMail($solicitud_email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendPrimeraRespuesta($solicitud_id,$interconsulta_aceptada, $evaluacion_comentario)
    {
        $solicitud_estado = " rechazada ";
        if ($interconsulta_aceptada == 1){
            $solicitud_estado = " aceptada ";
        }
        $solicitud = SolicitudesModel::getSolicitud($solicitud_id, Session::get('user_email'));
        $body =  "Informamos a us que la interconsulta para: " . $solicitud->solicitud_nombre . ", Rut: " . $solicitud->solicitud_rut . " solicitada en fecha: " . $solicitud->solicitud_fecha . " ha sido " . $solicitud_estado . "\nComentario: ". $evaluacion_comentario;

        $mail = new Mail;
        $mail_sent = $mail->sendMail($solicitud->solicitud_email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }
}
