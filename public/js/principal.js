$(document).ready(function(){
    loadNews();
    cargarCorreosProfesionales();
    cargarCiudad();
    cargarLugar();

    $('.btn-group-toggle .btn').on("click", function(){
        let valor = parseInt($(this).find('input').val());

        if (valor == 1){
            loadNews();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none");
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

        if (toggle){
            $("#filtro\\.contenedor").removeClass("d-none");
        }else{
            $("#filtro\\.contenedor").addClass("d-none");
        }
    });

    $("#filtro\\.accion").on("click", function(){

        let ciudad = $("#filtro\\.ciudad option:selected").val();
        let lugar = $("#filtro\\.lugar option:selected").val();
        let desde = $("#filtro\\.fecha").val();
        let hasta = $("#filtro\\.fecha\\.hasta").val();
        let tipo = $("#filtro\\.tipo option:selected").val();

        let args = {
            ciudad: ciudad,
            lugar: lugar,
            desde: desde,
            hasta: hasta,
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
        $("#filtro\\.tipo").val(8);
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

                    tabla += '<tr><td>' + value.solicitud_id + '</td><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.fecha +'</td><td>' + tipo +'</td>';

                    if (value.tipo == "1"){
                        tabla += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_primertrimestre/' + value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
                    } else if (value.tipo == "0"){
                        tabla += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_dopplercrecimiento/' + value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
                    } else  if (value.tipo == "2"){
                        tabla += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_segundotrimestre/' + value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
                    } else  if (value.tipo == "3"){
                        tabla += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_ginecologico/' + value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
                    }

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

        if (selecciono){
            email = $("#interfaz\\.email option:selected").val();
        }
        else{
            email = $("#interfaz\\.email\\.write").val();
        }

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

function cargarCorreosProfesionales(){
    $.get(_api + 'profesionales_email').done(function(data){
        $('#interfaz\\.email').empty();
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            for (let i = 0; i < data.length; i++) {
                response = '<option value="' + data[i].solicitud_email +'">' + data[i].solicitud_email +'</option>';
            }
            $('#interfaz\\.email').append(response);
        }
    });
}

function cargarCiudad(){
    $.get(_api + 'ciudades').done(function(data){
        $('#filtro\\.ciudad').empty();
        $('#filtro\\.ciudad').append('<option value="">No Seleccionado</option>');
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            $.each(data, function(i, value) {
                response = '<option value="' + value.solicitud_ciudad +'">' + value.solicitud_ciudad +'</option>';
                $('#filtro\\.ciudad').append(response);
            });
        }
    });
}

function cargarLugar(){
    $.get(_api + 'lugar').done(function(data){
        $('#filtro\\.lugar').empty();
        $('#filtro\\.lugar').append('<option value="">No Seleccionado</option>');
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

    $("#exampleModal").data("informe", informe);
    $("#exampleModal").data("solicitud", solicitud);

    $("#exampleModal").modal("show");
}

function loadNews(){
    $.get('dashboard/news').done(function(data){
        $('#tabla\\.resultado').empty();
        
        if (Object.keys(data).length > 0) {
            var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Rut</th><th>Fecha</th><th>Diagnóstico</th><th>Accion</th></tr></thead><tbody>';

            $.each(data, function(i, value) {

                tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_rut + '</td><td>'+ value.solicitud_fecha +'</td><td>' + value.solicitud_diagnostico +'</td>';

                tabla += '<td><button class="btn btn-secondary" data-id='+ value.solicitud_id + '>Ver</button></td></tr>';
            });

            tabla += '</tbody>';
            
            $('#tabla\\.resultado').append(tabla);
        }

        $('#tabla\\.resultado tr > td > button').on("click", function(){
            let solicitud_id =  $(this).data("id");
            $('#ver\\.interconsulta\\.contenedor').empty();
            $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="dashboard/agendar/'+ solicitud_id+'"></iframe>')
            $("#ver\\.interconsulta").modal("show");
            $("#ver\\.interconsulta\\.footer").empty();
            $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta\\.contenedor > iframe").attr("src", "dashboard/delete/" + solicitud_id);
                $("#ver\\.interconsulta").modal("hide");
                loadNews();
            });
        });
    });
}

function loadInProcess(){
    $.get('dashboard/process').done(function(data){
        $('#tabla\\.resultado').empty();
        
        if (Object.keys(data).length > 0) {
            var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Rut</th><th>Fecha</th><th>Diagnóstico</th><th>Accion</th></tr></thead><tbody>';

            $.each(data, function(i, value) {

                tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_rut + '</td><td>'+ value.solicitud_fecha +'</td><td>' + value.solicitud_diagnostico +'</td>';

                tabla += '<td><button class="btn btn-secondary" data-id='+ value.solicitud_id + '>Ver</button></td></tr>';
            });

            tabla += '</tbody>';
            $('#tabla\\.resultado').append(tabla);
        }

        $('#tabla\\.resultado tr > td > button').on("click", function(){
            let solicitud_id =  $(this).data("id");
            $('#ver\\.interconsulta\\.contenedor').empty();
            $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="dashboard/edit/'+ solicitud_id+'"></iframe>')
            $("#ver\\.interconsulta").modal("show");
            $("#ver\\.interconsulta\\.footer").empty();
            $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta\\.contenedor > iframe").attr("src", "dashboard/delete/" + solicitud_id);
                $("#ver\\.interconsulta").modal("hide");
                loadInProcess();
            });
        });
    });
}

function loadInFinish(){
    $.get('dashboard/finish').done(function(data){
        buildFinishTable(data);
    });
}

function buildFinishTable(data){
    $('#tabla\\.resultado').empty();
        
    if (Object.keys(data).length > 0) {
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Fecha</th><th>Tipo de exámen</th><th>Accion</th></tr></thead><tbody>';

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

            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.fecha +'</td><td>' + tipo +'</td>';

            tabla += '<td><button class="btn btn-secondary" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Ver</button></td></tr>';
        });

        tabla += '</tbody>';
        $('#tabla\\.resultado').append(tabla);

        $('#tabla\\.resultado tr > td > button').on("click", function(){
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
            }

            $('#ver\\.interconsulta\\.contenedor').empty();
            $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'"></iframe>')
            $("#ver\\.interconsulta").modal("show");
            $("#ver\\.interconsulta\\.footer").empty();
            $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-primary" id="ver.interconsulta.enviar" data-id="'+solicitud_id+'" data-informe="'+ tipo +'">Enviar</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta\\.contenedor > iframe").attr("src", "dashboard/delete/" + solicitud_id);
                $("#ver\\.interconsulta").modal("hide");
                loadInProcess();
            });

            $("#ver\\.interconsulta\\.enviar").on("click", function(){
                callModal($(this).data("informe"), $(this).data("id"));
            });
        });
    }
}