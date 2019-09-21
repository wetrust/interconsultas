var modalModificar ={};

$(document).ready(function(){
    $("#interfaz\\.enviar").on("click", function(){
        let selecciono = false;
        selecciono = $("#Mhome").hasClass("active");
        let email = "";
        let informe = $("#exampleModal").data("informe");
        let solicitud = $("#exampleModal").data("solicitud");
        if (selecciono){
            email = $("#interfaz\\.email option:selected").val();
        }
        else{
            email = $("#interfaz\\.email\\.write").val();
        }
        let args = {email: email,informe: informe,solicitud: solicitud}
        $.post(_api  + 'email_manual_autorreferido', args).done(function(data){
            if (Object.keys(data).length > 0) {
                if (data.result){
                    alert("Enviado exitosamente");
                }
                else{
                    alert("Hubo un error al enviar el correo");
                }
            }
        });
    });
});

function loadInFinish(){
	$("#tabla\\.resultado").removeClass("d-none");
    $("#mensaje\\.resultado").removeClass("d-none");
    $("#card\\.header").addClass("d-none");
	$("#formulario\\.solicitud").addClass("d-none");
	
    $.get('dashboard/finish').done(function(data){
        buildFinishTable(data);
    });
}
function loadInProcess(){
    $("#tabla\\.resultado").removeClass("d-none");
    $("#mensaje\\.resultado").removeClass("d-none");
    $("#card\\.header").addClass("d-none");
    $("#formulario\\.solicitud").addClass("d-none");
    $.get('dashboard/process').done(function(data){
        $('#tabla\\.resultado').empty();
        if (Object.keys(data).length > 0) {
            $("#mensaje\\.resultado").addClass("d-none");
            loadInProcessData(data);
        }
        else{
            $("#mensaje\\.resultado").removeClass("d-none");
            $("#mensaje\\.resultado").html("No tienes interconsultas en espera");
        }
    });
}
function loadInProcessData(data){
    $("#mensaje\\.resultado").addClass("d-none");
    var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Edad gestacional</th><th>Motivo de exámen</th><th>Agendada</th><th>Confirmada</th><th>Accion</th></tr></thead><tbody>';
    
    $.each(data, function(i, value) {
        let fecha = value.evaluacion_fecha.split('-');
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_egestacional +'</td><td>' + value.solicitud_diagnostico +'</td><td>'+fecha+'</td><td>'+ value.solicitud_confirmada+'</td>';
        tabla += '<td><button class="btn examen btn-secondary" data-id='+ value.solicitud_id + '>Ir a examen Eco</button><button class="btn modificar btn-secondary" data-id='+ value.solicitud_id + '>Modificar solicitud</button></td></tr>';
    });
    tabla += '</tbody>';
    $('#tabla\\.resultado').append(tabla);
    $('#tabla\\.resultado tr > td > button.examen').on("click", function(){
        let solicitud_id =  $(this).data("id");
        $("#ver\\.interconsulta\\.titulo").html("Datos de la interconsulta");
        $('#ver\\.interconsulta\\.contenedor').empty().append('<div class="card-header g-verde" id="headingOne"> <button class="btn btn-link text-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Datos de la interconsulta ( Abrir / Cerrar )</button></div><div id="collapseOne" class="collapse border " aria-labelledby="headingOne" data-parent="#ver\\.interconsulta\\.contenedor"> <div class="card-body"> <input type="hidden" id="solicitud_id" value=""/> <div class="row"> <div class="col form-group"> <label>Nombre del paciente:</label> <input type="text" class="form-control" disabled id="solicitud_nombre"> </div><div class="col form-group"> <label>Fecha de solicitud:</label> <input type="text" class="form-control" disabled id="solicitud_fecha"> </div><div class="col form-group"> <label>FUR Referida o corregida</label> <input type="date" class="form-control" disabled id="solicitud_fum"> </div><div class="col form-group"> <label>Edad Gestacional</label> <input type="text" class="form-control" disabled id="solicitud_egestacional"> </div></div><div class="row"> <div class="col form-group"> <label>RUT del paciente:</label> <input type="text" class="form-control" disabled id="solicitud_rut"> </div><div class="col form-group"> <label>Paridad</label> <input type="text" class="form-control" name="respuesta_paridad" disabled> </div><div class="col form-group"> <label>Ciudad de procedencia</label> <input type="text" class="form-control" disabled id="solicitud_ciudad"> </div><div class="col form-group"> <label>Lugar de control habitual</label> <input type="text" class="form-control" disabled id="solicitud_lugar"> </div></div><div class="row"> <div class="col my-2 form-group"> <label>Diagnóstico de referencia a exámen ecográfico</label> <input type="text" class="form-control" disabled id="solicitud_diagnostico"> </div><div class="col my-2 form-group"> <label>Otros antecedentes clínicos relevantes</label> <input type="text" class="form-control" name="respuesta_antecedentes" disabled> </div></div></div></div>');
        $("#ver\\.interconsulta\\.contenedor").append('<h4 class="py-3 text-center bg-secondary mb-0 text-white">Responder solicitud de interconsulta ecográfica</h4><div class="row bg-secondary m-0"> <div class="col form-group mb-0 pb-2 btn-animado"> <label class="text-white"><strong>SELECCIONE TIPO EXÁMEN</strong></label> <select class="form-control" name="solicitud_crecimiento" id="interconsulta.respuesta.crecimiento"> <option value="3">1.- Ecografía Ginecológica</option> <option value="1">2.- Ecografía precoz de urgencia</option> <option value="4">3.- Ecografía 11 / 14 semanas</option> <option value="2">4.- Ecografía 2° / 3° trimestre</option> <option value="0" selected>5.- Doppler + Eco. crecimiento</option> </select> </div><div class="col form-group mb-0"> <label class="text-white">FUM Referida o corregida</label> <input type="date" class="form-control g-verde text-white" id="interconsulta.respuesta.fur.copia" disabled> </div><div class="col form-group mb-0"> <label for="interconsulta.respuesta.fecha" class="text-white">Señalar fecha de examen</label> <input type="date" class="form-control g-verde text-white" id="interconsulta.respuesta.fecha"> </div><div class="col form-group mb-0" id="interconsulta.respuesta.edadgestacional"> <label for="interconsulta.respuesta.eg" class="text-white">Edad gestacional actual</label> <input type="hidden" class="form-control" id="interconsulta.fum.copia" value="solicitud_fum"> <input type="text" class="form-control g-verde text-white" id="interconsulta.respuesta.eg" disabled=""> <input type="hidden" class="form-control" name="respuesta_eg"> </div></div><div id="contenedor.examenes"></div>');
        $("#ver\\.interconsulta\\.contenedor").append('<div id="final" class="mt-3"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen" class="text-primary"><strong>D.- Comentarios y observaciones</strong> (Interpretación clínica)</label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div><div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista"><strong>Ecografista</strong></label> <input type="text" class="form-control" id="respuesta_ecografista"> </div></div></div>');

        $('#interconsulta\\.respuesta\\.fecha').on('change', function () {
            let EG = calcularEdadGestacional("interconsulta.fum.copia", "interconsulta.respuesta.fecha");
            let examen = document.getElementById("interconsulta.respuesta.crecimiento").value;

            if (examen == 3){
                document.getElementById("interconsulta.respuesta.eg").value = (EG.semanas *7)+ EG.dias;
                $("input[name='respuesta_eg']").val((EG.semanas *7)+ EG.dias);
                var eg = (EG.semanas *7)+ EG.dias;
                var txt = "";
                if (eg < 36){
                    txt = "Días del ciclo mestrual";
                }else if (eg < 86){
                    txt = "Días de atraso mestrual";
                }else{
                    txt = "Días de amenorrea";
                }
                $("#interconsulta\\.respuesta\\.eg").parent().children("label").html(txt);
            }else{
                document.getElementById("interconsulta.respuesta.eg").value = EG.text;
                $("input[name='respuesta_eg']").val(EG.text);
            }
            
        });

        $("#ver\\.interconsulta\\.footer").empty().prepend('<button class="btn btn-primary text-white" id="enviar.respuesta.botton">Enviar respuesta</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" id="ver.interconsulta.cerrar" data-dismiss="modal">Cerrar</button>');
        $("#ver\\.interconsulta\\.eliminar").on("click", function(){
            let solicitud_id =  $(this).data("id");
            $.get("dashboard/delete/" + solicitud_id).done(function(){
                loadInProcess();
            });
            $("#ver\\.interconsulta").modal("hide");
        });
        $("#enviar\\.respuesta\\.botton").on("click", function(){
            var tipoExm = $('#interconsulta\\.respuesta\\.crecimiento').val();
            $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><img src="https://crecimientofetal.cl/img/emoji.png" class="d-block mx-auto imng-fluid"><h3 class="text-danger text-center">ESTAMOS ENVIANDO SU RESPUESTA</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
            $('#mensaje\\.dialogo').modal("show");
            $('#mensaje\\.dialogo').on('hidden.bs.modal', function (e) {
                $('#mensaje\\.dialogo').modal("hide");
                $(this).remove();
            });

            var args = {
                solicitud_id: $("#solicitud_id").val(),
                solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                respuesta_eg: $('input[name="respuesta_eg"]').val(),
                respuesta_comentariosexamen: $('#editable').val(),
                respuesta_ecografista: $("#respuesta_ecografista").val()
            }

            if (tipoExm == 4){
                args.respuesta_anatomia = $('select[name="respuesta_anatomia"]').val(),
                args.respuesta_anatomia_extra = $('input[name="respuesta_anatomia_extra"]').val(),
                args.respuesta_embrion = $('select[name="respuesta_embrion"]').val(),
                args.respuesta_lcn = $('input[name="respuesta_lcn"]').val(),
                args.respuesta_lcn_eg = $('input[name="respuesta_lcn_eg"]').val(),
                args.respuesta_fcf = $('select[name="respuesta_fcf"]').val(),
                args.respuesta_cc = $('select[name="respuesta_hueso_nasal"]').val(),
                args.respuesta_ca = $('select[name="respuesta_ca"]').val(),
                args.respuesta_lf = $('select[name="respuesta_lf"]').val(),
                args.respuesta_dbp = $('select[name="respuesta_dbp"]').val(),
                args.respuesta_translucencia_nucal = $('input[name="respuesta_translucencia_nucal"]').val(),
                args.respuesta_hueso_nasal_valor = $('input[name="respuesta_hueso_nasal_valor"]').val(),
                args.respuesta_uterina_derecha = $('input[name="respuesta_uterina_derecha"]').val(),
                args.respuesta_uterina_derecha_percentil = $('input[name="respuesta_uterina_derecha_percentil"]').val(),
                args.respuesta_uterina_izquierda = $('input[name="respuesta_uterina_izquierda"]').val(),
                args.respuesta_uterina_izquierda_percentil = $('input[name="respuesta_uterina_izquierda_percentil"]').val(),
                args.respuesta_uterinas = $('input[name="respuesta_uterinas"]').val(),
                args.respuesta_uterinas_percentil = $('input[name="respuesta_uterinas_promedio"]').val()
            }
            else if (tipoExm == 3){
                args.respuesta_utero_ginecologica = $('input[name="respuesta_utero_ginecologica"]').val(),
                args.respuesta_anexo_izquierdo_ginecologica = $('input[name="respuesta_anexo_izquierdo_ginecologica"]').val(),
                args.respuesta_anexo_derecho_ginecologica = $('input[name="respuesta_anexo_derecho_ginecologica"]').val(),
                args.respuesta_ovario_izquierdo = $('input[name="respuesta_ovario_izquierdo"]').val(),
                args.respuesta_ovario_derecho = $('input[name="respuesta_ovario_derecho"]').val(),
                args.respuesta_douglas_ginecologica = $('input[name="respuesta_douglas_ginecologica"]').val(),
                args.respuesta_endometrio = $('input[name="respuesta_endometrio"]').val()
            }
            else if (tipoExm == 2){
                args.respuesta_placenta = $('select[name="respuesta_placenta"]').val(),
                args.respuesta_placenta_insercion = $('select[name="respuesta_placenta_insercion"]').val(),
                args.respuesta_liquido_amniotico = $('select[name="respuesta_liquido_amniotico"] option:selected').val(),
                args.respuesta_dbp = $('input[name="respuesta_dbp"]').val(),
                args.respuesta_cc = $('input[name="respuesta_cc"]').val(),
                args.respuesta_cc_pct = $('#respuesta_cc_pct').html(),
                args.respuesta_ca = $('input[name="respuesta_ca"]').val(),
                args.respuesta_ca_pct = $('#respuesta_ca_pct').html(),
                args.respuesta_lf = $('input[name="respuesta_lf"]').val(),
                args.respuesta_lf_pct = $('#respuesta_lf_pct').html(),
                args.respuesta_pfe = $('input[name="respuesta_pfe"]').val(),
                args.respuesta_ccca = $('input[name="respuesta_ccca"]').val(),
                args.respuesta_presentacion = $('select[name="respuesta_presentacion"]').val(),
                args.respuesta_dorso_segundo = $('select[name="respuesta_dorso_segundo"]').val(),
                args.respuesta_anatomia = $('select[name="respuesta_anatomia"]').val(),
                args.respuesta_anatomia_extra = $('input[name="respuesta_anatomia_extra"]').val(),
                args.respuesta_pfe_pct = $('input[name="respuesta_pfe_pct"]').val(),
                args.respuesta_ccca_pct = $('#respuesta_ccca_pct').html(),
                args.respuesta_dof = $('input[name="respuesta_dof"]').val(),
                args.respuesta_ic = $('input[name="respuesta_ic"]').val(),
                args.respuesta_bvm = $('select[name="respuesta_bvm"]').val(),
                args.respuesta_lh = $('input[name="respuesta_lh"]').val(),
                args.respuesta_lh_pct = $('#respuesta_lh_pct').html(),
                args.respuesta_cerebelo = $('input[name="respuesta_cerebelo"]').val(),
                args.respuesta_cerebelo_pct = $('#respuesta_cerebelo_pct').html(),
                args.respuesta_sexo_fetal = $('select[name="respuesta_sexo_fetal"]').val(),
                args.respuesta_fcf = $('select[name="respuesta_fcf"]').val()

                args.respuesta_lf_pct = args.respuesta_lf_pct.replace("Pct. ", "");
                args.respuesta_cc_pct = args.respuesta_cc_pct.replace("Pct. ", "");
                args.respuesta_ca_pct = args.respuesta_ca_pct.replace("Pct. ", "");
                args.respuesta_ccca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
                args.respuesta_lh_pct = args.respuesta_lh_pct.replace("Pct. ", "");
                args.respuesta_cerebelo_pct = args.respuesta_cerebelo_pct.replace("Pct. ", "");
            }
            else if (tipoExm == 1){
                args.respuesta_utero_primertrimestre = $('select[name="respuesta_utero_primertrimestre"]').val(),
                args.respuesta_saco_gestacional = $('select[name="respuesta_saco_gestacional"]').val(),
                args.respuesta_saco  = $('input[name="respuesta_saco"]').val(),
                args.respuesta_embrion = $('select[name="respuesta_embrion"]').val(),
                args.respuesta_lcn = $('input[name="respuesta_lcn"]').val(),
                args.respuesta_lcn_eg = $('input[name="respuesta_lcn_eg"]').val(),
                args.respuesta_anexo_izquierdo_primertrimestre = $('select[name="respuesta_anexo_izquierdo_primertrimestre"]').val(),
                args.respuesta_anexo_derecho_primertrimestre = $('select[name="respuesta_anexo_derecho_primertrimestre"]').val(),
                args.respuesta_douglas_primertrimestre = $('select[name="respuesta_douglas_primertrimestre"]').val()
            }
            else{
                args.respuesta_pfe = $('input[name="respuesta_pfe"]').val(),
                args.respuesta_pfe_pct = $('input[name="respuesta_pfe_pct"]').val(),
                args.respuesta_liquido = $('select[name="respuesta_liquido"] option:selected').val(),
                args.respuesta_presentacion = $('select[name="respuesta_presentacion"]').val(),
                args.respuesta_dorso = $('select[name="respuesta_dorso"] option:selected').val(),
                args.respuesta_placenta = $('select[name="respuesta_placenta"]').val(),
                args.respuesta_placenta_insercion = $('select[name="respuesta_placenta_insercion"]').val(),
                args.respuesta_uterina_derecha = $('input[name="respuesta_uterina_derecha"]').val(),
                args.respuesta_uterina_derecha_percentil = $('#respuesta_uterina_derecha_percentil').html(),
                args.respuesta_uterina_izquierda = $('input[name="respuesta_uterina_izquierda"]').val(),
                args.respuesta_uterina_izquierda_percentil = $('#respuesta_uterina_izquierda_percentil').html(),
                args.respuesta_uterinas = $('input[name="respuesta_uterinas"]').val(),
                args.respuesta_uterinas_percentil = $('#respuesta_uterinas_percentil').html(),
                args.respuesta_umbilical = $('input[name="respuesta_umbilical"]').val(),
                args.respuesta_umbilical_percentil = $('#respuesta_umbilical_percentil').html(),
                args.respuesta_cm = $('input[name="respuesta_cm"]').val(),
                args.respuesta_cm_percentil = $('#respuesta_cm_percentil').html(),
                args.respuesta_cmau = $('input[name="respuesta_cmau"]').val(),
                args.respuesta_cmau_percentil = $('#respuesta_cmau_percentil').html(),
                args.respuesta_hipotesis = $('select[name="respuesta_hipotesis"]').val(),
                args.respuesta_doppler_materno = $('select[name="respuesta_doppler_materno"]').val(),
                args.respuesta_doppler_fetal =  $('select[name="respuesta_doppler_fetal"]').val(),
                args.respuesta_anatomia =  $('select[name="respuesta_anatomia"]').val(),
                args.respuesta_anatomia_extra = $('input[name="respuesta_anatomia_extra"]').val(),
                args.respuesta_dbp = $('input[name="respuesta_dbp"]').val(),
                args.respuesta_cc = $('input[name="respuesta_cc"]').val(),
                args.respuesta_cc_pct = $('#respuesta_cc_pct').html(),
                args.respuesta_ca = $('input[name="respuesta_ca"]').val(),
                args.respuesta_ca_pct = $('#respuesta_ca_pct').html(),
                args.respuesta_lf = $('input[name="respuesta_lf"]').val(),
                args.respuesta_lf_pct = $('#respuesta_lf_pct').html(),
                args.respuesta_bvm = $('select[name="respuesta_bvm"]').val(),
                args.respuesta_ccca = $('input[name="respuesta_ccca"]').val(),
                args.respuesta_ccca_pct = $('input[name="respuesta_ccca_pct"]').val(),
                args.respuesta_sexo_fetal = $('select[name="respuesta_sexo_fetal"]').val(),
                args.respuesta_dof = $('select[name="respuesta_dof"]').val(),
                args.respuesta_fcf = $('select[name="respuesta_fcf"]').val()
 
                args.respuesta_uterina_derecha_percentil = args.respuesta_uterina_derecha_percentil.replace("Pct. ", "");
                args.respuesta_uterina_izquierda_percentil = args.respuesta_uterina_izquierda_percentil.replace("Pct. ", "");
                args.respuesta_ccca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
                args.respuesta_ca_pct = args.respuesta_ca_pct.replace("Pct. ", "");
                args.respuesta_cc_pct = args.respuesta_cc_pct.replace("Pct. ", "");
                args.respuesta_lf_pct = args.respuesta_lf_pct.replace("Pct. ", "");
                args.respuesta_umbilical_percentil = args.respuesta_umbilical_percentil.replace("Pct. ", "");
                args.respuesta_cm_percentil = args.respuesta_cm_percentil.replace("Pct. ", "");
            }
            $("#ver\\.interconsulta").modal("hide");
            $.post('dashboard/save', args).done(function(data){
                $("#interconsultas\\.estado\\.finalizadas").button('toggle').trigger("click");
                $('#mensaje\\.dialogo').modal("hide").remove();
            });
        });
    
        $.get('dashboard/agendar/' + solicitud_id).done(function(data){
            document.getElementById("solicitud_id").value = data.solicitud_id;
            document.getElementById("solicitud_nombre").value = data.solicitud_nombre;
            document.getElementById("solicitud_rut").value = data.solicitud_rut;
            document.getElementById("solicitud_fecha").value = data.solicitud_fecha;
            document.getElementById("solicitud_fum").value = data.solicitud_fum;
            document.getElementById("interconsulta.respuesta.fur.copia").value = data.solicitud_fum;
            document.getElementById("interconsulta.fum.copia").value = data.solicitud_fum;
            document.getElementById("solicitud_egestacional").value = data.solicitud_egestacional;
            document.getElementById("solicitud_diagnostico").value = data.solicitud_diagnostico;
            document.getElementById("solicitud_ciudad").value = data.solicitud_ciudad;
            document.getElementById("solicitud_lugar").value = data.solicitud_lugar;
            document.getElementById("interconsulta.respuesta.fecha").value = setInputDate();
            var nombreprofesionalPegar = data.solicitud_nombre_referente;
            document.getElementById("respuesta_ecografista").value = nombreprofesionalPegar;
            $("#interconsulta\\.respuesta\\.fecha").trigger("change");
            $("input[name='respuesta_paridad']").val(data.solicitud_paridad);
            $("input[name='respuesta_antecedentes']").val(data.solicitud_antecedentes);
            $('#interconsulta\\.respuesta\\.crecimiento').data("em",data.solicitud_ematerna).data("pm",data.solicitud_media).data("imc",data.solicitud_imc).trigger("change");
        });
    
        $('#interconsulta\\.respuesta\\.crecimiento').on("change", function(){
            if ($(this).val() == 4){
                doppleruterinas();
            }
            else if ($(this).val() == 3){
                ginecologica();
            }
            else if ($(this).val() == 2){
                segundoTrimestre();
            }
            else if ($(this).val() == 1){
                primerTrimerstre();
            }
            else{
                multiproposito();
            }

            $('#interconsulta\\.respuesta\\.fecha').trigger("change");
            if ($(this).val() == 3){
                $("#enviar\\.respuesta\\.botton").addClass("d-none");
                $("#ver\\.interconsulta\\.eliminar").addClass("d-none");
                $("#ver\\.interconsulta\\.cerrar").addClass("d-none");
                var eg = document.getElementById("interconsulta.respuesta.eg").value;
                var txt = "";
                if (eg < 36){
                    txt = "Días del ciclo mestrual";
                }else if (eg < 86){
                    txt = "Días de atraso mestrual";
                }else{
                    txt = "Días de amenorrea";
                }
                $("#interconsulta\\.respuesta\\.eg").parent().children("label").html(txt);
            }else {
                $("#enviar\\.respuesta\\.botton").removeClass("d-none");
                $("#ver\\.interconsulta\\.eliminar").removeClass("d-none");
                $("#ver\\.interconsulta\\.cerrar").removeClass("d-none");
                $("#interconsulta\\.respuesta\\.eg").parent().children("label").html('Edad gestacional actual');
            }
        });
    
        $("#ver\\.interconsulta").modal("show");
    });

    $('#tabla\\.resultado tr > td > button.modificar').on("click", function(){
        let solicitud_id =  $(this).data("id");
        $.get('dashboard/agendar/' + solicitud_id).done(function(data){solicitudModal(data);});
    });
}
function buildFinishTable(data){
    $('#tabla\\.resultado').empty();
    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><td><span class="text-primary">Nombre paciente</span></td><td><span class="text-primary">Ciudad</span></td><td><span class="text-primary">Lugar de control</span></td><td><span class="text-primary">Tipo de exámen</span></td><td><span class="text-primary">Email referente</span></td><td><span class="text-primary">Realizado</span></td><td><span class="text-primary">Accion</span></td></tr></thead><tbody>';
        $.each(data, function(i, value) {
            let tipo = "";
            if (value.tipo == "1"){
                tipo = 'Ecografía precoz de urgencia';
            } else if (value.tipo == "0"){
                tipo = 'Doppler + Eco. crecimiento';
            } else  if (value.tipo == "2"){
                tipo = 'Eco 2do / 3cer trimestre';
            } else  if (value.tipo == "3"){
                tipo = 'Eco Ginecológica';
            } else  if (value.tipo == "4"){
                tipo = 'Ecografía 11-14 semanas';
            }
            let fecha = value.fecha.split('-');
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + tipo +'</td><td>' + value.solicitud_email +'</td><td>'+ fecha +'</td>';
            if (value.tipo == "0" || value.tipo == "2"){
                tabla += '<td><button class="btn btn-secondary informe mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Informe</button><button class="btn btn-secondary grafico" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Graficas</button></td></tr>';
            }
            else{
                tabla += '<td><button class="btn btn-secondary informe mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Informe</button></td></tr>';
            }
        });
        tabla += '</tbody>';
        $('#tabla\\.resultado').append(tabla);
        $('#tabla\\.resultado tr > td > button.informe').on("click", function(){
            let solicitud_id =  $(this).data("id");
            let tipo =  $(this).data("tipo");
            let url = '';
            if (tipo == "1"){
                url = 'pdf/informe_primertrimestre/';
            } else if (tipo == "0"){
                url = 'pdf/informe_dopplercrecimiento/';
            } else  if (tipo == "2"){
                url = 'pdf/informe_segundotrimestre/';
            } else  if (tipo == "3"){
                url = 'pdf/informe_ginecologico/';
            } else if (tipo == "4"){
                url = 'pdf/informe_doppler/'
            }
            $("#ver\\.interconsulta > div").addClass("h-100");
            $("#ver\\.interconsulta > div > div").addClass("h-100");
            $("#ver\\.interconsulta\\.titulo").html("PDF Interconsulta");
            $('#ver\\.interconsulta\\.contenedor').empty();
            $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'" id="contenedorpdf"></iframe>');
            $("#ver\\.interconsulta").modal("show");
            $("#ver\\.interconsulta\\.footer").empty();
            $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-secondary" id="ver.interconsulta.enviar" data-informe="'+tipo+'" data-id="'+solicitud_id+'">Enviar exámen</button><button type="button" class="btn btn-primary" id="ver.interconsulta.cambiar.referente" data-informe="'+tipo+'" data-id="'+solicitud_id+'">Cambiar referente</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar exámen</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                let solicitud_id =  $(this).data("id");
                $.get("dashboard/delete/" + solicitud_id).done(function(data){
                    $("#ver\\.interconsulta").modal("hide");
                    loadInFinish();
                });
            });
            $("#ver\\.interconsulta\\.enviar").on("click", function(){
                callModal($(this).data("informe"), $(this).data("id"));
            });

            $("#ver\\.interconsulta\\.cambiar\\.referente").on("click", function(){
                var id = $(this).data("id");
                var modal_id;

                modal_id = uuidv4();
                btn_responder_id = uuidv4();
            
                var footerModal = '</div><div class="modal-footer"><button id="'+btn_responder_id+'" data-modal="'+modal_id+'" class="btn btn-primary">Guardar</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>';
                $('body').append('<div class="modal" tabindex="-1" role="dialog" id="'+modal_id+'"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Cambiar referente</h5></div><div class="modal-body"><ul class="nav nav-tabs" id="referenteTab" role="tablist"> <li class="nav-item bg-secondary"> <a class="nav-link bg-secondary text-white active" id="home-tab" data-toggle="tab" href="#referenteCambio" role="tab" aria-controls="home" aria-selected="true">Elegir otro referente</a> </li></ul><div class="tab-content" id="referenteTabContent"> <div class="tab-pane fade show active" id="referenteCambio" role="tabpanel" aria-labelledby="home-tab"> <div class="form-group"> <select class="form-control" id="interfaz.email.referente.cambio"></select> </div></div></div>'+ footerModal);
            
                var options = $("#interfaz\\.email > option").clone();
                $("#interfaz\\.email\\.referente\\.cambio").empty();
                $("#interfaz\\.email\\.referente\\.cambio").append(options);
                $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
                    $(this).remove();
                });
            
                $('#'+btn_responder_id).on("click", function(){
                    var modal_id = $(this).data("modal");
                    
                    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><h3 class="text-danger text-center">Guardando.... espere</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
                    $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
                        $(this).remove();
                    });
            
                    var args = {
                        solicitud_id: $(this).data("id"),
                        solicitud_data: $("#interfaz\\.email\\.referente\\.cambio").val()
                    }

                    $.post('solicitudes/actualizar', args).done(function(data){
                        var link = $("#contenedorpdf").attr('src');
                        $('#ver\\.interconsulta\\.contenedor').empty();
                        $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+link+'" id="contenedorpdf"></iframe>')

                        $('#'+modal_id).modal("hide"); $('#mensaje\\.dialogo').modal("hide");
                    });
                }).data("id",id);
            })
        });
        $('#tabla\\.resultado tr > td > button.grafico').on("click", function(){
            let solicitud_id =  $(this).data("id");
            let tipo =  $(this).data("tipo");
            let url = '';
            if (tipo == "0"){
                url = 'graph/informe_dopplercrecimiento/';
                $("#ver\\.interconsulta > div").addClass("h-100");
                $("#ver\\.interconsulta > div > div").addClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("PDF Interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty();
                $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'" id="contenedorpdf"></iframe>')
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            } else  if (tipo == "2"){
                url = 'graph/informe_segundotrimestre/';
                $("#ver\\.interconsulta > div").addClass("h-100");
                $("#ver\\.interconsulta > div > div").addClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("PDF Interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty();
                $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'"  id="contenedorpdf"></iframe>')
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            }
        });
    }
    else{
        $("#mensaje\\.resultado").removeClass("d-none");
        $("#mensaje\\.resultado").html("No tienes interconsultas finalizadas o no estas autorizado para guardar interconsultas finalizadas");
    }
}
function bvmDoppler(eg, bvm) {
    'use strict';
    let  a = [],  b = [];
    a[0] = 23; a[1] = 25; a[2] = 27; a[3] = 28; a[4] = 29; a[5] = 29; a[6] = 30; a[7] = 30; a[8] = 30; a[9] = 30; a[10] = 30; a[11] = 30; a[12] = 30; a[13] = 29; a[14] = 29; a[15] = 29; a[16] = 29; a[17] = 29; a[18] = 28; a[19] = 28; a[20] = 27; a[21] = 26; a[22] = 24; a[23] = 23; a[24] = 21;
    b[0] = 59; b[1] = 62; b[2] = 64; b[3] = 66; b[4] = 67; b[5] = 68; b[6] = 68; b[7] = 68; b[8] = 68; b[9] = 68; b[10] = 68; b[11] = 69; b[12] = 69; b[13] = 69; b[14] = 69; b[15] = 70; b[16] = 71; b[17] = 72; b[18] = 72; b[19] = 72; b[20] = 71; b[21] = 70; b[22] = 68; b[23] = 66; b[24] = 62;

    if (eg < 16 || eg > 40)
    {
        return "disminuido";
    }
    else {
        eg = parseInt(eg);
        eg = eg - 16;
        if (bvm <=  a[eg]){
            return "disminuido";
        }
        else if ( bvm <=  b[eg]){
            return "normal";
        }
        else{
            return "aumentado";
        }
    }
}
function callModal(informe, solicitud){$("#exampleModal").data("informe", informe).data("solicitud", solicitud).modal("show");}
function makeModal(button){
    let id = uuidv4();
    let titulo = uuidv4();
    let contenido = uuidv4();
    let _button = uuidv4();
    let button_string = "";

    if (typeof button !== typeof undefined){
        button_string = '<button type="button" class="btn btn-primary" id="'+_button+'" data-modal="'+id+'">'+button+'</button>';
    }

    let resultado ={
        id:id,
        titulo:titulo,
        contenido:contenido,
        button:_button,
        modal:'<div class="modal fade" tabindex="-1" role="dialog" id="'+id+'"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="'+titulo+'">Modal title</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="'+contenido+'"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>'+ button_string+'</div></div></div></div>'
    }
    
    return resultado;
}
function solicitudModal(data){
    let modal = makeModal("Guardar");

    document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
    $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
    $("#"+modal.button).on("click", function(){
        let modal =  $(this).data("modal");
        
        let diagnostico = (document.getElementById(modalModificar.diagnostico).value == "") ? document.getElementById(modalModificar.diagnostico_select).value : document.getElementById(modalModificar.diagnostico).value;
        data = {
            nombre: document.getElementById(modalModificar.nombre).value,
            rut: document.getElementById(modalModificar.rut).value,
            telefono: document.getElementById(modalModificar.telefono).value,
            fum: document.getElementById(modalModificar.fum).value,
            fecha: document.getElementById(modalModificar.fecha).value,
            eg: document.getElementById(modalModificar.eg).value,
            edadMaterna: document.getElementById(modalModificar.edadMaterna).value,
            ciudad: document.getElementById(modalModificar.ciudad).value,
            lugar: document.getElementById(modalModificar.lugar).value,
            diagnostico: diagnostico
        };

        $.post("dashboard/guardarsolicitud/" + document.getElementById(modalModificar.solicitud_id).value, data).done(function(){loadInProcess();});
        $('#'+modal).modal("hide");
    });

    let id_sol = uuidv4();let _a= uuidv4(); let _b= uuidv4(); let _c= uuidv4(); let _d= uuidv4(); let _e= uuidv4(); let _f= uuidv4(); let _g= uuidv4(); let _h= uuidv4(); let _i= uuidv4(); let _j= uuidv4(); let _w= uuidv4();
    let formulario = '<div class="row"> <input type="hidden" class="form-control" id="'+id_sol+'"> <div class="col form-group"> <label>Nombre del paciente</label> <input type="text" class="form-control" id="'+_a+'"> </div><div class="col form-group"> <label>RUT del paciente</label> <div> <input type="text" class="form-control" id="'+_b+'" disabled> </div></div><div class="col form-group"> <label>Teléfono materno</label> <input type="number" class="form-control" id="'+_c+'"> </div></div><div class="row"> <div class="col-4 form-group btn-animado rounded mb-0 pb-3"> <label><strong>INGRESE FUM REFERIDA</strong></label> <input type="date" class="form-control g-verde text-white" id="'+_d+'"> </div><div class="col form-group mb-0 pb-3"> <label>Fecha solicitud del exámen</label> <input type="date" class="form-control g-verde text-white" id="'+_e+'"> </div><div class="col-4 form-group mb-0 pb-3"> <label>Edad Gestacional (Ege)</label> <input type="text" class="form-control g-verde text-white" id="'+_f+'" disabled="" value="0 semanas"> </div></div><div class="row"> <div class="col-4 form-group"> <label>Edad materna (años)</label> <select class="form-control" id="'+_g+'"></select> </div><div class="col form-group"> <label>Ciudad de procedencia</label> <select class="form-control" id="'+_h+'"></select> </div><div class="col form-group"> <label>Lugar de control habitual</label> <select class="form-control" id="'+_i+'"></select> </div></div><div class="row"> <div class="col-6 form-group"> <label><strong>Diagnóstico de referencia a exámen ecográfico:</strong></label> <select type="text" class="form-control" id="'+_w+'"></select> </div><div class="col-6 form-group"> <label>otros</label> <input type="text" class="form-control" id="'+_j+'"> </div></div>';

    document.getElementById(modal.contenido).innerHTML = formulario;
    document.getElementById(modal.titulo).innerHTML = "Modificar solicitud";

    loadOptionEdadMaterta(_g);

    document.getElementById(_h).innerHTML = document.getElementById('h').innerHTML;
    document.getElementById(_i).innerHTML = document.getElementById('i').innerHTML;
    document.getElementById(_w).innerHTML = document.getElementById('w').innerHTML;

    modalModificar = {solicitud_id: id_sol,nombre: _a,rut: _b,telefono: _c,fum: _d,fecha: _e,eg: _f,edadMaterna: _g,ciudad: _h,lugar: _i,diagnostico: _j,diagnostico_select: _w};

    document.getElementById(id_sol).value = data.solicitud_id;
    document.getElementById(_a).value = data.solicitud_nombre;
    document.getElementById(_b).value = data.solicitud_rut;
    document.getElementById(_c).value = data.solicitud_telefono;
    document.getElementById(_d).value = data.solicitud_fum;
    document.getElementById(_e).value = data.solicitud_fecha;
    document.getElementById(_f).value = data.solicitud_egestacional;
    document.getElementById(_g).value = data.solicitud_ematerna;
    document.getElementById(_h).value = data.solicitud_ciudad;
    document.getElementById(_i).value = data.solicitud_lugar;

    //determinar si es un dato del select o otro
    var select = document.getElementById(_w);
    var keyword = data.solicitud_diagnostico;
    var optionCollection = Array.from(select.options).filter(x => x.text.toLowerCase().startsWith(keyword.toLowerCase()))
    if (optionCollection.length > 0){
        document.getElementById(_w).value = data.solicitud_diagnostico;
        document.getElementById(_j).value = "";
        document.getElementById(_j).classList.add("d-none");
    }else{
        document.getElementById(_w).value = "";
        document.getElementById(_j).classList.remove("d-none");
        document.getElementById(_j).value = data.solicitud_diagnostico;
    }

    $("#"+_d+", #"+_e).on("change", function(){
        let EG = calcularEdadGestacional(modalModificar.fum, modalModificar.fecha);
        document.getElementById(modalModificar.eg).value = EG.text;
    });

    $("#"+_w).on("change", function(){
		let value = $(this).val();
		if (value == ""){
			$("#"+_j).val("");
			$("#"+_j).removeClass("d-none");
		}else{
			$("#"+_j).val("");
			$("#"+_j).addClass("d-none");
		}
    });
    
}

