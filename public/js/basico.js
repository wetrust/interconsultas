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
            tabla += '<td><button class="btn btn-secondary informe mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Informe</button><button class="btn btn-secondary grafico" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Graficas</button></td></tr>';
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
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Teléfono</th><th>Ciudad</th><th>Lugar de control</th><th>Motivo de exámen</th><th>Solicitado</th><th>Accion</th></tr></thead><tbody>';
        //tabla para ver las interconsultas solicitadas
        $.each(data, function(i, value) {
            let fecha = value.solicitud_fecha.split('-');
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_telefono + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + value.solicitud_diagnostico +'</td><td>'+ fecha +'</td>';
            tabla += '<td><button class="btn btn-secondary mr-1" data-id='+ value.solicitud_id + '>Ver</button></td></tr>';
        });

        tabla += '</tbody>';
        $('#tabla\\.resultado').append(tabla);

        $('#tabla\\.resultado tr > td > button').on("click", function(){
            let id =  $(this).data("id");
            var contenedor_id = createCarcasaInterconsultaModal(id);
            createInterconsultaModal(id,contenedor_id);
        });
    }
}

function createCarcasaInterconsultaModal(id){
    var modal_id, div_id;

    modal_id = uuidv4();
    div_id = uuidv4();
    btn_id = uuidv4();

    var footerModal = '</div><div class="modal-footer"><button type="button" class="btn btn-danger" id="'+btn_id+'" data-id="'+id+'" data-modal="'+modal_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Volver</button></div></div></div></div>';
    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="'+modal_id+'"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Interconsulta</h5></div><div class="modal-body"><div class="row" id="'+div_id+'"><div class="progress col-12 my-4"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><strong>CARGANDO</strong></div></div></div>'+ footerModal);

    $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
    $("#"+btn_id).on("click", function(){
        let solicitud_id =  $(this).data("id");
        let modal_id = $(this).data("modal");
        $.get("dashboard/delete/" + solicitud_id).done(function(){loadSolicitadas();});
        $('#'+modal_id).modal("hide");
    });

    return div_id;
}

function createInterconsultaModal(id, contenedor){
    $.get('dashboard/agendar/' + id).done(function(data){
        $('#'+contenedor).empty().append('<input type="hidden" id="ax"><div class="col-4"> <label><small>Nombre del paciente:</small></label> <p id="bx"></p></div><div class="col-4"> <label><small>RUT del paciente:</small></label> <p id="cx"></p></div><div class="col-4"> <label><small>Teléfono materno:</small></label> <p id="dx"></p></div><div class="col-4 form-group"> <label><small>Ciudad procedencia de la paciente</small></label> <p id="kx"></p></div><div class="col-4 form-group"> <label><small>Lugar de control prenatal</small></label> <p id="lx"></p></div><div class="col-4"> <label><small>Fecha de solicitud del exámen:</small></label> <p id="ex"></p></div><div class="col-4"> <label><small>FUM operacional</small></label> <p id="fx"></p></div><div class="col-4"> <label><small>Edad Gestacional (Ege)</small></label> <p id="gx"></p></div><div class="col-4 form-group"> <label><small>Diagnóstico de referencia</small></label> <p id="jx"></p></div><div class="col-4 form-group"> <label><small>Nombre del profesional referente:</small></label> <p id="llx"></p></div><div class="col-4 form-group"> <label><small>Email (de trabajo):</small></label> <p id="mx"></p></div>');
        $("#ax").val(data.solicitud_id);
        $("#bx").html('<strong class="text-primary">'+data.solicitud_nombre+'</strong>');
        $("#cx").html('<strong class="text-primary">'+data.solicitud_rut+'</strong>');
        $("#dx").html('<strong class="text-primary">'+data.solicitud_telefono+'</strong>');
        let fecha = data.solicitud_fecha.split('-');
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        $("#ex").html('<strong class="text-primary">'+fecha+'</strong>');
        fecha = data.solicitud_fum.split('-');
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        $("#fx").html('<strong class="text-primary">'+fecha+'</strong>');
        $("#gx").html('<strong class="text-primary">'+data.solicitud_egestacional+'</strong>');
        $("#jx").html('<strong>'+data.solicitud_diagnostico+'</strong>');
        $("#kx").html('<strong>'+data.solicitud_ciudad+'</strong>');
        $("#lx").html('<strong>'+data.solicitud_lugar+'</strong>');
        $("#llx").html('<strong>'+data.solicitud_nombre_referente+'</strong>');
        $("#mx").html('<strong>'+data.solicitud_profesionalemail+'</strong>');
    });
}

function loadAgendadas(){
    $("#tabla\\.resultado").removeClass("d-none");
    $("#mensaje\\.resultado").removeClass("d-none");
    $("#card\\.header").addClass("d-none");
    $("#formulario\\.solicitud").addClass("d-none");

    $.get('dashboard/agendadas').done(function(data){
        buildAgendadasTable(data);
	});
}

