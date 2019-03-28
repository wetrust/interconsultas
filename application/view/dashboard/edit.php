<div class="container">
    <h1 class="text-center">Responder interconsulta</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <?php if ($this->solicitud) { ?>
    <form method="post" action="<?php echo Config::get('URL'); ?>dashboard/save">
    <div class="card mt-1">
        <div class="card-body">
            <h4>Datos de la interconsulta</h4>
            <input type="hidden" name="solicitud_id" value="<?php echo htmlentities($this->solicitud->solicitud_id); ?>" />
            <div class="row">
                <div class="col form-group">
                    <label>Nombre del paciente:</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_nombre); ?>">
                </div>
                <div class="col form-group">
                    <label>RUT del paciente:</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_rut); ?>">
                </div>
                <div class="col form-group">
                    <label>Fecha de solicitud:</label>
                    <input type="date" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_fecha); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label>Ege conocida precozmente</label>
                </div>
                <div class="col form-group">
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_eg); ?>">
                </div>
                <div class="col form-group">
                    <label>Ecografía previa de crecimiento</label>
                </div>
                <div class="col form-group">
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_eco); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label>FUM operacional</label>
                    <input type="date" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_fum); ?>">
                </div>
                <div class="col form-group">
                    <label>Edad Gestacional</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_egestacional); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label>Diagnóstico de referencia</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_diagnostico); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label>Ciudad procedencia de la paciente</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_ciudad); ?>">
                </div>
                <div class="col form-group">
                    <label>Lugar de control prenatal</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_lugar); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <h5><span class="badge badge-default p-2" for="interconsulta.profesional">Datos del profesional referente</span></h5>
                </div>
                <div class="col form-group">
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.profesional.medico" value="Médico" name="interconsulta_profesional">
                        <label for="interconsulta.profesional.medico">Médico</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.profesional.matrona" value="Matrona" name="interconsulta_profesional">
                        <label for="interconsulta.profesional.matrona">Matrón/Matrona</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label>Nombre:</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_nombreprofesional); ?>">
                </div>
                <div class="col form-group">
                    <label>Email (de trabajo):</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_email); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label for="interconsulta.para" class="my-3"><strong>Ecografista de contrarreferencia</strong></label>
                </div>
                <div class="col form-group">
                    <label>Email (contrareferencia)</label>
                    <input type="text" class="form-control" disabled value="<?php echo htmlentities($this->solicitud->solicitud_profesionalemail); ?>">
                </div>
            </div>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body">
            <h4>Responder a esta solicitud de interconsulta</h4>
            <div class="row">
                <div class="col form-group">
                    <label for="interconsulta.para">¿Interconsulta aceptada?</label>
                </div>
                <div class="col form-group">
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.aceptada.si" value="1" name="interconsulta_aceptada" class="form-check-input" <?php if ($this->solicitud_evaluacion->evaluacion_aceptada == 1) { echo 'checked'; } ?>>
                        <label class="form-check-label" for="interconsulta.aceptada.si">Si</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.aceptada.no" value="0" name="interconsulta_aceptada" class="form-check-input" <?php if ($this->solicitud_evaluacion->evaluacion_aceptada == 0) { echo 'checked'; } ?>>
                        <label class="form-check-label" for="interconsulta.aceptada.no">No</label>
                    </div>
                </div>
                <div class="col form-group" id="jaja.papapa">
                    <label for="interconsulta.para">¿Eco de crecimiento?</label>
                </div>
                <div class="col form-group" id="jaja.papap">
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.crecimiento.si" value="1" name="interconsulta_crecimiento" class="form-check-input" <?php if ($this->solicitud_evaluacion->eco_crecimiento == 1) { echo 'checked'; } ?>>
                        <label class="form-check-label" for="interconsulta.crecimiento.si">Si</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.crecimiento.no" value="0" name="interconsulta_crecimiento" class="form-check-input" <?php if ($this->solicitud_evaluacion->eco_crecimiento == 0) { echo 'checked'; } ?>>
                        <label class="form-check-label" for="interconsulta.crecimiento.no">No</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label for="interconsulta.comentario.respuesta">Comentario</label>
                    <input type="text" disabled class="form-control" name="comentario" id="interconsulta.comentario.respuesta" value="<?php echo htmlentities($this->solicitud_evaluacion->evaluacion_comentarios); ?>">
                </div>
            </div>
        </div>
    </div>
    <?php if ($this->solicitud_evaluacion->evaluacion_aceptada == 1) { ?>
    <div class="card mt-3">
        <div class="card-body">
            <h4 class="text-center">Respuesta de profesional contrarreferente a solicitud de exámen ecográfico</h4>
            <div class="row">
                <div class="col-6 form-group">
                    <label for="interconsulta.email">¿Solicitud de exámen relacionada con crecimiento fetal?</label>
                        <select class="form-control" id="interconsulta.respuesta.proceder">
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.fecha">Fecha evaluación de interconsulta</label>
                        <input type="date" class="form-control" id="interconsulta.respuesta.fecha">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.eg">Edad gestacional actual</label>
                        <input type="hidden" class="form-control" id="interconsulta.fum.copia" value="<?php echo htmlentities($this->solicitud->solicitud_fum); ?>">
                        <input type="text" class="form-control" id="interconsulta.respuesta.eg" disabled="">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.comentarios" class="bg-primary text-white px-1">Comentarios y observaciones respecto a solicitud ecográfica</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.comentarios">
                    </div>
                </div>
                <h5 id="interconsulta.titulo" class="text-center m-3">Resumen exámen ecográfico de biometría y flujometría Doppler Materno / Fetal</h5>
                <div class="row" id="interconsulta.respuesta.pfe.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.pfe"><strong>A.- Biometría ecográfica:</strong><br>Peso fetal estimado</label>
                        <input type="number" class="form-control" id="interconsulta.respuesta.pfe">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.pfe.percentil">&nbsp;<br>Percentil</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.pfe.percentil" disabled="">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.ccca.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.ccca">Relación cráneo / abdómen</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.ccca">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.ccca.percentil">Percentil</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.ccca.percentil" disabled="">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.liquido.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.liquido">Líquido amniótico</label>
                        <select class="form-control" id="interconsulta.respuesta.liquido">
                            <option value="normal">Normal</option>
                            <option value="pha">PHA</option>
                            <option value="oha">OHA</option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.bvm">BVM</label>
                        <input type="number" class="form-control" id="interconsulta.respuesta.bvm">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.uterinas.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.uterinas"><strong>B.- Flujometría Doppler</strong><br>IP. Promedio uterinas</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.uterinas">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;<br>Percentil</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.uterinas.percentil" disabled="">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.umbilical.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.umbilical">IP. Arteria umbilical</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.umbilical">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.umbilical.percentil">Percentil</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.umbilical.percentil" disabled="">
                    </div>
                </div>
                <div class="row" id="interconsulta.respuesta.cm.div">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.cm">IP. Cerebral media</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.cm">
                    </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.cm.percentil">Percentil</label>
                            <input type="text" class="form-control" id="interconsulta.respuesta.cm.percentil" disabled="">
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.cmau.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.cmau">Cuociente CM / AU</label>
                            <input type="text" class="form-control" disabled id="interconsulta.respuesta.cmau">
                        </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.cmau.percentil">Percentil</label>
                            <input type="text" class="form-control" id="interconsulta.respuesta.cmau.percentil" disabled="">
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.hipotesis.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.hipotesis">Hipótesis diagnóstica</label>
                            <input type="text" class="form-control" id="interconsulta.respuesta.hipotesis">
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.rciu.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.rciu">De ser RCIU, categorización según protocolo adjunto (Figuera, Gratacos y col.)</label>
                            <select class="form-control" id="interconsulta.respuesta.rciu">
                                <option value="G I">G I</option>
                                <option value="G II">G II</option>
                                <option value="g III">G III</option>
                                <option value="g IV">G IV</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.lugar.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.lugar"><strong>Próximo control</strong> Lugar:</label>
                            <input type="text" class="form-control" id="interconsulta.respuesta.lugar">
                        </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.controlfecha">Fecha</label>
                            <input type="date" class="form-control" id="interconsulta.respuesta.controlfecha">
                        </div>
                    </div>
                    <div class="row" id="interconsulta.respuesta.comentariosexamen.div">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.comentariosexamen">Comentarios de exámen</label>
                            <input type="text" class="form-control" id="interconsulta.respuesta.comentariosexamen">
                        </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.ecografista">Ecografista</label>
                            <input type="text" class="form-control" id="respuesta.ecografista">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar respuesta</button>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $("#interconsulta\\.respuesta\\.proceder").on("change", function(){
                var resultad = $(this).val();
                if (resultad == 'no') {
                    $('#interconsulta\\.respuesta\\.pfe\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.ccca\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.liquido\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.uterinas\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.umbilical\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.cm\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.cmau\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.hipotesis\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.rciu\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.lugar\\.div').addClass('d-none');
                    $('#interconsulta\\.respuesta\\.comentariosexamen\\.div').addClass('d-none');
                    $('#interconsulta\\.titulo').addClass('d-none');
                } 
                else if (resultad == 'si') {
                    $('#interconsulta\\.respuesta\\.pfe\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.ccca\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.liquido\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.bvm\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.uterinas\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.umbilical\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.cm\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.cmau\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.hipotesis\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.rciu\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.lugar\\.div').removeClass('d-none');
                    $('#interconsulta\\.respuesta\\.comentariosexamen\\.div').removeClass('d-none');
                    $('#interconsulta\\.titulo').removeClass('d-none');
                }
            });

            $('#interconsulta\\.respuesta\\.fecha').on('change', function () {
                var FExamen,FUM,EdadGestacional;
                var undia = 1000 * 60 * 60 * 24;
                var unasemana = undia * 7;
                FUM = $('#interconsulta\\.fum\\.copia').val();
                FExamen = $('#interconsulta\\.respuesta\\.fecha').val();
                FUM = new Date(FUM);
                FExamen = new Date(FExamen);
                EdadGestacional = ((FExamen.getTime() - FUM.getTime()) / unasemana).toFixed(1);
                if (FExamen.getTime() < FUM.getTime()) {
                    $('#interconsulta\\.respuesta\\.eg').val('0 semanas');
                } 
                else if (((FExamen.getTime() - FUM.getTime()) / unasemana) > 42) {
                    $('#interconsulta\\.respuesta\\.eg').val('42 semanas');
                } 
                else {
                    $('#interconsulta\\.respuesta\\.eg').val(Math.floor(EdadGestacional) + '.' + Math.round((EdadGestacional - Math.floor(EdadGestacional)) * 7) + ' semanas');
                }
            });

            $("#interconsulta\\.respuesta\\.uterinas").on("change", function(){
                var FExamen,FUM,EdadGestacional;
                var eg = $("#interconsulta\\.respuesta\\.eg").val();
                var ut = $("#interconsulta\\.respuesta\\.uterinas").val();

                eg = String(eg);
                eg = eg.replace("semanas", "");

                if (eg.length > 0){

                    eg =  parseFloat(eg).toFixed();
                    $("#interconsulta\\.respuesta\\.uterinas\\.percentil").val(pctUtAdvanced(eg,ut));

                }
                
            })

            $("#interconsulta\\.respuesta\\.pfe").on("change", function(){

                var eg = $("#interconsulta\\.respuesta\\.eg").val();
                var pfe = $("#interconsulta\\.respuesta\\.pfe").val();

                eg = String(eg);
                eg = eg.replace("semanas", "");

                if (eg.length > 0){

                    eg =  parseFloat(eg).toFixed();
                    $("#interconsulta\\.respuesta\\.pfe\\.percentil").val(pctpfeAdvanced(eg,pfe));

                }
            });

            $("#interconsulta\\.respuesta\\.cm").on("change", function(){

                var eg = $("#interconsulta\\.respuesta\\.eg").val();
                var acm = $("#interconsulta\\.respuesta\\.cm").val();

                eg = String(eg);
                eg = eg.replace("semanas", "");

                if (eg.length > 0){

                    eg =  parseFloat(eg).toFixed();
                    $("#interconsulta\\.respuesta\\.cm\\.percentil").val(pctacmAdvanced(eg,acm));

                }
            });
        });

        function pctpfeAdvanced(eg,pfe) {

            var pct10 = [], pct90 = [];

            pct10[0] = 97;pct10[1] = 121;pct10[2] = 150;pct10[3] = 185;pct10[4] = 227;pct10[5] = 275;
            pct10[6] = 331;pct10[7] = 398;pct10[8] = 471;pct10[9] = 556;pct10[10] = 652;pct10[11] = 758;
            pct10[12] = 876;pct10[13] = 1004;pct10[14] = 1145;pct10[15] = 1294;pct10[16] = 1453;
            pct10[17] = 1621;pct10[18] = 1794;pct10[19] = 1973;pct10[20] = 2154;pct10[21] = 2335;
            pct10[22] = 2513; pct10[23] = 2686; pct10[24] = 2851; pct10[25] = 2985;

            pct90[0] = 137;pct90[1] = 171;pct90[2] = 212;pct90[3] = 261;pct90[4] = 319;
            pct90[5] = 387;pct90[6] = 467;pct90[7] = 559;pct90[8] = 665;pct90[9] = 784;
            pct90[10] = 918;pct90[11] = 1068;pct90[12] = 1234;pct90[13] = 1416;pct90[14] = 1613;
            pct90[15] = 1824;pct90[16] = 2049;pct90[17] = 2285;pct90[18] = 2530;
            pct90[19] = 2781;pct90[20] = 3036;pct90[21] = 3291;pct90[22] = 3543;pct90[23] = 3786;
            pct90[24] = 4019;pct90[25] = 4234;

            if (eg < 15) {  
                return 0;
            }
            else if (eg > 40)
            {
                return 0;
            }
            else {
                eg = eg - 15;
                eg = parseInt(eg);
                var uno = pct90[eg] - pct10[eg];
                var dos = pfe - pct10[eg];
                var pctFinal = (80 / (uno) * (dos)) + 10

                var pctPFE = '';

                if (pctFinal > 99){
                    pctPFE = '> 99';
                }
                else if (pctFinal < 1){
                    pctPFE = '< 1';
                }
                else{
                    pctPFE = pctFinal.toFixed();
                }
                return pctPFE;
            }
        }

        function pctUtAdvanced(eg,ut) {
            var pct5 = [], pct95 = [];
            pct5[0] = 1.23; pct5[1] = 1.18;	pct5[2] = 1.11; pct5[3] = 1.05;
            pct5[4] = 0.99; pct5[5] = 0.94;	pct5[6] = 0.89; pct5[7] = 0.85;
            pct5[8] = 0.81; pct5[9] = 0.78;	pct5[10] = 0.74; pct5[11] = 0.71;
            pct5[12] = 0.69; pct5[13] = 0.66;	pct5[14] = 0.64; pct5[15] = 0.62;
            pct5[16] = 0.6; pct5[17] = 0.58;	pct5[18] = 0.56; pct5[19] = 0.55;
            pct5[20] = 0.54; pct5[21] = 0.52;	pct5[22] = 0.51; pct5[23] = 0.51;
            pct5[24] = 0.51; pct5[25] = 0.49;	pct5[26] = 0.48; pct5[27] = 0.48;
            pct5[28] = 0.47; pct5[29] = 0.47;	pct5[30] = 0.47;
            pct95[0] = 2.84; pct95[1] = 2.71;	pct95[2] = 2.53; pct95[3] = 2.38;
            pct95[4] = 2.24; pct95[5] = 2.11;	pct95[6] = 1.99; pct95[7] = 1.88;
            pct95[8] = 1.79; pct95[9] = 1.71;	pct95[10] = 1.61; pct95[11] = 1.54;
            pct95[12] = 1.47; pct95[13] = 1.41;	pct95[14] = 1.35; pct95[15] = 1.3;
            pct95[16] = 1.25; pct95[17] = 1.21;	pct95[18] = 1.17; pct95[19] = 1.13;
            pct95[20] = 1.11; pct95[21] = 1.06;	pct95[22] = 1.04; pct95[23] = 1.01;
            pct95[24] = 0.99; pct95[25] = 0.97;	pct95[26] = 0.95; pct95[27] = 0.94;
            pct95[28] = 0.92; pct95[29] = 0.91;	pct95[30] = 0.91;
            
            ut = ut.toString(); 
            ut = ut.replace(",", ".");
            ut = parseFloat(ut);

            if (eg < 10) {  
                return 0;
            }
            else if (eg > 40)
            {
                return 0;
            }
            else {
                eg = eg - 10;
                var uno=0;
                var dos=0;
                var resultado = '';
                if (ut > 0){
                    eg = parseInt(eg);
                    uno=pct95[eg] - pct5[eg];
                    dos=ut - pct5[eg];
                    resultado = parseInt(90 / (uno) * (dos) + 5);
                    var pctUT = '';
                    //truncador de Pct, sobre 100 o bajo 1
                    if (resultado > 99){
                        pctUT = '> 99';
                    }
                    else if (resultado < 1){
                        pctUT = '< 1';
                    }
                    else{
                        pctUT = resultado.toFixed();
                    }
                    return pctUT;
                }
                else{
                    return 0;
                }
            }
        }

        function pctacmAdvanced(eg,acm) {

            var pct5 = [], pct95 = [];

            pct5[0] = 1.24;pct5[1] = 1.29;	pct5[2] = 1.34;pct5[3] = 1.37;
            pct5[4] = 1.4;pct5[5] = 1.43;	pct5[6] = 1.44;pct5[7] = 1.45;
            pct5[8] = 1.45;pct5[9] = 1.44;	pct5[10] = 1.43;pct5[11] = 1.41;
            pct5[12] = 1.38;pct5[13] = 1.34;	pct5[14] = 1.3;pct5[15] = 1.25;
            pct5[16] = 1.19;pct5[17] = 1.13;	pct5[18] = 1.05;pct5[19] = 0.98;
            pct5[20] = 0.89;

            pct95[0] = 1.98;	pct95[1] = 2.12;	pct95[2] = 2.25;	pct95[3] = 2.36;
            pct95[4] = 2.45;	pct95[5] = 2.53;	pct95[6] = 2.59;	pct95[7] = 2.63;
            pct95[8] = 2.66;	pct95[9] = 2.67;	pct95[10] = 2.67;	pct95[11] = 2.65;
            pct95[12] = 2.62;	pct95[13] = 2.56;	pct95[14] = 2.5;	pct95[15] = 2.41;
            pct95[16] = 2.31;	pct95[17] = 2.2;	pct95[18] = 2.07;	pct95[19] = 1.92;
            pct95[20] = 1.76;

            acm = acm.toString();
            acm = acm.replace(",", ".");
            acm = parseFloat(acm);

            if (eg < 20) {  
                return 0;
            }
            else if (eg > 40)
            {
                return 0;
            }
            else {
                eg = eg - 20;
                eg = parseInt(eg);
                var uno = pct95[eg] - pct5[eg];
                var dos = acm - pct5[eg];
                var resultado = parseInt(90 / (uno) * (dos) + 5);
                var pctACM = '';

                //truncador de Pct, sobre 100 o bajo 1
                if (resultado > 99){
                    pctACM = '> 99';
                }
                else if (resultado < 1){
                    pctACM = '< 1';
                }
                else{
                    pctACM = resultado.toFixed();
                }
                return pctACM;
            }
        }

    </script>
    <?php } ?>
    </form>
    <?php } else { ?>
        <div class="alert alert-danger" role="alert">Esta interconsulta no existe.</div>
    <?php } ?>
</div>