//funciones de vista
function doppleruterinas(){
    let html = '<div id="doppleruterinas"> <div class="row"> <div class="col form-group"> <label>Edad Materna</label> <div class="input-group"> <input type="text" class="form-control bg-secondary text-white" name="respuesta_em" disabled> <div class="input-group-append"> <div class="input-group-text">años</div></div></div></div><div class="col form-group"> <label>Presión arterial media ((PAS- (PAD/3))+ PAD)</label> <div class="input-group"> <input type="text" class="form-control g-verde text-white" name="respuesta_pm" disabled> <div class="input-group-append"> <div class="input-group-text">mmHg</div></div></div></div><div class="col form-group"> <label>IMC Materno</label> <div class="input-group"> <input type="text" class="form-control g-verde text-white" name="respuesta_imc" disabled> <div class="input-group-append"> <div class="input-group-text">kg/m2</div></div></div></div></div><h5 class="text-primary">Exámenes ultrasonográficos</h5> <div class="row py-3"> <div class="col-3 form-group"> <label><strong>Evaluación de anatomía fetal</strong></label> </div><div class="col-3 form-group"> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-6 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col form-group"> <label>Embrión</label> <select class="form-control" name="respuesta_embrion"> <option value="no se observa aun">no se observa aun</option> <option value="act. no evidenciabl">act. no evidenciable</option> <option value="act. card. inicial">act. card. inicial</option> <option value="con act. cardiaca (+)" selected>con act. cardiaca (+)</option> <option value="act. card. y corp. (+)">act. card. y corp. (+)</option> <option value="act. card. y corp. (-)">act. card. y corp. (-)</option> </select> </div><div class="col form-group"> <label>LCN (mm)</label> <input type="text" class="form-control bg-secondary text-white" name="respuesta_lcn"> </div><div class="col form-group"> <label>Eg. x LCN</label> <input type="text" class="form-control bg-white" name="respuesta_lcn_eg" disabled> </div><div class="col form-group"> <label>FCF</label> <select name="respuesta_fcf" class="form-control"> <option value="(+) inicial">(+) inicial</option> <option value=" <90">&lt; 90</option> <option value="90">90</option> <option value="91">91</option> <option value="92">92</option> <option value="93">93</option> <option value="94">94</option> <option value="95">95</option> <option value="96">96</option> <option value="97">97</option> <option value="98">98</option> <option value="99">99</option> <option value="100">100</option> <option value="101">101</option> <option value="102">102</option> <option value="103">103</option> <option value="104">104</option> <option value="105">105</option> <option value="106">106</option> <option value="107">107</option> <option value="108">108</option> <option value="109">109</option> <option value="110">110</option> <option value="111">111</option> <option value="112">112</option> <option value="113">113</option> <option value="114">114</option> <option value="115">115</option> <option value="116">116</option> <option value="117">117</option> <option value="118">118</option> <option value="119">119</option> <option value="120">120</option> <option value="121">121</option> <option value="122">122</option> <option value="123">123</option> <option value="124">124</option> <option value="125">125</option> <option value="126">126</option> <option value="127">127</option> <option value="128">128</option> <option value="129">129</option> <option value="130">130</option> <option value="131">131</option> <option value="132">132</option> <option value="133">133</option> <option value="134">134</option> <option value="135">135</option> <option value="136">136</option> <option value="137">137</option> <option value="138">138</option> <option value="139">139</option> <option value="140" selected="">140</option> <option value="141">141</option> <option value="142">142</option> <option value="143">143</option> <option value="144">144</option> <option value="145">145</option> <option value="146">146</option> <option value="147">147</option> <option value="148">148</option> <option value="149">149</option> <option value="150">150</option> <option value="151">151</option> <option value="152">152</option> <option value="153">153</option> <option value="154">154</option> <option value="155">155</option> <option value="156">156</option> <option value="157">157</option> <option value="158">158</option> <option value="159">159</option> <option value="160">160</option> <option value="161">161</option> <option value="162">162</option> <option value="163">163</option> <option value="164">164</option> <option value="165">165</option> <option value="166">166</option> <option value="167">167</option> <option value="168">168</option> <option value="169">169</option> <option value="170">170</option> <option value=" > 170">&gt; 170</option> </select> </div></div><div class="row"> <div class="col-12"><strong>Flujometría Doppler</strong></div><div class="col form-group"> <label>IP. Uterina Derecha</label> <input type="text" class="form-control" name="respuesta_uterina_derecha"> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control bg-white" name="respuesta_uterina_derecha_percentil" disabled> </div></div><div class="col form-group"> <label>IP. Uterina Izquierda</label> <input type="text" class="form-control" name="respuesta_uterina_izquierda"> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control bg-white" name="respuesta_uterina_izquierda_percentil" disabled> </div></div><div class="col form-group"> <label>IP. Uterinas promedio</label> <input type="text" class="form-control g-verde text-white" name="respuesta_uterinas" disabled> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control g-verde text-white" name="respuesta_uterinas_promedio" disabled> </div></div></div><div class="row"> <div class="col-12"><strong>Tamizaje cromosomopatía</strong></div><div class="col-4 form-group"> <label>Translucidez Nucal</label> <select class="form-control" name="respuesta_dbp"> <option value="no procede">No procede</option> <option value="no medible">No medible</option> <option value="medible" selected>Medible</option> </select> </div><div class="col-2 form-group"> <div id="translucencia"> <label>mm de translucidez nucal</label> <input class="form-control bg-secondary text-white" name="respuesta_translucencia_nucal"> </div></div><div class="col-4 form-group"> <label>Hueso Nasal</label> <select class="form-control" name="respuesta_hueso_nasal"> <option value="no procede">No procede</option> <option value="no visible">No visible</option> <option value="visible" selected>Visible</option> </select> </div><div class="col-2 form-group"> <div id="huesonasal"> <label>mm</label> <input class="form-control" name="respuesta_hueso_nasal_valor"> </div></div></div><div class="row"> <div class="col form-group"> <label>Ductus venoso</label> <select class="form-control" name="respuesta_ca"> <option value="no evaluado" selected="">No evaluado</option> <option value="normal">Normal</option> <option value="onda a ausente">Onda A ausente</option> <option value="onda a negativa">Onda A negativa</option> </select> </div><div class="col form-group"> <label>Reflujo tricuspídeo</label> <select class="form-control" name="respuesta_lf"> <option value="no evaluado" selected="">No evaluado</option> <option value="normal">Normal</option> <option value="alteracion leve">Alteracion leve</option> <option value="onda anormal">Onda anormal</option> </select> </div></div></div>';
    document.getElementById("contenedor.examenes").innerHTML =html;

    $("select[name='respuesta_hueso_nasal']").on("change", function(){
        if ($(this).val() == "visible"){
            $("#huesonasal").removeClass("d-none");
        }
        else{
            $("#huesonasal").addClass("d-none");
        }
    }).trigger("change");
    
    $("select[name='respuesta_dbp']").on("change", function(){
        if ($(this).val() == "medible"){
            $("#translucencia").removeClass("d-none");
        }
        else{
            $("#translucencia").addClass("d-none");}
    });

    $("input[name='respuesta_translucencia_nucal']").keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("input[name='respuesta_hueso_nasal_valor']").focus();
        }else if(event.which == 8|| event.which ==9|| event.which ==46|| event.which ==110 || event.which ==190 || (event.which >= 35 && event.which <= 40) ||
            (event.which  >= 48 && event.which  <= 57) || (event.which  >= 96 && event.which  <= 105)){
        }else{
            event.preventDefault();
        }
    });

    $("input[name='respuesta_hueso_nasal_valor']").keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("textarea[name='respuesta_comentariosexamen']").focus();
        }else if(event.which == 8|| event.which ==9|| event.which ==46|| event.which ==110 || event.which ==190 || (event.which >= 35 && event.which <= 40) ||
            (event.which  >= 48 && event.which  <= 57) || (event.which  >= 96 && event.which  <= 105)){
        }else{
            event.preventDefault();
        }
    });

    $("input[name='respuesta_uterina_derecha']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var ut = $(this).val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("input[name='respuesta_uterina_derecha_percentil_view']").val(pctUtAdvanced(eg,ut));
            $("input[name='respuesta_uterina_derecha_percentil']").val(pctUtAdvanced(eg,ut));
            if (ut > 0){
                if ($("input[name='respuesta_uterina_izquierda']").val() > 0){
                    var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_izquierda']").val())) / 2;
                    $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                }
            }
        }
    }).keypress(function( event ) {
        if (event.which == 13) {
            event.preventDefault();
            $("input[name='respuesta_uterina_izquierda']").focus();
        }
    });
    $("input[name='respuesta_uterina_izquierda']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var ut = $(this).val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("input[name='respuesta_uterina_izquierda_percentil_view']").val(pctUtAdvanced(eg,ut));
            $("input[name='respuesta_uterina_izquierda_percentil']").val(pctUtAdvanced(eg,ut));
            if (ut > 0){
                if ($("input[name='respuesta_uterina_derecha']").val() > 0){
                    var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_derecha']").val())) / 2;
                    $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                }
            }
        }
    }).keypress(function( event ) {
        if ( event.which == 13 ) {event.preventDefault();$("input[name='respuesta_translucencia_nucal']").focus();}
    });
    $("input[name='respuesta_uterinas']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var ut = $(this).val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("input[name='respuesta_uterinas_promedio']").val(pctUtAdvanced(eg,ut));
        }
    });
    $('input[name="respuesta_lcn"]').on("change", function(){ 
        eglcn();
    }).keypress(function( event ) {
        if ( event.which == 13 ) {event.preventDefault(); $("input[name='respuesta_uterina_derecha']").focus();}
    });
    $("select[name='respuesta_anatomia']").on("change", function(){
        if ($(this).val() == "hallazgos ecográficos compatibles con:"){$("#interconsulta\\.respuesta\\.anatomia").removeClass("d-none");}else{$("#interconsulta\\.respuesta\\.anatomia").addClass("d-none");}
    });
    $("input[name='respuesta_em']").val($('#interconsulta\\.respuesta\\.crecimiento').data("em"));
    $("input[name='respuesta_pm']").val($('#interconsulta\\.respuesta\\.crecimiento').data("pm"));
    $("input[name='respuesta_imc']").val($('#interconsulta\\.respuesta\\.crecimiento').data("imc"));
}
function ginecologica(){
    let html = '<div id="ginecologica"><div class="row m-0 p-2"><div class="col-12"><h6 class="text-primary">Datos a completar por el examinador</h6></div><div class="col-8 border rounded p-3"><div class="row"><div class="col-6 form-group"><label>Útero</label><input type="text" class="form-control" name="respuesta_utero_ginecologica"></div><div class="col-6 form-group"><label>Endometrio</label><input type="text" class="form-control" name="respuesta_endometrio"></div><div class="col-6 form-group"><label>Anexo Izquierdo</label><input type="text" class="form-control" name="respuesta_anexo_izquierdo_ginecologica"></div><div class="col-6 form-group"><label>Anexo Derecho</label><input type="text" class="form-control" name="respuesta_anexo_derecho_ginecologica"></div><div class="col-6 form-group"><label>Ovario Izquierdo</label><input type="text" class="form-control" name="respuesta_ovario_izquierdo"></div><div class="col-6 form-group"><label>Ovario Derecho</label><input type="text" class="form-control" name="respuesta_ovario_derecho"></div><div class="col-6 form-group"><label>Douglas</label><input type="text" class="form-control" name="respuesta_douglas_ginecologica"></div></div></div><div class="col-4"><div class="border rounded px-3 pt-3 mb-1"><img src="imagenes/uteroyovarios.jpg" alt="Utero y ovarios" class="img-fluid d-block mx-auto w-75"></div><div class="border rounded px-3 pt-3 mb-1"><ul><li>Exploración mínima en caso de, ecográficamente no observar signos de embarazo.</li></ul></div><div class="border rounded text-center"><div role="group" aria-label="Basic example" class="btn-group text-center"><button class="btn btn-primary text-white" id="enviar.respuesta.botton.espejo">Enviar respuesta</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar.espejo">Eliminar solicitud</button><button type="button" class="btn btn-secondary" id="ver.interconsulta.cerrar.espejo">Cerrar</button></div></div></div></div></div>';
    document.getElementById("contenedor.examenes").innerHTML = html;

    $('#interconsulta\\.respuesta\\.fecha').trigger('change');

    $("#enviar\\.respuesta\\.botton\\.espejo").on("click", function(){$("#enviar\\.respuesta\\.botton").trigger("click");});
    $("#ver\\.interconsulta\\.eliminar\\.espejo").on("click", function(){$("#ver\\.interconsulta\\.eliminar").trigger("click");});
    $("#ver\\.interconsulta\\.cerrar\\.espejo").on("click", function(){$("#ver\\.interconsulta").modal("hide");});
}
function segundoTrimestre(){
    let html = '<div id="segundotrimestre"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso_segundo"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino" selected="">femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado" selected>aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico, cualitativo</label> <select class="form-control" name="respuesta_liquido_amniotico"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>Líquido amniótico, semicuantitativo; BVM (mm)</label> <select name="respuesta_bvm" class="form-control"></select> </div><div class="col form-group"> <label>Frecuencia cardiaca fetal (FCF)</label> <select name="respuesta_fcf" class="form-control"></select> </div><div class="col-4 form-group"> <label>Evaluación de anatomía fetal</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-12"> <p><strong>Biometrías</strong></p></div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col form-group"> <label>DOF (mm)</label> <input type="text" class="form-control" name="respuesta_dof"> </div><div class="col form-group"> <label>IC (DBP/DOF) [70%-86%]</label> <input type="text" class="form-control" name="respuesta_ic" disabled> </div></div><div class="row"> <div class="col form-group"> <label>CC (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cc"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cc_pct"></div></div></div></div><div class="col form-group"> <label>CA (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_ca"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ca_pct"></div></div></div></div><div class="col form-group"> <label>LF (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lf"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lf_pct"></div></div></div></div></div><div class="row"> <div class="col-4 py-3 form-group"> <label>Opcionales para estimación tardia de la edad gestacional</label> </div><div class="col-4 form-group"> <label>LH (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lh"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lh_pct"></div></div></div></div><div class="col-4 form-group"> <label>Cerebelo (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cerebelo"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cerebelo_pct"></div></div></div></div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Peso fetal estimado</label> <input type="text" class="form-control" name="respuesta_pfe" disabled> </div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col form-group"> <label>Índice Cc / Ca</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_ccca" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ccca_pct"></div></div></div></div></div></div>';
    document.getElementById("contenedor.examenes").innerHTML = html;

                        $("input[name='respuesta_dbp']").on("change", function(){
                            let dbp = $(this).val();
                            let dbp_ready = false;
                            let dof = $("input[name='respuesta_dof']").val();
                            let dof_ready = false;
                            if (dbp.length > 0){
                                dbp_ready = isNaN(dbp) == false ? true : false;
                            }
                            if (dof.length > 0){
                                dof_ready = isNaN(dof) == false ? true : false;
                            }
                            if (dbp_ready == true && dof_ready == true){
                                $("input[name='respuesta_ic']").val(ICAdvanced(dbp, dof));
                                $("input[name='respuesta_cc']").val(valCC(dof,dbp)).trigger("change");
                            }
                            else{
                                $("input[name='respuesta_ic']").val(0);
                                $("input[name='respuesta_cc']").val(0).trigger("change");
                            }
                        }).keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_dof']").focus();
                            }
                        });

                        cargarBVM("respuesta_bvm");
                        cargarFCF("respuesta_fcf");

                        $("input[name='respuesta_dof']").on("change", function(){
                            let dbp = $("input[name='respuesta_dbp']").val();
                            let dbp_ready = false;
                            let dof = $(this).val();
                            let dof_ready = false;
                            if (dbp.length > 0){
                                dbp_ready = isNaN(dbp) == false ? true : false;
                            }
                            if (dof.length > 0){
                                dof_ready = isNaN(dof) == false ? true : false;
                            }
                            if (dbp_ready == true && dof_ready == true){
                                $("input[name='respuesta_ic']").val(ICAdvanced(dbp, dof));
                                $("input[name='respuesta_cc']").val(valCC(dof,dbp)).trigger("change");
                            }
                            else{
                                $("input[name='respuesta_ic']").val(0);
                                $("input[name='respuesta_cc']").val(0).trigger("change");
                            }
                        }).keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_ca']").focus();
                            }
                        });
                        $("input[name='respuesta_cc']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        });
                        $("input[name='respuesta_ca']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        }).keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_lf']").focus();
                            }
                        });
                        $("select[name='respuesta_anatomia']").on("change", function(){
                            if ($(this).val() == "hallazgos ecográficos compatibles con:"){
                                $("#interconsulta\\.respuesta\\.anatomia").removeClass("d-none");
                            }
                            else{
                                $("#interconsulta\\.respuesta\\.anatomia").addClass("d-none");
                            }
                        });
                        $("input[name='respuesta_pfe']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var pfe = $("input[name='respuesta_pfe']").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
                                eg = Math.trunc(parseFloat(eg));
                                $("input[name='respuesta_pfe_pct']").val(pctpfeAdvanced(eg,pfe));
                            }
                        });
                        $("input[name='respuesta_ccca']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ccca = $("input[name='respuesta_ccca']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = Math.trunc(parseFloat(eg));
                                $("#respuesta_ccca_pct").html("Pct. " + pctcccaAdvanced(eg,ccca));
                            }
                        });
                        $("input[name='respuesta_cc']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var cc = $("input[name='respuesta_cc']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = Math.trunc(parseFloat(eg));
                                $("#respuesta_cc_pct").html("Pct. " + pctccAdvanced(eg,cc));
                            }
                        });
                        $("input[name='respuesta_ca']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ca = $("input[name='respuesta_ca']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = Math.trunc(parseFloat(eg));
                                $("#respuesta_ca_pct").html("Pct. " + pctcaAdvanced(eg,ca));
                            }
                        });
                        $("input[name='respuesta_lf']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var lf = $("input[name='respuesta_lf']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = Math.trunc(parseFloat(eg));
                                $("#respuesta_lf_pct").html("Pct. " + pctlfAdvanced(eg,lf));
                            }
                        });
                        $("input[name='respuesta_lh']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var lh = $("input[name='respuesta_lh']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = Math.trunc(parseFloat(eg));
                                $("#respuesta_lh_pct").html("Pct. " + pctlhAdvanced(eg,lh));
                            }
                        });
                        $("input[name='respuesta_cerebelo']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var cerebelo = $("input[name='respuesta_cerebelo']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = Math.trunc(parseFloat(eg));
                                $("#respuesta_cerebelo_pct").html("Pct. " + pctcerebeloAdvanced(eg,cerebelo));
                            }
                        });
}
function primerTrimerstre(){
    let html = '<div id="primertrimestre"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">útero</label> <select class="form-control" name="respuesta_utero_primertrimestre"> <option value="central anterior" selected>central anterior</option> <option value="central posterior">central posterior</option> <option value="lateralizado a la Izquierda">lateralizado a la Izquierda</option> <option value="lateralizado a la Derecha">lateralizado a la Derecha</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Saco gestacional</label> <select class="form-control" name="respuesta_saco_gestacional"> <option value="normal" selected>normal</option> <option value="no se observa">no se observa</option> <option value="multiple">multiple</option> <option value="con pseudosaco">con pseudosaco</option> <option value="con dpmto. parcial">con dpmto. parcial</option> </select> </div><div class="col-3 form-group"> <label>Promedio saco gestacional</label> <input type="text" class="form-control" name="respuesta_saco"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Embrión</label> <select class="form-control" name="respuesta_embrion"> <option value="no se observa aun">no se observa aun</option> <option value="act. no evidenciabl">act. no evidenciable</option> <option value="act. card. inicial">act. card. inicial</option> <option value="con act. cardiaca (+)" selected>con act. cardiaca (+)</option> <option value="act. card. y corp. (+)">act. card. y corp. (+)</option> <option value="act. card. y corp. (-)">act. card. y corp. (-)</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Largo Embrionatio Máximo (LEM)</label> <input type="text" class="form-control" name="respuesta_lcn"> </div><div class="col-3 form-group"> <label for="interconsulta.respuesta.ecografista">Eg. x LEM</label> <input type="text" class="form-control" name="respuesta_lcn_eg" disabled> </div></div><div class="row"> <div class="col form-group"> <label>&nbsp;</label> <input type="text" class="form-control bg-white" value="Fechas determinadas según biometría embrionaria (LEM)" disabled> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">FUR Operacional</label> <input type="date" class="form-control bg-secondary text-white" name="respuesta_furop" disabled> </div><div class="col-3 form-group"> <label for="interconsulta.respuesta.ecografista">FPP actualizada</label> <input type="date" class="form-control bg-secondary text-white" name="respuesta_fppactualizada" disabled> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Izquierdo</label> <select class="form-control" name="respuesta_anexo_izquierdo_primertrimestre"> <option value="aspecto normal" selected>aspecto normal</option> <option value="masa solida">masa solida</option> <option value="masa eco negativa">masa eco negativa</option> <option value="con ovario">con ovario</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Derecho</label> <select class="form-control" name="respuesta_anexo_derecho_primertrimestre"> <option value="aspecto normal" selected>aspecto normal</option> <option value="masa solida">masa solida</option> <option value="masa eco negativa">masa eco negativa</option> <option value="con ovario">con ovario</option> </select> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista">Douglas</label> <select class="form-control" name="respuesta_douglas_primertrimestre"> <option value="libre" selected>libre</option> <option value="ocupado">ocupado</option> </select> </div></div></div>';
    document.getElementById("contenedor.examenes").innerHTML = html;
    $("input[name='respuesta_lcn']").on("change", function(){eglcn();});
}
function multiproposito(){
    let html = '<div id="multiproposito"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino" selected>femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado" selected>aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico, cualitativo</label> <select class="form-control" name="respuesta_liquido"> <option value="normal">Normal</option> <option value="disminuido">Disminuido</option> <option value="aumentado">Aumentado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>Líquido amniótico, semicuantitativo; BVM (mm)</label> <select type="text" class="form-control" name="respuesta_bvm"></select> </div><div class="col form-group"> <label>Fecuencia cardiaca fetal (FCF)</label> <select name="respuesta_fcf" class="form-control"></select> </div><div class="col-4 form-group"> <label>Evaluación de anatomía fetal</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-6"> <div class="row"> <div class="col-12"><strong>A.- Biometría fetales:</strong></div><div class="col-6 form-group"> <label>DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col-6 form-group"> <label>DOF (mm)</label> <input type="text" class="form-control" name="respuesta_dof"> </div><div class="col-12 form-group"> <label>CC (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cc"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cc_pct"></div></div></div></div><div class="col-12 form-group"> <label>CA (mm)</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_ca"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ca_pct"></div></div></div></div><div class="col-12 form-group"> <label>LF (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lf"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lf_pct"></div></div></div></div><div class="col-6 form-group"> <label>Peso fetal estimado (grs)</label> <input type="number" class="form-control" name="respuesta_pfe" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col-6 form-group"> <label>Relación cráneo/abdomen</label> <input type="text" class="form-control" name="respuesta_ccca" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><input type="text" class="form-control" name="respuesta_ccca_pct" disabled> </div></div></div></div><div class="col-6"> <div class="row"> <div class="col-12"><strong>B.- Flujometría Doppler materno / fetal</strong></div><div class="col-12 form-group"> <label>IP. Uterina derecha</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_uterina_derecha"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_derecha_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Uterina izquierda</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_uterina_izquierda"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_izquierda_percentil"></div></div></div></div><div class="col-6 form-group"> <label>IP. Uterinas promedio</label> <input type="text" class="form-control" name="respuesta_uterinas" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><div class="form-control bg-secondary text-white" id="respuesta_uterinas_percentil"></div></div></div><div class="col-12 form-group"> <label>IP. Arteria umbilical (Au)</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_umbilical"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_umbilical_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Cerebral media (Cm)</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_cm"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cm_percentil"> </div></div></div></div><div class="col-6 form-group"> <label>IP de ICP (Cm/Au)</label> <input type="text" class="form-control" name="respuesta_cmau" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><div class="form-control bg-secondary text-white" id="respuesta_cmau_percentil"></div></div></div></div></div></div><div class="row"> <div class="col-12"> <p class="mb-0"><strong>C.- Análisis preliminar de datos ecográficos (Biometría y flujometría)</strong></p></div><div class="col-4 form-group bg-secondary pb-2 mb-2 text-white"> <label>Crecimiento fetal ( Peso fetal )</label> <select class="form-control" name="respuesta_hipotesis"> <option value="Disminuido < p3">Disminuido < p3</option> <option value="Disminuido < p10">Disminuido < p10</option> <option value="Normal p10 - p 25">Normal p10 - p 25</option> <option value="Normal p26 - p 75" selected>Normal p26 - p 75</option> <option value="Normal p76 - p90">Normal p76 - p90</option> <option value="Grande >p90">Grande >p90</option> <option value="Grande >p97">Grande >p97</option> </select> </div><div class="col form-group bg-secondary pb-2 mb-2 text-white"> <label>Doppler materno ( IP Uterinas )</label> <select class="form-control" name="respuesta_doppler_materno"> <option value="no evaluado">No evaluado</option> <option value="Normal (< p95)" selected>Normal (&lt; p95)</option> <option value="Alterado (> p95)">Alterado (&gt; p95)</option> </select> </div><div class="col-5 form-group bg-secondary pb-2 mb-2 text-white"> <label>Doppler fetal ( IP UMB, ACM e ICP )</label> <select class="form-control" name="respuesta_doppler_fetal"> <option value="No evaluado">No evaluado</option> <option value="Normal (UMB, ACM, ICP)" selected>Normal (UMB, ACM e ICP)</option> <option value="Alterado, ICP < pct 5">Alterado, ICP &lt; pct 5</option> <option value="Alterado ICP < pct 5 y UMB > pct 95">Alterado ICP &lt; pct 5 y UMB &gt; pct 95</option> <option value="Alterado ccp < pct 5 acm < pct 5">Alterado ICP &lt; pct 5 ACM &lt; pct 5</option> <option value="Alt. ICP < pct 5 y ACM < pct 5 + UMB > p95">Alt. ICP &lt; pct 5 y ACM &lt; pct 5 + UMB &gt; p95</option> </select> </div></div></div>';
    document.getElementById("contenedor.examenes").innerHTML = html;
    
    cargarBVM("respuesta_bvm");
    cargarFCF("respuesta_fcf");

    $("input[name='respuesta_uterina_derecha']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var ut = $(this).val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("#respuesta_uterina_derecha_percentil").html("Pct. " + pctUtAdvanced(eg,ut));
            if (ut > 0){
                if ($("input[name='respuesta_uterina_izquierda']").val() > 0){
                    var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_izquierda']").val())) / 2;
                    $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                }
            }
        }
    }).keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("input[name='respuesta_uterina_izquierda']").focus();
        }
    });

    $("select[name='respuesta_bvm']").on("change", function(){
        let bvm = $(this).val();
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("select[name='respuesta_liquido']").val(bvmDoppler(eg, bvm));
        }
    });
    $("input[name='respuesta_uterina_izquierda']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var ut = $(this).val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("#respuesta_uterina_izquierda_percentil").html("Pct. " + pctUtAdvanced(eg,ut));

            if (ut > 0){
                if ($("input[name='respuesta_uterina_derecha']").val() > 0){
                    var promedio = (parseFloat($("input[name='respuesta_uterina_derecha']").val()) + parseFloat(ut)) / 2;
                    $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                }
            }
        }
    }).keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("input[name='respuesta_umbilical']").focus();
        }
    });
    $("input[name='respuesta_uterinas']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var ut = $("input[name='respuesta_uterinas']").val();

        eg = String(eg);
        eg = eg.replace("semanas", "");

        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("#respuesta_uterinas_percentil").html(pctUtAdvanced(eg,ut));
        }
    });
    $("input[name='respuesta_pfe']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var pfe = $("input[name='respuesta_pfe']").val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("input[name='respuesta_pfe_pct']").val(pctpfeAdvanced(eg,pfe));

        }
    });
    $("input[name='respuesta_dbp']").on("change", function(){
        let dbp = $(this).val();
        let dbp_ready = false;
        let dof = $("input[name='respuesta_dof']").val();
        let dof_ready = false;
        if (dbp.length > 0){
            dbp_ready = isNaN(dbp) == false ? true : false;
        }
        if (dof.length > 0){
            dof_ready = isNaN(dof) == false ? true : false;
        }
        if (dbp_ready == true && dof_ready == true){
            $("input[name='respuesta_cc']").val(valCC(dof,dbp)).trigger("change");
        }
        else{
            $("input[name='respuesta_cc']").val(0).trigger("change");
        }
    }).keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("input[name='respuesta_cc']").focus();
        }
    });

    $("input[name='respuesta_dof']").on("change", function(){
        let dbp = $("input[name='respuesta_dbp']").val();
        let dbp_ready = false;
        let dof = $(this).val();
        let dof_ready = false;
        if (dbp.length > 0){
            dbp_ready = isNaN(dbp) == false ? true : false;
        }
        if (dof.length > 0){
            dof_ready = isNaN(dof) == false ? true : false;
        }
        if (dbp_ready == true && dof_ready == true){
            $("input[name='respuesta_cc']").val(valCC(dof,dbp)).trigger("change");
        }
        else{
            $("input[name='respuesta_cc']").val(0).trigger("change");
        }
    }).keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("input[name='respuesta_cc']").focus();
        }
    });

    $("input[name='respuesta_cc']").on("change", function(){
        psohdlk();
        calCCCA();
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var cc = $("input[name='respuesta_cc']").val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("#respuesta_cc_pct").html("Pct. " + pctccAdvanced(eg,cc));
        }
    }).keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("input[name='respuesta_ca']").focus();
        }
    });
    $("input[name='respuesta_ca']").on("change", function(){
        psohdlk();
        calCCCA();

        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var ca = $("input[name='respuesta_ca']").val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("#respuesta_ca_pct").html("Pct. " + pctcaAdvanced(eg,ca));
        }
    }).keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("input[name='respuesta_lf']").focus();
        }
    });
    $("input[name='respuesta_lf']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var lf = $("input[name='respuesta_lf']").val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("#respuesta_lf_pct").html("Pct. " + pctlfAdvanced(eg,lf));
        }
    }).keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("input[name='respuesta_uterina_derecha']").focus();
        }
    });
    $("input[name='respuesta_ccca']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var ccca = $("input[name='respuesta_ccca']").val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("input[name='respuesta_ccca_pct']").val(pctcccaAdvanced(eg,ccca));
        }
    });
    $("select[name='respuesta_anatomia']").on("change", function(){
        if ($(this).val() == "hallazgos ecográficos compatibles con:"){
            $("#interconsulta\\.respuesta\\.anatomia").removeClass("d-none");
        }
        else{
            $("#interconsulta\\.respuesta\\.anatomia").addClass("d-none");
        }
    });
    $("input[name='respuesta_cm']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var acm = $("input[name='respuesta_cm']").val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("#respuesta_cm_percentil").html("Pct. " + pctacmAdvanced(eg,acm));
        }
        if (acm > 0){
            if ($("input[name='respuesta_umbilical']").val() > 0){
                var ccp = (acm / $("input[name='respuesta_umbilical']").val());
                $("input[name='respuesta_cmau']").val(ccp.toFixed(2)).trigger("change");
            }
        }
    });
    $("input[name='respuesta_umbilical']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var aumb = $("input[name='respuesta_umbilical']").val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("#respuesta_umbilical_percentil").html("Pct. " + pctauAdvanced(eg,aumb));
        }
        if ($("input[name='respuesta_cm']").val() > 0){
            if ($("input[name='respuesta_umbilical']").val() > 0){
                var ccp = ($("input[name='respuesta_cm']").val() / $("input[name='respuesta_umbilical']").val());
                $("input[name='respuesta_cmau']").val(ccp.toFixed(2)).trigger("change");                      
            }
        }
    }).keypress(function( event ) {
        if ( event.which == 13 ) {
           event.preventDefault();
           $("input[name='respuesta_cm']").focus();
        }
    });
    $("input[name='respuesta_cmau']").on("change", function(){
        var eg = $("#interconsulta\\.respuesta\\.eg").val();
        var cmau = $("input[name='respuesta_cmau']").val();
        eg = String(eg);
        eg = eg.replace("semanas", "");
        if (eg.length > 0){
            eg = Math.trunc(parseFloat(eg));
            $("#respuesta_cmau_percentil").html(pctcmauAdvanced(eg,cmau));
        }
    });
}

