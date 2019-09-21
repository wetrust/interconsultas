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

    $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
    $('#'+btn_responder_id).on("click", function(){
        var modal_id = $(this).data("modal");
        var solicitud_id = $(this).data("id");
        $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><h3 class="text-danger text-center">ESTAMOS ENVIANDO SU RESPUESTA</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
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
        $('#'+contenedor).empty().append('<input type="hidden" id="an"><div class="col-4"> <label><small>Nombre del paciente:</small></label> <p id="bn"></p></div><div class="col-4"> <label><small>RUT del paciente:</small></label> <p id="cn"></p></div><div class="col-4"> <label><small>Teléfono materno:</small></label> <p id="dn"></p></div><div class="col-4 form-group"> <label><small>Ciudad procedencia de la paciente</small></label> <p id="kn"></p></div><div class="col-4 form-group"> <label><small>Lugar de control prenatal</small></label> <p id="ln"></p></div><div class="col-4"> <label><small>Fecha solicitud del exámen:</small></label> <p id="en"></p></div><div class="col-4"> <label><small>FUM operacional</small></label> <p id="fn"></p></div><div class="col-4"> <label><small>Edad Gestacional (Ege)</small></label> <p id="gn"></p></div><div class="col-4 form-group"> <label><small>Diagnóstico de referencia</small></label> <p id="jn"></p></div><div class="col-4 form-group"> <label><small>Nombre del profesional referente:</small></label> <p id="lln"></p></div><div class="col-4 form-group"> <label><small>Email (de trabajo):</small></label> <p id="mn"></p></div>');
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

function loadInProcessData(data){
            $("#mensaje\\.resultado").addClass("d-none");
            var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Telefono</th><th>Ciudad</th><th>Motivo de exámen</th><th>Agendada</th><th>Confirmada</th><th>Accion</th></tr></thead><tbody>';
            $.each(data, function(i, value) {
                let fecha = value.evaluacion_fecha.split('-');
                fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
                tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_telefono + '</td><td>'+ value.solicitud_ciudad +'</td><td>' + value.solicitud_diagnostico +'</td><td>'+fecha+'</td><td>'+ value.solicitud_confirmada+'</td>';
                if (value.solicitud_confirmada == 'Si'){
                    tabla += '<td><button class="btn examen btn-secondary" data-id='+ value.solicitud_id + '>Ir a examen</button></td></tr>';
                }
                else{
                    tabla += '<td><button class="btn confirmar btn-secondary" data-id='+ value.solicitud_id + '>Confirmar fecha de eco</button><button class="btn reagendar btn-secondary" data-id='+ value.solicitud_id + '>Reagendar paciente</button></td></tr>';
                }
            });
            tabla += '</tbody>';
            $('#tabla\\.resultado').append(tabla);
            $('#tabla\\.resultado tr > td > button.confirmar').on("click", function(){
                let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta > div").removeClass("h-100");
                $("#ver\\.interconsulta > div > div").removeClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("Confirmar interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty().append('<input type="hidden" id="solicitud_id" value=""/><div class="row"> <div class="col-3 form-group"> <label for="interconsulta.para">Fecha</label> <input type="text" disabled class="form-control" id="evaluacion_fecha"> </div><div class="col form-group"> <label for="interconsulta.comentario.respuesta">Comentario</label> <input disabled class="form-control" id="evaluacion_comentarios"/> </div></div>');
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button class="btn btn-primary" id="enviar.respuesta.botton">Confirmar agendamiento</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
                $("#solicitud_id").val(solicitud_id);
                $.get('dashboard/edit/' + solicitud_id).done(function(data){
                    $("#evaluacion_fecha").val(data.evaluacion_fecha);
                    $("#evaluacion_comentarios").val(data.evaluacion_comentarios);
                });
                $("#enviar\\.respuesta\\.botton").on("click", function(){
                    var data = {
                        solicitud_id: $("#solicitud_id").val()
                    }
                    $.post('dashboard/confirmar',data).done(function(response){
                        loadInProcess();
                        $("#ver\\.interconsulta").modal("hide");
                    });
                });
            });
            $('#tabla\\.resultado tr > td > button.reagendar').on("click", function(){
                let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta > div").removeClass("h-100");
                $("#ver\\.interconsulta > div > div").removeClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("Cambiar fecha de interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty().append('<input type="hidden" id="solicitud_id" value=""/><div class="row"> <div class="col-3 form-group"> <label for="interconsulta.para">Fecha</label> <input type="date" class="form-control" id="evaluacion_fecha"> </div><div class="col form-group"> <label for="interconsulta.comentario.respuesta">Comentario</label> <input class="form-control" id="evaluacion_comentarios"/> </div></div>');
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button class="btn btn-primary" id="enviar.respuesta.botton">Reagendar</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
                $("#solicitud_id").val(solicitud_id);
                $.get('dashboard/edit/' + solicitud_id).done(function(data){
                    $("#evaluacion_fecha").val(data.evaluacion_fecha);
                    $("#evaluacion_comentarios").val(data.evaluacion_comentarios);
                });
                $("#enviar\\.respuesta\\.botton").on("click", function(){
                    var data = {
                        solicitud_id: $("#solicitud_id").val(),
                        solicitud_fecha: $("#evaluacion_fecha").val(),
                        solicitud_comentarios: $("#evaluacion_comentarios").val()
                    }
                    $.post('dashboard/reagendar',data).done(function(response){
                        loadInProcess();
                        $("#ver\\.interconsulta").modal("hide");
                    });
                });
            });
            $('#tabla\\.resultado tr > td > button.examen').on("click", function(){
                let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta > div").removeClass("h-100");
                $("#ver\\.interconsulta > div > div").removeClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("Formulario solicitud exámen ecográfico");
                $('#ver\\.interconsulta\\.contenedor').empty().append('<div class="card-header bg-secondary" id="headingOne"> <button class="btn btn-link text-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Ver Datos clínicos de la interconsulta (Abrir / Cerrar)</button></div><div id="collapseOne" class="collapse border " aria-labelledby="headingOne" data-parent="#ver\\.interconsulta\\.contenedor"> <div class="card-body"> <input type="hidden" id="solicitud_id" value=""/> <div class="row"> <div class="col form-group"> <label>Nombre del paciente:</label> <input type="text" class="form-control" disabled id="solicitud_nombre"> </div><div class="col form-group"> <label>Fecha de solicitud:</label> <input type="text" class="form-control" disabled id="solicitud_fecha"> </div><div class="col form-group"> <label>FUM operacional</label> <input type="date" class="form-control" disabled id="solicitud_fum"> </div><div class="col form-group"> <label>Edad Gestacional</label> <input type="text" class="form-control" disabled id="solicitud_egestacional"> </div></div><div class="row"> <div class="col form-group"> <label>RUT del paciente:</label> <input type="text" class="form-control" disabled id="solicitud_rut"> </div><div class="col form-group"> <label>Paridad</label> <input type="text" class="form-control" name="respuesta_paridad" disabled=""> </div><div class="col form-group"> <label>Ciudad de procedencia</label> <input type="text" class="form-control" disabled id="solicitud_ciudad"> </div><div class="col form-group"> <label>Lugar de control habitual</label> <input type="text" class="form-control" disabled id="solicitud_lugar"> </div></div><div class="row"> <div class="col my-2 form-group"> <label>Diagnóstico de referencia a exámen ecográfico</label> <input type="text" class="form-control" disabled id="solicitud_diagnostico"> </div><div class="col my-2 form-group"> <label>Otros antecedentes clínicos relevantes</label> <input type="text" class="form-control" name="respuesta_antecedentes" disabled=""> </div></div><div class="row"> <div class="col form-group"> <label>Datos del profesional referente</label> <input type="text" class="form-control" disabled id="interconsulta_profesional"> </div><div class="col form-group"> <label>Nombre:</label> <input type="text" class="form-control" disabled id="solicitud_nombreprofesional"> </div><div class="col form-group"> <label>Email (de trabajo):</label> <input type="text" class="form-control" disabled id="solicitud_email"> </div></div></div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<h5 class="my-3">Respuesta inicial a solicitud de exámen ecográfico</h5><div class="row"> <div class="col-3 form-group" id="jaja.papapa"> <label for="interconsulta.para">Fecha agendamiento exámen</label> <input type="text" disabled class="form-control bg-secondary text-white" id="evaluacion_fecha"> </div><div class="col form-group"> <label for="interconsulta.comentario.respuesta">Comentarios de unidad de contrarreferencia</label> <input disabled class="form-control bg-secondary text-white" id="evaluacion_comentarios"/> </div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<h5 class="my-3">Seleccione tipo de exámen ecográfico a realizar</h5><div class="row g-verde mb-0"> <div class="col form-group mb-0 pb-2 btn-animado"> <label><strong>Seleccione tipo de exámen</strong></label> <select class="form-control" name="solicitud_crecimiento" id="interconsulta.respuesta.crecimiento"> <option value="3">1.- Ecografía Ginecológica</option> <option value="1">2.- Ecografía precoz de urgencia</option> <option value="4">3.- Ecografía 11 / 14 semanas</option> <option value="2">4.- Ecografía 2° / 3° trimestre</option> <option value="0" selected>5.- Doppler + Eco. crecimiento</option> </select> </div><div class="col form-group mb-0"> <label class="text-white">FUR Referida</label> <input type="date" class="form-control" id="interconsulta.respuesta.fur.copia" disabled> </div><div class="col form-group mb-0"> <label for="interconsulta.respuesta.fecha" class="text-white">Señalar fecha de examen</label> <input type="date" class="form-control" id="interconsulta.respuesta.fecha"> </div><div class="col form-group" id="interconsulta.respuesta.edadgestacional"> <label for="interconsulta.respuesta.eg" class="text-white">Edad gestacional actual</label> <input type="hidden" class="form-control" id="interconsulta.fum.copia" value="solicitud_fum"> <input type="text" class="form-control" id="interconsulta.respuesta.eg" disabled=""> <input type="hidden" class="form-control" name="respuesta_eg"> </div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<div id="contenedor.examenes"> <div id="multiproposito"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino" selected>femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado">aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico</label> <select class="form-control" name="respuesta_liquido"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>BVM (mm)</label> <input type="text" class="form-control bg-secondary text-white" name="respuesta_bvm"> </div><div class="col-4 form-group"> <label> <br>Evaluación de anatomía fetal</label> </div><div class="col-4 form-group"> <label>&nbsp;</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-6"> <div class="row"> <div class="col-12"><strong>A.- Biometría fetales:</strong></div><div class="col-12 form-group"> <label>DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col-12 form-group"> <label>CC (mm)</label> <input type="text" class="form-control" name="respuesta_cc"> </div><div class="col-12 form-group"> <label>CA (mm)</label> <input type="text" class="form-control" name="respuesta_ca"> </div><div class="col-12 form-group"> <label>LF (mm)</label> <input type="text" class="form-control" name="respuesta_lf"> </div><div class="col-6 form-group"> <label>Peso fetal estimado (PFE) en gramos</label> <input type="number" class="form-control" name="respuesta_pfe" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col-6 form-group"> <label>Relación cráneo/abdomen ( Índice Cc/Ca )</label> <input type="text" class="form-control" name="respuesta_ccca" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><input type="text" class="form-control" name="respuesta_ccca_pct" disabled> </div></div></div></div><div class="col-6"> <div class="row"> <div class="col-12"><strong>B.- Flujometría Doppler materno / fetal</strong></div><div class="col-12 form-group"> <label>IP. Uterina derecha</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_uterina_derecha"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_derecha_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Uterinas izquierda</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_uterina_izquierda"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_izquierda_percentil"></div></div></div></div><div class="col-6 form-group"> <label>IP. Promedio uterinas</label> <input type="text" class="form-control" name="respuesta_uterinas" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><div class="form-control bg-secondary text-white" id="respuesta_uterinas_percentil"></div></div></div><div class="col-12 form-group"> <label>IP. Arteria umbilical</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_umbilical"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_umbilical_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Cerebral media</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_cm"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cm_percentil"> </div></div></div></div><div class="col-6 form-group"> <label>IP Cm/Au (Índice cerebro placentario ICP)</label> <input type="text" class="form-control" name="respuesta_cmau" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><div class="form-control bg-secondary text-white" id="respuesta_cmau_percentil"></div></div></div></div></div></div><div class="row"> <div class="col-12"> <p class="mb-0"><strong>C.- Análisis preliminar de datos ecográficos (Biometría y flujometría)</strong></p></div><div class="col-4 form-group bg-secondary pb-2 mb-2 text-white"> <label>Crecimiento fetal ( PFE )</label> <select class="form-control" name="respuesta_hipotesis"> <option value="Disminuido < p3">Disminuido < p3</option> <option value="Disminuido < p10">Disminuido < p10</option> <option value="Normal p10 - p 25">Normal p10 - p 25</option> <option value="Normal p26 - p 75" selected>Normal p26 - p 75</option> <option value="Normal p76 - p90">Normal p76 - p90</option> <option value="Grande >p90">Grande >p90</option> <option value="Grande >p97">Grande >p97</option> </select> </div><div class="col form-group bg-secondary pb-2 mb-2 text-white"> <label>Doppler materno ( IP Uterinas )</label> <select class="form-control" name="respuesta_doppler_materno"> <option value="no evaluado">No evaluado</option> <option value="Normal (< p95)" selected>Normal (&lt; p95)</option> <option value="Alterado (> p95)">Alterado (&gt; p95)</option> </select> </div><div class="col-5 form-group bg-secondary pb-2 mb-2 text-white"> <label>Doppler fetal ( IP UMB, ACM e ICP )</label> <select class="form-control" name="respuesta_doppler_fetal"> <option value="No evaluado">No evaluado</option> <option value="Normal (UMB, ACM, ICP)" selected>Normal (UMB, ACM e ICP)</option> <option value="Alterado, ICP < pct 5">Alterado, ICP &lt; pct 5</option> <option value="Alterado ICP < pct 5 y UMB > pct 95">Alterado ICP &lt; pct 5 y UMB &gt; pct 95</option> <option value="Alterado ccp < pct 5 acm < pct 5">Alterado ICP &lt; pct 5 ACM &lt; pct 5</option> <option value="Alt. ICP < pct 5 y ACM < pct 5 + UMB > p95">Alt. ICP &lt; pct 5 y ACM &lt; pct 5 + UMB &gt; p95</option> </select> </div></div></div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<div id="final" class="mt-3"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>D.- Comentarios y observaciones</strong> <span class="text-primary">(Interpretación clínica del profesional ecografista)</span></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista"><strong>Ecografista</strong></label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                
                $('#interconsulta\\.respuesta\\.fecha').on('change', function () {
                    var FExamen,FUM,EdadGestacional;
                    var undia = 1000 * 60 * 60 * 24;
                    var unasemana = undia * 7;
                    FUM = $('#interconsulta\\.fum\\.copia').val();
                    FExamen = $('#interconsulta\\.respuesta\\.fecha').val();
                    FUM = new Date(FUM);
                    FExamen = new Date(FExamen);
                    if ($('#interconsulta\\.respuesta\\.crecimiento').val() == 3){
                        EdadGestacional = ((FExamen.getTime() - FUM.getTime()) / undia).toFixed(0);
                        $('#interconsulta\\.respuesta\\.eg').val(EdadGestacional);
                        $("input[name='respuesta_eg']").val(EdadGestacional);
                    }else{
                        EdadGestacional = ((FExamen.getTime() - FUM.getTime()) / unasemana).toFixed(1);
                        if (FExamen.getTime() < FUM.getTime()) {
                            $('#interconsulta\\.respuesta\\.eg').val('0 semanas');
                            $("input[name='respuesta_eg']").val('0 semanas');
                        } 
                        else if (((FExamen.getTime() - FUM.getTime()) / unasemana) > 42) {
                            $('#interconsulta\\.respuesta\\.eg').val('42 semanas');
                            $("input[name='respuesta_eg']").val('42 semanas');
                        } 
                        else {
                            $('#interconsulta\\.respuesta\\.eg').val(Math.floor(EdadGestacional) + '.' + Math.round((EdadGestacional - Math.floor(EdadGestacional)) * 7) + ' semanas');
                            $("input[name='respuesta_eg']").val(Math.floor(EdadGestacional) + '.' + Math.round((EdadGestacional - Math.floor(EdadGestacional)) * 7) + ' semanas');
                        }
                    }
                });

                $.get('dashboard/agendar/' + solicitud_id).done(function(data){
                    $("#solicitud_id").val(data.solicitud_id);
                    $("#solicitud_nombre").val(data.solicitud_nombre);
                    $("#solicitud_rut").val(data.solicitud_rut);
                    $("#solicitud_fecha").val(data.solicitud_fecha);
                    $("#solicitud_fum").val(data.solicitud_fum);
                    $("#interconsulta\\.respuesta\\.fur\\.copia").val(data.solicitud_fum);
                    $('#interconsulta\\.fum\\.copia').val(data.solicitud_fum);
                    $("#solicitud_egestacional").val(data.solicitud_egestacional);
                    $("#solicitud_diagnostico").val(data.solicitud_diagnostico);
                    $("#solicitud_ciudad").val(data.solicitud_ciudad);
                    $("#solicitud_lugar").val(data.solicitud_lugar);
                    $("#interconsulta_profesional").val(data.solicitud_profesional);
                    $("#solicitud_nombreprofesional").val(data.solicitud_nombreprofesional);
                    $("#solicitud_email").val(data.solicitud_email);
                    nombreprofesionalPegar = data.solicitud_nombre_referente;
                    $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                    var now = new Date();
                    var day = ("0" + now.getDate()).slice(-2);
                    var month = ("0" + (now.getMonth() + 1)).slice(-2);
                    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
                    $("#interconsulta\\.respuesta\\.fecha").val(today).trigger("change");
                    $("input[name='respuesta_paridad']").val(data.solicitud_paridad);
                    $("input[name='respuesta_antecedentes']").val(data.solicitud_antecedentes);
                    $('#interconsulta\\.respuesta\\.crecimiento').data("em",data.solicitud_ematerna).data("pm",data.solicitud_media).data("imc",data.solicitud_imc);
                });
                $.get('dashboard/edit/' + solicitud_id).done(function(data){
                    $("#evaluacion_fecha").val(data.evaluacion_fecha);
                    $("#evaluacion_comentarios").val(data.evaluacion_comentarios);
                });
                $('#interconsulta\\.respuesta\\.crecimiento').on("change", function(){
                    if ($(this).val() == 4){
                        $("#ginecologica").remove();
                        $("#multiproposito").remove();
                        $("#final").remove();
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="doppleruterinas"> <div class="row"> <div class="col form-group"> <label>Edad Materna</label> <div class="input-group"> <input type="text" class="form-control bg-secondary text-white" name="respuesta_em" disabled=""> <div class="input-group-append"> <div class="input-group-text">años</div></div></div></div><div class="col form-group"> <label>Presión arterial media ((PAS- (PAD/3))+ PAD)</label> <div class="input-group"> <input type="text" class="form-control g-verde text-white" name="respuesta_pm" disabled=""> <div class="input-group-append"> <div class="input-group-text">mmHg</div></div></div></div><div class="col form-group"> <label>IMC Materno</label> <div class="input-group"> <input type="text" class="form-control g-verde text-white" name="respuesta_imc" disabled=""> <div class="input-group-append"> <div class="input-group-text">kg/m2</div></div></div></div></div><h5 class="text-primary">Exámenes ultrasonográficos</h5> <div class="row"> <div class="col form-group"> <label>Evaluación de anatomía fetal</label> </div><div class="col form-group"> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col form-group"> <label>Embrión</label> <select class="form-control" name="respuesta_embrion"> <option value="no se observa aun">no se observa aun</option> <option value="act. no evidenciabl">act. no evidenciable</option> <option value="act. card. inicial">act. card. inicial</option> <option value="con act. cardiaca (+)" selected>con act. cardiaca (+)</option> <option value="act. card. y corp. (+)">act. card. y corp. (+)</option> <option value="act. card. y corp. (-)">act. card. y corp. (-)</option> </select> </div><div class="col form-group"> <label>LCN (mm)</label> <input type="text" class="form-control bg-secondary text-white" name="respuesta_lcn"> </div><div class="col form-group"> <label>Eg. x LCN</label> <input type="text" class="form-control" name="respuesta_lcn_eg" disabled> </div><div class="col form-group"> <label>FCF</label> <select name="respuesta_fcf" class="form-control"> <option value="(+) inicial">(+) inicial</option> <option value=" <90">&lt; 90</option> <option value="90">90</option> <option value="91">91</option> <option value="92">92</option> <option value="93">93</option> <option value="94">94</option> <option value="95">95</option> <option value="96">96</option> <option value="97">97</option> <option value="98">98</option> <option value="99">99</option> <option value="100">100</option> <option value="101">101</option> <option value="102">102</option> <option value="103">103</option> <option value="104">104</option> <option value="105">105</option> <option value="106">106</option> <option value="107">107</option> <option value="108">108</option> <option value="109">109</option> <option value="110">110</option> <option value="111">111</option> <option value="112">112</option> <option value="113">113</option> <option value="114">114</option> <option value="115">115</option> <option value="116">116</option> <option value="117">117</option> <option value="118">118</option> <option value="119">119</option> <option value="120">120</option> <option value="121">121</option> <option value="122">122</option> <option value="123">123</option> <option value="124">124</option> <option value="125">125</option> <option value="126">126</option> <option value="127">127</option> <option value="128">128</option> <option value="129">129</option> <option value="130">130</option> <option value="131">131</option> <option value="132">132</option> <option value="133">133</option> <option value="134">134</option> <option value="135">135</option> <option value="136">136</option> <option value="137">137</option> <option value="138">138</option> <option value="139">139</option> <option value="140" selected="">140</option> <option value="141">141</option> <option value="142">142</option> <option value="143">143</option> <option value="144">144</option> <option value="145">145</option> <option value="146">146</option> <option value="147">147</option> <option value="148">148</option> <option value="149">149</option> <option value="150">150</option> <option value="151">151</option> <option value="152">152</option> <option value="153">153</option> <option value="154">154</option> <option value="155">155</option> <option value="156">156</option> <option value="157">157</option> <option value="158">158</option> <option value="159">159</option> <option value="160">160</option> <option value="161">161</option> <option value="162">162</option> <option value="163">163</option> <option value="164">164</option> <option value="165">165</option> <option value="166">166</option> <option value="167">167</option> <option value="168">168</option> <option value="169">169</option> <option value="170">170</option> <option value=" > 170">&gt; 170</option> </select> </div></div><div class="row"> <div class="col-12"><strong>Flujometría Doppler</strong></div><div class="col form-group"> <label>IP. Uterina Derecha</label> <input type="text" class="form-control" name="respuesta_uterina_derecha"> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_uterina_derecha_percentil" disabled> </div></div><div class="col form-group"> <label>IP. Uterina Izquierda</label> <input type="text" class="form-control" name="respuesta_uterina_izquierda"> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_uterina_izquierda_percentil" disabled> </div></div><div class="col form-group"> <label>IP. Promedio uterinas</label> <input type="text" class="form-control g-verde text-white" name="respuesta_uterinas" disabled> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control g-verde text-white" name="respuesta_uterinas_promedio" disabled> </div></div></div><div class="row"> <div class="col-12"><strong>Tamizaje cromosomopatía</strong></div><div class="col form-group"> <label>Translucidez Nucal</label> <select class="form-control" name="respuesta_dbp"> <option value="no procede">No procede</option> <option value="no medible">No medible</option> <option value="medible" selected>Medible</option> </select> </div><div class="col-3 form-group"> <div id="translucencia"> <label>mm de translucidez nucal</label> <input class="form-control bg-secondary text-white" name="respuesta_translucencia_nucal"> </div></div><div class="col form-group"> <label>Hueso Nasal</label> <select class="form-control" name="respuesta_hueso_nasal"> <option value="no procede">No procede</option> <option value="no visible">No visible</option> <option value="visible" selected>Visible</option> </select> </div><div class="col-3 form-group"> <div id="huesonasal"> <label>mm de hueso nasal</label> <input class="form-control " name="respuesta_hueso_nasal_valor"> </div></div></div><div class="row"> <div class="col-6 form-group"> <label>Ductus venoso</label> <select class="form-control" name="respuesta_ca"> <option value="no evaluado" selected="">No evaluado</option> <option value="normal">Normal</option> <option value="onda a ausente">Onda A ausente</option> <option value="onda a negativa">Onda A negativa</option> </select> </div><div class="col-6 form-group"> <label>Reflujo tricuspídeo</label> <select class="form-control" name="respuesta_lf"> <option value="no evaluado" selected="">No evaluado</option> <option value="normal">Normal</option> <option value="alteracion leve">Alteracion leve</option> <option value="onda anormal">Onda anormal</option> </select> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final" class="mt-3"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>D.- Comentarios y observaciones</strong> <span class="text-primary">(Interpretación clínica del profesional ecografista)</span></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista"><strong>Ecografista</strong></label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                        $("select[name='respuesta_hueso_nasal']").on("change", function(){
                            if ($(this).val() == "visible"){
                                $("#huesonasal").removeClass("d-none");
                            }
                            else{
                                $("#huesonasal").addClass("d-none");
                            }
                        }).trigger("change");
                        $("input[name='respuesta_translucencia_nucal']").keypress(function( event ) {
                            if (event.which == 13) {event.preventDefault(); $("input[name='respuesta_hueso_nasal_valor']").focus();}
                        });
                        $("input[name='respuesta_hueso_nasal_valor']").keypress(function( event ) {
                            if (event.which == 13) {event.preventDefault(); $("textarea[name='respuesta_comentariosexamen']").focus();}
                        });
                        $("select[name='respuesta_dbp']").on("change", function(){
                            if ($(this).val() == "medible"){
                                $("#translucencia").removeClass("d-none");
                            }
                            else{
                                $("#translucencia").addClass("d-none");
                            }
                        });
                        $("input[name='respuesta_uterina_derecha']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("input[name='respuesta_uterina_derecha_percentil_view']").val(pctUtAdvanced(eg,ut));
                                $("input[name='respuesta_uterina_derecha_percentil']").val(pctUtAdvanced(eg,ut));
                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_izquierda']").val() > 0){
                                        var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_izquierda']").val())) / 2;
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                                    }
                                }
                            }
                        }).keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_uterina_izquierda']").focus();
                            }
                        });
                        $("input[name='respuesta_uterina_izquierda']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("input[name='respuesta_uterina_izquierda_percentil_view']").val(pctUtAdvanced(eg,ut));
                                $("input[name='respuesta_uterina_izquierda_percentil']").val(pctUtAdvanced(eg,ut));
                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_derecha']").val() > 0){
                                        var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_derecha']").val())) / 2;
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                                    }
                                }
                            }
                        }).keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_translucencia_nucal']").focus();
                            }
                        });

                        $("input[name='respuesta_uterinas']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_uterinas_promedio']").val(pctUtAdvanced(eg,ut));
                            }
                        });
                        $("input[name='respuesta_lcn']").on("change", function(){
                            eglcn();
                        }).keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_uterina_derecha']").focus();
                            }
                        });

                        $("select[name='respuesta_anatomia']").on("change", function(){
                            if ($(this).val() == "hallazgos ecográficos compatibles con:"){
                                $("#interconsulta\\.respuesta\\.anatomia").removeClass("d-none");
                            }
                            else{
                                $("#interconsulta\\.respuesta\\.anatomia").addClass("d-none");
                            }
                        }); 
                        $("input[name='respuesta_em']").val($('#interconsulta\\.respuesta\\.crecimiento').data("em"));
                        $("input[name='respuesta_pm']").val($('#interconsulta\\.respuesta\\.crecimiento').data("pm"));
                        $("input[name='respuesta_imc']").val($('#interconsulta\\.respuesta\\.crecimiento').data("imc"));
                    }
                    else if ($(this).val() == 3){
                        $("#doppleruterinas").remove();
                        $("#multiproposito").remove();
                        $("#final").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="ginecologica"> <div class="row m-0 p-2"> <div class="col-12"> <h6 class="text-primary">Datos a completar por el examinador</h6></div><div class="col-8 border rounded p-3"> <div class="row"> <div class="col-6 form-group"> <label>Útero</label> <input type="text" class="form-control" name="respuesta_utero_ginecologica"> </div><div class="col-6 form-group"> <label>Endometrio</label> <input type="text" class="form-control" name="respuesta_endometrio"> </div><div class="col-6 form-group"> <label>Anexo Izquierdo</label> <input type="text" class="form-control" name="respuesta_anexo_izquierdo_ginecologica"> </div><div class="col-6 form-group"> <label>Anexo Derecho</label> <input type="text" class="form-control" name="respuesta_anexo_derecho_ginecologica"> </div><div class="col-6 form-group"> <label>Ovario Izquierdo</label> <input type="text" class="form-control" name="respuesta_ovario_izquierdo"> </div><div class="col-6 form-group"> <label>Ovario Derecho</label> <input type="text" class="form-control" name="respuesta_ovario_derecho"> </div><div class="col-6 form-group"> <label>Douglas</label> <input type="text" class="form-control" name="respuesta_douglas_ginecologica"> </div></div></div><div class="col"> <div class="border rounded px-3 pt-3 mb-1"> <img src="imagenes/uteroyovarios.jpg" alt="Utero y ovarios" class="img-fluid d-block mx-auto"> </div><div class="border rounded px-3 pt-3 mb-1"> <ul><li>Exploración mínima en caso de, ecográficamente no observar signos de embarazo.</li></ul></div><div class="border rounded text-center"> <div role="group" aria-label="Basic example" class="btn-group text-center"> <button class="btn btn-primary text-white" id="enviar.respuesta.botton.espejo">Enviar respuesta</button> <button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar.espejo">Eliminar solicitud</button> <button type="button" class="btn btn-secondary" id="ver.interconsulta.cerrar.espejo">Cerrar</button> </div></div></div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final" class="mt-3"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>D.- Comentarios y observaciones</strong> <span class="text-primary">(Interpretación clínica del profesional ecografista)</span></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista"><strong>Ecografista</strong></label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#editable").attr("rows", 3);
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);

                        $("#enviar\\.respuesta\\.botton\\.espejo").on("click", function(){
                            $("#enviar\\.respuesta\\.botton").trigger("click");
                        });

                        $("#ver\\.interconsulta\\.eliminar\\.espejo").on("click", function(){
                            $("#ver\\.interconsulta\\.eliminar").trigger("click");
                        });

                        $("#ver\\.interconsulta\\.cerrar\\.espejo").on("click", function(){
                            $("#ver\\.interconsulta").modal("hide");
                        });
                    }
                    else if ($(this).val() == 2){
                        $("#doppleruterinas").remove();
                        $("#final").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="segundotrimestre"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso_segundo"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino" selected="">femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado">aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico</label> <select class="form-control" name="respuesta_liquido_amniotico"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>BVM (mm)</label> <input type="text" class="form-control" name="respuesta_bvm"> </div><div class="col-4 form-group"> <label> <br>Evaluación de anatomía fetal</label> </div><div class="col-4 form-group"> <label>&nbsp;</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-12"> <p><strong>Biometrías</strong></p></div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col form-group"> <label>DOF (mm)</label> <input type="text" class="form-control" name="respuesta_dof"> </div><div class="col form-group"> <label>CC (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cc"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cc_pct"></div></div></div></div></div><div class="row"> <div class="col form-group"> <label>CA (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_ca"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ca_pct"></div></div></div></div><div class="col form-group"> <label>LF (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lf"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lf_pct"></div></div></div></div></div><div class="row"> <div class="col-4 py-3 form-group"> <label>Opcionales para estimación tardia de la edad gestacional</label> </div><div class="col-4 form-group"> <label>LH (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_lh"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_lh_pct"></div></div></div></div><div class="col-4 form-group"> <label>Cerebelo (mm)</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_cerebelo"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cerebelo_pct"></div></div></div></div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Peso fetal estimado</label> <input type="text" class="form-control" name="respuesta_pfe" disabled> </div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col form-group"> <label>Índice Cc / Ca</label> <div class="input-group mb-2"> <input type="text" class="form-control" name="respuesta_ccca" disabled> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_ccca_pct"></div></div></div></div><div class="col form-group"> <label>IC (DBP/DOF) [70%-86%]</label> <input type="text" class="form-control" name="respuesta_ic" disabled> </div></div><div class="row"> <div class="col form-group"> <label><strong>Hipótesis diagnóstica</strong></label> <input type="text" class="form-control" name="respuesta_hipotesis"> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final" class="mt-3"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>D.- Comentarios y observaciones</strong> <span class="text-primary">(Interpretación clínica del profesional ecografista)</span></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista"><strong>Ecografista</strong></label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("#multiproposito").remove();
                        $("#ginecologica").remove();
                        $("#primertrimestre").remove();
                        $("#editable").attr("rows", 3);
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                        $("input[name='respuesta_dbp']").on("change", function(){
                            let dbp = $(this).val();
                            let dbp_ready = false;
                            let dof = $("input[name='respuesta_dof']").val();
                            let dof_ready = false;
                            if (dbp.length > 0){
                                dbp_ready = isNaN(dbp) == false ? true : false;
                            }
                            if (dof.length > 0){
                                dof_ready = isNaN(dof) == false ? true : false;
                            }
                            if (dbp_ready == true && dof_ready == true){
                                $("input[name='respuesta_ic']").val(ICAdvanced(dbp, dof));
                                $("input[name='respuesta_cc']").val(valCC(dof,dbp)).trigger("change");
                            }
                            else{
                                $("input[name='respuesta_ic']").val(0);
                                $("input[name='respuesta_cc']").val(0).trigger("change");
                            }
                        });
                        $("input[name='respuesta_bvm']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_dbp']").focus();
                            }
                        });

                        $("input[name='respuesta_dbp']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_dof']").focus();
                            }
                        });
                        $("input[name='respuesta_dof']").on("change", function(){
                            let dbp = $("input[name='respuesta_dbp']").val();
                            let dbp_ready = false;
                            let dof = $(this).val();
                            let dof_ready = false;
                            if (dbp.length > 0){
                                dbp_ready = isNaN(dbp) == false ? true : false;
                            }
                            if (dof.length > 0){
                                dof_ready = isNaN(dof) == false ? true : false;
                            }
                            if (dbp_ready == true && dof_ready == true){
                                $("input[name='respuesta_ic']").val(ICAdvanced(dbp, dof));
                                $("input[name='respuesta_cc']").val(valCC(dof,dbp)).trigger("change");
                            }
                            else{
                                $("input[name='respuesta_ic']").val(0);
                                $("input[name='respuesta_cc']").val(0).trigger("change");
                            }
                        });
                        $("input[name='respuesta_dof']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_ca']").focus();
                            }
                        });
                        $("input[name='respuesta_cc']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        });
                        $("input[name='respuesta_ca']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        });
                        $("input[name='respuesta_ca']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_lf']").focus();
                            }
                        });
                        $("select[name='respuesta_anatomia']").on("change", function(){
                            if ($(this).val() == "hallazgos ecográficos compatibles con:"){
                                $("#interconsulta\\.respuesta\\.anatomia").removeClass("d-none");
                            }
                            else{
                                $("#interconsulta\\.respuesta\\.anatomia").addClass("d-none");
                            }
                        });
                        $("input[name='respuesta_pfe']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var pfe = $("input[name='respuesta_pfe']").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_pfe_pct']").val(pctpfeAdvanced(eg,pfe));
                            }
                        });
                        $("input[name='respuesta_ccca']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ccca = $("input[name='respuesta_ccca']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_ccca_pct").html("Pct. " + pctcccaAdvanced(eg,ccca));
                            }
                        });
                        $("input[name='respuesta_cc']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var cc = $("input[name='respuesta_cc']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_cc_pct").html("Pct. " + pctccAdvanced(eg,cc));
                            }
                        });
                        $("input[name='respuesta_ca']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ca = $("input[name='respuesta_ca']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_ca_pct").html("Pct. " + pctcaAdvanced(eg,ca));
                            }
                        });
                        $("input[name='respuesta_lf']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var lf = $("input[name='respuesta_lf']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_lf_pct").html("Pct. " + pctlfAdvanced(eg,lf));
                            }
                        });
                        $("input[name='respuesta_lh']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var lh = $("input[name='respuesta_lh']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("#respuesta_lh_pct").html("Pct. " + pctlhAdvanced(eg,lh));
                            }
                        });
                        $("input[name='respuesta_cerebelo']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var cerebelo = $("input[name='respuesta_cerebelo']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("#respuesta_cerebelo_pct").html("Pct. " + pctcerebeloAdvanced(eg,cerebelo));
                            }
                        });
                    }
                    else if ($(this).val() == 1){
                        $("#final").remove();
                        $("#doppleruterinas").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="primertrimestre"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">útero</label> <select class="form-control" name="respuesta_utero_primertrimestre"> <option value="central anterior" selected>central anterior</option> <option value="central posterior">central posterior</option> <option value="lateralizado a la Izquierda">lateralizado a la Izquierda</option> <option value="lateralizado a la Derecha">lateralizado a la Derecha</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Saco gestacional</label> <select class="form-control" name="respuesta_saco_gestacional"> <option value="normal" selected>normal</option> <option value="no se observa">no se observa</option> <option value="multiple">multiple</option> <option value="con pseudosaco">con pseudosaco</option> <option value="con dpmto. parcial">con dpmto. parcial</option> </select> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Embrión</label> <select class="form-control" name="respuesta_embrion"> <option value="no se observa aun">no se observa aun</option> <option value="act. no evidenciabl">act. no evidenciable</option> <option value="act. card. inicial">act. card. inicial</option> <option value="con act. cardiaca (+)" selected>con act. cardiaca (+)</option> <option value="act. card. y corp. (+)">act. card. y corp. (+)</option> <option value="act. card. y corp. (-)">act. card. y corp. (-)</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">LCN</label> <input type="text" class="form-control" name="respuesta_lcn"> </div><div class="col-3 form-group"> <label for="interconsulta.respuesta.ecografista">Eg. x LCN</label> <input type="text" class="form-control" name="respuesta_lcn_eg" disabled></div></div><div class="row"> <div class="col form-group"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">FUR Operacional</label> <input type="text" class="form-control" name="respuesta_furop" disabled> </div><div class="col-3 form-group"> <label for="interconsulta.respuesta.ecografista">FPP actualizada</label> <input type="text" class="form-control" name="respuesta_fppactualizada" disabled> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Izquierdo</label> <select class="form-control" name="respuesta_anexo_izquierdo_primertrimestre"> <option value="aspecto normal" selected>aspecto normal</option> <option value="masa solida">masa solida</option> <option value="masa eco negativa">masa eco negativa</option> <option value="con ovario">con ovario</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Derecho</label> <select class="form-control" name="respuesta_anexo_derecho_primertrimestre"> <option value="aspecto normal" selected>aspecto normal</option> <option value="masa solida">masa solida</option> <option value="masa eco negativa">masa eco negativa</option> <option value="con ovario">con ovario</option> </select> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista">Douglas</label> <select class="form-control" name="respuesta_douglas_primertrimestre"> <option value="libre" selected>libre</option> <option value="ocupado">ocupado</option> </select> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final" class="mt-3"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>D.- Comentarios y observaciones</strong> <span class="text-primary">(Interpretación clínica del profesional ecografista)</span></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista"><strong>Ecografista</strong></label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("input[name='respuesta_lcn']").on("change", function(){eglcn();});
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                        $("#segundotrimestre").remove();
                        $("#multiproposito").remove();
                        $("#ginecologica").remove();
                        $("#editable").attr("rows", 3);
                    }
                    else{
                        $("#doppleruterinas").remove();
                        $("#final").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="multiproposito"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col-4 form-group"> <label>Sexo fetal</label> <select class="form-control" name="respuesta_sexo_fetal"> <option value="femenino" selected>femenino</option> <option value="masculino">masculino</option> <option value="aún no identificado">aún no identificado</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta ubicación</label> <select class="form-control" name="respuesta_placenta"> <option value="normal" selected>normal</option> <option value="prev. lateral">prev. lateral</option> <option value="prev. marginal">prev. marginal</option> <option value="prev. parcial">prev. parcial</option> <option value="prev. total">prev. total</option> </select> </div><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta inserción</label> <select class="form-control" name="respuesta_placenta_insercion"> <option value="anterior" selected>anterior</option> <option value="posterior">posterior</option> <option value="fúndica">fúndica</option> <option value="lat. derecha">lat. derecha</option> <option value="lat. izquierda">lat. izquierda </option> <option value="segmentaria">segmentaria</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico</label> <select class="form-control" name="respuesta_liquido"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"> <div class="col-4 form-group"> <label>BVM (mm)</label> <input type="text" class="form-control bg-secondary text-white" name="respuesta_bvm"> </div><div class="col-4 form-group"> <label> <br>Evaluación de anatomía fetal</label> </div><div class="col-4 form-group"> <label>&nbsp;</label> <select class="form-control" name="respuesta_anatomia"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos ecográficos compatibles con:">hallazgos ecográficos compatibles con:</option> </select> </div><div class="col-12 form-group d-none" id="interconsulta.respuesta.anatomia"> <input type="text" class="form-control" name="respuesta_anatomia_extra"> </div></div><div class="row"> <div class="col-6"> <div class="row"> <div class="col-12"><strong>A.- Biometría fetales:</strong></div><div class="col-12 form-group"> <label>DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col-12 form-group"> <label>CC (mm)</label> <input type="text" class="form-control" name="respuesta_cc"> </div><div class="col-12 form-group"> <label>CA (mm)</label> <input type="text" class="form-control" name="respuesta_ca"> </div><div class="col-12 form-group"> <label>LF (mm)</label> <input type="text" class="form-control" name="respuesta_lf"> </div><div class="col-6 form-group"> <label>Peso fetal estimado (PFE) en gramos</label> <input type="number" class="form-control" name="respuesta_pfe" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><input type="text" class="form-control bg-secondary text-white" name="respuesta_pfe_pct" disabled> </div></div><div class="col-6 form-group"> <label>Relación cráneo/abdomen ( Índice Cc/Ca )</label> <input type="text" class="form-control" name="respuesta_ccca" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><input type="text" class="form-control" name="respuesta_ccca_pct" disabled> </div></div></div></div><div class="col-6"> <div class="row"> <div class="col-12"><strong>B.- Flujometría Doppler materno / fetal</strong></div><div class="col-12 form-group"> <label>IP. Uterina derecha</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_uterina_derecha"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_derecha_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Uterinas izquierda</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_uterina_izquierda"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_uterina_izquierda_percentil"></div></div></div></div><div class="col-6 form-group"> <label>IP. Promedio uterinas</label> <input type="text" class="form-control" name="respuesta_uterinas" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><div class="form-control bg-secondary text-white" id="respuesta_uterinas_percentil"></div></div></div><div class="col-12 form-group"> <label>IP. Arteria umbilical</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_umbilical"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_umbilical_percentil"></div></div></div></div><div class="col-12 form-group"> <label>IP. Cerebral media</label> <div class="input-group"> <input type="text" class="form-control" name="respuesta_cm"> <div class="input-group-prepend"> <div class="input-group-text" id="respuesta_cm_percentil"> </div></div></div></div><div class="col-6 form-group"> <label>IP Cm/Au (Índice cerebro placentario ICP)</label> <input type="text" class="form-control" name="respuesta_cmau" disabled> </div><div class="col-6 form-group"> <label>&nbsp;</label> <div class="input-group"> <div class="input-group-prepend"> <div class="input-group-text">Percentil</div></div><div class="form-control bg-secondary text-white" id="respuesta_cmau_percentil"></div></div></div></div></div></div><div class="row"> <div class="col-12"> <p class="mb-0"><strong>C.- Análisis preliminar de datos ecográficos (Biometría y flujometría)</strong></p></div><div class="col-4 form-group bg-secondary pb-2 mb-2 text-white"> <label>Crecimiento fetal ( PFE )</label> <select class="form-control" name="respuesta_hipotesis"> <option value="Disminuido < p3">Disminuido < p3</option> <option value="Disminuido < p10">Disminuido < p10</option> <option value="Normal p10 - p 25">Normal p10 - p 25</option> <option value="Normal p26 - p 75" selected>Normal p26 - p 75</option> <option value="Normal p76 - p90">Normal p76 - p90</option> <option value="Grande >p90">Grande >p90</option> <option value="Grande >p97">Grande >p97</option> </select> </div><div class="col form-group bg-secondary pb-2 mb-2 text-white"> <label>Doppler materno ( IP Uterinas )</label> <select class="form-control" name="respuesta_doppler_materno"> <option value="no evaluado">No evaluado</option> <option value="Normal (< p95)" selected>Normal (&lt; p95)</option> <option value="Alterado (> p95)">Alterado (&gt; p95)</option> </select> </div><div class="col-5 form-group bg-secondary pb-2 mb-2 text-white"> <label>Doppler fetal ( IP UMB, ACM e ICP )</label> <select class="form-control" name="respuesta_doppler_fetal"> <option value="No evaluado">No evaluado</option> <option value="Normal (UMB, ACM, ICP)" selected>Normal (UMB, ACM e ICP)</option> <option value="Alterado, ICP < pct 5">Alterado, ICP &lt; pct 5</option> <option value="Alterado ICP < pct 5 y UMB > pct 95">Alterado ICP &lt; pct 5 y UMB &gt; pct 95</option> <option value="Alterado ccp < pct 5 acm < pct 5">Alterado ICP &lt; pct 5 ACM &lt; pct 5</option> <option value="Alt. ICP < pct 5 y ACM < pct 5 + UMB > p95">Alt. ICP &lt; pct 5 y ACM &lt; pct 5 + UMB &gt; p95</option> </select> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final" class="mt-3"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>D.- Comentarios y observaciones</strong> <span class="text-primary">(Interpretación clínica del profesional ecografista)</span></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista"><strong>Ecografista</strong></label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("#ginecologica").remove();
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#editable").attr("rows", 3);
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                        $("input[name='respuesta_uterina_derecha']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("#respuesta_uterina_derecha_percentil").html("Pct. " + pctUtAdvanced(eg,ut));
                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_izquierda']").val() > 0){
                                        var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_izquierda']").val())) / 2;
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                                    }
                                }
                            }
                        });
                        $("input[name='respuesta_uterina_derecha']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_uterina_izquierda']").focus();
                            }
                        });
                        $("input[name='respuesta_uterina_izquierda']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg = parseFloat(eg).toFixed();
                                $("#respuesta_uterina_izquierda_percentil").html("Pct. " + pctUtAdvanced(eg,ut));
        
                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_derecha']").val() > 0){
                                        var promedio = (parseFloat($("input[name='respuesta_uterina_derecha']").val()) + parseFloat(ut)) / 2;
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                                    }
                                }
                            }
                        });
                        $("input[name='respuesta_uterina_izquierda']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_umbilical']").focus();
                            }
                        });
                        $("input[name='respuesta_uterinas']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $("input[name='respuesta_uterinas']").val();

                            eg = String(eg);
                            eg = eg.replace("semanas", "");

                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_uterinas_percentil").html(pctUtAdvanced(eg,ut));
                            }
                        });
                        $("input[name='respuesta_pfe']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var pfe = $("input[name='respuesta_pfe']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_pfe_pct']").val(pctpfeAdvanced(eg,pfe));
            
                            }
                        });
                        $("input[name='respuesta_dbp']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_cc']").focus();
                            }
                        });
                        $("input[name='respuesta_cc']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        });
                        $("input[name='respuesta_cc']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_ca']").focus();
                            }
                        });
                        $("input[name='respuesta_ca']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        });
                        $("input[name='respuesta_ca']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_lf']").focus();
                            }
                        });
                        $("input[name='respuesta_lf']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_uterina_derecha']").focus();
                            }
                        });
                        $("input[name='respuesta_ccca']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ccca = $("input[name='respuesta_ccca']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_ccca_pct']").val(pctcccaAdvanced(eg,ccca));
                            }
                        });
                        $("select[name='respuesta_anatomia']").on("change", function(){
                            if ($(this).val() == "hallazgos ecográficos compatibles con:"){
                                $("#interconsulta\\.respuesta\\.anatomia").removeClass("d-none");
                            }
                            else{
                                $("#interconsulta\\.respuesta\\.anatomia").addClass("d-none");
                            }
                        });
                        $("input[name='respuesta_cm']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var acm = $("input[name='respuesta_cm']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_cm_percentil").html("Pct. " + pctacmAdvanced(eg,acm));
                            }
                            if (acm > 0){
                                if ($("input[name='respuesta_umbilical']").val() > 0){
                                    var ccp = (acm / $("input[name='respuesta_umbilical']").val());
                                    $("input[name='respuesta_cmau']").val(ccp.toFixed(2)).trigger("change");
                                }
                            }
                        });
                        $("input[name='respuesta_umbilical']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var aumb = $("input[name='respuesta_umbilical']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_umbilical_percentil").html("Pct. " + pctauAdvanced(eg,aumb));
                            }
                            if ($("input[name='respuesta_cm']").val() > 0){
                                if ($("input[name='respuesta_umbilical']").val() > 0){
                                    var ccp = ($("input[name='respuesta_cm']").val() / $("input[name='respuesta_umbilical']").val());
                                    $("input[name='respuesta_cmau']").val(ccp.toFixed(2)).trigger("change");                      
                                }
                            }
                        }).keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_cm']").focus();
                            }
                        });
                        $("input[name='respuesta_cmau']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var cmau = $("input[name='respuesta_cmau']").val();
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("#respuesta_cmau_percentil").html(pctcmauAdvanced(eg,cmau));
                            }
                        });
                        $("input[name='respuesta_bvm']").keypress(function( event ) {
                            if ( event.which == 13 ) {
                               event.preventDefault();
                               $("input[name='respuesta_dbp']").focus();
                            }
                        });
                    }

                    $('#interconsulta\\.respuesta\\.fecha').trigger("change");

                    if ($(this).val() == 3){
                        $("#enviar\\.respuesta\\.botton").addClass("d-none");
                        $("#ver\\.interconsulta\\.eliminar").addClass("d-none");
                        $("#ver\\.interconsulta\\.cerrar").addClass("d-none");
                        $("#interconsulta\\.respuesta\\.eg").parent().children("label").html('Día del ciclo mestrual');
                    }else {
                        $("#enviar\\.respuesta\\.botton").removeClass("d-none");
                        $("#ver\\.interconsulta\\.eliminar").removeClass("d-none");
                        $("#ver\\.interconsulta\\.cerrar").removeClass("d-none");
                        $("#interconsulta\\.respuesta\\.eg").parent().children("label").html('Edad gestacional actual');
                    }
                });
                $("select[name='respuesta_anatomia']").on("change", function(){
                    if ($(this).val() == "hallazgos ecográficos compatibles con:"){
                        $("#interconsulta\\.respuesta\\.anatomia").removeClass("d-none");
                    }
                    else{
                        $("#interconsulta\\.respuesta\\.anatomia").addClass("d-none");
                    }
                });
                
                $("input[name='respuesta_uterina_derecha']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var ut = $(this).val();
                    eg = String(eg);
                    eg = eg.replace("semanas", "");
                    if (eg.length > 0){
                        eg = parseFloat(eg).toFixed();
                        $("#respuesta_uterina_derecha_percentil").html("Pct. " + pctUtAdvanced(eg,ut));
                        if (ut > 0){
                            if ($("input[name='respuesta_uterina_izquierda']").val() > 0){
                                var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_izquierda']").val())) / 2;
                                $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                            }
                        }
                    }
                });
                $("input[name='respuesta_uterina_derecha']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_uterina_izquierda']").focus();
                    }
                });
                $("input[name='respuesta_uterina_izquierda']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var ut = $(this).val();
                    eg = String(eg);
                    eg = eg.replace("semanas", "");
                    if (eg.length > 0){
                        eg = parseFloat(eg).toFixed();
                        $("#respuesta_uterina_izquierda_percentil").html("Pct. " + pctUtAdvanced(eg,ut));
                        if (ut > 0){
                            if ($("input[name='respuesta_uterina_derecha']").val() > 0){
                                var promedio = (parseFloat($("input[name='respuesta_uterina_derecha']").val()) + parseFloat(ut)) / 2;
                                $("input[name='respuesta_uterinas']").val(promedio.toFixed(2)).trigger("change");
                            }
                        }
                    }
                });
                $("input[name='respuesta_uterina_izquierda']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_umbilical']").focus();
                    }
                });
                $("input[name='respuesta_uterinas']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var ut = $("input[name='respuesta_uterinas']").val();
                    eg = String(eg);
                    eg = eg.replace("semanas", "");
                    if (eg.length > 0){
                        eg = parseFloat(eg).toFixed();
                        $("#respuesta_uterinas_percentil").html(pctUtAdvanced(eg,ut));
                    }
                })
                $("input[name='respuesta_pfe']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var pfe = $("input[name='respuesta_pfe']").val();
                    eg = String(eg);
                    eg = eg.replace("semanas", "");
                    if (eg.length > 0){
                        eg =  parseFloat(eg).toFixed();
                        $("input[name='respuesta_pfe_pct']").val(pctpfeAdvanced(eg,pfe));
                    }
                });
                $("input[name='respuesta_cm']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var acm = $("input[name='respuesta_cm']").val();
                    eg = String(eg);
                    eg = eg.replace("semanas", "");
                    if (eg.length > 0){
                        eg =  parseFloat(eg).toFixed();
                        $("#respuesta_cm_percentil").html("Pct. " + pctacmAdvanced(eg,acm));
                    }
                    if (acm > 0){
                        if ($("input[name='respuesta_umbilical']").val() > 0){
                            var ccp = (acm / $("input[name='respuesta_umbilical']").val());
                            $("input[name='respuesta_cmau']").val(ccp.toFixed(2)).trigger("change");
                        }
                    }
                });
                $("input[name='respuesta_dbp']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_cc']").focus();
                    }
                });
                $("input[name='respuesta_cc']").on("change", function(){
                    psohdlk();
                    calCCCA();
                });
                $("input[name='respuesta_cc']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_ca']").focus();
                    }
                });
                $("input[name='respuesta_ca']").on("change", function(){
                    psohdlk();
                    calCCCA();
                });
                $("input[name='respuesta_ca']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_lf']").focus();
                    }
                });
                $("input[name='respuesta_lf']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_uterina_derecha']").focus();
                    }
                });
                $("input[name='respuesta_ccca']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var ccca = $("input[name='respuesta_ccca']").val();
                    eg = String(eg);
                    eg = eg.replace("semanas", "");
                    if (eg.length > 0){
                        eg =  parseFloat(eg).toFixed();
                        $("input[name='respuesta_ccca_pct']").val(pctcccaAdvanced(eg,ccca));
                    }
                });
                $("input[name='respuesta_umbilical']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var aumb = $("input[name='respuesta_umbilical']").val();
                    eg = String(eg);
                    eg = eg.replace("semanas", "");
                    if (eg.length > 0){
                        eg =  parseFloat(eg).toFixed();
                        $("#respuesta_umbilical_percentil").html("Pct. " + pctauAdvanced(eg,aumb));
                    }
                    if ($("input[name='respuesta_cm']").val() > 0){
                        if ($("input[name='respuesta_umbilical']").val() > 0){
                            var ccp = ($("input[name='respuesta_cm']").val() / $("input[name='respuesta_umbilical']").val());
                            $("input[name='respuesta_cmau']").val(ccp.toFixed(2)).trigger("change");
                        }
                    }
                }).keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_cm']").focus();
                    }
                });
                $("input[name='respuesta_cmau']").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var cmau = $("input[name='respuesta_cmau']").val();
                    eg = String(eg);
                    eg = eg.replace("semanas", "");
                    if (eg.length > 0){
                        eg =  parseFloat(eg).toFixed();
                        $("#respuesta_cmau_percentil").html(pctcmauAdvanced(eg,cmau));
                    }
                });
                $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button class="btn btn-primary text-white" id="enviar.respuesta.botton">Enviar respuesta</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" id="ver.interconsulta.cerrar" data-dismiss="modal">Cerrar</button>');
                $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                    let solicitud_id =  $(this).data("id");
                    $.get("dashboard/delete/" + solicitud_id).done(function(){
                        loadInProcess();
                    });
                    $("#ver\\.interconsulta").modal("hide");
                });
                $("#enviar\\.respuesta\\.botton").on("click", function(){
                    var tipoExm = $('#interconsulta\\.respuesta\\.crecimiento').val();
                    var respuestaFecha = $("#interconsulta\\.respuesta\\.fecha").val();
                    if (respuestaFecha.length < 3){
                        $('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>Primero debe señalar cual es la fecha del exámen, de lo contrario es imposible calcular medidas</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
                        $('#cautivo\\.dialogo').modal("show");
                        $('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
                            $(this).remove();
                        });
                        return;
                    }
                    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><img src="https://crecimientofetal.cl/img/emoji.png" class="d-block mx-auto imng-fluid"><h3 class="text-danger text-center">ESTAMOS ENVIANDO SU RESPUESTA</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
                    $('#mensaje\\.dialogo').modal("show");
                    $('#mensaje\\.dialogo').on('hidden.bs.modal', function (e) {
                        $('#mensaje\\.dialogo').modal("hide");
                        $(this).remove();
                    });
                    var args = "";
                    if (tipoExm == 4){
                        args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: respuestaFecha,
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
                            respuesta_anatomia: $('select[name="respuesta_anatomia"]').val(),
                            respuesta_anatomia_extra: $('input[name="respuesta_anatomia_extra"]').val(),
                            respuesta_embrion: $('select[name="respuesta_embrion"]').val(),
                            respuesta_lcn: $('input[name="respuesta_lcn"]').val(),
                            respuesta_lcn_eg: $('input[name="respuesta_lcn_eg"]').val(),
                            respuesta_fcf: $('select[name="respuesta_fcf"]').val(),
                            respuesta_cc: $('select[name="respuesta_hueso_nasal"]').val(),
                            respuesta_ca: $('select[name="respuesta_ca"]').val(),
                            respuesta_lf: $('select[name="respuesta_lf"]').val(),
                            respuesta_dbp: $('select[name="respuesta_dbp"]').val(),
                            respuesta_translucencia_nucal: $('input[name="respuesta_translucencia_nucal"]').val(),
                            respuesta_hueso_nasal_valor: $('input[name="respuesta_hueso_nasal_valor"]').val(),
                            respuesta_uterina_derecha: $('input[name="respuesta_uterina_derecha"]').val(),
                            respuesta_uterina_derecha_percentil: $('input[name="respuesta_uterina_derecha_percentil"]').val(),
                            respuesta_uterina_izquierda: $('input[name="respuesta_uterina_izquierda"]').val(),
                            respuesta_uterina_izquierda_percentil: $('input[name="respuesta_uterina_izquierda_percentil"]').val(),
                            respuesta_uterinas: $('input[name="respuesta_uterinas"]').val(),
                            respuesta_uterinas_percentil: $('input[name="respuesta_uterinas_promedio"]').html(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val()
                        }
                    }
                    else if (tipoExm == 3){
                        args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_utero_ginecologica: $('input[name="respuesta_utero_ginecologica"]').val(),
                            respuesta_anexo_izquierdo_ginecologica: $('input[name="respuesta_anexo_izquierdo_ginecologica"]').val(),
                            respuesta_anexo_derecho_ginecologica: $('input[name="respuesta_anexo_derecho_ginecologica"]').val(),
                            respuesta_ovario_izquierdo: $('input[name="respuesta_ovario_izquierdo"]').val(),
                            respuesta_ovario_derecho: $('input[name="respuesta_ovario_derecho"]').val(),
                            respuesta_douglas_ginecologica: $('input[name="respuesta_douglas_ginecologica"]').val(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_endometrio: $('input[name="respuesta_endometrio"]').val()
                        }
                    }
                    else if (tipoExm == 2){
                        args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
                            respuesta_placenta: $('select[name="respuesta_placenta"]').val(),
                            respuesta_placenta_insercion: $('select[name="respuesta_placenta_insercion"]').val(),
                            respuesta_liquido_amniotico: $('select[name="respuesta_liquido_amniotico"] option:selected').val(),
                            respuesta_dbp: $('input[name="respuesta_dbp"]').val(),
                            respuesta_cc: $('input[name="respuesta_cc"]').val(),
                            respuesta_cc_pct: $('#respuesta_cc_pct').html(),
                            respuesta_ca: $('input[name="respuesta_ca"]').val(),
                            respuesta_ca_pct: $('#respuesta_ca_pct').html(),
                            respuesta_lf: $('input[name="respuesta_lf"]').val(),
                            respuesta_lf_pct: $('#respuesta_lf_pct').html(),
                            respuesta_pfe: $('input[name="respuesta_pfe"]').val(),
                            respuesta_ccca: $('input[name="respuesta_ccca"]').val(),
                            respuesta_presentacion: $('select[name="respuesta_presentacion"]').val(),
                            respuesta_dorso_segundo: $('select[name="respuesta_dorso_segundo"]').val(),
                            respuesta_anatomia: $('select[name="respuesta_anatomia"]').val(),
                            respuesta_anatomia_extra: $('input[name="respuesta_anatomia_extra"]').val(),
                            respuesta_pfe_pct: $('input[name="respuesta_pfe_pct"]').val(),
                            respuesta_ccca_pct: $('#respuesta_ccca_pct').html(),
                            respuesta_hipotesis: $('input[name="respuesta_hipotesis"]').val(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_dof: $('input[name="respuesta_dof"]').val(),
                            respuesta_ic: $('input[name="respuesta_ic"]').val(),
                            respuesta_bvm: $('input[name="respuesta_bvm"]').val(),
                            respuesta_lh: $('input[name="respuesta_lh"]').val(),
                            respuesta_lh_pct: $('#respuesta_lh_pct').html(),
                            respuesta_cerebelo: $('input[name="respuesta_cerebelo"]').val(),
                            respuesta_cerebelo_pct: $('#respuesta_cerebelo_pct').html(),
                            respuesta_sexo_fetal: $('select[name="respuesta_sexo_fetal"]').val()
                        }
                        args.respuesta_lf_pct = args.respuesta_lf_pct.replace("Pct. ", "");
                        args.respuesta_cc_pct = args.respuesta_cc_pct.replace("Pct. ", "");
                        args.respuesta_ca_pct = args.respuesta_ca_pct.replace("Pct. ", "");
                        args.respuesta_ccca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
                        args.respuesta_lh_pct = args.respuesta_lh_pct.replace("Pct. ", "");
                        args.respuesta_cerebelo_pct = args.respuesta_cerebelo_pct.replace("Pct. ", "");
                    }
                    else if (tipoExm == 1){
                        args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
                            respuesta_utero_primertrimestre: $('select[name="respuesta_utero_primertrimestre"]').val(),
                            respuesta_saco_gestacional: $('select[name="respuesta_saco_gestacional"]').val(),
                            respuesta_embrion: $('select[name="respuesta_embrion"]').val(),
                            respuesta_lcn: $('input[name="respuesta_lcn"]').val(),
                            respuesta_lcn_eg: $('input[name="respuesta_lcn_eg"]').val(),
                            respuesta_anexo_izquierdo_primertrimestre: $('select[name="respuesta_anexo_izquierdo_primertrimestre"]').val(),
                            respuesta_anexo_derecho_primertrimestre: $('select[name="respuesta_anexo_derecho_primertrimestre"]').val(),
                            respuesta_douglas_primertrimestre: $('select[name="respuesta_douglas_primertrimestre"]').val(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                        }
                    }
                    else{
                        args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
                            respuesta_pfe: $('input[name="respuesta_pfe"]').val(),
                            respuesta_pfe_pct: $('input[name="respuesta_pfe_pct"]').val(),
                            respuesta_liquido: $('select[name="respuesta_liquido"] option:selected').val(),
                            respuesta_presentacion: $('select[name="respuesta_presentacion"]').val(),
                            respuesta_dorso: $('select[name="respuesta_dorso"] option:selected').val(),
                            respuesta_placenta: $('select[name="respuesta_placenta"]').val(),
                            respuesta_placenta_insercion: $('select[name="respuesta_placenta_insercion"]').val(),
                            respuesta_uterina_derecha: $('input[name="respuesta_uterina_derecha"]').val(),
                            respuesta_uterina_derecha_percentil: $('#respuesta_uterina_derecha_percentil').html(),
                            respuesta_uterina_izquierda: $('input[name="respuesta_uterina_izquierda"]').val(),
                            respuesta_uterina_izquierda_percentil: $('#respuesta_uterina_izquierda_percentil').html(),
                            respuesta_uterinas: $('input[name="respuesta_uterinas"]').val(),
                            respuesta_uterinas_percentil: $('#respuesta_uterinas_percentil').html(),
                            respuesta_umbilical: $('input[name="respuesta_umbilical"]').val(),
                            respuesta_umbilical_percentil: $('#respuesta_umbilical_percentil').html(),
                            respuesta_cm: $('input[name="respuesta_cm"]').val(),
                            respuesta_cm_percentil: $('#respuesta_cm_percentil').html(),
                            respuesta_cmau: $('input[name="respuesta_cmau"]').val(),
                            respuesta_cmau_percentil: $('#respuesta_cmau_percentil').html(),
                            respuesta_hipotesis: $('select[name="respuesta_hipotesis"]').val(),
                            respuesta_doppler_materno: $('select[name="respuesta_doppler_materno"]').val(),
                            respuesta_doppler_fetal:  $('select[name="respuesta_doppler_fetal"]').val(),
                            respuesta_anatomia:  $('select[name="respuesta_anatomia"]').val(),
                            respuesta_anatomia_extra: $('input[name="respuesta_anatomia_extra"]').val(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_bvm: $('input[name="respuesta_bvm"]').val(),
                            respuesta_ccca: $('input[name="respuesta_ccca"]').val(),
                            respuesta_ccca_pct: $('input[name="respuesta_ccca_pct"]').val(),
                            respuesta_sexo_fetal: $('select[name="respuesta_sexo_fetal"]').val(),
                        }
                        args.respuesta_uterina_derecha_percentil = args.respuesta_uterina_derecha_percentil.replace("Pct. ", "");
                        args.respuesta_uterina_izquierda_percentil = args.respuesta_uterina_izquierda_percentil.replace("Pct. ", "");
                        args.respuesta_ccca_pct = args.respuesta_ccca_pct.replace("Pct. ", "");
                        args.respuesta_umbilical_percentil = args.respuesta_umbilical_percentil.replace("Pct. ", "");
                        args.respuesta_cm_percentil = args.respuesta_cm_percentil.replace("Pct. ", "");
                    }
                    $.post('dashboard/save', args).done(function(data){
                        $("#ver\\.interconsulta").modal("hide");
                        $("#interconsultas\\.estado\\.finalizadas").button('toggle').trigger("click");
                        $('#mensaje\\.dialogo').modal("hide");
                        $('#mensaje\\.dialogo').remove();
                    });
                });

                $("input[name='respuesta_bvm']").keypress(function( event ) {
                    if ( event.which == 13 ) {
                       event.preventDefault();
                       $("input[name='respuesta_dbp']").focus();
                    }
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