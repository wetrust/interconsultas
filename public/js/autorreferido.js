var modalModificar ={};

$(document).ready(function(){
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
        $.post(_api  + 'email_manual_autorreferido', args).done(function(data){
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

function loadInFinish(){
	$("#tabla\\.resultado").removeClass("d-none");
    $("#mensaje\\.resultado").removeClass("d-none");
    $("#card\\.header").addClass("d-none");
	$("#formulario\\.solicitud").addClass("d-none");
	
    $.get('dashboard/finish').done(function(data){
        buildFinishTable(data);
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
            $("#mensaje\\.resultado").addClass("d-none");
            loadInProcessData(data);
        }
        else{
            $("#mensaje\\.resultado").removeClass("d-none");
            $("#mensaje\\.resultado").html("No tienes interconsultas en espera");
        }
    });
}

function buildFinishTable(data){
    $('#tabla\\.resultado').empty();
    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><td><span class="text-primary">Tipo de exámen</span></td><td><span class="text-primary">Realizado</span></td><td><span class="text-primary">Edad Gest.</span></td><td><span class="text-primary">Nombre paciente</span></td><td class="text-primary">R.U.T.</td><td><span class="text-primary">Accion</span></td></tr></thead><tbody>';
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
            fechas = fecha[0] + "" + fecha[1] + "" + fecha[2];
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
            tabla += '<tr><td>' + tipo +'</td><td>'+ fecha +'</td><td>'+ value.eg +'</td><td class="nombre">' + value.solicitud_nombre + ' ' + value.solicitud_apellido +'</td><td>' + value.solicitud_rut + '</td>';
            value.solicitud_rut = value.solicitud_rut.replace(/\./g, "")

            tabla += '<td><button class="btn btn-secondary foto mr-1" data-id='+ value.solicitud_rut + ' data-fecha='+ fechas +'><i class="fa fa-camera" aria-hidden="true"></i></button>';
            if (value.tipo == "0" || value.tipo == "2"){
                tabla += '<button class="btn btn-secondary informe mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Informe</button><button class="btn btn-secondary grafico" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Grafica</button></td></tr>';
            }
            else{
                tabla += '<button class="btn btn-secondary informe mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Informe</button></td></tr>';
            }
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
            $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'" id="contenedorpdf"></iframe>');
            $("#ver\\.interconsulta").modal("show");
            $("#ver\\.interconsulta\\.footer").empty();
            $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-secondary" id="ver.interconsulta.enviar" data-informe="'+tipo+'" data-id="'+solicitud_id+'">Enviar informe</button><button type="button" class="btn btn-primary" id="ver.interconsulta.cambiar.referente" data-informe="'+tipo+'" data-id="'+solicitud_id+'">Cambiar referente</button><button type="button" class="btn btn-danger" id="ver.interconsulta.eliminar" data-id="'+solicitud_id+'">Eliminar exámen</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            $("#ver\\.interconsulta\\.eliminar").on("click", function(){
                let solicitud_id =  $(this).data("id");
                $.get("dashboard/delete/" + solicitud_id).done(function(data){
                    $("#ver\\.interconsulta").modal("hide");
                    loadInFinish();
                });
            });
            $("#ver\\.interconsulta\\.enviar").on("click", function(){
                let modal = makeModal("Enviar");

                let rol = uuidv4();
                let email = uuidv4();

                document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);

                document.getElementById(modal.contenido).innerHTML = '<div class="row"><div class="form-group col-4"><label for="'+rol+'">Rol destinatario</label><select class="form-control" id="'+rol+'"><option value="Paciente">Paciente</option><option value="Referente">Referente</option><option value="Matrona">Matrona</option><option value="Medico">Médico</option><option value="Administrativo">Administrativo</option><option value="Otros">Otros</option></select></div><div class="form-group col"><label for="'+email+'">E-mail destinatario</label><select class="form-control" id="'+email+'"></select></div></div>';
                document.getElementById(modal.titulo).innerHTML = "Enviar informe por E-mail";                

                document.getElementById(rol).dataset.email = email;
                $('#'+rol).on("change", function(){
                    var eMail = this.dataset.email;
                    $('#'+eMail).empty();

                    $.get('api/emails/'+this.value).done(function(data){
                        $.each(data, function(i, value) {
                            let option = '<option value="'+value.email_value+'">'+value.email_nombre + ' '+value.email_value+'</option>';
                            $('#'+eMail).append(option);
                        });
                    });
                });

                $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                    $(this).remove();
                });

                document.getElementById(modal.button).dataset.informe = this.dataset.informe;
                document.getElementById(modal.button).dataset.id = this.dataset.id;
                document.getElementById(modal.button).dataset.email = email;
                document.getElementById(modal.button).dataset.modal = modal.id;

                $("#"+modal.button).on("click", function(){
                    let informe = this.dataset.informe;
                    let id = this.dataset.id;
                    let email = $("#"+this.dataset.email).val();

                    let animacion = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ml-2">Enviando informe...</span>';
                    this.disabled = true;
                    this.innerHTML = animacion;
                    let modal = this.dataset.modal;

                    let args = {email: email,informe: informe,solicitud: id, modal: modal}

                    $.post(_api  + 'email_manual_autorreferido', args).done(function(data){
                        if (Object.keys(data).length > 0) {
                            let modal = makeModal();
                                document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                                document.getElementById(modal.titulo).innerHTML = "Información";

                                if (data.result = true){
                                    document.getElementById(modal.contenido).innerHTML = "<p>Enviado</p>";
                                }
                                else{
                                    document.getElementById(modal.contenido).innerHTML = "<p>No se pudo enviar, intente nuevamente</p>";
                                }

                                $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                                    $(this).remove();
                                });

                            $('#'+ args.modal).modal("hide");
                        }
                    });

                });
            });

            $("#ver\\.interconsulta\\.cambiar\\.referente").on("click", function(){
                var id = $(this).data("id");
                var modal_id;

                modal_id = uuidv4();
                btn_responder_id = uuidv4();
            
                var footerModal = '</div><div class="modal-footer"><button id="'+btn_responder_id+'" data-modal="'+modal_id+'" class="btn btn-primary">Guardar</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>';
                $('body').append('<div class="modal" tabindex="-1" role="dialog" id="'+modal_id+'"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Cambiar referente</h5></div><div class="modal-body"><ul class="nav nav-tabs" id="referenteTab" role="tablist"> <li class="nav-item bg-secondary"> <a class="nav-link bg-secondary text-white active" id="home-tab" data-toggle="tab" href="#referenteCambio" role="tab" aria-controls="home" aria-selected="true">Elegir otro referente</a> </li></ul><div class="tab-content" id="referenteTabContent"> <div class="tab-pane fade show active" id="referenteCambio" role="tabpanel" aria-labelledby="home-tab"> <div class="form-group"> <select class="form-control" id="interfaz.email.referente.cambio"></select> </div></div></div>'+ footerModal);
            
                var options = $("#interfaz\\.email > option").clone();
                $("#interfaz\\.email\\.referente\\.cambio").empty();
                $("#interfaz\\.email\\.referente\\.cambio").append(options);
                $('#'+modal_id).modal("show").on('hidden.bs.modal', function (e) {
                    $(this).remove();
                });
            
                $('#'+btn_responder_id).on("click", function(){
                    var modal_id = $(this).data("modal");
                    
                    $('body').append('<div class="modal" tabindex="-1" role="dialog" id="mensaje.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Enviando Datos</h5></div><div class="modal-body"><h3 class="text-danger text-center">Guardando.... espere</H3></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
                    $('#mensaje\\.dialogo').modal("show").on('hidden.bs.modal', function (e) {
                        $(this).remove();
                    });
            
                    var args = {
                        solicitud_id: $(this).data("id"),
                        solicitud_data: $("#interfaz\\.email\\.referente\\.cambio").val()
                    }

                    $.post('solicitudes/actualizar', args).done(function(data){
                        var link = $("#contenedorpdf").attr('src');
                        $('#ver\\.interconsulta\\.contenedor').empty();
                        $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+link+'" id="contenedorpdf"></iframe>')

                        $('#'+modal_id).modal("hide"); $('#mensaje\\.dialogo').modal("hide");
                    });
                }).data("id",id);
            })
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
                $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'" id="contenedorpdf"></iframe>')
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            } else  if (tipo == "2"){
                url = 'graph/informe_segundotrimestre/';
                $("#ver\\.interconsulta > div").addClass("h-100");
                $("#ver\\.interconsulta > div > div").addClass("h-100");
                $("#ver\\.interconsulta\\.titulo").html("PDF Interconsulta");
                $('#ver\\.interconsulta\\.contenedor').empty();
                $("#ver\\.interconsulta\\.contenedor").append('<iframe class="embed-responsive-item w-100 h-100" src="'+url+ solicitud_id+'"  id="contenedorpdf"></iframe>')
                $("#ver\\.interconsulta").modal("show");
                $("#ver\\.interconsulta\\.footer").empty();
                $("#ver\\.interconsulta\\.footer").prepend('<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>');
            }
        });

        $('#tabla\\.resultado tr > td > button.foto').on("click", function(){
            let solicitud_rut =  $(this).data("id");
            let fecha =  $(this).data("fecha");
            var el_btn = this;
            var nombre = $(this).parent().parent().children(".nombre").text();

            $.get('image/index/'+solicitud_rut+'/'+fecha).done(function(data){
                if (data.exist == true){
                    let modal = makeModal("Enviar imágenes seleccionadas");
                    document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                    data.JPGFiles
                    var estructura = '<div class="row">';
                    
                    for (i in data.JPGFiles) {
                        estructura += '<div class="col-12 col-lg-3 col-md-4 col-sm-6"><a href="https://servidor.crecimientofetal.cl/data/'+ data.JPGFiles[i][1] +'" target="_blank"><img alt="Imágen ecográfica" src="https://servidor.crecimientofetal.cl/data/'+ data.JPGFiles[i][1] +'" class="img-fluid border border-primary rounded shadow mb-2" /></a><div class="form-group form-check"><input type="checkbox" class="form-check-input" name="foto" data-foto="'+ data.JPGFiles[i][1] +'"><label class="form-check-label">Seleccionar</label></div></div>';
                    }

                    estructura += '</div>';

                    document.getElementById(modal.contenido).innerHTML = estructura;
                    document.getElementById(modal.titulo).innerHTML = "Imágenes ecográficas de " + nombre;
                    
                    $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                        $(this).remove();
                    });

                    var btn_informe = uuidv4();
                    $('#'+modal.id+ " .modal-footer").append('<button class="btn btn-primary" id="'+btn_informe+'">Ver informe de imágenes seleccionadas</button>');

                    $("#"+btn_informe).on("click", function(){
                        var contador = 0;
                        var sList = "";

                        $('input[name="foto"]').each(function () {
                            if (this.checked) {
                                var sThisVal = (this.checked ? this.dataset.foto : "");
                                sList += (sList=="" ? sThisVal : "," + sThisVal);
                                contador++;
                            }
                        });

                        if (contador == 0){
                            alert("Debes seleccionar al menos una imágen");
                            return;
                        }

                        if (contador == 3 || contador == 5 || contador == 7){
                            alert("Prefiere seleccionar imágenes en números par, actualmente has seleccionado " + contador + " imágenes.");
                            return;
                        }

                        if (contador >8){
                            alert("Máximo 8 imágenes.");
                            return;
                        }

                        var send = {
                            fotos: sList
                        }

                        $.post('dashboard/informe_fotos', send).done(function(data){
                            if (data.response = true){
                                let modal = makeModal("Enviar informe");

                                document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);

                                document.getElementById(modal.contenido).innerHTML = '<iframe style="min-height:400px;" src="data:application/pdf;base64,'+ data.pdf+'" class="embed-responsive-item w-100 h-100"></iframe>';
                                document.getElementById(modal.titulo).innerHTML = "Informe de imágenes";

                                $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                                    $(this).remove();
                                });
                                
                                document.getElementById(modal.button).dataset.fotos = sList;
                                
                                $("#"+modal.button).on("click", function(){
                                    "use strict";
                                    var sList = this.dataset.fotos;
                                    let modal = makeModal("Enviar");

                                    let rol = uuidv4();
                                    let email = uuidv4();
            
                                    document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                    
                                    document.getElementById(modal.contenido).innerHTML = '<div class="row"><div class="form-group col-4"><label for="'+rol+'">Rol destinatario</label><select class="form-control" id="'+rol+'"><option value="Paciente">Paciente</option><option value="Referente">Referente</option><option value="Matrona">Matrona</option><option value="Medico">Médico</option><option value="Administrativo">Administrativo</option><option value="Otros">Otros</option></select></div><div class="form-group col"><label for="'+email+'">E-mail destinatario</label><select class="form-control" id="'+email+'"></select></div></div>';
                                    document.getElementById(modal.titulo).innerHTML = "Enviar informe de fotos por e-mail";
                    
                                    document.getElementById(rol).dataset.email = email;
                                    $('#'+rol).on("change", function(){
                                        var eMail = this.dataset.email;
                                        $('#'+eMail).empty();

                                        $.get('api/emails/'+this.value).done(function(data){
                                            $.each(data, function(i, value) {
                                                let option = '<option value="'+value.email_value+'">'+value.email_nombre + ' '+value.email_value+'</option>';
                                                $('#'+eMail).append(option);
                                            });
                                        });
                                    });
                                            
                                    $('#'+modal.id).modal("show").on('hidden.bs.modalargs', function (e) {
                                        $(this).remove();
                                    });
                        
                                    document.getElementById(modal.button).dataset.fotos = sList;
                                    document.getElementById(modal.button).dataset.modal = modal.id;
                                    document.getElementById(modal.button).dataset.email = email;
                                    $("#"+modal.button).on("click", function(){
                                        let animacion = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ml-2">Enviando imágenes...</span>';
                                        this.disabled = true;
                                        this.innerHTML = animacion;
                                        let modal = this.dataset.modal;

                                        var send = {
                                            fotos: this.dataset.fotos,
                                            email: $("#"+this.dataset.email).val(),
                                            modal: modal
                                        }
            
                                        $.post('dashboard/informe_envio', send).done(function(data){
                                            let modal = makeModal();
                                            document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                                            document.getElementById(modal.titulo).innerHTML = "Información";

                                            if (data.response = true){
                                                document.getElementById(modal.contenido).innerHTML = "<p>Enviado</p>";
                                            }
                                            else{
                                                document.getElementById(modal.contenido).innerHTML = "<p>No se pudo enviar, intente nuevamente</p>";
                                            }

                                            $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                                                $(this).remove();
                                            });
                                            
                                            $('#'+ send.modal).modal("hide");
                                        });
                                    });
                                });

                            }
                            else{
                                alert("Hubo un error al generar informe");
                            }
                        });
                    });

                    
                    document.getElementById(modal.button).dataset.modal = modal.id;
                    $("#"+modal.button).on("click", function(){
                        let modal = makeModal("Enviar");
                        var contador = 0;
                        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                        sList = "";

                        $('input[name="foto"]').each(function () {
                            if (this.checked) {
                                var sThisVal = (this.checked ? this.dataset.foto : "");
                                sList += (sList=="" ? sThisVal : "," + sThisVal);
                                contador++;
                            }
                        });

                        if (contador == 0){alert("Debes seleccionar al menos una imágen"); return;}
                        
                        let rol = uuidv4();
                        let email = uuidv4();

                        document.getElementById(modal.contenido).innerHTML = '<div class="row"><div class="form-group col-4"><label for="'+rol+'">Rol destinatario</label><select class="form-control" id="'+rol+'"><option value="Paciente">Paciente</option><option value="Referente">Referente</option><option value="Matrona">Matrona</option><option value="Medico">Médico</option><option value="Administrativo">Administrativo</option><option value="Otros">Otros</option></select></div><div class="form-group col"><label for="'+email+'">E-mail destinatario</label><select class="form-control" id="'+email+'"></select></div></div>';
                        document.getElementById(modal.titulo).innerHTML = "Enviar imágenes por E-mail";
        
                        document.getElementById(rol).dataset.email = email;
                        $('#'+rol).on("change", function(){
                            var eMail = this.dataset.email;
                            $('#'+eMail).empty();

                            $.get('api/emails/'+this.value).done(function(data){
                                $.each(data, function(i, value) {
                                    let option = '<option value="'+value.email_value+'">'+value.email_nombre + ' '+value.email_value+'</option>';
                                    $('#'+eMail).append(option);
                                });
                            });
                        });

                        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                            $(this).remove();
                        });

                        $('#'+ this.dataset.modal).modal("hide");
            
                        document.getElementById(modal.button).dataset.fotos = sList;
                        document.getElementById(modal.button).dataset.modal = modal.id;
                        document.getElementById(modal.button).dataset.email = email;

                        $("#"+modal.button).on("click", function(){
                            let animacion = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ml-2">Enviando imágenes...</span>';
                            this.disabled = true;
                            this.innerHTML = animacion;

                            var send = {
                                fotos: this.dataset.fotos,
                                email: $("#"+this.dataset.email).val(),
                                modal: this.dataset.modal
                            }


                            $.post('dashboard/send_fotos', send).done(function(data){
                                $("#"+send.modal).modal("hide");

                                let modal = makeModal();
                                document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                                document.getElementById(modal.titulo).innerHTML = "Información";

                                if (data.response = true){
                                    document.getElementById(modal.contenido).innerHTML = "<p>Enviado</p>";
                                }
                                else{
                                    document.getElementById(modal.contenido).innerHTML = "<p>No se pudo enviar, intente nuevamente</p>";
                                }

                                $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                                    $(this).remove();
                                });
                            });
                        });
                    });
                }
                else{
                    alert("No hay fotos para este exámen");
                    $(el_btn).remove();
                }
            });

        });
    }
    else{
        $("#mensaje\\.resultado").removeClass("d-none");
        $("#mensaje\\.resultado").html("No tienes interconsultas finalizadas o no estas autorizado para guardar interconsultas finalizadas");
    }
}

