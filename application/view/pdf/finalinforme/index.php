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
    
    $html = '<h1 style="border-bottom:2px double #000;">Formulario referencia para evaluación ecográfica del crecimiento fetal</h1>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->solicitud->solicitud_nombre).'</td><td>RUT del paciente: '.htmlentities($this->solicitud->solicitud_rut).'</td><td>Fecha de solicitud: '.htmlentities($this->solicitud->solicitud_fecha).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td>Ege conocida precozmente: '.($this->solicitud->solicitud_eg == 0 ? " No" : " Si").'</td><td>Ecografía previa de crecimiento:'.($this->solicitud->solicitud_eco == 0 ? " No" : " Si").'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>FUM Operacional: '.htmlentities($this->solicitud->solicitud_fum).'</td><td>Edad Gestacional: '.htmlentities($this->solicitud->solicitud_egestacional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<p>Diagnóstico:  '.htmlentities($this->solicitud->solicitud_diagnostico).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Ciudad procedencia: '.htmlentities($this->solicitud->solicitud_ciudad).'</td><td>Lugar de control: '.htmlentities($this->solicitud->solicitud_lugar).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><h3>Datos del profesional referente</h3></td><td>'.htmlentities($this->solicitud->solicitud_profesional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombreprofesional).'</td><td>Email: '.htmlentities($this->solicitud->solicitud_email).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<h3>Ecografista de contrarreferencia</h3>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td>Email (contrareferencia)</td><td>'.htmlentities($this->solicitud->solicitud_profesionalemail).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $html = '<h1 style="border-bottom:2px double #000;">&nbsp;</h1>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<h1 style="border-bottom:2px double #000;">Contrarreferencia desde unidad de ultrasonografía gineco obstétrica</h1>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><h3>Evaluación de solicitud ecográfica</h3></td><td>Fecha: '.htmlentities($this->solicitud_evaluacion->evaluacion_fecha).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<p>Comentario: '.htmlentities($this->solicitud_evaluacion->evaluacion_comentarios).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><h3>Resumen evaluación 2° - 3° trimestre</h3></td><td>Fecha: '.htmlentities($this->solicitud_resultado->fecha).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td>Feto en presentación: '.htmlentities($this->solicitud_resultado->presentacion).'</td><td>Dorso Fetal: '.htmlentities($this->solicitud_resultado->dorso).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td>Líquido amniótico: '.htmlentities($this->solicitud_resultado->liquido).'</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>Biometría ecográfica</strong></td><td>Peso fetal estimado:</td><td>'.htmlentities($this->solicitud_resultado->pfe).' gr.</td><td>Percentil: '.htmlentities($this->solicitud_resultado->pfe_percentil).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td><strong>Flujometría Doppler</strong></td><td>Promedio uterinas:</td><td>'.htmlentities($this->solicitud_resultado->uterinas).' IP</td><td>Percentil: '.htmlentities($this->solicitud_resultado->uterinas_percentil).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>Arteria umbilical (Au):</td><td>'.htmlentities($this->solicitud_resultado->umbilical).' IP</td><td>Percentil: '.htmlentities($this->solicitud_resultado->umbilical_percentil).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>Cerebral media (Cm):</td><td>'.htmlentities($this->solicitud_resultado->cm).' IP</td><td>Percentil: '.htmlentities($this->solicitud_resultado->cm_percentil).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<table><tbody><tr><td></td><td>Cuociente Cm / Au (Cm):</td><td>'.htmlentities($this->solicitud_resultado->cmau).' IP</td><td>Percentil: '.htmlentities($this->solicitud_resultado->cmau_percentil).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $html = '<h3>Hipótesis diagnóstica</h3>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<p><strong>Crecimiento fetal</strong> '.htmlentities($this->solicitud_resultado->hipotesis).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<p><strong>Flujometría Doppler</strong> '.htmlentities($this->solicitud_resultado->doppler).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<p><strong>Líquido amniótico</strong> '.htmlentities($this->solicitud_resultado->liquido).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<h3>Comentarios y observaciones</h3>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<p>'.htmlentities($this->solicitud_resultado->comentariosexamen).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(2);
    $html = '<p>Ecografista: '.htmlentities($this->solicitud_resultado->ecografista).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'R', true);
    $tmp = Config::get('PATH_AVATARS');
    $this->pdf->Output("$tmp/informe.pdf", "F");
    //$this->pdf->Output('Informe.pdf', 'I');

    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));

    //echo $base64;

    //Edad gestacional actual
    //htmlentities($this->solicitud_resultado->eg)