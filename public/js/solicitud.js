$(document).ready(function(){
    construir();

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
	}).on("change", function(){
		let correo = $(this).val();
		let nombre = $("#interconsulta\\.para\\.select option:selected").text();

		$("#interconsulta\\.para\\.nombre").val(nombre);
		$("#interconsulta\\.para").val(correo);
	});

    $("#interconsulta\\.enviar").on("click", function(){
		var listo = false;
		//revisar si el usuario lleno todas las cajas
		var nombre = String($("#interconsulta\\.nombre").val());
		var rut = String($("#interconsulta\\.rut").val());
		var fecha = String($("#interconsulta\\.fecha").val());
		var telefono = String($("#interconsulta\\.telefono").val());
		var eg = String($('input[name=interconsulta_eg]:checked').val());
		var alteraciones = $("#interconsulta\\.alteraciones").val();
		var fum = String($("#interconsulta\\.fum").val());
		var diagnostico = String($("#interconsulta\\.diagnostico").val());
		var lugar = String($("#interconsulta\\.lugar").val());
		var ciudad = String($("#interconsulta\\.ciudad").val());
		var egestacional = String($("#interconsulta\\.egestacional").val());
		var para = String($("#interconsulta\\.para").val());
		var nombre_para = String($("#interconsulta\\.para\\.nombre").val());

        var baseModal = '<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
        var footerModal = '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>';
        
        if (nombre.length < 3 || rut.length < 4 || telefono.length < 6 || fecha.length < 4 || eg == 'undefined' || eg.length < 1 || fum.length < 4 || diagnostico.length  < 3 || ciudad.length < 2 || lugar.length  < 3 || egestacional.length < 3 || nombre_para.length < 2 || para.length < 5){
            var mensaje = "";

            if (nombre.length < 3){
                mensaje = textos.paciente_name_error;
            }else if (rut.length < 4){
				mensaje = textos.paciente_rut_error;
			}else if (telefono.length < 6){
                mensaje = textos.telefono_error;
            }else if (fecha.length < 4){
                mensaje = textos.form_error;
            }else if (eg == 'undefined' || eg.length < 1){
                mensaje = textos.eg_error;
            }else if (fum.length < 4){
                mensaje = textos.fur_error;
            }else if (diagnostico.length  < 3){
                mensaje = textos.diagnostico_referencia_error;
            }else if (ciudad.length < 2){
                mensaje = textos.procedencia_error;
            }else if (lugar.length  < 3){
                mensaje = textos.lugar_control_error;
            }else if (egestacional.length < 3){
                mensaje = textos.fechas_error;
            }else if (nombre_para.length < 2){
                mensaje = textos.referente_error;
            }else if (para.length < 5){
                mensaje = textos.contrarreferente_error;
            }
            $('body').append(baseModal + '<h5 class="modal-title">' + textos.form_error+'</h5></div><div class="modal-body"><p>'+ mensaje+'</p>'+ footerModal);
            $('#cautivo\\.dialogo').modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
            return;
        } else{ listo = true;}

		if (listo == true){
			$('#interconsulta\\.enviar').prop("disabled", true);
			var eLdiagnostico = $("#interconsulta\\.diagnostico").val();

			var data = {
				nombre: $("#interconsulta\\.nombre").val(),
				rut: $("#interconsulta\\.rut").val(),
				telefono: $("#interconsulta\\.telefono").val(),
				fecha: $("#interconsulta\\.fecha").val(),
				eg: $('input[name=interconsulta_eg]:checked').val(),
				alteraciones: alteraciones,
				fum: $("#interconsulta\\.fum").val(),
				diagnostico: eLdiagnostico,
				lugar: $("#interconsulta\\.lugar").val(),
				ciudad: $("#interconsulta\\.ciudad").val(),
				egestacional: $("#interconsulta\\.egestacional").val(),
				para: $("#interconsulta\\.para").val(),
				nombre_para: $("#interconsulta\\.para\\.nombre").val()
			};
			$('body').append(baseModal + textos.form_send + '</h5></div><div class="modal-body"><p>Enviando solicitud de interconsulta, por favor espere</p><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
		
			$.post("https://administrador.crecimientofetal.cl/api/send", data).done(function(response){
				if (response.result == false){
					$('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">ERROR</h5></div><div class="modal-body"><p>Usted NO puede solicitar interconsulta para este profesional</p>'+ footerModal);
				}
				else if (response.result == true){
					$('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Información</h5></div><div class="modal-body"><p>Su Solicitud de interconsulta ha sido enviada correctamente</p>'+ footerModal);
					$("#interconsulta\\.nombre").val("");
					$("#interconsulta\\.rut").val("");
					$("#interconsulta\\.telefono").val("");
					var now = new Date();
					var day = ("0" + now.getDate()).slice(-2);
					var month = ("0" + (now.getMonth() + 1)).slice(-2);
					var today = now.getFullYear()+"-"+(month)+"-"+(day);
					$("#interconsulta\\.fecha").val(today);
					$("#interconsulta\\.eg\\.no").attr("checked", true);
					$("#interconsulta\\.eco\\.no").attr("checked", true);
					$("#interconsulta\\.fum").val(today).trigger("change");
					$("#interconsulta\\.alteraciones").val(0);
					$("#interconsulta\\.diagnostico").val("");
					$("#interconsulta\\.lugar").val("");
					$("#interconsulta\\.ciudad").val("");
				}
                $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
                    $('#cautivo\\.dialogo').modal("hide").remove();
                    $(this).remove();
                    $('#interconsulta\\.enviar').prop("disabled", false);
                });
			});
		}
    });
    
	loadContrarreferentes();
	
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
	$("#interconsulta\\.fecha").val(today);
});

