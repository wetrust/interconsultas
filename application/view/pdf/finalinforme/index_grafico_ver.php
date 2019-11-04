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
    $html = '<h4 style="border-bottom:1px solid #000;">C- RESUMEN GRÁFICAS DE BIOMETRÍAS ECOGRÁFICAS Y FLUJOMETRÍA DOPPLER MATERNO FETAL</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    if (property_exists($this,"respuesta")){
        $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->solicitud->solicitud_nombre . " " . $this->solicitud->solicitud_apellido).'</td><td>RUT (DNI): '.htmlentities($this->solicitud->solicitud_rut).'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $html = '<table><tbody><tr><td>Fecha de ecografía: '.$solicitud_fecha.'</td><td>EG: '.$this->respuesta->eg.' semanas</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
    }else{
        $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->solicitud_nombre . " " . $this->solicitud_apellido).'</td><td>RUT (DNI): '.htmlentities($this->solicitud_rut).'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
    }

    if ($this->grafico_uno){
        $this->pdf->ImageSVG('@' . $this->grafico_uno, $x=10, $y=42, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    }
    if ($this->grafico_dos){
        $this->pdf->ImageSVG('@' . $this->grafico_dos, $x=105, $y=42, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    }
    if ($this->grafico_tres){
        $this->pdf->ImageSVG('@' . $this->grafico_tres, $x=10, $y=105, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    }
    if ($this->grafico_cuatro){
        $this->pdf->ImageSVG('@' . $this->grafico_cuatro, $x=105, $y=105, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    }
    if ($this->grafico_cinco){
        $this->pdf->ImageSVG('@' . $this->grafico_cinco, $x=10, $y=169, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    }
    if ($this->grafico_seis){
        $this->pdf->ImageSVG('@' . $this->grafico_seis, $x=105, $y=169, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    }

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


