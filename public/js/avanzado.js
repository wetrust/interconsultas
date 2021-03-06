var nombreprofesionalPegar = "";
$(document).ready(function(){
    construir();
    cargarCiudad();
    cargarLugar();
    loadsolicitud();

    $("#interconsultas\\.estado\\.nuevas").html('<input type="radio" value="1" name="interconsultas" checked autocomplete="off">Solicitud de interconsulta');
    
    $('.btn-group-toggle .btn').on("click", function(){
        let valor = parseInt($(this).find('input').val());

        if (valor == 1){
            loadsolicitud();
            $("#filtro\\.activar").removeClass("d-none");
        }else if (valor == 2){
            loadInProcess();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none");
        }else if (valor == 3){
            loadInFinish();
            $("#filtro\\.activar").removeClass("d-none");
        }
    });

    $("#filtro\\.activar").on("click", function(){
        var toggle = $("#filtro\\.contenedor").hasClass("d-none");

        if (toggle){ $("#filtro\\.contenedor").removeClass("d-none");}else{ $("#filtro\\.contenedor").addClass("d-none");}
    });

    $("#filtro\\.accion").on("click", function(){

        let ciudad = $("#filtro\\.ciudad option:selected").val();
        let lugar = $("#filtro\\.lugar option:selected").val();
        let desde = $("#filtro\\.fecha").val();
        let tipo = $("#filtro\\.tipo option:selected").val();

        let args = {
            ciudad: ciudad,
            lugar: lugar,
            desde: desde,
            tipo: tipo
        }
        
        $('#tabla\\.resuelta').empty();

        $.post(_api  + 'filtro_resuelto', args).done(function(data){
            buildFinishTable(data);
        });
    });

    $("#filtro\\.borrar").on("click", function(){
        loadInFinish();
        $("#filtro\\.ciudad").val("");
        $("#filtro\\.lugar").val("");
        $("#filtro\\.fecha").val("");
        $("#filtro\\.fecha\\.hasta").val("");
        $("#filtro\\.tipo").val("");
    });

    $("#tabla\\.correos\\.geniales tr > td").on("click", function(){
        var correo = $(this).data("email");
        $.get(_api + 'interconsultasEmail/' + correo).done(function(data){
            $('#expandir\\.informacion\\.contenedor').empty();
            
            if (Object.keys(data).length > 0) {
                var tabla = '<table class="table table-bordered mt-2"><thead class="thead-dark"><tr><th>#</th><th>Nombre de paciente</th><th>Ciudad</th><th>Fecha</th><th>Tipo de exámen</th><th>Accion</th><th>Eliminar</th></tr></thead><tbody>';

                $.each(data, function(i, value) {
                    let tipo = "";

                    if (value.tipo == "1"){
                        tipo = 'Eco Primer trimestre';
                    } else if (value.tipo == "0"){
                        tipo = 'Eco Doppler crecimiento';
                    } else  if (value.tipo == "2"){
                        tipo = 'Eco 2do / 3cer trimestre';
                    } else  if (value.tipo == "3"){
                        tipo = 'Eco Ginecológica';
                    }

                    let fecha = value.solicitud_fecha.split('-');
                    fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];

                    tabla += '<tr><td>' + value.solicitud_id + '</td><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ fecha +'</td><td>' + tipo +'</td>';
                    tabla += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_';

                    if (value.tipo == "1"){
                        tabla += 'primertrimestre/';
                    } else if (value.tipo == "0"){
                        tabla += 'dopplercrecimiento/';
                    } else  if (value.tipo == "2"){
                        tabla += 'segundotrimestre/';
                    } else  if (value.tipo == "3"){
                        tabla += 'ginecologico/';
                    }

                    tabla += value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
                    tabla += '<td><a class="btn btn-danger" href="' + _URL + 'dashboard/delete/' + value.solicitud_id +'">Eliminar</a></td></tr>';
                });

                tabla += '</tbody></table>';
                $('#expandir\\.informacion\\.contenedor').append(tabla);
            }

            $("#expandir\\.informacion").modal("show");
        });                              
    });

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

    $("#interconsulta\\.enviar").on("click", function(){

		var listo = false;
		//revisar si el usuario lleno todas las cajas
			
		var nombre = String($("#interconsulta\\.nombre").val());
		var rut = String($("#interconsulta\\.rut").val());
		var fecha = String($("#interconsulta\\.fecha").val());
		var eg = String($('input[name=interconsulta_eg]:checked').val());
		var eco = String($('input[name=interconsulta_eco]:checked').val());
		var fum = String($("#interconsulta\\.fum").val());
		var diagnostico = String($("#interconsulta\\.diagnostico").val());
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
			$('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cual es el Motivo de exámen?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
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
				var eLdiagnostico = $("#interconsulta\\.diagnostico").val();

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
		
				$.post("https://administrador.crecimientofetal.cl/api/internal", data).done(function(response){
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

    $("#interconsulta\\.para\\.select").on("click", function(){
		$(this).trigger("change");
	});

	$("#interconsulta\\.para\\.select").on("change", function(){
		let correo = $(this).val();
		let nombre = $("#interconsulta\\.para\\.select option:selected").text();

		$("#interconsulta\\.para\\.nombre").val(nombre);
		$("#interconsulta\\.para").val(correo);
    });
    
    loadProfesionales();

});

function loadsolicitud(){
    $("#tabla\\.resultado").addClass("d-none");
    $("#mensaje\\.resultado").addClass("d-none");
    $("#card\\.header").removeClass("d-none");
    $("#formulario\\.solicitud").removeClass("d-none");
}

function cargarCiudad(){
    $.get(_api + 'ciudades').done(function(data){
        $('#filtro\\.ciudad').empty().append('<option value="">No Seleccionado</option>');
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            $.each(data, function(i, value) {
                response = '<option value="' + value.solicitud_ciudad +'">' + value.solicitud_ciudad +'</option>';
                $('#filtro\\.ciudad').append(response);
            });
        }
    });
}

function construir(){
    $("#mensaje\\.resultado").parent().parent().prepend('<div class="card-header bg-primary" id="card.header"><h4 class="text-white text-center">Formulario de referencia para evaluación ecográfica gineco - Obstétrica</h4><h6 class="text-white text-center">Formulario de libre disposición para profesionales que soliciten exámen ecográfico a ecografistas registrados en la plataforma</h6></div>');
    $("#mensaje\\.resultado").parent().prepend('<div id="formulario.solicitud"> <div class="row"> <div class="col form-group"> <label>Nombre del paciente</label> <input type="text" class="form-control" id="interconsulta.nombre"> </div><div class="col form-group"> <label>RUT del paciente</label> <input type="text" class="form-control" id="interconsulta.rut"> </div><div class="col form-group"> <label>Fecha solicitud del exámen</label> <input type="date" class="form-control" id="interconsulta.fecha"> </div></div><div class="row"> <div class="col form-group"> <label>Ciudad procedencia de la paciente</label> <input type="text" class="form-control" id="interconsulta.ciudad"> </div><div class="col form-group"> <label>Lugar de control prenatal</label> <input type="text" class="form-control" id="interconsulta.lugar"> </div></div><div class="row"> <div class="col form-group"> <label>FUM operacional</label> <input type="date" class="form-control" id="interconsulta.fum"> </div><div class="col form-group"> <label>Edad Gestacional (Ege)</label> <input type="text" class="form-control" id="interconsulta.egestacional" disabled=""> </div><div class="col form-group"> <label>La Ege es conocida precozmente</label> <div> <input type="radio" id="interconsulta.eg.si" value="1" name="interconsulta_eg" class="form-check-input" checked> <label>Si</label> </div><div> <input type="radio" id="interconsulta.eg.no" value="0" name="interconsulta_eg" class="form-check-input"> <label>No</label> </div></div></div><div class="row"> <div class="col form-group"> <label>Alteraciones en gestaciones previas</label> <select class="form-control" id="interconsulta.diagnostico"> <option value="No, es primigesta">No, es primigesta</option> <option value="Si hubo feto pequeño">Si hubo feto pequeño</option> <option value="Si hubo feto grande">Si hubo feto grande</option> <option value="No hay antecedentes">No hay antecedentes</option> <option value="Desconoce información">Desconoce información</option> </select> </div><div class="col-8 form-group"> <label>Motivo de exámen</label> <input type="text" class="form-control" id="interconsulta.diagnostico"> </div></div><div class="row"> <div class="col"> <button class="btn btn-primary" id="interconsulta.enviar">Enviar solicitud de exámen ecográfico</button> </div></div></div>');
	$("input[name='interconsulta_para_nombre']").val($("#user_name").html());
	$("input[name='interconsulta_para']").val($("#user_email").html());
}

function cargarLugar(){
    $.get(_api + 'lugar').done(function(data){
        $('#filtro\\.lugar').empty().append('<option value="">No Seleccionado</option>');
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            $.each(data, function(i, value) {
                response = '<option value="' + value.solicitud_lugar +'">' + value.solicitud_lugar +'</option>';
                $('#filtro\\.lugar').append(response);
            });
        }
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

function loadInProcess(){
    $("#tabla\\.resultado").removeClass("d-none");
    $("#mensaje\\.resultado").removeClass("d-none");
    $("#card\\.header").addClass("d-none");
    $("#formulario\\.solicitud").addClass("d-none");
    $.get('dashboard/process').done(function(data){
        $('#tabla\\.resultado').empty();
        
        if (Object.keys(data).length > 0) {
            $("#mensaje\\.resultado").addClass("d-none");
            var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Motivo de exámen</th><th>Solicitado</th><th>Accion</th></tr></thead><tbody>';
            $.each(data, function(i, value) {
                let fecha = value.solicitud_fecha.split('-');
                fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
                tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + value.solicitud_diagnostico +'</td><td>' + fecha +'</td>';
                tabla += '<td><button class="btn btn-secondary" data-id='+ value.solicitud_id + '>Ver</button></td></tr>';
            });

            tabla += '</tbody>';
            $('#tabla\\.resultado').append(tabla);

            $('#tabla\\.resultado tr > td > button').on("click", function(){
                let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta\\.titulo").html("Datos de la interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty();
                $("#ver\\.interconsulta\\.contenedor").append('<h5 class="my-3 text-primary text-center">Contrarreferencia inicial desde unidad de ultrasonografía gineco-obstétrica</h5><div class="row g-verde mb-0"> <div class="col-6 form-group m-2"> <label class="text-white"><strong>Tipo de exámen solicitado</strong></label> </div><div class="col form-group m-2"> <select class="form-control" name="solicitud_crecimiento" id="interconsulta.respuesta.crecimiento"> <option value="1">1.- Ecografía precoz de urgencia</option><option value="4">2.- Ecografía 11/14 semanas</option> <option value="2">3.- Ecografía 2° / 3° trimestre</option><option value="0" selected>4.- Doppler + Eco. crecimiento</option> <option value="3">5.- Ecografía Ginecológica</option> </select> </div></div><div class="row"> <div class="col-6 form-group bg-secondary mb-2"> <label for="interconsulta.respuesta.fecha"><strong class="text-white">Debe llenar fecha de examen</strong></label> <input type="date" class="form-control" id="interconsulta.respuesta.fecha"> </div><div class="col form-group" id="interconsulta.respuesta.edadgestacional"> <label for="interconsulta.respuesta.eg">Edad gestacional actual</label> <input type="hidden" class="form-control" id="solicitud_id"><input type="hidden" class="form-control" id="interconsulta.fum.copia" value="solicitud_fum"> <input type="text" class="form-control" id="interconsulta.respuesta.eg" disabled=""> <input type="hidden" class="form-control" name="respuesta_eg"> </div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<div id="multiproposito"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino">femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado" selected>aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico</label> <select class="form-control" name="respuesta_liquido"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>BVM (mm)</label> <input type="text" class="form-control" name="respuesta_bvm"> </div><div class="col-4 form-group"> <label> <br>Evaluación de anatomía fetal</label> </div><div class="col-4 form-group"> <label>&nbsp;</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-12 form-group"> <label><strong>A.- Biometría ecográfica:</strong></label> </div></div><div class="row"> <div class="col form-group"> <label>DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col form-group"> <label>CC (mm)</label> <input type="text" class="form-control" name="respuesta_cc"> </div><div class="col form-group"> <label>CA (mm)</label> <input type="text" class="form-control" name="respuesta_ca"> </div><div class="col form-group"> <label>LF (mm)</label> <input type="text" class="form-control" name="respuesta_lf"> </div></div><div class="row"> <div class="col form-group"> <label>Peso fetal estimado</label> <input type="number" class="form-control" name="respuesta_pfe"> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col form-group"> <label>Índice Cc/Ca</label> <input type="text" class="form-control" name="respuesta_ccca" disabled> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_ccca_pct" disabled> </div></div></div><div class="row"> <div class="col-6"> <div class="row"> <div class="col-12"><strong>B.- Flujometría Doppler</strong></div><div class="col-12 form-group"> <label>IP. Uterina derecha</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_uterina_derecha"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_derecha_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Uterinas izquierda</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_uterina_izquierda"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_izquierda_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Promedio uterinas</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_uterinas" disabled> <div class="input-group-prepend"> <div class="input-group-text bg-secondary text-white" id="respuesta_uterinas_percentil"></div></div></div></div></div></div><div class="col-6"> <div class="row"> <div class="col-12"><strong>&nbsp;</strong></div><div class="col-12 form-group"> <label>IP. Arteria umbilical</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_umbilical"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_umbilical_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Cerebral media</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cm"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cm_percentil"> </div></div></div></div><div class="col-12 form-group"> <label>Índice CM / AU</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cmau" disabled> <div class="input-group-prepend"> <div class="input-group-text bg-secondary text-white" id="respuesta_cmau_percentil"> </div></div></div></div></div></div></div><div class="row"> <div class="col-12"> <p><strong>C.- Hipótesis diagnóstica</strong></p></div><div class="col-4 form-group"> <label><strong>Crecimiento fetal</strong></label> <select class="form-control" name="respuesta_hipotesis"> <option value="Disminuido < p3">Disminuido < p3</option> <option value="Disminuido < p10">Disminuido < p10</option> <option value="Normal p10 - p 25">Normal p10 - p 25</option> <option value="Normal p26 - p 75" selected>Normal p26 - p 75</option> <option value="Normal p76 - p90">Normal p76 - p90</option> <option value="Grande >p90">Grande >p90</option> <option value="Grande >p97">Grande >p97</option> </select> </div><div class="col form-group"> <label><strong>Doppler materno</strong></label> <select class="form-control" name="respuesta_doppler_materno"> <option value="no evaluado">No evaluado</option> <option value="Normal (< p95)" selected>Normal (&lt; p95)</option> <option value="Alterado (> p95)">Alterado (&gt; p95)</option> </select> </div><div class="col-5 form-group"> <label><strong>Doppler fetal</strong></label> <select class="form-control" name="respuesta_doppler_fetal" style="font-size: 0.75rem !important;"> <option value="Normal (UMB, ACM, ICP)">Normal (UMB, ACM e ICP)</option> <option value="Alterado, ICP < pct 5">Alterado, ICP &lt; pct 5</option> <option value="Alterado ICP < pct 5 y UMB > pct 95">Alterado ICP &lt; pct 5 y UMB &gt; pct 95</option> <option value="Alterado ccp < pct 5 acm < pct 5">Alterado ICP &lt; pct 5 ACM &lt; pct 5</option> <option value="Alt. ICP < pct 5 y ACM < pct 5 + UMB > p95">Alt. ICP &lt; pct 5 y ACM &lt; pct 5 + UMB &gt; p95</option> </select> </div></div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>D.- Comentarios y observaciones</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');

                $.get('dashboard/agendar/' + solicitud_id).done(function(data){
                    nombreprofesionalPegar = data.solicitud_nombre_referente;
                    $("#solicitud_id").val(data.solicitud_id);
                    $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                    $('#interconsulta\\.fum\\.copia').val(data.solicitud_fum);
                });

                $('#interconsulta\\.respuesta\\.crecimiento').on("change", function(){
                    if ($(this).val() == 4){
                        $("#ginecologica").remove();
                        $("#multiproposito").remove();
                        $("#final").remove();
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="doppleruterinas"> <div class="row"> <div class="col form-group"> <label>Evaluación de anatomía fetal</label> </div><div class="col form-group"><select class="form-control" name="respuesta_anatomia"><option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"><input type="text" class="form-control" name="respuesta_anatomia_extra"></div></div><div class="row"> <div class="col form-group"> <label>Embrión</label><select class="form-control" name="respuesta_embrion"> <option value="no se observa aun">no se observa aun</option> <option value="act. no evidenciabl">act. no evidenciable</option> <option value="act. card. inicial">act. card. inicial</option> <option value="con act. cardiaca (+)" selected>con act. cardiaca (+)</option> <option value="act. card. y corp. (+)">act. card. y corp. (+)</option> <option value="act. card. y corp. (-)">act. card. y corp. (-)</option> </select></div><div class="col form-group"> <label>LCN (mm)</label> <input type="text" class="form-control" name="respuesta_lcn"> </div><div class="col form-group"> <label>Eg. x LCN</label> <input type="text" class="form-control" name="respuesta_lcn_eg" disabled></div><div class="col form-group"> <label>FCF</label> <select name="respuesta_fcf" class="form-control"> <option value="(+) inicial">(+) inicial</option> <option value=" <90">&lt; 90</option> <option value="90">90</option> <option value="91">91</option> <option value="92">92</option> <option value="93">93</option> <option value="94">94</option> <option value="95">95</option> <option value="96">96</option> <option value="97">97</option> <option value="98">98</option> <option value="99">99</option> <option value="100">100</option> <option value="101">101</option> <option value="102">102</option> <option value="103">103</option> <option value="104">104</option> <option value="105">105</option> <option value="106">106</option> <option value="107">107</option> <option value="108">108</option> <option value="109">109</option> <option value="110">110</option> <option value="111">111</option> <option value="112">112</option> <option value="113">113</option> <option value="114">114</option> <option value="115">115</option> <option value="116">116</option> <option value="117">117</option> <option value="118">118</option> <option value="119">119</option> <option value="120">120</option> <option value="121">121</option> <option value="122">122</option> <option value="123">123</option> <option value="124">124</option> <option value="125">125</option> <option value="126">126</option> <option value="127">127</option> <option value="128">128</option> <option value="129">129</option> <option value="130">130</option> <option value="131">131</option> <option value="132">132</option> <option value="133">133</option> <option value="134">134</option> <option value="135">135</option> <option value="136">136</option> <option value="137">137</option> <option value="138">138</option> <option value="139">139</option> <option value="140" selected="">140</option> <option value="141">141</option> <option value="142">142</option> <option value="143">143</option> <option value="144">144</option> <option value="145">145</option> <option value="146">146</option> <option value="147">147</option> <option value="148">148</option> <option value="149">149</option> <option value="150">150</option> <option value="151">151</option> <option value="152">152</option> <option value="153">153</option> <option value="154">154</option> <option value="155">155</option> <option value="156">156</option> <option value="157">157</option> <option value="158">158</option> <option value="159">159</option> <option value="160">160</option> <option value="161">161</option> <option value="162">162</option> <option value="163">163</option> <option value="164">164</option> <option value="165">165</option> <option value="166">166</option> <option value="167">167</option> <option value="168">168</option> <option value="169">169</option> <option value="170">170</option> <option value=" > 170">&gt; 170</option> </select> </div></div><div class="row"> <div class="col-12"><strong>Flujometría Doppler</strong></div><div class="col form-group"> <label>IP. Uterina Derecha</label> <input type="text" class="form-control" name="respuesta_uterina_derecha"> </div><div class="col form-group"> <label>&nbsp;<br>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_uterina_derecha_percentil" disabled> </div></div><div class="col form-group"> <label>IP. Uterina Izquierda</label><input type="text" class="form-control" name="respuesta_uterina_izquierda"> </div><div class="col form-group"> <label>&nbsp;<br>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_uterina_izquierda_percentil" disabled> </div></div><div class="col form-group"> <label>IP. Promedio uterinas</label> <input type="text" class="form-control" name="respuesta_uterinas" disabled> </div><div class="col form-group"> <label>&nbsp;<br>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_uterinas_promedio" disabled> </div></div></div><div class="row"> <div class="col-12"><strong>Tamizaje cromosomopatía</strong></div><div class="col-4 form-group"><label>Translucidez Nucal</label> <select class="form-control" name="respuesta_dbp"> <option value="no procede">No procede</option> <option value="no medible">No medible</option> <option value="medible" selected>Medible</option> </select> </div><div class="col-4 form-group"><div id="translucencia"><label>mm</label> <input class="form-control" name="respuesta_translucencia_nucal"></div></div></div><div class="row"><div class="col-4 form-group"><label>Hueso Nasal</label> <select class="form-control" name="respuesta_cc"> <option value="no procede" selected="">No procede</option> <option value="no visible">No visible</option> <option value="visible">Visible</option> </select> </div><div class="col-4 form-group"><label>Ductus venoso</label> <select class="form-control" name="respuesta_ca"> <option value="no evaluado" selected="">No evaluado</option> <option value="normal">Normal</option> <option value="onda a ausente">Onda A ausente</option> <option value="onda a negativa">Onda A negativa</option> </select> </div><div class="col-4 form-group"><label>Reflujo tricuspídeo</label> <select class="form-control" name="respuesta_lf"> <option value="no evaluado" selected="">No evaluado</option> <option value="normal">Normal</option> <option value="alteracion leve">Alteracion leve</option> <option value="onda anormal">Onda anormal</option> </select> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios y observaciones</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);

                        $("select[name='respuesta_dbp']").on("change", function(){
                            if ($(this).val() == "medible"){
                                $("#translucencia").removeClass("d-none");
                            }
                            else{
                                $("#translucencia").addClass("d-none");
                            }
                        });

                        $("input[name='respuesta_uterina_derecha']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();

                            eg = String(eg);
                            eg = eg.replace("semanas", "");

                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("input[name='respuesta_uterina_derecha_percentil_view']").val(pctUtAdvanced(eg,ut));
                                $("input[name='respuesta_uterina_derecha_percentil']").val(pctUtAdvanced(eg,ut));

                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_izquierda']").val() > 0){
                                        var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_izquierda']").val())) / 2;
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                                    }
                                }
                            }
                        });

                        $("input[name='respuesta_uterina_izquierda']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();

                            eg = String(eg);
                            eg = eg.replace("semanas", "");

                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("input[name='respuesta_uterina_izquierda_percentil_view']").val(pctUtAdvanced(eg,ut));
                                $("input[name='respuesta_uterina_izquierda_percentil']").val(pctUtAdvanced(eg,ut));
                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_derecha']").val() > 0){
                                        var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_derecha']").val())) / 2;
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                                    }
                                }
                            }
                        });

                        $("input[name='respuesta_uterinas']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();

                            eg = String(eg);
                            eg = eg.replace("semanas", "");

                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_uterinas_promedio']").val(pctUtAdvanced(eg,ut));
                            }
                        });

                        $("input[name='respuesta_lcn']").on("change", function(){
                            eglcn();
                        });

                        $("select[name='respuesta_anatomia']").on("change", function(){
                            if ($(this).val() == "hallazgos ecográficos compatibles con:"){
                                $("#interconsulta\\.respuesta\\.anatomia").removeClass("d-none");
                            }
                            else{
                                $("#interconsulta\\.respuesta\\.anatomia").addClass("d-none");
                            }
                        }); 
                    }
                    else if ($(this).val() == 3){
                        $("#doppleruterinas").remove();
                        $("#multiproposito").remove();
                        $("#final").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="ginecologica"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Útero</label> <input type="text" class="form-control" name="respuesta_utero_ginecologica"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Endometrio</label> <input type="text" class="form-control" name="respuesta_endometrio"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Izquierdo</label> <input type="text" class="form-control" name="respuesta_anexo_izquierdo_ginecologica"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Derecho</label> <input type="text" class="form-control" name="respuesta_anexo_derecho_ginecologica"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ovario Izquierdo</label> <input type="text" class="form-control" name="respuesta_ovario_izquierdo"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ovario Derecho</label> <input type="text" class="form-control" name="respuesta_ovario_derecho"> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista">Douglas</label> <input type="text" class="form-control" name="respuesta_douglas_ginecologica"> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios y observaciones</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("#interconsulta\\.respuesta\\.edadgestacional").addClass("d-none");
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#editable").attr("rows", 3);
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                    }
                    else if ($(this).val() == 2){
                        $("#doppleruterinas").remove();
                        $("#final").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="segundotrimestre"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso_segundo"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino">femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado" selected>aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico</label> <select class="form-control" name="respuesta_liquido_amniotico"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>BVM (mm)</label> <input type="text" class="form-control" name="respuesta_bvm"> </div><div class="col-4 form-group"> <label> <br>Evaluación de anatomía fetal</label> </div><div class="col-4 form-group"> <label>&nbsp;</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-12"> <p><strong>Biometrías</strong></p></div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col form-group"> <label>DOF (mm)</label> <input type="text" class="form-control" name="respuesta_dof"> </div><div class="col form-group"> <label>CC (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cc"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cc_pct"></div></div></div></div></div><div class="row"> <div class="col form-group"> <label>CA (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_ca"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ca_pct"></div></div></div></div><div class="col form-group"> <label>LF (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lf"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lf_pct"></div></div></div></div></div><div class="row"> <div class="col-4 py-3 form-group"> <label>Opcionales para estimación tardia de la edad gestacional</label> </div><div class="col-4 form-group"> <label>LH (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lh"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lh_pct"></div></div></div></div><div class="col-4 form-group"> <label>Cerebelo (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cerebelo"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cerebelo_pct"></div></div></div></div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Peso fetal estimado</label> <input type="text" class="form-control" name="respuesta_pfe" disabled> </div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col form-group"> <label>Índice Cc / Ca</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_ccca" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ccca_pct"></div></div></div></div><div class="col form-group"> <label>IC (DBP/DOF) [70%-86%]</label> <input type="text" class="form-control" name="respuesta_ic" disabled> </div></div><div class="row"> <div class="col form-group"> <label><strong>Hipótesis diagnóstica</strong></label> <input type="text" class="form-control" name="respuesta_hipotesis"> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios y observaciones</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("#multiproposito").remove();
                        $("#ginecologica").remove();
                        $("#interconsulta\\.respuesta\\.edadgestacional").removeClass("d-none");
                        $("#primertrimestre").remove();
                        $("#editable").attr("rows", 3);
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);

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
                        });

                        $("input[name='respuesta_bvm']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_dbp']").focus();
                            }
                        });

                        $("input[name='respuesta_dbp']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_dof']").focus();
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
                                $("input[name='respuesta_ic']").val(ICAdvanced(dbp, dof));
                                $("input[name='respuesta_cc']").val(valCC(dof,dbp)).trigger("change");
                            }
                            else{
                                $("input[name='respuesta_ic']").val(0);
                                $("input[name='respuesta_cc']").val(0).trigger("change");
                            }
                        });

                        $("input[name='respuesta_dof']").keypress(function( event ) {
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
                        });

                        $("input[name='respuesta_ca']").keypress(function( event ) {
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
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_pfe_pct']").val(pctpfeAdvanced(eg,pfe));
                            }
                        });

                        $("input[name='respuesta_ccca']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ccca = $("input[name='respuesta_ccca']").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_ccca_pct").html("Pct. " + pctcccaAdvanced(eg,ccca));
                            }
                        });

                        $("input[name='respuesta_cc']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var cc = $("input[name='respuesta_cc']").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_cc_pct").html("Pct. " + pctccAdvanced(eg,cc));
                            }
                        });

                        $("input[name='respuesta_ca']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ca = $("input[name='respuesta_ca']").val();

                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_ca_pct").html("Pct. " + pctcaAdvanced(eg,ca));
                            }
                        });

                        $("input[name='respuesta_lf']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var lf = $("input[name='respuesta_lf']").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_lf_pct").html("Pct. " + pctlfAdvanced(eg,lf));
                            }
                            psohdlk();
                        });

                        $("input[name='respuesta_lh']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var lh = $("input[name='respuesta_lh']").val();

                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("#respuesta_lh_pct").html("Pct. " + pctlhAdvanced(eg,lh));
                            }
                        });

                        $("input[name='respuesta_cerebelo']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var cerebelo = $("input[name='respuesta_cerebelo']").val();

                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("#respuesta_cerebelo_pct").html("Pct. " + pctcerebeloAdvanced(eg,cerebelo));
                            }
                        });
                    }
                    else if ($(this).val() == 1){
                        $("#final").remove();
                        $("#doppleruterinas").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="primertrimestre"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">útero</label> <select class="form-control" name="respuesta_utero_primertrimestre"> <option value="central anterior" selected>central anterior</option> <option value="central posterior">central posterior</option> <option value="lateralizado a la Izquierda">lateralizado a la Izquierda</option> <option value="lateralizado a la Derecha">lateralizado a la Derecha</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Saco gestacional</label> <select class="form-control" name="respuesta_saco_gestacional"> <option value="normal" selected>normal</option> <option value="no se observa">no se observa</option> <option value="multiple">multiple</option> <option value="con pseudosaco">con pseudosaco</option> <option value="con dpmto. parcial">con dpmto. parcial</option> </select> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Embrión</label> <select class="form-control" name="respuesta_embrion"> <option value="no se observa aun">no se observa aun</option> <option value="act. no evidenciabl">act. no evidenciable</option> <option value="act. card. inicial">act. card. inicial</option> <option value="con act. cardiaca (+)" selected>con act. cardiaca (+)</option> <option value="act. card. y corp. (+)">act. card. y corp. (+)</option> <option value="act. card. y corp. (-)">act. card. y corp. (-)</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">LCN</label> <input type="text" class="form-control" name="respuesta_lcn"> </div><div class="col-3 form-group"> <label for="interconsulta.respuesta.ecografista">Eg. x LCN</label> <input type="text" class="form-control" name="respuesta_lcn_eg" disabled></div></div><div class="row"> <div class="col form-group"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">FUR Operacional</label> <input type="text" class="form-control" name="respuesta_furop" disabled> </div><div class="col-3 form-group"> <label for="interconsulta.respuesta.ecografista">FPP actualizada</label> <input type="text" class="form-control" name="respuesta_fppactualizada" disabled> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Izquierdo</label> <select class="form-control" name="respuesta_anexo_izquierdo_primertrimestre"> <option value="aspecto normal" selected>aspecto normal</option> <option value="masa solida">masa solida</option> <option value="masa eco negativa">masa eco negativa</option> <option value="con ovario">con ovario</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Derecho</label> <select class="form-control" name="respuesta_anexo_derecho_primertrimestre"> <option value="aspecto normal" selected>aspecto normal</option> <option value="masa solida">masa solida</option> <option value="masa eco negativa">masa eco negativa</option> <option value="con ovario">con ovario</option> </select> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista">Douglas</label> <select class="form-control" name="respuesta_douglas_primertrimestre"> <option value="libre" selected>libre</option> <option value="ocupado">ocupado</option> </select> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios y observaciones</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("input[name='respuesta_lcn']").on("change", function(){eglcn();});
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                        $("#segundotrimestre").remove();
                        $("#multiproposito").remove();
                        $("#ginecologica").remove();
                        $("#interconsulta\\.respuesta\\.edadgestacional").removeClass("d-none");
                        $("#editable").attr("rows", 3);
                    }
                    else{
                        $("#doppleruterinas").remove();
                        $("#final").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="multiproposito"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino">femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado" selected>aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico</label> <select class="form-control" name="respuesta_liquido"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>BVM (mm)</label> <input type="text" class="form-control" name="respuesta_bvm"> </div><div class="col-4 form-group"> <label> <br>Evaluación de anatomía fetal</label> </div><div class="col-4 form-group"> <label>&nbsp;</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-12 form-group"> <label><strong>A.- Biometría ecográfica:</strong></label> </div></div><div class="row"> <div class="col form-group"> <label>DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col form-group"> <label>CC (mm)</label> <input type="text" class="form-control" name="respuesta_cc"> </div><div class="col form-group"> <label>CA (mm)</label> <input type="text" class="form-control" name="respuesta_ca"> </div><div class="col form-group"> <label>LF (mm)</label> <input type="text" class="form-control" name="respuesta_lf"> </div></div><div class="row"> <div class="col form-group"> <label>Peso fetal estimado</label> <input type="number" class="form-control" name="respuesta_pfe"> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col form-group"> <label>Índice Cc/Ca</label> <input type="text" class="form-control" name="respuesta_ccca" disabled> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_ccca_pct" disabled> </div></div></div><div class="row"> <div class="col-6"> <div class="row"> <div class="col-12"><strong>B.- Flujometría Doppler</strong></div><div class="col-12 form-group"> <label>IP. Uterina derecha</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_uterina_derecha"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_derecha_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Uterinas izquierda</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_uterina_izquierda"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_izquierda_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Promedio uterinas</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_uterinas" disabled> <div class="input-group-prepend"> <div class="input-group-text bg-secondary text-white" id="respuesta_uterinas_percentil"></div></div></div></div></div></div><div class="col-6"> <div class="row"> <div class="col-12"><strong>&nbsp;</strong></div><div class="col-12 form-group"> <label>IP. Arteria umbilical</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_umbilical"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_umbilical_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Cerebral media</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cm"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cm_percentil"> </div></div></div></div><div class="col-12 form-group"> <label>Índice CM / AU</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cmau" disabled> <div class="input-group-prepend"> <div class="input-group-text bg-secondary text-white" id="respuesta_cmau_percentil"> </div></div></div></div></div></div></div><div class="row"> <div class="col-12"> <p><strong>C.- Hipótesis diagnóstica</strong></p></div><div class="col-4 form-group"> <label><strong>Crecimiento fetal</strong></label> <select class="form-control" name="respuesta_hipotesis"> <option value="Disminuido < p3">Disminuido < p3</option> <option value="Disminuido < p10">Disminuido < p10</option> <option value="Normal p10 - p 25">Normal p10 - p 25</option> <option value="Normal p26 - p 75" selected>Normal p26 - p 75</option> <option value="Normal p76 - p90">Normal p76 - p90</option> <option value="Grande >p90">Grande >p90</option> <option value="Grande >p97">Grande >p97</option> </select> </div><div class="col form-group"> <label><strong>Doppler materno</strong></label> <select class="form-control" name="respuesta_doppler_materno"> <option value="no evaluado">No evaluado</option> <option value="Normal (< p95)" selected>Normal (&lt; p95)</option> <option value="Alterado (> p95)">Alterado (&gt; p95)</option> </select> </div><div class="col-5 form-group"> <label><strong>Doppler fetal</strong></label> <select class="form-control" name="respuesta_doppler_fetal" style="font-size: 0.75rem !important;"> <option value="Normal (UMB, ACM, ICP)">Normal (UMB, ACM e ICP)</option> <option value="Alterado, ICP < pct 5">Alterado, ICP &lt; pct 5</option> <option value="Alterado ICP < pct 5 y UMB > pct 95">Alterado ICP &lt; pct 5 y UMB &gt; pct 95</option> <option value="Alterado ccp < pct 5 acm < pct 5">Alterado ICP &lt; pct 5 ACM &lt; pct 5</option> <option value="Alt. ICP < pct 5 y ACM < pct 5 + UMB > p95">Alt. ICP &lt; pct 5 y ACM &lt; pct 5 + UMB &gt; p95</option> </select> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios y observaciones</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("#ginecologica").remove();
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#interconsulta\\.respuesta\\.edadgestacional").removeClass("d-none");
                        $("#editable").attr("rows", 3);
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);

                        $("input[name='respuesta_bvm']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_dbp']").focus();
                            }
                        });

                        $("input[name='respuesta_uterina_derecha']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();

                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("#respuesta_uterina_derecha_percentil").html("Pct. " + pctUtAdvanced(eg,ut));
        
                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_izquierda']").val() > 0){
                                        var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_izquierda']").val())) / 2;
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                                    }
                                }
                            }
                        });

                        $("input[name='respuesta_uterina_derecha']").keypress(function( event ) {
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
                                eg = parseFloat(eg).toFixed();
                                $("#respuesta_uterina_izquierda_percentil").html("Pct. " + pctUtAdvanced(eg,ut));
        
                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_derecha']").val() > 0){
                                        var promedio = (parseFloat($("input[name='respuesta_uterina_derecha']").val()) + parseFloat(ut)) / 2;
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                                    }
                                }
                            }
                        });

                        $("input[name='respuesta_uterina_izquierda']").keypress(function( event ) {
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
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_uterinas_percentil").html("Pct. " + pctUtAdvanced(eg,ut));
                            }
                        })
            
                        $("input[name='respuesta_pfe']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var pfe = $("input[name='respuesta_pfe']").val();

                            eg = String(eg);
                            eg = eg.replace("semanas", "");

                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_pfe_pct']").val(pctpfeAdvanced(eg,pfe));
            
                            }
                        });

                        $("input[name='respuesta_dbp']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_cc']").focus();
                            }
                        });

                        $("input[name='respuesta_cc']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        });

                        $("input[name='respuesta_cc']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_ca']").focus();
                            }
                        });

                        $("input[name='respuesta_ca']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        });

                        $("input[name='respuesta_ca']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_lf']").focus();
                            }
                        });

                        $("input[name='respuesta_lf']").on("change", function(){
                            psohdlk();
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
                                eg =  parseFloat(eg).toFixed();
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
                                eg =  parseFloat(eg).toFixed();
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
                                eg =  parseFloat(eg).toFixed();
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
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_cmau_percentil").html("Pct. " + pctcmauAdvanced(eg,cmau));
                            }
                        });
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

                $("input[name='respuesta_uterina_derecha']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var ut = $(this).val();

                    eg = String(eg);
                    eg = eg.replace("semanas", "");

                    if (eg.length > 0){
                        eg = parseFloat(eg).toFixed();
                        $("#respuesta_uterina_derecha_percentil").html("Pct. " + pctUtAdvanced(eg,ut));

                        if (ut > 0){
                            if ($("input[name='respuesta_uterina_izquierda']").val() > 0){
                                var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_izquierda']").val())) / 2;
                                $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                            }
                        }
                    }
                });
                
                $("input[name='respuesta_bvm']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_dbp']").focus();
                    }
                });

                $("input[name='respuesta_uterina_derecha']").keypress(function( event ) {
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
                        eg = parseFloat(eg).toFixed();
                        $("#respuesta_uterina_izquierda_percentil").html("Pct. " + pctUtAdvanced(eg,ut));

                        if (ut > 0){
                            if ($("input[name='respuesta_uterina_derecha']").val() > 0){
                                var promedio = (parseFloat($("input[name='respuesta_uterina_derecha']").val()) + parseFloat(ut)) / 2;
                                $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                            }
                        }
                    }
                });

                $("input[name='respuesta_uterina_izquierda']").keypress(function( event ) {
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
                        eg = parseFloat(eg).toFixed();
                        $("#respuesta_uterinas_percentil").html("Pct. " + pctUtAdvanced(eg,ut));
                    }
                })

                $("input[name='respuesta_pfe']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var pfe = $("input[name='respuesta_pfe']").val();

                    eg = String(eg);
                    eg = eg.replace("semanas", "");

                    if (eg.length > 0){
                        eg =  parseFloat(eg).toFixed();
                        $("input[name='respuesta_pfe_pct']").val(pctpfeAdvanced(eg,pfe));

                    }
                });

                $("input[name='respuesta_cm']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var acm = $("input[name='respuesta_cm']").val();

                    eg = String(eg);
                    eg = eg.replace("semanas", "");

                    if (eg.length > 0){
                        eg =  parseFloat(eg).toFixed();
                        $("#respuesta_cm_percentil").html("Pct. " + pctacmAdvanced(eg,acm));

                    }
                    if (acm > 0){
                        if ($("input[name='respuesta_umbilical']").val() > 0){
                            var ccp = (acm / $("input[name='respuesta_umbilical']").val());
                            $("input[name='respuesta_cmau']").val(ccp.toFixed(2)).trigger("change");
                        }
                    }
                });

                $("input[name='respuesta_dbp']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_cc']").focus();
                    }
                });
                
                $("input[name='respuesta_cc']").on("change", function(){
                    psohdlk();
                    calCCCA();
                });

                $("input[name='respuesta_cc']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_ca']").focus();
                    }
                });

                $("input[name='respuesta_ca']").on("change", function(){
                    psohdlk();
                    calCCCA();
                });

                $("input[name='respuesta_ca']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_lf']").focus();
                    }
                });

                $("input[name='respuesta_lf']").on("change", function(){
                    psohdlk();
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
                        eg =  parseFloat(eg).toFixed();
                        $("input[name='respuesta_ccca_pct']").val(pctcccaAdvanced(eg,ccca));
                    }
                });

                $("input[name='respuesta_umbilical']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var aumb = $("input[name='respuesta_umbilical']").val();

                    eg = String(eg);
                    eg = eg.replace("semanas", "");

                    if (eg.length > 0){
                        eg =  parseFloat(eg).toFixed();
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
                        eg =  parseFloat(eg).toFixed();
                        $("#respuesta_cmau_percentil").html("Pct. " + pctcmauAdvanced(eg,cmau));
                    }
                });

                $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button class="btn btn-primary" id="enviar.respuesta.botton">Enviar respuesta</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
                $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                    let solicitud_id =  $(this).data("id");
                    $.get("dashboard/delete/" + solicitud_id).done(function(){
                        loadInProcess();
                    });
                    $("#ver\\.interconsulta").modal("hide");
                });

                $("#enviar\\.respuesta\\.botton").on("click", function(){
                    var tipoExm = $('#interconsulta\\.respuesta\\.crecimiento').val();
                    var respuestaFecha = $("#interconsulta\\.respuesta\\.fecha").val();

                    if (respuestaFecha.length < 3){
                        $('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>Primero debe señalar cual es la fecha del exámen, de lo contrario es imposible calcular medidas</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
                        $('#cautivo\\.dialogo').modal("show");
                        $('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
                            $(this).remove();
                        });
                        return;
                    }

                    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><img src="https://crecimientofetal.cl/img/emoji.png" class="d-block mx-auto imng-fluid"><h3 class="text-danger text-center">ESTAMOS ENVIANDO SU RESPUESTA</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
                    $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
                        $('#mensaje\\.dialogo').modal("hide");
                        $(this).remove();
                    });

                    var args = "";

                    if (tipoExm == 4){
                        args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: respuestaFecha,
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
                            respuesta_anatomia: $('select[name="respuesta_anatomia"]').val(),
                            respuesta_anatomia_extra: $('input[name="respuesta_anatomia_extra"]').val(),
                            respuesta_embrion: $('select[name="respuesta_embrion"]').val(),
                            respuesta_lcn: $('input[name="respuesta_lcn"]').val(),
                            respuesta_lcn_eg: $('input[name="respuesta_lcn_eg"]').val(),
                            respuesta_fcf: $('select[name="respuesta_fcf"]').val(),
                            respuesta_cc: $('select[name="respuesta_cc"]').val(),
                            respuesta_ca: $('select[name="respuesta_ca"]').val(),
                            respuesta_lf: $('select[name="respuesta_lf"]').val(),
                            respuesta_dbp: $('select[name="respuesta_dbp"]').val(),
                            respuesta_translucencia_nucal: $('input[name="respuesta_translucencia_nucal"]').val(),
                            respuesta_uterina_derecha: $('input[name="respuesta_uterina_derecha"]').val(),
                            respuesta_uterina_derecha_percentil: $('input[name="respuesta_uterina_derecha_percentil"]').val(),
                            respuesta_uterina_izquierda: $('input[name="respuesta_uterina_izquierda"]').val(),
                            respuesta_uterina_izquierda_percentil: $('input[name="respuesta_uterina_izquierda_percentil"]').val(),
                            respuesta_uterinas: $('input[name="respuesta_uterinas"]').val(),
                            respuesta_uterinas_percentil: $('input[name="respuesta_uterinas_promedio"]').html(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val()
                        }

                        args.respuesta_uterinas_percentil = args.respuesta_uterinas_percentil.replace("Pct. ", "");
                    }
                    else if (tipoExm == 3){
                        args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_utero_ginecologica: $('input[name="respuesta_utero_ginecologica"]').val(),
                            respuesta_anexo_izquierdo_ginecologica: $('input[name="respuesta_anexo_izquierdo_ginecologica"]').val(),
                            respuesta_anexo_derecho_ginecologica: $('input[name="respuesta_anexo_derecho_ginecologica"]').val(),
                            respuesta_ovario_izquierdo: $('input[name="respuesta_ovario_izquierdo"]').val(),
                            respuesta_ovario_derecho: $('input[name="respuesta_ovario_derecho"]').val(),
                            respuesta_douglas_ginecologica: $('input[name="respuesta_douglas_ginecologica"]').val(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_endometrio: $('input[name="respuesta_endometrio"]').val()
                        }
                    }
                    else if (tipoExm == 2){
                        args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
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
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_dof: $('input[name="respuesta_dof"]').val(),
                            respuesta_ic: $('input[name="respuesta_ic"]').val(),
                            respuesta_bvm: $('input[name="respuesta_bvm"]').val(),
                            respuesta_lh: $('input[name="respuesta_lh"]').val(),
                            respuesta_lh_pct: $('#respuesta_lh_pct').html(),
                            respuesta_cerebelo: $('input[name="respuesta_cerebelo"]').val(),
                            respuesta_cerebelo_pct: $('#respuesta_cerebelo_pct').html(),
                            respuesta_sexo_fetal: $('select[name="respuesta_sexo_fetal"]').val()
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
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
                            respuesta_utero_primertrimestre: $('select[name="respuesta_utero_primertrimestre"]').val(),
                            respuesta_saco_gestacional: $('select[name="respuesta_saco_gestacional"]').val(),
                            respuesta_embrion: $('select[name="respuesta_embrion"]').val(),
                            respuesta_lcn: $('input[name="respuesta_lcn"]').val(),
                            respuesta_lcn_eg: $('input[name="respuesta_lcn_eg"]').val(),
                            respuesta_anexo_izquierdo_primertrimestre: $('select[name="respuesta_anexo_izquierdo_primertrimestre"]').val(),
                            respuesta_anexo_derecho_primertrimestre: $('select[name="respuesta_anexo_derecho_primertrimestre"]').val(),
                            respuesta_douglas_primertrimestre: $('select[name="respuesta_douglas_primertrimestre"]').val(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                        }
                    }
                    else{
                        args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
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
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_bvm: $('input[name="respuesta_bvm"]').val(),
                            respuesta_ccca: $('input[name="respuesta_ccca"]').val(),
                            respuesta_ccca_pct: $('input[name="respuesta_ccca_pct"]').val(),
                            respuesta_sexo_fetal: $('select[name="respuesta_sexo_fetal"]').val(),
                        }

                        args.respuesta_uterina_derecha_percentil = args.respuesta_uterina_derecha_percentil.replace("Pct. ", "");
                        args.respuesta_uterina_izquierda_percentil = args.respuesta_uterina_izquierda_percentil.replace("Pct. ", "");
                        args.respuesta_uterinas_percentil = args.respuesta_uterinas_percentil.replace("Pct. ", "");
                        args.respuesta_ccca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
                        args.respuesta_cmau_percentil = args.respuesta_cmau_percentil.replace("Pct. ", "");
                        args.respuesta_umbilical_percentil = args.respuesta_umbilical_percentil.replace("Pct. ", "");
                        args.respuesta_cm_percentil = args.respuesta_cm_percentil.replace("Pct. ", "");
                    }

                    $.post('dashboard/save', args).done(function(data){
                        $("#ver\\.interconsulta").modal("hide");
                        $("#interconsultas\\.estado\\.finalizadas").button('toggle').trigger("click");
                        $('#mensaje\\.dialogo').modal("hide");
                        $('#mensaje\\.dialogo').remove();
                    });
                });
            });
        }
        else{
            $("#mensaje\\.resultado").removeClass("d-none");
            $("#mensaje\\.resultado").html("No tienes interconsultas en espera");
        }
    });
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
        var tabla = '<thead class="thead-dark"><tr><th>RUT</th><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Tipo de exámen</th><th>Realizado</th><th>Accion</th></tr></thead><tbody>';

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

            tabla += '<tr><td>' + value.solicitud_rut + '</td><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + tipo +'</td><td>'+ fecha +'</td>';

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
            $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-primary" id="ver.interconsulta.enviar" data-id="'+solicitud_id+'" data-informe="'+ tipo +'">Enviar informe por correo</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar exámen</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
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

