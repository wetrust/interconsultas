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

    $solicitud_fecha = explode("-", $this->solicitud->solicitud_fecha);
    $solicitud_fecha = $solicitud_fecha[2] . "-". $solicitud_fecha[1]. "-". $solicitud_fecha[0];
    $solicitud_fum = explode("-", $this->solicitud->solicitud_fum);
    $solicitud_fum = $solicitud_fum[2] . "-". $solicitud_fum[1]. "-". $solicitud_fum[0];
    
    $html = '<h4 style="border-bottom:2px double #000;text-align: center;">EVALUACIÓN ECOGRÁFICA OBSTÉTRICA PRECOZ (EDADES GESTACIONALES &lt; 11 SEMANAS)</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);

    $html = '<h4>A- Formulario referencia para evaluación ecográfica de primer trimestre</h4>';
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
        $html = '<table><tbody><tr><td>Edad gestacional</td><td>: '.htmlentities($this->solicitud->solicitud_egestacional).'</td></tr></tbody></table>';
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
        $html = '<table><tbody><tr><td>Edad Gestacional: '.htmlentities($this->solicitud->solicitud_egestacional).'</td><td>Diagnóstico de referencia: '.htmlentities($this->solicitud->solicitud_diagnostico).'</td></tr></tbody></table>';
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
    $html = '<table><tbody><tr><td>Fecha de exámen: '. $fecha.'</td></tr><tr><td>Edad gestacional (Ege): '. $this->respuesta_eg.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>Descripción:</strong></td><td>Utero:</td><td>'. $this->respuesta_utero.'</td><td></td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    if ($this->respuesta_saco_valor > 0){
        $html = '<table><tbody><tr><td></td><td>Saco Gestacional:</td><td>'. $this->respuesta_saco_gestacional.'</td><td>Promedio de saco:</td><td>'. $this->respuesta_saco_valor . ' mm.</td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
    }
    else{
        $html = '<table><tbody><tr><td></td><td>Saco Gestacional:</td><td>'. $this->respuesta_saco_gestacional.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);  
    }
    if ($this->respuesta_fcf > 0){
        $html = '<table><tbody><tr><td></td><td>Embrión:</td><td>'. $this->respuesta_embrion.'</td><td>Frecuencia cardiaca fetal:</td><td>'. $this->respuesta_fcf.'</td></tr></tbody></table>';
    }
    else{
        $html = '<table><tbody><tr><td></td><td>Embrión:</td><td>'. $this->respuesta_embrion.'</td><td></td><td></td></tr></tbody></table>';
    }
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    if ($this->respuesta_lcn != ""){
        $html = '<table><tbody><tr><td></td><td>Largo embrionario (LCN):</td><td>'.$this->respuesta_lcn.' mm.</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);

        //fecha del examen
        $fExamen = strtotime($this->solicitud_evaluacion->evaluacion_fecha);
        //convertir eg a dias
        $egXLCN = $this->respuesta_lcn_eg;

        if ($egXLCN != ""){
            $egXLCN = str_replace(",", ".",$egXLCN);
            $egXLCN = explode(".", $egXLCN);

            if (is_array($egXLCN) == true){
                if (count($egXLCN) == 1){
                    $egXLCN = $egXLCN[0] * 7;
                }else if (count($egXLCN) == 2){
                    $egXLCN = ($egXLCN[0] * 7) + $egXLCN[1];
                }
            }else{
                $egXLCN = $egXLCN * 7; 
            }
        }
    
        $furlcn = strtotime("-". strval($egXLCN) . "day", $fExamen);
        $fpplcn = date("Y-m-d", strtotime("+240 day", $furlcn));
        $furlcn = date("Y-m-d", strtotime("-". strval($egXLCN) . "day", $fExamen));
        $furlcn = explode("-", $furlcn);
        $furlcn = $furlcn[2] . "-". $furlcn[1]. "-". $furlcn[0];
        $fpplcn = explode("-", $fpplcn);
        $fpplcn = $fpplcn[2] . "-". $fpplcn[1]. "-". $fpplcn[0];

        $html = '<table><tbody><tr><td></td><td>Anexo Izquierdo:</td><td>'. $this->respuesta_anexo_izquierdo_primertrimestre.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td></td><td>Anexo Derecho:</td><td>'. $this->respuesta_anexo_derecho_primertrimestre.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
    }else{
        $html = '<table><tbody><tr><td></td><td>Anexo Izquierdo:</td><td>'. $this->respuesta_anexo_izquierdo_primertrimestre.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td></td><td>Anexo Derecho:</td><td>'. $this->respuesta_anexo_derecho_primertrimestre.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
    }
    $html = '<table><tbody><tr><td></td><td>Douglas:</td><td>'. $this->respuesta_douglas_primertrimestre.'</td><td></td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);

    if ($this->respuesta_lcn != ""){
        $html = '<table><tbody><tr><td></td><td><strong>Ege según LCN:</strong></td><td>'. $this->respuesta_lcn_eg.' semanas*</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
        //fecha del examen
        $fExamen = strtotime($this->solicitud_evaluacion->evaluacion_fecha);
        //convertir eg a dias
        $egXLCN = $this->respuesta_lcn_eg;
        if ($egXLCN != ""){
            $egXLCN = str_replace(",", ".",$egXLCN);
            $egXLCN = explode(".", $egXLCN);

            if (is_array($egXLCN) == true){
                if (count($egXLCN) == 1){
                    $egXLCN = $egXLCN[0] * 7;
                }else if (count($egXLCN) == 2){
                    $egXLCN = ($egXLCN[0] * 7) + $egXLCN[1];
                }
            }else{
                $egXLCN = $egXLCN * 7; 
            }
        }
        $furlcn = strtotime("-". strval($egXLCN) . "day", $fExamen);
        $fpplcn = date("Y-m-d", strtotime("+240 day", $furlcn));
        $furlcn = date("Y-m-d", strtotime("-". strval($egXLCN) . "day", $fExamen));
        $furlcn = explode("-", $furlcn);
        $furlcn = $furlcn[2] . "-". $furlcn[1]. "-". $furlcn[0];
        $fpplcn = explode("-", $fpplcn);
        $fpplcn = $fpplcn[2] . "-". $fpplcn[1]. "-". $fpplcn[0];
        $html = '<table><tbody><tr><td></td><td><strong>FUR asignada:</strong></td><td>'. $furlcn.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(1);
        $html = '<table><tbody><tr><td></td><td><strong>FPP asignada:</strong></td><td>'. $fpplcn.'</td><td></td><td></td></tr></tbody></table>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
        $this->pdf->Ln(4);
    }

    $_html = strip_tags($this->comentariosexamen);
    $_html = strtoupper($_html);
    $_html = str_replace("\n", "<br>", $_html);

    if ($this->respuesta_saco_eg && $this->respuesta_lcn == ""){
        $_html .= "<br>Calculo inicial de edad según saco gestacional: ". $this->respuesta_saco_eg ." semanas<br>Agendar próxima ecografía para determinar edad gestacional por LCN<br>";
    }

    $html = '<table><tbody><tr><td style="width:170px"><strong><em>Comentarios y observaciones:</em></strong></td><td style="width:450px">' . $_html .'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(8);

    $html = '<table><tbody><tr><td style="width:450px"></td><td>Ecografista: '.htmlentities($this->ecografista).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);

    $edadGestacional = str_replace(",", ".",$this->solicitud->solicitud_egestacional);
    $edadGestacional = explode(".", $edadGestacional);

    if (is_array($edadGestacional) == true){
        if (count($edadGestacional) == 1){
            $edadGestacional = intval($edadGestacional[0]) * 7;
        }else if (count($edadGestacional) == 2){
            $edadGestacional = (intval($edadGestacional[0]) * 7) + intval($edadGestacional[1]);
        }
    }else{
        $edadGestacional = $edadGestacional * 7; 
    }


    if ($this->respuesta_lcn != ""){
        //determinar cuantos días faltan para las 12 semanas
        $onceSemanas = 77 - $edadGestacional;
        $catorceSemanas = 97 - $edadGestacional;
        //sumar esos días a la fecha de exámen
        $onceSemanas =  date('d-m-Y', strtotime($this->solicitud->solicitud_fecha. ' + '.$onceSemanas.' days'));
        $catorceSemanas =  date('d-m-Y', strtotime($this->solicitud->solicitud_fecha. ' + '.$catorceSemanas.' days'));
        //$solicitud_fecha_examen =  $this->solicitud->solicitud_fecha. ' + '.$edadGestacional.' days';

        $html = '<p style="color:#0275d8;">* Exámen ecográfico para 11 - 14 semanas correspondería entre las fechas  '.$onceSemanas.'   al   '.$catorceSemanas .'</p>';
        $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
        $this->pdf->Ln(4);
    }

    $html = '<table style="border-top:1px solid #000;border-bottom:1px solid #000;"><tbody><tr><td><p>Fecha de exámen: '. $fecha .'</p></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $html = '<p><small><br>*Referencia Edad menstrual por LCN Hadlock FP, Shan YP, Kanon JD y cols.: Radiology 182:501, 1992. <br><br>Informe generado desde software crecimientofetal.cl, el objetivo de este es favorecer análisis preeliminar de los datos, la interpretación de los resultados es responsabilidad fundamentalmente del profesional referente a exámen ecográfico. Profesional quien finalmente evaluará clínicamente la información contenida en este exámen. <br><br>Nota: Examen ecográfico durante la gestación inicial <strong>normal</strong> (menor a 11 semanas), se realiza con el propósito de: confirmación de embarazo, localización intrauterina del saco gestacional, confirmación de vitalidad embrio/fetal,  determinar si es embarazo único o múltiple, y fundamentalmente valoración de edad gestacional ecográfica.</small></p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);

    //$tmp = Config::get('PATH_AVATARS');
    //$this->pdf->Output("$tmp/informe.pdf", "F");
    $this->pdf->Output('Informe.pdf', 'I');

    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));

    //echo $base64;

    //Edad gestacional actual
    //htmlentities($this->solicitud_resultado->eg)