<?php

class EmailModel
{
    public static function sendContrareferenteEmail($solicitud_id)
    {
        $datos = SolicitudesModel::getSolicitud($solicitud_id);

        $solicitud_fecha = explode("-", $datos->solicitud_fecha);
        $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];
        $solicitud_fum = explode("-", $datos->solicitud_fum);
        $solicitud_fum = $solicitud_fum[2] . "-". $solicitud_fum[1]. "-". $solicitud_fum[0];

        $body =  "Nueva solicitud de interconsulta ecográfica" .
        "\n\nFecha: " . $solicitud_fecha .
        "\nNombre: " . $datos->solicitud_nombre .
        "\nRut: " . $datos->solicitud_rut .
        "\nCiudad: " . $datos->solicitud_ciudad .
        "\nLugar de control: " . $datos->solicitud_lugar .
        "\nFUM: ". $solicitud_fum .
        "\nEdad Gestacional:" . $datos->solicitud_egestacional .
        "\nDiagnóstico de referencia: " . $datos->solicitud_diagnostico .
        "\nProfesional referente: " . $datos->solicitud_profesional .
        "\nNombre profesional: " . $datos->solicitud_nombreprofesional .
        "\nEmail: " . $datos->solicitud_email . "\n\n";

        $mail = new Mail;
        $mail_sent = $mail->sendMail($datos->solicitud_profesionalemail, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body);

