$(document).ready(function(){
    $("#ciudad\\.nuevo").on("click", function(){createCarcasaCiudad();});

    $("#lugar\\.nuevo").on("click", function(){createCarcasaLugar();});

    loadDirectorio();
    loadCiudadesConfiguracion();
    loadLugaresConfiguracion();
    loadDiagnosticoConfiguracion();

    $("#directorio\\.nuevo").on("click", function(){createCarcasaDirectorio();});
    $("#diagnostico\\.nuevo").on("click", function(){createCarcasaDiagnostico();});
});

function loadDirectorio(){
    $.get("dashboard/directorio").done(function(data){
        $('#tabla\\.directorio\\.email').empty();
        $('#filtro\\.tipo').empty();
        $('#filtro\\.tipo').append('<option value="">No seleccionado</option>');
        $("#interfaz\\.email").empty();
        if (Object.keys(data).length > 0) {
            $.each(data, function(i, value) {
                var fila = '<tr><td>' + value.email_profesion + '</td><td>' + value.email_nombre + '</td><td>'+ value.email_value +'</td><td><button class="btn btn-danger" data-id="' + value.email_id + '">Eliminar</button></td></tr>';
                var opcion = '<option value="'+value.email_value+'">' + value.email_profesion + ', '+value.email_nombre +  ', '+value.email_value+'</option>';
                $("#interfaz\\.email").append(opcion);
                opcion = '<option value="'+value.email_value+'">' +value.email_value + '</option>';
                $('#filtro\\.tipo').append(opcion);
                $("#tabla\\.directorio\\.email").append(fila);
            });
        }

        $("#tabla\\.directorio\\.email .btn").on("click", function(){
            var id = $(this).data("id");

            $.get('dashboard/directorioDelete/'+id).done(function(data){
                loadDirectorio();
            });

        });
    });
}

function loadCiudadesConfiguracion(){
    $.get("dashboard/ciudades_configuracion").done(function(data){
        $('#tabla\\.ciudad\\.configuracion').empty();
        if (Object.keys(data).length > 0) {
            $.each(data, function(i, value) {
                var fila = '<tr><td>' + value.ciudad_id + '</td><td>' + value.ciudad_name + '</td><td><button class="btn btn-danger" data-id="' + value.ciudad_id + '">Eliminar</button></td></tr>';
                $("#tabla\\.ciudad\\.configuracion").append(fila);
            });
        }

        $("#tabla\\.ciudad\\.configuracion .btn").on("click", function(){
            var id = $(this).data("id");

            $.get('dashboard/ciudades_configuracion_delete/'+id).done(function(data){
                loadCiudadesConfiguracion();
                loadCiudadesSolicitud();
            });

        });
    });
}

function loadLugaresConfiguracion(){
    $.get("dashboard/lugares_configuracion").done(function(data){
        $('#tabla\\.lugar\\.configuracion').empty();
        if (Object.keys(data).length > 0) {
            $.each(data, function(i, value) {
                var fila = '<tr><td>' + value.lugar_id + '</td><td>' + value.lugar_name + '</td><td><button class="btn btn-danger" data-id="' + value.lugar_id + '">Eliminar</button></td></tr>';
                $("#tabla\\.lugar\\.configuracion").append(fila);
            });
        }

        $("#tabla\\.lugar\\.configuracion .btn").on("click", function(){
            var id = $(this).data("id");

            $.get('dashboard/lugares_configuracion_delete/'+id).done(function(data){
                loadLugaresConfiguracion();
                loadLugares();
            });

        });
    });
}

function loadDiagnosticoConfiguracion(){
    $.get("dashboard/diagnostico_configuracion").done(function(data){
        $('#tabla\\.diagnostico\\.configuracion').empty();
        if (Object.keys(data).length > 0) {
            $.each(data, function(i, value) {
                var fila = '<tr><td>' + value.diagnostico_id + '</td><td>' + value.diagnostico_name + '</td><td><button class="btn btn-danger" data-id="' + value.diagnostico_id + '">Eliminar</button></td></tr>';
                $("#tabla\\.diagnostico\\.configuracion").append(fila);
            });
        }

        $("#tabla\\.diagnostico\\.configuracion .btn").on("click", function(){
            var id = $(this).data("id");

            $.get('dashboard/diagnostico_configuracion_delete/'+id).done(function(data){
                loadDiagnosticoConfiguracion();
                loadDiagnostico();
            });

        });
    });
}

