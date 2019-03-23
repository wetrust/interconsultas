<?php

class EmailModel
{
    public static function sendContrareferenteEmail($solicitud_profesionalemail,$solicitud_nombre,$solicitud_rut,$solicitud_fecha,$solicitud_eg,$solicitud_eco,$solicitud_diagnostico,$solicitud_lugar,$solicitud_ciudad,$solicitud_profesional,$solicitud_nombreprofesional,$solicitud_email,$solicitud_fum,$solicitud_respuesta,$solicitud_egestacional)
    {
        $body =  "Junto con saludar, comentamos a ud que " . $email ." le ha solicitado una interconsulta ecográfica:" . "\n\nNombre: " . $nombre . "\nRut: " . $rut . "\nFecha: " . $fecha . "\nEge conocida precozmente: " . $eg . "\nFUM: ". $fum . "\nEdad Gestacional:" . $egestacional ."\nEcografía previa de crecimiento: " . $eco . "\nDiagnóstico de referencia: " . $diagnostico . "\nLugar de control: " . $lugar . "\nCiudad: " . $ciudad . "\nProfesional referente: " . $profesional . "\nNombre profesional: " . $nombreprofesional . "\nCorreo electrónico: " . $email . "\nSolicitud enviada a correo electrónico: " . $solicitud_profesionalemail . "\n\n\nPuede ver la solicitud en el siguiente link: https://administrador.crecimientofetal.cl/login";

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
        $body =  "Gracias por solicitar una interconsulta para ". solicitud_profesionalemail . " adjuntamos copia de los datos ingresados: \n\nNombre: " . $nombre . "\nRut: " . $rut . "\nFecha: " . $fecha . "\nEge conocida precozmente: " . $eg . "\nFUM: ". $fum . "\nEdad Gestacional:" . $egestacional ."\nEcografía previa de crecimiento: " . $eco . "\nDiagnóstico de referencia: " . $diagnostico . "\nLugar de control: " . $lugar . "\nCiudad: " . $ciudad . "\nProfesional referente: " . $profesional . "\nNombre profesional: " . $nombreprofesional . "\nCorreo electrónico: " . $email . "\nSolicitud enviada a correo electrónico: " . $solicitud_profesionalemail;

        $mail = new Mail;
        $mail_sent = $mail->sendMail($solicitud_email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }
}