function cargarBVM(input){
    let bvmSelect = document.getElementsByName(input)[0];
    let opt = document.createElement('option');
    opt.appendChild(document.createTextNode("< 10"));
    opt.value = "< 10"; 
    bvmSelect.appendChild(opt);
    for (var i = 10; i < 161; i++) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(i));
        opt.value = i; 
        bvmSelect.appendChild(opt); 
    }
    opt = document.createElement('option');
    opt.appendChild( document.createTextNode("> 160") );
    opt.value = "> 160"; 
    bvmSelect.appendChild(opt);
    bvmSelect.value = 45
}

function cargarFCF(input){
    let fcfSelect = document.getElementsByName(input)[0];
    opt = document.createElement('option');
    opt.appendChild(document.createTextNode("(+) inicial"));
    opt.value = "(+) inicial"; 
    fcfSelect.appendChild(opt);
    opt = document.createElement('option');
    opt.appendChild(document.createTextNode("< 90"));
    opt.value = "< 90"; 
    fcfSelect.appendChild(opt);
    for (var i = 90; i < 161; i++) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(i));
        opt.value = i; 
        fcfSelect.appendChild(opt); 
    }
    opt = document.createElement('option');
    opt.appendChild( document.createTextNode("> 170") );
    opt.value = "> 170"; 
    fcfSelect.appendChild(opt);
    fcfSelect.value = 140;
}

