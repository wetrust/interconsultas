var nombreprofesionalPegar = "";
$(document).ready(function(){
    $("#interconsultas\\.estado\\.espera").remove();
    $("#interconsultas\\.estado\\.nuevas").parent().prepend('<label id="interconsultas.estado.solicitar" class="btn btn-secondary active"><input type="radio" value="1" name="interconsultas" checked autocomplete="off">Solicitar interconsulta</label>');
    $("#interconsultas\\.estado\\.nuevas").remove();
    construir();
    loadsolicitud();
    $('.btn-group-toggle .btn').on("click", function(){
        let valor = parseInt($(this).find('input').val());

        if (valor == 1){
            loadsolicitud();
            $("#filtro\\.activar").addClass("d-none");
        }else if (valor == 3){
            loadInFinish();
            $("#filtro\\.activar").removeClass("d-none");
        }
    });

});

function construir(){
    $("#mensaje\\.resultado").parent().parent().prepend('<div class="card-header bg-primary" id="card.header"><h4 class="text-white text-center">Formulario de referencia para evaluación ecográfica gineco - Obstétrica</h4><h6 class="text-white text-center">Formulario de libre disposición para profesionales que soliciten exámen ecográfico a ecografistas registrados en la plataforma</h6></div>');
    $("#mensaje\\.resultado").parent().prepend('<div id="formulario.solicitud"> <div class="row"> <div class="col form-group"> <label for="interconsulta.nombre">Nombre del paciente</label> <input type="text" class="form-control" id="interconsulta.nombre"> </div><div class="col form-group"> <label for="interconsulta.rut">RUT del paciente</label> <input type="text" class="form-control" id="interconsulta.rut"> </div><div class="col form-group"> <label for="interconsulta.fecha">Fecha de solicitud del exámen</label> <input type="date" class="form-control" id="interconsulta.fecha"> </div></div><div class="row"> <div class="col form-group"> <label for="inputEmail4">Ege conocida precozmente</label> </div><div class="col form-group"> <div> <input type="radio" id="interconsulta.eg.si" value="1" name="interconsulta_eg" class="form-check-input"> <label for="interconsulta.eg.si">Si</label> </div><div> <input type="radio" id="interconsulta.eg.no" value="0" name="interconsulta_eg" class="form-check-input" checked=""> <label for="interconsulta.eg.no">No</label> </div></div><div class="col form-group"> <label for="inputEmail4">Ecografía previa de crecimiento</label> </div><div class="col form-group"> <div> <input type="radio" id="interconsulta.eco.si" value="1" name="interconsulta_eco" class="form-check-input"> <label for="interconsulta.eco.si">Si</label> </div><div> <input type="radio" id="interconsulta.eco.no" value="0" name="interconsulta_eco" class="form-check-input" checked=""> <label for="interconsulta.eco.no">No</label> </div></div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.fecha">FUM operacional</label> <input type="date" class="form-control" id="interconsulta.fum"> </div><div class="col-2 form-group"> <label for="interconsulta.fecha">Edad Gestacional</label> <input type="text" class="form-control" id="interconsulta.egestacional" disabled=""> </div><div class="col form-group"> <label for="interconsulta.diagnostico">Diagnóstico de referencia</label> <input type="text" class="form-control" id="interconsulta.diagnostico"> </div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.ciudad">Ciudad procedencia de la paciente</label> <input type="text" class="form-control" id="interconsulta.ciudad"> </div><div class="col form-group"> <label for="interconsulta.lugar">Lugar de control prenatal</label> <input type="text" class="form-control" id="interconsulta.lugar"> </div></div><br><div class="row"> <div class="col form-group"> <h5><span class="badge badge-default p-2" for="interconsulta.profesional">Datos del profesional referente a exámen ecográfico</span></h5> </div><div class="col form-group"> <div> <input type="radio" id="interconsulta.profesional.medico" value="Médico" name="interconsulta_profesional" class="form-check-input"> <label for="interconsulta.profesional.medico">Médico</label> </div><div> <input type="radio" id="interconsulta.profesional.matrona" value="Matrona" name="interconsulta_profesional" class="form-check-input" checked=""> <label for="interconsulta.profesional.matrona">Matrón/Matrona</label> </div></div></div><div class="row"> <div class="col form-group"> <label for="interconsulta.profesional.nombre">Nombre del profesional referente</label> <input type="text" class="form-control" id="interconsulta.profesional.nombre"> </div><div class="col form-group"> <label for="interconsulta.email">Email (de profesional referente)</label> <input type="email" class="form-control" id="interconsulta.email"> </div></div><h5><span class="badge badge-default p-2" for="interconsulta.profesional">Datos ecografista de contrarreferencia</span></h5> <div class="row"> <div class="col form-group"> <label for="interconsulta.para.nombre">Nombre del profesional a quien ud. solicitó exámen ecografico</label> <input type="text" class="form-control" id="interconsulta.para.nombre"> </div><div class="col form-group"> <label for="interconsulta.para">Email (profesional de contrareferencia)</label> <input type="email" class="form-control" id="interconsulta.para"> </div></div><div class="row"> <div class="col"> <button class="btn btn-primary" id="interconsulta.enviar">Enviar solicitud de exámen ecográfico</button> </div></div></div>');
}

function loadsolicitud(){
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

            tabla += '<td><button class="btn btn-secondary informe mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Informe</button><button class="btn btn-secondary grafico" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Grafico</button></td></tr>';
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
            $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-primary" id="ver.interconsulta.enviar" data-id="'+solicitud_id+'" data-informe="'+ tipo +'">Enviar</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar solicitud</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
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