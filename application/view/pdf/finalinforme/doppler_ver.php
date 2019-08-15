<?php
    // set document information
    $this->pdf->SetCreator(PDF_CREATOR);
    $this->pdf->SetAuthor('WT');
    $this->pdf->SetTitle('Evaluación ecográfica del crecimiento fetal');
    $this->pdf->SetSubject('');
    $this->pdf->SetKeywords('TCPDF, PDF, example, test, guide');

    // set default header data
    //$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 009', PDF_HEADER_STRING);

    // set header and footer fonts
    //$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
    //$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

    // set default monospaced font
    $this->pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // set margins
    $this->pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
    $this->pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    $this->pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
    $this->pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

    // -------------------------------------------------------------------

    // add a page
    $this->pdf->AddPage('P', 'LETTER');

    // set JPEG quality
    $this->pdf->setJPEGQuality(90);

    $this->pdf->SetFont('Helvetica', '', 9);
    
    $solicitud_fecha = explode("-", $this->solicitud->solicitud_fecha);
    $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];

    $solicitud_fum = explode("-", $this->solicitud->solicitud_fum);
    $solicitud_fum = $solicitud_fum[2] . "-". $solicitud_fum[1]. "-". $solicitud_fum[0];

    $fecha = explode("-", $this->respuesta_fecha);
    $fecha = $fecha[2] . "-". $fecha[1]. "-". $fecha[0];

    $html = '<h3 style="border-bottom:2px double #000;text-align: center;">RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA DOPPLER 11 - 14 SEMANAS</h3>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);

    $html = '<h4 style="border-bottom:1px solid #000;color:#0275d8;">A- Formulario referencia para evaluación ecográfica edad gestacional 11 - 14</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->solicitud->solicitud_nombre).'</td><td>RUT (DNI): '.htmlentities($this->solicitud->solicitud_rut).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Fecha de solicitud: '.$solicitud_fecha.'</td><td>FUR Referida: '.$solicitud_fum.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Edad Gestacional: '.htmlentities($this->solicitud->solicitud_egestacional).'</td><td>Diagnóstico de referencia: '.htmlentities($this->solicitud->solicitud_diagnostico).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Ciudad procedencia: '.htmlentities($this->solicitud->solicitud_ciudad).'</td><td>Lugar de control: '.htmlentities($this->solicitud->solicitud_lugar).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td style="background-color:#eceeef;">Referente a exámen: '.htmlentities($this->solicitud->solicitud_profesional).'</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombreprofesional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_email).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td style="background-color:#eceeef;">Ecografista de contrarreferencia</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombre_referente).'</td></tr><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_profesionalemail).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);

    $html = '<h4 style="border-bottom:1px solid #000;color:#0275d8;">B- Respuesta final de profesional contrarreferente a solicitud de exámen ecográfico</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    
    $html = '<table><tbody><tr><td>Edad Gestacional: '. htmlentities($this->respuesta_eg) .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td>Embrión: '. htmlentities($this->respuesta_embrion) .'</td><td>FCF: '. htmlentities($this->respuesta_fcf) .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Anatomía fetal: '.htmlentities($this->respuesta_anatomia). " ".htmlentities($this->respuesta_anatomia_extra).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td><strong><em>Biometría ecográfica</em></strong></td><td>LCN: *</td><td>'.htmlentities($this->respuesta_lcn).' mm.</td><td>EG x LCN: '.htmlentities($this->respuesta_lcn_eg).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td></td><td>IP Uterina Derecha:</td><td>'.htmlentities($this->uterina_derecha).'</td><td>Percentil: '.$this->uterina_derecha_percentil.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>IP Uterina Izquierda:</td><td>'.htmlentities($this->uterina_izquierda).'</td><td>Percentil: '.$this->uterina_izquierda_percentil.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>IP Uterina Promedio: **</td><td>'.htmlentities($this->uterinas).'</td><td>Percentil: '.$this->uterinas_percentil.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $translucencia = "";
    if (strlen($this->respuesta_translucencia_nucal) > 0){
        $translucencia =  $this->respuesta_translucencia_nucal . " mm";
    }
    
    $html = '<table><tbody><tr><td></td><td>Translucidez Nucal: </td><td>'.htmlentities($this->respuesta_dbp).'</td><td>'. $translucencia .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    if (strlen($this->respuesta_hueso_nasal_valor) > 0){
        $this->respuesta_hueso_nasal_valor =  $this->respuesta_hueso_nasal_valor . " mm";
    }
    $html = '<table><tbody><tr><td></td><td>Hueso Nasal: </td><td>'.htmlentities($this->respuesta_cc) .'</td><td>'. $this->respuesta_hueso_nasal_valor .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>Ductus venoso: </td><td>'.htmlentities($this->respuesta_ca).'</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>Reflujo tricuspídeo: </td><td>'.htmlentities($this->respuesta_lf).'</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    
    $this->pdf->Ln(4);

    $_html = strip_tags($this->comentariosexamen);
    $_html = str_replace("\n", "<br>", $_html);

    $html = '<table><tbody><tr><td style="width:170px"><strong><em>Comentarios y observaciones:</em></strong></td><td style="width:450px">' . $_html .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(8);

    $html = '<table><tbody><tr><td style="width:450px"></td><td>Ecografista: '.htmlentities($this->ecografista).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);

    $edadGestacional = str_replace(",", ".",$this->solicitud->solicitud_egestacional);
    $edadGestacional = explode(".", $edadGestacional);

    if (is_array($edadGestacional) == true){
        if (count($edadGestacional) == 1){
            $edadGestacional = intval($edadGestacional[0]) * 7;
        }else if (count($edadGestacional) == 2){
            $edadGestacional = (intval($edadGestacional[0]) * 7) + intval($edadGestacional[1]);
        }
    }else{
        $edadGestacional = $edadGestacional * 7; 
    }
    
    if ($edadGestacional < 181){
        $onceSemanas = 154 - $edadGestacional;
        $catorceSemanas = 181 - $edadGestacional;
        //sumar esos días a la fecha de exámen
        $onceSemanas =  date('d-m-Y', strtotime($this->solicitud->solicitud_fecha. ' + '.$onceSemanas.' days'));
        $catorceSemanas =  date('d-m-Y', strtotime($this->solicitud->solicitud_fecha. ' + '.$catorceSemanas.' days'));
        //$solicitud_fecha_examen =  $this->solicitud->solicitud_fecha. ' + '.$edadGestacional.' days';

        $html = '<br>* Exámen ecográfico para 22 - 26 semanas corresponde entre las fechas '.$onceSemanas.' al '.$catorceSemanas;
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(4);
    }

    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $html = '<p>*Referencia Edad menstrual por LCN Hadlock FP, Shan YP, Kanon JD y cols.: Radiology 182:501, 1992.<br>** Referencia para Doppler promedio de arterias uterinas: Gómes O., Figueras F., Fernandez S., Bennasar M, Martínez JM.,<br>Puerto B., Gratacos E., UOG 2008; 32: 128-32<br><br>Informe generado desde software crecimientofetal.cl, el objetivo de este es favorecer análisis preeliminar de los datos, la interpretación de los resultados es responsabilidad fundamentalmente del profesional referente a exámen ecográfico.<br>Profesional quien finalmente evaluará clínicamente la información contenida en este exámen.</p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    
    //para enviar por email
    //$tmp = Config::get('PATH_AVATARS');
    //if (file_exists("$tmp/informe.pdf")) unlink("$tmp/informe.pdf");
    //$this->pdf->Output("$tmp/informe.pdf", "F");
    /////////

    //para visualizar en el navegador
    $this->pdf->Output('Informe.pdf', 'I');
    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));
    //echo $base64;
    //////////