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

    $html = '<h3 style="border-bottom:2px double #000;text-align: center;">RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA OBSTÉTRICA Y FLUJOMETRÍA DOPPLER</h3>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);

    $this->pdf->ImageSVG('@' . $this->grafico_uno, $x=10, $y=35, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_uno, $x=105, $y=35, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_tres, $x=10, $y=100, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_cuatro, $x=105, $y=100, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_cinco, $x=10, $y=170, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_seis, $x=105, $y=170, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    
    //$html = '<h4 style="border-bottom:1px solid #000;color:#0275d8;">A- Formulario referencia para evaluación ecográfica del crecimiento fetal</h4>';
    //$this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    //$this->pdf->Ln(2);
    //$html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->solicitud->solicitud_nombre).'</td><td>RUT (DNI): '.htmlentities($this->solicitud->solicitud_rut).'</td></tr></tbody></table>';
    //$this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    //$this->pdf->Ln(1);
    //$html = '<table><tbody><tr><td>Fecha de solicitud: '.$solicitud_fecha.'</td><td>FUR Referida: '.$solicitud_fum.'</td></tr></tbody></table>';
    //$this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    //$this->pdf->Ln(1);
    
    //para enviar por email
    //$tmp = Config::get('PATH_AVATARS');
    //$this->pdf->Output("$tmp/informe.pdf", "F");
    /////////

    //para visualizar en el navegador
    $this->pdf->Output('Informe.pdf', 'I');
    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));
    //echo $base64;
    //////////