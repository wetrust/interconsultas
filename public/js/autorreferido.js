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

    $("#interconsulta\\.enviar").on("click", function(){
		var listo = false;
		//revisar si el usuario lleno todas las cajas
			
		var nombre = String($("#interconsulta\\.nombre").val());
		var rut = String($("#interconsulta\\.rut").val());
		var fecha = String($("#interconsulta\\.fecha").val());
		var telefono = String($("#interconsulta\\.telefono").val());
		var eg = String($('input[name=interconsulta_eg]:checked').val());
		var eco = String($('input[name=interconsulta_eco]:checked').val());
		var fum = String($("#interconsulta\\.fum").val());
		var diagnostico = String($("#interconsulta\\.diagnostico\\.select").val());
		var lugar = String($("#interconsulta\\.lugar").val());
		var ciudad = String($("#interconsulta\\.ciudad").val());
		var egestacional = String($("#interconsulta\\.egestacional").val());
		var para = $("input[name='interconsulta_para_nombre']").val();
		var nombre_para = $("input[name='interconsulta_para']").val();
        
        var baseModal = '<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
        var footerModal = '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>';
        
        if (nombre.length < 3 || rut.length < 4 || telefono.length < 6 || fecha.length < 4 || eg == 'undefined' || eg.length < 1 || eco == 'undefined' || eco.length  < 0 || fum.length < 4 || diagnostico.length  < 3 || ciudad.length < 2 || lugar.length  < 3 || egestacional.length < 3){
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
            }else if (eco == 'undefined' || eco.length  < 0){
                mensaje = textos.eco_previa_error;
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
            }

            $('body').append(baseModal + '<h5 class="modal-title">' + textos.form_error+'</h5></div><div class="modal-body"><p>'+ mensaje+'</p>'+ footerModal);
            $('#cautivo\\.dialogo').modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
            return;
        } else{
            listo = true;
        }

		if (listo == true){
			$('#interconsulta\\.enviar').prop("disabled", true);
			var eLdiagnostico = $("#interconsulta\\.diagnostico\\.select").val() + ", "+ $("#interconsulta\\.diagnostico").val();

			var data = {
				nombre: $("#interconsulta\\.nombre").val(),
				rut: $("#interconsulta\\.rut").val(),
				telefono: $("#interconsulta\\.telefono").val(),
				fecha: $("#interconsulta\\.fecha").val(),
				eg: $('input[name=interconsulta_eg]:checked').val(),
				eco: $('input[name=interconsulta_eco]:checked').val(),
				fum: $("#interconsulta\\.fum").val(),
				diagnostico: eLdiagnostico,
				lugar: $("#interconsulta\\.lugar").val(),
				ciudad: $("#interconsulta\\.ciudad").val(),
				egestacional: $("#interconsulta\\.egestacional").val(),
				para: para,
				nombre_para: nombre_para
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
					$("#interconsulta\\.diagnostico\\.select").val(0);
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
	
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
	$("#interconsulta\\.fecha").val(today);
});

function construir(){
    $("#mensaje\\.resultado").parent().parent().prepend('<div class="card-header bg-secondary" id="card.header"><h4 class="text-white text-center">Formulario de referencia para evaluación ecográfica gineco - Obstétrica</h4></div>');
    $("#mensaje\\.resultado").parent().prepend('<div id="formulario.solicitud"> <div class="row"> <div class="col form-group"> <label>Nombre del paciente</label> <input type="text" class="form-control" id="interconsulta.nombre"> </div><div class="col form-group"> <label>RUT del paciente</label> <input type="text" class="form-control" id="interconsulta.rut"> </div><div class="col form-group"> <label>Teléfono</label> <input type="number" class="form-control" id="interconsulta.telefono"> </div></div><div class="row"> <div class="col form-group"> <label>Fecha de solicitud del exámen</label> <input type="date" class="form-control" id="interconsulta.fecha"> </div><div class="col form-group"> <label class="d-block">Ege conocida precozmente</label> <div class="form-check form-check-inline"> <input type="radio" id="interconsulta.eg.si" value="1" name="interconsulta_eg" class="form-check-input"> <label class="form-check-label">Si</label> </div><div class="form-check form-check-inline"> <input type="radio" id="interconsulta.eg.no" value="0" name="interconsulta_eg" class="form-check-input" checked=""> <label class="form-check-label">No</label> </div></div><div class="col form-group"> <label class="d-block">Ecografía previa de crecimiento</label> <div class="form-check form-check-inline"> <input type="radio" id="interconsulta.eco.si" value="1" name="interconsulta_eco" class="form-check-input"> <label class="form-check-label">Si</label> </div><div class="form-check form-check-inline"> <input type="radio" id="interconsulta.eco.no" value="0" name="interconsulta_eco" class="form-check-input" checked=""> <label class="form-check-label">No</label> </div></div></div><div class="row"> <div class="col form-group"> <label>FUM operacional</label> <input type="date" class="form-control" id="interconsulta.fum"> </div><div class="col-2 form-group"> <label>Edad Gestacional</label> <input type="text" class="form-control" id="interconsulta.egestacional" disabled=""> </div><div class="col form-group"> <label>Diagnóstico de referencia 1</label> <select class="form-control" id="interconsulta.diagnostico.select"> <option value="Referido por" selected>Referido por</option> <option value="Patología 1° trimestre">Patología 1° trimestre</option> <option value="Patología 2° trimestre">Patología 2° trimestre</option> <option value="Patología 3° trimestre">Patología 3° trimestre</option> <option value="No señalado">No señalado</option> </select> </div><div class="col form-group"> <label>Diagnóstico de referencia2</label> <input type="text" class="form-control" id="interconsulta.diagnostico"> </div></div><div class="row"> <div class="col form-group"> <label>Ciudad procedencia de la paciente</label> <input type="text" class="form-control" id="interconsulta.ciudad"> </div><div class="col form-group"> <label>Lugar de control prenatal</label> <input type="text" class="form-control" id="interconsulta.lugar"> </div></div><div class="row"> <div class="col"> <button class="btn btn-primary" id="interconsulta.enviar">Enviar solicitud de exámen ecográfico</button> </div></div></div>');
}

function loadSolicitud(){
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
        $("input[name='respuesta_pfe']").val(psoP.toFixed(0)).trigger("change");
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