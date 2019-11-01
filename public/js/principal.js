var nombreprofesionalPegar = "";
$(document).ready(function(){
    loadReferentes();
    
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
                    let fecha = value.solicitud_fecha.split('-');
                    fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
                    tabla += '<tr><td>' + value.solicitud_id + '</td><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ fecha +'</td><td>' + tipo +'</td>';
                    tabla += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_';
                    if (value.tipo == "1"){
                        tabla += 'primertrimestre/';
                    } else if (value.tipo == "0"){
                        tabla += 'dopplercrecimiento/';
                    } else  if (value.tipo == "2"){
                        tabla += 'segundotrimestre/';
                    } else  if (value.tipo == "3"){
                        tabla += 'ginecologico/';
                    }
                    tabla += value.solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ value.tipo +' data-solicitud=' + value.solicitud_id + '>Reenviar</a></td>';
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

function callModal(informe, solicitud){
    $("#exampleModal").data("informe", informe).data("solicitud", solicitud).modal("show");
}

function loadNews(){
    $.get('dashboard/news').done(function(data){
        $('#tabla\\.resultado').empty();
        if (Object.keys(data).length > 0) {
            $("#mensaje\\.resultado").addClass("d-none");
            var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Motivo de exámen</th><th>Solicitado</th><th>Accion</th></tr></thead><tbody>';
            $.each(data, function(i, value) {
                let fecha = value.solicitud_fecha.split('-');
                fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
                tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + value.solicitud_diagnostico +'</td><td>'+ fecha +'</td>';
                tabla += '<td><button class="btn btn-secondary" data-id='+ value.solicitud_id + '>Agendar</button></td></tr>';
            });
            tabla += '</tbody>';
            $('#tabla\\.resultado').append(tabla);
            $('#tabla\\.resultado tr > td > button').on("click", function(){
                let solicitud_id =  $(this).data("id");
                var contenedor = createCarcasaNuevasModal(solicitud_id);
                createNuevasModal(solicitud_id, contenedor);
            });
        }
        else{
            $("#mensaje\\.resultado").removeClass("d-none").html("No tienes interconsultas nuevas");
        }
    });
}

function createCarcasaNuevasModal(id){
    var modal_id, div_id;

    modal_id = uuidv4();
    div_id = uuidv4();
    btn_id = uuidv4();
    btn_responder_id = uuidv4();

    var footerModal = '</div><div class="modal-footer"><button id="'+btn_responder_id+'" data-id="'+id+'" data-modal="'+modal_id+'" class="btn btn-primary">Enviar respuesta</button><button type="button" class="btn btn-danger" id="'+btn_id+'" data-id="'+id+'" data-modal="'+modal_id+'">Cancelar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Volver</button></div></div></div></div>';
    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="'+modal_id+'"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Interconsulta</h5></div><div class="modal-body"><div class="row" id="'+div_id+'"><div class="progress col-12 my-4"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><strong>CARGANDO</strong></div></div></div><div class="row g-verde"><div class="col-4 my-2 form-group"><label class="text-white">Fecha</label><input type="date" class="form-control" id="evaluacion_fecha"></div><div class="col my-2 form-group"><label class="text-white"><strong>Comentario</strong></label><input type="text" class="form-control" id="comentario"> </div></div>'+ footerModal);

    $("#evaluacion_fecha").val(setInputDate());

    $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
    $('#'+btn_responder_id).on("click", function(){
        var modal_id = $(this).data("modal");
        var solicitud_id = $(this).data("id");
        $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><h3 class="text-danger text-center">ESTAMOS ENVIANDO SU RESPUESTA</H3></div></div></div></div>');
        $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });
        let dav = {
            solicitud_id: solicitud_id,
            evaluacion_fecha: $("#evaluacion_fecha").val(),
            comentario: $("#comentario").val()
        }
        $.post('dashboard/editSave', dav).done(function(data){
            $('#'+modal_id).modal("hide");
            $("#interconsultas\\.estado\\.espera").button('toggle').trigger("click");
            $('#mensaje\\.dialogo').modal("hide");
        });
    });
    $("#"+btn_id).on("click", function(){
        let solicitud_id =  $(this).data("id");
        let modal_id = $(this).data("modal");
        $.get("dashboard/delete/" + solicitud_id).done(function(){loadNews();});
        $('#'+modal_id).modal("hide");
    });

    return div_id;
}

