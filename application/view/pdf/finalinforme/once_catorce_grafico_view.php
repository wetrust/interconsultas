<?php
    // set document information
    $this->pdf->SetCreator(PDF_CREATOR);
    $this->pdf->SetAuthor('WT');
    $this->pdf->SetTitle('Evaluación ecográfica del crecimiento fetal');
    $this->pdf->SetSubject('TCPDF Tutorial');
    $this->pdf->SetKeywords('TCPDF, PDF, example, test, guide');
    // set default monospaced font
    $this->pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    // set margins
    $this->pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP+5, PDF_MARGIN_RIGHT);
    $this->pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    $this->pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
    $this->pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
    // add a page
    $this->pdf->AddPage('P', 'LETTER');

    // set JPEG quality
    $this->pdf->setJPEGQuality(90);

    $this->pdf->SetFont('Helvetica', '', 9);
    if (property_exists($this,"respuesta")){
        $solicitud_fecha = explode("-", $this->respuesta->fecha);
        $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];
    }
    $this->pdf->Ln(2);
    $html = '<h4 style="border-bottom:1px solid #000;">C- GRÁFICAS EXÁMEN ECOGRÁFICO 11 -14 SEMANAS</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    if (property_exists($this,"respuesta")){
        $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->solicitud->solicitud_nombre . " " . $this->solicitud->solicitud_apellido).'</td><td>RUT (DNI): '.htmlentities($this->solicitud->solicitud_rut).'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $html = '<table><tbody><tr><td>Fecha de ecografía: '.$solicitud_fecha.'</td><td>EG: '.$this->respuesta->eg.' semanas</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
    }

    $this->pdf->ImageSVG('@' . $this->grafico_uno, $x=10, $y=42, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_dos, $x=105, $y=42, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_tres, $x=10, $y=105, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_cuatro, $x=105, $y=105, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);

    $fecha = explode("-", $this->respuesta_fecha);
    $fecha = $fecha[2] . "-". $fecha[1]. "-". $fecha[0];
    
    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', $x=10, $y=185, $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(1);
    $html = '<p><small>* Referencia para LCN Hadlock FP, Shan YP, Kanon JD y cols.: Radiology 182:501, 1992.<br>** Referencia para Doppler promedio de arterias uterinas: Gómes O., Figueras F., Fernandez S., Bennasar M, Martínez JM., Puerto B., Gratacos E., UOG 2008; 32: 128-32<br>*** Referencia para biometrías (perímetro de cráneo y perímetro abdominal) según gráfica de Hadlock y col. 1984</small></p>';
    $this->pdf->writeHTMLCell('', '', $x=10, $y=187, $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);

    
    if (property_exists($this,"enviar")){
        //para enviar por email
        $tmp = Config::get('PATH_AVATARS');
        $this->pdf->Output("$tmp/informe.pdf", "F");
        /////////
    }else{
        //para visualizar en el navegador
        $this->pdf->Output('Informe.pdf', 'I');
        //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));
        //echo $base64;
        //////////
    }