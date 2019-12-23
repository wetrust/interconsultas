$(document).ready(function(){
    $("#filtro\\.parto\\.activar").on("click", function(){
        var toggle = $("#filtro\\.parto\\.contenedor").hasClass("d-none");

        if (toggle){
            $("#filtro\\.parto\\.contenedor").removeClass("d-none");
        }else{
            $("#filtro\\.parto\\.contenedor").addClass("d-none");
        }
    });

    $("#filtro\\.parto\\.borrar").on("click", function(){
        loadReadyPartos();
    });

    $("#filtro\\.parto\\.accion").on("click", function(){
        var ciudad = $("#filtro\\.parto\\.ciudad").val();
        var lugar = $("#filtro\\.parto\\.lugar").val();
        var desde = $("#filtro\\.parto\\.fecha").val();
        var hasta = $("#filtro\\.parto\\.fecha\\.hasta").val();
        var fecha = $("#filtro\\.parto\\.tipo").val();

        var datos = { ciudad : ciudad, lugar : lugar, desde : desde, hasta : hasta, fecha : fecha}

        $.post('dashboard/filtroparto', datos).done(function(data){ buildPartosGuardadosTable(data, false); });
    });
    
});

function loadInPartos(){
    $("#mensaje\\.parto").addClass("d-none");
    $("#tabla\\.parto").removeClass("d-none");
    $.get('dashboard/sinpartos').done(function(data){ buildPartosTable(data); });
}

function loadReadyPartos(){
    $("#mensaje\\.parto").addClass("d-none");
    $("#tabla\\.parto").removeClass("d-none");
    $.get('dashboard/partos').done(function(data){ buildPartosGuardadosTable(data, true) });
}

function loadReadyPartosAjuste(){
    $("#mensaje\\.parto").addClass("d-none");
    $("#tabla\\.parto").removeClass("d-none");
    $.get('dashboard/partos').done(function(data){ buildPartosAjusteTable(data) });
}

