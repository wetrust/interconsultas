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

    $html = '<h2 style="border-bottom:4px double #000;text-align: center;"><strong>RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA OBSTÉTRICA DE CRECIMIENTO</strong></h2>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<h4 style="border-bottom:1px solid #000;color:#0275d8;">A- Formulario referencia para evaluación ecográfica de segundo / tercer trimestre</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    $solicitud_fecha = explode("-", $this->solicitud->solicitud_fecha);
    $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];

    $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->solicitud->solicitud_nombre).' RUT (DNI): '.htmlentities($this->solicitud->solicitud_rut).' Fecha de solicitud: '.htmlentities($solicitud_fecha).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $solicitud_fum = explode("-", $this->solicitud->solicitud_fum);
    $solicitud_fum = $solicitud_fum[2] . "-". $solicitud_fum[1]. "-". $solicitud_fum[0];

    $html = '<table><tbody><tr><td>FUR Referida: '.$solicitud_fum.'</td><td>Edad Gestacional: '.htmlentities($this->solicitud->solicitud_egestacional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<p>Diagnóstico de referencia:  '.htmlentities($this->solicitud->solicitud_diagnostico).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Ciudad procedencia: '.htmlentities($this->solicitud->solicitud_ciudad).'</td><td>Lugar de control: '.htmlentities($this->solicitud->solicitud_lugar).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td>Profesional referente: '.htmlentities($this->solicitud->solicitud_profesional).'</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombreprofesional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_email).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);

    $html = '<table><tbody><tr><td>Ecografista de contrarreferencia</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombre_referente).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_profesionalemail).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);

    $evaluacion_fecha = explode("-", $this->solicitud_evaluacion->evaluacion_fecha);
    $evaluacion_fecha = $evaluacion_fecha[2] . "-". $evaluacion_fecha[1]. "-". $evaluacion_fecha[0];

    $html = '<h4 style="border-bottom:1px solid #000;color:#0275d8;">B- Contrarreferencia inicial desde unidad de ultrasonografía gineco obstétrica</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td>Evaluación de solicitud ecográfica: '. $evaluacion_fecha .'</td><td>Comentario: ' . $this->solicitud_evaluacion->evaluacion_comentarios.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);

    $html = '<h4 style="border-bottom:1px solid #000;color:#0275d8;">C- Respuesta final de profesional contrarreferente a solicitud de exámen ecográfico</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    
    $html = '<table><tbody><tr><td>Edad Gestacional al exámen: '. htmlentities($this->respuesta_eg) .'</td><td>Feto en presentación: '.htmlentities($this->respuesta_presentacion).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Dorso Fetal: '.htmlentities($this->respuesta_dorso_segundo).'</td><td>Líquido amniótico: '.htmlentities($this->respuesta_liquido_amniotico).'</td><td>Placenta: '. $this->respuesta_placenta. ', '.$this->respuesta_placenta_insercion.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Anatomía fetal: '.htmlentities($this->respuesta_anatomia_segundo)." ".htmlentities($this->anatomia_fetal_extra).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    
    $html = '<table><tbody><tr><td><strong><em>Biometría ecográfica</em></strong></td><td>DBP:</td><td>'. $this->respuesta_dbp.' mm</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td></td><td>CC:</td><td>'. $this->respuesta_cc.' mm.</td><td>Percentil: '. $this->respuesta_cc_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>CA:</td><td>'. $this->respuesta_ca. ' mm.</td><td>Percentil: '. $this->respuesta_ca_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>LF:</td><td>'. $this->respuesta_lf.' mm.</td><td>Percentil: '. $this->respuesta_lf_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>PFE:</td><td>'. $this->respuesta_pfe.' gr.</td><td>Percentil: '. $this->respuesta_pfe_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>CC/CA:</td><td>'. $this->respuesta_ccca.'</td><td>Percentil: '. $this->respuesta_ccca_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td style="width:162px"><strong><em>Hipótesis diagnóstica</em></strong></td><td style="width:450px">Crecimiento fetal: '.htmlentities($this->respuesta_hipotesis).' *</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td style="width:162px"></td><td style="width:450px">Cc/Ca: '.htmlentities($this->respuesta_crecimiento_ccca).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td style="width:162px"></td><td style="width:450px">Líquido amniótico: '.htmlentities($this->respuesta_liquido_amniotico).'</td></tr></tbody></table>';
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
    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $html = '<p>* Gráfica de referencia para PFE, Hadlock F P y col. 1991; Radiology 181 : 129 - 133 (Normalidad Pct 10 a 90)<br><br>Informe generado desde software crecimientofetal.cl, el objetivo de este, es favorecer análisis preeliminar de datos obtenidos en el examen ecográfico, la interpretación clínica de los resultados es responsabilidad fundamentalmente del profesional referente quien finalmente evalua la información contenida en este reporte.</p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);

    $tmp = Config::get('PATH_AVATARS');
    if (file_exists("$tmp/informe.pdf")) unlink("$tmp/informe.pdf");
    $this->pdf->Output("$tmp/informe.pdf", "F");
    //$this->pdf->Output('Informe.pdf', 'I');

    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));

    //echo $base64;

    //Edad gestacional actual
    //htmlentities($this->solicitud_resultado->eg)