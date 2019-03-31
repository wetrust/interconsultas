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

    $this->pdf->SetFont('dejavusans', '', 9);

    $html = '<h1 style="border-bottom:2px double #000;">Evaluación ecográfica del crecimiento fetal</h1>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(2);
    $html = '<table><tbody><tr><td><strong>Paciente Sra. (Srta.):</strong> '.$this->data->nombre.'</td><td><strong>Edad Materna:</strong> '.$this->data->edadMaterna.'</td><td><strong>Fecha de Exámen:</strong> '.$this->data->fechaExamen.'</td></tr><tr><td><strong>ID Paciente:</strong> '.$this->data->idPaciente.'</td><td><strong>Motivo de exámen:</strong> '.$this->data->motivoExamen.'</td><td><strong>Patología Obstétrica:</strong> '.$this->data->patologiaObstetrica.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

    $this->pdf->Ln(1);
    $html = '<table><tbody><tr><td><strong>FUM:</strong> '.$this->data->fum.'</td><td><strong>Ege:</strong> '.$this->data->eg.'</td><td><strong>FPP:</strong> '.$this->data->fpp.'</td></tr></tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);

    $this->pdf->Ln();
    $html = '<p style="color:#045dab;"><strong>DESCRIPCIÓN</strong></p><p>'.$this->data->linea_primera.'<br>'.$this->data->linea_segunda.'</p><p style="word-wrap: break-word;">'.$this->data->linea_tercera.'</p><p>'.$this->data->linea_cuarta.'<br>'.$this->data->linea_quinta.'<br>'.$this->data->linea_sexta.'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);

    $html = '<table style="border:1px solid #000;"><tbody><tr>
    <th style="color:#045dab;border-bottom:2px solid #000;border-top:2px solid #000;">
    <strong>BIOMETRÍA FETAL</strong></th>
    <th style="text-align:center;border-bottom:2px solid #000;border-top:2px solid #000;">
    Valor observado</th>
    <th style="border-bottom:2px solid #000;border-top:2px solid #000;text-align:center;">
    Pct de Crecimiento</th>
    <th style="border-bottom:2px solid #000;border-top:2px solid #000;text-align:center;">
    Referencia para Edad</th> </tr>
    <tr><td>DBP (Hadlock):</td><td style="text-align:center;">'.$this->data->DBP.'</td><td style="text-align:center;">'.$this->data->DBPPCT.'</td><td style="text-align:center;">'.$this->data->DBPRANGO.'</td></tr>
    <tr><td>DOF (Jeanty):</td><td style="text-align:center;">'.$this->data->DOF.'</td><td style="text-align:center;">'.$this->data->DOFPCT.'</td><td style="text-align:center;">'.$this->data->DOFRANGO.'</td></tr>
    <tr><td>CC (Hadlock):</td><td style="text-align:center;">'.$this->data->CC.'</td><td style="text-align:center;">'.$this->data->CCPCT.'</td><td style="text-align:center;">'.$this->data->CCRANGO.'</td></tr>
    <tr><td>CA (Hadlock):</td><td style="text-align:center;">'.$this->data->CA.'</td><td style="text-align:center;">'.$this->data->CAPCT.'</td><td style="text-align:center;">'.$this->data->CARANGO.'</td></tr>
    <tr><td>LF (Hadlock):</td><td style="text-align:center;">'.$this->data->LF.'</td><td style="text-align:center;">'.$this->data->LFPCT.'</td><td style="text-align:center;">'.$this->data->LFRANGO.'</td></tr>
    <tr><td style="color:#045dab;border-top:1px dashed #045dab;border-bottom:1px dashed #045dab;"><strong>Peso Fetal Estimado según fórmula de Hadlock (DBP-CC-CA-LF)</strong></td><td style="text-align:center;border-top:1px dashed #045dab;border-bottom:1px dashed #045dab;"><strong>'.$this->data->PFE.'</strong> </td><td style="text-align:center;border-top:1px dashed #045dab;border-bottom:1px dashed #045dab;"><strong>'.$this->data->PFEPCT.'</strong> </td><td style="text-align:center;border-top:1px dashed #045dab;border-bottom:1px dashed #045dab;"><strong>'.$this->data->PFERANGO.'</strong></td></tr>
    <tr><td>Relación CC / CA (Hadlock)</td><td style="text-align:center;">'.$this->data->CCCA.'</td><td style="text-align:center;">'.$this->data->CCCAPCT.'</td><td style="text-align:center;">'.$this->data->CCCARANGO.'</td></tr>
    <tr><td>Indice Cefálico (DBP / DOF)</td><td style="text-align:center;">'.$this->data->IC.'</td><td></td><td style="text-align:center;">( 70% - 86% )</td></tr>
    </tbody></table>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln(3);
    $html = '<p style="color:#045dab;"><strong>COMENTARIOS Y OBSERVACIONES</strong> <small>&nbsp;&nbsp;&nbsp;(Espacio a completar por el ecografista)</small> </p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $html = "<p>".$this->data->comentario."</p>";
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    $this->pdf->Ln();

    $html = "<p>Ecografista Dr(a): <strong>". $this->data->ecografista."</strong></p>";
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'R', true);
    $this->pdf->Ln();

    //obtener el dia de hoy
    $hoy = getdate();
    $meses= ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    $html = '<p style="border-bottom:2px solid #000;border-top:2px solid #000;">Fecha Informe: '.$hoy['mday'].'/'.$meses[$hoy['mon'] -1].'/'.$hoy['year'].'</p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);

    $html = '<p style="margin-bottom:0;font-size: 8px;">* Evaluación de crecimiento fetal (Gráfica), según referencia propuesta por Hadlock y col. Radiology 181: 129 - 133; 1991 (Normalidad Pct 10 a 90) <br>** Referencia para medición de líquido amniótico (BVM), Magann EF. Sanderson M. Martin JN y col. Am J Obstet Gynecol 1982: 1581, 2000 <br><strong>*** Para la evaluación morfológica fetal, ceñirse a recomendaciones oficiales vigentes, para Chile: Guías Perinatales MINSAL 2015</strong> <br>Ver dirección web: http://web.minsal.cl/sites/default/files/files/GUIA%20PERINATAL_2015_%20PARA%20PUBLICAR.pdf</p><p style="margin-bottom:0 !important;font-size: 8px;">Herramienta informática diseñada por Dr. Rudecindo Lagos S. Médico gineco-obstetra ultrasonografista y Cristopher Castro G. Ingenieria Civil.<br><strong>El software tiene por objetivo favorecer el análisis preliminar de los datos obtenidos en el exámen ecográfico, la interpretación clínica de los mismos, es responsabilidad exclusiva de quien realiza y certifica este documento.</strong> </p>';
    $this->pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
    //Close and output PDF document
    $base64 = chunk_split(base64_encode($this->pdf->Output('Informe.pdf', 'S')));

    echo $base64;