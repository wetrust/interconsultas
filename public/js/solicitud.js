$(document).ready(function(){
	if (a == 4){
		$("#div\\.a").addClass("d-none");
		$("#div\\.b").addClass("d-none");
		$("#div\\.c").addClass("d-none");
	}else {
		loadContrarreferentes();
	}

	$("#q").val($("#user_name").html());
	$("#r").val($("#user_email").html());

	$('#b').rut({
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
	
    $("#d").on("change", function(){
		var FExamen, FUM, EdadGestacional;
		var undia = 1000 * 60 * 60 * 24;
		var unasemana = undia * 7;

		FUM = $("#d").val();
		FExamen = $("#e").val();

		FUM = new Date (FUM);
		FExamen = new Date (FExamen);

		EdadGestacional = ((FExamen.getTime() - FUM.getTime()) / unasemana).toFixed(1);

		if (FExamen.getTime() < FUM.getTime()) {
			$('#f').val("0 semanas");
		}
		else if (((FExamen.getTime() - FUM.getTime()) / unasemana) > 42) {
			$('#f').val("42 semanas");
		}
		else {
			$('#f').val(Math.floor(EdadGestacional) + "." + Math.round((EdadGestacional - Math.floor(EdadGestacional))*7) + " semanas");
		}
    });

	$("#k").on("keyup", function(e){
		if ( e.which == 13 ) {
			e.preventDefault();
			$("#l").focus();
		}

		var A = $("#k").val();
		var B = $("#l").val();

		if (A != ""){ A = parseInt(A); }
		if (B != ""){ B = parseInt(B); }

		if (Number.isInteger(A) && Number.isInteger(B)){
			$("#ll").val(Math.trunc((parseInt(A)+parseInt(B))/2));
		}else{
			$("#ll").val(0);
		}
	});

	$("#l").on("keyup", function(e){
		if ( e.which == 13 ) {
			e.preventDefault();
			$("#m").focus();
		}
		var A = $("#k").val();
		var B = $("#l").val();

		if (A != ""){ A = parseInt(A); }
		if (B != ""){ B = parseInt(B); }

		if (Number.isInteger(A) && Number.isInteger(B)){
			$("#ll").val(Math.trunc((parseInt(A)+parseInt(B))/2));
		}else{
			$("#ll").val(0);
		}
	});

	$("#m").on("keyup", function(e){
		if ( e.which == 13 ) {
			e.preventDefault();
			$("#n").focus();
		}
		var A = $("#m").val();
		var B = $("#n").val();

		if (A != ""){ A = parseInt(A); }
		if (B != ""){ B = parseInt(B); }

		if (Number.isInteger(A) && Number.isInteger(B)){
			var valor = ((B / (Math.pow(A, 2))) * 10000);
			$("#o").val(valor.toFixed(1));
		}else{
			$("#o").val(0);
		}
	});

	$("#n").on("keyup", function(e){
		if ( e.which == 13 ) {
			e.preventDefault();
			$("#p").focus();
		}
		var A = $("#m").val();
		var B = $("#n").val();

		if (A != ""){ A = parseInt(A); }
		if (B != ""){ B = parseInt(B); }

		if (Number.isInteger(A) && Number.isInteger(B)){
			var valor = ((B / (Math.pow(A, 2))) * 10000);
			$("#o").val(valor.toFixed(1));
		}else{
			$("#o").val(0);
		}
	});


    $("#s").on("click", function(){
		$(this).trigger("change");
	}).on("change", function(){
		let correo = $(this).val();
		$("#t").val(correo);
	});

    $("#u").on("click", function(){
		var listo = false;
		//revisar si el usuario lleno todas las cajas
		var nombre = String($("#a").val()); //es obligatoria
		var rut = String($("#b").val()); //es obligatoria
		var telefono = String($("#c").val()); //es obligatoria
		var fum = String($("#d").val()); //es obligatoria
		var fecha = String($("#e").val());
		var eg = String($('#f').val()); //es obligatoria
		var edadMaterna = String($('#g').val()); //es obligatoria
		var ciudad = String($("#h").val()); //es obligatoria
		var lugar = String($("#i").val()); //es obligatoria
		var diagnostico = String($("#j").val()); //es obligatoria

		var sistolica = $("#k").val();
		var diastolica = String($("#l").val());
		var media = String($("#ll").val());
		var talla = String($("#m").val());
		var peso = String($("#n").val());
		var imc = String($("#o").val());
		var antecedentes = String($("#p").val());
		var nombreReferente = String($("#q").val());
		var correoReferente = String($("#r").val());
		var nombreContrarreferente = String($("#s option:selected").text());
		var correoContrarreferente = String($("#t").val());


        var baseModal = '<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
        var footerModal = '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>';
		
		if (nombre.length < 3 || rut.length < 4 || telefono.length < 6 || fum.length < 4 || fecha.length < 4 || eg.length < 1 || ciudad.length < 2 || lugar.length  < 3 || diagnostico.length  < 3 || nombreReferente.length < 3 || correoReferente.length < 2){
			var mensaje = "";

            if (nombre.length < 3){
                mensaje = textos.paciente_name_error;
            }else if (rut.length < 4){
				mensaje = textos.paciente_rut_error;
			}else if (telefono.length < 6){
				mensaje = textos.telefono_error;
			}else if (fum.length < 4){
                mensaje = textos.fur_error;
			}else if (fecha.length < 4){
                mensaje = textos.form_error;
            }else if (eg.length < 1){
                mensaje = textos.eg_error;
			}else if (ciudad.length < 2){
                mensaje = textos.procedencia_error;
            }else if (lugar.length  < 3){
				mensaje = textos.lugar_control_error;
			}else if (diagnostico.length  < 3){
                mensaje = textos.diagnostico_referencia_error;
            }else if (nombreReferente.length < 3){
                mensaje = textos.nombreReferente;
            }else if (correoReferente.length < 2){
                mensaje = textos.correoReferente;
			}
			
            $('body').append(baseModal + '<h5 class="modal-title">' + textos.form_error+ '</h5></div><div class="modal-body"><p>'+ mensaje +'</p>'+ footerModal);
            $('#cautivo\\.dialogo').modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
            return;
		}else if (a == 4 && nombreContrarreferente.length < 5 || correoContrarreferente.length < 5){
			var mensaje = "";

            if (nombreContrarreferente.length < 3){
                mensaje = textos.nombreContrarreferente;
            }else if (correoContrarreferente.length < 4){
				mensaje = textos.correoContrarreferente;
			}

            $('body').append(baseModal + '<h5 class="modal-title">' + textos.form_error+ '</h5></div><div class="modal-body"><p>'+ mensaje +'</p>'+ footerModal);
            $('#cautivo\\.dialogo').modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
            return;
		}else{
			listo = true;
		}

		if (listo == true){
			$('#v').prop("disabled", true);

			var data = {};

			if (a == 4){
				data = {
					nombre: nombre,
					rut: rut,
					telefono: telefono,
					fum: fum,
					fecha: fecha,
					eg: eg,
					edadMaterna: edadMaterna,
					ciudad: ciudad,
					lugar: lugar,
					diagnostico: diagnostico,
					sistolica: sistolica,
					diastolica: diastolica,
					sistolica: sistolica,
					diastolica: diastolica,
					media: media,
					talla: talla,
					peso: peso,
					imc: imc,
					antecedentes: antecedentes,
					nombreReferente: nombreReferente,
					correoReferente: correoReferente,
					nombreContrarreferente: nombreContrarreferente,
					correoContrarreferente: correoContrarreferente
				};
			}else{
				data = {
					nombre: nombre,
					rut: rut,
					telefono: telefono,
					fum: fum,
					fecha: fecha,
					eg: eg,
					edadMaterna: edadMaterna,
					ciudad: ciudad,
					lugar: lugar,
					diagnostico: diagnostico,
					sistolica: sistolica,
					diastolica: diastolica,
					sistolica: sistolica,
					diastolica: diastolica,
					media: media,
					talla: talla,
					peso: peso,
					imc: imc,
					antecedentes: antecedentes,
					nombreReferente: nombreReferente,
					correoReferente: correoReferente
				};
			}

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
					resetFecha("#d");
					resetFecha("#e");
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
				loadContrarreferentes();
			});
		}
    });
	
	resetFecha("#d");
	resetFecha("#e");
});

function loadSolicitud(){
    $("#tabla\\.resultado").addClass("d-none");
    $("#mensaje\\.resultado").addClass("d-none");
    $("#card\\.header").removeClass("d-none");
    $("#formulario\\.solicitud").removeClass("d-none");
}

function resetFecha(element){
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear()+"-"+(month)+"-"+(day);
	$(element).val(today);
}

function loadContrarreferentes(){
	$.get("api/profesionales").done(function(data){
		$("#s").empty();
		var contador = 0;
		$.each(data, function(element, value){
			let option = "";
			if (contador == 0){
				option = '<option value="'+value.user_email+'" selected>'+value.user_name+'</option>';
				contador++;
			}else{
				option = '<option value="'+value.user_email+'">'+value.user_name+'</option>';
			}
			$("#s").append(option);
		});
	});
	$("#s").trigger("change");
}