<?php

class ContactoModel
{
    public static function sendEmail($nombre, $direccion, $email,$telefono,$mensaje)
    {
        $body = "Solicitud de suscripcion para interconsulta \n\n".
         "Nombre: " . $nombre . "\n\n".
         "Dirección postal ". $direccion . "\n\n".
         "Correo electrónico: " . $email . "\n\n".
         "Teléfono: " . $telefono . "\n\n".
         "Mensaje: " . html_entity_decode(strip_tags($mensaje)) ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailer("instructivoeco@gmail.com", Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud de suscripción', $body);

        if ($mail_sent) {
            return true;
            Session::add('feedback_positive', "Se ha enviado con éxito su mensaje, pronto nos pondremos en contacto con ud.");
        } else {
            return false;
            Session::add('feedback_negative', "Tenemos problemas en el servidor, intentelo más tarde");
        }
    }

}
