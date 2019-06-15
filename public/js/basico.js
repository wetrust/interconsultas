$(document).ready(function(){
	$("#interfaz\\.enviar").on("click", function(){
		let selecciono = false;
		selecciono = $("#Mhome").hasClass("active");
		let email = "";
		let informe = $("#exampleModal").data("informe");
		let solicitud = $("#exampleModal").data("solicitud");

		if (selecciono){ email = $("#interfaz\\.email option:selected").val(); }
		else{ email = $("#interfaz\\.email\\.write").val(); }

		let args = {email: email,informe: informe,solicitud: solicitud}

		$.post(_api  + 'email_manual', args).done(function(data){
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

function loadInRespuesta(){
    $("#tabla\\.resultado").removeClass("d-none");
    $("#mensaje\\.resultado").removeClass("d-none");
    $("#card\\.header").addClass("d-none");
    $("#formulario\\.solicitud").addClass("d-none");

    $.get('dashboard/finish').done(function(data){
        buildRespuestaTable(data);
	});
	cargarCiudad();
    cargarLugar();
}

function buildRespuestaTable(data){
    $('#tabla\\.resultado').empty();
    $('#tabla\\.parto').empty();

    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Tipo de exámen</th><th>Realizado</th><th>Accion</th></tr></thead><tbody>';
        //tabla para exámenes ecográficos
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
                    loadInRespuesta();
                });
            });
            $("#ver\\.interconsulta\\.enviar").on("click", function(){
                callModal($(this).data("informe"), $(this).data("id"));
            });
        });

        $('#tabla\\.resultado tr > td > button.grafico').on("click", function(){
            let solicitud_id = $(this).data("id");
            let tipo = $(this).data("tipo");
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
        $("#mensaje\\.resultado").removeClass("d-none").html("No tienes interconsultas finalizadas o no estas autorizado para guardar interconsultas finalizadas");
    }
}

function loadSolicitadas(){
    $("#tabla\\.resultado").removeClass("d-none");
    $("#mensaje\\.resultado").removeClass("d-none");
    $("#card\\.header").addClass("d-none");
    $("#formulario\\.solicitud").addClass("d-none");

    $.get('dashboard/solicitadas').done(function(data){
        buildSolicitadasTable(data);
	});
}

function buildSolicitadasTable(data){
    $('#tabla\\.resultado').empty();

    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Teléfono</th><th>Ciudad</th><th>Lugar de control</th><th>Motivo de exámen</th><th>Solicitado</th><th>Confirmado</th><th>Accion</th></tr></thead><tbody>';
        //tabla para ver las interconsultas solicitadas
        $.each(data, function(i, value) {
            let fecha = value.solicitud_fecha.split('-');
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_telefono + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + value.solicitud_diagnostico +'</td><td>'+ fecha +'</td><td>No</td>';
            tabla += '<td><button class="btn btn-secondary mr-1" data-id='+ value.solicitud_id + '>Ver</button></td></tr>';
        });

        tabla += '</tbody>';
        $('#tabla\\.resultado').append(tabla);

        $('#tabla\\.resultado tr > td > button').on("click", function(){
            let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta > div").removeClass("h-100");
                $("#ver\\.interconsulta > div > div").removeClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("Datos de la interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty().append('<input type="hidden" id="solicitud_id" value=""/><div class="row"> <div class="col"> <label><small>Nombre del paciente:</small></label> <p id="solicitud_nombre"></p></div><div class="col"> <label><small>RUT del paciente:</small></label> <p id="solicitud_rut"></p></div><div class="col"> <label><small>Fecha de solicitud:</small></label> <p id="solicitud_fecha"></p></div><div class="col"> <label><small>FUM operacional</small></label> <p id="solicitud_fum"></p></div><div class="col"> <label><small>Edad Gestacional</small></label> <p id="solicitud_egestacional"></p></div></div><div class="row"> <div class="col form-group"> <label><small>Ege conocida precozmente</small></label> <p id="eg_precoz"></p></div><div class="col form-group"> <label><small>Ecografía previa de crecimiento</small></label> <p id="ecografia_previa"></p></div><div class="col form-group"> <label><small>Diagnóstico de referencia</small></label> <p id="solicitud_diagnostico"></p></div><div class="col form-group"> <label><small>Ciudad procedencia de la paciente</small></label> <p id="solicitud_ciudad"></p></div></div><div class="row"> <div class="col form-group"> <label><small>Lugar de control prenatal</small></label> <p id="solicitud_lugar"></p></div><div class="col form-group"> <label><small>Datos del profesional referente</small></label> <p id="interconsulta_profesional"></p></div><div class="col form-group"> <label><small>Nombre:</small></label> <p id="solicitud_nombreprofesional"></p></div><div class="col form-group"> <label><small>Email (de trabajo):</small></label> <p id="solicitud_email"></p></div></div>');
                $.get('dashboard/agendar/' + solicitud_id).done(function(data){
                    $("#solicitud_id").val(data.solicitud_id);
                    $("#solicitud_nombre").html('<strong>' + data.solicitud_nombre + '</strong>');
                    $("#solicitud_rut").html('<strong>' + data.solicitud_rut + '</strong>');
                    let fecha = data.solicitud_fecha.split('-');
                    fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
                    $("#solicitud_fecha").html('<strong>' + fecha + '</strong>');

                    let eg = data.solicitud_eg;
                    if (eg == "1"){eg = "Si";}
                    else{eg = "No";}

                    let eco = data.solicitud_eco;
                    if (eco == "1"){eco = "Si";}
                    else{eco = "No";}

                    $("#eg_precoz").html('<strong>' + eg + '</strong>');
                    $("#ecografia_previa").html('<strong>' + eco + '</strong>');
                    fecha = data.solicitud_fum.split('-');
                    fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
                    $("#solicitud_fum").html('<strong>' + fecha + '</strong>');
                    $("#solicitud_egestacional").html('<strong>' + data.solicitud_egestacional + '</strong>');
                    $("#solicitud_diagnostico").html('<strong>' + data.solicitud_diagnostico + '</strong>');
                    $("#solicitud_ciudad").html('<strong>' + data.solicitud_ciudad + '</strong>');
                    $("#solicitud_lugar").html('<strong>' + data.solicitud_lugar + '</strong>');
                    $("#interconsulta_profesional").html('<strong>' + data.solicitud_profesional + '</strong>');
                    $("#solicitud_nombreprofesional").html('<strong>' + data.solicitud_nombreprofesional + '</strong>');
                    $("#solicitud_email").html('<strong>' + data.solicitud_email + '</strong>');
                });
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty().prepend('<button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Cancelar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
                $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                    let solicitud_id =  $(this).data("id");
                    $.get("dashboard/delete/" + solicitud_id).done(function(){loadSolicitadas();});
                    $("#ver\\.interconsulta").modal("hide");
                });
        });
    }
}

function callModal(informe, solicitud){
    $("#Mhome").addClass("d-none").removeClass("active show");
    $("#Mprofile").addClass("show active");
    $("#home-tab").addClass("d-none").removeClass("active");
    $("#profile-tab").addClass("active");
    $("#interfaz\\.email\\.write").val($("#user_email").html());
    $("#exampleModal").data("informe", informe).data("solicitud", solicitud).modal("show");
}