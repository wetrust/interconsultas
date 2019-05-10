var nombreprofesionalPegar = "";
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

function cargarCorreosProfesionales(){
    $.get(_api + 'profesionales_email').done(function(data){
        $('#interfaz\\.email').empty();
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';

            $.each(data, function(i, value) {
                response = '<option value="' + data[i].solicitud_email +'">' + data[i].solicitud_email +'</option>';
                $('#interfaz\\.email').append(response);
            });
        }
    });
}

function cargarCiudad(){
    $.get(_api + 'ciudades').done(function(data){
        $('#filtro\\.ciudad').empty().append('<option value="">No Seleccionado</option>');
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
        $('#filtro\\.lugar').empty().append('<option value="">No Seleccionado</option>');
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
    $("#exampleModal").data("informe", informe).data("solicitud", solicitud).modal("show");
}

function loadNews(){
    $.get('dashboard/news').done(function(data){
        $('#tabla\\.resultado').empty();
        
        if (Object.keys(data).length > 0) {
            var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Motivo de exámen</th><th>Solicitado</th><th>Accion</th></tr></thead><tbody>';

            $.each(data, function(i, value) {

                let fecha = value.solicitud_fecha.split('-');
                fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];

                tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + value.solicitud_diagnostico +'</td><td>'+ fecha +'</td>';
                tabla += '<td><button class="btn btn-secondary" data-id='+ value.solicitud_id + '>Ver</button></td></tr>';
            });

            tabla += '</tbody>';
            
            $('#tabla\\.resultado').append(tabla);

            $('#tabla\\.resultado tr > td > button').on("click", function(){
                let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta > div").removeClass("h-100");
                $("#ver\\.interconsulta > div > div").removeClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("Datos de la interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty().append('<input type="hidden" id="solicitud_id" value=""/><div class="row"> <div class="col form-group"><label>Nombre del paciente:</label><input type="text" class="form-control" disabled id="solicitud_nombre"></div><div class="col form-group"><label>RUT del paciente:</label><input type="text" class="form-control" disabled id="solicitud_rut"></div><div class="col form-group"><label>Fecha de solicitud:</label><input type="text" class="form-control" disabled id="solicitud_fecha"></div></div><div class="row"> <div class="col form-group"><label>Ege conocida precozmente</label><input type="text" class="form-control" disabled id="eg_precoz"></div><div class="col form-group"><label>Ecografía previa de crecimiento</label><input type="text" class="form-control" disabled id="ecografia_previa"></div></div><div class="row"> <div class="col form-group"><label>FUM operacional</label><input type="date" class="form-control" disabled id="solicitud_fum"></div><div class="col form-group"><label>Edad Gestacional</label><input type="text" class="form-control" disabled id="solicitud_egestacional"></div></div><div class="row"> <div class="col form-group"><label>Diagnóstico de referencia</label><input type="text" class="form-control" disabled id="solicitud_diagnostico"></div></div><div class="row"> <div class="col form-group"><label>Ciudad procedencia de la paciente</label><input type="text" class="form-control" disabled id="solicitud_ciudad"></div><div class="col form-group"><label>Lugar de control prenatal</label><input type="text" class="form-control" disabled id="solicitud_lugar"></div></div><div class="row"> <div class="col form-group"><label>Datos del profesional referente</label><input type="text" class="form-control" disabled id="interconsulta_profesional"></div></div><div class="row"> <div class="col form-group"><label>Nombre:</label><input type="text" class="form-control" disabled id="solicitud_nombreprofesional"></div><div class="col form-group"><label>Email (de trabajo):</label><input type="text" class="form-control" disabled id="solicitud_email"></div></div><h5><span class="badge badge-default p-2" for="interconsulta.profesional"><strong>Ecografista de contrarreferencia</strong></span></h5><div class="row"> <div class="col form-group"><label>Nombre:</label><input type="text" class="form-control" disabled id="solicitud_nombre_referente"></div><div class="col form-group"><label>Email (contrareferencia)</label><input type="text" class="form-control" disabled id="solicitud_profesionalemail"></div></div><h4>Evaluación de solicitud ecográfica</h4><div class="row"> <div class="col-4 form-group"><label>Fecha</label><input type="date" class="form-control" id="evaluacion_fecha"></div><div class="col form-group"><label for="interconsulta.comentario.respuesta"><strong>Comentario</strong></label><input type="text" class="form-control" id="comentario"></div></div>');

                $.get('dashboard/agendar/' + solicitud_id).done(function(data){
                    $("#solicitud_id").val(data.solicitud_id);
                    $("#solicitud_nombre").val(data.solicitud_nombre);
                    $("#solicitud_rut").val(data.solicitud_rut);
                    $("#solicitud_fecha").val(data.solicitud_fecha);
                    let eg = data.solicitud_eg;
                    if (eg == "1"){
                        eg = "Si";
                    }
                    else{
                        eg = "No";
                    }
                    $("#eg_precoz").val(eg);
                    
                    let eco = data.solicitud_eco;
                    if (eco == "1"){
                        eco = "Si";
                    }
                    else{
                        eco = "No";
                    }

                    $("#ecografia_previa").val(eco);
                    $("#solicitud_fum").val(data.solicitud_fum);
                    $("#solicitud_egestacional").val(data.solicitud_egestacional);
                    $("#solicitud_diagnostico").val(data.solicitud_diagnostico);
                    $("#solicitud_ciudad").val(data.solicitud_ciudad);
                    $("#solicitud_lugar").val(data.solicitud_lugar);
                    $("#interconsulta_profesional").val(data.solicitud_profesional);
                    $("#solicitud_nombreprofesional").val(data.solicitud_nombreprofesional);
                    $("#solicitud_email").val(data.solicitud_email);
                    $("#solicitud_nombre_referente").val(data.solicitud_nombre_referente);
                    $("#solicitud_profesionalemail").val(data.solicitud_profesionalemail);
                });

                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty().prepend('<button id="boton.interconsulta.enviar" class="btn btn-primary">Enviar respuesta</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
                $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                    let solicitud_id =  $(this).data("id");
                    $("#ver\\.interconsulta\\.contenedor > iframe").attr("src", "dashboard/delete/" + solicitud_id);
                    $("#ver\\.interconsulta").modal("hide");
                    loadNews();
                });

                $("#boton\\.interconsulta\\.enviar").on("click", function(){

                    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><h3 class="text-danger text-center">ESTAMOS ENVIANDO SU RESPUESTA</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
                    $('#mensaje\\.dialogo').modal("show");

                    $('#mensaje\\.dialogo').on('hidden.bs.modal', function (e) {
                        $('#mensaje\\.dialogo').modal("hide");
                        $(this).remove();
                    });

                    let dav = {
                        solicitud_id: $("#solicitud_id").val(),
                        evaluacion_fecha: $("#evaluacion_fecha").val(),
                        comentario: $("#comentario").val()
                    }

                    $.post('dashboard/editSave', dav).done(function(data){
                        $("#ver\\.interconsulta").modal("hide");
                        $("#interconsultas\\.estado\\.espera").button('toggle').trigger("click");

                        $('#mensaje\\.dialogo').modal("hide");
                        $('#mensaje\\.dialogo').remove();
                    });
                });
            });
        }
    });
}

function loadInProcess(){
    $.get('dashboard/process').done(function(data){
        $('#tabla\\.resultado').empty();
        
        if (Object.keys(data).length > 0) {
            var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Motivo de exámen</th><th>Solicitado</th><th>Accion</th></tr></thead><tbody>';

            $.each(data, function(i, value) {

                let fecha = value.solicitud_fecha.split('-');
                fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];

                tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + value.solicitud_diagnostico +'</td><td>' + fecha +'</td>';

                tabla += '<td><button class="btn btn-secondary" data-id='+ value.solicitud_id + '>Ver</button></td></tr>';
            });

            tabla += '</tbody>';
            $('#tabla\\.resultado').append(tabla);
        

            $('#tabla\\.resultado tr > td > button').on("click", function(){
                let solicitud_id =  $(this).data("id");
                $("#ver\\.interconsulta > div").removeClass("h-100");
                $("#ver\\.interconsulta > div > div").removeClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("Datos de la interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty();
                $("#ver\\.interconsulta\\.contenedor").append('<div class="card-header g-verde" id="headingOne"> <button class="btn btn-link text-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Datos de la interconsulta</button></div><div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#ver\\.interconsulta\\.contenedor"> <div class="card-body"><input type="hidden" id="solicitud_id" value=""/><div class="row"> <div class="col form-group"><label>Nombre del paciente:</label><input type="text" class="form-control" disabled id="solicitud_nombre"></div><div class="col form-group"><label>RUT del paciente:</label><input type="text" class="form-control" disabled id="solicitud_rut"></div><div class="col form-group"><label>Fecha de solicitud:</label><input type="text" class="form-control" disabled id="solicitud_fecha"></div></div><div class="row"> <div class="col form-group"><label>Ege conocida precozmente</label><input type="text" class="form-control" disabled id="eg_precoz"></div><div class="col form-group"><label>Ecografía previa de crecimiento</label><input type="text" class="form-control" disabled id="ecografia_previa"></div></div><div class="row"> <div class="col form-group"><label>FUM operacional</label><input type="date" class="form-control" disabled id="solicitud_fum"></div><div class="col form-group"><label>Edad Gestacional</label><input type="text" class="form-control" disabled id="solicitud_egestacional"></div></div><div class="row"> <div class="col form-group"><label>Diagnóstico de referencia</label><input type="text" class="form-control" disabled id="solicitud_diagnostico"></div></div><div class="row"> <div class="col form-group"><label>Ciudad procedencia de la paciente</label><input type="text" class="form-control" disabled id="solicitud_ciudad"></div><div class="col form-group"><label>Lugar de control prenatal</label><input type="text" class="form-control" disabled id="solicitud_lugar"></div></div><div class="row"> <div class="col form-group"><label>Datos del profesional referente</label><input type="text" class="form-control" disabled id="interconsulta_profesional"></div></div><div class="row"> <div class="col form-group"><label>Nombre:</label><input type="text" class="form-control" disabled id="solicitud_nombreprofesional"></div><div class="col form-group"><label>Email (de trabajo):</label><input type="text" class="form-control" disabled id="solicitud_email"></div></div><h5><span class="badge badge-default p-2" for="interconsulta.profesional"><strong>Ecografista de contrarreferencia</strong></span></h5><div class="row"> <div class="col form-group"><label>Nombre:</label><input type="text" class="form-control" disabled id="solicitud_nombre_referente"></div><div class="col form-group"><label>Email (contrareferencia)</label><input type="text" class="form-control" disabled id="solicitud_profesionalemail"></div></div></div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<h5 class="my-3 text-center">Responder a esta solicitud de interconsulta</h5><div class="row"> <div class="col-3 form-group" id="jaja.papapa"> <label for="interconsulta.para">Fecha</label> <input type="text" disabled class="form-control" id="evaluacion_fecha"> </div><div class="col form-group"> <label for="interconsulta.comentario.respuesta">Comentario</label> <input disabled class="form-control" id="evaluacion_comentarios"/> </div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<h5 class="my-3 text-primary text-center">Contrarreferencia inicial desde unidad de ultrasonografía gineco-obstétrica</h5><div class="row"> <div class="col-6 form-group"> <label><strong>Tipo de exámen solicitado</strong></label> </div><div class="col form-group"> <select class="form-control" name="solicitud_crecimiento" id="interconsulta.respuesta.crecimiento"> <option value="1">Eco Primer trimestre</option> <option value="2">Eco 2do / 3cer trimestre</option> <option value="4">Doppler uterinas</option><option value="5">Doppler umbilical</option> <option value="0" selected>Eco Doppler crecimiento</option> <option value="3">Eco Ginecológica</option> </select> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.fecha">Fecha evaluación de interconsulta</label> <input type="date" class="form-control" id="interconsulta.respuesta.fecha"> </div><div class="col form-group" id="interconsulta.respuesta.edadgestacional"> <label for="interconsulta.respuesta.eg">Edad gestacional actual</label> <input type="hidden" class="form-control" id="interconsulta.fum.copia" value="solicitud_fum"> <input type="text" class="form-control" id="interconsulta.respuesta.eg" disabled=""> <input type="hidden" class="form-control" name="respuesta_eg"> </div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<div id="multiproposito"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico</label> <select class="form-control" name="respuesta_liquido"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta</label> <input type="text" class="form-control" name="respuesta_placenta"> </div></div><div class="row"> <div class="col form-group"> <label>Evaluación de anatomía fetal</label> </div><div class="col form-group"><select class="form-control" name="respuesta_anatomia"><option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos de siguientes patologías:">hallazgos ecográficos compatible con:</option> </select> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.pfe"><strong>A.- Biometría ecográfica:</strong> <br>Peso fetal estimado</label> <input type="number" class="form-control" name="respuesta_pfe" id="interconsulta.respuesta.pfe"> </div><div class="col form-group"> <label for="interconsulta.respuesta.pfe.percentil">&nbsp; <br>Percentil</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.pfe.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_pfe_percentil"> </div></div><div class="row"><div class="col-12"><strong>B.- Flujometría Doppler</strong></div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas">IP. Promedio uterinas</label> <input type="text" class="form-control" name="respuesta_uterinas" id="interconsulta.respuesta.uterinas"> </div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.uterinas.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_uterinas_percentil"> </div><div class="col form-group"> <label for="interconsulta.respuesta.umbilical">IP. Arteria umbilical</label> <input type="text" class="form-control" name="respuesta_umbilical" id="interconsulta.respuesta.umbilical"> </div><div class="col form-group"> <label for="interconsulta.respuesta.umbilical.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.umbilical.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_umbilical_percentil"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.cm">IP. Cerebral media</label> <input type="text" class="form-control" name="respuesta_cm" id="interconsulta.respuesta.cm"> </div><div class="col form-group"> <label for="interconsulta.respuesta.cm.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.cm.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_cm_percentil"> </div><div class="col form-group"> <label for="interconsulta.respuesta.cmau">Cuociente CM / AU</label> <input type="text" disabled class="form-control" id="interconsulta.respuesta.cmau"> <input type="hidden" class="form-control" name="respuesta_cmau"> </div><div class="col form-group"> <label for="interconsulta.respuesta.cm.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.cmau.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_cmau_percentil"> </div></div><div class="row"> <div class="col-12"> <p><strong>Hipótesis diagnóstica</strong></p></div><div class="col-6 form-group"> <label for="interconsulta.respuesta.hipotesis"><strong>Crecimiento fetal</strong></label> <select class="form-control" name="respuesta_hipotesis"> <option value="Disminuido < p3">Disminuido < p3</option> <option value="Disminuido < p10">Disminuido < p10</option> <option value="Normal p10 - p 25">Normal p10 - p 25</option> <option value="Normal p26 - p50">Normal p26 - p50</option> <option value="Normal p51 - p 75">Normal p51 - p 75</option> <option value="Normal p76 - p90">Normal p76 - p90</option> <option value="Grande >p90">Grande >p90</option> <option value="Grande >p97">Grande >p97</option> </select> </div><div class="col-6 form-group"> <label for="interconsulta.respuesta.hipotesis"><strong>Flujometría Doppler</strong></label> <select class="form-control" name="respuesta_doppler"> <option value="Materno Normal + Fetal Normal">Materno Normal + Fetal Normal</option> <option value="Materno Alterado + Fetal Alterado">Materno Alterado + Fetal Alterado</option> <option value="Materno Alterado + Fetal Normal">Materno Alterado + Fetal Normal</option> <option value="Materno Normal + Fetal Alterado">Materno Normal + Fetal Alterado</option> <option value="Materno Normal + Fetal Alterado Solo CCP">Materno Normal + Fetal Alterado Solo CCP</option> <option value="Materno Normal + Fetal Alterado CCP + ACM">Materno Normal + Fetal Alterado CCP + ACM</option> <option value="Materno Normal + Fetal Alterado CCP + ACM + UMB">Materno Normal + Fetal Alterado CCP + ACM + UMB</option> <option value="Materno Alterado + Fetal Alterado Solo CCP">Materno Alterado + Fetal Alterado Solo CCP</option> <option value="Materno Alterado + Fetal Alterado CCP + ACM">Materno Alterado + Fetal Alterado CCP + ACM</option> <option value="Materno Alterado + Fetal Alterado CCP + ACM + UMB">Materno Alterado + Fetal Alterado CCP + ACM + UMB</option> </select> </div></div></div>');
                $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios de exámen</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');

                $.get('dashboard/agendar/' + solicitud_id).done(function(data){
                    $("#solicitud_id").val(data.solicitud_id);
                    $("#solicitud_nombre").val(data.solicitud_nombre);
                    $("#solicitud_rut").val(data.solicitud_rut);
                    $("#solicitud_fecha").val(data.solicitud_fecha);
                    let eg = data.solicitud_eg;
                    if (eg == "1"){
                        eg = "Si";
                    }
                    else{
                        eg = "No";
                    }
                    $("#eg_precoz").val(eg);
                    
                    let eco = data.solicitud_eco;
                    if (eco == "1"){
                        eco = "Si";
                    }
                    else{
                        eco = "No";
                    }

                    $("#ecografia_previa").val(eco);
                    $("#solicitud_fum").val(data.solicitud_fum);
                    $('#interconsulta\\.fum\\.copia').val(data.solicitud_fum);
                    $("#solicitud_egestacional").val(data.solicitud_egestacional);
                    $("#solicitud_diagnostico").val(data.solicitud_diagnostico);
                    $("#solicitud_ciudad").val(data.solicitud_ciudad);
                    $("#solicitud_lugar").val(data.solicitud_lugar);
                    $("#interconsulta_profesional").val(data.solicitud_profesional);
                    $("#solicitud_nombreprofesional").val(data.solicitud_nombreprofesional);
                    $("#solicitud_email").val(data.solicitud_email);
                    $("#solicitud_nombre_referente").val(data.solicitud_nombre_referente);
                    $("#solicitud_profesionalemail").val(data.solicitud_profesionalemail);

                    nombreprofesionalPegar = data.solicitud_nombre_referente;
                    $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                });

                $.get('dashboard/edit/' + solicitud_id).done(function(data){
                    $("#evaluacion_fecha").val(data.evaluacion_fecha);
                    $("#evaluacion_comentarios").val(data.evaluacion_comentarios);
                });

                $('#interconsulta\\.respuesta\\.crecimiento').on("change", function(){
                    if ($(this).val() == 5){
                        $("#ginecologica").remove();
                        $("#multiproposito").remove();
                        $("#final").remove();
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#doppleruterinas").remove();
                    }
                    else if ($(this).val() == 4){
                        $("#ginecologica").remove();
                        $("#multiproposito").remove();
                        $("#final").remove();
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="doppleruterinas"> <div class="row"> <div class="col form-group"> <label>Evaluación de anatomía fetal</label> </div><div class="col form-group"><select class="form-control" name="respuesta_anatomia"><option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos de siguientes patologías:">hallazgos ecográficos compatible con:</option> </select> </div></div><div class="row"> <div class="col form-group"> <label>Embrión</label> <input type="text" class="form-control" name="respuesta_embrion"> </div><div class="col form-group"> <label>LCN (mm)</label> <input type="text" class="form-control" name="respuesta_lcn"> </div><div class="col form-group"> <label>Eg. x LCN</label> <input type="text" class="form-control" name="respuesta_lcn_eg_ver" disabled><input type="hidden" class="form-control" name="respuesta_lcn_eg"> </div><div class="col form-group"> <label>FCF</label> <input type="text" class="form-control" name="respuesta_fcf"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">CC (mm)</label> <input type="text" class="form-control" name="respuesta_cc"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">CA (mm)</label> <input type="text" class="form-control" name="respuesta_ca"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">LF (mm)</label> <input type="text" class="form-control" name="respuesta_lf"> </div></div><div class="row"> <div class="col-12"><strong>Flujometría Doppler</strong></div><div class="col form-group"> <label>IP. Uterina Derecha</label> <input type="text" class="form-control" name="respuesta_uterina_derecha"> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_uterina_derecha_percentil_view" disabled> </div><input type="hidden" class="form-control" name="respuesta_uterina_derecha_percentil"> </div><div class="col form-group"> <label>IP. Uterina Izquierda</label> <input type="text" class="form-control" name="respuesta_uterina_izquierda"> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_uterina_izquierda_percentil_view" disabled> </div><input type="hidden" class="form-control" name="respuesta_uterina_izquierda_percentil"> </div></div><div class="row"> <div class="col form-group"> <label>IP. Promedio uterinas</label> <input type="text" class="form-control" name="respuesta_uterinas_view" disabled> <input type="hidden" class="form-control" name="respuesta_uterinas" disabled> </div><div class="col form-group"> <label>&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_uterinas_promedio_view" disabled> </div><input type="hidden" class="form-control" name="respuesta_uterinas_promedio"> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios de exámen</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                    
                        $("input[name='respuesta_uterina_derecha']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_uterina_derecha_percentil_view']").val(pctUtAdvanced(eg,ut));
                                $("input[name='respuesta_uterina_derecha_percentil']").val(pctUtAdvanced(eg,ut));

                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_izquierda']").val() > 0){
                                        var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_izquierda']").val())) / 2;
                                        $("input[name='respuesta_uterinas_view']").val(promedio.toFixed(2)).trigger("change");
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2));
                                    }
                                }
                            }
                        });

                        $("input[name='respuesta_uterina_izquierda']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_uterina_izquierda_percentil_view']").val(pctUtAdvanced(eg,ut));
                                $("input[name='respuesta_uterina_izquierda_percentil']").val(pctUtAdvanced(eg,ut));

                                if (ut > 0){
                                    if ($("input[name='respuesta_uterina_derecha']").val() > 0){
                                        var promedio = (parseFloat(ut) + parseFloat($("input[name='respuesta_uterina_derecha']").val())) / 2;
                                        $("input[name='respuesta_uterinas_view']").val(promedio.toFixed(2)).trigger("change");
                                        $("input[name='respuesta_uterinas']").val(promedio.toFixed(2));
                                    }
                                }
                            }
                        });

                        $("input[name='respuesta_uterinas_view']").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $(this).val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_uterinas_promedio_view']").val(pctUtAdvanced(eg,ut));
                                $("input[name='respuesta_uterinas_promedio']").val(pctUtAdvanced(eg,ut));
                            }
                        });

                        $("input[name='respuesta_lcn']").on("change", function(){
                            eglcn();
                        });
                    }
                    else if ($(this).val() == 3){
                        $("#doppleruterinas").remove();
                        $("#multiproposito").remove();
                        $("#final").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="ginecologica"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Útero</label> <input type="text" class="form-control" name="respuesta_utero_ginecologica"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Endometrio</label> <input type="text" class="form-control" name="respuesta_endometrio"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Izquierdo</label> <input type="text" class="form-control" name="respuesta_anexo_izquierdo_ginecologica"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Derecho</label> <input type="text" class="form-control" name="respuesta_anexo_derecho_ginecologica"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ovario Izquierdo</label> <input type="text" class="form-control" name="respuesta_ovario_izquierdo"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ovario Derecho</label> <input type="text" class="form-control" name="respuesta_ovario_derecho"> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista">Douglas</label> <input type="text" class="form-control" name="respuesta_douglas_ginecologica"> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios de exámen</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("#interconsulta\\.respuesta\\.edadgestacional").addClass("d-none");
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#editable").attr("rows", 3);

                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                    }
                    else if ($(this).val() == 2){
                        $("#doppleruterinas").remove();
                        $("#final").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="segundotrimestre"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion_segundo"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso_segundo"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico</label> <select class="form-control" name="respuesta_liquido_amniotico"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta</label> <input type="text" class="form-control" name="respuesta_placenta"> </div></div><div class="row"> <div class="col form-group"> <label>Evaluación de anatomía fetal</label></div><div class="col form-group"><select class="form-control" name="respuesta_anatomia_segundo"> <option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos de siguientes patologías:">hallazgos ecográficos compatible con:</option> </select> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">DBP (mm)</label> <input type="text" class="form-control" name="respuesta_dbp"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">CC (mm)</label> <input type="text" class="form-control" name="respuesta_cc"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">CA (mm)</label> <input type="text" class="form-control" name="respuesta_ca"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">LF (mm)</label> <input type="text" class="form-control" name="respuesta_lf"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">PFE</label> <input type="text" class="form-control" name="respuesta_pfe_ver_segundo" disabled> <input type="hidden" class="form-control" name="respuesta_pfe_segundo"> </div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_pfe_pct_ver_segundo" disabled> </div><input type="hidden" class="form-control" name="respuesta_pfe_pct_segundo"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">CC/CA</label> <input type="text" class="form-control" name="respuesta_ccca_ver" disabled> <input type="hidden" class="form-control" name="respuesta_ccca"> </div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" name="respuesta_ccca_pct_ver" disabled> </div><input type="hidden" class="form-control" name="respuesta_ccca_pct"> </div></div><div class="row"> <div class="col-12"> <p><strong>Hipótesis diagnóstica</strong></p></div><div class="col-6 form-group"> <label for="interconsulta.respuesta.hipotesis"><strong>Crecimiento fetal</strong></label> <select class="form-control" name="respuesta_hipotesis_segundo"> <option value="Disminuido < p3">Disminuido < p3</option> <option value="Disminuido < p10">Disminuido < p10</option> <option value="Normal p10 - p 25">Normal p10 - p 25</option> <option value="Normal p26 - p50">Normal p26 - p50</option> <option value="Normal p51 - p 75">Normal p51 - p 75</option> <option value="Normal p76 - p90">Normal p76 - p90</option> <option value="Grande >p90">Grande >p90</option> <option value="Grande >p97">Grande >p97</option> </select> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios de exámen</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("#multiproposito").remove();
                        $("#ginecologica").remove();
                        $("#interconsulta\\.respuesta\\.edadgestacional").removeClass("d-none");
                        $("#primertrimestre").remove();
                        $("#editable").attr("rows", 3);
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);

                        $("input[name='respuesta_cc']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        });
                        $("input[name='respuesta_ca']").on("change", function(){
                            psohdlk();
                            calCCCA();
                        });
            
                        $("input[name='respuesta_pfe_segundo']").on("change", function(){
            
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var pfe = $("input[name='respuesta_pfe_segundo']").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
                                eg =  parseFloat(eg).toFixed();
                                $("input[name='respuesta_pfe_pct_segundo']").val(pctpfeAdvanced(eg,pfe));
                                $("input[name='respuesta_pfe_pct_ver_segundo']").val(pctpfeAdvanced(eg,pfe));
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
                                $("input[name='respuesta_ccca_pct_ver']").val(pctcccaAdvanced(eg,ccca));
                            }
                        });
                    }
                    else if ($(this).val() == 1){
                        $("#final").remove();
                        $("#doppleruterinas").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="primertrimestre"> <div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">útero</label> <input type="text" class="form-control" name="respuesta_utero_primertrimestre"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Saco gestacional</label> <input type="text" class="form-control" name="respuesta_saco_gestacional"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Embrión</label> <input type="text" class="form-control" name="respuesta_embrion"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">LCN</label> <input type="text" class="form-control" name="respuesta_lcn"> </div><div class="col-3 form-group"> <label for="interconsulta.respuesta.ecografista">Eg. x LCN</label> <input type="text" class="form-control" name="respuesta_lcn_eg_ver" disabled> <input type="hidden" class="form-control" name="respuesta_lcn_eg"> </div></div><div class="row"> <div class="col form-group"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">FUR Operacional</label> <input type="text" class="form-control" name="respuesta_furop" disabled> </div><div class="col-3 form-group"> <label for="interconsulta.respuesta.ecografista">FPP actualizada</label> <input type="text" class="form-control" name="respuesta_fppactualizada" disabled> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Izquierdo</label> <input type="text" class="form-control" name="respuesta_anexo_izquierdo_primertrimestre"> </div><div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Anexo Derecho</label> <input type="text" class="form-control" name="respuesta_anexo_derecho_primertrimestre"> </div></div><div class="row"> <div class="col-6 form-group"> <label for="interconsulta.respuesta.ecografista">Douglas</label> <input type="text" class="form-control" name="respuesta_douglas_primertrimestre"> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios de exámen</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("input[name='respuesta_lcn']").on("change", function(){
                            eglcn();
                        });
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                        $("#segundotrimestre").remove();
                        $("#multiproposito").remove();
                        $("#ginecologica").remove();
                        $("#interconsulta\\.respuesta\\.edadgestacional").removeClass("d-none");
                        $("#editable").attr("rows", 3);
                    }
                    else{
                        $("#doppleruterinas").remove();
                        $("#final").remove();
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="multiproposito"> <div class="row"> <div class="col form-group"> <label>Feto en presentación</label> <select class="form-control" name="respuesta_presentacion"> <option value="cefálica">Cefálica</option> <option value="podálica">Podálica</option> <option value="transversa">Transversa</option> <option value="indiferente">Indiferente</option> </select> </div><div class="col form-group"> <label>Dorso fetal</label> <select class="form-control" name="respuesta_dorso"> <option value="anterior">Anterior</option> <option value="lat. izquierdo">Lateralizado izquierdo</option> <option value="posterior">Posterior</option> <option value="lat. derecho">Lateralizado derecho</option> </select> </div><div class="col form-group"> <label for="interconsulta.respuesta.liquido">Líquido amniótico</label> <select class="form-control" name="respuesta_liquido"> <option value="Normal">Normal</option> <option value="Pha leve">PHA leve</option> <option value="Pha severo">PHA severo</option> <option value="Oha leve">OHA leve</option> <option value="Oha severo">OHA severo</option> </select> </div></div><div class="row"><div class="col-4 form-group"> <label for="interconsulta.respuesta.ecografista">Placenta</label> <input type="text" class="form-control" name="respuesta_placenta"> </div></div><div class="row"> <div class="col form-group"> <label>Evaluación de anatomía fetal</label> </div><div class="col form-group"><select class="form-control" name="respuesta_anatomia"><option value="de aspecto general normal">de aspecto general normal</option> <option value="hallazgos de siguientes patologías:">hallazgos ecográficos compatible con:</option> </select> </div></div><div class="row"><div class="col form-group"> <label for="interconsulta.respuesta.pfe"><strong>A.- Biometría ecográfica:</strong> <br>Peso fetal estimado</label> <input type="number" class="form-control" name="respuesta_pfe" id="interconsulta.respuesta.pfe"> </div><div class="col form-group"> <label for="interconsulta.respuesta.pfe.percentil">&nbsp; <br>Percentil</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.pfe.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_pfe_percentil"> </div></div><div class="row"><div class="col-12"><strong>B.- Flujometría Doppler</strong></div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas">IP. Promedio uterinas</label> <input type="text" class="form-control" name="respuesta_uterinas" id="interconsulta.respuesta.uterinas"> </div><div class="col form-group"> <label for="interconsulta.respuesta.uterinas.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.uterinas.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_uterinas_percentil"> </div><div class="col form-group"> <label for="interconsulta.respuesta.umbilical">IP. Arteria umbilical</label> <input type="text" class="form-control" name="respuesta_umbilical" id="interconsulta.respuesta.umbilical"> </div><div class="col form-group"> <label for="interconsulta.respuesta.umbilical.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.umbilical.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_umbilical_percentil"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.cm">IP. Cerebral media</label> <input type="text" class="form-control" name="respuesta_cm" id="interconsulta.respuesta.cm"> </div><div class="col form-group"> <label for="interconsulta.respuesta.cm.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.cm.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_cm_percentil"> </div><div class="col form-group"> <label for="interconsulta.respuesta.cmau">Cuociente CM / AU</label> <input type="text" disabled class="form-control" id="interconsulta.respuesta.cmau"> <input type="hidden" class="form-control" name="respuesta_cmau"> </div><div class="col form-group"> <label for="interconsulta.respuesta.cm.percentil">&nbsp;</label> <div class="input-group mb-2"> <div class="input-group-prepend"> <div class="input-group-text">Pct</div></div><input type="text" class="form-control" id="interconsulta.respuesta.cmau.percentil" disabled=""> </div><input type="hidden" class="form-control" name="respuesta_cmau_percentil"> </div></div><div class="row"> <div class="col-12"> <p><strong>Hipótesis diagnóstica</strong></p></div><div class="col-6 form-group"> <label for="interconsulta.respuesta.hipotesis"><strong>Crecimiento fetal</strong></label> <select class="form-control" name="respuesta_hipotesis"> <option value="Disminuido < p3">Disminuido < p3</option> <option value="Disminuido < p10">Disminuido < p10</option> <option value="Normal p10 - p 25">Normal p10 - p 25</option> <option value="Normal p26 - p50">Normal p26 - p50</option> <option value="Normal p51 - p 75">Normal p51 - p 75</option> <option value="Normal p76 - p90">Normal p76 - p90</option> <option value="Grande >p90">Grande >p90</option> <option value="Grande >p97">Grande >p97</option> </select> </div><div class="col-6 form-group"> <label for="interconsulta.respuesta.hipotesis"><strong>Flujometría Doppler</strong></label> <select class="form-control" name="respuesta_doppler"> <option value="Materno Normal + Fetal Normal">Materno Normal + Fetal Normal</option> <option value="Materno Alterado + Fetal Alterado">Materno Alterado + Fetal Alterado</option> <option value="Materno Alterado + Fetal Normal">Materno Alterado + Fetal Normal</option> <option value="Materno Normal + Fetal Alterado">Materno Normal + Fetal Alterado</option> <option value="Materno Normal + Fetal Alterado Solo CCP">Materno Normal + Fetal Alterado Solo CCP</option> <option value="Materno Normal + Fetal Alterado CCP + ACM">Materno Normal + Fetal Alterado CCP + ACM</option> <option value="Materno Normal + Fetal Alterado CCP + ACM + UMB">Materno Normal + Fetal Alterado CCP + ACM + UMB</option> <option value="Materno Alterado + Fetal Alterado Solo CCP">Materno Alterado + Fetal Alterado Solo CCP</option> <option value="Materno Alterado + Fetal Alterado CCP + ACM">Materno Alterado + Fetal Alterado CCP + ACM</option> <option value="Materno Alterado + Fetal Alterado CCP + ACM + UMB">Materno Alterado + Fetal Alterado CCP + ACM + UMB</option> </select> </div></div></div>');
                        $("#ver\\.interconsulta\\.contenedor").append('<div id="final"><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.comentariosexamen"><strong>Comentarios de exámen</strong></label> <textarea type="text" rows="2" class="form-control" name="respuesta_comentariosexamen" id="editable"></textarea> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.respuesta.ecografista">Ecografista</label> <input type="text" class="form-control" name="respuesta_ecografista"> </div></div></div>');
                        $("#ginecologica").remove();
                        $("#segundotrimestre").remove();
                        $("#primertrimestre").remove();
                        $("#interconsulta\\.respuesta\\.edadgestacional").removeClass("d-none");
                        $("#editable").attr("rows", 3);
                        $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                        $("#interconsulta\\.respuesta\\.uterinas").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var ut = $("#interconsulta\\.respuesta\\.uterinas").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("#interconsulta\\.respuesta\\.uterinas\\.percentil").val(pctUtAdvanced(eg,ut));
                                $("input[name='respuesta_uterinas_percentil']").val(pctUtAdvanced(eg,ut));
                            }
                        })
            
                        $("#interconsulta\\.respuesta\\.pfe").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var pfe = $("#interconsulta\\.respuesta\\.pfe").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("#interconsulta\\.respuesta\\.pfe\\.percentil").val(pctpfeAdvanced(eg,pfe));
                                $("input[name='respuesta_pfe_percentil']").val(pctpfeAdvanced(eg,pfe));
            
                            }
                        });
            
                        $("#interconsulta\\.respuesta\\.cm").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var acm = $("#interconsulta\\.respuesta\\.cm").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("#interconsulta\\.respuesta\\.cm\\.percentil").val(pctacmAdvanced(eg,acm));
                                $("input[name='respuesta_cm_percentil']").val(pctacmAdvanced(eg,acm));
            
                            }
            
                            if (acm > 0){
                                if ($("#interconsulta\\.respuesta\\.umbilical").val() > 0){
                                    var ccp = (acm / $('#interconsulta\\.respuesta\\.umbilical').val());
                                    $('#interconsulta\\.respuesta\\.cmau').val(ccp.toFixed(2)).trigger("change");
                                    $("input[name='respuesta_cmau']").val(ccp.toFixed(2));
                                }
                            }
                        });
            
                        $("#interconsulta\\.respuesta\\.umbilical").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var aumb = $("#interconsulta\\.respuesta\\.umbilical").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("#interconsulta\\.respuesta\\.umbilical\\.percentil").val(pctauAdvanced(eg,aumb));
                                $("input[name='respuesta_umbilical_percentil']").val(pctauAdvanced(eg,aumb));
            
                            }
            
                            if ($("#interconsulta\\.respuesta\\.cm").val() > 0){
                                if ($("#interconsulta\\.respuesta\\.umbilical").val() > 0){
                                    var ccp = ($("#interconsulta\\.respuesta\\.cm").val() / $('#interconsulta\\.respuesta\\.umbilical').val());
                                    $('#interconsulta\\.respuesta\\.cmau').val(ccp.toFixed(2)).trigger("change"); 
                                    $("input[name='respuesta_cmau']").val(ccp.toFixed(2));                       
                                }
                            }
                        });
            
                        $("#interconsulta\\.respuesta\\.cmau").on("change", function(){
                            var eg = $("#interconsulta\\.respuesta\\.eg").val();
                            var cmau = $("#interconsulta\\.respuesta\\.cmau").val();
            
                            eg = String(eg);
                            eg = eg.replace("semanas", "");
            
                            if (eg.length > 0){
            
                                eg =  parseFloat(eg).toFixed();
                                $("#interconsulta\\.respuesta\\.cmau\\.percentil").val(pctcmauAdvanced(eg,cmau));
                                $("input[name='respuesta_cmau_percentil']").val(pctcmauAdvanced(eg,cmau));
            
                            }
                        });
                    }
                });

                $('#interconsulta\\.respuesta\\.fecha').on('change', function () {
                    var FExamen,FUM,EdadGestacional;
                    var undia = 1000 * 60 * 60 * 24;
                    var unasemana = undia * 7;
                    FUM = $('#interconsulta\\.fum\\.copia').val();
                    FExamen = $('#interconsulta\\.respuesta\\.fecha').val();
                    FUM = new Date(FUM);
                    FExamen = new Date(FExamen);
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
                });

                $("#interconsulta\\.respuesta\\.uterinas").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var ut = $("#interconsulta\\.respuesta\\.uterinas").val();

                    eg = String(eg);
                    eg = eg.replace("semanas", "");

                    if (eg.length > 0){

                        eg =  parseFloat(eg).toFixed();
                        $("#interconsulta\\.respuesta\\.uterinas\\.percentil").val(pctUtAdvanced(eg,ut));
                        $("input[name='respuesta_uterinas_percentil']").val(pctUtAdvanced(eg,ut));
                    }
                })

                $("#interconsulta\\.respuesta\\.pfe").on("change", function(){

                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var pfe = $("#interconsulta\\.respuesta\\.pfe").val();

                    eg = String(eg);
                    eg = eg.replace("semanas", "");

                    if (eg.length > 0){

                        eg =  parseFloat(eg).toFixed();
                        $("#interconsulta\\.respuesta\\.pfe\\.percentil").val(pctpfeAdvanced(eg,pfe));
                        $("input[name='respuesta_pfe_percentil']").val(pctpfeAdvanced(eg,pfe));

                    }
                });

                $("#interconsulta\\.respuesta\\.cm").on("change", function(){

                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var acm = $("#interconsulta\\.respuesta\\.cm").val();

                    eg = String(eg);
                    eg = eg.replace("semanas", "");

                    if (eg.length > 0){

                        eg =  parseFloat(eg).toFixed();
                        $("#interconsulta\\.respuesta\\.cm\\.percentil").val(pctacmAdvanced(eg,acm));
                        $("input[name='respuesta_cm_percentil']").val(pctacmAdvanced(eg,acm));

                    }

                    if (acm > 0){
                        if ($("#interconsulta\\.respuesta\\.umbilical").val() > 0){
                            var ccp = (acm / $('#interconsulta\\.respuesta\\.umbilical').val());
                            $('#interconsulta\\.respuesta\\.cmau').val(ccp.toFixed(2)).trigger("change");
                            $("input[name='respuesta_cmau']").val(ccp.toFixed(2));
                        }
                    }
                });

                $("#interconsulta\\.respuesta\\.umbilical").on("change", function(){

                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var aumb = $("#interconsulta\\.respuesta\\.umbilical").val();

                    eg = String(eg);
                    eg = eg.replace("semanas", "");

                    if (eg.length > 0){

                        eg =  parseFloat(eg).toFixed();
                        $("#interconsulta\\.respuesta\\.umbilical\\.percentil").val(pctauAdvanced(eg,aumb));
                        $("input[name='respuesta_umbilical_percentil']").val(pctauAdvanced(eg,aumb));

                    }

                    if ($("#interconsulta\\.respuesta\\.cm").val() > 0){
                        if ($("#interconsulta\\.respuesta\\.umbilical").val() > 0){
                            var ccp = ($("#interconsulta\\.respuesta\\.cm").val() / $('#interconsulta\\.respuesta\\.umbilical').val());
                            $('#interconsulta\\.respuesta\\.cmau').val(ccp.toFixed(2)).trigger("change"); 
                            $("input[name='respuesta_cmau']").val(ccp.toFixed(2));                       
                        }
                    }
                });

                $("#interconsulta\\.respuesta\\.cmau").on("change", function(){
                    var eg = $("#interconsulta\\.respuesta\\.eg").val();
                    var cmau = $("#interconsulta\\.respuesta\\.cmau").val();

                    eg = String(eg);
                    eg = eg.replace("semanas", "");

                    if (eg.length > 0){

                        eg =  parseFloat(eg).toFixed();
                        $("#interconsulta\\.respuesta\\.cmau\\.percentil").val(pctcmauAdvanced(eg,cmau));
                        $("input[name='respuesta_cmau_percentil']").val(pctcmauAdvanced(eg,cmau));

                    }
                });

                $('input[name="respuesta_ecografista"]').val(nombreprofesionalPegar);
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button class="btn btn-primary" id="enviar.respuesta.botton">Enviar respuesta</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
                $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                    let solicitud_id =  $(this).data("id");
                    $("#ver\\.interconsulta\\.contenedor > iframe").attr("src", "dashboard/delete/" + solicitud_id);
                    $("#ver\\.interconsulta").modal("hide");
                    loadInProcess();
                });

                $("#enviar\\.respuesta\\.botton").on("click", function(){
                    var tipoExm = $('#interconsulta\\.respuesta\\.crecimiento').val()

                    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><img src="https://crecimientofetal.cl/img/emoji.png" class="d-block mx-auto imng-fluid"><h3 class="text-danger text-center">ESTAMOS ENVIANDO SU RESPUESTA</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
                    $('#mensaje\\.dialogo').modal("show");

                    $('#mensaje\\.dialogo').on('hidden.bs.modal', function (e) {
                        $('#mensaje\\.dialogo').modal("hide");
                        $(this).remove();
                    });

                    if ($(this).val() == 3){
                        var args = {
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
            
                        $.post('dashboard/save', args).done(function(data){
                            $("#ver\\.interconsulta").modal("hide");
                            $("#interconsultas\\.estado\\.finalizadas").button('toggle').trigger("click");
                            $('#mensaje\\.dialogo').modal("hide");
                            $('#mensaje\\.dialogo').remove();
                        });
                    }
                    else if ($(this).val() == 2){
                        var args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
                            respuesta_placenta: $('input[name="respuesta_placenta"]').val(),
                            respuesta_liquido_amniotico: $('select[name="respuesta_liquido_amniotico"] option:selected').val(),
                            respuesta_dbp: $('input[name="respuesta_dbp"]').val(),
                            respuesta_cc: $('input[name="respuesta_cc"]').val(),
                            respuesta_ca: $('input[name="respuesta_ca"]').val(),
                            respuesta_lf: $('input[name="respuesta_lf"]').val(),
                            respuesta_pfe_segundo: $('input[name="respuesta_pfe_segundo"]').val(),
                            respuesta_ccca: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_presentacion_segundo: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_dorso_segundo: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_anatomia_segundo: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_pfe_pct_segundo: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_ccca_pct: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_hipotesis_segundo: $('input[name="respuesta_ecografista"]').val(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                        }
            
                        $.post('dashboard/save', args).done(function(data){
                            $("#ver\\.interconsulta").modal("hide");
                            $("#interconsultas\\.estado\\.finalizadas").button('toggle').trigger("click");
                            $('#mensaje\\.dialogo').modal("hide");
                            $('#mensaje\\.dialogo').remove();
                        });
                    }
                    else if ($(this).val() == 1){
                        var args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
                            respuesta_utero_primertrimestre: $('input[name="respuesta_utero_primertrimestre"]').val(),
                            respuesta_saco_gestacional: $('input[name="respuesta_saco_gestacional"]').val(),
                            respuesta_embrion: $('input[name="respuesta_embrion"]').val(),
                            respuesta_lcn: $('input[name="respuesta_lcn"]').val(),
                            respuesta_anexo_izquierdo_primertrimestre: $('input[name="respuesta_anexo_izquierdo_primertrimestre"]').val(),
                            respuesta_anexo_derecho_primertrimestre: $('input[name="respuesta_anexo_derecho_primertrimestre"]').val(),
                            respuesta_douglas_primertrimestre: $('input[name="respuesta_douglas_primertrimestre"]').val(),
                            respuesta_lcn_eg: $('input[name="respuesta_lcn_eg"]').val(),
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                        }

                        $.post('dashboard/save', args).done(function(data){
                            $("#ver\\.interconsulta").modal("hide");
                            $("#interconsultas\\.estado\\.finalizadas").button('toggle').trigger("click");
                            $('#mensaje\\.dialogo').modal("hide");
                            $('#mensaje\\.dialogo').remove();
                        });
                    }
                    else{
                        var anatomia = [];

                        $.each($('input[name="respuesta_anatomia"] option:selected'), function(){
                            anatomia.push($(this).val());
                        });

                        var args = {
                            solicitud_id: $("#solicitud_id").val(),
                            solicitud_crecimiento: $("#interconsulta\\.respuesta\\.crecimiento option:selected").val(),
                            respuesta_fecha: $("#interconsulta\\.respuesta\\.fecha").val(),
                            respuesta_eg: $('input[name="respuesta_eg"]').val(),
                            respuesta_pfe: $('input[name="respuesta_pfe"]').val(),
                            respuesta_pfe_percentil: $('input[name="respuesta_pfe_percentil"]').val(),
                            respuesta_liquido: $('select[name="respuesta_liquido"] option:selected').val(),
                            respuesta_presentacion: $('select[name="respuesta_presentacion"] option:selected').val(),
                            respuesta_dorso: $('select[name="respuesta_dorso"] option:selected').val(),
                            respuesta_uterinas: $('input[name="respuesta_uterinas"]').val(),
                            respuesta_uterinas_percentil: $('input[name="respuesta_uterinas_percentil"]').val(),
                            respuesta_umbilical: $('input[name="respuesta_umbilical"]').val(),
                            respuesta_umbilical_percentil: $('input[name="respuesta_umbilical_percentil"]').val(),
                            respuesta_cm: $('input[name="respuesta_cm"]').val(),
                            respuesta_cm_percentil: $('input[name="respuesta_cm_percentil"]').val(),
                            respuesta_cmau: $('input[name="respuesta_cmau"]').val(),
                            respuesta_cmau_percentil: $('input[name="respuesta_cmau_percentil"]').val(),
                            respuesta_hipotesis: $('select[name="respuesta_hipotesis"] option:selected').val(),
                            respuesta_doppler: $('select[name="respuesta_doppler"] option:selected').val(),
                            respuesta_anatomia: anatomia,
                            respuesta_comentariosexamen: $('#editable').val(),
                            respuesta_ecografista: $('input[name="respuesta_ecografista"]').val(),
                        }

                        $.post('dashboard/save', args).done(function(data){
                            $("#ver\\.interconsulta").modal("hide");
                            $("#interconsultas\\.estado\\.finalizadas").button('toggle').trigger("click");
                            $('#mensaje\\.dialogo').modal("hide");
                            $('#mensaje\\.dialogo').remove();
                        });
                    }
                });
            });
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
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Tipo de exámen</th><th>Realizado</th><th>Accion</th></tr></thead><tbody>';

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

            let fecha = value.fecha.split('-');
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];

            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>' + tipo +'</td><td>'+ fecha +'</td>';

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

            $("#ver\\.interconsulta > div").addClass("h-100");
            $("#ver\\.interconsulta > div > div").addClass("h-100");
            $("#ver\\.interconsulta\\.titulo").html("PDF Interconsulta");
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
        $("input[name='respuesta_pfe_ver_segundo']").val(0);
        $("input[name='respuesta_pfe_segundo']").val(0).trigger("change");
        return;
    }

    if (parseInt($("input[name='respuesta_ca']").val()) < 0){
        $("input[name='respuesta_pfe_ver_segundo']").val(0);
        $("input[name='respuesta_pfe_segundo']").val(0).trigger("change");
        return;
    }

    CC = parseInt($("input[name='respuesta_cc']").val());
    CA = parseInt($("input[name='respuesta_ca']").val());

    var psoP = Math.pow(10, (1.182 + 0.00273 * CC + 0.007057 * CA - 0.0000063 * Math.pow(CA, 2) - 0.000002184 * CC * CA));
    
    if (isNaN(psoP) != true) {
        $("input[name='respuesta_pfe_ver_segundo']").val(psoP.toFixed(0));
        $("input[name='respuesta_pfe_segundo']").val(psoP.toFixed(0)).trigger("change");
    }
    else{
        $("input[name='respuesta_pfe_ver_segundo']").val(0);
        $("input[name='respuesta_pfe_segundo']").val(0).trigger("change");
    }
}

