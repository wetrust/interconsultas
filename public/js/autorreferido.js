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