function createNuevasModal(id, contenedor){
    $.get('dashboard/agendar/' + id).done(function(data){
        $('#'+contenedor).empty().append('<input type="hidden" id="an"><div class="col-4"> <label><small>Nombre del paciente:</small></label> <p id="bn"></p></div><div class="col-4"> <label><small>RUT del paciente:</small></label> <p id="cn"></p></div><div class="col-4"> <label><small>Teléfono materno:</small></label> <p id="dn"></p></div><div class="col-4 form-group"> <label><small>Ciudad procedencia de la paciente</small></label> <p id="kn"></p></div><div class="col-4 form-group"> <label><small>Lugar de control prenatal</small></label> <p id="ln"></p></div><div class="col-4"> <label><small>Fecha solicitud del exámen:</small></label> <p id="en"></p></div><div class="col-4"> <label><small>FUM operacional</small></label> <p id="fn"></p></div><div class="col-4"> <label><small>Edad Gestacional (Ege)</small></label> <p id="gn"></p></div><div class="col-4 form-group"> <label><small>Motivo de exámen</small></label> <p id="jn"></p></div><div class="col-4 form-group"> <label><small>Nombre del profesional referente:</small></label> <p id="lln"></p></div><div class="col-4 form-group"> <label><small>Email (de trabajo):</small></label> <p id="mn"></p></div>');
        $("#an").val(data.solicitud_id);
        $("#bn").html('<strong class="text-primary">'+data.solicitud_nombre+'</strong>');
        $("#cn").html('<strong class="text-primary">'+data.solicitud_rut+'</strong>');
        $("#dn").html('<strong class="text-primary">'+data.solicitud_telefono+'</strong>');
        let fecha = data.solicitud_fecha.split('-');
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        $("#en").html('<strong class="text-primary">'+fecha+'</strong>');
        fecha = data.solicitud_fum.split('-');
        fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
        $("#fn").html('<strong class="text-primary">'+fecha+'</strong>');
        $("#gn").html('<strong class="text-primary">'+data.solicitud_egestacional+'</strong>');
        $("#jn").html('<strong class="text-primary">'+data.solicitud_diagnostico+'</strong>');
        $("#kn").html('<strong class="text-primary">'+data.solicitud_ciudad+'</strong>');
        $("#ln").html('<strong class="text-primary">'+data.solicitud_lugar+'</strong>');
        $("#lln").html('<strong class="text-primary">'+data.solicitud_nombreprofesional+'</strong>');
        $("#mn").html('<strong class="text-primary">'+data.solicitud_email+'</strong>');

        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear()+"-"+(month)+"-"+(day);
        $("#evaluacion_fecha").val(today);
    });
}

function loadInProcess(){
    $("#tabla\\.resultado").removeClass("d-none");
    $("#mensaje\\.resultado").removeClass("d-none");
    $("#card\\.header").addClass("d-none");
    $("#formulario\\.solicitud").addClass("d-none");
    $.get('dashboard/process').done(function(data){
        $('#tabla\\.resultado').empty();
        if (Object.keys(data).length > 0) {
            loadInProcessData(data);
        }
        else{
            $("#mensaje\\.resultado").removeClass("d-none");
            $("#mensaje\\.resultado").html("No tienes interconsultas en espera");
        }
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
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><td><span class="text-primary">Nombre paciente</span></td><td><span class="text-primary">Ciudad</span></td><td><span class="text-primary">Lugar de control</span></td><td><span class="text-primary">Tipo de exámen</span></td><td><span class="text-primary">Email referente</span></td><td><span class="text-primary">Realizado</span></td><td><span class="text-primary">Accion</span></td></tr></thead><tbody>';
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
            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + tipo +'</td><td>' + value.solicitud_email +'</td><td>'+ fecha +'</td>';
            tabla += '<td><button class="btn btn-secondary informe mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Informe</button>';
            if (value.tipo == "0" || value.tipo == "2"){
                tabla += '<button class="btn btn-secondary grafico" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Graficas</button>';
            }
            tabla += '</td></tr>';
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

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}