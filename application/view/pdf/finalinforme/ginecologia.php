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
    $this->pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP+5, PDF_MARGIN_RIGHT);
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
    $solicitud_fecha = explode("-", $this->solicitud_fecha);
    $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];

    $html = '<h4 style="border-bottom:2px double #000;text-align: center;">RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA GINECOLÓGICA</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<h4>A- Formulario referencia para evaluación ecográfica gineco-obstétrica</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    if (Session::get("user_account_type") == 4) {
        $html = '<table><tbody><tr><td>Nombre del paciente</td><td>: '.htmlentities($this->solicitud->solicitud_nombre).'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td>Edad</td><td>: '.htmlentities($this->solicitud->solicitud_ematerna).' años</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td>RUT (DNI)</td><td>: '.htmlentities($this->solicitud->solicitud_rut).'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td>Fecha solicitud de la ecografía</td><td>: '.$solicitud_fecha.'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td>FUR referida o corregida</td><td>: '.$solicitud_fum.'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td>Diagnóstico de referencia</td><td>: '.htmlentities($this->solicitud->solicitud_diagnostico).'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(4);
    }
    else{
        $html = '<table><tbody><tr><td>Nombre del paciente: '.htmlentities($this->solicitud->solicitud_nombre).'</td><td>RUT (DNI): '.htmlentities($this->solicitud->solicitud_rut).'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td>Fecha de solicitud: '.$solicitud_fecha.'</td><td>FUR Referida: '.$solicitud_fum.'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td>Ciudad procedencia: '.htmlentities($this->solicitud->solicitud_ciudad).'</td><td>Lugar de control: '.htmlentities($this->solicitud->solicitud_lugar).'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(2);
    
        if (isset($this->profesional_email) == true){
            if (isset($this->profesional_email->email_value) == true){
                $html = '<table><tbody><tr><td style="background-color:#eceeef;">Referente a exámen: '.htmlentities($this->profesional_email->email_profesion).'</td><td>Nombre: '.htmlentities($this->profesional_email->email_nombre).'</td></tr></tbody></table>';
                $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'L', true);
                $html = '<table><tbody><tr><td></td><td>Email: '.htmlentities($this->profesional_email->email_value).'</td></tr></tbody></table>';
                $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
            }
            else{
                $html = '<table><tbody><tr><td style="background-color:#eceeef;">Referente a exámen: '.htmlentities($this->solicitud->solicitud_profesional).'</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombreprofesional).'</td></tr></tbody></table>';
                $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'L', true);
                $html = '<table><tbody><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_email).'</td></tr></tbody></table>';
                $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);  
            }
        }
        else{
            $html = '<table><tbody><tr><td style="background-color:#eceeef;">Referente a exámen: '.htmlentities($this->solicitud->solicitud_profesional).'</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombreprofesional).'</td></tr></tbody></table>';
            $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'L', true);
            $html = '<table><tbody><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_email).'</td></tr></tbody></table>';
            $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        }
    
        $this->pdf->Ln(2);
        $html = '<table><tbody><tr><td style="background-color:#eceeef;">Ecografista de contrarreferencia</td><td>Nombre: '.htmlentities($this->solicitud->solicitud_nombre_referente).'</td></tr><tr><td></td><td>Email: '.htmlentities($this->solicitud->solicitud_profesionalemail).'</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(4);
    }

    $html = '<h4>B- Respuesta final de profesional contrarreferente a solicitud de exámen ecográfico</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>Fecha de exámen:</strong></td><td>'. $fecha.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);

    $eg = $this->respuesta_eg;
    $txt = "";
    if ($eg < 36){
        $txt = "Días del ciclo mestrual";
    }else if ($eg < 86){
        $txt = "Días de atraso mestrual";
    }else{
        $txt = "Días de amenorrea";
    }

    $html = '<table><tbody><tr><td><strong>'.$txt.':</strong></td><td>'.htmlentities($this->respuesta_eg).' dias</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td style="background-color:#f7fafb;"><strong>Útero:</strong></td><td style="background-color:#f7fafb;">'. $this->respuesta_utero_ginecologica.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>Endometrio:</strong></td><td>'. $this->respuesta_endometrio.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td style="background-color:#f7fafb;"><strong>Anexo Izquierdo:</strong></td><td style="background-color:#f7fafb;">'. $this->respuesta_anexo_izquierdo_ginecologica.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>Ovario Izquierdo:</strong></td><td>'. $this->respuesta_ovario_izquierdo.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td style="background-color:#f7fafb;"><strong>Anexo Derecho:</strong></td><td style="background-color:#f7fafb;">'. $this->respuesta_anexo_derecho_ginecologica.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>Ovario Derecho:</strong></td><td>'. $this->respuesta_ovario_derecho.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td><strong>Douglas:</strong></td><td>'. $this->respuesta_douglas_ginecologica.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);

    $_html = strip_tags($this->comentariosexamen);
    $_html = strtoupper($_html);
    $_html = str_replace("\n", "<br>", $_html);
    $html = '<table><tbody><tr><td style="width:170px"><strong><em>Comentarios y observaciones:</em></strong></td><td style="width:450px">' . $_html .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(8);

    $html = '<table><tbody><tr><td style="width:450px"></td><td>Ecografista: '.htmlentities($this->ecografista).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);
    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(4);
    $html = '<p>Informe generado desde software crecimientofetal.cl, el objetivo de este es favorecer análisis preeliminar de los datos, la interpretación de los resultados es responsabilidad fundamentalmente del profesional referente a exámen ecográfico.<br>Profesional quien finalmente evaluará clínicamente la información contenida en este exámen.</p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'J', true);

    $tmp = Config::get('PATH_AVATARS');
    if (file_exists("$tmp/informe.pdf")) unlink("$tmp/informe.pdf");
    $this->pdf->Output("$tmp/informe.pdf", "F");
    //$this->pdf->Output('Informe.pdf', 'I');

    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));

    //echo $base64;

    //Edad gestacional actual
    //htmlentities($this->solicitud_resultado->eg)