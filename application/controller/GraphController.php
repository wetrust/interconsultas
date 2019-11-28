<?php

class GraphController extends Controller
{
    public function __construct(){
        parent::__construct();
    }

    public function informe_dopplercrecimiento($solicitud_id){
        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
        $respuesta->eg = explode (".", $respuesta->eg);
        $respuesta->eg = $respuesta->eg[0];

        $grafico_uno = ($respuesta->pfe > 0) ? array($respuesta->eg => $respuesta->pfe) : array();
        $grafico_dos = ($respuesta->respuesta_bvm > 0) ? array($respuesta->eg => $respuesta->respuesta_bvm) : array();
        $grafico_tres = ($respuesta->uterinas > 0) ? array($respuesta->eg => $respuesta->uterinas) : array();
        $grafico_cuatro = ($respuesta->umbilical > 0) ? array($respuesta->eg => $respuesta->umbilical) : array();
        $grafico_cinco = ($respuesta->cm > 0) ? array($respuesta->eg => $respuesta->cm) : array();
        $grafico_seis = ($respuesta->cmau > 0) ? array($respuesta->eg => $respuesta->cmau) : array();

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'respuesta' => $respuesta,
            'grafico_uno' => GraphModel::pesoFetal($grafico_uno),
            'grafico_dos' => GraphModel::bvm($grafico_dos),
            'grafico_tres' => GraphModel::uterinas($grafico_tres),
            'grafico_cuatro' => GraphModel::umbilical($grafico_cuatro),
            'grafico_cinco' => GraphModel::cerebralMedia($grafico_cinco),
            'grafico_seis' => GraphModel::cuocienteCerebroPlacentario($grafico_seis),
        ));
    }

    public function informe_dopplercrecimiento_rut($solicitud_rut){
        $respuestas = RespuestaModel::getRespuestas($solicitud_rut, 0);

        $grafico_uno = array(); $grafico_dos = array(); $grafico_tres = array(); $grafico_cuatro = array(); $grafico_cinco = array(); $grafico_seis = array();

        foreach ($respuestas as $respuesta) {
            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];

            if ($respuesta->pfe > 0){
                $grafico_uno[$respuesta->eg] = $respuesta->pfe;
            }
            if ($respuesta->respuesta_bvm > 0){
                $grafico_dos[$respuesta->eg] = $respuesta->respuesta_bvm;
            }
            if ($respuesta->uterinas > 0){
                $grafico_tres[$respuesta->eg] = $respuesta->uterinas;
            }
            if ($respuesta->umbilical > 0){
                $grafico_cuatro[$respuesta->eg] = $respuesta->umbilical;
            }
            if ($respuesta->cm > 0){
                $grafico_cinco[$respuesta->eg] = $respuesta->cm;
            }
            if ($respuesta->cmau > 0){
                $grafico_seis[$respuesta->eg] = $respuesta->cmau;
            }
        }

        $respuestas = $respuestas[count($respuestas)-1];

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud_nombre' => $respuestas->solicitud_nombre,
            'solicitud_apellido' => $respuestas->solicitud_apellido,
            'solicitud_rut' => $respuestas->solicitud_rut,
            'grafico_uno' => GraphModel::pesoFetal($grafico_uno),
            'grafico_dos' => GraphModel::bvm($grafico_dos),
            'grafico_tres' => GraphModel::uterinas($grafico_tres),
            'grafico_cuatro' => GraphModel::umbilical($grafico_cuatro),
            'grafico_cinco' => GraphModel::cerebralMedia($grafico_cinco),
            'grafico_seis' => GraphModel::cuocienteCerebroPlacentario($grafico_seis),
        ));
    }

    public function informe_dopplercrecimiento_rut_send(){
        $solicitud_rut = Request::post('solicitud_rut');
        $email = Request::post('email');
        $modal = Request::post('modal');
        $adjuntar = Request::post('adjuntar');

        $respuestas = RespuestaModel::getRespuestas($solicitud_rut, 0);
        
        $grafico_uno = array();
        $grafico_dos = array();
        $grafico_tres = array();
        $grafico_cuatro = array();
        $grafico_cinco = array();
        $grafico_seis = array();

        foreach ($respuestas as $respuesta) {
            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];

            if ($respuesta->pfe > 0){
                $grafico_uno[$respuesta->eg] = $respuesta->pfe;
            }
            if ($respuesta->respuesta_bvm > 0){
                $grafico_dos[$respuesta->eg] = $respuesta->respuesta_bvm;
            }
            if ($respuesta->uterinas > 0){
                $grafico_tres[$respuesta->eg] = $respuesta->uterinas;
            }
            if ($respuesta->umbilical > 0){
                $grafico_cuatro[$respuesta->eg] = $respuesta->umbilical;
            }
            if ($respuesta->cm > 0){
                $grafico_cinco[$respuesta->eg] = $respuesta->cm;
            }
            if ($respuesta->cmau > 0){
                $grafico_seis[$respuesta->eg] = $respuesta->cmau;
            }
        }

        $response = new stdClass();
        $internalView = new View;

        $response->result = false;

        $respuestas = $respuestas[count($respuestas)-1];

        $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/index_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud_nombre' => $respuestas->solicitud_nombre,
            'solicitud_apellido' => $respuestas->solicitud_apellido,
            'solicitud_rut' => $respuestas->solicitud_rut,
            'grafico_uno' => GraphModel::pesoFetal($grafico_uno),
            'grafico_dos' => GraphModel::bvm($grafico_dos),
            'grafico_tres' => GraphModel::uterinas($grafico_tres),
            'grafico_cuatro' => GraphModel::umbilical($grafico_cuatro),
            'grafico_cinco' => GraphModel::cerebralMedia($grafico_cinco),
            'grafico_seis' => GraphModel::cuocienteCerebroPlacentario($grafico_seis),
            'enviar' => true
        ));

        $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/index_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($respuestas->solicitud_id),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($respuestas->solicitud_id),
            'solicitud_resultado' => $respuestas,
            'enviar' => true
        ));

        $titulo_email = "Sistema interconsulta";
        $body = "Sistema interconsulta adjunta gráficas de exámen ecográfico" ;

        $mail = new PHPMailer;
        $mail->CharSet = 'UTF-8';

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

        $mail->From = Config::get('EMAIL_VERIFICATION_FROM_EMAIL');
        $mail->FromName = Config::get('EMAIL_VERIFICATION_FROM_NAME');
        $mail->AddAddress($email);
        $mail->Subject = $titulo_email;
        $mail->Body = $body;
    
        $attach = Config::get('PATH_AVATARS');

        if ($adjuntar == "1"){
            $mail->AddAttachment("$attach/informe.pdf", $name = 'Informe.pdf',  $encoding = 'base64', $type = 'application/pdf');
        }

        $mail->AddAttachment("$attach/grafica.pdf", $name = 'Gráfica.pdf',  $encoding = 'base64', $type = 'application/pdf');
    
        $wasSendingSuccessful = $mail->Send();

        if ($wasSendingSuccessful) {
            $response->result= true;

        } else {
            $response->result = false;
        }

        $response->modal = $modal;

        $this->View->renderJSON($response);

    }

    public function informe_segundotrimestre($solicitud_id){
        $respuesta = RespuestaModel::getRespuesta($solicitud_id);
        $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
        $respuesta->eg = explode (".", $respuesta->eg);
        $respuesta->eg = $respuesta->eg[0];

        $grafico_uno = ($respuesta->cc > 0) ? array($respuesta->eg => $respuesta->cc) : array();
        $grafico_dos = ($respuesta->ca > 0) ? array($respuesta->eg => $respuesta->ca) : array();
        $grafico_tres = ($respuesta->lf > 0) ? array($respuesta->eg => $respuesta->lf) : array();
        $grafico_cuatro = ($respuesta->respuesta_lh > 0) ? array($respuesta->eg => $respuesta->respuesta_lh) : array();
        $grafico_cinco = ($respuesta->pfe_segundo > 0) ? array($respuesta->eg => $respuesta->pfe_segundo) : array();
        $grafico_seis = ($respuesta->respuesta_bvm > 0) ? array($respuesta->eg => $respuesta->respuesta_bvm) : array();

        $grafico_seis = GraphModel::bvm($grafico_seis);

        if (strlen($respuesta->uterinas_percentil) > 1){
            $grafico_seis = ($respuesta->uterinas > 0) ? array($respuesta->eg => $respuesta->uterinas) : array();
            $grafico_seis = GraphModel::uterinas($grafico_seis);
        }

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'respuesta' => $respuesta,
            'grafico_uno' => GraphModel::pesoFetal($grafico_cinco),
            'grafico_dos' => $grafico_seis,
            'grafico_tres' => GraphModel::cc($grafico_uno),
            'grafico_cuatro' => GraphModel::ca($grafico_dos),
            'grafico_cinco' => GraphModel::lf($grafico_tres),
            'grafico_seis' => GraphModel::lh($grafico_cuatro),
        ));
    }

    public function informe_segundotrimestre_rut($solicitud_rut){
        $respuestas = RespuestaModel::getRespuestas($solicitud_rut, 2);
        
        $grafico_uno = array();
        $grafico_dos = array();
        $grafico_tres = array();
        $grafico_cuatro = array();
        $grafico_cinco = array();
        $grafico_seis = array();

        $uterinas = false;
        $grafico_uterinas = array();
        $grafico_bvm = array();

        foreach ($respuestas as $respuesta) {
            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];

            if ($respuesta->cc > 0){
                $grafico_uno[$respuesta->eg] = $respuesta->cc;
            }
            if ($respuesta->ca > 0){
                $grafico_dos[$respuesta->eg] = $respuesta->ca;
            }
            if ($respuesta->lf > 0){
                $grafico_tres[$respuesta->eg] = $respuesta->lf;
            }
            if ($respuesta->respuesta_lh > 0){
                $grafico_cuatro[$respuesta->eg] = $respuesta->respuesta_lh;
            }
            if ($respuesta->pfe_segundo > 0){
                $grafico_cinco[$respuesta->eg] = $respuesta->pfe_segundo;
            }

            if (strlen($respuesta->uterinas_percentil) > 1){
                $uterinas = true;
            }

            if ($uterinas == true && strlen($respuesta->uterinas_percentil) > 1){
                $grafico_uterinas[$respuesta->eg] = $respuesta->uterinas;
            }else if ($respuesta->respuesta_bvm > 0){
                $grafico_bvm[$respuesta->eg] = $respuesta->respuesta_bvm;
            }
        }

        $respuestas = $respuestas[count($respuestas)-1];

        if ($uterinas == true){
            $grafico_seis = GraphModel::uterinas($grafico_uterinas);
        }else{
            $grafico_seis = GraphModel::bvm($grafico_bvm);
        }

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud_nombre' => $respuestas->solicitud_nombre,
            'solicitud_apellido' => $respuestas->solicitud_apellido,
            'solicitud_rut' => $respuestas->solicitud_rut,
            'grafico_uno' => GraphModel::pesoFetal($grafico_cinco),
            'grafico_dos' => $grafico_seis,
            'grafico_tres' => GraphModel::cc($grafico_uno),
            'grafico_cuatro' => GraphModel::ca($grafico_dos),
            'grafico_cinco' => GraphModel::lf($grafico_tres),
            'grafico_seis' => GraphModel::lh($grafico_cuatro),
        ));
    }

    public function informe_segundotrimestre_rut_send(){
        $solicitud_rut = Request::post('solicitud_rut');
        $email = Request::post('email');
        $modal = Request::post('modal');
        $adjuntar = Request::post('adjuntar');
        $uterinas = false;
        
        $respuestas = RespuestaModel::getRespuestas($solicitud_rut, 2);
        
        $grafico_uno = array();
        $grafico_dos = array();
        $grafico_tres = array();
        $grafico_cuatro = array();
        $grafico_cinco = array();
        $grafico_seis = array();

        $grafico_bvm  = array();
        $grafico_uterinas  = array();

        foreach ($respuestas as $respuesta) {
            $respuesta->eg = str_replace(" semanas", "", $respuesta->eg);
            $respuesta->eg = explode (".", $respuesta->eg);
            $respuesta->eg = $respuesta->eg[0];

            if ($respuesta->cc > 0){
                $grafico_uno[$respuesta->eg] = $respuesta->cc;
            }
            if ($respuesta->ca > 0){
                $grafico_dos[$respuesta->eg] = $respuesta->ca;
            }
            if ($respuesta->lf > 0){
                $grafico_tres[$respuesta->eg] = $respuesta->lf;
            }
            if ($respuesta->respuesta_lh > 0){
                $grafico_cuatro[$respuesta->eg] = $respuesta->respuesta_lh;
            }
            if ($respuesta->pfe_segundo > 0){
                $grafico_cinco[$respuesta->eg] = $respuesta->pfe_segundo;
            }

            if (strlen($respuesta->uterinas_percentil) > 1){
                $uterinas = true;
            }

            if ($uterinas == true && strlen($respuesta->uterinas_percentil) > 1){
                $grafico_uterinas[$respuesta->eg] = $respuesta->uterinas;
            }else if ($respuesta->respuesta_bvm > 0){
                $grafico_bvm[$respuesta->eg] = $respuesta->respuesta_bvm;
            }
        }

        if ($uterinas == true){
            $grafico_seis = GraphModel::uterinas($grafico_uterinas);
        }else{
            $grafico_seis = GraphModel::bvm($grafico_bvm);
        }

        $respuestas = $respuestas[count($respuestas)-1];

        $response = new stdClass();
        $internalView = new View;

        $response->result = false;

        $internalView->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_grafico_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud_nombre' => $respuestas->solicitud_nombre,
            'solicitud_apellido' => $respuestas->solicitud_apellido,
            'solicitud_rut' => $respuestas->solicitud_rut,
            'grafico_uno' => GraphModel::pesoFetal($grafico_cinco),
            'grafico_dos' => $grafico_seis,
            'grafico_tres' => GraphModel::cc($grafico_uno),
            'grafico_cuatro' => GraphModel::ca($grafico_dos),
            'grafico_cinco' => GraphModel::lf($grafico_tres),
            'grafico_seis' => GraphModel::lh($grafico_cuatro),
            'enviar' => true
        ));

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/segundotrimestre_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($respuestas->solicitud_id),
            'solicitud_evaluacion' => EvaluacionModel::getEvaluacion($respuestas->solicitud_id),
            'respuesta_placenta' => $respuestas->placenta,
            'respuesta_placenta_insercion' => $respuestas->placenta_insercion,
            'respuesta_liquido_amniotico' => $respuestas->liquido_amniotico,
            'respuesta_dbp' => $respuestas->dbp,
            'respuesta_cc' => $respuestas->cc,
            'respuesta_cc_pct' => $respuestas->cc_pct,
            'respuesta_ca' => $respuestas->ca,
            'respuesta_ca_pct' => $respuestas->ca_pct,
            'respuesta_lf' => $respuestas->lf,
            'respuesta_lf_pct' => $respuestas->lf_pct,
            'respuesta_pfe' => $respuestas->pfe_segundo,
            'respuesta_pfe_pct' => $respuestas->pfe_pct_segundo,
            'respuesta_ccca' => $respuestas->ccca,
            'respuesta_ccca_pct' => $respuestas->ccca_pct,
            'respuesta_fecha' => $respuestas->fecha,
            'respuesta_eg' => $respuestas->eg,
            'respuesta_fcf' => $respuestas->respuesta_fcf,
            'ecografista' => $respuestas->ecografista,
            'comentariosexamen' => $respuestas->comentariosexamen,
            'respuesta_presentacion' => $respuestas->presentacion_segundo,
            'respuesta_dorso_segundo' => $respuestas->dorso_segundo,
            'respuesta_anatomia_segundo' => $respuestas->anatomia_segundo,
            'anatomia_fetal_extra' => $respuestas->anatomia_extra,
            'respuesta_hipotesis' => $respuestas->hipotesis_segundo,
            'respuesta_dof' => $respuestas->respuesta_dof,
            'respuesta_ic' => $respuestas->respuesta_ic,
            'respuesta_bvm' => $respuestas->respuesta_bvm,
            'respuesta_lh' => $respuestas->respuesta_lh,
            'respuesta_lh_pct' => $respuestas->respuesta_lh_pct,
            'respuesta_cerebelo' => $respuestas->respuesta_cerebelo,
            'respuesta_cerebelo_pct' => $respuestas->respuesta_cerebelo_pct,
            'respuesta_sexo_fetal' => $respuestas->sexo_fetal,
            'uterinas' => $respuestas->uterinas,
            'uterinas_percentil' => $respuestas->uterinas_percentil,
            'respuesta_atrio_posterior' => $respuestas->respuesta_atrio_posterior,
            'respuesta_atrio_posterior_mm' => $respuestas->respuesta_atrio_posterior_mm,
            'respuesta_cerebelo_text' => $respuestas->respuesta_cerebelo_text,
            'respuesta_cisterna_m' => $respuestas->respuesta_cisterna_m,
            'respuesta_cisterna_m_mm' => $respuestas->respuesta_cisterna_m_mm,
            'enviar' => true
        ));

        $titulo_email = "Sistema interconsulta";
        $body = "Sistema interconsulta adjunta gráficas de exámen ecográfico" ;

        $mail = new PHPMailer;
        $mail->CharSet = 'UTF-8';

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

        $mail->From = Config::get('EMAIL_VERIFICATION_FROM_EMAIL');
        $mail->FromName = Config::get('EMAIL_VERIFICATION_FROM_NAME');
        $mail->AddAddress($email);
        $mail->Subject = $titulo_email;
        $mail->Body = $body;
    

        $attach = Config::get('PATH_AVATARS');
        
        if ($adjuntar == "1"){
            $mail->AddAttachment("$attach/informe.pdf", $name = 'Informe.pdf',  $encoding = 'base64', $type = 'application/pdf');
        }

        $mail->AddAttachment("$attach/grafica.pdf", $name = 'Gráfica.pdf',  $encoding = 'base64', $type = 'application/pdf');
    
        $wasSendingSuccessful = $mail->Send();

        if ($wasSendingSuccessful) {
            $response->result= true;

        } else {
            $response->result = false;
        }

        $response->modal = $modal;

        $this->View->renderJSON($response);
    }

    public function informe_once_catorce($solicitud_id){
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

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/once_catorce_grafico_view', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'solicitud' => SolicitudesModel::getSolicitud($solicitud_id),
            'respuesta' => $respuesta,
            'grafico_uno' => GraphModel::lcn_once($grafico_uno),
            'grafico_dos' => GraphModel::uterinas_once($grafico_dos),
            'grafico_tres' => GraphModel::cc_once($grafico_tres),
            'grafico_cuatro' => GraphModel::ca_once($grafico_cuatro)
        ));
    }

    public function informe_parto($solicitud_id){
        $respuesta = PartosModel::getPartos($solicitud_id);
        $paciente = SolicitudesModel::getOldSolicitudes($solicitud_id);

        $this->View->renderWithoutHeaderAndFooter('pdf/finalinforme/parto_ver', 
        array(
            'pdf' => new PdfModel(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false),
            'paciente' => $paciente,
            'parto' => $respuesta,
            'grafico_uno' => GraphModel::pesoNacionalRN($respuesta->semanas, $respuesta->pesofetal),
            'grafico_dos' => GraphModel::ipnNacionalRN($respuesta->semanas, $respuesta->ipn),
            'grafico_tres' => GraphModel::tallaNacionalRN($respuesta->semanas, ($respuesta->tallafetal / 10)),
            'grafico_cuatro' => GraphModel::craneoNacionalRN($respuesta->semanas, $respuesta->craneofetal) 
        ));
    }
}
