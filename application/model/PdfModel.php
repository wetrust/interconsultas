<?php

class PdfModel extends TCPDF {

    //Page header
    public function Header() {
        // Logo
        //$image_file = K_PATH_IMAGES.'logo_example.jpg';
        //$this->Image($image_file, 10, 10, 15, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
        // Set font
        $this->SetFont('helvetica', '', 9);
        // Title
        $have = MembreteModel::haveMembrete();

        if ($have == true){
            $membrete = MembreteModel::getMembrete();
            $membrete = '<p style="color:#0275d8;">'. $membrete->membrete_text . '</p>';

            $this->writeHTMLCell('', '', '', 15, $membrete, 0, 1, 0, true, 'L', true);
            $this->Ln(5);
        }
        
    }

    // Page footer
    public function Footer() {
        $this->SetY(-15);
        $this->SetFont('helvetica', 'I', 8);
        $this->Cell(0, 10, 'Página '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }
}