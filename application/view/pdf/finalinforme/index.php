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

    $this->pdf->SetFont('Arial', '', 8);
    
    $html = '<h1 style="border-bottom:2px double #000;">Formulario referencia para evbaluación ecográfica del crecimiento fetal</h1>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>Nombre del paciente:</strong> '.htmlentities($this->solicitud->solicitud_nombre).'</td><td><strong>RUT del paciente:</strong> '.htmlentities($this->solicitud->solicitud_rut).'</td><td><strong>Fecha de solicitud:</strong> '.htmlentities($this->solicitud->solicitud_fecha).'</td></tr><tr><td><strong>Ege conocida precozmente:</strong> '.($this->solicitud->solicitud_eg == 0 ? " No" : " Si").'</td><td><strong>Ecografía previa de crecimiento:</strong> '.($this->solicitud->solicitud_eco == 0 ? " No" : " Si").'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $this->pdf->Output('Informe.pdf', 'I');

    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));

    //echo $base64;

    //FUM operacional
    //htmlentities($this->solicitud->solicitud_fum)

    //Edad Gestacional
    //htmlentities($this->solicitud->solicitud_egestacional)

    //Diagnóstico de referencia
    //htmlentities($this->solicitud->solicitud_diagnostico)

    //Ciudad procedencia de la paciente
    //htmlentities($this->solicitud->solicitud_ciudad)

    //Lugar de control prenatal
    //htmlentities($this->solicitud->solicitud_lugar)

    //Datos del profesional referente
    //$check = ($this->solicitud->solicitud_profesional == "Médico" ? "checked" : "")

    //Nombre:
    //htmlentities($this->solicitud->solicitud_nombreprofesional)

    //Email (de trabajo):
    //htmlentities($this->solicitud->solicitud_email)

    //Ecografista de contrarreferencia
    //Email (contrareferencia)
    //htmlentities($this->solicitud->solicitud_profesionalemail)

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