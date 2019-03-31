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
        $this->SetY(-15);
        $this->SetFont('helvetica', 'I', 8);
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
//$html = '<h1 style="text-align:center">Evaluación ecográfica del crecimiento fetal</h1>
//<div><div style="display: inline-block;width:33%;height:200px;float:left;"><strong>Paciente Sra. (Srta.):</strong>' . $this->user_name .'</div><div style="display: inline-block;width:33%;height:200px;float:left;"><strong>RUT:</strong> ' . $this->user_id .'</div><div style="display: inline-block;width:33%;height:200px;float:left;"><strong>Fecha de Exámen:</strong> ' . $this->StudyDate .'</div></div>';

// Print text using writeHTMLCell()
//$pdf->writeHTMLCell('', 10, '', 40, $html, 0, 1, 0, true, '', true);

$html = "<h1>Evaluación ecográfica del crecimiento fetal</h1>";
$pdf->writeHTMLCell('', '', '10', '', $html, 0, 1, 0, true, 'C', true);

$html = "<p><strong>Paciente Sra. (Srta.): </strong>:PACIENTE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Edad Materna: </strong> :EDADMATERNA años.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Fecha de Exámen: </strong>:FEXAMEN</p>";
$pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, 'J', true);

$html = "<p><strong>ID Paciente: </strong>:IDPACIENTE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> Motivo de exámen: </strong> :MOTIVO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> Patología Obstétrica: </strong>:PATOLOGIAOBSTETRICA</p>";
$pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);

$html = "<p><strong>FUM: </strong>:FUR <br><strong>Ege: </strong>:EG semanas <br><strong>FPP: </strong>:FPP</p>";
$pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);

$html = "<p><strong style='color:#045dab;'>DESCRIPCIÓN</strong> </p><p style='margin-bottom:0;'>:LINEA1 <br>:LINEA2</p><p style='margin-bottom:0; word-wrap: break-word;'>:LINEA3</p><p>:LINEA4 <br>:LINEA5 <br>:LINEA6</p><p></p>";
$pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);

$html = '<table style="border"> <tbody> <tr> <th style="color:#045dab;">BIOMETRÍA FETAL</th> <th style="text-align:center;">Valor observado</th> <th class="text-center">Pct de Crecimiento</th> <th class="text-center">Referencia para Edad</th> </tr><tr> <td>DBP (Hadlock):</td><td style="text-align:center;">:DBP</td><td class="text-center">:DBPPCT</td><td class="text-center">:DBPRANGO</td></tr><tr> <td>DOF (Jeanty):</td><td style="text-align:center;">:DOF</td><td class="text-center">:DOFPCT</td><td class="text-center">:DOFRANGO</td></tr><tr> <td>CC (Hadlock):</td><td style="text-align:center;">:CC</td><td class="text-center">:CCPCT</td><td class="text-center">:CCRANGO</td></tr><tr> <td>CA (Hadlock):</td><td style="text-align:center;">:CA</td><td class="text-center">:CAPCT</td><td class="text-center">:CARANGO</td></tr><tr> <td style="padding-bottom: 15px !important;">LF (Hadlock):</td><td style="text-align:center;padding-bottom: 15px !important;">:LF</td><td style="text-align:center;padding-bottom: 15px !important;">:LFPCT</td><td style="text-align:center;padding-bottom: 15px !important;">:LFRANGO</td></tr><tr> <td style="border-top:1px dashed #045dab;"><strong>Peso Fetal Estimado según fórmula de Hadlock (DBP-CC-CA-LF)</strong> </td><td style="text-align:center;border-top:1px dashed #045dab;"><strong>:PFE</strong> </td><td style="text-align:center;border-top:1px dashed #045dab;"><strong>:PFEPCT</strong> </td><td style="text-align:center;border-top:1px dashed #045dab;"><strong>:PFERANGO</strong> </td></tr><tr> <td style="border-top:1px dashed #045dab;">Relación CC / CA (Hadlock)</td><td class="text-center" style="border-top:1px dashed #045dab;">:CCCA</td><td class="text-center" style="border-top:1px dashed #045dab;">:CCCAPCT</td><td class="text-center" style="border-top:1px dashed #045dab;">:CCCARANGO</td></tr><tr> <td>Indice Cefálico (DBP / DOF)</td><td style="text-align:center;">:IC</td><td></td><td class="text-center">( 70% - 86% )</td></tr><tr> <td></td><td></td><td></td><td></td></tr></tbody> </table>';
$pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);

$html = "<p style='margin-bottom;0px;padding-bottom:0px;margin-bottom:0px;'><strong style='color:#045dab;'>COMENTARIOS Y OBSERVACIONES</strong> <small>&nbsp;&nbsp;&nbsp;(Espacio a completar por el ecografista)</small> </p><p style='max-width: 700px;text-align: justify;margin-top:0px;padding-top:0px;'>:COMENTARIO</p>";
$pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);

$html = "<p class='text-right top40' style='margin-right:100px;'>Ecografista Dr(a): <strong>:ECOGRAFISTA</strong> </p><span style='border-top: 1px solid #000;width: 100% !important;display: block;'></span> <p>Fecha Informe: :DATEINFORME</p><span style='border-top: 2px solid #000;width: 100% !important;display: block;'></span>";
$pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);

$html = '<p style="margin-bottom:0;font-size: 8px;">* Evaluación de crecimiento fetal (Gráfica), según referencia propuesta por Hadlock y col. Radiology 181: 129 - 133; 1991 (Normalidad Pct 10 a 90) <br>** Referencia para medición de líquido amniótico (BVM), Magann EF. Sanderson M. Martin JN y col. Am J Obstet Gynecol 1982: 1581, 2000 <br><strong>*** Para la evaluación morfológica fetal, ceñirse a recomendaciones oficiales vigentes, para Chile: Guías Perinatales MINSAL 2015</strong> <br>Ver dirección web: http://web.minsal.cl/sites/default/files/files/GUIA%20PERINATAL_2015_%20PARA%20PUBLICAR.pdf</p><p style="margin-bottom:0 !important;font-size: 8px;">Herramienta informática diseñada por Dr. Rudecindo Lagos S. Médico gineco-obstetra ultrasonografista y Cristopher Castro G. Ingenieria Civil.<br><strong>El software tiene por objetivo favorecer el análisis preliminar de los datos obtenidos en el exámen ecográfico, la interpretación clínica de los mismos, es responsabilidad exclusiva de quien realiza y certifica este documento.</strong> </p>';
$pdf->writeHTMLCell('', '', '', '', $html, 0, 1, 0, true, '', true);
//Close and output PDF document
$pdf->Output('example_009.pdf', 'I');