function construir(){
    $("#mensaje\\.resultado").parent().parent().prepend('<div class="card-header bg-secondary" id="card.header"><h4 class="text-white text-center">Formulario de referencia para evaluación ecográfica gineco - Obstétrica</h4></div>');
    $("#mensaje\\.resultado").parent().prepend('<div id="formulario.solicitud"> <div class="row"> <div class="col form-group"> <label>Nombre del paciente</label> <input type="text" class="form-control" id="interconsulta.nombre"> </div><div class="col form-group"> <label>RUT del paciente</label> <input type="text" class="form-control" id="interconsulta.rut"> </div><div class="col form-group"> <label>Teléfono materno</label> <input type="number" class="form-control" id="interconsulta.telefono"> </div></div><div class="row"> <div class="col form-group"> <label>Ciudad procedencia de la paciente</label> <input type="text" class="form-control" id="interconsulta.ciudad"> </div><div class="col form-group"> <label>Lugar de control prenatal</label> <input type="text" class="form-control" id="interconsulta.lugar"> </div><div class="col form-group"> <label>Fecha de solicitud del exámen</label> <input type="date" class="form-control" id="interconsulta.fecha"> </div></div><div class="row"> <div class="col form-group"> <label>FUM operacional</label> <input type="date" class="form-control" id="interconsulta.fum"> </div><div class="col form-group"> <label>Edad Gestacional (Ege)</label> <input type="text" class="form-control" id="interconsulta.egestacional" disabled=""> </div><div class="col form-group"> <label class="d-block">La Ege es conocida precozmente</label> <div class="form-check form-check-inline"> <input type="radio" id="interconsulta.eg.si" value="1" name="interconsulta_eg" class="form-check-input" checked> <label class="form-check-label">Si</label> </div><div class="form-check form-check-inline"> <input type="radio" id="interconsulta.eg.no" value="0" name="interconsulta_eg" class="form-check-input"> <label class="form-check-label">No</label> </div></div></div><div class="row"> <div class="col form-group"> <label>Alteraciones en gestaciones previas</label> <select class="form-control" id="interconsulta.alteraciones"> <option value="0">No, es primigesta</option> <option value="1">Si hubo feto pequeño</option> <option value="2">Si hubo feto grande</option> <option value="3">No hay antecedentes</option> <option value="4">Desconoce información</option> </select> </div><div class="col-8 form-group"> <label>Diagnóstico de referencia</label> <input type="text" class="form-control" id="interconsulta.diagnostico"> </div></div><h5>Datos profesional referente a exámen ecográfico</h5> <div class="row"> <div class="col form-group"> <label>Nombre del profesional</label> <input type="text" class="form-control" name="interconsulta_para_nombre" disabled> </div><div class="col form-group"> <label>Email (profesional referente)</label> <input type="email" class="form-control" name="interconsulta_para" disabled> </div></div><div class="row"> <div class="col form-group"> <label><strong>Seleccione profesional de contrareferencia</strong></label> <select class="form-control" id="interconsulta.para.select"> </select> </div><div class="col form-group"> <label>Nombre del profesional</label> <input type="text" class="form-control" id="interconsulta.para.nombre" disabled> </div><div class="col form-group"> <label>Email (profesional de contrareferencia)</label> <input type="email" class="form-control" id="interconsulta.para" disabled> </div></div><div class="row"> <div class="col"> <button class="btn btn-primary" id="interconsulta.enviar">Enviar solicitud de exámen ecográfico</button> </div></div></div>');
	$("input[name='interconsulta_para_nombre']").val($("#user_name").html());
	$("input[name='interconsulta_para']").val($("#user_email").html());
	$('#interconsulta\\.rut').rut({
        fn_error : function(input){
            $(input).removeClass("is-valid").addClass("is-invalid");
            input.closest('.rut-container').find('span').remove();
            input.closest('.rut-container').append('<span class="invalid-feedback">Rut incorrecto</span>');
        },
        fn_validado : function(input){
            $(input).removeClass("is-invalid").addClass("is-valid");
            input.closest('.rut-container').find('span').remove();
            input.closest('.rut-container').append('<span class="valid-feedback">Rut correcto</span>');
        },
        placeholder: false
    });
}

function loadSolicitud(){
    $("#tabla\\.resultado").addClass("d-none");
    $("#mensaje\\.resultado").addClass("d-none");
    $("#card\\.header").removeClass("d-none");
    $("#formulario\\.solicitud").removeClass("d-none");
}