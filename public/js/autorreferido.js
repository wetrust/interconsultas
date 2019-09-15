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
        $('#ver\\.interconsulta\\.contenedor').empty().append('<div class="card-header g-verde" id="headingOne"> <button class="btn btn-link text-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Datos de la interconsulta ( Abrir / Cerrar )</button></div><div id="collapseOne" class="collapse border " aria-labelledby="headingOne" data-parent="#ver\\.interconsulta\\.contenedor"> <div class="card-body"> <input type="hidden" id="solicitud_id" value=""/> <div class="row"> <div class="col form-group"> <label>Nombre del paciente:</label> <input type="text" class="form-control" disabled id="solicitud_nombre"> </div><div class="col form-group"> <label>Fecha de solicitud:</label> <input type="text" class="form-control" disabled id="solicitud_fecha"> </div><div class="col form-group"> <label>FUR Referida o corregida</label> <input type="date" class="form-control" disabled id="solicitud_fum"> </div><div class="col form-group"> <label>Edad Gestacional</label> <input type="text" class="form-control" disabled id="solicitud_egestacional"> </div></div><div class="row"> <div class="col form-group"> <label>RUT del paciente:</label> <input type="text" class="form-control" disabled id="solicitud_rut"> </div><div class="col form-group"> <label>Paridad</label> <input type="text" class="form-control" name="respuesta_paridad" disabled> </div><div class="col form-group"> <label>Ciudad procedencia de la paciente</label> <input type="text" class="form-control" disabled id="solicitud_ciudad"> </div><div class="col form-group"> <label>Lugar de control prenatal</label> <input type="text" class="form-control" disabled id="solicitud_lugar"> </div></div><div class="row"> <div class="col my-2 form-group"> <label>Diagnóstico de referencia a exámen ecográfico</label> <input type="text" class="form-control" disabled id="solicitud_diagnostico"> </div><div class="col my-2 form-group"> <label>Otros antecedentes clínicos relevantes</label> <input type="text" class="form-control" name="respuesta_antecedentes" disabled> </div></div></div></div>');
        $("#ver\\.interconsulta\\.contenedor").append('<h4 class="py-3 text-center bg-secondary mb-0 text-white">Responder solicitud de interconsulta ecográfica</h4>');
        $("#ver\\.interconsulta\\.contenedor").append('<div class="row bg-secondary mb-0"> <div class="col form-group mb-0 pb-2 btn-animado"> <label class="text-white"><strong>SELECCIONE TIPO EXÁMEN</strong></label> <select class="form-control" name="solicitud_crecimiento" id="interconsulta.respuesta.crecimiento"> <option value="3">1.- Ecografía Ginecológica</option> <option value="1">2.- Ecografía precoz de urgencia</option> <option value="4">3.- Ecografía 11 / 14 semanas</option> <option value="2">4.- Ecografía 2° / 3° trimestre</option> <option value="0" selected>5.- Doppler + Eco. crecimiento</option> </select> </div><div class="col form-group mb-0"> <label class="text-white">FUR Referida o corregida</label> <input type="date" class="form-control g-verde text-white" id="interconsulta.respuesta.fur.copia" disabled> </div><div class="col form-group mb-0"> <label for="interconsulta.respuesta.fecha" class="text-white">Señalar fecha de examen</label> <input type="date" class="form-control g-verde text-white" id="interconsulta.respuesta.fecha"> </div><div class="col form-group mb-0" id="interconsulta.respuesta.edadgestacional"> <label for="interconsulta.respuesta.eg" class="text-white">Edad gestacional actual</label> <input type="hidden" class="form-control" id="interconsulta.fum.copia" value="solicitud_fum"> <input type="text" class="form-control g-verde text-white" id="interconsulta.respuesta.eg" disabled=""> <input type="hidden" class="form-control" name="respuesta_eg"> </div></div><div id="contenedor.examenes"></div>');
        $("#ver\\.interconsulta\\.contenedor").append('<div id="final" class="mt-3"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen" class="text-primary"><strong>D.- Comentarios y observaciones</strong> (Interpretación clínica del profesional ecografista)</label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div><div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista"><strong>Ecografista</strong></label> <input type="text" class="form-control" id="respuesta_ecografista"> </div></div></div>');

        $('#interconsulta\\.respuesta\\.fecha').on('change', function () {
            let EG = calcularEdadGestacional("interconsulta.fum.copia", "interconsulta.respuesta.fecha");
            $('#interconsulta\\.respuesta\\.eg').val(EG.text);
            $("input[name='respuesta_eg']").val(EG.text);
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
                respuesta_ecografista: $('input[name="respuesta_ecografista"]').val()
            }

            if (tipoExm == 4){
                args = {
                    respuesta_anatomia: $('select[name="respuesta_anatomia"]').val(),
                    respuesta_anatomia_extra: $('input[name="respuesta_anatomia_extra"]').val(),
                    respuesta_embrion: $('select[name="respuesta_embrion"]').val(),
                    respuesta_lcn: $('input[name="respuesta_lcn"]').val(),
                    respuesta_lcn_eg: $('input[name="respuesta_lcn_eg"]').val(),
                    respuesta_fcf: $('select[name="respuesta_fcf"]').val(),
                    respuesta_cc: $('select[name="respuesta_hueso_nasal"]').val(),
                    respuesta_ca: $('select[name="respuesta_ca"]').val(),
                    respuesta_lf: $('select[name="respuesta_lf"]').val(),
                    respuesta_dbp: $('select[name="respuesta_dbp"]').val(),
                    respuesta_translucencia_nucal: $('input[name="respuesta_translucencia_nucal"]').val(),
                    respuesta_hueso_nasal_valor: $('input[name="respuesta_hueso_nasal_valor"]').val(),
                    respuesta_uterina_derecha: $('input[name="respuesta_uterina_derecha"]').val(),
                    respuesta_uterina_derecha_percentil: $('input[name="respuesta_uterina_derecha_percentil"]').val(),
                    respuesta_uterina_izquierda: $('input[name="respuesta_uterina_izquierda"]').val(),
                    respuesta_uterina_izquierda_percentil: $('input[name="respuesta_uterina_izquierda_percentil"]').val(),
                    respuesta_uterinas: $('input[name="respuesta_uterinas"]').val(),
                    respuesta_uterinas_percentil: $('input[name="respuesta_uterinas_promedio"]').val()
                }
            }
            else if (tipoExm == 3){
                args = {
                    respuesta_utero_ginecologica: $('input[name="respuesta_utero_ginecologica"]').val(),
                    respuesta_anexo_izquierdo_ginecologica: $('input[name="respuesta_anexo_izquierdo_ginecologica"]').val(),
                    respuesta_anexo_derecho_ginecologica: $('input[name="respuesta_anexo_derecho_ginecologica"]').val(),
                    respuesta_ovario_izquierdo: $('input[name="respuesta_ovario_izquierdo"]').val(),
                    respuesta_ovario_derecho: $('input[name="respuesta_ovario_derecho"]').val(),
                    respuesta_douglas_ginecologica: $('input[name="respuesta_douglas_ginecologica"]').val(),
                    respuesta_endometrio: $('input[name="respuesta_endometrio"]').val()
                }
            }
            else if (tipoExm == 2){
                args = {
                    respuesta_placenta: $('select[name="respuesta_placenta"]').val(),
                    respuesta_placenta_insercion: $('select[name="respuesta_placenta_insercion"]').val(),
                    respuesta_liquido_amniotico: $('select[name="respuesta_liquido_amniotico"] option:selected').val(),
                    respuesta_dbp: $('input[name="respuesta_dbp"]').val(),
                    respuesta_cc: $('input[name="respuesta_cc"]').val(),
                    respuesta_cc_pct: $('#respuesta_cc_pct').html(),
                    respuesta_ca: $('input[name="respuesta_ca"]').val(),
                    respuesta_ca_pct: $('#respuesta_ca_pct').html(),
                    respuesta_lf: $('input[name="respuesta_lf"]').val(),
                    respuesta_lf_pct: $('#respuesta_lf_pct').html(),
                    respuesta_pfe: $('input[name="respuesta_pfe"]').val(),
                    respuesta_ccca: $('input[name="respuesta_ccca"]').val(),
                    respuesta_presentacion: $('select[name="respuesta_presentacion"]').val(),
                    respuesta_dorso_segundo: $('select[name="respuesta_dorso_segundo"]').val(),
                    respuesta_anatomia: $('select[name="respuesta_anatomia"]').val(),
                    respuesta_anatomia_extra: $('input[name="respuesta_anatomia_extra"]').val(),
                    respuesta_pfe_pct: $('input[name="respuesta_pfe_pct"]').val(),
                    respuesta_ccca_pct: $('#respuesta_ccca_pct').html(),
                    respuesta_hipotesis: $('input[name="respuesta_hipotesis"]').val(),
                    respuesta_dof: $('input[name="respuesta_dof"]').val(),
                    respuesta_ic: $('input[name="respuesta_ic"]').val(),
                    respuesta_bvm: $('select[name="respuesta_bvm"]').val(),
                    respuesta_lh: $('input[name="respuesta_lh"]').val(),
                    respuesta_lh_pct: $('#respuesta_lh_pct').html(),
                    respuesta_cerebelo: $('input[name="respuesta_cerebelo"]').val(),
                    respuesta_cerebelo_pct: $('#respuesta_cerebelo_pct').html(),
                    respuesta_sexo_fetal: $('select[name="respuesta_sexo_fetal"]').val(),
                    respuesta_fcf: $('select[name="respuesta_fcf"]').val()
                }
                args.respuesta_lf_pct = args.respuesta_lf_pct.replace("Pct. ", "");
                args.respuesta_cc_pct = args.respuesta_cc_pct.replace("Pct. ", "");
                args.respuesta_ca_pct = args.respuesta_ca_pct.replace("Pct. ", "");
                args.respuesta_ccca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
                args.respuesta_lh_pct = args.respuesta_lh_pct.replace("Pct. ", "");
                args.respuesta_cerebelo_pct = args.respuesta_cerebelo_pct.replace("Pct. ", "");
            }
            else if (tipoExm == 1){
                args = {
                    respuesta_utero_primertrimestre: $('select[name="respuesta_utero_primertrimestre"]').val(),
                    respuesta_saco_gestacional: $('select[name="respuesta_saco_gestacional"]').val(),
                    respuesta_saco : $('input[name="respuesta_saco"]').val(),
                    respuesta_embrion: $('select[name="respuesta_embrion"]').val(),
                    respuesta_lcn: $('input[name="respuesta_lcn"]').val(),
                    respuesta_lcn_eg: $('input[name="respuesta_lcn_eg"]').val(),
                    respuesta_anexo_izquierdo_primertrimestre: $('select[name="respuesta_anexo_izquierdo_primertrimestre"]').val(),
                    respuesta_anexo_derecho_primertrimestre: $('select[name="respuesta_anexo_derecho_primertrimestre"]').val(),
                    respuesta_douglas_primertrimestre: $('select[name="respuesta_douglas_primertrimestre"]').val()
                }
            }
            else{
                args = {
                    respuesta_pfe: $('input[name="respuesta_pfe"]').val(),
                    respuesta_pfe_pct: $('input[name="respuesta_pfe_pct"]').val(),
                    respuesta_liquido: $('select[name="respuesta_liquido"] option:selected').val(),
                    respuesta_presentacion: $('select[name="respuesta_presentacion"]').val(),
                    respuesta_dorso: $('select[name="respuesta_dorso"] option:selected').val(),
                    respuesta_placenta: $('select[name="respuesta_placenta"]').val(),
                    respuesta_placenta_insercion: $('select[name="respuesta_placenta_insercion"]').val(),
                    respuesta_uterina_derecha: $('input[name="respuesta_uterina_derecha"]').val(),
                    respuesta_uterina_derecha_percentil: $('#respuesta_uterina_derecha_percentil').html(),
                    respuesta_uterina_izquierda: $('input[name="respuesta_uterina_izquierda"]').val(),
                    respuesta_uterina_izquierda_percentil: $('#respuesta_uterina_izquierda_percentil').html(),
                    respuesta_uterinas: $('input[name="respuesta_uterinas"]').val(),
                    respuesta_uterinas_percentil: $('#respuesta_uterinas_percentil').html(),
                    respuesta_umbilical: $('input[name="respuesta_umbilical"]').val(),
                    respuesta_umbilical_percentil: $('#respuesta_umbilical_percentil').html(),
                    respuesta_cm: $('input[name="respuesta_cm"]').val(),
                    respuesta_cm_percentil: $('#respuesta_cm_percentil').html(),
                    respuesta_cmau: $('input[name="respuesta_cmau"]').val(),
                    respuesta_cmau_percentil: $('#respuesta_cmau_percentil').html(),
                    respuesta_hipotesis: $('select[name="respuesta_hipotesis"]').val(),
                    respuesta_doppler_materno: $('select[name="respuesta_doppler_materno"]').val(),
                    respuesta_doppler_fetal:  $('select[name="respuesta_doppler_fetal"]').val(),
                    respuesta_anatomia:  $('select[name="respuesta_anatomia"]').val(),
                    respuesta_anatomia_extra: $('input[name="respuesta_anatomia_extra"]').val(),
                    respuesta_dbp: $('input[name="respuesta_dbp"]').val(),
                    respuesta_cc: $('input[name="respuesta_cc"]').val(),
                    respuesta_cc_pct: $('#respuesta_cc_pct').html(),
                    respuesta_ca: $('input[name="respuesta_ca"]').val(),
                    respuesta_ca_pct: $('#respuesta_ca_pct').html(),
                    respuesta_lf: $('input[name="respuesta_lf"]').val(),
                    respuesta_lf_pct: $('#respuesta_lf_pct').html(),
                    respuesta_bvm: $('select[name="respuesta_bvm"]').val(),
                    respuesta_ccca: $('input[name="respuesta_ccca"]').val(),
                    respuesta_ccca_pct: $('input[name="respuesta_ccca_pct"]').val(),
                    respuesta_sexo_fetal: $('select[name="respuesta_sexo_fetal"]').val(),
                    respuesta_dof: $('select[name="respuesta_dof"]').val(),
                    respuesta_fcf: $('select[name="respuesta_fcf"]').val()
                }
                args.respuesta_uterina_derecha_percentil = args.respuesta_uterina_derecha_percentil.replace("Pct. ", "");
                args.respuesta_uterina_izquierda_percentil = args.respuesta_uterina_izquierda_percentil.replace("Pct. ", "");
                args.respuesta_ccca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
                args.respuesta_ca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
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
            document.getElementById("interconsulta_profesional").value = data.solicitud_profesional;
            document.getElementById("solicitud_nombreprofesional").value = data.solicitud_nombreprofesional;
            document.getElementById("solicitud_email").value = data.solicitud_email;
            document.getElementById("interconsulta.respuesta.fecha").value = setInputDate();
            var nombreprofesionalPegar = data.solicitud_nombre_referente;
            $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
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
                        $("#interconsulta\\.respuesta\\.eg").parent().children("label").html('Día del ciclo mestrual');
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
            pctPFE = Math.trunc(pctFinal);
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
            pctPFE = Math.trunc(pctFinal);
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
                pctUT = Math.trunc(resultado);
            }
            return pctUT;
        }
        else{
            return 0;
        }
    }
}
function pctacmAdvanced(eg,acm) {
    var a = [], b = [];
    a[0] = 1.24; a[1] = 1.29; a[2] = 1.34; a[3] = 1.37; a[4] = 1.4; a[5] = 1.43; a[6] = 1.44; a[7] = 1.45; a[8] = 1.45; a[9] = 1.44; a[10] = 1.43; a[11] = 1.41; a[12] = 1.38; a[13] = 1.34;	a[14] = 1.3; a[15] = 1.25; a[16] = 1.19; a[17] = 1.13;	a[18] = 1.05; a[19] = 0.98; a[20] = 0.89;
    b[0] = 1.98; b[1] = 2.12; b[2] = 2.25; b[3] = 2.36; b[4] = 2.45; b[5] = 2.53; b[6] = 2.59; b[7] = 2.63; b[8] = 2.66; b[9] = 2.67; b[10] = 2.67;	b[11] = 2.65; b[12] = 2.62; b[13] = 2.56;	b[14] = 2.5; b[15] = 2.41; b[16] = 2.31; b[17] = 2.2; b[18] = 2.07; b[19] = 1.92; b[20] = 1.76;
    
    if (eg < 20 || eg > 40){return 0;}
    else {
        eg = parseInt(eg);
        eg = eg - 20;
        var uno = b[eg] - a[eg];
        var dos = acm - a[eg];
        var resultado = parseInt(90 / (uno) * (dos) + 5);
        if (resultado > 99){
            return '> 99';
        }
        else if (resultado < 1){
            return '< 1';
        }
        else{
            return Math.trunc(resultado);
        }
    }
}
function pctauAdvanced(eg, aumb) {
    var a = [], b = [];
    a[0] = 0.97; a[1] = 0.95; a[2] = 0.94; a[3] = 0.92; a[4] = 0.9;	a[5] = 0.89; a[6] = 0.87; a[7] = 0.85; a[8] = 0.82; a[9] = 0.8; a[10] = 0.78; a[11] = 0.75; a[12] = 0.73; a[13] = 0.7; a[14] = 0.67; a[15] = 0.65; a[16] = 0.62; a[17] = 0.58; a[18] = 0.55; a[19] = 0.52;a[20] = 0.49;
    b[0] = 1.6;	b[1] = 1.56; b[2] = 1.53; b[3] = 1.5; b[4] = 1.46; b[5] = 1.43; b[6] = 1.4;	b[7] = 1.37; b[8] = 1.35; b[9] = 1.32; b[10] = 1.29; b[11] = 1.27; b[12] = 1.25; b[13] = 1.22; b[14] = 1.2; b[15] = 1.18; b[16] = 1.16; b[17] = 1.14; b[18] = 1.13; b[19] = 1.11; b[20] = 1.09;

    if (eg < 20 || eg > 40){return 0;}
    else {
        eg = parseInt(eg);
        eg = eg - 20;
        var uno = b[eg] - a[eg];
        var dos = aumb - a[eg];
        var resultado = parseInt(90 / (uno) * (dos) + 5);
        //truncador de Pct, sobre 100 o bajo 1
        if (resultado > 99){ return '> 99'; }
        else if (resultado < 1){ return '< 1'; }
        else{ return resultado; }
    }
}
function psohdlk() {
    var CC = 0;
    var CA = 0;
    if (parseInt($("input[name='respuesta_cc']").val()) < 0){
        $("input[name='respuesta_pfe']").val(0).trigger("change");
        return;
    }
    if (parseInt($("input[name='respuesta_ca']").val()) < 0){
        $("input[name='respuesta_pfe']").val(0).trigger("change");
        return;
    }
    CC = parseInt($("input[name='respuesta_cc']").val());
    CA = parseInt($("input[name='respuesta_ca']").val());
    var psoP = Math.pow(10, (1.182 + 0.00273 * CC + 0.007057 * CA - 0.0000063 * Math.pow(CA, 2) - 0.000002184 * CC * CA));
    if (isNaN(psoP) != true) {
        $("input[name='respuesta_pfe']").val(Math.trunc(psoP)).trigger("change");
    }
    else{
        $("input[name='respuesta_pfe']").val(0).trigger("change");
    }
}
function calCCCA(){
    var CC,CA;
    if (parseInt($("input[name='respuesta_cc']").val()) < 0){
        $("input[name='respuesta_ccca']").val(0).trigger("change");
        return;
    }
    if (parseInt($("input[name='respuesta_ca']").val()) < 0){
        $("input[name='respuesta_ccca']").val(0).trigger("change");
        return;
    }
    CC = parseInt($("input[name='respuesta_cc']").val());
    CA = parseInt($("input[name='respuesta_ca']").val());
    var ccca = CC / CA;
    $("input[name='respuesta_ccca']").val(ccca.toFixed(2)).trigger("change");
    if (isNaN(ccca) != true) {
        $("input[name='respuesta_ccca']").val(ccca.toFixed(2)).trigger("change");
    }
    else{
        $("input[name='respuesta_ccca']").val(0).trigger("change");
    }
}
function eglcn() {
    var LCN = [[],[]];
    LCN[0][0] = 0.09; LCN[0][1] = 0.2; LCN[0][2] = 0.37; LCN[0][3] = 0.57; LCN[0][4] = 0.7;
    LCN[0][5] = 0.8; LCN[0][6] = 0.9; LCN[0][7] = 1; LCN[0][8] = 1.1; LCN[0][9] = 1.12;
    LCN[0][10] = 1.13; LCN[0][11] = 1.18; LCN[0][12] = 1.27; LCN[0][13] = 1.38; LCN[0][14] = 1.47;
    LCN[0][15] = 1.58; LCN[0][16] = 1.65; LCN[0][17] = 1.72; LCN[0][18] = 1.87; LCN[0][19] = 1.96;
    LCN[0][20] = 2.05; LCN[0][21] = 2.18; LCN[0][22] = 2.25; LCN[0][23] = 2.35; LCN[0][24] = 2.54;
    LCN[0][25] = 2.62; LCN[0][26] = 2.7; LCN[0][27] = 2.9; LCN[0][28] = 3.08; LCN[0][29] = 3.16;
    LCN[0][30] = 3.4; LCN[0][31] = 3.51; LCN[0][32] = 3.57; LCN[0][33] = 3.76; LCN[0][34] = 3.85;
    LCN[0][35] = 4.05; LCN[0][36] = 4.18; LCN[0][37] = 4.46; LCN[0][38] = 4.55; LCN[0][39] = 4.66;
    LCN[0][40] = 4.88; LCN[0][41] = 5.07; LCN[0][42] = 5.29; LCN[0][43] = 5.46; LCN[0][44] = 5.66;
    LCN[0][45] = 5.87; LCN[0][46] = 6.01; LCN[0][47] = 6.27; LCN[0][48] = 6.37; LCN[0][49] = 6.65;
    LCN[0][50] = 6.77; LCN[0][51] = 7.08; LCN[0][52] = 7.19; LCN[0][53] = 7.39; LCN[0][54] = 7.57;
    LCN[0][55] = 7.68; LCN[0][56] = 7.98; LCN[0][57] = 8.09; LCN[0][58] = 8.35; LCN[0][59] = 8.48;
    LCN[0][60] = 8.56; LCN[0][61] = 8.76; LCN[0][62] = 8.88; LCN[0][63] = 9.09;
    LCN[1][0] = 0; LCN[1][1] = 5.5; LCN[1][2] = 6; LCN[1][3] = 6.2; LCN[1][4] = 6.4;
    LCN[1][5] = 6.5; LCN[1][6] = 6.6; LCN[1][7] = 7.1; LCN[1][8] = 7.1; LCN[1][9] = 7.1;
    LCN[1][10] = 7.2; LCN[1][11] = 7.3; LCN[1][12] = 7.4; LCN[1][13] = 7.5; LCN[1][14] = 7.6;
    LCN[1][15] = 8; LCN[1][16] = 8.1; LCN[1][17] = 8.2; LCN[1][18] = 8.3; LCN[1][19] = 8.4;
    LCN[1][20] = 8.5; LCN[1][21] = 8.6; LCN[1][22] = 9; LCN[1][23] = 9.1; LCN[1][24] = 9.2;
    LCN[1][25] = 9.3; LCN[1][26] = 9.4; LCN[1][27] = 9.5; LCN[1][28] = 10; LCN[1][29] = 10.1;
    LCN[1][30] = 10.2; LCN[1][31] = 10.3; LCN[1][32] = 10.4; LCN[1][33] = 10.5; LCN[1][34] = 10.6;
    LCN[1][35] = 11; LCN[1][36] = 11.1; LCN[1][37] = 11.2; LCN[1][38] = 11.3; LCN[1][39] = 11.4;
    LCN[1][40] = 11.5; LCN[1][41] = 11.6; LCN[1][42] = 12; LCN[1][43] = 12.1; LCN[1][44] = 12.2;
    LCN[1][45] = 12.3; LCN[1][46] = 12.4; LCN[1][47] = 12.5; LCN[1][48] = 12.6; LCN[1][49] = 13;
    LCN[1][50] = 13.1; LCN[1][51] = 13.2; LCN[1][52] = 13.3; LCN[1][53] = 13.4; LCN[1][54] = 13.5;
    LCN[1][55] = 13.6; LCN[1][56] = 14; LCN[1][57] = 14.1; LCN[1][58] = 14.2; LCN[1][59] = 14.3;
    LCN[1][60] = 14.4; LCN[1][61] = 14.5; LCN[1][62] = 14.6; LCN[1][63] = 15;
    var lcn = 0;
    if (parseInt($("input[name='respuesta_lcn']").val()) < 0){
        $("input[name='respuesta_pfe']").val("0");
        return;
    }
    lcn = $("input[name='respuesta_lcn']").val();
    lcn = lcn.toString().replace(',', '.');
    lcn = parseFloat(lcn);
    if (isNaN(lcn) != true) {
        var ValLCN1 = lcn / 10;
        for (i = 1; i <= 63; i++) {
            if (LCN[0][i] >= ValLCN1) {
                var eglcn = LCN[1][i];
                i = 63;
            }
        }
        _fecha = new Date ();
        _fecha.setTime(Date.parse(document.getElementById("interconsulta.respuesta.fecha").value));

        var eglcN = eglcn.toString().split('.');
        if (eglcN.length == 1){
            eglcN = parseInt(eglcN[0]) * 7;
        }else if (eglcN.length == 2){
            eglcN = (parseInt(eglcN[0]) * 7) + parseInt(eglcN[1]);
        }
        _fecha.setDate(_fecha.getUTCDate() - eglcN);
        $("input[name='respuesta_furop']").val(setInputDate(_fecha));
        _fecha.setDate(_fecha.getUTCDate() + 240);
        $("input[name='respuesta_fppactualizada']").val(setInputDate(_fecha));
        $("input[name='respuesta_lcn_eg']").val(eglcn);
    } 
    else {
        $("input[name='respuesta_lcn_eg']").val(0);
        $("input[name='respuesta_furop']").val(setInputDate());
        $("input[name='respuesta_fppactualizada']").val(setInputDate());
    }
};
function pctcccaAdvanced(eg, ccca) {
    'use strict';
    let a = [], b = [];
    a[0] = 1.1; a[1] = 1.09; a[2] = 1.08; a[3] = 1.07; a[4] = 1.06; a[5] = 1.06; a[6] = 1.05; a[7] = 1.04; a[8] = 1.03; a[9] = 1.02; a[10] = 1.01; a[11] = 1; a[12] = 1; a[13] = 0.99; a[14] = 0.98; a[15] = 0.97; a[16] = 0.96; a[17] = 0.95; a[18] = 0.95; a[19] = 0.94; a[20] = 0.93; a[21] = 0.92; a[22] = 0.91; a[23] = 0.9; a[24] = 0.89; a[25] = 0.89;
    b[0] = 1.29; b[1] = 1.28; b[2] = 1.27; b[3] = 1.26; b[4] = 1.25; b[5] = 1.24; b[6] = 1.24; b[7] = 1.23; b[8] = 1.22; b[9] = 1.21; b[10] = 1.2; b[11] = 1.19; b[12] = 1.18; b[13] = 1.18; b[14] = 1.17; b[15] = 1.17; b[16] = 1.16; b[17] = 1.15; b[18] = 1.14; b[19] = 1.13; b[20] = 1.12; b[21] = 1.11; b[22] = 1.1; b[23] = 1.09; b[24] = 1.08; b[25] = 1.08;

    if (eg < 15 || eg > 40){
        return 0;
    }
    else {
        eg = parseInt(eg);
        eg = eg - 15;
        var uno = b[eg] - a[eg];
        var dos = ccca - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';} 
        else {return resultado;}
    }
}
function pctcaAdvanced(eg, ca) {
    'use strict';
    let a = [], b = [];
    a[12] = 42; a[13] = 52; a[14] = 64; a[15] = 75;  a[16] = 86;  a[17] = 97; a[18] = 109; a[19] = 119; a[20] = 131; a[21] = 141; a[22] = 151; a[23] = 161; a[24] = 171; a[25] = 181; a[26] = 191; a[27] = 200; a[28] = 209; a[29] = 218; a[30] = 227; a[31] = 236; a[32] = 245; a[33] = 253; a[34] = 261; a[35] = 269; a[36] = 277; a[37] = 285; a[38] = 292; a[39] = 299; a[40] = 307; a[41] = 313; a[42] = 320;
    b[12] = 71; b[13] = 79; b[14] = 92; b[15] = 102; b[16] = 113; b[17] = 127; b[18] = 141; b[19] = 155; b[20] = 170; b[21] = 183; b[22] = 192; b[23] = 209; b[24] = 223; b[25] = 235; b[26] = 248; b[27] = 260; b[28] = 271; b[29] = 284; b[30] = 295; b[31] = 306; b[32] = 318; b[33] = 329; b[34] = 339; b[35] = 349; b[36] = 359; b[37] = 370; b[38] = 380; b[39] = 389; b[40] = 399; b[41] = 409; b[42] = 418;

    if (eg < 12 || eg > 40){return 0;} 
    else {
        eg = parseInt(eg);
        var uno = b[eg] - a[eg];
        var dos = ca - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';}
        else {return resultado;}
    }
}
function pctccAdvanced(eg, cc) {
    'use strict';
    let a = [], b = [];
    a[12] = 64; a[13] = 74; a[14] = 88; a[15] = 100; a[16] = 113; a[17] = 126; a[18] = 137; a[19] = 149; a[20] = 161; a[21] = 172; a[22] = 183; a[23] = 194; a[24] = 204; a[25] = 214; a[26] = 224; a[27] = 233; a[28] = 242; a[29] = 250; a[30] = 258; a[31] = 267; a[32] = 274; a[33] = 280; a[34] = 287; a[35] = 293; a[36] = 299; a[37] = 303; a[38] = 308; a[39] = 311; a[40] = 315; a[41] = 318; a[42] = 322;
    b[12] = 81; b[13] = 94; b[14] = 106; b[15] = 120; b[16] = 135; b[17] = 150; b[18] = 165; b[19] = 179; b[20] = 193; b[21] = 206; b[22] = 219; b[23] = 232; b[24] = 243; b[25] = 256; b[26] = 268; b[27] = 279; b[28] = 290; b[29] = 300; b[30] = 310; b[31] = 319; b[32] = 328; b[33] = 336; b[34] = 343; b[35] = 351; b[36] = 358; b[37] = 363; b[38] = 368; b[39] = 373; b[40] = 377; b[41] = 382; b[42] = 387;

    if (eg < 12 || eg > 40) {
        return 0;
    }
    else {
        eg = parseInt(eg);
        var uno = b[eg] - a[eg];
        var dos = cc - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {return '> 99';} 
        else if (resultado < 1) {return '< 1';} 
        else {return resultado;}
    }
}
function pctlfAdvanced(eg, lf) {
    'use strict';
    let a = [], b = [];
    a[12] = 7;  a[13] = 9;  a[14] = 12; a[15] = 15; a[16] = 17; a[17] = 21; a[18] = 23; a[19] = 26; a[20] = 28; a[21] = 30; a[22] = 33; a[23] = 35; a[24] = 38; a[25] = 40; a[26] = 42; a[27] = 44; a[28] = 46; a[29] = 48; a[30] = 50; a[31] = 52; a[32] = 53; a[33] = 55; a[34] = 57; a[35] = 59; a[36] = 60; a[37] = 62; a[38] = 64; a[39] = 65; a[40] = 66; a[41] = 68; a[42] = 69;
    b[12] = 12; b[13] = 14; b[14] = 17; b[15] = 20; b[16] = 23; b[17] = 27; b[18] = 31; b[19] = 34; b[20] = 38; b[21] = 40; b[22] = 43; b[23] = 47; b[24] = 50; b[25] = 52; b[26] = 56; b[27] = 58; b[28] = 62; b[29] = 64; b[30] = 66; b[31] = 68; b[32] = 71; b[33] = 73; b[34] = 75; b[35] = 78; b[36] = 80; b[37] = 82; b[38] = 84; b[39] = 86; b[40] = 88; b[41] = 90; b[42] = 92;

    if (eg < 12 || eg > 40) {return 0;}
    else {
        eg = parseInt(eg);
        var uno = b[eg] - a[eg];
        var dos = lf - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';}
        else {return resultado;}
    }
}
function ICAdvanced(dbp, dof) {
    if (dbp > 0 && dof > 0) {
        let valor = ((dbp / dof) * 100);
        return Math.trunc(valor) + "%";
    } else {
        return 0;
    }
}
function pctlhAdvanced(eg, lh) {
    'use strict';
    let a = [], b = [];
    a[12] = 4.8; a[13] = 7.6; a[14] = 10.3; a[15] = 13.1; a[16] = 15.8;  a[17] = 18.5; a[18] = 21.2; a[19] = 23.8; a[20] = 26.3;  a[21] = 28.8; a[22] = 31.2; a[23] = 33.5; a[24] = 35.7;  a[25] = 37.9; a[26] = 39.9; a[27] = 41.9; a[28] = 43.7;  a[29] = 45.5; a[30] = 47.2; a[31] = 48.9; a[32] = 50.4;  a[33] = 52.1; a[34] = 53.4; a[35] = 54.8; a[36] = 56.2;  a[37] = 57.6; a[38] = 59.8; a[39] = 60.4; a[40] = 61.9;
    b[12] = 12.3; b[13] = 15.1; b[14] = 17.9; b[15] = 20.7; b[16] = 23.5; b[17] = 26.3; b[18] = 29.1; b[19] = 31.6; b[20] = 34.2; b[21] = 36.7; b[22] = 39.2; b[23] = 41.6; b[24] = 43.9; b[25] = 46.1; b[26] = 48.1; b[27] = 50.1; b[28] = 52.1; b[29] = 53.9; b[30] = 55.6; b[31] = 57.3; b[32] = 58.9; b[33] = 60.5; b[34] = 62.1; b[35] = 63.5; b[36] = 64.9; b[37] = 66.4; b[38] = 67.8; b[39] = 69.3; b[40] = 70.8;
    
    if (eg < 12 || eg > 40) {
        return 0;
    }
    else {
        eg = parseInt(eg);
        var uno = b[eg] - a[eg];
        var dos = lh - a[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 5);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';}
        else {return resultado;}
    }
}
function pctcerebeloAdvanced(eg,cerebelo) {
    'use strict';
    let a = [], b = [];
    a[0] = 12;a[1] = 14;a[2] = 15;a[3] = 16;a[4] = 17;a[5] = 18; a[6] = 19;a[7] = 20;a[8] = 21;a[9] = 22;a[10] = 24; a[11] = 26;a[12] = 27;a[13] = 29;a[14] = 30;a[15] = 31; a[16] = 33;a[17] = 36;a[18] = 37;a[19] = 38;a[20] = 40; a[21] = 40;a[22] = 40;a[23] = 41;a[24] = 42;a[25] = 44;
    b[0] = 18;b[1] = 18;b[2] = 19;b[3] = 20;b[4] = 22; b[5] = 23;b[6] = 25;b[7] = 26;b[8] = 27;b[9] = 30; b[10] = 32;b[11] = 34;b[12] = 34;b[13] = 37;b[14] = 38; b[15] = 41;b[16] = 43;b[17] = 46;b[18] = 48;b[19] = 53; b[20] = 56;b[21] = 58;b[22] = 60;b[23] = 62;b[24] = 62; b[25] = 62;

    if (eg < 15 || eg > 40 ) { return 0; } 
    else {
        eg = parseInt(eg) - 15;
        let uno = b[eg] - a[eg];
        let dos = cerebelo - a[eg];
        let resultado = parseInt(95 / (uno) * (dos) + 5);
        if (resultado > 99) {return '> 99';}
        else if (resultado < 1) {return '< 1';}
        else {return resultado;}
    }
};
function valCC(dof,dbp){
    var delta = parseFloat(1.60);
    return Math.round((parseInt(dof) + parseInt(dbp)) * delta);
}
function callModal(informe, solicitud){$("#exampleModal").data("informe", informe).data("solicitud", solicitud).modal("show");}
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}
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
            diagnostico: document.getElementById(modalModificar.diagnostico).value
        };

        $.post("dashboard/guardarsolicitud/" + document.getElementById(modalModificar.solicitud_id).value, data).done(function(){loadInProcess();});
        $('#'+modal).modal("hide");
    });s

    let id_sol = uuidv4();let _a= uuidv4(); let _b= uuidv4(); let _c= uuidv4(); let _d= uuidv4(); let _e= uuidv4(); let _f= uuidv4(); let _g= uuidv4(); let _h= uuidv4(); let _i= uuidv4(); let _j= uuidv4();
    let formulario = '<div class="row"><input type="hidden" class="form-control" id="'+id_sol+'"><div class="col form-group"><label>Nombre del paciente</label><input type="text" class="form-control" id="'+_a+'"> </div><div class="col form-group"><label>RUT del paciente</label><div><input type="text" class="form-control" id="'+_b+'" disabled></div></div><div class="col form-group"><label>Teléfono materno</label><input type="number" class="form-control" id="'+_c+'"> </div></div><div class="row"><div class="col-4 form-group btn-animado rounded mb-0 pb-3"><label>Debe ingresar FUM referida o corregida</label><input type="date" class="form-control g-verde text-white" id="'+_d+'"></div><div class="col form-group mb-0 pb-3"><label>Fecha de solicitud del exámen</label><input type="date" class="form-control g-verde text-white" id="'+_e+'"></div><div class="col-4 form-group mb-0 pb-3"><label>Edad Gestacional (Ege)</label><input type="text" class="form-control g-verde text-white" id="'+_f+'" disabled="" value="0 semanas"></div></div><div class="row"><div class="col-4 form-group"><label>Edad materna (años)</label><select class="form-control" id="'+_g+'"></select></div><div class="col form-group"><label>Ciudad procedencia de la paciente</label><select class="form-control" id="'+_h+'"></select></div><div class="col form-group"><label>Lugar de control prenatal</label><select class="form-control" id="'+_i+'"></select></div></div><div class="row"><div class="col-4 form-group"><label><strong>Diagnóstico de referencia a exámen ecográfico:</strong></label></div><div class="col-8 form-group"><input type="text" class="form-control" id="'+_j+'"></div></div>';

    document.getElementById(modal.contenido).innerHTML = formulario;

    loadOptionEdadMaterta(_g);

    document.getElementById(_h).innerHTML = document.getElementById('h').innerHTML;
    document.getElementById(_i).innerHTML = document.getElementById('i').innerHTML;

    modalModificar = {solicitud_id: id_sol,nombre: _a,rut: _b,telefono: _c,fum: _d,fecha: _e,eg: _f,edadMaterna: _g,ciudad: _h,lugar: _i,diagnostico: _j};

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
    document.getElementById(_j).value = data.solicitud_diagnostico;

    $("#"+_d+", #"+_e).on("change", function(){
        let EG = calcularEdadGestacional(modalModificar.fum, modalModificar.fecha);
        document.getElementById(modalModificar.eg).value = EG.text;
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
    let html = '<div id="ginecologica"><div class="row m-0 p-2"><div class="col-12"><h6 class="text-primary">Datos a completar por el examinador</h6></div><div class="col-8 border rounded p-3"><div class="row"><div class="col-6 form-group"><label>Útero</label><input type="text" class="form-control" name="respuesta_utero_ginecologica"></div><div class="col-6 form-group"><label>Endometrio</label><input type="text" class="form-control" name="respuesta_endometrio"></div><div class="col-6 form-group"><label>Anexo Izquierdo</label><input type="text" class="form-control" name="respuesta_anexo_izquierdo_ginecologica"></div><div class="col-6 form-group"><label>Anexo Derecho</label><input type="text" class="form-control" name="respuesta_anexo_derecho_ginecologica"></div><div class="col-6 form-group"><label>Ovario Izquierdo</label><input type="text" class="form-control" name="respuesta_ovario_izquierdo"></div><div class="col-6 form-group"><label>Ovario Derecho</label><input type="text" class="form-control" name="respuesta_ovario_derecho"></div><div class="col-6 form-group"><label>Douglas</label><input type="text" class="form-control" name="respuesta_douglas_ginecologica"></div></div></div><div class="col-4"><div class="border rounded px-3 pt-3 mb-5"><img src="imagenes/uteroyovarios.jpg" alt="Utero y ovarios" class="img-fluid d-block mx-auto w-75"></div><div class="border rounded px-3 pt-3 mb-5"><p>Documentación de informe cuando ecográficamente no se observan signos de embarazo.</p></div><div class="border rounded text-center"><div role="group" aria-label="Basic example" class="btn-group text-center"><button class="btn btn-primary text-white" id="enviar.respuesta.botton.espejo">Enviar respuesta</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar.espejo">Eliminar solicitud</button><button type="button" class="btn btn-secondary" id="ver.interconsulta.cerrar.espejo">Cerrar</button></div></div></div></div></div>';
    document.getElementById("contenedor.examenes").innerHTML = html;

    $("#enviar\\.respuesta\\.botton\\.espejo").on("click", function(){$("#enviar\\.respuesta\\.botton").trigger("click");});
    $("#ver\\.interconsulta\\.eliminar\\.espejo").on("click", function(){$("#ver\\.interconsulta\\.eliminar").trigger("click");});
    $("#ver\\.interconsulta\\.cerrar\\.espejo").on("click", function(){$("#ver\\.interconsulta").modal("hide");});
}
function segundoTrimestre(){
    let html = '<div id="segundotrimestre"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso_segundo"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino" selected="">femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado">aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico, cualitativo</label> <select class="form-control" name="respuesta_liquido_amniotico"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>Líquido amniótico, semicuantitativo; BVM (mm)</label> <select name="respuesta_bvm" class="form-control"></select> </div><div class="col form-group"> <label>Frecuencia cardiaca fetal (FCF)</label> <select name="respuesta_fcf" class="form-control"></select> </div><div class="col-4 form-group"> <label>Evaluación de anatomía fetal</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-12"> <p><strong>Biometrías</strong></p></div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col form-group"> <label>DOF (mm)</label> <input type="text" class="form-control" name="respuesta_dof"> </div><div class="col form-group"> <label>IC (DBP/DOF) [70%-86%]</label> <input type="text" class="form-control" name="respuesta_ic" disabled> </div></div><div class="row"> <div class="col form-group"> <label>CC (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cc"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cc_pct"></div></div></div></div><div class="col form-group"> <label>CA (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_ca"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ca_pct"></div></div></div></div><div class="col form-group"> <label>LF (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lf"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lf_pct"></div></div></div></div></div><div class="row"> <div class="col-4 py-3 form-group"> <label>Opcionales para estimación tardia de la edad gestacional</label> </div><div class="col-4 form-group"> <label>LH (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lh"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lh_pct"></div></div></div></div><div class="col-4 form-group"> <label>Cerebelo (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cerebelo"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cerebelo_pct"></div></div></div></div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Peso fetal estimado</label> <input type="text" class="form-control" name="respuesta_pfe" disabled> </div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col form-group"> <label>Índice Cc / Ca</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_ccca" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ccca_pct"></div></div></div></div></div><div class="row"> <div class="col form-group"> <label><strong>Hipótesis diagnóstica</strong></label> <input type="text" class="form-control" name="respuesta_hipotesis"> </div></div></div>';
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
    let html = '<div id="multiproposito"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino" selected>femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado">aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico, cualitativo</label> <select class="form-control" name="respuesta_liquido"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>Líquido amniótico, semicuantitativo; BVM (mm)</label> <select type="text" class="form-control" name="respuesta_bvm"></select> </div><div class="col form-group"> <label>Fecuencia cardiaca fetal (FCF)</label> <select name="respuesta_fcf" class="form-control"></select> </div><div class="col-4 form-group"> <label>Evaluación de anatomía fetal</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-6"> <div class="row"> <div class="col-12"><strong>A.- Biometría fetales:</strong></div><div class="col-6 form-group"> <label>DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col-6 form-group"> <label>DOF (mm)</label> <input type="text" class="form-control" name="respuesta_dof"> </div><div class="col-12 form-group"> <label>CC (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cc"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cc_pct"></div></div></div></div><div class="col-12 form-group"> <label>CA (mm)</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_ca"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ca_pct"></div></div></div></div><div class="col-12 form-group"> <label>LF (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lf"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lf_pct"></div></div></div></div><div class="col-6 form-group"> <label>Peso fetal estimado (PFE) en gramos</label> <input type="number" class="form-control" name="respuesta_pfe" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col-6 form-group"> <label>Relación cráneo/abdomen ( Índice Cc/Ca )</label> <input type="text" class="form-control" name="respuesta_ccca" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><input type="text" class="form-control" name="respuesta_ccca_pct" disabled> </div></div></div></div><div class="col-6"> <div class="row"> <div class="col-12"><strong>B.- Flujometría Doppler materno / fetal</strong></div><div class="col-12 form-group"> <label>IP. Uterina derecha</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_uterina_derecha"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_derecha_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Uterina izquierda</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_uterina_izquierda"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_izquierda_percentil"></div></div></div></div><div class="col-6 form-group"> <label>IP. Uterinas promedio</label> <input type="text" class="form-control" name="respuesta_uterinas" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><div class="form-control bg-secondary text-white" id="respuesta_uterinas_percentil"></div></div></div><div class="col-12 form-group"> <label>IP. Arteria umbilical</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_umbilical"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_umbilical_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Cerebral media</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_cm"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cm_percentil"> </div></div></div></div><div class="col-6 form-group"> <label>IP Cm/Au (Índice cerebro placentario ICP)</label> <input type="text" class="form-control" name="respuesta_cmau" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><div class="form-control bg-secondary text-white" id="respuesta_cmau_percentil"></div></div></div></div></div></div><div class="row"> <div class="col-12"> <p class="mb-0"><strong>C.- Análisis preliminar de datos ecográficos (Biometría y flujometría)</strong></p></div><div class="col-4 form-group bg-secondary pb-2 mb-2 text-white"> <label>Crecimiento fetal ( PFE )</label> <select class="form-control" name="respuesta_hipotesis"> <option value="Disminuido < p3">Disminuido < p3</option> <option value="Disminuido < p10">Disminuido < p10</option> <option value="Normal p10 - p 25">Normal p10 - p 25</option> <option value="Normal p26 - p 75" selected>Normal p26 - p 75</option> <option value="Normal p76 - p90">Normal p76 - p90</option> <option value="Grande >p90">Grande >p90</option> <option value="Grande >p97">Grande >p97</option> </select> </div><div class="col form-group bg-secondary pb-2 mb-2 text-white"> <label>Doppler materno ( IP Uterinas )</label> <select class="form-control" name="respuesta_doppler_materno"> <option value="no evaluado">No evaluado</option> <option value="Normal (< p95)" selected>Normal (&lt; p95)</option> <option value="Alterado (> p95)">Alterado (&gt; p95)</option> </select> </div><div class="col-5 form-group bg-secondary pb-2 mb-2 text-white"> <label>Doppler fetal ( IP UMB, ACM e ICP )</label> <select class="form-control" name="respuesta_doppler_fetal"> <option value="No evaluado">No evaluado</option> <option value="Normal (UMB, ACM, ICP)" selected>Normal (UMB, ACM e ICP)</option> <option value="Alterado, ICP < pct 5">Alterado, ICP &lt; pct 5</option> <option value="Alterado ICP < pct 5 y UMB > pct 95">Alterado ICP &lt; pct 5 y UMB &gt; pct 95</option> <option value="Alterado ccp < pct 5 acm < pct 5">Alterado ICP &lt; pct 5 ACM &lt; pct 5</option> <option value="Alt. ICP < pct 5 y ACM < pct 5 + UMB > p95">Alt. ICP &lt; pct 5 y ACM &lt; pct 5 + UMB &gt; p95</option> </select> </div></div></div>';
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
    _FUM.setTime(Date.parse(document.getElementById(FUM).value)).getTime();
    _fExamen = new Date();
    _fExamen.setTime(Date.parse(document.getElementById(fExamen).value)).getTime();

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