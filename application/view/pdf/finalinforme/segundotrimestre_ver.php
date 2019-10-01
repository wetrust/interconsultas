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

    $html = '<h4 style="border-bottom:2px double #000;text-align: center;">RESUMEN PROTOCOLO DE REFERENCIA Y CONTRARREFERENCIA PARA ECOGRAFÍA OBSTÉTRICA DE CRECIMIENTO</h4>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<h3 style="border-bottom:1px solid #000;">A- Formulario de referencia para evaluación ecográfica del crecimiento fetal</h3>';
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

    $html = '<h3 style="border-bottom:1px solid #000;">B- Respuesta de profesional contrarreferente a solicitud de exámen ecográfico</h3>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);
    $this->pdf->Ln(2);
    
    $html = '<table><tbody><tr><td>Edad Gestacional: '. htmlentities($this->respuesta_eg) .'</td><td>Feto en presentación: '.htmlentities($this->respuesta_presentacion).'</td><td>Dorso Fetal: '.htmlentities($this->respuesta_dorso_segundo).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>FCF: '.htmlentities($this->respuesta_fcf).'</td><td>Sexo: '.htmlentities($this->respuesta_sexo_fetal).'</td><td>Placenta: '.htmlentities($this->respuesta_placenta).', '.$this->respuesta_placenta_insercion.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td>Líquido amniótico *</td><td>: '.htmlentities($this->respuesta_liquido_amniotico).'</td><td>BVM: '.htmlentities($this->respuesta_bvm).' mm.</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>Anatomía fetal:</strong> '.htmlentities($this->respuesta_anatomia_segundo)." ".htmlentities($this->anatomia_fetal_extra).'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);
    $this->pdf->Ln(4);

    $html = '<table><tbody><tr><td><strong><em>Biometría ecográfica **</em></strong></td><td>DBP (Hadlock):</td><td>'. $this->respuesta_dbp.' mm.</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td></td><td>DOF (Jeanty):</td><td>'. $this->respuesta_dof.' mm.</td><td></td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td style="background-color:#eceeef;">Índice Cefálico (IC):</td><td style="background-color:#eceeef;">'. $this->respuesta_ic.'</td><td style="background-color:#eceeef;">(IC 70 a 86 %)</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>CC (Hadlock):</td><td>'. $this->respuesta_cc.' mm.</td><td>Percentil: '. $this->respuesta_cc_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td style="background-color:#eceeef;">CA (Hadlock):</td><td style="background-color:#eceeef;">'. $this->respuesta_ca. ' mm.</td><td style="background-color:#eceeef;">Percentil: '. $this->respuesta_ca_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>LF (Hadlock):</td><td>'. $this->respuesta_lf.' mm.</td><td>Percentil: '. $this->respuesta_lf_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td style="background-color:#eceeef;">LH (Jeanty):</td><td style="background-color:#eceeef;">'. $this->respuesta_lh.' mm.</td><td style="background-color:#eceeef;">Percentil: '. $this->respuesta_lh_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Cerebelo (Hill) ***:</td><td>'. $this->respuesta_cerebelo.' mm.</td><td>Percentil: '. $this->respuesta_cerebelo_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(4);
    $html = '<table><tbody><tr><td></td><td style="background-color:#eceeef;">Peso fetal estimado ****</td><td style="background-color:#eceeef;">'. $this->respuesta_pfe.' gr.</td><td style="background-color:#eceeef;">Percentil: '. $this->respuesta_pfe_pct.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = '<table><tbody><tr><td></td><td>Índice Cc / Ca ****</td><td>'. $this->respuesta_ccca.'</td><td>Percentil: '. $this->respuesta_ccca_pct.'</td></tr></tbody></table>';
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
    $html = '<p><small>* Referencia para Liq. Amniotico BVM, Magann EF. Sanderson M. Martin JN y col. Am J Obstet Gynecol 1982: 1581, 2000<br>** Referencia para biometrías según gráfica de Hadlock y col. 1984<br>*** Diámetro cerebeloso transverso Hill LM. y col. Obstet Gynecol. 1990; 75(6) : 981-5<br>**** Gráfica de referencia para PFE y Cc/Ca, Hadlock F P y col. 1991; Radiology 181 : 129 - 133 (Normalidad Pct 10 a 90) <br>Informe generado desde software crecimientofetal.cl, el objetivo de este es favorecer análisis preeliminar de los datos, la interpretación de los resultados es responsabilidad fundamentalmente del profesional referente a exámen ecográfico. <br>Profesional quien finalmente evaluará clínicamente la información contenida en este exámen. <br><br>Nota: Examen ecográfico destinado a evaluar biometría fetal; a objeto de valorar edad gestacional , crecimiento fetal y evaluación general de la morfología fetal. El rendimiento diagnóstico del examen ecográfico morfológico depende de múltiples factores tanto maternos como fetales, edad gestacional al momento del examen, posición fetal, interposición de partes fetales (manos, pies) o anexos (placenta, cordón umbilical), En las mejores series de detección de malformaciones fetales publicadas en la literatura nacional e internacional no alcanza el 100% y por lo tanto es importante correlacionar resultado obtenidos en función del contexto clínico de la paciente y antecedentes de gestaciones previas.</small></p>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'L', true);

    //$tmp = Config::get('PATH_AVATARS');
    //$this->pdf->Output("$tmp/informe.pdf", "F");
    $this->pdf->Output('Informe.pdf', 'I');

    //$base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));

    //echo $base64;

    //Edad gestacional actual
    //htmlentities($this->solicitud_resultado->eg)