function buildPartosTable(data){
    $('#tabla\\.parto').empty();
    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>FPP</th><th>Ciudad</th><th>Lugar de control</th><th>Accion</th></tr></thead><tbody>';
        //tabla para exámenes ecográficos
        $.each(data, function(i, value) {
            tabla += '<tr><td>' + value.solicitud_nombre;
            let fum = new Date();
            fum.setTime(Date.parse(value.solicitud_fum));
            fum.setTime(fum.getTime() + (1000*60*60*24*282));

            var dd = fum.getDate();
            var mm = fum.getMonth()+1; //January is 0!
            var yyyy = fum.getFullYear();
        
            if(dd<10) {
                dd = '0'+dd
            } 
        
            if(mm<10) {
                mm = '0'+mm
            } 
        
            let fpp = dd+ '-' + mm + '-' + yyyy;

            tabla += '</td><td>' + fpp + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td>';
            tabla += '<td><button class="btn btn-secondary mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Datos del parto</button></td></tr>';
        });

        tabla += '</tbody>';
        $('#tabla\\.parto').append(tabla);
        $('#tabla\\.parto tr > td > button').on("click", function(){
            let solicitud_id =  $(this).data("id");
            $('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Datos del parto y recién nacido</h5></div><div class="modal-body"> <div class="form-row"> <input type="hidden" class="form-control" id="idpacienteparto"> <input type="hidden" class="form-control" id="idpacientefur"> <div class="col-md-12"> <h6><strong>Datos maternos</strong></h6></div><div class="form-group col-md-3"> <label for="nombreparto">Nombre y apellido</label> <input type="text" class="form-control" id="nombreparto" disabled> </div><div class="form-group col-md-3"> <label for="rutparto">RUT materno</label> <input type="text" class="form-control" id="rutparto" disabled> </div><div class="form-group col-md-3"> <label for="fechaparto">Fecha de parto</label> <input type="date" class="form-control" id="fechaparto"> </div><div class="form-group col"> <label for="egparto">Edad gestacional</label> <select class="form-control" id="egparto" disabled></select> </div><div class="form-group col"> <label for="egparto">días</label> <select class="form-control" id="diasparto" disabled></select> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="tallamaterna">Talla Materna</label> <select class="form-control" id="tallamaterna"></select> </div><div class="form-group col-md-3"> <label for="pesomaterno">Peso Materno</label> <select class="form-control" id="pesomaterno"></select> </div><div class="form-group col-md-3"> <label for="rutparto">IMC (peso * talla)&#94;2</label> <input type="text" class="form-control" id="imc" disabled> </div><div class="form-group col-md-3"> <label for="nombreparto">Estado nutricional</label> <input type="text" class="form-control" id="estadonutricional" disabled> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="etniamaterna">Etnia materna</label> <select class="form-control" id="etniamaterna"> <option value="0">Ambos Caucásicos</option> <option value="2">Solo uno Caucásico</option> <option value="1" selected>Ninguno Caucásico</option> </select> </div><div class="form-group col-md-3"> <label for="paridadmaterna">Paridad</label> <select class="form-control" id="paridadmaterna"> <option value="Primípara" selected>Primípara</option> <option value="Multípara">Multípara</option> </select> </div><div class="form-group col-md-3"> <label>Tipo de parto</label> <select class="form-control" id="tipomaterna"> <option value="Vaginal" selected>Vaginal</option> <option value="Cesarea">Cesárea</option> </select> </div><div class="form-group col-md-3"> <label for="lugarparto">Lugar de Parto</label> <input type="text" class="form-control" id="lugarparto"> </div></div><div class="form-row"> <div class="col-md-12"> <h6><strong>Datos neonatales</strong></h6></div><div class="col-3"> <div class="form-row"> <div class="form-group col-12"> <label for="pesofetal">Peso fetal (grs)</label> <input type="number" class="form-control" id="pesofetal"> </div><div class="form-group col-12"> <label for="tallafetal">Talla (mm)</label> <input type="number" class="form-control" id="tallafetal"> </div><div class="form-group col-12"> <label for="craneo">Cráneo (mm)</label> <input type="text" class="form-control" id="craneo"> </div></div></div><div class="col-3"> <div class="form-row"> <div class="form-group col-12"> <label for="ipnparto">IPN ((peso*talla)&#94;3) * 100 </label> <input type="text" class="form-control" id="ipnparto" disabled> </div><div class="form-group col-12"> <label for="pesoegparto">Peso/Edad gestacional</label> <div class="input-group mb-2"> <input type="text" class="form-control" id="pesoegparto" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="pesoegpartoestado"></div></div></div></div><div class="form-group col-12"> <label for="ipnegparto">IPN/Edad gestacional</label> <div class="input-group mb-2"> <input type="text" class="form-control" id="ipnegparto" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="ipnegpartoestado"></div></div></div></div></div></div><div class="col-3"> <div class="form-row"> <div class="form-group col-12"> <label for="sexofetal">Sexo RN</label> <select class="form-control" id="sexofetal"> <option value="Femenino" selected>Femenino</option> <option value="Masculino">Masculino</option> <option value="Indiferenciado">Indiferenciado</option> </select> </div><div class="form-group col-12"> <label for="apgar_uno">Apgar minuto 1</label> <select class="form-control" id="apgar_uno"> <option value="0" selected>0</option> <option value="1" selected>1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </div><div class="form-group col-12"> <label for="apgar_cinco">Apgar minuto 5</label> <select class="form-control" id="apgar_cinco"> <option value="0" selected>0</option> <option value="1" selected>1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </div></div></div><div class="col-3"> <div class="form-row"> <div class="form-group col-12"> <label for="meconio">Meconio al parto</label> <select class="form-control" id="meconio"> <option value="Si">Si</option> <option value="No" selected>No</option> </select> </div></div><div class="form-row"> <div class="form-group col-12"> <label for="hipoglicemia">Hipoglicemia neonatal</label> <select class="form-control" id="hipoglicemia"> <option value="Si">Si</option> <option value="No" selected>No</option> </select> </div></div><div class="form-row"> <div class="form-group col-12"> <label for="alta">Alta con su madre</label> <select class="form-control" id="alta"> <option value="Si" selected>Si</option> <option value="No">No</option> </select> </div></div></div></div><div class="form-row"> <div class="form-group col-md-8"> <label for="comentariosparto">Comentario y observaciones</label> <input type="text" class="form-control" id="comentariosparto"> </div><div class="form-group col-md-4"> <label>Protoloco Hipoglicemia</label> <select class="form-control" id="protocolo_hipoglicemia"> <option value="Si">Si</option> <option value="No" selected>No</option> </select> </div><p class="text-primary">El proposito de conocer datos de parto y recien nacido es solo con fines de realizar seguimiento de la historia perinatal, la utilizacion de información con fines de investigación, requiere consentimiento informado de la madre. para tal efecto ver formularios en pagina inicial de la plataforma</p></div><div class="modal-footer"> <button type="button" class="btn btn-primary" id="guardarparto">Guardar</button> <button type="button" class="btn btn-danger" id="borrarparto">Borrar</button> <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button> </div></div></div></div>');
            
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
                if (i == 40){
                    option = '<option value="'+i+'" selected>'+i+' semanas.</option>';  
                }
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
                    $('#diasparto').val(dias);}
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
                }
            });

            $("#pesofetal").on("change", function(){
                var peso,talla,eg;
                peso = $(this).val();
                talla = $("#tallafetal").val();
                eg = $('#egparto').val();

                if (peso.length > 1){
                    $("#pesoegparto").val(pesoEg(peso,eg));
                    $("#pesoegpartoestado").html(pesoEgCondicion(peso,eg));
                }
                
                if (peso.length > 1 && talla.length > 1){
                    $("#ipnparto").val(ipn(peso,talla)).trigger("change");
                }
            });

            $("#tallafetal").on("change", function(){
                var peso,talla;
                peso = $("#pesofetal").val();
                talla = $(this).val();
                
                if (peso.length > 1 && talla.length > 1){
                    $("#ipnparto").val(ipn(peso,talla)).trigger("change");
                }
            });

            $("#ipnparto").on("change", function(){
                var ipn,eg;
                ipn = $(this).val();
                eg = $('#egparto').val();

                if (ipn.length > 1 && eg > 23){
                    $("#ipnegparto").val(ipnEg(ipn,eg));
                    $("#ipnegpartoestado").html(ipnEgCondicion(ipn,eg));
                }
            });

            $.get("dashboard/baseParto/" + solicitud_id).done(function(data){
                $("#nombreparto").val(data.solicitud_nombre);
                $("#rutparto").val(data.solicitud_rut);
                $("#idpacienteparto").val(data.solicitud_id);
                $("#idpacientefur").val(data.solicitud_fum);
            });

            $("#pesofetal").keypress(function( event ) {
                if ( event.which == 13 ) {
                   event.preventDefault();
                   $("#tallafetal").focus();
                }
                else{
                    if ($(this).val().length >= 4){event.preventDefault();}
                }
            });
            $("#tallafetal").keypress(function( event ) {
                if ( event.which == 13 ) {
                   event.preventDefault();
                   $("#craneo").focus();
                }
                else{
                    if ($(this).val().length >= 3){event.preventDefault();}
                }
            });
            $("#craneo").keypress(function( event ) {
                if ( event.which == 13 ) {
                   event.preventDefault();
                   $("#sexofetal").focus();
                }
                else{
                    if ($(this).val().length >= 3){event.preventDefault();}
                }
            });
            $('#cautivo\\.dialogo').modal("show");

            $("#guardarparto").on("click", function(){
                var data = {
                    solicitud_id: $("#idpacienteparto").val(),
                    fecha_parto: $("#fechaparto").val(),
                    semanas: $("#egparto").val(),
                    dias: $("#diasparto").val(),
                    peso: $("#pesomaterno").val(),
                    talla: $("#tallamaterna").val(),
                    imc: $("#imc").val(),
                    estado_nutricional: $("#estadonutricional").val(),
                    etnia: $("#etniamaterna").val(),
                    paridad: $("#paridadmaterna").val(),
                    tipo: $("#tipomaterna").val(),
                    lugar: $("#lugarparto").val(),
                    pesofetal: $("#pesofetal").val(),
                    tallafetal: $("#tallafetal").val(),
                    craneofetal: $("#craneo").val(),
                    apgar_uno: $("#apgar_uno").val(),
                    apgar_cinco: $("#apgar_cinco").val(),
                    sexo: $("#sexofetal").val(),
                    meconio: $("#meconio").val(),
                    ipn: $("#ipnparto").val(),
                    peso_eg: $("#pesoegparto").val(),
                    peso_eg_estado: $("#pesoegpartoestado").html(),
                    ipn_eg: $("#ipnegparto").val(),
                    ipn_eg_estado: $("#ipnegpartoestado").html(),
                    comentarios: $("#comentariosparto").val(),
                    hipoglicemia: $("#hipoglicemia").val(),
                    alta: $("#alta").val(),
                    protocolo_hipoglicemia: $("#protocolo_hipoglicemia").val()
                }

                $.post("dashboard/savePartos", data).done(function(result){
                    $('#cautivo\\.dialogo').modal("hide");
                    loadInPartos();
                });
            });

            $("#borrarparto").on("click", function(){
                var solicitud_id = $("#idpacienteparto").val()
                $.get("dashboard/deleteParto/" + solicitud_id).done(function(data){
                    $('#cautivo\\.dialogo').modal("hide");
                });
            });
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
        });
    }
    else{
        $("#mensaje\\.parto").removeClass("d-none").html("No tienes pacientes para ingresar datos del parto");
    }
}