function calCCCA(){
    var CC = 0;
    var CA = 0;

    if (parseInt($("input[name='respuesta_cc']").val()) < 0){
        $("input[name='respuesta_ccca_ver']").val(0);
        $("input[name='respuesta_ccca']").val(0).trigger("change");
        return;
    }

    if (parseInt($("input[name='respuesta_ca']").val()) < 0){
        $("input[name='respuesta_ccca_ver']").val(0);
        $("input[name='respuesta_ccca']").val(0).trigger("change");
        return;
    }

    CC = parseInt($("input[name='respuesta_cc']").val());
    CA = parseInt($("input[name='respuesta_ca']").val());

    var ccca = CC / CA;
    $("input[name='respuesta_ccca_ver']").val(ccca.toFixed(2));
    $("input[name='respuesta_ccca']").val(ccca.toFixed(2));

    if (isNaN(ccca) != true) {
        $("input[name='respuesta_ccca_ver']").val(ccca.toFixed(2));
        $("input[name='respuesta_ccca']").val(ccca.toFixed(2)).trigger("change");
    }
    else{
        $("input[name='respuesta_ccca_ver']").val(0);
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

    lcn = lcn.toString();
    lcn = lcn.replace(',', '.');
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

        $("input[name='respuesta_lcn_eg_ver']").val(eglcn);
        $("input[name='respuesta_lcn_eg']").val(eglcn);
    } 
    else {
        $("input[name='respuesta_lcn_eg_ver']").val(0);
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