function psohdlk() {
    var CC = 0;
    var CA = 0;
    var LF = 0;

    if (parseInt($("input[name='respuesta_cc']").val()) < 0){
        $("input[name='respuesta_pfe']").val(0).trigger("change");
        return;
    }

    if (parseInt($("input[name='respuesta_ca']").val()) < 0){
        $("input[name='respuesta_pfe']").val(0).trigger("change");
        return;
    }

    if (parseInt($("input[name='respuesta_lf']").val()) < 0){
        $("input[name='respuesta_lf']").val(0).trigger("change");
        return;
    }

    CC = parseInt($("input[name='respuesta_cc']").val());
    CA = parseInt($("input[name='respuesta_ca']").val());
    LF = parseInt($("input[name='respuesta_lf']").val());

    CC = CC / 10;
    CA = CA / 10;
    LF = LF / 10;

    //var psoP = Math.pow(10, (1.182 + 0.00273 * CC + 0.007057 * CA - 0.0000063 * Math.pow(CA, 2) - 0.000002184 * CC * CA));
    
    var psoP = Math.pow(10, (1.326 + 0.0107 * CC + 0.0438 * CA + 0.158 * LF - 0.00326 * CA * LF));

    if (isNaN(psoP) != true) {
        $("input[name='respuesta_pfe']").val(psoP.toFixed(0)).trigger("change");
    }
    else{
        $("input[name='respuesta_pfe']").val(0).trigger("change");
    }
}