///primitivas a estandarizar
function loadOptionEdadMaterta(input){
    let años = document.getElementById(input);
    let opt = document.createElement('option');
    opt.appendChild(document.createTextNode("< 10 años"));
    opt.value = "< 10"; 
    años.appendChild(opt);
    for (var i = 10; i < 61; i++) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(i));
        opt.value = i; 
        años.appendChild(opt); 
    }
    opt = document.createElement('option');
    opt.appendChild( document.createTextNode("> 60 años") );
    opt.value = "> 60"; 
    años.appendChild(opt);
}

function calcularEdadGestacional(FUM, fExamen){
    _FUM = new Date();
    _FUM.setTime(Date.parse(document.getElementById(FUM).value));
    _FUM = _FUM.getTime();
    _fExamen = new Date();
    _fExamen.setTime(Date.parse(document.getElementById(fExamen).value));
    _fExamen = _fExamen.getTime();

    let diff = _fExamen - _FUM;
    if (diff > 0){
        let dias = diff/(1000*60*60*24);
        let semanas = Math.trunc(dias / 7);

        if (semanas > 42){
            return {semanas:42,dias:0,text:"42 semanas"};
        }else{
            dias = Math.trunc(dias - (semanas * 7));
            return {semanas:semanas,dias:dias,text:semanas + "." + dias + " semanas"};
        }
    }else{
        return {semanas:0,dias:0,text:"0 semanas"};
    }
}

function setInputDate(today) {
    if (typeof today === typeof undefined){
        today = new Date();
    }
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
  
    if(dd<10) {
        dd = '0'+dd
    } 
  
    if(mm<10) {
        mm = '0'+mm
    } 
  
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}