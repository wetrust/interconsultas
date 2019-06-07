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
            $('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"> <div class="modal-dialog modal-lgx" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Datos del parto y recién nacido</h5></div><div class="modal-body"> <div class="form-row"> <input type="hidden" class="form-control" id="idpacienteparto"> <div class="col-md-12"> <h6><strong>Datos maternos</strong></h6> </div><div class="form-group col-md-3"> <label for="nombreparto">Nombre</label> <input type="text" class="form-control" id="nombreparto" disabled> </div><div class="form-group col-md-3"> <label for="rutparto">RUT</label> <input type="text" class="form-control" id="rutparto" disabled> </div><div class="form-group col-md-3"> <label for="fechaparto">Fecha de parto</label> <input type="date" class="form-control" id="fechaparto"> </div><div class="form-group col-md-3"> <label for="lugarparto">Lugar de Parto</label> <input type="text" class="form-control" id="lugarparto"> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="pesomaterno">Peso Materno</label> <select class="form-control" id="pesomaterno"></select> </div><div class="form-group col-md-3"> <label for="tallamaterna">Talla Materna</label> <select class="form-control" id="tallamaterna"></select> </div><div class="form-group col-md-3"> <label for="rutparto">IMC (peso * talla)&#94;2</label> <input type="text" class="form-control" id="imc" disabled> </div><div class="form-group col-md-3"> <label for="nombreparto">Estado nutricional</label> <input type="text" class="form-control" id="estadonutricional" disabled> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="etniamaterna">Etnia materna</label> <select class="form-control" id="etniamaterna"> <option value="0">Ambos Caucásicos</option> <option value="2">Solo uno Caucásico</option> <option value="1" selected>Ninguno Caucásico</option> </select> </div><div class="form-group col-md-3"> <label for="paridadmaterna">Paridad</label> <select class="form-control" id="paridadmaterna"> <option value="Primípara" selected>Primípara</option> <option value="Multípara">Multípara</option> </select> </div><div class="form-group col-md-3"> <label for="tipomaterna">Tipo de parto</label> <select class="form-control" id="tipomaterna"> <option value="Vaginal" selected>Vaginal</option> <option value="Cesarea">Cesárea</option> </select> </div></div><div class="form-row"> <div class="col-md-12"> <h6><strong>Datos neonatales</strong></h6> </div><div class="form-group col-md-3"> <label for="egparto">Edad gestacional</label> <select class="form-control" id="egparto"></select> </div><div class="form-group col-md-3"> <label for="pesofetal">Peso fetal (grs)</label> <input type="number" class="form-control" id="pesofetal"> </div><div class="form-group col-md-3"> <label for="tallafetal">Talla (mm)</label> <input type="number" class="form-control" id="tallafetal"> </div><div class="form-group col-md-3"> <label for="craneo">Cráneo (mm)</label> <input type="password" class="form-control" id="craneo"> </div></div><div class="form-row"> <div class="form-group col-md-3"> <label for="apgar_uno">Apgar 1</label> <select class="form-control" id="apgar_uno"> <option value="0" selected>0</option> <option value="1" selected>1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </div><div class="form-group col-md-3"> <label for="apgar_cinco">Apgar 5</label> <select class="form-control" id="apgar_cinco"> <option value="0" selected>0</option> <option value="1" selected>1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </div><div class="form-group col-md-3"> <label for="sexofetal">Sexo RN</label> <select class="form-control" id="sexofetal"> <option value="Femenino" selected>Femenino</option> <option value="Masculino">Masculino</option> </select> </div><div class="form-group col-md-3"> <label for="meconio">Meconio</label> <select class="form-control" id="meconio"> <option value="Si" selected>Si</option> <option value="No">No</option> </select> </div></div><div class="form-row"> <div class="col-md-12"> <h6><strong>Datos neonatales calculados</strong></h6> </div><div class="form-group col-md-4"> <label for="ipnparto">IPN</label> <select class="form-control" id="ipnparto"></select> </div><div class="form-group col-md-4"> <label for="pesoegparto">Peso/EG</label> <input type="number" class="form-control" id="pesoegparto"> </div><div class="form-group col-md-4"> <label for="ipnegparto">IPN/EG</label> <input type="number" class="form-control" id="ipnegparto"> </div></div><div class="form-row"> <div class="form-group col-md-12"> <label for="comentariosparto">Comentarios</label> <input type="text" class="form-control" id="comentariosparto"> </div></div></div><div class="modal-footer"> <button type="button" class="btn btn-primary" id="guardarparto">Guardar</button> <button type="button" class="btn btn-danger" id="borrarparto">Borrar</button> <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button> </div></div></div></div>');
            
            for (var i = 35; i < 139; i++) {
                let option = '<option value="'+i+'">'+i+' kg.</option>';
                $("#pesomaterno").append(option);
            }
            
            for (var i = 135; i < 189; i++) {
                let option = '<option value="'+i+'">'+i+' cms.</option>';
                $("#tallamaterna").append(option);
            }

            for (var i = 25; i < 42; i++) {
                let option = '<option value="'+i+'">'+i+' semanas.</option>';
                $("#egparto").append(option);
            }
            $.get("dashboard/baseParto/" + solicitud_id).done(function(data){
                $("#nombreparto").val(data.solicitud_nombre);
                $("#rutparto").val(data.solicitud_rut);
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