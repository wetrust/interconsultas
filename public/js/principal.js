$(document).ready(function(){
    loadNews();
    //cargarCorreosProfesionales();
    //cargarCiudad();
    //cargarLugar();

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

    $(".linkemail").on("click", function(){
        callModal($(this).data("informe"), $(this).data("solicitud"));
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
            if (Object.keys(data).length > 0) {
                let response = '<option value=""></option>';
                
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

                    response = '<tr><td>'+ value.solicitud_id +'</td><td>'+ value.solicitud_nombre +'</td><td>'+ value.solicitud_ciudad +'</td><td>'+ value.fecha +'</td><td>'+ tipo +'</td>';
                    
                    if (value.tipo == "1"){
                        response += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_primertrimestre/' + value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
                    } else if (value.tipo == "0"){
                        response += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_dopplercrecimiento/' + value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
                    } else  if (value.tipo == "2"){
                        response += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_segundotrimestre/' + value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
                    } else  if (value.tipo == "3"){
                        response += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_ginecologico/' + value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
                    }
                    
                    response += '<td><a class="btn btn-danger" href="' + _URL + 'dashboard/delete/' + value.solicitud_id + '">Eliminar</a></td>';
                    response += '</tr>';
                    $('#tabla\\.resuelta').append(response);
                });                    
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
            var tabla = '';

            $.each(data, function(i, value) {

                tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_rut + '</td><td>'+ value.solicitud_fecha +'</td><td>' + value.solicitud_diagnostico +'</td>';

                tabla += '<td><btn class="btn btn-secondary">Ver</button></td></tr>';
            });
            $('#tabla\\.resultado').append(tabla);
        }
    });
}