function createCarcasaDirectorio(){
    var modal_id, div_id;

    modal_id = uuidv4();
    div_id = uuidv4();
    btn_responder_id = uuidv4();

    var footerModal = '</div><div class="modal-footer"><button id="'+btn_responder_id+'" data-modal="'+modal_id+'" class="btn btn-primary">Guardar</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>';
    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="'+modal_id+'"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Nuevo destinatario</h5></div><div class="modal-body"> <div class="row" id="'+div_id+'"> <div class="col-4 form-group"> <label>Tipo de destinatario</label> <select class="form-control" id="modal.directorio.profesion"> <option value="Medico">Médico</option> <option value="Matrona">Matrona</option> <option value="Paciente">Paciente</option><option value="Administrativo">Administrativo</option><option value="Otros">Otros</option> </select> </div><div class="col-4 form-group"> <label>Nombre del destinatario</label> <input type="text" class="form-control" id="modal.directorio.nombre"> </div><div class="col-4 form-group"> <label>Email destinatario</label> <input type="email" class="form-control" id="modal.directorio.email"> </div></div>'+ footerModal);

    $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

    $('#'+btn_responder_id).on("click", function(){
        var modal_id = $(this).data("modal");
        
        $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><h3 class="text-danger text-center">ESTAMOS ENVIANDO SU RESPUESTA</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
        $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        let dav = {profesion: $("#modal\\.directorio\\.profesion").val(), nombre: $("#modal\\.directorio\\.nombre").val(), email: $("#modal\\.directorio\\.email").val()}
        
        $.post('dashboard/directorioSave', dav).done(function(data){
            $('#'+modal_id).modal("hide"); $('#mensaje\\.dialogo').modal("hide"); loadDirectorio();
        });
    });
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

function createCarcasaCiudad(){
    var modal_id, div_id;

    modal_id = uuidv4();
    div_id = uuidv4();
    btn_responder_id = uuidv4();

    var footerModal = '</div><div class="modal-footer"><button id="'+btn_responder_id+'" data-modal="'+modal_id+'" class="btn btn-primary">Guardar</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>';
    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="'+modal_id+'"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Nueva Ciudad</h5></div><div class="modal-body"> <div class="row" id="'+div_id+'"> <div class="col-4 form-group"> <label>Nombre de la ciudad</label> <input type="text" class="form-control" id="modal.ciudad.nombre"> </div></div>'+ footerModal);

    $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

    $('#'+btn_responder_id).on("click", function(){
        var modal_id = $(this).data("modal");
        
        $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><h3 class="text-danger text-center">Guardando, espere...</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
        $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        let dav = {ciudad_name: $("#modal\\.ciudad\\.nombre").val()}
        
        $.post('dashboard/ciudadSave', dav).done(function(data){
            $('#'+modal_id).modal("hide"); $('#mensaje\\.dialogo').modal("hide"); loadCiudadesConfiguracion(); loadCiudadesSolicitud();
        });
    });
}

function createCarcasaLugar(){
    var modal_id, div_id;

    modal_id = uuidv4();
    div_id = uuidv4();
    btn_responder_id = uuidv4();

    var footerModal = '</div><div class="modal-footer"><button id="'+btn_responder_id+'" data-modal="'+modal_id+'" class="btn btn-primary">Guardar</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>';
    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="'+modal_id+'"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Nuevo Lugar</h5></div><div class="modal-body"> <div class="row" id="'+div_id+'"> <div class="col-4 form-group"> <label>Nombre del lugar</label> <input type="text" class="form-control" id="modal.lugar.nombre"> </div></div>'+ footerModal);

    $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

    $('#'+btn_responder_id).on("click", function(){
        var modal_id = $(this).data("modal");
        
        $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><h3 class="text-danger text-center">Guardando, espere...</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
        $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        let dav = {lugar_name: $("#modal\\.lugar\\.nombre").val()}
        
        $.post('dashboard/lugarSave', dav).done(function(data){
            $('#'+modal_id).modal("hide"); $('#mensaje\\.dialogo').modal("hide"); loadLugaresConfiguracion(); loadLugares();
        });
    });
}

function createCarcasaDiagnostico(){
    var modal_id, div_id;

    modal_id = uuidv4();
    div_id = uuidv4();
    btn_responder_id = uuidv4();

    var footerModal = '</div><div class="modal-footer"><button id="'+btn_responder_id+'" data-modal="'+modal_id+'" class="btn btn-primary">Guardar</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>';
    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="'+modal_id+'"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Nuevo motivo</h5></div><div class="modal-body"> <div class="row" id="'+div_id+'"> <div class="col-4 form-group"> <label>Nombre del Motivo de exámen</label> <input type="text" class="form-control" id="modal.diagnostico.nombre"> </div></div>'+ footerModal);

    $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

    $('#'+btn_responder_id).on("click", function(){
        var modal_id = $(this).data("modal");
        
        $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><h3 class="text-danger text-center">Guardando, espere...</h3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
        $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        let dav = {diagnostico_name: $("#modal\\.diagnostico\\.nombre").val()}
        
        $.post('dashboard/diagnosticoSave', dav).done(function(data){
            $('#'+modal_id).modal("hide"); $('#mensaje\\.dialogo').modal("hide"); loadDiagnosticoConfiguracion(); loadDiagnostico();
        });
    });
}