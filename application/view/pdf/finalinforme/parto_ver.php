<?php
    // set document information
    $this->pdf->SetCreator(PDF_CREATOR);
    $this->pdf->SetAuthor('WT');
    $this->pdf->SetTitle('Informe parto');
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
    $this->pdf->setJPEGQuality(90);
    $this->pdf->SetFont('Helvetica', '', 9);

    $fecha = explode("-", $this->parto->fecha_parto);
    $fecha = $fecha[2] . "-". $fecha[1]. "-". $fecha[0];

    $this->pdf->Ln(5);
    $html = '<h2 style="border-bottom:2px double #000;text-align: center;">INFORME DATOS DE PARTO</h2>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>Datos maternos</strong></td><td><strong>Datos neonatales</strong></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Nombre de la madre: '.htmlentities($this->paciente->solicitud_nombre).'</td><td>Sexo: '.htmlentities($this->parto->sexo).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>RUT (DNI): '.htmlentities($this->paciente->solicitud_rut).'</td><td>Peso: '.htmlentities($this->parto->pesofetal).' grs.</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Lugar de parto: '.htmlentities($this->paciente->solicitud_rut).'</td><td>Talla: '.htmlentities($this->parto->tallafetal).' mm.</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Tipo de parto: '.htmlentities($this->paciente->solicitud_rut).'</td><td>Cráneo: '.htmlentities($this->parto->craneofetal).' mm.</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Paridad: '.htmlentities($this->paciente->solicitud_rut).'</td><td>Peso / Ege: pct. '.htmlentities($this->parto->peso_eg).', '.htmlentities($this->parto->peso_eg_estado).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Fecha de parto: '.$fecha.'</td><td>IPN / Ege: pct. '.htmlentities($this->parto->ipn_eg). ', '.htmlentities($this->parto->ipn_eg_estado).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Edad gestacional al parto: '.$this->parto->semanas. "," .$this->parto->dias.' semanas</td><td>Protocolo Hipoglicemia: '.htmlentities($this->parto->tipo).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->ImageSVG('@' . $this->grafico_uno, $x=10, $y=72, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_dos, $x=105, $y=72, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_tres, $x=10, $y=134, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_cuatro, $x=105, $y=134, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $html = '<p>Comentario y observaciones</p>';
    $this->pdf->writeHTMLCell('', '', $x=10, $y=200, $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<p style="border-top:2px double #000;text-align: center;">Gráficas de referencia: Curva Neonatal Chilena (SOCHIPE) - M. Milad. A y Col.; Rev. Chil. Pediatr. 2010; 81(3): 1264-274</p>';
    $this->pdf->writeHTMLCell('', '', $x=10, $y=230, $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
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