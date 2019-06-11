function loadInPartos(){
    $("#mensaje\\.parto").addClass("d-none");
    $("#tabla\\.parto").removeClass("d-none");
    $.get('dashboard/finish').done(function(data){
        buildPartosTable(data);
	});
}

function buildPartosTable(data){
    $('#tabla\\.parto').empty();
    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Exámen realizado</th><th>Accion</th></tr></thead><tbody>';
        //tabla para exámenes ecográficos
        $.each(data, function(i, value) {
            let fecha = value.fecha.split('-');
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];        
            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>'+ fecha +'</td>';
            tabla += '<td><button class="btn btn-secondary mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Datos del parto</button></td></tr>';
        });

        tabla += '</tbody>';
        $('#tabla\\.parto').append(tabla);
        $('#tabla\\.parto tr > td > button').on("click", function(){
            let solicitud_id =  $(this).data("id");
            let tipo =  $(this).data("tipo");
            $('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"> <div class="modal-dialog modal-lgx" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Datos del parto y recién nacido</h5></div><div class="modal-body"> <div class="form-row"> <input type="hidden" class="form-control" id="idpacienteparto"> <input type="hidden" class="form-control" id="idpacientefur"> <div class="col-md-12"> <h6><strong>Datos maternos</strong></h6> </div><div class="form-group col-md-3"> <label for="nombreparto">Nombre</label> <input type="text" class="form-control" id="nombreparto" disabled> </div><div class="form-group col-md-3"> <label for="rutparto">RUT</label> <input type="text" class="form-control" id="rutparto" disabled> </div><div class="form-group col-md-3"> <label for="fechaparto">Fecha de parto</label> <input type="date" class="form-control" id="fechaparto"> </div><div class="form-group col"> <label for="egparto">Edad gestacional</label> <select class="form-control" id="egparto"></select> </div><div class="form-group col"> <label for="egparto">días</label> <select class="form-control" id="diasparto"></select> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="pesomaterno">Peso Materno</label> <select class="form-control" id="pesomaterno"></select> </div><div class="form-group col-md-3"> <label for="tallamaterna">Talla Materna</label> <select class="form-control" id="tallamaterna"></select> </div><div class="form-group col-md-3"> <label for="rutparto">IMC (peso * talla)&#94;2</label> <input type="text" class="form-control" id="imc" disabled> </div><div class="form-group col-md-3"> <label for="nombreparto">Estado nutricional</label> <input type="text" class="form-control" id="estadonutricional" disabled> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="etniamaterna">Etnia materna</label> <select class="form-control" id="etniamaterna"> <option value="0">Ambos Caucásicos</option> <option value="2">Solo uno Caucásico</option> <option value="1" selected>Ninguno Caucásico</option> </select> </div><div class="form-group col-md-3"> <label for="paridadmaterna">Paridad</label> <select class="form-control" id="paridadmaterna"> <option value="Primípara" selected>Primípara</option> <option value="Multípara">Multípara</option> </select> </div><div class="form-group col-md-3"> <label for="tipomaterna">Tipo de parto</label> <select class="form-control" id="tipomaterna"> <option value="Vaginal" selected>Vaginal</option> <option value="Cesarea">Cesárea</option> </select> </div><div class="form-group col-md-3"> <label for="lugarparto">Lugar de Parto</label> <input type="text" class="form-control" id="lugarparto"> </div></div></div><div class="form-row"> <div class="col-md-12"> <h6><strong>Datos neonatales</strong></h6> </div><div class="form-group col-md-3"> <label for="pesofetal">Peso fetal (grs)</label> <input type="number" class="form-control" id="pesofetal"> </div><div class="form-group col-md-3"> <label for="tallafetal">Talla (mm)</label> <input type="number" class="form-control" id="tallafetal"> </div><div class="form-group col-md-3"> <label for="craneo">Cráneo (mm)</label> <input type="password" class="form-control" id="craneo"> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="apgar_uno">Apgar 1</label> <select class="form-control" id="apgar_uno"> <option value="0" selected>0</option> <option value="1" selected>1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </div><div class="form-group col-md-3"> <label for="apgar_cinco">Apgar 5</label> <select class="form-control" id="apgar_cinco"> <option value="0" selected>0</option> <option value="1" selected>1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </div><div class="form-group col-md-3"> <label for="sexofetal">Sexo RN</label> <select class="form-control" id="sexofetal"> <option value="Femenino" selected>Femenino</option> <option value="Masculino">Masculino</option> </select> </div><div class="form-group col-md-3"> <label for="meconio">Meconio</label> <select class="form-control" id="meconio"> <option value="Si" selected>Si</option> <option value="No">No</option> </select> </div></div><div class="form-row"> <div class="col-md-12"> <h6><strong>Datos neonatales calculados</strong></h6> </div><div class="form-group col-md-4"> <label for="ipnparto">IPN ((peso*talla)&#94;3) * 100 </label> <input type="text" class="form-control" id="ipnparto" disabled> </div><div class="form-group col-md-4"> <label for="pesoegparto">Peso/EG</label> <div class="input-group mb-2"> <input type="text" class="form-control" id="pesoegparto" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="pesoegpartoestado"></div></div></div></div><div class="form-group col-md-4"> <label for="ipnegparto">IPN/EG</label> <div class="input-group mb-2"> <input type="text" class="form-control" id="ipnegparto" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="ipnegpartoestado"></div></div></div></div></div><div class="form-row"> <div class="form-group col-md-12"> <label for="comentariosparto">Comentarios</label> <input type="text" class="form-control" id="comentariosparto"> </div></div></div><div class="modal-footer"> <button type="button" class="btn btn-primary" id="guardarparto">Guardar</button> <button type="button" class="btn btn-danger" id="borrarparto">Borrar</button> <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button> </div></div></div>');
            
            for (var i = 35; i < 139; i++) {
                let option = '<option value="'+i+'">'+i+' kg.</option>';
                $("#pesomaterno").append(option);
            }
            
            for (var i = 135; i < 189; i++) {
                let option = '<option value="'+i+'">'+i+' cms.</option>';
                $("#tallamaterna").append(option);
            }

            for (var i = 20; i < 43; i++) {
                let option = '<option value="'+i+'">'+i+' semanas.</option>';
                $("#egparto").append(option);
            }

            for (var i = 0; i < 7; i++) {
                let option = '<option value="'+i+'">'+i+' dias.</option>';
                $("#diasparto").append(option);
            }

            $("#fechaparto").on("change", function(){
                var FUM = $("#idpacientefur").val();

                if (FUM.length < 1){
                    return;
                }

                var FExamen,FUM;
                var undia = 1000 * 60 * 60 * 24;
                var unasemana = undia * 7;
                FExamen = $(this).val();
                
                FUM = new Date(FUM);
                FExamen = new Date(FExamen);
                semanas = Math.trunc((FExamen.getTime() - FUM.getTime()) / unasemana);
                dias = ((FExamen.getTime() - FUM.getTime()) - (unasemana * semanas)) / undia;
                if (FExamen.getTime() < FUM.getTime()) {
                    $('#egparto').val(0);
                    $('#diasparto').val(20);
                } 
                else if (((FExamen.getTime() - FUM.getTime()) / unasemana) > 42) {
                    $('#egparto').val(41);
                    $('#diasparto').val(6);
                } 
                else {
                    $('#egparto').val(semanas);
                    $('#diasparto').val(dias);
                }
            });

            $("#pesomaterno").on("change", function(){
                var peso,talla;
                peso = $(this).val();
                talla = $("#tallamaterna").val();
                
                if (peso.length > 1 && talla.length > 1){
                    let imcD = 0;
                    imcD = imc(peso,talla);
                    $("#imc").val(imcD);
                    $("#estadonutricional").val(imcCondicion(imcD));
                    $("#ipnparto").val(ipn(peso,talla));
                }
            });
            $("#tallamaterna").on("change", function(){
                var peso,talla;
                peso = $("#pesomaterno").val();
                talla = $(this).val();
                
                if (peso.length > 1 && talla.length > 1){
                    let imcD = 0;
                    imcD = imc(peso,talla);
                    $("#imc").val(imcD);
                    $("#estadonutricional").val(imcCondicion(imcD));
                    $("#ipnparto").val(ipn(peso,talla));
                }
            });

            $("#pesofetal").on("change", function(){
                var peso,talla,eg;
                peso = $(this).val();
                talla = $("#tallafetal").val();
                eg = $('#egparto').val();

                if (peso.length > 1){
                    $("#pesoegparto").val(pesoEg(peso,eg));
                    $("#pesoegpartoestado").val(pesoEgCondicion(peso,eg));
                }
                
                if (peso.length > 1 && talla.length > 1){
                    $("#ipnparto").val(ipn(peso,talla));
                }
            });

            $("#tallafetal").on("change", function(){
                var peso,talla;
                peso = $("#pesofetal").val();
                talla = $(this).val();
                
                if (peso.length > 1 && talla.length > 1){
                    $("#ipnparto").val(ipn(peso,talla));
                }
            });

            $.get("dashboard/baseParto/" + solicitud_id).done(function(data){
                $("#nombreparto").val(data.solicitud_nombre);
                $("#rutparto").val(data.solicitud_rut);
                $("#idpacienteparto").val(data.solicitud_id);
                $("#idpacientefur").val(data.solicitud_fum);
            });

            $('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
        });
    }
    else{
        $("#mensaje\\.parto").removeClass("d-none").html("No tienes pacientes para ingresar datos del parto");
    }
}

