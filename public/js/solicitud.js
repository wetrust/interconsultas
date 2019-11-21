$(document).ready(function(){
	if (a == 4){
		$("#div\\.a").addClass("d-none");
		$("#div\\.c").addClass("d-none");
	}else {
		loadContrarreferentes();
	}

	loadLugares();
	loadCiudadesSolicitud();

	$("#r").val($("#user_name").html());
	$("#s").val($("#user_email").html());

	$('#b').rut({
        fn_error : function(input){
            $(input).removeClass("is-valid").addClass("is-invalid");
            input.closest('.rut-container').find('strong').remove();
            input.closest('.rut-container').append('<strong class="invalid-feedback">N° de Rut Incorrecto</strong>');
        },
        fn_validado : function(input){
            $(input).removeClass("is-invalid").addClass("is-valid");
            input.closest('.rut-container').find('strong').remove();
            input.closest('.rut-container').append('<strong class="valid-feedback">N° de Rut Correcto</strong>');
        },
        placeholder: false
	});

	$('#b').on("blur", function(){
		$.get("api/getPaciente/"+this.value).done(function(data){
			if (data.return !== false){
				$('#a').val(data.return.nombre);
				$('#y').val(data.return.apellido);
				$('#c').val(data.return.telefono);
				$('#d').val(data.return.fum).trigger("change");
				$('#h').val(data.return.ciudad);
				$('#i').val(data.return.lugar);
			}
		})
    }).on("keyup", function(e){
		if ( e.which == 13 ) {
			e.preventDefault();
			this.blur();
			rut = this.value;

			$.get("api/getPaciente/"+rut).done(function(data){
				if (data.return !== false){
					$('#a').val(data.return.nombre);
					$('#y').val(data.return.apellido);
					$('#c').val(data.return.telefono);
					$('#d').val(data.return.fum).trigger("change");
					$('#h').val(data.return.ciudad);
					$('#i').val(data.return.lugar);
				}
			})
		}
	});
	
    $("#d, #e").on("change", function(){
		let fum = new Date(); 
        fum.setTime(Date.parse(document.getElementById("d").value));
        fum = fum.getTime();
        let fee = new Date();
        fee.setTime(Date.parse(document.getElementById("e").value));
        fee = fee.getTime();

        //la fecha de exámen no puede ser anterior a la fecha de última regla
        let diff = fee - fum;

        if (diff > 0){
            let dias = diff/(1000*60*60*24);
            let semanas = Math.trunc(dias / 7);

            dias = Math.trunc(dias - (semanas * 7));

            document.getElementById("f").value = semanas;
            document.getElementById("x").value = dias;
        }
        else{
            document.getElementById("f").value = 0;
            document.getElementById("x").value = 0;
        }
	});
	
	$("#f, #x").on("change", function(){
        let semanas = parseInt(document.getElementById("f").value);
        let dias = parseInt(document.getElementById("x").value);

        semanas = 7 * semanas;

		let fee = new Date(document.getElementById("e").value);
		dias = (semanas + dias-1)*(1000*60*60*24);
        fee.setTime(fee.getTime() - dias);

        document.getElementById("d").value = getDate(fee);
        $("#d").trigger("change");
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
			A = parseInt(A) / 3;
			B = parseInt(B) / 3;
			$("#ll").val(Math.trunc((B * 2) + (A)));
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
			A = parseInt(A) / 3;
			B = parseInt(B) / 3;
			$("#ll").val(Math.trunc((B * 2) + (A)));
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

	$("#w").on("change", function(){
		let value = $(this).val();
		if (value == ""){
			$("#j").val("");
			$("#j").removeClass("d-none");
		}else{
			$("#j").val("");
			$("#j").addClass("d-none");
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


    $("#t").on("click", function(){
		$(this).trigger("change");
	}).on("change", function(){
		let correo = $(this).val();
		$("#u").val(correo);
	});

    $("#v").on("click", function(){
		var listo = false;
		//revisar si el usuario lleno todas las cajas
		var nombre = String($("#a").val()); //es obligatoria
		var apellido = String($("#y").val()); //es obligatoria
		var rut = String($("#b").val()); //es obligatoria
		var telefono = String($("#c").val()); //es obligatoria
		var fum = String($("#d").val()); //es obligatoria
		var fecha = String($("#e").val());
		var eg = String($('#f').val() + "." + $('#x').val() + " semanas"); //es obligatoria
		var edadMaterna = String($('#g').val()); //es obligatoria
		var ciudad = String($("#h option:selected").val()); //es obligatoria
		var lugar = String($("#i option:selected").val()); //es obligatoria

		// determinar que dice el diagnóstico
		var diagnostico = "";

		let value = $("#w").val();
		if (value == ""){
			diagnostico = String($("#j").val()); //es obligatoria
		}else{
			diagnostico = value; //es obligatoria
		}

		var sistolica = $("#k").val();
		var diastolica = String($("#l").val());
		var media = String($("#ll").val());
		var talla = String($("#m").val());
		var peso = String($("#n").val());
		var imc = String($("#o").val());
		var paridad = String($("#p option:selected").text());
		var antecedentes = String($("#q").val());
		var nombreReferente = String($("#r").val());
		var correoReferente = String($("#s").val());
		var nombreContrarreferente = String($("#t option:selected").text());
		var correoContrarreferente = String($("#u").val());

        var baseModal = '<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
        var footerModal = '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Aceptar</button></div></div></div></div>';
		
		if (nombre.length < 3 || apellido.length < 3 || rut.length < 4 || fum.length < 4 || fecha.length < 4 || eg == "0 semanas" || diagnostico.length  < 3 || nombreReferente.length < 3 || correoReferente.length < 2){
			var mensaje = "";

            if (nombre.length < 3){
                mensaje = textos.paciente_name_error;
            }else if (apellido.length < 3){
                mensaje = textos.paciente_apellido_error;
            }else if (rut.length < 4){
				mensaje = textos.paciente_rut_error;
			}else if (fum.length < 4){
                mensaje = textos.fur_error;
			}else if (fecha.length < 4){
                mensaje = textos.form_error;
            }else if (eg == "0 semanas"){
                mensaje = "No ha ingresado edad gestacional";
			}else if (diagnostico.length  < 3){
                mensaje = textos.diagnostico_referencia_error;
            }else if (nombreReferente.length < 3){
                mensaje = textos.nombreReferente;
            }else if (correoReferente.length < 2){
                mensaje = "Seleccione profesional contrarreferente";
			}
			
            $('body').append(baseModal + '<h5 class="modal-title">' + textos.form_error+ '</h5></div><div class="modal-body"><p>'+ mensaje +'</p>'+ footerModal);
            $('#cautivo\\.dialogo').modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
            return;
		}else if (a < 3 && nombreContrarreferente.length < 5 || a < 3 && correoContrarreferente.length < 5){
			var mensaje = "";

            if (nombreContrarreferente.length < 3){
                mensaje = textos.nombreContrarreferente;
            }else if (correoContrarreferente.length < 4){
				mensaje = mensaje = "Seleccione profesional contrarreferente";
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

			if (a < 3){
				data = {
					nombre: nombre,
					apellido: apellido,
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
					media: media,
					talla: talla,
					peso: peso,
					imc: imc,
					paridad:paridad,
					antecedentes: antecedentes,
					nombreReferente: nombreReferente,
					correoReferente: correoReferente,
					nombreContrarreferente: nombreContrarreferente,
					correoContrarreferente: correoContrarreferente
				};
			}else{
				data = {
					nombre: nombre,
					apellido: apellido,
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
					media: media,
					talla: talla,
					peso: peso,
					imc: imc,
					antecedentes: antecedentes,
					paridad: paridad,
					nombreReferente: nombreReferente,
					correoReferente: correoReferente
				};
			}

			$('body').append(baseModal + textos.form_send + '</h5></div><div class="modal-body"><p>Enviando solicitud de interconsulta, por favor espere</p><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
		
			$.post("https://administrador.crecimientofetal.cl/api/send", data).done(function(response){
				if (response.result == false){
					$('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">ERROR</h5></div><div class="modal-body"><p>Usted NO puede solicitar interconsulta para este profesional</p>'+ footerModal);
				}else if (response.result == true){
					$('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Información</h5></div><div class="modal-body"><p>Su Solicitud de interconsulta ha sido enviada correctamente</p>'+ footerModal);
					$("#a").val(""); $("#b").val(""); $("#c").val(""); resetFecha("#d"); resetFecha("#e"); $("#d").trigger("change"); $("#g").val(25); $("#j").val(""); $("#k").val(""); $("#l").val(""); $("#ll").val(0); $("#m").val(""); $("#n").val(""); $("#o").val(0); $("#p").val(0); $("#q").val(""); $('#y').val("");
					$("#interconsultas\\.estado\\.espera").trigger("click");
				}

                $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
                    $('#cautivo\\.dialogo').modal("hide").remove();
                    $(this).remove();
                    $('#v').prop("disabled", false);
				});

				loadContrarreferentes();
			});
		}
    });
	
	resetFecha("#d");
	resetFecha("#e");

	if (_paciente !== ""){
		document.getElementById("b").value = _paciente;
		$("#b").trigger("blur");
	}
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
		$("#t").empty();
		var contador = 0;
		$.each(data, function(element, value){
			let option = "";
			if (contador == 0){
				option = '<option value="'+value.user_email+'" selected>'+value.user_name+'</option>';
				contador++;
			}else{
				option = '<option value="'+value.user_email+'">'+value.user_name+'</option>';
			}
			$("#t").append(option);
		});
	});
	$("#t").trigger("change");
}

function loadCiudadesSolicitud(){
	$.get("dashboard/ciudades_configuracion").done(function(data){
		$("#h").empty().append('<option value=" " selected>no seleccionado</option>');
		$.each(data, function(element, value){
			let option = '<option value="'+value.ciudad_name+'">'+value.ciudad_name+'</option>';
			$("#h").append(option);
		});
	});
}

function loadLugares(){
	$.get("dashboard/lugares_configuracion").done(function(data){
		$("#i").empty().append('<option value=" " selected>no seleccionado</option>');
		$.each(data, function(element, value){
			let	option = '<option value="'+value.lugar_name+'">'+value.lugar_name+'</option>';
			$("#i").append(option);
		});
	});
}
function getDate(today) {
    if (typeof today === typeof undefined){
        today = dayHoy;
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