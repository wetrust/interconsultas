<?php

class ContactoModel
{
    public static function sendEmail($nombre, $direccion, $email,$telefono,$mensaje)
    {
        $body = "SOLICITUD DE SUSCRIPCIÓN PARA INTERCONSULTOR \n\n".
         "Nombre: " . $nombre . "\n\n".
         "Dirección: ". $direccion . "\n\n".
         "Email: " . $email . "\n\n".
         "Teléfono: " . $telefono . "\n\n".
         "Mensaje: " . html_entity_decode(strip_tags($mensaje)) ;
    
        $mail = new Mail;

        $tmp = Config::get('PATH_AVATARS');
        
        $mail_sent = $mail->sendMailWithPHPMailer("instructivoeco@gmail.com", Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud de suscripción', $body);

        if ($mail_sent) {
            Session::add('feedback_positive', "Se ha enviado con éxito su mensaje, pronto nos pondremos en contacto con ud.");
            return true;
        } else {
            Session::add('feedback_negative', "Tenemos problemas en el servidor, intentelo más tarde");
            return false;
        }
    }

}
