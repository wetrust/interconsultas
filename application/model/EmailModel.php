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
        "\nMotivo de exámen: " . $datos->solicitud_diagnostico .
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
        "\nMotivo de exámen: " . $datos->solicitud_diagnostico .
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

    public static function sendRespuestaEmailManual($data, $titulo_email,$respuesta_crecimiento, $correo)
    {
        $body = "Estimado(a) ". $data->solicitud_nombreprofesional . "\n\n" .
        "Junto con saludar, envío informe de paciente: " . 
        $data->solicitud_nombre . "\n RUT (DNI): " .$data->solicitud_rut ;

        $mail = new Mail;
        $mail_sent = $mail->sendMailWithPHPMailerAndAttach($correo, Config::get('EMAIL_VERIFICATION_FROM_EMAIL'), Config::get('EMAIL_VERIFICATION_FROM_NAME'), $titulo_email, $body, $respuesta_crecimiento);

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
        if (file_exists("$tmp/informeGrafico.pdf")) unlink("$tmp/informeGrafico.pdf");
        

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
    
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'respuesta' => $respuesta,
                'grafico_uno' => GraphModel::pesoFetal(array($respuesta->eg => $respuesta->pfe)),
                'grafico_dos' => GraphModel::ca(array($respuesta->eg => $respuesta->ca)),
                'grafico_tres' => GraphModel::uterinas(array($respuesta->eg => $respuesta->uterinas)),
                'grafico_cuatro' => GraphModel::umbilical(array($respuesta->eg => $respuesta->umbilical)),
                'grafico_cinco' => GraphModel::cerebralMedia(array($respuesta->eg => $respuesta->cm)),
                'grafico_seis' => GraphModel::cuocienteCerebroPlacentario(array($respuesta->eg =>$respuesta->cmau)),
            ));

            $response->result = self::sendRespuestaEmailManual($data, 'Solicitud eco crecimiento',$informe, $email);
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
            
            $response->result = self::sendRespuestaEmailManual($data, 'Solicitud eco primer trimestre',$informe, $email);
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

            $grafico_seis = GraphModel::ccca(array($respuesta->eg => $respuesta->ccca));

            if (strlen($respuesta->uterinas_percentil) > 1){
                $grafico_seis = GraphModel::uterinas(array($respuesta->eg => $respuesta->uterinas));
            }
    
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_grafico', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => $data,
                'respuesta' => $respuesta,
                'grafico_uno' => GraphModel::cc(array($respuesta->eg => $respuesta->cc)),
                'grafico_dos' => GraphModel::ca(array($respuesta->eg => $respuesta->ca)),
                'grafico_tres' => GraphModel::lf(array($respuesta->eg => $respuesta->lf)),
                'grafico_cuatro' => GraphModel::lh(array($respuesta->eg => $respuesta->respuesta_lh)),
                'grafico_cinco' => GraphModel::pesoFetal(array($respuesta->eg => $respuesta->pfe_segundo)),
                'grafico_seis' => $grafico_seis,
            ));

            $response->result = self::sendRespuestaEmailManual($data, 'Solicitud eco segundo trimestre',$informe, $email);
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

            $response->result = self::sendRespuestaEmailManual($data, 'Solicitud de examen ecografico',$informe, $email);
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
                'respuesta_hueso_nasal_valor' => $respuesta->hueso_nasal,
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

            $response->result = self::sendRespuestaEmailManual($data, 'Solicitud de ecografia 11-14',$informe, $email);
        }

        return $response;
    }

    public static function sendEmailManualAutorreferido()
    {
        $solicitud_id = intval(Request::post('solicitud'));
        $email = Request::post('email');
        $profesionalEmail = DirectorioModel::getDirectorioEmail($email);
        $informe = intval(Request::post('informe'));
        $adjuntar = intval(Request::post('adjuntar'));
        $response = new stdClass();
        $internalView = new View;

        $response->result = false;

        $Subject = "";

        if (!$solicitud_id || !$email || strlen($email) == 0 || $informe < 0 || $informe > 4){
            return $response;
        }

        //verify if "respuesta" exist in database
        if (RespuestaModel::countRespuesta($solicitud_id) == false){
            return $response;
        }

        $tmp = Config::get('PATH_AVATARS');
        if (file_exists("$tmp/informe.pdf")) unlink("$tmp/informe.pdf");
        if (file_exists("$tmp/informeGrafico.pdf")) unlink("$tmp/grafica.pdf");

        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        $data = SolicitudesModel::getSolicitud($solicitud_id);

        if ($informe == 0){    
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/index_ver', array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'solicitud_resultado' => RespuestaModel::getRespuesta($solicitud_id),
                'enviar' => true
            ));

            $respuesta = RespuestaModel::getRespuesta($solicitud_id);
            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];
    
            $grafico_uno = ($respuesta->pfe > 0) ? array($respuesta->eg => $respuesta->pfe) : array();
            $grafico_dos = ($respuesta->ca > 0) ? array($respuesta->eg => $respuesta->ca) : array();
            $grafico_tres = ($respuesta->uterinas > 0) ? array($respuesta->eg => $respuesta->uterinas) : array();
            $grafico_cuatro = ($respuesta->umbilical > 0) ? array($respuesta->eg => $respuesta->umbilical) : array();
            $grafico_cinco = ($respuesta->cm > 0) ? array($respuesta->eg => $respuesta->cm) : array();
            $grafico_seis = ($respuesta->cmau > 0) ? array($respuesta->eg => $respuesta->cmau) : array();
    
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico_ver', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'respuesta' => $respuesta,
                'grafico_uno' => GraphModel::pesoFetal($grafico_uno),
                'grafico_dos' => GraphModel::ca($grafico_dos),
                'grafico_tres' => GraphModel::uterinas($grafico_tres),
                'grafico_cuatro' => GraphModel::umbilical($grafico_cuatro),
                'grafico_cinco' => GraphModel::cerebralMedia($grafico_cinco),
                'grafico_seis' => GraphModel::cuocienteCerebroPlacentario($grafico_seis),
                'enviar' => true
            ));

            $Subject = 'Solicitud eco crecimiento';
        }
        else if ($informe == 1){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/primertrimestre_ver', array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_utero' => $respuesta->utero_primertrimestre,
                'respuesta_saco_gestacional' => $respuesta->saco_gestacional,
                'respuesta_embrion' => $respuesta->embrion,
                'respuesta_saco_valor' => $respuesta->saco_gestacional_valor,
                'respuesta_saco_eg' => $respuesta->respuesta_saco_eg,
                'respuesta_lcn' => $respuesta->lcn,
                'respuesta_fcf' => $respuesta->respuesta_fcf,
                'respuesta_anexo_izquierdo_primertrimestre' => $respuesta->anexo_izquierdo_primertrimestre,
                'respuesta_anexo_derecho_primertrimestre' => $respuesta->anexo_derecho_primertrimestre,
                'respuesta_douglas_primertrimestre' => $respuesta->douglas_primertrimestre,
                'respuesta_fecha' => $respuesta->fecha,
                'respuesta_eg' => $respuesta->eg,
                'ecografista' => $respuesta->ecografista,
                'comentariosexamen' => $respuesta->comentariosexamen,
                'respuesta_lcn_eg' => $respuesta->lcn_eg,
                'respuesta_saco_vitelino' => $respuesta->respuesta_saco_vitelino,
                'respuesta_saco_vitelino_mm' => $respuesta->respuesta_saco_vitelino_mm,
                'enviar' => true
            ));
            
            $Subject = 'Solicitud eco primer trimestre';
        }
        else if ($informe == 2){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_ver', array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_placenta' => $respuesta->placenta,
                'respuesta_placenta_insercion' => $respuesta->placenta_insercion,
                'respuesta_liquido_amniotico' => $respuesta->liquido_amniotico,
                'respuesta_dbp' => $respuesta->dbp,
                'respuesta_cc' => $respuesta->cc,
                'respuesta_cc_pct' => $respuesta->cc_pct,
                'respuesta_ca' => $respuesta->ca,
                'respuesta_ca_pct' => $respuesta->ca_pct,
                'respuesta_lf' => $respuesta->lf,
                'respuesta_lf_pct' => $respuesta->lf_pct,
                'respuesta_pfe' => $respuesta->pfe_segundo,
                'respuesta_pfe_pct' => $respuesta->pfe_pct_segundo,
                'respuesta_ccca' => $respuesta->ccca,
                'respuesta_ccca_pct' => $respuesta->ccca_pct,
                'respuesta_fecha' => $respuesta->fecha,
                'respuesta_eg' => $respuesta->eg,
                'respuesta_fcf' => $respuesta->respuesta_fcf,
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
                'respuesta_sexo_fetal' => $respuesta->sexo_fetal,
                'uterinas' => $respuesta->uterinas,
                'uterinas_percentil' => $respuesta->uterinas_percentil,
                'respuesta_atrio_posterior' => $respuesta->respuesta_atrio_posterior,
                'respuesta_atrio_posterior_mm' => $respuesta->respuesta_atrio_posterior_mm,
                'respuesta_cerebelo_text' => $respuesta->respuesta_cerebelo_text,
                'respuesta_cisterna_m' => $respuesta->respuesta_cisterna_m,
                'respuesta_cisterna_m_mm' => $respuesta->respuesta_cisterna_m_mm,
                'enviar' => true
            ));

            $respuesta = RespuestaModel::getRespuesta($solicitud_id);
            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];
    
            $grafico_uno = ($respuesta->cc > 0) ? array($respuesta->eg => $respuesta->cc) : array();
            $grafico_dos = ($respuesta->ca > 0) ? array($respuesta->eg => $respuesta->ca) : array();
            $grafico_tres = ($respuesta->lf > 0) ? array($respuesta->eg => $respuesta->lf) : array();
            $grafico_cuatro = ($respuesta->respuesta_lh > 0) ? array($respuesta->eg => $respuesta->respuesta_lh) : array();
            $grafico_cinco = ($respuesta->pfe_segundo > 0) ? array($respuesta->eg => $respuesta->pfe_segundo) : array();
            $grafico_seis = ($respuesta->ccca > 0) ? array($respuesta->eg => $respuesta->ccca) : array();
    
            $grafico_seis = GraphModel::ccca($grafico_seis);
    
            if (strlen($respuesta->uterinas_percentil) > 1){
                $grafico_seis = ($respuesta->uterinas > 0) ? array($respuesta->eg => $respuesta->uterinas) : array();
                $grafico_seis = GraphModel::uterinas($grafico_seis);
            } 
    
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_grafico_ver', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'respuesta' => $respuesta,
                'grafico_uno' => GraphModel::cc($grafico_uno),
                'grafico_dos' => GraphModel::ca($grafico_dos),
                'grafico_tres' => GraphModel::lf($grafico_tres),
                'grafico_cuatro' => GraphModel::lh($grafico_cuatro),
                'grafico_cinco' => GraphModel::pesoFetal($grafico_cinco),
                'grafico_seis' => $grafico_seis,
                'enviar' => true
            ));

            $Subject = 'Solicitud eco segundo trimestre';
        }
        else if ($informe == 3){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/ginecologia_ver', 
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
                'comentariosexamen' => $respuesta->comentariosexamen,
                'respuesta_eg' => $respuesta->eg,
                'enviar' => true
            ));

            $Subject = 'Solicitud de examen ecografico';
        }
        else if($informe == 4){
            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/doppler_ver', array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($solicitud_id),
                'respuesta_fecha' => $respuesta->fecha,
                'respuesta_eg' => $respuesta->eg,
                'respuesta_anatomia' => $respuesta->anatomia_fetal,
                'respuesta_anatomia_extra' => $respuesta->anatomia_extra,
                'respuesta_embrion' => $respuesta->embrion,
                'respuesta_lcn' => $respuesta->lcn,
                'respuesta_lcn_eg' => $respuesta->lcn_eg,
                'respuesta_fcf' => $respuesta->respuesta_fcf,
                'respuesta_translucidez_nucal' => $respuesta->respuesta_translucidez_nucal,
                'respuesta_translucencia_nucal' => $respuesta->translucencia_nucal,
                'respuesta_hueso_nasal_valor' => $respuesta->hueso_nasal,
                'respuesta_hueso_nasal' => $respuesta->respuesta_hueso_nasal,
                'respuesta_ductus_venoso' => $respuesta->respuesta_ductus_venoso,
                'respuesta_reflujo_tricuspideo' => $respuesta->respuesta_reflujo_tricuspideo,
                'uterina_derecha' => $respuesta->uterina_derecha,
                'uterina_derecha_percentil' => $respuesta->uterina_derecha_percentil,
                'uterina_izquierda' => $respuesta->uterina_izquierda,
                'uterina_izquierda_percentil' => $respuesta->uterina_izquierda_percentil,
                'uterinas' => $respuesta->uterinas,
                'uterinas_percentil' => $respuesta->uterinas_percentil,
                'ecografista' => $respuesta->ecografista,
                'comentariosexamen' => $respuesta->comentariosexamen,
                'dbp' => $respuesta->dbp,
                'cc' => $respuesta->cc,
                'cc_pct' => $respuesta->cc_pct,
                'ca' => $respuesta->ca,
                'ca_pct' => $respuesta->ca_pct,
                'lf' => $respuesta->lf,
                'lf_pct' => $respuesta->lf_pct,
                'enviar' => true
            ));

            $respuesta = RespuestaModel::getRespuesta($solicitud_id);
            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];

            //grafico_uno lcn
            //grafico_tres dbp
            $grafico_uno = ($respuesta->lcn > 0) ? array($respuesta->eg => $respuesta->lcn) : array();
            $grafico_dos = ($respuesta->uterinas > 0) ? array($respuesta->eg => $respuesta->uterinas) : array();
            $grafico_tres = ($respuesta->cc > 0) ? array($respuesta->eg => $respuesta->cc) : array();
            $grafico_cuatro = ($respuesta->ca > 0) ? array($respuesta->eg => $respuesta->ca) : array();

            $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/once_catorce_grafico_view', 
            array(
                'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
                'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
                'respuesta' => $respuesta,
                'grafico_uno' => GraphModel::lcn_once($grafico_uno),
                'grafico_dos' => GraphModel::uterinas_once($grafico_dos),
                'grafico_tres' => GraphModel::cc_once($grafico_tres),
                'grafico_cuatro' => GraphModel::ca_once($grafico_cuatro),
                'enviar' => true
            ));

            $Subject = 'Solicitud de ecografia 11-14';
        }

        $mail = new PHPMailer;
        $mail->CharSet = 'UTF-8';

        if (Config::get('EMAIL_USE_SMTP')) {
            $mail->IsSMTP();
            $mail->SMTPDebug = 0;
            $mail->SMTPAuth = Config::get('EMAIL_SMTP_AUTH');
            if (Config::get('EMAIL_SMTP_ENCRYPTION')) {
                $mail->SMTPSecure = Config::get('EMAIL_SMTP_ENCRYPTION');
            }
            $mail->Host = Config::get('EMAIL_SMTP_HOST');
            $mail->Username = Config::get('EMAIL_SMTP_USERNAME');
            $mail->Password = Config::get('EMAIL_SMTP_PASSWORD');
            $mail->Port = Config::get('EMAIL_SMTP_PORT');
        } else {
            $mail->IsMail();
        }

        $mail->From = Config::get('EMAIL_VERIFICATION_FROM_EMAIL');
        $mail->FromName = Config::get('EMAIL_VERIFICATION_FROM_NAME');
        $mail->AddAddress($email);
        $mail->Subject = $Subject;
        $mail->Body = "Se adjunta lo solicitado";

        $attach = Config::get('PATH_AVATARS');
        $mail->AddAttachment("$attach/informe.pdf", $name = 'Informe.pdf',  $encoding = 'base64', $type = 'application/pdf');

        if ($informe == "1"){
            $mail->AddAttachment("$attach/grafica.pdf", $name = 'Gráfico.pdf',  $encoding = 'base64', $type = 'application/pdf');
        }

        $wasSendingSuccessful = $mail->Send();

        if ($wasSendingSuccessful) {
            $response->result= true;
        } else {
            $response->result = false;
        }

        return $response;
    }
}
