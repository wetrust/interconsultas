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
                        <div class="form-check">
                            <input type="radio" disabled value="0" <?php $check = ($this->solicitud->solicitud_eg == 0 ? "checked" : ""); echo $check; ?> >
                            <label>No</label>
                        </div>
                        <div class="form-check">
                            <input type="radio" disabled value="1" <?php $check = ($this->solicitud->solicitud_eg == 1 ? "checked" : ""); echo $check; ?> >
                            <label>Si</label>
                        </div>
                    </div>
                    <div class="col form-group">
                        <label>Ecografía previa de crecimiento</label>
                    </div>
                    <div class="col form-group">
                        <div class="form-check">
                            <input type="radio" disabled value="0" <?php $check = ($this->solicitud->solicitud_eco == 0 ? "checked" : ""); echo $check; ?> >
                            <label>No</label>
                        </div>
                        <div class="form-check">
                            <input type="radio" disabled value="1" <?php $check = ($this->solicitud->solicitud_eco == 1 ? "checked" : ""); echo $check; ?> >
                            <label>Si</label>
                        </div>
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
                        <input type="radio" disabled id="interconsulta.profesional.medico" value="Médico" name="interconsulta_profesional" <?php $check = ($this->solicitud->solicitud_profesional == "Médico" ? "checked" : ""); echo $check; ?> >
                        <label for="interconsulta.profesional.medico">Médico</label>
                    </div>
                    <div class="form-check">
                        <input type="radio" disabled id="interconsulta.profesional.matrona" value="Matrona" name="interconsulta_profesional" <?php $check = ($this->solicitud->solicitud_profesional == "Matrona" ? "checked" : ""); echo $check; ?> >
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
                <div class="col form-group" id="jaja.papapa">
                    <label for="interconsulta.para">Fecha</label>
                    <input type="text" disabled class="form-control" name="comentario" id="interconsulta.comentario.respuesta" value="<?php echo htmlentities($this->solicitud_evaluacion->evaluacion_fecha); ?>">
                </div>
            </div>
            <div class="row">
                <div class="col form-group">
                    <label for="interconsulta.comentario.respuesta">Comentario</label>
                    <textarea disabled class="form-control" name="comentario" id="interconsulta.comentario.respuesta"><?php echo strip_tags($this->solicitud_evaluacion->evaluacion_comentarios); ?></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body">
            <h4 class="text-center">Respuesta de profesional contrarreferente a solicitud de exámen ecográfico</h4>
            <div class="row">
                <div class="col form-group">
                    <label>¿La solicitud es para ecografía de crecimiento?</label>
                    <select class="form-control" name="solicitud_crecimiento" id="interconsulta.respuesta.crecimiento">
                        <option value="1">Si</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </div>
            <div id="contenedor">
            <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.fecha" >Fecha evaluación de interconsulta</label>
                        <input type="date" class="form-control" id="interconsulta.respuesta.fecha" name="respuesta_fecha">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.eg">Edad gestacional actual</label>
                        <input type="hidden" class="form-control" id="interconsulta.fum.copia" value="<?php echo htmlentities($this->solicitud->solicitud_fum); ?>">
                        <input type="text" class="form-control" id="interconsulta.respuesta.eg" disabled="">
                        <input type="hidden" class="form-control" name="respuesta_eg">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label>Feto en presentación</label>
                        <select class="form-control" name="respuesta_presentacion">
                            <option value="cefalica">Cefálica</option>
                            <option value="podalica">Podálica</option>
                            <option value="transversa">Transversa</option>
                            <option value="indiferente">Indiferente</option>
                        </select>
                    </div>
                    <div class="col form-group">
                        <label>Dorso fetal</label>
                        <select class="form-control" name="respuesta_dorso">
                            <option value="anterior">Anterior</option>
                            <option value="lat. izquierdo">Lateralizado izquierdo</option>
                            <option value="posterior">Posterior</option>
                            <option value="lat. derecho">Lateralizado derecho</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.liquido">Líquido amniótico</label>
                        <select class="form-control" name="respuesta_liquido">
                            <option value="Normal">Normal</option>
                            <option value="Pha leve">PHA leve</option>
                            <option value="Pha severo">PHA severo</option>
                            <option value="Oha leve">OHA leve</option>
                            <option value="Oha severo">OHA severo</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label>Anatomía Fetal</label>
                        <select multiple="" class="form-control" name="respuesta_anatomia[]">
                            <option value="no evaluada dirigidamente, pero el aspecto morfológico general es normal">No evaluada dirigidamente, pero el aspecto morfológico general es normal</option>
                            <option value="de aspecto general normal">de aspecto general normal</option>
                            <option value="hallazgos de siguientes patologías:">hallazgos ecográficos compatible con:</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.pfe"><strong>A.- Biometría ecográfica:</strong><br>Peso fetal estimado</label>
                        <input type="number" class="form-control" name="respuesta_pfe" id="interconsulta.respuesta.pfe">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.pfe.percentil">&nbsp;<br>Percentil</label>
                        <input type="text" class="form-control" disabled="" id="interconsulta.respuesta.pfe.percentil">
                        <input type="hidden" class="form-control" name="respuesta_pfe_percentil">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.uterinas"><strong>B.- Flujometría Doppler</strong><br>IP. Promedio uterinas</label>
                        <input type="text" class="form-control" name="respuesta_uterinas" id="interconsulta.respuesta.uterinas">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;<br>Percentil</label>
                        <input type="text" class="form-control" id="interconsulta.respuesta.uterinas.percentil" disabled="">
                        <input type="hidden" class="form-control" name="respuesta_uterinas_percentil">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.umbilical">IP. Arteria umbilical</label>
                        <input type="text" class="form-control" name="respuesta_umbilical" id="interconsulta.respuesta.umbilical">
                    </div>
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.umbilical.percentil">Percentil</label>
                        <input type="text" class="form-control" disabled="" id="interconsulta.respuesta.umbilical.percentil">
                        <input type="hidden" class="form-control" name="respuesta_umbilical_percentil">
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.cm">IP. Cerebral media</label>
                        <input type="text" class="form-control" name="respuesta_cm" id="interconsulta.respuesta.cm">
                    </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.cm.percentil">Percentil</label>
                            <input type="text" class="form-control" disabled="" id="interconsulta.respuesta.cm.percentil">
                            <input type="hidden" class="form-control" name="respuesta_cm_percentil">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.cmau">Cuociente CM / AU</label>
                            <input type="text" disabled class="form-control" id="interconsulta.respuesta.cmau">
                            <input type="hidden" class="form-control" name="respuesta_cmau">
                        </div>
                        <div class="col form-group">
                            <label for="interconsulta.respuesta.cmau.percentil">Percentil</label>
                            <input type="text" class="form-control" disabled="" id="interconsulta.respuesta.cmau.percentil">
                            <input type="hidden" class="form-control" name="respuesta_cmau_percentil">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p><strong>Hipótesis diagnóstica</strong></p>
                        </div>
                        <div class="col-6 form-group">
                            <label for="interconsulta.respuesta.hipotesis"><strong>Crecimiento fetal</strong></label>
                            <select class="form-control" name="respuesta_hipotesis">
                                <option value="Disminuido < p3">Disminuido < p3</option>
                                <option value="Disminuido < p10">Disminuido < p10</option>
                                <option value="Normal p10 - p 25">Normal p10 - p 25</option>
                                <option value="Normal p26 - p50">Normal p26 - p50</option>
                                <option value="Normal p51 - p 75">Normal p51 - p 75</option>
                                <option value="Normal p76 - p90">Normal p76 - p90</option>
                                <option value="Grande >p90">Grande >p90</option>
                                <option value="Grande >p97">Grande >p97</option>
                            </select>
                        </div>
                        <div class="col-6 form-group">
                            <label for="interconsulta.respuesta.hipotesis"><strong>Flujometría Doppler</strong></label>
                            <select class="form-control" name="respuesta_doppler">
                                <option value="Materno Normal + Fetal Normal">Materno Normal + Fetal Normal</option>
                                <option value="Materno Alterado + Fetal Alterado">Materno Alterado + Fetal Alterado</option>
                                <option value="Materno Alterado + Fetal Normal">Materno Alterado + Fetal Normal</option>
                                <option value="Materno Normal + Fetal Alterado">Materno Normal + Fetal Alterado</option>
                                <option value="Materno Normal + Fetal Alterado Solo CCP">Materno Normal + Fetal Alterado Solo CCP</option>
                                <option value="Materno Normal + Fetal Alterado CCP + ACM">Materno Normal + Fetal Alterado CCP + ACM</option>
                                <option value="Materno Normal + Fetal Alterado CCP + ACM + UMB">Materno Normal + Fetal Alterado CCP + ACM + UMB</option>
                                <option value="Materno Alterado + Fetal Alterado Solo CCP">Materno Alterado + Fetal Alterado Solo CCP</option>
                                <option value="Materno Alterado + Fetal Alterado CCP + ACM">Materno Alterado + Fetal Alterado CCP + ACM</option>
                                <option value="Materno Alterado + Fetal Alterado CCP + ACM + UMB">Materno Alterado + Fetal Alterado CCP + ACM + UMB</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label><strong>Textos Preconfigurados</strong></label>
                        <select class="form-control" id="textosPredefinidos"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios de exámen</strong></label>
                        <textarea type="text" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col form-group">
                        <label for="interconsulta.respuesta.ecografista">Ecografista</label>
                        <input type="text" class="form-control" name="respuesta_ecografista">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Enviar respuesta</button>
        </div>
    </div>
    <script src="https://cloud.tinymce.com/5/tinymce.min.js?apiKey=oouk84qvr4nweklpy61gp7uep4rl0h3mnn2sc4t81ay5qs1f"></script>
    <script>
        var _api = "<?php echo Config::get('URL'); ?>dashboard/configuracion_api";

        $(document).ready(function () {
            $("#interconsulta\\.respuesta\\.pfe, #interconsulta\\.respuesta\\.uterinas, #interconsulta\\.respuesta\\.umbilical, #interconsulta\\.respuesta\\.cm, input[name='respuesta_ecografista']").keydown(function(event){
                if(event.keyCode == 13) {
                event.preventDefault();
                return false;
                }
            });

            let args = {
                action: "get"
            }

            $.post(_api, args).done(function(data){
                $('#textosPredefinidos').empty();
                if (Object.keys(data).length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        var response = '<option value="' + data[i].texto_id + '">' + data[i].texto_titulo + '</option>';
                        $('#textosPredefinidos').append(response);
                    }   
                }
            });

            $("#textosPredefinidos").on("click", function(){
                $("#textosPredefinidos").trigger("change");
            });

            $("#textosPredefinidos").on("change", function(){
                let args = {
                    action: "read",
                    texto_id: $(this).val()
                }

                $.post(_api, args).done(function(data){
                    if (Object.keys(data).length > 0) {
                        tinyMCE.activeEditor.setContent(data.texto_text);
                    }
                });
            });

            tinymce.init({ selector:'textarea#editable',height : "540" });

            $('#interconsulta\\.respuesta\\.crecimiento').on("change", function(){
                if ($(this).val() == 0){
                    $("#contenedor").addClass("d-none");
                }
                else{
                    $("#contenedor").removeClass("d-none");
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
                    $("input[name='respuesta_eg']").val('0 semanas');
                } 
                else if (((FExamen.getTime() - FUM.getTime()) / unasemana) > 42) {
                    $('#interconsulta\\.respuesta\\.eg').val('42 semanas');
                    $("input[name='respuesta_eg']").val('42 semanas');
                } 
                else {
                    $('#interconsulta\\.respuesta\\.eg').val(Math.floor(EdadGestacional) + '.' + Math.round((EdadGestacional - Math.floor(EdadGestacional)) * 7) + ' semanas');
                    $("input[name='respuesta_eg']").val(Math.floor(EdadGestacional) + '.' + Math.round((EdadGestacional - Math.floor(EdadGestacional)) * 7) + ' semanas');
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
                    $("input[name='respuesta_uterinas_percentil']").val(pctUtAdvanced(eg,ut));

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
                    $("input[name='respuesta_pfe_percentil']").val(pctpfeAdvanced(eg,pfe));

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
                    $("input[name='respuesta_cm_percentil']").val(pctacmAdvanced(eg,acm));

                }

                if (acm > 0){
                    if ($("#interconsulta\\.respuesta\\.umbilical").val() > 0){
                        var ccp = (acm / $('#interconsulta\\.respuesta\\.umbilical').val());
                        $('#interconsulta\\.respuesta\\.cmau').val(ccp.toFixed(2)).trigger("change");
                        $("input[name='respuesta_cmau']").val(ccp.toFixed(2));
                    }
                }
            });

            $("#interconsulta\\.respuesta\\.umbilical").on("change", function(){

                var eg = $("#interconsulta\\.respuesta\\.eg").val();
                var aumb = $("#interconsulta\\.respuesta\\.umbilical").val();

                eg = String(eg);
                eg = eg.replace("semanas", "");

                if (eg.length > 0){

                    eg =  parseFloat(eg).toFixed();
                    $("#interconsulta\\.respuesta\\.umbilical\\.percentil").val(pctauAdvanced(eg,aumb));
                    $("input[name='respuesta_umbilical_percentil']").val(pctauAdvanced(eg,aumb));

                }

                if ($("#interconsulta\\.respuesta\\.cm").val() > 0){
                    if ($("#interconsulta\\.respuesta\\.umbilical").val() > 0){
                        var ccp = ($("#interconsulta\\.respuesta\\.cm").val() / $('#interconsulta\\.respuesta\\.umbilical').val());
                        $('#interconsulta\\.respuesta\\.cmau').val(ccp.toFixed(2)).trigger("change"); 
                        $("input[name='respuesta_cmau']").val(ccp.toFixed(2));                       
                    }
                }
            });

            $("#interconsulta\\.respuesta\\.cmau").on("change", function(){
                var eg = $("#interconsulta\\.respuesta\\.eg").val();
                var cmau = $("#interconsulta\\.respuesta\\.cmau").val();

                eg = String(eg);
                eg = eg.replace("semanas", "");

                if (eg.length > 0){

                    eg =  parseFloat(eg).toFixed();
                    $("#interconsulta\\.respuesta\\.cmau\\.percentil").val(pctcmauAdvanced(eg,cmau));
                    $("input[name='respuesta_cmau_percentil']").val(pctcmauAdvanced(eg,cmau));

                }
            });
        });

        function pctcmauAdvanced(eg, cmau){
            var xpct5 = [], xpct95 = [];
            xpct5[20] = 0.78; xpct5[21] = 0.87; xpct5[22] = 0.95; xpct5[23] = 1.02;
            xpct5[24] = 1.09; xpct5[25] = 1.15; xpct5[26] = 1.2; xpct5[27] = 1.24;
            xpct5[28] = 1.28; xpct5[29] = 1.31; xpct5[30] = 1.33; xpct5[31] = 1.35;
            xpct5[32] = 1.36; xpct5[33] = 1.36; xpct5[34] = 1.36; xpct5[35] = 1.34;
            xpct5[36] = 1.32; xpct5[37] = 1.3; xpct5[38] = 1.26; xpct5[39] = 1.22;
            xpct5[40] = 1.18;

            xpct95[20] = 1.68; xpct95[21] = 1.88; xpct95[22] = 2.06; xpct95[23] = 2.22;
            xpct95[24] = 2.36; xpct95[25] = 2.49; xpct95[26] = 2.6;	xpct95[27] = 2.7;
            xpct95[28] = 2.78; xpct95[29] = 2.84; xpct95[30] = 2.89; xpct95[31] = 2.92;
            xpct95[32] = 2.93; xpct95[33] = 2.93; xpct95[34] = 2.91; xpct95[35] = 2.87;
            xpct95[36] = 2.82; xpct95[37] = 2.75; xpct95[38] = 2.67; xpct95[39] = 2.57;

            if (eg < 20) {  
                return 0;
            }
            else if (eg > 40)
            {
                return 0;
            }
            else {
                eg = parseInt(eg);
                var uno = xpct95[eg] - xpct5[eg];
                var dos = cmau - xpct5[eg];
                var pctFinal = (90 / (uno) * (dos)) +5

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

        function pctauAdvanced(eg, aumb) {
            var pct5 = [], pct95 = [];

            pct5[0] = 0.97;	pct5[1] = 0.95;
            pct5[2] = 0.94;	pct5[3] = 0.92;
            pct5[4] = 0.9;	pct5[5] = 0.89;
            pct5[6] = 0.87;	pct5[7] = 0.85;
            pct5[8] = 0.82;	pct5[9] = 0.8;
            pct5[10] = 0.78; pct5[11] = 0.75;
            pct5[12] = 0.73; pct5[13] = 0.7;
            pct5[14] = 0.67; pct5[15] = 0.65;
            pct5[16] = 0.62; pct5[17] = 0.58;
            pct5[18] = 0.55; pct5[19] = 0.52;
            pct5[20] = 0.49;

            pct95[0] = 1.6;	pct95[1] = 1.56;
            pct95[2] = 1.53; pct95[3] = 1.5;
            pct95[4] = 1.46; pct95[5] = 1.43;
            pct95[6] = 1.4;	pct95[7] = 1.37;
            pct95[8] = 1.35; pct95[9] = 1.32;
            pct95[10] = 1.29; pct95[11] = 1.27;
            pct95[12] = 1.25; pct95[13] = 1.22;
            pct95[14] = 1.2; pct95[15] = 1.18;
            pct95[16] = 1.16; pct95[17] = 1.14;
            pct95[18] = 1.13; pct95[19] = 1.11;
            pct95[20] = 1.09;
            
            aumb = aumb.toString();
            aumb = aumb.replace(",", ".");
            aumb = parseFloat(aumb);
        
            if (eg < 20) {
                return 0;
            }
            else if (eg > 40)
            {
                return 0;
            }
            else {
                eg = parseInt(eg);
                eg = eg - 20;
                var uno=pct95[eg] - pct5[eg];
                var dos=aumb - pct5[eg];
                var resultado = parseInt(90 / (uno) * (dos) + 5);
                var pctAUMB = '';
                //truncador de Pct, sobre 100 o bajo 1
                if (resultado > 99){
                    pctAUMB = '> 99';
                }
                else if (resultado < 1){
                    pctAUMB = '< 1';
                }
                else{
                    pctAUMB = resultado;
                }
                return pctAUMB;
            }
        }
    </script>
    </form>
    <?php } else { ?>
        <div class="alert alert-danger" role="alert">Esta interconsulta no existe.</div>
    <?php } ?>
</div>