function callModal(informe, solicitud){$("#exampleModal").data("informe", informe).data("solicitud", solicitud).modal("show");}

function makeModal(button){
    let id = uuidv4();
    let titulo = uuidv4();
    let contenido = uuidv4();
    let _button = uuidv4();
    let button_string = "";

    if (typeof button !== typeof undefined){
        button_string = '<button type="button" class="btn btn-primary" id="'+_button+'" data-modal="'+id+'">'+button+'</button>';
    }

    let resultado ={
        id:id,
        titulo:titulo,
        contenido:contenido,
        button:_button,
        modal:'<div class="modal fade" tabindex="-1" role="dialog" id="'+id+'"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="'+titulo+'">Modal title</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="'+contenido+'"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>'+ button_string+'</div></div></div></div>'
    }
    
    return resultado;
}

function solicitudModal(data){
    let modal = makeModal("Guardar");

    document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
    $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
    $("#"+modal.button).on("click", function(){
        let modal =  $(this).data("modal");
        
        let diagnostico = (document.getElementById(modalModificar.diagnostico).value == "") ? document.getElementById(modalModificar.diagnostico_select).value : document.getElementById(modalModificar.diagnostico).value;
        data = {
            nombre: document.getElementById(modalModificar.nombre).value,
            apellido: document.getElementById(modalModificar.apellido).value,
            rut: document.getElementById(modalModificar.rut).value,
            telefono: document.getElementById(modalModificar.telefono).value,
            fum: document.getElementById(modalModificar.fum).value,
            fecha: document.getElementById(modalModificar.fecha).value,
            eg: document.getElementById(modalModificar.eg).value,
            edadMaterna: document.getElementById(modalModificar.edadMaterna).value,
            ciudad: document.getElementById(modalModificar.ciudad).value,
            lugar: document.getElementById(modalModificar.lugar).value,
            diagnostico: diagnostico,
            sistolica: document.getElementById(modalModificar.sistolica).value,
            diastolica: document.getElementById(modalModificar.diastolica).value,
            media: document.getElementById(modalModificar.media).value,
            talla: document.getElementById(modalModificar.talla).value,
            peso: document.getElementById(modalModificar.peso).value,
            imc: document.getElementById(modalModificar.imc).value,
            paridad:document.getElementById(modalModificar.paridad).value,
            antecedentes: document.getElementById(modalModificar.antecedentes).value
            
        };

        $.post("dashboard/guardarsolicitud/" + document.getElementById(modalModificar.solicitud_id).value, data).done(function(){loadInProcess();});
        $('#'+modal).modal("hide");
    });

    let id_sol = uuidv4();let _a= uuidv4(); let _b= uuidv4(); let _c= uuidv4(); let _d= uuidv4(); let _e= uuidv4(); let _f= uuidv4(); let _g= uuidv4(); let _h= uuidv4(); let _i= uuidv4(); let _j= uuidv4(); let _k = uuidv4(); let _l= uuidv4(); let _ll= uuidv4(); let _m= uuidv4(); let _n= uuidv4(); let _o= uuidv4(); let _p= uuidv4(); let _q= uuidv4(); let _w= uuidv4(); let _y= uuidv4();
    let formulario = '<div class="row"> <input type="hidden" class="form-control" id="'+id_sol+'"> <div class="col form-group"> <label>Nombre del paciente</label> <input type="text" class="form-control" id="'+_a+'"> </div><div class="col form-group"> <label>Apellido del paciente</label> <input type="text" class="form-control" id="'+_y+'"> </div><div class="col form-group"> <label>RUT del paciente</label> <div> <input type="text" class="form-control" id="'+_b+'" disabled> </div></div><div class="col form-group"> <label>Teléfono materno</label> <input type="number" class="form-control" id="'+_c+'"> </div></div><div class="row"> <div class="col-4 form-group rounded mb-0 pb-3"> <label><strong>INGRESE FUM REFERIDA</strong></label> <input type="date" class="form-control g-verde text-white" id="'+_d+'"> </div><div class="col form-group mb-0 pb-3"> <label>Fecha solicitud del exámen</label> <input type="date" class="form-control g-verde text-white" id="'+_e+'"> </div><div class="col-4 form-group mb-0 pb-3"> <label>Edad Gestacional (Ege)</label> <input type="text" class="form-control g-verde text-white" id="'+_f+'" disabled="" value="0 semanas"> </div></div><div class="row"> <div class="col-4 form-group"> <label>Edad materna (años)</label> <select class="form-control" id="'+_g+'"></select> </div><div class="col form-group"> <label>Ciudad de procedencia</label> <select class="form-control" id="'+_h+'"></select> </div><div class="col form-group"> <label>Lugar de control habitual</label> <select class="form-control" id="'+_i+'"></select> </div></div><div class="row"> <div class="col-6 form-group"> <label><strong>Motivo de exámen a exámen ecográfico:</strong></label> <select type="text" class="form-control" id="'+_w+'"></select> </div><div class="col-6 form-group"> <label>otros</label> <input type="text" class="form-control" id="'+_j+'"> </div></div><div class="accordion" id="accordionExample"> <div class="card border-bottom rounded"> <div class="card-header py-0 bg-secondary" id="headingOne"> <h2 class="mb-0"><button class="btn btn-link text-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><strong>Datos obligatorios para ecografías de tamizaje</strong></button></h2> </div><div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample" style=""> <div class="card-body"> <div class="row"> <div class="col-4 form-group"> <label class="text-primary">Presion arterial sistólica</label> <div class="input-group"> <input type="number" class="form-control" id="'+_k+'"> <div class="input-group-append"> <div class="input-group-text">mmHg</div></div></div></div><div class="col form-group"> <label class="text-primary">Presion arterial diastólica</label> <div class="input-group"> <input type="number" class="form-control" id="'+_l+'"> <div class="input-group-append"> <div class="input-group-text">mmHg</div></div></div></div><div class="col-4 form-group"> <label class="text-primary">Presion arterial media</label> <div class="input-group"> <input type="number" class="form-control" id="'+_ll+'" disabled="" value="0"> <div class="input-group-append"> <div class="input-group-text">mmHg</div></div></div></div></div><div class="row"> <div class="col-4 form-group"> <label class="text-primary">Talla materna</label> <div class="input-group"> <input type="number" class="form-control" id="'+_m+'"> <div class="input-group-append"> <div class="input-group-text">cms</div></div></div></div><div class="col form-group"> <label class="text-primary">Peso materno</label> <div class="input-group"> <input type="number" class="form-control" id="'+_n+'"> <div class="input-group-append"> <div class="input-group-text">kg</div></div></div></div><div class="col-4 form-group"> <label class="text-primary">IMC materno</label> <div class="input-group"> <input type="text" class="form-control" id="'+_o+'" disabled="" value="0"> <div class="input-group-append"> <div class="input-group-text">(kg/m2)</div></div></div></div></div><div class="row"> <div class="col-4 form-group"> <label class="text-primary">Paridad</label> <select class="form-control" id="'+_p+'"> <option value="Primipara" selected="">Primipara</option> <option value="Multipara">Multipara</option> </select> </div><div class="col-8 form-group"> <label class="text-primary">Otros antecedentes clínicos relevantes:</label> <input type="text" class="form-control" id="'+_q+'"> </div></div></div></div></div></div>';

    document.getElementById(modal.contenido).innerHTML = formulario;
    document.getElementById(modal.titulo).innerHTML = "Modificar solicitud";

    loadOptionEdadMaterta(_g);

    document.getElementById(_h).innerHTML = document.getElementById('h').innerHTML;
    document.getElementById(_i).innerHTML = document.getElementById('i').innerHTML;
    document.getElementById(_w).innerHTML = document.getElementById('w').innerHTML;

    modalModificar = {solicitud_id: id_sol,nombre: _a,apellido:_y,rut: _b,telefono: _c,fum: _d,fecha: _e,eg: _f,edadMaterna: _g,ciudad: _h,lugar: _i,diagnostico: _j,diagnostico_select: _w, sistolica: _k, diastolica: _l, media: _ll, talla: _m, peso: _n, imc: _o, antecedentes: _q, paridad: _p};

    document.getElementById(id_sol).value = data.solicitud_id;
    document.getElementById(_a).value = data.solicitud_nombre;
    document.getElementById(_y).value = data.solicitud_apellido;
    document.getElementById(_b).value = data.solicitud_rut;
    document.getElementById(_c).value = data.solicitud_telefono;
    document.getElementById(_d).value = data.solicitud_fum;
    document.getElementById(_e).value = data.solicitud_fecha;
    document.getElementById(_f).value = data.solicitud_egestacional;
    document.getElementById(_g).value = data.solicitud_ematerna;
    document.getElementById(_h).value = data.solicitud_ciudad;
    document.getElementById(_i).value = data.solicitud_lugar;
    
    document.getElementById(_k).value = data.solicitud_sistolica;
    document.getElementById(_l).value = data.solicitud_diastolica;
    document.getElementById(_ll).value = data.solicitud_media;
    document.getElementById(_m).value = data.solicitud_talla;
    document.getElementById(_n).value = data.solicitud_peso;
    document.getElementById(_o).value = data.solicitud_imc;
    document.getElementById(_p).value = data.solicitud_paridad;
    document.getElementById(_q).value = data.solicitud_antecedentes;

    //determinar si es un dato del select o otro
    var select = document.getElementById(_w);
    var keyword = data.solicitud_diagnostico;
    var optionCollection = Array.from(select.options).filter(x => x.text.toLowerCase().startsWith(keyword.toLowerCase()))
    if (optionCollection.length > 0){
        document.getElementById(_w).value = data.solicitud_diagnostico;
        document.getElementById(_j).value = "";
        document.getElementById(_j).classList.add("d-none");
    }else{
        document.getElementById(_w).value = "";
        document.getElementById(_j).classList.remove("d-none");
        document.getElementById(_j).value = data.solicitud_diagnostico;
    }

    $("#"+_d+", #"+_e).on("change", function(){
        let EG = calcularEdadGestacional(modalModificar.fum, modalModificar.fecha);
        document.getElementById(modalModificar.eg).value = EG.text;
    });

    $("#"+_w).on("change", function(){
		let value = $(this).val();
		if (value == ""){
			$("#"+_j).val("");
			$("#"+_j).removeClass("d-none");
		}else{
			$("#"+_j).val("");
			$("#"+_j).addClass("d-none");
		}
    });

    $("#"+_k).on("keyup", function(e){
		if ( e.which == 13 ) {
			e.preventDefault();
			$("#"+modalModificar.diastolica).focus();
		}

		var A = $("#"+modalModificar.sistolica).val();
		var B = $("#"+modalModificar.diastolica).val();

		if (A != ""){ A = parseInt(A); }
		if (B != ""){ B = parseInt(B); }

		if (Number.isInteger(A) && Number.isInteger(B)){
			A = parseInt(A) / 3;
			B = parseInt(B) / 3;
			$("#"+modalModificar.media).val(Math.trunc((B * 2) + (A)));
		}else{
			$("#"+modalModificar.media).val(0);
		}
    });
    
    $("#"+_l).on("keyup", function(e){
		if ( e.which == 13 ) {
			e.preventDefault();
			$("#"+modalModificar.talla).focus();
		}
		var A = $("#"+modalModificar.sistolica).val();
		var B = $("#"+modalModificar.diastolica).val();

		if (A != ""){ A = parseInt(A); }
		if (B != ""){ B = parseInt(B); }

		if (Number.isInteger(A) && Number.isInteger(B)){
			A = parseInt(A) / 3;
			B = parseInt(B) / 3;
			$("#"+modalModificar.media).val(Math.trunc((B * 2) + (A)));
		}else{
			$("#"+modalModificar.media).val(0);
		}
    });
    

    $("#"+_m).on("keyup", function(e){
		if ( e.which == 13 ) {
			e.preventDefault();
			$("#"+modalModificar.peso).focus();
		}
		var A = $("#"+modalModificar.talla).val();
		var B = $("#"+modalModificar.peso).val();

		if (A != ""){ A = parseInt(A); }
		if (B != ""){ B = parseInt(B); }

		if (Number.isInteger(A) && Number.isInteger(B)){
			var valor = ((B / (Math.pow(A, 2))) * 10000);
			$("#"+modalModificar.imc).val(valor.toFixed(1));
		}else{
			$("#"+modalModificar.imc).val(0);
		}
    });
    
    $("#"+_n).on("keyup", function(e){
		if ( e.which == 13 ) {
			e.preventDefault();
			$("#"+modalModificar.paridad).focus();
		}
		var A = $("#"+modalModificar.talla).val();
		var B = $("#"+modalModificar.peso).val();

		if (A != ""){ A = parseInt(A); }
		if (B != ""){ B = parseInt(B); }

		if (Number.isInteger(A) && Number.isInteger(B)){
			var valor = ((B / (Math.pow(A, 2))) * 10000);
			$("#"+modalModificar.imc).val(valor.toFixed(1));
		}else{
			$("#"+modalModificar.imc).val(0);
		}
	});
    
}