        if ($mail_sent) {
            return true;
        } else {
            return false;
        }
    }

    public static function sendSolicitanteEmail($solicitud_id)
    {
        $datos = SolicitudesModel::getSolicitud($solicitud_id);

        $solicitud_fecha = explode("-", $datos->solicitud_fecha);
        $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];
        $solicitud_fum = explode("-", $datos->solicitud_fum);
        $solicitud_fum = $solicitud_fum[2] . "-". $solicitud_fum[1]. "-". $solicitud_fum[0];

        $body =  "Recepcionada interconsulta solicitada al Email ". $datos->solicitud_profesionalemail .
        " adjuntamos copia de los datos ingresados por ud. : \n\nFecha: " . $solicitud_fecha .
        "\nNombre: " . $datos->solicitud_nombre .
        "\nRut: " . $datos->solicitud_rut .
        "\nCiudad: " . $datos->solicitud_ciudad .
        "\nLugar de control: " . $datos->solicitud_lugar .
        "\nFUM: ". $solicitud_fum .
        "\nEdad Gestacional:" . $datos->solicitud_egestacional .
        "\nDiagnóstico de referencia: " . $datos->solicitud_diagnostico .
        "\nProfesional referente: " . $datos->solicitud_profesional .
        "\nNombre profesional: " . $datos->solicitud_nombreprofesional .
        "\nCorreo electrónico: " . $datos->solicitud_email;

        $mail = new Mail;
        $mail_sent = $mail->sendMail($datos->solicitud_email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), 'Solicitud eco crecimiento', $body);

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

    public static function sendRespuestaContrarreferente($data, $titulo_email,$respuesta_crecimiento)
    {
        $body = "Estimado(a) ". $data->solicitud_nombreprofesional . "\n\n" .
        "Junto con saludar, envío informe de paciente: " . 
        $data->solicitud_nombre . "\n RUT (DNI): " .$data->solicitud_rut ;

        $mail = new Mail;
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($data->solicitud_email, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), $titulo_email, $body, $respuesta_crecimiento);

        if ($mail_sent) { return true; } else { return false; }
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
        $data = SolicitudesModel::getSolicitud($solicitud_id);

        if ($informe == 0){    
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/index', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'solicitud_resultado' => $respuesta
            ));

            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];
    
            $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'respuesta' => $respuesta,
                'grafico_uno' => GraphModel::pesoFetal($respuesta->eg, $respuesta->pfe),
                'grafico_dos' => GraphModel::ccca($respuesta->eg, $respuesta->ccca),
                'grafico_tres' => GraphModel::uterinas($respuesta->eg, $respuesta->uterinas),
                'grafico_cuatro' => GraphModel::umbilical($respuesta->eg, $respuesta->umbilical),
                'grafico_cinco' => GraphModel::cerebralMedia($respuesta->eg, $respuesta->cm),
                'grafico_seis' => GraphModel::cuocienteCerebroPlacentario($respuesta->eg, $respuesta->cmau),
            ));

            $response->result = EmailModel::sendRespuestaContrarreferente($data, 'Solicitud eco crecimiento',$informe);
        }
        else if ($informe == 1){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/primertrimestre', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
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
            
            $response->result = EmailModel::sendRespuestaContrarreferente($data, 'Solicitud eco primer trimestre',$informe);
        }
        else if ($informe == 2){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_placenta' => $respuesta->placenta,
                'respuesta_placenta_insercion' => $respuesta->placenta_insercion,
                'respuesta_liquido_amniotico' => $respuesta->liquido_amniotico,
                'respuesta_dbp' => $respuesta->dbp,
                'respuesta_cc' => $respuesta->cc,
                'respuesta_cc_pct' => $respuesta->cc_pct,
                'respuesta_ca' =>  $respuesta->ca,
                'respuesta_ca_pct' => $respuesta->ca_pct,
                'respuesta_lf' => $respuesta->lf,
                'respuesta_lf_pct' => $respuesta->lf_pct,
                'respuesta_pfe' => $respuesta->pfe_segundo,
                'respuesta_pfe_pct' => $respuesta->pfe_pct_segundo,
                'respuesta_ccca' => $respuesta->ccca,
                'respuesta_ccca_pct' => $respuesta->ccca_pct,
                'respuesta_fecha' => $respuesta->fecha,
                'respuesta_eg' => $respuesta->eg,
                'ecografista' => $respuesta->ecografista,
                'comentariosexamen' => $respuesta->comentariosexamen,
                'respuesta_presentacion' => $respuesta->presentacion_segundo,
                'respuesta_dorso_segundo' => $respuesta->dorso_segundo,
                'respuesta_anatomia_segundo' => $respuesta->anatomia_segundo,
                'anatomia_fetal_extra' => $respuesta->anatomia_extra,
                'respuesta_hipotesis' => $respuesta->hipotesis_segundo,
                'respuesta_dof' => $respuesta->respuesta_dof,
                'respuesta_ic' => $respuesta->respuesta_ic,
                'respuesta_bvm' => $respuesta->respuesta_bvm,
                'respuesta_lh' => $respuesta->respuesta_lh,
                'respuesta_lh_pct' => $respuesta->respuesta_lh_pct,
                'respuesta_cerebelo' => $respuesta->respuesta_cerebelo,
                'respuesta_cerebelo_pct' => $respuesta->respuesta_cerebelo_pct,
                'respuesta_sexo_fetal' => $respuesta->sexo_fetal
            ));

            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];
    
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_grafico', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'respuesta' => $respuesta,
                'grafico_uno' => GraphModel::cc($respuesta->eg, $respuesta->cc),
                'grafico_dos' => GraphModel::ca($respuesta->eg, $respuesta->ca),
                'grafico_tres' => GraphModel::lf($respuesta->eg, $respuesta->lf),
                'grafico_cuatro' => GraphModel::lh($respuesta->eg, $respuesta->respuesta_lh),
                'grafico_cinco' => GraphModel::pesoFetal($respuesta->eg, $respuesta->pfe_segundo),
                'grafico_seis' => GraphModel::ccca($respuesta->eg, $respuesta->ccca),
            ));

            $response->result = EmailModel::sendRespuestaContrarreferente($data, 'Solicitud eco primer trimestre',$informe);
        }
        else if ($informe == 3){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/ginecologia', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
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

            $response->result = EmailModel::sendRespuestaContrarreferente($data, 'Solicitud de examen ecografico',$informe);

        }
        else if($informe == 4){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/doppler', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_fecha' => $respuesta->fecha,
                'respuesta_eg' => $respuesta->eg,
                'respuesta_anatomia' => $respuesta->anatomia_fetal,
                'respuesta_anatomia_extra' => $respuesta->anatomia_extra,
                'respuesta_embrion' => $respuesta->embrion,
                'respuesta_lcn' => $respuesta->lcn,
                'respuesta_lcn_eg' => $respuesta->lcn_eg,
                'respuesta_fcf' => $respuesta->respuesta_fcf,
                'respuesta_dbp' => $respuesta->dbp,
                'respuesta_translucencia_nucal' => $respuesta->translucencia_nucal,
                'respuesta_cc' => $respuesta->cc,
                'respuesta_ca' => $respuesta->ca,
                'respuesta_lf' => $respuesta->lf,
                'uterina_derecha' => $respuesta->uterina_derecha,
                'uterina_derecha_percentil' => $respuesta->uterina_derecha_percentil,
                'uterina_izquierda' => $respuesta->uterina_izquierda,
                'uterina_izquierda_percentil' => $respuesta->uterina_izquierda_percentil,
                'uterinas' => $respuesta->uterinas,
                'uterinas_percentil' => $respuesta->uterinas_percentil,
                'ecografista' => $respuesta->ecografista,
                'comentariosexamen' => $respuesta->comentariosexamen
            ));

            $response->result = EmailModel::sendRespuestaContrarreferente($data, 'Solicitud de ecografia 11-14',$informe);
        }

        return $response;
    }
}
