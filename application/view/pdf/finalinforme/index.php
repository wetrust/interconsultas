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
    $html = '<table><tbody><tr><td><strong>Nombre del paciente:</strong> '.htmlentities($this->solicitud->solicitud_nombre).'</td><td><strong>RUT del paciente:</strong> '.htmlentities($this->solicitud->solicitud_rut).'</td><td><strong>Fecha de solicitud:</strong> '.htmlentities($this->solicitud->solicitud_fecha).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>Ege conocida precozmente:</strong> '.($this->solicitud->solicitud_eg == 0 ? " No" : " Si").'</td><td><strong>Ecografía previa de crecimiento:</strong> '.($this->solicitud->solicitud_eco == 0 ? " No" : " Si").'</td></tr><tr><td><strong>FUM Operacional:</strong> '.htmlentities($this->solicitud->solicitud_fum).'</td><td><strong>Edad Gestacional:</strong> '.htmlentities($this->solicitud->solicitud_egestacional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $this->pdf->Ln(1);
    $html = '<p>Diagnóstico:  '.htmlentities($this->solicitud->solicitud_diagnostico).'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td><strong>Ciudad procedencia:</strong> '.htmlentities($this->solicitud->solicitud_ciudad).'</td><td><strong>Lugar de control:</strong> '.htmlentities($this->solicitud->solicitud_lugar).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>Datos del profesional referente</strong></td><td>'.htmlentities($this->solicitud->solicitud_profesional).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td><strong>Nombre:</strong> '.htmlentities($this->solicitud->solicitud_nombreprofesional).'</td><td><strong>Email:</strong> '.htmlentities($this->solicitud->solicitud_email).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<h3>Ecografista de contrarreferencia</h3>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td><strong>Email (contrareferencia)</strong></td><td>'.htmlentities($this->solicitud->solicitud_profesionalemail).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $this->pdf->Output('Informe.pdf', 'I');

    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));

    //echo $base64;

    //Responder a esta solicitud de interconsulta

    //Fecha
    //htmlentities($this->solicitud_evaluacion->evaluacion_fecha)

    //Comentario</label>
    //htmlentities($this->solicitud_evaluacion->evaluacion_comentarios)

    //Respuesta de profesional contrarreferente a solicitud de exámen ecográfico

    //Fecha evaluación de interconsulta
    //htmlentities($this->solicitud_resultado->fecha)

    //Edad gestacional actual
    //htmlentities($this->solicitud_resultado->eg)

    //Feto en presentación
    //htmlentities($this->solicitud_resultado->presentacion)

    //Dorso fetal
    //htmlentities($this->solicitud_resultado->dorso)

    //Líquido amniótico
    //htmlentities($this->solicitud_resultado->liquido)

    //A.- Biometría ecográfica:
    //Peso fetal estimado
    //htmlentities($this->solicitud_resultado->pfe)
    //Percentil
    //htmlentities($this->solicitud_resultado->pfe_percentil)

    //B.- Flujometría Doppler
    //IP. Promedio uterinas
    //htmlentities($this->solicitud_resultado->uterinas)
    //Percentil
    //htmlentities($this->solicitud_resultado->uterinas_percentil)

    //IP. Arteria umbilical
    //htmlentities($this->solicitud_resultado->umbilical)
    //Percentil
    //htmlentities($this->solicitud_resultado->umbilical_percentil)

    //IP. Cerebral media
    //htmlentities($this->solicitud_resultado->cm)
    //Percentil
    //htmlentities($this->solicitud_resultado->cm_percentil)

    //Cuociente CM / AU
    //htmlentities($this->solicitud_resultado->cmau)
    //Percentil
    //htmlentities($this->solicitud_resultado->cmau_percentil)

    //Hipótesis diagnóstica
    //Crecimiento fetal
    //htmlentities($this->solicitud_resultado->hipotesis)

    //Flujometría Doppler
    //htmlentities($this->solicitud_resultado->doppler)

    //Comentarios de exámen
    //htmlentities($this->solicitud_resultado->comentariosexamen)

    //Ecografista
    //htmlentities($this->solicitud_resultado->ecografista)