function buildPartosGuardadosTable(data, filtro){
    $('#tabla\\.parto').empty();

    if (filtro){
        $('#filtro\\.parto\\.ciudad').empty().append('<option value="">No Seleccionado</option>');
        $('#filtro\\.parto\\.lugar').empty().append('<option value="">No Seleccionado</option>');
    
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            $.each(data, function(i, value) {
                response = '<option value="' + value.solicitud_ciudad +'">' + value.solicitud_ciudad +'</option>';
                $('#filtro\\.parto\\.ciudad').append(response);
            });
        }
    
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            $.each(data, function(i, value) {
                response = '<option value="' + value.solicitud_lugar +'">' + value.solicitud_lugar +'</option>';
                $('#filtro\\.parto\\.lugar').append(response);
            });
        }
    }
    
    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Fecha de nacimiento</th><th>Semanas al parto</th><th>Accion</th></tr></thead><tbody>';
        //tabla para exámenes ecográficos
        $.each(data, function(i, value) {
            let fecha = value.fecha_parto.split('-');
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>'+ fecha +'</td><td>'+ value.semanas +'</td>';
            tabla += '<td><button class="btn modificar btn-secondary mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Datos del parto</button><button class="btn informe btn-secondary mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Informe</button></td></tr>';
        });
        tabla += '</tbody>';
        $('#tabla\\.parto').append(tabla);
        $('#tabla\\.parto tr > td > button.modificar').on("click", function(){
            let solicitud_id =  $(this).data("id");
            $('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"> <div class="modal-dialog modal-lgx" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Datos del parto y recién nacido</h5></div><div class="modal-body"> <div class="form-row"> <input type="hidden" class="form-control" id="idpacienteparto"> <input type="hidden" class="form-control" id="idpacientefur"> <input type="hidden" class="form-control" id="idparto"> <div class="col-md-12"> <h6><strong>Datos maternos</strong></h6></div><div class="form-group col-md-3"> <label for="nombreparto">Nombre y apellido</label> <input type="text" class="form-control" id="nombreparto" disabled> </div><div class="form-group col-md-3"> <label for="rutparto">RUT materno</label> <input type="text" class="form-control" id="rutparto" disabled> </div><div class="form-group col-md-3"> <label for="fechaparto">Fecha de parto</label> <input type="date" class="form-control" id="fechaparto"> </div><div class="form-group col"> <label for="egparto">Edad gestacional</label> <select class="form-control" id="egparto" disabled></select> </div><div class="form-group col"> <label for="egparto">días</label> <select class="form-control" id="diasparto" disabled></select> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="tallamaterna">Talla Materna</label> <select class="form-control" id="tallamaterna"></select> </div><div class="form-group col-md-3"> <label for="pesomaterno">Peso Materno</label> <select class="form-control" id="pesomaterno"></select> </div><div class="form-group col-md-3"> <label for="rutparto">IMC (peso * talla)&#94;2</label> <input type="text" class="form-control" id="imc" disabled> </div><div class="form-group col-md-3"> <label for="nombreparto">Estado nutricional</label> <input type="text" class="form-control" id="estadonutricional" disabled> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="etniamaterna">Etnia materna</label> <select class="form-control" id="etniamaterna"> <option value="0">Ambos Caucásicos</option> <option value="2">Solo uno Caucásico</option> <option value="1" selected>Ninguno Caucásico</option> </select> </div><div class="form-group col-md-3"> <label for="paridadmaterna">Paridad</label> <select class="form-control" id="paridadmaterna"> <option value="Primípara" selected>Primípara</option> <option value="Multípara">Multípara</option> </select> </div><div class="form-group col-md-3"> <label>Tipo de parto</label> <select class="form-control" id="tipomaterna"> <option value="Vaginal" selected>Vaginal</option> <option value="Cesarea">Cesárea</option> </select> </div><div class="form-group col-md-3"> <label for="lugarparto">Lugar de Parto</label> <input type="text" class="form-control" id="lugarparto"> </div></div><div class="form-row"> <div class="col-md-12"> <h6><strong>Datos neonatales</strong></h6></div><div class="col-3"> <div class="form-row"> <div class="form-group col-12"> <label for="tallafetal">Talla (mm)</label> <input type="number" class="form-control" id="tallafetal"> </div><div class="form-group col-12"> <label for="pesofetal">Peso fetal (grs)</label> <input type="number" class="form-control" id="pesofetal"> </div><div class="form-group col-12"> <label for="craneo">Cráneo (mm)</label> <input type="text" class="form-control" id="craneo"> </div></div></div><div class="col-3"> <div class="form-row"> <div class="form-group col-12"> <label for="ipnparto">IPN ((peso*talla)&#94;3) * 100 </label> <input type="text" class="form-control" id="ipnparto" disabled> </div><div class="form-group col-12"> <label for="pesoegparto">Peso/Edad gestacional</label> <div class="input-group mb-2"> <input type="text" class="form-control" id="pesoegparto" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="pesoegpartoestado"></div></div></div></div><div class="form-group col-12"> <label for="ipnegparto">IPN/Edad gestacional</label> <div class="input-group mb-2"> <input type="text" class="form-control" id="ipnegparto" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="ipnegpartoestado"></div></div></div></div></div></div><div class="col-3"> <div class="form-row"> <div class="form-group col-12"> <label for="sexofetal">Sexo RN</label> <select class="form-control" id="sexofetal"> <option value="Femenino" selected>Femenino</option> <option value="Masculino">Masculino</option> <option value="Indiferenciado">Indiferenciado</option> </select> </div><div class="form-group col-12"> <label for="apgar_uno">Apgar minuto 1</label> <select class="form-control" id="apgar_uno"> <option value="0" selected>0</option> <option value="1" selected>1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </div><div class="form-group col-12"> <label for="apgar_cinco">Apgar minuto 5</label> <select class="form-control" id="apgar_cinco"> <option value="0" selected>0</option> <option value="1" selected>1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </div></div></div><div class="col-3"> <div class="form-row"> <div class="form-group col-12"> <label for="meconio">Meconio al parto</label> <select class="form-control" id="meconio"> <option value="Si">Si</option> <option value="No" selected>No</option> </select> </div></div><div class="form-row"> <div class="form-group col-12"> <label for="hipoglicemia">Hipoglicemia neonatal</label> <select class="form-control" id="hipoglicemia"> <option value="Si">Si</option> <option value="No" selected>No</option> </select> </div></div><div class="form-row"> <div class="form-group col-12"> <label for="alta">Alta con su madre</label> <select class="form-control" id="alta"> <option value="Si" selected>Si</option> <option value="No">No</option> </select> </div></div></div></div><div class="form-row"> <div class="form-group col-md-8"> <label for="comentariosparto">Comentario y observaciones</label> <input type="text" class="form-control" id="comentariosparto"> </div><div class="form-group col-md-4"> <label>Protoloco Hipoglicemia</label> <select class="form-control" id="protocolo_hipoglicemia"> <option value="Si">Si</option> <option value="No" selected>No</option> </select> </div><p class="text-primary">El proposito de conocer datos de parto y recien nacido es solo con fines de realizar seguimiento de la historia perinatal, la utilizacion de información con fines de investigación, requiere consentimiento informado de la madre. para tal efecto ver formularios en pagina inicial de la plataforma</p></div><div class="modal-footer"> <button type="button" class="btn btn-primary" id="guardarparto">Guardar</button> <button type="button" class="btn btn-danger" id="borrarparto">Eliminar parto</button> <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button> </div></div></div></div>');
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
                if (i == 40){
                    option = '<option value="'+i+'" selected>'+i+' semanas.</option>';  
                }
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
                }
            });

            $("#pesofetal").on("change", function(){
                var peso,talla,eg;
                peso = $(this).val();
                talla = $("#tallafetal").val();
                eg = $('#egparto').val();

                if (peso.length > 1){
                    $("#pesoegparto").val(pesoEg(peso,eg));
                    $("#pesoegpartoestado").html(pesoEgCondicion(peso,eg));
                }
                
                if (peso.length > 1 && talla.length > 1){
                    $("#ipnparto").val(ipn(peso,talla)).trigger("change");
                }
            });

            $("#tallafetal").on("change", function(){
                var peso,talla;
                peso = $("#pesofetal").val();
                talla = $(this).val();
                
                if (peso.length > 1 && talla.length > 1){
                    $("#ipnparto").val(ipn(peso,talla)).trigger("change");
                }
            });

            $("#ipnparto").on("change", function(){
                var ipn,eg;
                ipn = $(this).val();
                eg = $('#egparto').val();

                if (ipn.length > 1 && eg > 23){
                    $("#ipnegparto").val(ipnEg(ipn,eg));
                    $("#ipnegpartoestado").html(ipnEgCondicion(ipn,eg));
                }
            });

            $.get("dashboard/baseParto/" + solicitud_id).done(function(data){
                $("#nombreparto").val(data.solicitud_nombre);
                $("#rutparto").val(data.solicitud_rut);
                $("#idpacienteparto").val(data.solicitud_id);
                $("#idpacientefur").val(data.solicitud_fum);
            });

            $.get("dashboard/dataPartos/" + solicitud_id).done(function(data){
                $("#idparto").val(data.parto_id);
                $("#fechaparto").val(data.fecha_parto);
                $("#egparto").val(data.semanas);
                $("#diasparto").val(data.dias);
                $("#pesomaterno").val(data.peso);
                $("#tallamaterna").val(data.talla);
                $("#imc").val(data.imc);
                $("#estadonutricional").val(data.estado_nutricional);
                $("#etniamaterna").val(data.etnia);
                $("#paridadmaterna").val(data.paridad);
                $("#tipomaterna").val(data.tipo);
                $("#lugarparto").val(data.lugar);
                $("#pesofetal").val(data.pesofetal);
                $("#tallafetal").val(data.tallafetal);
                $("#craneo").val(data.craneofetal);
                $("#apgar_uno").val(data.apgar_uno);
                $("#apgar_cinco").val(data.apgar_cinco);
                $("#sexofetal").val(data.sexo);
                $("#meconio").val(data.meconio);
                $("#ipnparto").val(data.ipn);
                $("#pesoegparto").val(data.peso_eg);
                $("#pesoegpartoestado").html(data.peso_eg_estado);
                $("#ipnegparto").val(data.ipn_eg);
                $("#ipnegpartoestado").html(data.ipn_eg_estado);
                $("#comentariosparto").val(data.comentarios);
                $("#hipoglicemia").val(data.hipoglicemia);
                $("#alta").val(data.alta);
                $("#protocolo_hipoglicemia").val(data.protocolo_hipoglicemia);
            });

            $("#pesofetal").keypress(function( event ) {
                if ( event.which == 13 ) {
                   event.preventDefault();
                   $("#tallafetal").focus();
                }
                else{
                    if ($(this).val().length >= 4){event.preventDefault();}
                }
            });
            $("#tallafetal").keypress(function( event ) {
                if ( event.which == 13 ) {
                   event.preventDefault();
                   $("#craneo").focus();
                }
                else{
                    if ($(this).val().length >= 3){event.preventDefault();}
                }
            });
            $("#craneo").keypress(function( event ) {
                if ( event.which == 13 ) {
                   event.preventDefault();
                   $("#sexofetal").focus();
                }
                else{
                    if ($(this).val().length >= 3){event.preventDefault();}
                }
            });

            $('#cautivo\\.dialogo').modal("show");

            $("#guardarparto").on("click", function(){
                var data = {
                    parto_id: $("#idparto").val(),
                        solicitud_id: $("#idpacienteparto").val(),
                        fecha_parto: $("#fechaparto").val(),
                        semanas: $("#egparto").val(),
                        dias: $("#diasparto").val(),
                        peso: $("#pesomaterno").val(),
                        talla: $("#tallamaterna").val(),
                        imc: $("#imc").val(),
                        estado_nutricional: $("#estadonutricional").val(),
                        etnia: $("#etniamaterna").val(),
                        paridad: $("#paridadmaterna").val(),
                        tipo: $("#tipomaterna").val(),
                        lugar: $("#lugarparto").val(),
                        pesofetal: $("#pesofetal").val(),
                        tallafetal: $("#tallafetal").val(),
                        craneofetal: $("#craneo").val(),
                        apgar_uno: $("#apgar_uno").val(),
                        apgar_cinco: $("#apgar_cinco").val(),
                        sexo: $("#sexofetal").val(),
                        meconio: $("#meconio").val(),
                        ipn: $("#ipnparto").val(),
                        peso_eg: $("#pesoegparto").val(),
                        peso_eg_estado: $("#pesoegpartoestado").html(),
                        ipn_eg: $("#ipnegparto").val(),
                        ipn_eg_estado: $("#ipnegpartoestado").html(),
                        comentarios: $("#comentariosparto").val(),
                        hipoglicemia: $("#hipoglicemia").val(),
                        alta: $("#alta").val(),
                        protocolo_hipoglicemia: $("#protocolo_hipoglicemia").val()
                    }

                $.post("dashboard/actualizarPartos", data).done(function(result){
                    $('#cautivo\\.dialogo').modal("hide");
                    loadReadyPartos();
                });
            });

            $("#borrarparto").on("click", function(){
                var solicitud_id = $("#idpacienteparto").val()
                $.get("dashboard/deleteParto/" + solicitud_id).done(function(data){
                    $('#cautivo\\.dialogo').modal("hide");
                    loadReadyPartos();
                });
            });
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
        });

        $('#tabla\\.parto tr > td > button.informe').on("click", function(){
            let solicitud_id =  $(this).data("id");
            $('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"> <div class="modal-dialog modal-lgx h-100" role="document"> <div class="modal-content h-100"> <div class="modal-header"> <h5 class="modal-title">PDF parto y recién nacido</h5></div><div class="modal-body" id="cautivo.dialog.body"> </div><div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button> </div></div></div></div>');
            $("#cautivo\\.dialog\\.body").html('<iframe class="embed-responsive-item w-100 h-100" src="graph/informe_parto/'+ solicitud_id +'"></iframe>');
            $('#cautivo\\.dialogo').modal("show");
            
            $('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) { $(this).remove(); });
        });
    }
    else{
        $("#mensaje\\.resultado").removeClass("d-none");
    }
}

