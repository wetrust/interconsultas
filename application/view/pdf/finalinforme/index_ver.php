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
    
    $solicitud_fecha = explode("-", $this->solicitud->solicitud_fecha);
    $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];

    $solicitud_fum = explode("-", $this->solicitud->solicitud_fum);
    $solicitud_fum = $solicitud_fum[2] . "-". $solicitud_fum[1]. "-". $solicitud_fum[0];

    $fecha = explode("-", $this->solicitud_resultado->fecha);
    $fecha = $fecha[2] . "-". $fecha[1]. "-". $fecha[0];

    $html = '<h2 style="border-bottom:2px double #000;text-align: center;">RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA OBSTÉTRICA Y FLUJOMETRÍA DOPPLER</h2>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);

    $html = '<h3 style="border-bottom:1px solid #000;color:#0275d8;">A- Formulario de referencia para evaluación ecográfica del crecimiento fetal</h3>';
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
    $html = '<table><tbody><tr><td style="background-color:#eceeef;">Profesional referente: '.htmlentities($this->solicitud->solicitud_profesional).'</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombreprofesional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_email).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td style="background-color:#eceeef;">Ecografista de contrarreferencia</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombre_referente).'</td></tr><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_profesionalemail).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);

    $html = '<h3 style="border-bottom:1px solid #000;color:#0275d8;">B- Respuesta de profesional contrarreferente a solicitud de exámen ecográfico</h3>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    
    $html = '<table><tbody><tr><td>Edad Gestacional: '. htmlentities($this->solicitud_resultado->eg) .'</td><td>Feto en presentación: '.htmlentities($this->solicitud_resultado->presentacion).'</td><td>Dorso Fetal: '.htmlentities($this->solicitud_resultado->dorso).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Placenta: '.htmlentities($this->solicitud_resultado->placenta).', '.$this->solicitud_resultado->placenta_insercion.'</td><td>Sexo: '.htmlentities($this->solicitud_resultado->sexo_fetal).'</td><td>Líquido amniótico: '.htmlentities($this->solicitud_resultado->liquido).'</td><td>BVM: '.htmlentities($this->solicitud_resultado->respuesta_bvm).' mm.</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>Anatomía fetal:</strong> '.htmlentities($this->solicitud_resultado->anatomia_fetal)." ".htmlentities($this->solicitud_resultado->anatomia_extra).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td><strong><em>Biometría ecográfica:</em></strong></td><td>Peso fetal estimado:</td><td>'.htmlentities($this->solicitud_resultado->pfe).' gr.</td><td>Percentil: '.htmlentities($this->solicitud_resultado->pfe_percentil).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>Índice Cc / Ca:</td><td>'.htmlentities($this->solicitud_resultado->ccca).' </td><td>Percentil: '.$this->solicitud_resultado->ccca_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong><em>Flujometría Doppler</em></strong></td><td>IP Uterina derecha:</td><td>'.htmlentities($this->solicitud_resultado->uterina_derecha).'</td><td>Percentil: '.$this->solicitud_resultado->uterina_derecha_percentil.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>IP Uterina izquierda:</td><td>'.htmlentities($this->solicitud_resultado->uterina_izquierda).'</td><td>Percentil: '.$this->solicitud_resultado->uterina_izquierda_percentil.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>IP Promedio uterinas:</td><td>'.htmlentities($this->solicitud_resultado->uterinas).'</td><td>Percentil: '.$this->solicitud_resultado->uterinas_percentil.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>IP Arteria umbilical (UMB):</td><td>'.htmlentities($this->solicitud_resultado->umbilical).'</td><td>Percentil: '.$this->solicitud_resultado->umbilical_percentil.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>IP Cerebral media (ACM):</td><td>'.htmlentities($this->solicitud_resultado->cm).'</td><td>Percentil: '.$this->solicitud_resultado->cm_percentil.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>Índice Cm / Au (ICP):</td><td>'.htmlentities($this->solicitud_resultado->cmau).'</td><td>Percentil: '.$this->solicitud_resultado->cmau_percentil.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);

    $html = '<table><tbody><tr><td style="width:162px"><strong><em>Hipótesis diagnóstica</em></strong></td><td style="width:450px">Crecimiento fetal: '.htmlentities($this->solicitud_resultado->hipotesis).' *</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td style="width:162px"></td><td style="width:450px">Flujometría Doppler materno: '.htmlentities($this->solicitud_resultado->doppler).' **</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td style="width:162px"></td><td style="width:450px">Flujometría Doppler fetal: '.htmlentities($this->solicitud_resultado->doppler_fetal).' ***</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);

    $_html = strip_tags($this->solicitud_resultado->comentariosexamen);
    $_html = str_replace("\n", "<br>", $_html);

    $html = '<table><tbody><tr><td style="width:170px"><strong><em>Comentarios y observaciones:</em></strong></td><td style="width:450px">' . $_html .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(8);

    $html = '<table><tbody><tr><td style="width:450px"></td><td>Ecografista: '.htmlentities($this->solicitud_resultado->ecografista).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(1);
    $html = '<p><small>* Evaluación de crecimiento fetal (Gráfica), según referencia propuesta por Hadlock y col. Radiology 181: 129 - 133; 1991 (Normalidad Pct 10 a 90)<br>** Referencia para Doppler promedio de arterias uterinas: Gómes O., Figueras F., Fernandez S., Bennasar M, Martínez JM., Puerto B., Gratacos E., UOG 2008; 32: 128-32<br>*** Referencia para Doppler fetal; arteria umbilical, C Media y CCP; Baschat et al Ultrasound Obstet. Gynecol 2003; 21 124 - 127</small><br><br>Informe generado desde software crecimientofetal.cl, el objetivo de este es favorecer análisis preeliminar de los datos, la interpretación de los resultados es responsabilidad fundamentalmente del profesional referente a exámen ecográfico.<br>Profesional quien finalmente evaluará clínicamente la información contenida en este exámen.</p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    
    //para enviar por email
    //$tmp = Config::get('PATH_AVATARS');
    //$this->pdf->Output("$tmp/informe.pdf", "F");
    /////////

    //para visualizar en el navegador
    $this->pdf->Output('Informe.pdf', 'I');
    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));
    //echo $base64;
    //////////