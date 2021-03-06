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
    $this->pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP+5, PDF_MARGIN_RIGHT);
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
    $html = '<h4 style="border-bottom:2px double #000;text-align: center;">INFORME DATOS DE PARTO</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>Datos maternos</strong></td><td><strong>Datos neonatales</strong></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Nombre: '.htmlentities($this->paciente->solicitud_nombre . " " . $this->paciente->solicitud_apellido).'</td><td>Sexo: '.htmlentities($this->parto->sexo).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>RUT (DNI): '.htmlentities($this->paciente->solicitud_rut).'</td><td>Peso: '.htmlentities($this->parto->pesofetal).' grs.</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Lugar de parto: '.htmlentities($this->parto->lugar).'</td><td>Talla: '.htmlentities($this->parto->tallafetal).' mm.</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>IMC Materno: '.htmlentities($this->parto->imc).' (peso * talla)&#94;2</td><td>IPN: '.htmlentities($this->parto->ipn).' (peso*talla)^3</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Paridad: '.htmlentities($this->parto->paridad).'</td><td>Peso / Ege: pct. '.htmlentities($this->parto->peso_eg).', '.htmlentities($this->parto->peso_eg_estado).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Tipo de parto: '.htmlentities($this->parto->tipo).'</td><td>IPN / Ege: pct. '.htmlentities($this->parto->ipn_eg). ', '.htmlentities($this->parto->ipn_eg_estado).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Fecha de parto: '.$fecha.'</td><td>Protocolo de Hipoglicemia: '.htmlentities($this->parto->protocolo_hipoglicemia).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Edad gestacional al parto: '.$this->parto->semanas. "," .$this->parto->dias.' semanas</td><td>Alta del RN con su madre: '.htmlentities($this->parto->alta).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->ImageSVG('@' . $this->grafico_uno, $x=10, $y=77, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_dos, $x=105, $y=77, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_tres, $x=10, $y=138, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $this->pdf->ImageSVG('@' . $this->grafico_cuatro, $x=105, $y=138, $w='', $h=90, $link='', $align='', $palign='', $border=0, $fitonpage=false);
    $html = '<p style="text-align: center;"><small>Gráficas de referencia: Curva Neonatal Chilena (SOCHIPE) - M. Milad. A y Col.; Rev. Chil. Pediatr. 2010; 81(3): 1264-274</small></p>';
    $this->pdf->writeHTMLCell('', '', $x=10, $y=216, $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<p><strong>Comentario y observaciones:</strong><br> '.$this->parto->comentarios.'</p>';
    $this->pdf->writeHTMLCell('', '', $x=10, $y=219, $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<p style="border-top:2px double #000;text-align: center; color:#007bff">La utilizacion de información con fines de investigación, requiere consentimiento informado de la madre. para tal efecto ver formularios en pagina inicial de la plataforma</p>';
    $this->pdf->writeHTMLCell('', '', $x=10, $y=240, $html, 0, 1, 0, true, 'J', true);
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