function buildPartosAjusteTable(data){
    $('#tabla\\.parto').empty();
    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Fecha de nacimiento</th><th>Semanas al parto</th><th>Accion</th></tr></thead><tbody>';
        //tabla para exámenes ecográficos
        $.each(data, function(i, value) {
            let fecha = value.fecha_parto.split('-');
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>'+ fecha +'</td><td>'+ value.semanas +'</td>';
            tabla += '<td><button class="btn ajuste btn-secondary mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Ajuste al parto</button></td></tr>';
        });
        tabla += '</tbody>';
        $('#tabla\\.parto').append(tabla);
        $('#tabla\\.parto tr > td > button.ajuste').on("click", function(){
            let solicitud_id =  $(this).data("id");
            $('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"> <div class="modal-dialog modal-lgx" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Ajuste al Peso RN</h5></div><div class="modal-body"> <div class="row"> <div class="col-6"> <div class="card"> <div class="card-body"> <div class="form-group row"> <label class="col-4">Edad gestacional al parto</label> <input type="text" class="form-control col-8" id="valoreg" disabled> </div><div class="form-group row"> <label class="col-4">Peso del recien nacido</label> <input type="text" class="form-control col-8" id="valorpesofetal" disabled> </div><div class="form-group row"> <label class="col-4">Talla Materna</label> <select id="tm" class="form-control col-8" disabled></select> </div><div class="form-group row"> <label class="col-4">Peso Materno</label> <select id="pesom" class="form-control col-8" disabled></select> </div><div class="form-group row"> <label class="col-4">IMC <small>((Peso/Talla)^2)</small></label> <input type="text" class="form-control col-8" id="valorimc" disabled> </div><div class="form-group row"> <label class="col-4">Estado Nutricional</label> <select id="imc" class="form-control col-8 bg-secondary text-white" disabled> <option value="1">Enflaquecida</option> <option value="2">Normal</option> <option value="3">SobrePeso</option> <option value="4" selected>Obesidad</option> </select> </div><div class="form-group row"> <label class="col-4">Paridad Materna</label> <select id="pm" class="form-control col-8 bg-secondary text-white" disabled> <option value="1" selected>Primípara</option> <option value="0">Multípara</option> </select> </div><div class="form-group row"> <label class="col-4">Sexo Neonatal</label> <select id="sn" class="form-control col-8 bg-secondary text-white" disabled> <option value="1" selected="">Femenino</option> <option value="0">Masculino</option> </select> </div><div class="form-group row"> <label class="col-4">Edad Materna</label> <select id="em" class="form-control col-8 bg-secondary text-white" disabled> <option value="1">&lt; 19</option> <option value="2">20 - 21</option> <option value="3">22 - 23</option> <option value="4">24 - 25</option> <option value="5">26 - 27</option> <option value="6" selected>&gt; 27</option> </select> </div><div class="form-group row"> <label class="col-4">Etnia Materna</label> <select id="apellm" class="form-control col-8 bg-secondary text-white" disabled> <option value="0">Ambos Caucásicos</option> <option value="2">Solo uno Caucásico</option> <option value="1" selected="">Ninguno Caucásico</option> </select> </div><div class="form-group row"> <label class="col-4">Nombre:</label> <input type="text" class="form-control col-8" id="nombre.paciente" disabled> </div><button class="btn btn-outline-info d-none" id="g3">Graficar percentil ajustado</button> </div></div></div><div class="col-6"> <div class="card"> <div class="card-body"> <div id="graficoAjustado"></div><p style="line-height: 2.5rem !important;">Pct. Peso / EG, sin ajuste: <span id="PesoEgeSAj" class="bg-secondary text-white p-2 rounded"></span>, <span id="pesoSACondicion" class="bg-secondary text-white p-2 rounded"></span> <br>Pct. Peso / EG, con ajuste: <span id="PesoEgeCAj" class="bg-secondary text-white p-2 rounded"></span>, <span id="pesoCACondicion" class="bg-secondary text-white p-2 rounded"></span></p><p>Percentil, medida estadística referenciada de 0 a 100, con el propósito de señalar gráficamente diferencias observadas respecto al percentil inicial, se muestran valores negativos (Ejemplo: pct -4) </p></div></div></div></div></div><div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button> </div></div></div></div>');
            for (var i = 35; i < 139; i++) {
                let option = '<option value="'+i+'">'+i+' kg.</option>';
                $("#pesom").append(option);
            }

            for (var i = 135; i < 189; i++) {
                let option = '<option value="'+i+'">'+i+' cms.</option>';
                $("#tm").append(option);
            }

            $('#g3').click(function() {
                tipografico = 0;
                var apell = 0;
                if ($("#apellm").val() == 2) {
                    apell = 1;
                } else {
                    apell = $("#apellm").val();
                }
                varMama.edad = $("#em").val();
                varMama.apellido = apell;
                varMama.paridad = $("#pm").val();
                RN = new RecienNacido($("#valorpesofetal").val(), 0, $("#valoreg").val());
                RN.sexo = $("#sn").val();
                var p90 = [0.2418159, -0.0038925, 0.0000168, -0.0130562, -0.0127872, -0.0034632, 0.0117179, 0.0021092, -0.9260631];
                var p10 = [-0.2639902, 0.0110356, -0.0001265, -0.0146183, -0.0134044, -0.0020684, 0.0092266, 0.0009001, 4.474501];
                for (i = 24; i < 43; i++) {
                    x = i - 24;
                    p90Pso[x] = Math.pow(10, ((i * p90[0]) + (Math.pow(i, 2) * p90[1]) + (Math.pow(i, 3) * p90[2]) + (p90[3] * $("#pm").val()) + (p90[4] * $("#sn").val()) + (p90[5] * apell) + (p90[6] * $("#imc").val()) + (p90[7] * $("#em").val()) + p90[8]));
                    p10Pso[x] = Math.pow(10, ((i * p10[0]) + (Math.pow(i, 2) * p10[1]) + (Math.pow(i, 3) * p10[2]) + (p10[3] * $("#pm").val()) + (p10[4] * $("#sn").val()) + (p10[5] * apell) + (p10[6] * $("#imc").val()) + (p10[7] * $("#em").val()) + p10[8]));;
                }

                $("#PesoEgeSAj").html(RN.pesoTemuco());
                $("#pesoSACondicion").html(RN.pesoTemucoCondicion());
                eg = RN.eg - 24;
                var uno, dos, tres;
                uno = p90Pso[eg] - p10Pso[eg];
                dos = RN.peso - p10Pso[eg];
                tres = parseInt((80 / (uno)) * (dos)) + 10;
        
                $("#PesoEgeCAj").html(tres);

                let condicion = "";
                if (RN.peso < p10Pso[eg]) {
                    condicion = "Pequeño";
                } else if (RN.peso <= p90Pso[eg]) {
                    condicion = "Adecuado";
                } else if (RN.peso > p90Pso[eg]) {
                    condicion = "Grande";
                }
                $("#pesoCACondicion").html(condicion);
                

                Highcharts.chart('graficoAjustado', {
                    title: {
                        text: 'Peso/Edad gestacional ajustada por variables para Curva Regional: Lagos y col. Rev. Chilena Obtet. Ginecol. 2009; 74(4).',
                        style: {
                            "color": "#337ab7",
                            "fontSize": "11px"
                        }
                    },
                    chart: {
                        backgroundColor: "rgba(0, 0, 0, 0)"
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        tickPositions: [400, 860, 1320, 1780, 2240, 2700, 3160, 3620, 4080, 4540, 4980],
                        tickColor: "#337ab7",
                        labels: {
                            enabled: true,
                            style: {
                                color: '#337ab7',
                            }
                        }
                    },
                    colors: ['#ff3300', '#ff3300', '#ff3300'],
                    xAxis: {
                        categories: ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42'],
                        labels: {
                            enabled: true,
                            style: {
                                color: '#337ab7',
                            }
                        }
                    },
                    credits: { enabled: false },
                    series: [{
                        type: "line",
                        name: 'Pct. 10',
                        marker: {
                            enabled: false
                        },
                        dashStyle: (function() {
                            var estilo = 'solid';
                            if (RN.ajustePequeno == true || RN.ajusteAlto == true) {
                                estilo = 'Dash';
                            }
                            return estilo;
                        }()),
                        color: (function() {
                            var color = '#003d99';
        
                            if (RN.ajusteAlto == true) {
                                color = '#ff3300';
                            }
                            return color;
                        }()),
                        data: (function() {
                            var data = [];
                            for (i = 24; i < 43; i++) {
                                x = i - 24;
                                data.push({
                                    y: p10Pso[x],
                                });
                            }
                            return data;
                        }())
                    }, {
                        type: "line",
                        name: 'Pct. 90',
                        marker: {
                            enabled: false
                        },
                        dashStyle: (function() {
                            var estilo = 'solid';
        
                            if (RN.ajustePequeno == true || RN.ajusteAlto == true) {
                                estilo = 'Dash';
                            }
        
                            return estilo;
                        }()),
                        color: (function() {
                            var color = '#003d99';
        
                            if (RN.ajusteAlto == true) {
                                color = '#ff3300';
                            }
                            return color;
                        }()),
                        data: (function() {
                            var data = [];
                            for (i = 24; i < 43; i++) {
                                x = i - 24;
                                data.push({
                                    y: p90Pso[x],
                                });
                            }
                            return data;
                        }())
                    }, {
                        type: "line",
                        name: 'Peso',
                        dashStyle: "Dot",
                        marker: {
                            symbol: 'square'
                        },
                        lineWidth: 0,
                        data: (function() {
                            var data = [];
        
                            for (i = 24; i <= (RN.eg - 1); i++) {
                                data.push({
                                    y: 0,
                                });
                            }
                            data.push({
                                y: parseInt(RN.peso),
                            });
                            for (i = RN.eg + 1; i <= 39; i++) {
                                data.push({
                                    y: 0,
                                });
                            }
                            return data;
                        }())
                    }]
                });
            });

            $('#tm').change(function() {
                varMama = new Mama($("#tm").val(), $("#pesom").val(), $("#em").val(), $('#apellm').val());
                $('#valorimc').val(varMama.imc());
                $('#imc').val(varMama.imcCondicion());
                $('#g3').trigger("click");
            });
        
            $('#pesom').change(function() {
                varMama = new Mama($("#tm").val(), $("#pesom").val(), $("#em").val(), $('#apellm').val());
                $('#valorimc').val(varMama.imc());
                $('#imc').val(varMama.imcCondicion());
                $('#g3').trigger("click");
            });
        
            $('#sn').change(function() {
                $('#g3').trigger("click");
            });
        
            $('#pm').change(function() {
                $('#g3').trigger("click");
            });
        
            $('#imc').change(function() { $('#g3').trigger("click"); });
        
            $('#em').change(function() { $('#g3').trigger("click"); });
        
            $('#apellm').change(function() { $('#g3').trigger("click"); });

            $.get('dashboard/agendar/' + solicitud_id).done(function(data){
                let edad = data.solicitud_ematerna;
                if (edad < 20){
                    document.getElementById("em").value = 1;
                }else if (edad < 22){
                    document.getElementById("em").value = 2;
                }else if (edad < 24){
                    document.getElementById("em").value = 3;
                }else if (edad < 26){
                    document.getElementById("em").value = 4;
                }else if (edad < 28){
                    document.getElementById("em").value = 5;
                }else if (edad > 27){
                    document.getElementById("em").value = 6;
                }
                $("#nombre\\.paciente").val(data.solicitud_nombre + " " + data.solicitud_apellido);
                $("#em").trigger("change");
            });
            $.get("dashboard/dataPartos/" + solicitud_id).done(function(data){
                $("#valoreg").val(data.semanas);
                $("#valorpesofetal").val(data.pesofetal);
                let sn = (data.sexo == "Masculino") ? 0 : 1;
                $("#sn").val(sn);
                let pm = (data.paridad == "Primípara") ? 1 : 0;
                $("#pm").val(pm);
                $("#pesom").val(data.peso); //
                $("#tm").val(data.talla).trigger("change");
                $("#apellm").val(data.etnia).trigger("change");
            });
            $('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) { $(this).remove(); });
        });
    }
    else{ $("#mensaje\\.resultado").removeClass("d-none"); }
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

function imcCondicionN(imc){
    if (imc < 20) {
        return 1;
    } else if (imc < 25) {
        return 2;
    } else if (imc <= 30) {
        return 3;
    } else if (imc > 30) {
        return 4;
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
    eg = eg - 24;

    var uno = pct90PesoNacional[eg] - pct10PesoNacional[eg];
    var dos = peso - pct10PesoNacional[eg];
    return parseInt((80 / (uno)) * (dos)) + 10;
}

function pesoEgCondicion(peso,eg){
    var pct10PesoNacional,pct90PesoNacional;
    pct10PesoNacional = [640.6, 666, 728.2, 822.9, 945.7, 1092.2, 1258.2, 1439.2, 1630.8, 1828.7, 2028.6, 2226, 2416.7, 2596.2, 2760.2, 2904.2, 3024.1, 3115.3, 3173.5];
    pct90PesoNacional = [897.9, 963.3, 1070.6, 1214.6, 1390.1, 1592, 1815, 2053.8, 2303.4, 2558.5, 2813.9, 3064.4, 3304.7, 3529.8, 3734.4, 3913.2, 4061.2, 4173, 4243.5];
    eg = eg - 24;

    if (peso < pct10PesoNacional[eg]) {
        return "Pequeño";
    } else if (peso <= pct90PesoNacional[eg]) {
        return "Adecuado";
    } else if (peso > pct90PesoNacional[eg]) {
        return "Grande";
    }
}

function ipnEg(ipn,eg){
    var pct10IpnNacional,pct90IpnNacional;
    pct10IpnNacional = [1.79, 1.83, 1.87, 1.91, 1.95, 1.99, 2.04, 2.08, 2.12, 2.16, 2.2, 2.25, 2.29, 2.33, 2.37, 2.41, 2.45, 2.5, 2.54];
    pct90IpnNacional = [2.54, 2.57, 2.59, 2.62, 2.65, 2.68, 2.71, 2.74, 2.77, 2.8, 2.83, 2.86, 2.89, 2.92, 2.95, 2.98, 3.01, 3.04, 3.07];
    eg = eg - 24;

    var uno = pct90IpnNacional[eg] - pct10IpnNacional[eg];
    var dos = ipn - pct10IpnNacional[eg];
    return parseInt((80 / (uno)) * (dos)) + 10;
}

function ipnEgCondicion(ipn,eg){
    var pct10IpnNacional,pct90IpnNacional;
    pct10IpnNacional = [1.79, 1.83, 1.87, 1.91, 1.95, 1.99, 2.04, 2.08, 2.12, 2.16, 2.2, 2.25, 2.29, 2.33, 2.37, 2.41, 2.45, 2.5, 2.54];
    pct90IpnNacional = [2.54, 2.57, 2.59, 2.62, 2.65, 2.68, 2.71, 2.74, 2.77, 2.8, 2.83, 2.86, 2.89, 2.92, 2.95, 2.98, 3.01, 3.04, 3.07];
    eg = eg - 24;

    if (ipn < pct10IpnNacional[eg]) {
        return "Enflaquecido";
    } else if (ipn <= pct90IpnNacional[eg]) {
        return "Eutrófico";
    } else if (ipn > pct90IpnNacional[eg]) {
        return "RN Obeso";
    }
}

var RN = 0;
var varMama = 0;
var p90Pso = [];
var p10Pso = [];

function RecienNacido(peso = 0, talla = 0, eg = 40) {
    this.peso = peso;
    this.talla = talla;
    this.eg = eg;
    this.ipn = function ipn() {
        var valor = this.peso / (Math.pow(this.talla, 3));
        valor = valor * 100000;
        return valor.toFixed(1);
    };
    this.pesoChile = function pesoChile() {
        eg = this.eg - 24;
        var tablas = new Tabla;
        var uno = tablas.pct90PesoNacional[eg] - tablas.pct10PesoNacional[eg];
        var dos = this.peso - tablas.pct10PesoNacional[eg];
        return parseInt((80 / (uno)) * (dos)) + 10;
    };
    this.pesoTemuco = function pesoTemuco() {
        eg = this.eg - 24;
        var tablas = new Tabla;
        var uno = tablas.pct90PesoTemuco[eg] - tablas.pct10PesoTemuco[eg];
        var dos = this.peso - tablas.pct10PesoTemuco[eg];
        return parseInt((80 / (uno)) * (dos)) + 10;
    };
    this.pesoAjustado = 0;
    this.pesoChileCondicion = function pesoChileC() {
        eg = this.eg - 24;
        var tablas = new Tabla;
        if (this.peso < tablas.pct10PesoNacional[eg]) {
            return "Pequeño";
        } else if (this.peso <= tablas.pct90PesoNacional[eg]) {
            return "Adecuado";
        } else if (this.peso > tablas.pct90PesoNacional[eg]) {
            return "Grande";
        }
    };
    this.pesoTemucoCondicion = function pesoTemucoC() {
        eg = this.eg - 24;
        var tablas = new Tabla;

        if (this.peso < tablas.pct10PesoTemuco[eg]) {
            return "Pequeño";
        } else if (this.peso <= tablas.pct90PesoTemuco[eg]) {
            return "Adecuado";
        } else if (this.peso > tablas.pct90PesoTemuco[eg]) {
            return "Grande";
        }
    };
    this.pesoAjutadoCondicion = '';
    this.ipnChile = function ipnChile() {
        var eg = this.eg - 24;
        var tablas = new Tabla;
        var uno = tablas.pct90IpnNacional[eg] - tablas.pct10IpnNacional[eg];
        var dos = this.ipn() - tablas.pct10IpnNacional[eg];
        return parseInt((80 / (uno)) * (dos)) + 10;
    };
    this.ipnTemuco = function ipnTemuco() {
        var eg = this.eg - 24;
        var tablas = new Tabla;
        var uno = tablas.pct90IpnTemuco[eg] - tablas.pct10IpnTemuco[eg];
        var dos = this.ipn() - tablas.pct10IpnTemuco[eg];
        return parseInt((80 / (uno)) * (dos)) + 10;
    };
    this.ipnChileCondicion = function ipnChileC() {
        var eg = this.eg - 24;
        var tablas = new Tabla;

        if (this.ipn() < tablas.pct10IpnNacional[eg]) {
            return "Enflaquecido";
        } else if (this.ipn() <= tablas.pct90IpnNacional[eg]) {
            return "Eutrófico";
        } else if (this.ipn() > tablas.pct90IpnNacional[eg]) {
            return "RN Obeso";
        }
    };
    this.ipnTemucoCondicion = function ipnTemucoC() {
        var eg = this.eg - 24;
        var tablas = new Tabla;

        if (this.ipn() < tablas.pct10IpnTemuco[eg]) {
            return "Enflaquecido";
        } else if (this.ipn() <= tablas.pct90IpnTemuco[eg]) {
            return "Eutrófico";
        } else if (this.ipn() > tablas.pct90IpnTemuco[eg]) {
            return "RN Obeso";
        }
    };
    this.sexo = '';
    this.ajustePequeno = false;
    this.ajusteAlto = false;
};

function Tabla(plataforma) {
    this.plataforma = plataforma;
    this.pct10IpnNacional = [1.79, 1.83, 1.87, 1.91, 1.95, 1.99, 2.04, 2.08, 2.12, 2.16, 2.2, 2.25, 2.29, 2.33, 2.37, 2.41, 2.45, 2.5, 2.54];
    this.pct90IpnNacional = [2.54, 2.57, 2.59, 2.62, 2.65, 2.68, 2.71, 2.74, 2.77, 2.8, 2.83, 2.86, 2.89, 2.92, 2.95, 2.98, 3.01, 3.04, 3.07];
    this.pct10PesoNacional = [640.6, 666, 728.2, 822.9, 945.7, 1092.2, 1258.2, 1439.2, 1630.8, 1828.7, 2028.6, 2226, 2416.7, 2596.2, 2760.2, 2904.2, 3024.1, 3115.3, 3173.5];
    this.pct90PesoNacional = [897.9, 963.3, 1070.6, 1214.6, 1390.1, 1592, 1815, 2053.8, 2303.4, 2558.5, 2813.9, 3064.4, 3304.7, 3529.8, 3734.4, 3913.2, 4061.2, 4173, 4243.5];
    this.pct10IpnTemuco = [1.95, 1.93, 1.92, 1.92, 1.94, 1.97, 2.01, 2.06, 2.11, 2.17, 2.23, 2.28, 2.33, 2.38, 2.41, 2.44, 2.44, 2.42, 2.39];
    this.pct90IpnTemuco = [2.43, 2.44, 2.46, 2.49, 2.53, 2.57, 2.62, 2.68, 2.74, 2.79, 2.85, 2.9, 2.95, 2.99, 3.02, 3.04, 3.05, 3.04, 3.01];
    this.pct10PesoTemuco = [600, 662, 739, 830, 938, 1064, 1208, 1373, 1565, 1756, 1970, 2192, 2415, 2628, 2820, 2978, 3089, 3120, 3123];
    this.pct90PesoTemuco = [800, 960, 1139, 1337, 1551, 1781, 2022, 2272, 2527, 2781, 3031, 3270, 3494, 3699, 3878, 4030, 4150, 4236, 4287];
    this.pct10PesoAjustado = [];
    this.pct90PesoAjustado = [];
};

function Mama(talla, peso, edad, apellido) {
    this.paridad = 0
    this.talla = talla;
    this.peso = peso;
    this.edad = edad;
    this.apellido = apellido;
    this.imc = function imc() {
        var valor = ((this.peso / (Math.pow(this.talla, 2))) * 10000);
        return valor.toFixed(1);
    };
    this.imcCondicion = function imcC() {
        if (this.imc() < 20) {
            return 1
        } else if (this.imc() < 25) {
            return 2
        } else if (this.imc() <= 30) {
            return 3
        } else if (this.imc() > 30) {
            return 4
        }
    };
};