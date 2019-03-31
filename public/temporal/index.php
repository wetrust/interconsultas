<?php
// create new PDF document

class MYPDF extends TCPDF {

    //Page header
    public function Header() {
        // Logo
        //$image_file = K_PATH_IMAGES.'logo_example.jpg';
        //$this->Image($image_file, 10, 10, 15, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
        // Set font
        //$this->SetFont('helvetica', 'B', 20);
        // Title
        //$this->Cell(0, 15, '<< TCPDF Example 003 >>', 0, false, 'C', 0, '', 0, false, 'M', 'M');
    }

    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        $this->SetY(-15);
        // Set font
        $this->SetFont('helvetica', 'I', 8);
        // Page number
        $this->Cell(0, 10, 'Página '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }
}

$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('WT');
$pdf->SetTitle('Imágenes Ecográficas');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');

// set default header data
//$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 009', PDF_HEADER_STRING);

// set header and footer fonts
//$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
//$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

// set auto page breaks
//$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// -------------------------------------------------------------------

// add a page
$pdf->AddPage('P', 'LETTER');

// set JPEG quality
$pdf->setJPEGQuality(90);

// Image method signature:
// Image($file, $x='', $y='', $w=0, $h=0, $type='', $link='', $align='', $resize=false, $dpi=300, $palign='', $ismask=false, $imgmask=false, $border=0, $fitbox=false, $hidden=false, $fitonpage=false)

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$pdf->SetFont('dejavusans', '', 8);

// Set some content to print
$html = '<h1 style="text-align:center">Impresión de Imágenes Gineco-Obstétrica</h1>
<div><div style="display: inline-block;width:33%;height:200px;float:left;"><strong>Paciente Sra. (Srta.):</strong>' . $this->user_name .'</div><div style="display: inline-block;width:33%;height:200px;float:left;"><strong>RUT:</strong> ' . $this->user_id .'</div><div style="display: inline-block;width:33%;height:200px;float:left;"><strong>Fecha de Exámen:</strong> ' . $this->StudyDate .'</div></div>';

// Print text using writeHTMLCell()
$pdf->writeHTMLCell('', 10, '', 35, $html, 0, 1, 0, true, '', true);

// Image example with resizing
if (count($this->user_images) == 1){
    $pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[0][1], '', '', 180, 140, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
}
else if (count($this->user_images) == 2){
$pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[0][1], '60', '', 100, 88, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
$pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[1][1], '60', 170, 100, 88, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
}
else if (count($this->user_images) == 4){
$pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[0][1], '', '', 90, 66, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
$pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[1][1], '110', '', 90, 66, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
$pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[2][1], PDF_MARGIN_LEFT, '135', 90, 66, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
$pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[3][1], '110', '', 90, 66, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
}
else if (count($this->user_images) == 6){
    $pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[0][1], '', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
    $pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[1][1], '110', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
    $pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[2][1], PDF_MARGIN_LEFT, '131', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
    $pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[3][1], '110', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
    $pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[4][1], PDF_MARGIN_LEFT, '196', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
    $pdf->Image(Config::get('DICOM_DIRECTORY') . $this->user_images[5][1], '110', '', 88, 63, 'JPG', '', 'T', true, 150, '', false, false, 1, false, false, false);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// test fitbox with all alignment combinations

//$horizontal_alignments = array('L', 'C', 'R');
//$vertical_alignments = array('T', 'M', 'B');

//$x = 15;
//$y = 35;
//$w = 30;
//$h = 30;
// test all combinations of alignments
//for ($i = 0; $i < 3; ++$i) {
//    $fitbox = $horizontal_alignments[$i].' ';
//    $x = 15;
//    for ($j = 0; $j < 3; ++$j) {
//        $fitbox[1] = $vertical_alignments[$j];
//        $pdf->Rect($x, $y, $w, $h, 'F', array(), array(128,255,128));
//        $pdf->Image(Config::get('DICOM_DIRECTORY') . "/17378168-7/1.2.276.0.26.1.1.1.2.2018.122.54258.3440124_0001_000005_15223582490561.jpg", $x, $y, $w, $h, 'JPG', '', '', false, 300, '', false, false, 0, $fitbox, false, false);
//        $x += 32; // new column
//    }
//    $y += 32; // new row
//}

//$x = 115;
//$y = 35;
//$w = 25;
//$h = 50;
//for ($i = 0; $i < 3; ++$i) {
//    $fitbox = $horizontal_alignments[$i].' ';
//    $x = 115;
//    for ($j = 0; $j < 3; ++$j) {
//        $fitbox[1] = $vertical_alignments[$j];
//        $pdf->Rect($x, $y, $w, $h, 'F', array(), array(128,255,255));
//        $pdf->Image(Config::get('DICOM_DIRECTORY') . "/17378168-7/1.2.276.0.26.1.1.1.2.2018.122.54258.3440124_0001_000005_15223582490561.jpg", $x, $y, $w, $h, 'JPG', '', '', false, 300, '', false, false, 0, $fitbox, false, false);
//        $x += 27; // new column
//    }
//    $y += 52; // new row
//}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Stretching, position and alignment example

//$pdf->SetXY(110, 200);
//$pdf->Image(Config::get('DICOM_DIRECTORY') . "/17378168-7/1.2.276.0.26.1.1.1.2.2018.122.54258.3440124_0001_000005_15223582490561.jpg", '', '', 40, 40, '', '', 'T', false, 300, '', false, false, 1, false, false, false);
//$pdf->Image(Config::get('DICOM_DIRECTORY') . "/17378168-7/1.2.276.0.26.1.1.1.2.2018.122.54258.3440124_0001_000005_15223582490561.jpg", '', '', 40, 40, '', '', '', false, 300, '', false, false, 1, false, false, false);

// -------------------------------------------------------------------

//Close and output PDF document
$pdf->Output('example_009.pdf', 'I');
