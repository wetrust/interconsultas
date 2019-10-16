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

    // -------------------------------------------------------------------

    // add a page
    $this->pdf->AddPage('P', 'LETTER');

    // set JPEG quality
    $this->pdf->setJPEGQuality(90);
    $this->pdf->SetFont('Helvetica', '', 9);


    if (count($this->user_images) != 4){
        $this->pdf->Ln(6);
    }
    $html = '<h3 style="border-bottom:2px double #000;text-align: center;"><strong>Impresión de Imágenes Gineco-Obstétrica</strong></h3>';
    $this->pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);
    $this->pdf->Ln(4);
    
    // Image example with resizing
    if (count($this->user_images) == 1){
        $this->pdf->Image($this->user_images[0], '', '', 180, 140, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
    }
    else if (count($user_images) == 2){
        $this->pdf->Image($this->user_images[0], '60', '', 100, 88, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
        $this->pdf->Image($this->user_images[1], '60', 170, 100, 88, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
    }
    else if (count($user_images) == 4){
        $this->pdf->Image($this->user_images[0], '', '', 88, 74, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
        $this->pdf->Image($this->user_images[1], '110', '', 88, 74, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
        $this->pdf->Image($this->user_images[2], PDF_MARGIN_LEFT, '125', 88, 74, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
        $this->pdf->Image($this->user_images[3], '110', '', 88, 74, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
    }
    else if (count($user_images) == 6){
        $this->pdf->Image($this->user_images[0], '', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
        $this->pdf->Image($this->user_images[1], '110', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
        $this->pdf->Image($this->user_images[2], PDF_MARGIN_LEFT, '115', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
        $this->pdf->Image($this->user_images[3], '110', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
        $this->pdf->Image($this->user_images[4], PDF_MARGIN_LEFT, '186', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
        $this->pdf->Image($this->user_images[5], '110', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
    }

    //para enviar por email
    $tmp = Config::get('PATH_AVATARS');
    $this->pdf->Output("$tmp/informe.pdf", "F");
    /////////