function calCCCA(){
    var CC = 0;
    var CA = 0;

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

    lcn = lcn.toString();
    lcn = lcn.replace(',', '.');
    lcn = parseFloat(lcn);

    if (isNaN(lcn) != true) {
        var ValLCN1 = lcn / 10;

        for (i = 1; i <= 63; i++) {
            if (LCN[0][i] >= ValLCN1) {
                var eglcn = LCN[1][i];
                i = 63;
            }
        }
        var FechaA = new Date($("#interconsulta\\.respuesta\\.fecha").val());
        var eglcN = eglcn.toString().split('.');

        if (eglcN.length == 1){
            eglcN = parseInt(eglcN[0]) * 7;
        }else if (eglcN.length == 2){
            eglcN = (parseInt(eglcN[0]) * 7) + parseInt(eglcN[1]);
        }

        FechaA.setDate(FechaA.getDate() - eglcN);

        $("input[name='respuesta_furop']").val(FechaA.getDate() + "-" +(FechaA.getMonth() +1) + "-" + FechaA.getFullYear());
        FechaA.setDate(FechaA.getDate() + 240);
        $("input[name='respuesta_fppactualizada']").val(FechaA.getDate() + "-" +(FechaA.getMonth() +1) + "-" + FechaA.getFullYear());

        $("input[name='respuesta_lcn_eg']").val(eglcn);
    } 
    else {
        $("input[name='respuesta_lcn_eg']").val(0);
    }
};