function imc(peso,talla) {
    var valor = ((peso / (Math.pow(talla, 2))) * 10000);
    return Math.trunc(valor);
};

function imcCondicion(imc) {
    if (imc < 20) {
        return 'Enflaquecida';
    } else if (imc < 25) {
        return 'Normal';
    } else if (imc <= 30) {
        return 'Sobrepeso';
    } else if (imc > 30) {
        return 'Obesidad';
    }
};

function ipn(peso,talla) {
    var valor = peso / (Math.pow(talla, 3));
    valor = valor * 100000;
    return valor.toFixed(1);
};

function pesoEg(peso,eg){
    var pct10PesoNacional,pct90PesoNacional;
    pct10PesoNacional = [640.6, 666, 728.2, 822.9, 945.7, 1092.2, 1258.2, 1439.2, 1630.8, 1828.7, 2028.6, 2226, 2416.7, 2596.2, 2760.2, 2904.2, 3024.1, 3115.3, 3173.5];
    pct90PesoNacional = [897.9, 963.3, 1070.6, 1214.6, 1390.1, 1592, 1815, 2053.8, 2303.4, 2558.5, 2813.9, 3064.4, 3304.7, 3529.8, 3734.4, 3913.2, 4061.2, 4173, 4243.5];

    var uno = pct90PesoNacional[eg] - pct10PesoNacional[eg];
    var dos = peso - pct10PesoNacional[eg];
    return parseInt((80 / (uno)) * (dos)) + 10;
}

function pesoEgCondicion(peso,eg){
    var pct10PesoNacional,pct90PesoNacional;
    pct10PesoNacional = [640.6, 666, 728.2, 822.9, 945.7, 1092.2, 1258.2, 1439.2, 1630.8, 1828.7, 2028.6, 2226, 2416.7, 2596.2, 2760.2, 2904.2, 3024.1, 3115.3, 3173.5];
    pct90PesoNacional = [897.9, 963.3, 1070.6, 1214.6, 1390.1, 1592, 1815, 2053.8, 2303.4, 2558.5, 2813.9, 3064.4, 3304.7, 3529.8, 3734.4, 3913.2, 4061.2, 4173, 4243.5];

    if (peso < pct10PesoNacional[eg]) {
        return "Pequeño";
    } else if (peso <= pct90PesoNacional[eg]) {
        return "Adecuado";
    } else if (peso > pct90PesoNacional[eg]) {
        return "Grande";
    }
}