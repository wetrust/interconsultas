<?php
    // set document information
    $this->pdf->SetCreator(PDF_CREATOR);
    $this->pdf->SetAuthor('WT');
    $this->pdf->SetTitle('Evaluación ecográfica del crecimiento fetal');
    $this->pdf->SetSubject('TCPDF Tutorial');
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
    
    $fecha = explode("-", $this->respuesta_fecha);
    $fecha = $fecha[2] . "-". $fecha[1]. "-". $fecha[0];

    $html = '<h2 style="border-bottom:4px double #000;text-align: center;"><strong>RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA OBSTÉTRICA</strong></h2>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<h2 style="border-bottom:1px double #000;text-align: left;">A- Formulario referencia para evaluación ecográfica del crecimiento fetal</h2>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    $solicitud_fecha = explode("-", $this->solicitud->solicitud_fecha);
    $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];

    $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->solicitud->solicitud_nombre).' RUT (DNI): '.htmlentities($this->solicitud->solicitud_rut).' Fecha de solicitud: '.htmlentities($solicitud_fecha).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $solicitud_fum = explode("-", $this->solicitud->solicitud_fum);
    $solicitud_fum = $solicitud_fum[2] . "-". $solicitud_fum[1]. "-". $solicitud_fum[0];

    $html = '<table><tbody><tr><td>FUM Operacional: '.$solicitud_fum.'</td><td>Edad Gestacional: '.htmlentities($this->solicitud->solicitud_egestacional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<p>Diagnóstico de referencia:  '.htmlentities($this->solicitud->solicitud_diagnostico).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Ciudad procedencia: '.htmlentities($this->solicitud->solicitud_ciudad).'</td><td>Lugar de control: '.htmlentities($this->solicitud->solicitud_lugar).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td>Profesional referente '.htmlentities($this->solicitud->solicitud_profesional).'</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombreprofesional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_email).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);

    $html = '<table><tbody><tr><td>Ecografista de contrarreferencia</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombre_referente).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_profesionalemail).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $evaluacion_fecha = explode("-", $this->solicitud_evaluacion->evaluacion_fecha);
    $evaluacion_fecha = $evaluacion_fecha[2] . "-". $evaluacion_fecha[1]. "-". $evaluacion_fecha[0];
    $this->pdf->Ln(4);
    $html = '<h2 style="border-bottom:1px double #000;text-align: left;">B- Contrarreferencia inicial desde unidad de ultrasonografía gineco obstétrica</h2>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><h3>Evaluación de solicitud ecográfica</h3></td><td>Fecha: '. $evaluacion_fecha.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>- Comentario:</strong> '.htmlentities($this->solicitud_evaluacion->evaluacion_comentarios).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);

    $html = '<h2 style="border-bottom:1px double #000;text-align: left;">C- Respuesta de profesional contrarreferente a solicitud de exámen ecográfico</h2>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>Fecha de exámen</strong>: '. $fecha.'</td><td>Edad Gestacional al Exámen: '. $this->respuesta_eg.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>Placenta</strong>: '. $this->respuesta_placenta.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>Líquido amniótico</strong>: '. $this->respuesta_liquido_amniotico.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>DBP</strong>: '. $this->respuesta_dbp.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>CC</strong>: '. $this->respuesta_cc.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>CA</strong>: '. $this->respuesta_ca.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>LF</strong>: '. $this->respuesta_lf.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>PFE</strong>: '. $this->respuesta_pfe.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>CC/CA</strong>: '. $this->respuesta_ccca.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>Comentarios y observaciones</strong></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = strip_tags($this->comentariosexamen);
    $html = str_replace("\n", "<br>", $html);
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td style="width:450px"></td><td>Ecografista: '.htmlentities($this->ecografista).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(4);
    $html = '<p>Informe generado desde software crecimientofetal.cl, el objetivo de este, es favorecer análisis preeliminar de datos obtenidos en el examen ecográfico, la interpretación clínica de los resultados es responsabilidad fundamentalmente de quien procesa esta información, profesional referente.</p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);

    $tmp = Config::get('PATH_AVATARS');
    //$this->pdf->Output("$tmp/informe.pdf", "F");
    $this->pdf->Output('Informe.pdf', 'I');

    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));

    //echo $base64;

    //Edad gestacional actual
    //htmlentities($this->solicitud_resultado->eg)