function pctcccaAdvanced(eg, ccca) {
    var pct3 = [];
    var pct97 = [];

    pct3[0] = 1.1; pct3[1] = 1.09; pct3[2] = 1.08; pct3[3] = 1.07;
    pct3[4] = 1.06; pct3[5] = 1.06; pct3[6] = 1.05; pct3[7] = 1.04;
    pct3[8] = 1.03; pct3[9] = 1.02; pct3[10] = 1.01; pct3[11] = 1;
    pct3[12] = 1; pct3[13] = 0.99; pct3[14] = 0.98; pct3[15] = 0.97;
    pct3[16] = 0.96; pct3[17] = 0.95; pct3[18] = 0.95; pct3[19] = 0.94;
    pct3[20] = 0.93; pct3[21] = 0.92; pct3[22] = 0.91; pct3[23] = 0.9;
    pct3[24] = 0.89; pct3[25] = 0.89;

    pct97[0] = 1.29; pct97[1] = 1.28; pct97[2] = 1.27; pct97[3] = 1.26;
    pct97[4] = 1.25; pct97[5] = 1.24; pct97[6] = 1.24; pct97[7] = 1.23;
    pct97[8] = 1.22; pct97[9] = 1.21; pct97[10] = 1.2; pct97[11] = 1.19;
    pct97[12] = 1.18; pct97[13] = 1.18; pct97[14] = 1.17; pct97[15] = 1.17;
    pct97[16] = 1.16; pct97[17] = 1.15; pct97[18] = 1.14; pct97[19] = 1.13;
    pct97[20] = 1.12; pct97[21] = 1.11; pct97[22] = 1.1; pct97[23] = 1.09;
    pct97[24] = 1.08; pct97[25] = 1.08;

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
        var uno = pct97[eg] - pct3[eg];
        var dos = ccca - pct3[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {
            return '> 99';
        } 
        else if (resultado < 1) {
            return '< 1';
        } 
        else {
            return resultado;
        }
    }
}