function buildAgendadasTable(data){
    $('#tabla\\.resultado').empty();

    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Teléfono</th><th>Ciudad</th><th>Lugar de control</th><th>Motivo de exámen</th><th>Solicitada</th><th>Agendada</th><th>Accion</th></tr></thead><tbody>';
        //tabla para ver las interconsultas solicitadas
        $.each(data, function(i, value) {
            let fecha = value.solicitud_fecha.split('-');
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];

            let fecha2 = value.evaluacion_fecha.split('-');
            fecha2 = fecha2[2] + "-" + fecha2[1] + "-" + fecha2[0];

            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_telefono + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + value.solicitud_diagnostico +'</td><td>'+ fecha +'</td><td>'+ fecha2 +'</td>';
            tabla += '<td><button class="btn btn-secondary mr-1" data-id='+ value.solicitud_id + '>Ver</button></td></tr>';
        });

        tabla += '</tbody>';
        $('#tabla\\.resultado').append(tabla);

        $('#tabla\\.resultado tr > td > button').on("click", function(){
            let id =  $(this).data("id");
            var contenedor_id = createCarcasaAgendaModal(id);
            createAgendaModal(id,contenedor_id);
        });
    }
}


function createCarcasaAgendaModal(id){
    var modal_id, div_id;

    modal_id = uuidv4();
    div_id = uuidv4();
    btn_id = uuidv4();

    var footerModal = '</div><div class="modal-footer"><button type="button" class="btn btn-danger" id="'+btn_id+'" data-id="'+id+'" data-modal="'+modal_id+'">Cancelar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Volver</button></div></div></div></div>';
    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="'+modal_id+'"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Interconsulta</h5></div><div class="modal-body"><div class="row" id="'+div_id+'"><div class="progress col-12 my-4"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><strong>CARGANDO</strong></div></div></div>'+ footerModal);

    $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
    $("#"+btn_id).on("click", function(){
        let solicitud_id =  $(this).data("id");
        let modal_id = $(this).data("modal");
        $.get("dashboard/delete/" + solicitud_id).done(function(){loadAgendadas();});
        $('#'+modal_id).modal("hide");
    });

    return div_id;
}

function createAgendaModal(id, contenedor){
    $.get('dashboard/veragendadas/' + id).done(function(data){
        $('#'+contenedor).empty().append('<input type="hidden" id="ax"><div class="col-4"> <label><small>Nombre del paciente:</small></label> <p id="bx"></p></div><div class="col-4"> <label><small>RUT del paciente:</small></label> <p id="cx"></p></div><div class="col-4"> <label><small>Teléfono materno:</small></label> <p id="dx"></p></div><div class="col-4 form-group"> <label><small>Ciudad procedencia de la paciente</small></label> <p id="kx"></p></div><div class="col-4 form-group"> <label><small>Lugar de control prenatal</small></label> <p id="lx"></p></div><div class="col-4"> <label><small>Fecha de solicitud del exámen:</small></label> <p id="ex"></p></div><div class="col-4"> <label><small>FUM operacional</small></label> <p id="fx"></p></div><div class="col-4"> <label><small>Edad Gestacional (Ege)</small></label> <p id="gx"></p></div><div class="col-4 form-group"> <label><small>Diagnóstico de referencia</small></label> <p id="jx"></p></div><div class="col-4 form-group"> <label><small>Nombre del profesional referente:</small></label> <p id="llx"></p></div><div class="col-4 form-group"> <label><small>Email (de trabajo):</small></label> <p id="mx"></p></div><div class="col-4 form-group"> <label><small>Fecha agenda:</small></label> <p id="nx"></p></div><div class="col-4 form-group"> <label><small>Comentario:</small></label> <p id="ox"></p></div>');
        $("#ax").val(data.solicitud_id);
        $("#bx").html('<strong class="text-primary">'+data.solicitud_nombre+'</strong>');
        $("#cx").html('<strong class="text-primary">'+data.solicitud_rut+'</strong>');
        $("#dx").html('<strong class="text-primary">'+data.solicitud_telefono+'</strong>');
        let fecha = data.solicitud_fecha.split('-');
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        $("#ex").html('<strong class="text-primary">'+fecha+'</strong>');
        fecha = data.solicitud_fum.split('-');
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        $("#fx").html('<strong class="text-primary">'+fecha+'</strong>');
        $("#gx").html('<strong class="text-primary">'+data.solicitud_egestacional+'</strong>');
        $("#jx").html('<strong>'+data.solicitud_diagnostico+'</strong>');
        $("#kx").html('<strong>'+data.solicitud_ciudad+'</strong>');
        $("#lx").html('<strong>'+data.solicitud_lugar+'</strong>');
        $("#llx").html('<strong>'+data.solicitud_nombre_referente+'</strong>');
        $("#mx").html('<strong>'+data.solicitud_profesionalemail+'</strong>');
        $("#nx").html('<strong>' + data.evaluacion_fecha + '</strong>');
        $("#ox").html('<strong>' + data.evaluacion_comentarios + '</strong>');
    });
}

function callModal(informe, solicitud){
    $("#Mhome").addClass("d-none").removeClass("active show");
    $("#Mprofile").addClass("show active");
    $("#home-tab").addClass("d-none").removeClass("active");
    $("#profile-tab").addClass("active");
    $("#interfaz\\.email\\.write").val($("#user_email").html());
    $("#exampleModal").data("informe", informe).data("solicitud", solicitud).modal("show");
}

//crea id random para los modales
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}