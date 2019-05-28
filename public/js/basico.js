var nombreprofesionalPegar = "";
$(document).ready(function(){
	$("#interconsultas\\.estado\\.espera").remove();
	$("#interconsultas\\.estado\\.finalizadas").remove();
    $("#interconsultas\\.estado\\.nuevas").parent().prepend('<label id="interconsultas.estado.solicitar" class="btn btn-secondary active"><input type="radio" value="1" name="interconsultas" checked autocomplete="off">Solicitud de interconsulta</label><label id="interconsultas.estado.finalizadas" class="btn btn-secondary active"><input type="radio" value="3" name="interconsultas" autocomplete="off"> Respuesta del ecografista</label>');
	$("#interconsultas\\.estado\\.nuevas").remove();

    construir();
    loadsolicitud();
    $('.btn-group-toggle .btn').on("click", function(){
        let valor = parseInt($(this).find('input').val());

        if (valor == 1){
            loadsolicitud();
            $("#filtro\\.activar").addClass("d-none");
        }else if (valor == 3){
            loadInFinish();
            $("#filtro\\.activar").removeClass("d-none");
        }
	});

	loadProfesionales();
    
    $("#interconsulta\\.fum").on("change", function(){

		var FExamen, FUM, EdadGestacional;
		var undia = 1000 * 60 * 60 * 24;
		var unasemana = undia * 7;

		FUM = $("#interconsulta\\.fum").val();
		FExamen = $("#interconsulta\\.fecha").val();

		FUM = new Date (FUM);
		FExamen = new Date (FExamen);

		EdadGestacional = ((FExamen.getTime() - FUM.getTime()) / unasemana).toFixed(1);

		if (FExamen.getTime() < FUM.getTime()) {
			$('#interconsulta\\.egestacional').val("0 semanas");
		}
		else if (((FExamen.getTime() - FUM.getTime()) / unasemana) > 42) {
			$('#interconsulta\\.egestacional').val("42 semanas");
		}
		else {
			$('#interconsulta\\.egestacional').val(Math.floor(EdadGestacional) + "." + Math.round((EdadGestacional - Math.floor(EdadGestacional))*7) + " semanas");
		}

    });
    
    $("#interconsulta\\.enviar").on("click", function(){

		var listo = false;
		//revisar si el usuario lleno todas las cajas
			
		var nombre = String($("#interconsulta\\.nombre").val());
		var rut = String($("#interconsulta\\.rut").val());
		var fecha = String($("#interconsulta\\.fecha").val());
		var eg = String($('input[name=interconsulta_eg]:checked').val());
		var eco = String($('input[name=interconsulta_eco]:checked').val());
		var fum = String($("#interconsulta\\.fum").val());
		var diagnostico = String($("#interconsulta\\.diagnostico\\.select").val());
		var lugar = String($("#interconsulta\\.lugar").val());
		var ciudad = String($("#interconsulta\\.ciudad").val());
		var egestacional = String($("#interconsulta\\.egestacional").val());
		var para = String($("#interconsulta\\.para").val());
		var nombre_para = String($("#interconsulta\\.para\\.nombre").val());
		
		if (nombre.length < 3){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cómo se llama la paciente?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (rut.length < 4){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cual es el RUT de la paciente?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (fecha.length < 4){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cual es la Fecha de solicitud de la interconsulta?, ¿Hoy?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (eg == 'undefined' || eg.length < 1){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿La Ege es conocida precozmente?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (eco == 'undefined' || eco.length  < 0)
		{
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Tiene una ecografía previa de crecimiento la paciente?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (fum.length < 4){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cual es la Fecha de ultima mestruación de la paciente?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (diagnostico.length  < 3){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cual es el Diagnóstico de referencia?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (ciudad.length < 2){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cual es la ciudad procedencia de la paciente?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (lugar.length  < 3){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cual es el lugar de control prenatal?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (egestacional.length < 3){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>La fecha de solicitud y la FUM operacional no permiten calcular una edad gestacional, ¿Habrá ingresado mal estas fechas?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (nombre_para.length < 2){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cómo se llama el médico referente?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}

		if (para.length < 5){
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿A quien usted solicita la interconsulta?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
			return;
		}
		else{
			listo = true;
		}

		if (listo == true){
			$('#interconsulta\\.enviar').prop("disabled", true);
				var eLdiagnostico = $("#interconsulta\\.diagnostico\\.select").val() + ", "+ $("#interconsulta\\.diagnostico").val();

				var data = {
					nombre: $("#interconsulta\\.nombre").val(),
					rut: $("#interconsulta\\.rut").val(),
					fecha: $("#interconsulta\\.fecha").val(),
					eg: $('input[name=interconsulta_eg]:checked').val(),
					eco: $('input[name=interconsulta_eco]:checked').val(),
					fum: $("#interconsulta\\.fum").val(),
					diagnostico: eLdiagnostico,
					lugar: $("#interconsulta\\.lugar").val(),
					ciudad: $("#interconsulta\\.ciudad").val(),
					egestacional: $("#interconsulta\\.egestacional").val(),
					para: $("#interconsulta\\.para").val(),
					nombre_para: $("#interconsulta\\.para\\.nombre").val()
				};
				$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Interconsulta</h5></div><div class="modal-body"><p>Enviando solicitud de interconsulta, por favor espere</p><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div></div></div></div></div>');
				$('#cautivo\\.dialogo').modal("show");
		
				$.post("https://administrador.crecimientofetal.cl/api/send", data).done(function(response){
					if (response.result == false){
						$('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">ERROR</h5></div><div class="modal-body"><p>Usted NO puede solicitar interconsulta para este profesional</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
						$('#mensaje\\.dialogo').modal("show");
		
						$('#mensaje\\.dialogo').on('hidden.bs.modal', function (e) {
							$('#cautivo\\.dialogo').modal("hide");
							$("#cautivo\\.dialogo").remove();
							$(this).remove();
							$('#interconsulta\\.enviar').prop("disabled", false);
						});
					}
					else if (response.result == true){
						$('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Información</h5></div><div class="modal-body"><p>Su Solicitud de interconsulta ha sido enviada correctamente</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
						$('#mensaje\\.dialogo').modal("show");
		
						$('#mensaje\\.dialogo').on('hidden.bs.modal', function (e) {
							$('#cautivo\\.dialogo').modal("hide");
							$("#cautivo\\.dialogo").remove();
							$(this).remove();
							$('#interconsulta\\.enviar').prop("disabled", false);
						});
					}
				});
		}
	});

	$("#interconsulta\\.para\\.select").on("click", function(){
		$(this).trigger("change");
	});

	$("#interconsulta\\.para\\.select").on("change", function(){
		let correo = $(this).val();
		let nombre = $("#interconsulta\\.para\\.select option:selected").text();

		$("#interconsulta\\.para\\.nombre").val(nombre);
		$("#interconsulta\\.para").val(correo);
	});
});

function construir(){
    $("#mensaje\\.resultado").parent().parent().prepend('<div class="card-header bg-primary" id="card.header"><h4 class="text-white text-center">Formulario de referencia para evaluación ecográfica gineco - Obstétrica</h4><h6 class="text-white text-center">Formulario de libre disposición para profesionales que soliciten exámen ecográfico a ecografistas registrados en la plataforma</h6></div>');
    $("#mensaje\\.resultado").parent().prepend('<div id="formulario.solicitud"> <div class="row"> <div class="col form-group"> <label for="interconsulta.nombre">Nombre del paciente</label> <input type="text" class="form-control" id="interconsulta.nombre"> </div><div class="col form-group"> <label for="interconsulta.rut">RUT del paciente</label> <input type="text" class="form-control" id="interconsulta.rut"> </div><div class="col form-group"> <label for="interconsulta.fecha">Fecha de solicitud del exámen</label> <input type="date" class="form-control" id="interconsulta.fecha"> </div></div><div class="row"> <div class="col form-group"> <label for="inputEmail4">Ege conocida precozmente</label> </div><div class="col form-group"> <div> <input type="radio" id="interconsulta.eg.si" value="1" name="interconsulta_eg" class="form-check-input"> <label for="interconsulta.eg.si">Si</label> </div><div> <input type="radio" id="interconsulta.eg.no" value="0" name="interconsulta_eg" class="form-check-input" checked=""> <label for="interconsulta.eg.no">No</label> </div></div><div class="col form-group"> <label for="inputEmail4">Ecografía previa de crecimiento</label> </div><div class="col form-group"> <div> <input type="radio" id="interconsulta.eco.si" value="1" name="interconsulta_eco" class="form-check-input"> <label for="interconsulta.eco.si">Si</label> </div><div> <input type="radio" id="interconsulta.eco.no" value="0" name="interconsulta_eco" class="form-check-input" checked=""> <label for="interconsulta.eco.no">No</label> </div></div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.fecha">FUM operacional</label> <input type="date" class="form-control" id="interconsulta.fum"> </div><div class="col-2 form-group"> <label for="interconsulta.fecha">Edad Gestacional</label> <input type="text" class="form-control" id="interconsulta.egestacional" disabled=""> </div><div class="col form-group"> <label>Diagnóstico de referencia 1</label> <select class="form-control" id="interconsulta.diagnostico.select"> <option value="Referido por">Referido por</option> <option value="Patología de 1° trimestre">Patología de 1° trimestre</option> <option value="Patología de 2° trimestre">Patología de 2° trimestre</option> <option value="Patología de 3° trimestre">Patología de 3° trimestre</option> <option value="No señalado">No señalado</option> </select> </div><div class="col form-group"> <label for="interconsulta.diagnostico">Diagnóstico de referencia2</label> <input type="text" class="form-control" id="interconsulta.diagnostico"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.ciudad">Ciudad procedencia de la paciente</label> <input type="text" class="form-control" id="interconsulta.ciudad"> </div><div class="col form-group"> <label for="interconsulta.lugar">Lugar de control prenatal</label> <input type="text" class="form-control" id="interconsulta.lugar"> </div></div><br><h5><span class="badge badge-default p-2">Datos ecografista de contrarreferencia</span></h5> <div class="row"> <div class="col form-group"> <label>Seleccione profesional de contrareferencia</label> <select class="form-control" id="interconsulta.para.select"> </select> </div><div class="col form-group"> <label for="interconsulta.para.nombre">Nombre del profesional</label> <input type="text" class="form-control" id="interconsulta.para.nombre" disabled> </div><div class="col form-group"> <label for="interconsulta.para">Email (profesional de contrareferencia)</label> <input type="email" class="form-control" id="interconsulta.para" disabled> </div></div><div class="row"> <div class="col"> <button class="btn btn-primary" id="interconsulta.enviar">Enviar solicitud de exámen ecográfico</button> </div></div></div>');
}

function loadsolicitud(){
    $("#tabla\\.resultado").addClass("d-none");
    $("#mensaje\\.resultado").addClass("d-none");
    $("#card\\.header").removeClass("d-none");
    $("#formulario\\.solicitud").removeClass("d-none");
}
function loadInFinish(){
    $("#tabla\\.resultado").removeClass("d-none");
    $("#mensaje\\.resultado").removeClass("d-none");
    $("#card\\.header").addClass("d-none");
    $("#formulario\\.solicitud").addClass("d-none");

    $.get('dashboard/finish').done(function(data){
        buildFinishTable(data);
    });
}

function buildFinishTable(data){
    $('#tabla\\.resultado').empty();

    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Tipo de exámen</th><th>Realizado</th><th>Accion</th></tr></thead><tbody>';

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

            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + tipo +'</td><td>'+ fecha +'</td>';

            tabla += '<td><button class="btn btn-secondary informe mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Informe</button><button class="btn btn-secondary grafico" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Grafico</button></td></tr>';
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
            $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'"></iframe>')
            $("#ver\\.interconsulta").modal("show");
            $("#ver\\.interconsulta\\.footer").empty();
            $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-primary" id="ver.interconsulta.enviar" data-id="'+solicitud_id+'" data-informe="'+ tipo +'">Enviar</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
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
                $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'"></iframe>')
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            } else  if (tipo == "2"){
                url = 'graph/informe_segundotrimestre/';
                $("#ver\\.interconsulta > div").addClass("h-100");
                $("#ver\\.interconsulta > div > div").addClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("PDF Interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty();
                $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'"></iframe>')
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

function loadProfesionales(){
	$.get("api/profesionales").done(function(data){
		$("#interconsulta\\.para\\.select").empty();
		$.each(data, function(element, value){
			let option = '<option value="'+value.user_email+'">'+value.user_name+'</option>';
			$("#interconsulta\\.para\\.select").append(option);
		});
	});
}