function pctcaAdvanced(eg, ca) {
    var pct3 = [];
    var pct97 = [];

    pct3[12] = 42;  pct3[13] = 52;  pct3[14] = 64
    pct3[15] = 75;  pct3[16] = 86;  pct3[17] = 97
    pct3[18] = 109; pct3[19] = 119; pct3[20] = 131
    pct3[21] = 141; pct3[22] = 151; pct3[23] = 161
    pct3[24] = 171; pct3[25] = 181; pct3[26] = 191
    pct3[27] = 200; pct3[28] = 209; pct3[29] = 218
    pct3[30] = 227; pct3[31] = 236; pct3[32] = 245
    pct3[33] = 253; pct3[34] = 261; pct3[35] = 269
    pct3[36] = 277; pct3[37] = 285; pct3[38] = 292
    pct3[39] = 299; pct3[40] = 307; pct3[41] = 313
    pct3[42] = 320

    pct97[12] = 71;  pct97[13] = 79;  pct97[14] = 92
    pct97[15] = 102; pct97[16] = 113; pct97[17] = 127
    pct97[18] = 141; pct97[19] = 155; pct97[20] = 170
    pct97[21] = 183; pct97[22] = 192; pct97[23] = 209
    pct97[24] = 223; pct97[25] = 235; pct97[26] = 248
    pct97[27] = 260; pct97[28] = 271; pct97[29] = 284
    pct97[30] = 295; pct97[31] = 306; pct97[32] = 318
    pct97[33] = 329; pct97[34] = 339; pct97[35] = 349
    pct97[36] = 359; pct97[37] = 370; pct97[38] = 380
    pct97[39] = 389; pct97[40] = 399; pct97[41] = 409
    pct97[42] = 418

    if (eg < 12) {
        return 0;
    } 
    else if (eg > 40)
    {
        return 0;
    } 
    else {
        eg = parseInt(eg);
        var uno = pct97[eg] - pct3[eg];
        var dos = ca - pct3[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {
            return '> 99';
        } 
        else if (resultado < 1) {
            return '< 1';
        } 
        else {
            return resultado;
        }
    }
}


function pctccAdvanced(eg, cc) {
    var pct3 = [];
    var pct97 = [];

    pct3[12] = 64;  pct3[13] = 74;  pct3[14] = 88
    pct3[15] = 100; pct3[16] = 113; pct3[17] = 126
    pct3[18] = 137; pct3[19] = 149; pct3[20] = 161
    pct3[21] = 172; pct3[22] = 183; pct3[23] = 194
    pct3[24] = 204; pct3[25] = 214; pct3[26] = 224
    pct3[27] = 233; pct3[28] = 242; pct3[29] = 250
    pct3[30] = 258; pct3[31] = 267; pct3[32] = 274
    pct3[33] = 280; pct3[34] = 287; pct3[35] = 293
    pct3[36] = 299; pct3[37] = 303; pct3[38] = 308
    pct3[39] = 311; pct3[40] = 315; pct3[41] = 318
    pct3[42] = 322
        
    pct97[12] = 81;  pct97[13] = 94;  pct97[14] = 106
    pct97[15] = 120; pct97[16] = 135; pct97[17] = 150
    pct97[18] = 165; pct97[19] = 179; pct97[20] = 193
    pct97[21] = 206; pct97[22] = 219; pct97[23] = 232
    pct97[24] = 243; pct97[25] = 256; pct97[26] = 268
    pct97[27] = 279; pct97[28] = 290; pct97[29] = 300
    pct97[30] = 310; pct97[31] = 319; pct97[32] = 328
    pct97[33] = 336; pct97[34] = 343; pct97[35] = 351
    pct97[36] = 358; pct97[37] = 363; pct97[38] = 368
    pct97[39] = 373; pct97[40] = 377; pct97[41] = 382
    pct97[42] = 387

    if (eg < 12) {
        return 0;
    } 
    else if (eg > 40)
    {
        return 0;
    } 
    else {
        eg = parseInt(eg);
        var uno = pct97[eg] - pct3[eg];
        var dos = cc - pct3[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {
            return '> 99';
        } 
        else if (resultado < 1) {
            return '< 1';
        } 
        else {
            return resultado;
        }
    }
}

function pctlfAdvanced(eg, lf) {
    var pct3 = [];
    var pct97 = [];

    pct3[12] = 7;  pct3[13] = 9;  pct3[14] = 12
    pct3[15] = 15; pct3[16] = 17; pct3[17] = 21
    pct3[18] = 23; pct3[19] = 26; pct3[20] = 28
    pct3[21] = 30; pct3[22] = 33; pct3[23] = 35
    pct3[24] = 38; pct3[25] = 40; pct3[26] = 42
    pct3[27] = 44; pct3[28] = 46; pct3[29] = 48
    pct3[30] = 50; pct3[31] = 52; pct3[32] = 53
    pct3[33] = 55; pct3[34] = 57; pct3[35] = 59
    pct3[36] = 60; pct3[37] = 62; pct3[38] = 64
    pct3[39] = 65; pct3[40] = 66; pct3[41] = 68
    pct3[42] = 69
        
    pct97[12] = 12; pct97[13] = 14; pct97[14] = 17
    pct97[15] = 20; pct97[16] = 23; pct97[17] = 27
    pct97[18] = 31; pct97[19] = 34; pct97[20] = 38
    pct97[21] = 40; pct97[22] = 43; pct97[23] = 47
    pct97[24] = 50; pct97[25] = 52; pct97[26] = 56
    pct97[27] = 58; pct97[28] = 62; pct97[29] = 64
    pct97[30] = 66; pct97[31] = 68; pct97[32] = 71
    pct97[33] = 73; pct97[34] = 75; pct97[35] = 78
    pct97[36] = 80; pct97[37] = 82; pct97[38] = 84
    pct97[39] = 86; pct97[40] = 88; pct97[41] = 90
    pct97[42] = 92

    if (eg < 12) {
        return 0;
    } 
    else if (eg > 40)
    {
        return 0;
    } 
    else {
        eg = parseInt(eg);
        var uno = pct97[eg] - pct3[eg];
        var dos = lf - pct3[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 3);
        if (resultado > 99) {
            return '> 99';
        }
        else if (resultado < 1) {
            return '< 1';
        }
        else {
            return resultado;
        }
    }
}


function ICAdvanced(dbp, dof) {
    if (dbp > 0) {
        if (dof > 0) {
          let valor = ((dbp / dof) * 100);
          return valor.toFixed(0) + "%";
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

function pctlhAdvanced(eg, lh) {

    var pct05 = [];
    var pct95 = [];
   
    pct05[12] = 4.8;   pct95[12] = 12.3;    pct05[13] = 7.6;   pct95[13] = 15.1;
    pct05[14] = 10.3;  pct95[14] = 17.9;    pct05[15] = 13.1;  pct95[15] = 20.7;
    pct05[16] = 15.8;  pct95[16] = 23.5;    pct05[17] = 18.5;  pct95[17] = 26.3;
    pct05[18] = 21.2;  pct95[18] = 29.1;    pct05[19] = 23.8;  pct95[19] = 31.6;
    pct05[20] = 26.3;  pct95[20] = 34.2;    pct05[21] = 28.8;  pct95[21] = 36.7;
    pct05[22] = 31.2;  pct95[22] = 39.2;    pct05[23] = 33.5;  pct95[23] = 41.6;
    pct05[24] = 35.7;  pct95[24] = 43.9;    pct05[25] = 37.9;  pct95[25] = 46.1;
    pct05[26] = 39.9;  pct95[26] = 48.1;    pct05[27] = 41.9;  pct95[27] = 50.1;
    pct05[28] = 43.7;  pct95[28] = 52.1;    pct05[29] = 45.5;  pct95[29] = 53.9;
    pct05[30] = 47.2;  pct95[30] = 55.6;    pct05[31] = 48.9;  pct95[31] = 57.3;
    pct05[32] = 50.4;  pct95[32] = 58.9;    pct05[33] = 52.1;  pct95[33] = 60.5;
    pct05[34] = 53.4;  pct95[34] = 62.1;    pct05[35] = 54.8;  pct95[35] = 63.5;
    pct05[36] = 56.2;  pct95[36] = 64.9;    pct05[37] = 57.6;  pct95[37] = 66.4;
    pct05[38] = 59.8;  pct95[38] = 67.8;    pct05[39] = 60.4;  pct95[39] = 69.3;
    pct05[40] = 61.9;  pct95[40] = 70.8;
    
    if (eg < 12) {
        return 0;
    } 
    else if (eg > 40)
    {
        return 0;
    } 
    else {
        eg = parseInt(eg);
        var uno = pct95[eg] - pct05[eg];
        var dos = lh - pct05[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 5);
        if (resultado > 99) {
            return '> 99';
        }
        else if (resultado < 1) {
            return '< 1';
        }
        else {
            return resultado;
        }
    }
}

function pctcerebeloAdvanced(eg,cerebelo) {

    //cerebelo segun Hill
    var pct2ds = [];
    var pctmedia = [];
    var pct2dsmas = [];

    pct2ds[0] = 12;pct2ds[1] = 14;pct2ds[2] = 15;pct2ds[3] = 16;pct2ds[4] = 17;pct2ds[5] = 18;
    pct2ds[6] = 19;pct2ds[7] = 20;pct2ds[8] = 21;pct2ds[9] = 22;pct2ds[10] = 24;
    pct2ds[11] = 26;pct2ds[12] = 27;pct2ds[13] = 29;pct2ds[14] = 30;pct2ds[15] = 31;
    pct2ds[16] = 33;pct2ds[17] = 36;pct2ds[18] = 37;pct2ds[19] = 38;pct2ds[20] = 40;
    pct2ds[21] = 40;pct2ds[22] = 40;pct2ds[23] = 41;pct2ds[24] = 42;pct2ds[25] = 44;
    
    pctmedia[0] = 15;pctmedia[1] = 16;pctmedia[2] = 17;pctmedia[3] = 18;pctmedia[4] = 20;
    pctmedia[5] = 20;pctmedia[6] = 22;pctmedia[7] = 23;pctmedia[8] = 24;pctmedia[9] = 26;
    pctmedia[10] = 28;pctmedia[11] = 30;pctmedia[12] = 31;pctmedia[13] = 33;pctmedia[14] = 34;
    pctmedia[15] = 37;pctmedia[16] = 39;pctmedia[17] = 41;pctmedia[18] = 43;pctmedia[19] = 46;
    pctmedia[20] = 47;pctmedia[21] = 49;pctmedia[22] = 51;pctmedia[23] = 51;pctmedia[24] = 52;
    pctmedia[25] = 52

    pct2dsmas[0] = 18;pct2dsmas[1] = 18;pct2dsmas[2] = 19;pct2dsmas[3] = 20;pct2dsmas[4] = 22;
    pct2dsmas[5] = 23;pct2dsmas[6] = 25;pct2dsmas[7] = 26;pct2dsmas[8] = 27;pct2dsmas[9] = 30;
    pct2dsmas[10] = 32;pct2dsmas[11] = 34;pct2dsmas[12] = 34;pct2dsmas[13] = 37;pct2dsmas[14] = 38;
    pct2dsmas[15] = 41;pct2dsmas[16] = 43;pct2dsmas[17] = 46;pct2dsmas[18] = 48;pct2dsmas[19] = 53;
    pct2dsmas[20] = 56;pct2dsmas[21] = 58;pct2dsmas[22] = 60;pct2dsmas[23] = 62;pct2dsmas[24] = 62;
    pct2dsmas[25] = 62;

    if (eg < 15) {
        return 0;
    } 
    else if (eg > 40)
    {
        return 0;
    } 
    else {
        eg = parseInt(eg) - 15;
        var uno = pct2dsmas[eg] - pct2ds[eg];
        var dos = cerebelo - pct2ds[eg];
        var resultado = parseInt(95 / (uno) * (dos) + 5);
        if (resultado > 99) {
            return '> 99';
        }
        else if (resultado < 1) {
            return '< 1';
        }
        else {
            return resultado;
        }
    }
};

function valCC(dof,dbp){
    var delta = parseFloat(1.60);
    return Math.round((parseInt(dof) + parseInt(dbp)) * delta);
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