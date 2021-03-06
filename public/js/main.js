import {make, humanDate} from './wetrust.js';

$(document).ready(function(){
    $(window).trigger('hashchange');
    if (a == 1){
        $("#interconsultas\\.estado\\.nuevas").addClass("d-none");
        $("#interconsultas\\.estado\\.espera").addClass("d-none");
        $("#interconsultas\\.estado\\.agendadas").addClass("d-none");
        $("#interconsultas\\.estado\\.finalizadas").addClass("d-none");
        $("#interconsultas\\.estado\\.respuesta").addClass("d-none");
        $("#filtro\\.activar").addClass("d-none");
        $("#parto-tab").addClass("d-none");
        $("#consentimiento-tab").addClass("d-none");
        loadSolicitud();
    }else if (a == 2){
        $("#interconsultas\\.estado\\.nuevas").addClass("d-none");
        $("#interconsultas\\.estado\\.espera").addClass("d-none");
        $("#interconsultas\\.estado\\.finalizadas").addClass("d-none");
        $("#filtro\\.activar").addClass("d-none");
        loadSolicitud();
    }else if (a == 3){
        $("#interconsultas\\.estado\\.solicitar").addClass("d-none");
        $("#interconsultas\\.estado\\.agendadas").addClass("d-none");
        $("#interconsultas\\.estado\\.solicitadas").addClass("d-none");
        $("#interconsultas\\.estado\\.respuesta").addClass("d-none");
        loadNews();
        $("#nav-lista-tab").addClass("d-none");
        $("#nav-lugares-tab").addClass("d-none");
        $("#nav-ciudades-tab").addClass("d-none");
    }
    else if (a == 4){
        $("#interconsultas\\.estado\\.nuevas").addClass("d-none");
        $("#interconsultas\\.estado\\.agendadas").addClass("d-none");
        $("#interconsultas\\.estado\\.solicitadas").addClass("d-none");
        $("#interconsultas\\.estado\\.respuesta").addClass("d-none");
        $("#filtro\\.activar").addClass("d-none");
        loadSolicitud();
        $("#filtro\\.rut").rut({
            fn_error : function(input){
                $(input).removeClass("is-valid").addClass("is-invalid");
                input.closest('.rut-container').find('span').remove();
                input.closest('.rut-container').append('<span class="invalid-feedback">Rut incorrecto</span>');
            },
            fn_validado : function(input){
                $(input).removeClass("is-invalid").addClass("is-valid");
                input.closest('.rut-container').find('span').remove();
                input.closest('.rut-container').append('<span class="valid-feedback">Rut correcto</span>');
            },
            placeholder: false
        });
    }

    cargarCiudad();
    cargarLugar();
    loadDiagnostico();
    
    $('.btn-group-toggle .btn.interconsulta').on("click", function(){
        let valor = parseInt($(this).find('input').val());

        if (valor == -1){
            location.assign("pacientes");
        }else if (valor == 0){
            loadSolicitud();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none");
            $("#formulario\\.filtro\\.dos").addClass("d-none");
        }else if (valor == 1){
            loadSolicitadas();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none");
        }else if (valor == 2){
            loadNews();
            $("#filtro\\.activar").removeClass("d-none");
            $("#filtro\\.tipo").parent().addClass("d-none");
            $("#formulario\\.filtro\\.dos").addClass("d-none");
        }else if (valor == 3){
            //solicitud de interconsulta agendada
            loadAgendadas();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none");
            $("#formulario\\.filtro\\.dos").addClass("d-none");
        }else if (valor == 4){
            loadInProcess();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none");
            $("#formulario\\.filtro\\.dos").removeClass("d-none");
        }else if (valor == 5){
            loadInFinish();
            $("#filtro\\.activar").removeClass("d-none");
            $("#filtro\\.tipo").parent().removeClass("d-none");
            $("#formulario\\.filtro\\.dos").addClass("d-none");
        }else if (valor == 6){
            loadInRespuesta();
            $("#filtro\\.activar").removeClass("d-none");
            $("#filtro\\.tipo").parent().removeClass("d-none");
            $("#formulario\\.filtro\\.dos").addClass("d-none");
        }
    });

    $("#filtro\\.espera\\.borrar").on("click", function(){
        loadInProcess();
    });

    $("#filtro\\.espera\\.accion").on("click", function(){
        let fecha = $("#fecha\\.espera").val();
        $.get(_api  + 'processdate/'+fecha).done(function(data){
            $('#tabla\\.resultado').empty();
            if (Object.keys(data).length > 0) {
                loadInProcessData(data);
            }
            else{
                $("#mensaje\\.resultado").removeClass("d-none");
                $("#mensaje\\.resultado").html("No tienes interconsultas en espera");
            }
        });
    })

    $("#parto-tab").on("click", function(){
        loadInPartos();
    });
    
    $('.btn-group-toggle .btn.parto').on("click", function(){
        let valor = parseInt($(this).find('input').val());
        if (valor == 0){
            loadInPartos();
            $("#filtro\\.parto\\.contenedor").addClass("d-none");
            $("#filtro\\.parto\\.activar").addClass("d-none");
        }else if (valor == 1){
            loadReadyPartos();
            $("#filtro\\.parto\\.activar").removeClass("d-none");
        }else if (valor == 2){
            loadReadyPartosAjuste();
            $("#filtro\\.parto\\.activar").removeClass("d-none");
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
        let tipo = $("#filtro\\.tipo option:selected").val();
        let rut = $("#filtro\\.rut").val();

        let args = {ciudad: ciudad, lugar: lugar, desde: desde, rut: rut, tipo: tipo}
        
        $('#tabla\\.resuelta').empty();

        let finalizadas = $("#interconsultas\\.estado\\.finalizadas").hasClass("active");
        let respuesta = $("#interconsultas\\.estado\\.respuesta").hasClass("active");

        if(finalizadas == true){
            $.post(_api  + 'filtro_resuelto', args).done(function(data){
                buildFinishTable(data);
            });
        }else if(respuesta == true){
            $.post(_api  + 'filtro_respuestas', args).done(function(data){
                buildRespuestaTable(data);
            });
        }

        if (tipo != "" && rut.length > 0){
            if (tipo == "0"){
                $("#grafica\\.doppler").removeClass("d-none");
                $("#grafica\\.segundo").addClass("d-none");
            }else if (tipo == "2"){
                $("#grafica\\.doppler").addClass("d-none");
                $("#grafica\\.segundo").removeClass("d-none");
            }
        }
        else{
            $("#grafica\\.doppler").addClass("d-none");
            $("#grafica\\.segundo").addClass("d-none");
        }
    });

    $("#filtro\\.borrar").on("click", function(){
        let finalizadas = $("#interconsultas\\.estado\\.finalizadas").hasClass("active");
        let respuesta = $("#interconsultas\\.estado\\.respuesta").hasClass("active");

        if(finalizadas == true){
            loadInFinish();
        }else if(respuesta == true){
            loadInRespuesta();
        }
        
        $("#filtro\\.ciudad").val("");
        $("#filtro\\.lugar").val("");
        $("#filtro\\.fecha").val("");
        $("#filtro\\.rut").val("");
        $("#filtro\\.tipo").val("");
    });

    $("#grafica\\.doppler").on("click", function(){
        let solicitud_rut =  $("#filtro\\.rut").val();
        let tipo =  $("#filtro\\.tipo").val();
        let url = '';
        if (tipo == "0"){

            let modal = makeModal("Enviar gráfica de tendencia");
            
            url = 'graph/informe_dopplercrecimiento_rut/'+solicitud_rut;

            document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);

            document.getElementById(modal.contenido).innerHTML = '<iframe class="embed-responsive-item w-100 h-100" src="'+url+'" ></iframe>';
            document.getElementById(modal.titulo).innerHTML = "Informe PDF";
            
            $('#'+modal.id).children().addClass("h-75");
            $('#'+modal.id).children().children().addClass("h-100");

            $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                $(this).remove();
            });

            $("#"+modal.button).on("click", function(){
                let modal = makeModal("Enviar");
                let rol = uuidv4();
                let email = uuidv4();

                let ciudad = uuidv4();
                let adjuntar = uuidv4();

                document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                document.getElementById(modal.contenido).innerHTML = '<div class="row"> <div class="form-group col-6"> <label for="'+rol+'">Rol destinatario</label> <select class="form-control" id="'+rol+'"> <option value="Paciente">Paciente</option> <option value="Referente">Referente</option> <option value="Matrona">Matrona</option> <option value="Medico">Médico</option> <option value="Administrativo">Administrativo</option> <option value="Otros">Otros</option> </select> </div><div class="form-group col-6"> <label for="'+ciudad+'">Ciudad</label> <select class="form-control" id="'+ciudad+'"></select> </div><div class="form-group col-6"> <label for="'+email+'">Nombre del destinatario</label> <select class="form-control" id="'+email+'"></select> </div><div class="form-group col-6"> <label for="'+adjuntar+'">¿Adjuntar último informe?</label> <select class="form-control" id="'+adjuntar+'"> <option value="0">No</option> <option value="1">Si</option> </select> </div></div>';
                document.getElementById(modal.titulo).innerHTML = "Enviar gráficas por E-mail";                

                document.getElementById(rol).dataset.ciudad = ciudad;
                $('#'+rol).on("change", function(){
                    var ciudad = this.dataset.ciudad;
                    $('#'+ciudad).empty();

                    $.get('dashboard/getCiudadesProfesional/'+this.value).done(function(data){
                        $.each(data, function(i, value) {
                            let option = '<option value="'+value.email_ciudad+'">'+value.ciudad_name + '</option>';
                            $('#'+ciudad).append(option);
                        });
                        $('#'+ciudad).trigger("change");
                    });
                });

                document.getElementById(ciudad).dataset.rol = rol;
                document.getElementById(ciudad).dataset.email = email;

                $('#'+ciudad).on("change", function(){
                    var rol = $("#"+ this.dataset.rol).val();
                    var eMail = this.dataset.email;
                    $('#'+eMail).empty();

                    $.get('dashboard/getEmailProfesional/'+rol+"/"+this.value).done(function(data){
                        $.each(data, function(i, value) {
                            let option = '<option value="'+value.email_value+'">'+value.email_nombre + '</option>';
                            $('#'+eMail).append(option);
                        });
                    });
                });

                $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                    $(this).remove();
                });

                document.getElementById(modal.button).dataset.email = email;
                document.getElementById(modal.button).dataset.modal = modal.id;
                document.getElementById(modal.button).dataset.adjuntar = adjuntar;

                $("#"+modal.button).on("click", function(){
                    let email = $("#"+this.dataset.email).val();
                    let adjuntar = $("#"+this.dataset.adjuntar).val();

                    let animacion = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ml-2">Enviando informe...</span>';
                    this.disabled = true;
                    this.innerHTML = animacion;
                    let modal = this.dataset.modal;

                    let to = {solicitud_rut: $("#filtro\\.rut").val() ,email:email,modal:modal, adjuntar:adjuntar};

                    $.post('graph/informe_dopplercrecimiento_rut_send/', to).done(function(data){
                        if (Object.keys(data).length > 0) {
                            let mensaje = (data.response = true) ? "<p>Enviado</p>" : "<p>No se pudo enviar, intente nuevamente</p>";

                            make.alert(mensaje);
                            $('#'+ data.modal).modal("hide");
                        }
                    });
                });
                $('#'+rol).trigger("change");
            });
        }
    });

    $("#grafica\\.segundo").on("click", function(){
        let solicitud_rut =  $("#filtro\\.rut").val();
        let tipo =  $("#filtro\\.tipo").val();
        let url = '';
        if (tipo == "2"){

            let modal = makeModal("Enviar gráfica de tendencia");
            
            url = 'graph/informe_segundotrimestre_rut/'+solicitud_rut;

            document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);

            document.getElementById(modal.contenido).innerHTML = '<iframe class="embed-responsive-item w-100 h-100" src="'+url+'" ></iframe>';
            document.getElementById(modal.titulo).innerHTML = "Informe PDF";
            
            $('#'+modal.id).children().addClass("h-75");
            $('#'+modal.id).children().children().addClass("h-100");

            $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                $(this).remove();
            });

            $("#"+modal.button).on("click", function(){
                let modal = makeModal("Enviar");
                let rol = uuidv4();
                let email = uuidv4();

                let ciudad = uuidv4();
                let adjuntar = uuidv4();

                document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                document.getElementById(modal.contenido).innerHTML = '<div class="row"> <div class="form-group col-6"> <label for="'+rol+'">Rol destinatario</label> <select class="form-control" id="'+rol+'"> <option value="Paciente">Paciente</option> <option value="Referente">Referente</option> <option value="Matrona">Matrona</option> <option value="Medico">Médico</option> <option value="Administrativo">Administrativo</option> <option value="Otros">Otros</option> </select> </div><div class="form-group col-6"> <label for="'+ciudad+'">Ciudad</label> <select class="form-control" id="'+ciudad+'"></select> </div><div class="form-group col-6"> <label for="'+email+'">Nombre del destinatario</label> <select class="form-control" id="'+email+'"></select> </div><div class="form-group col-6"> <label for="'+adjuntar+'">¿Adjuntar último informe?</label> <select class="form-control" id="'+adjuntar+'"> <option value="0">No</option> <option value="1">Si</option> </select> </div></div>';
                document.getElementById(modal.titulo).innerHTML = "Enviar gráficas por E-mail";                

                document.getElementById(rol).dataset.ciudad = ciudad;
                $('#'+rol).on("change", function(){
                    var ciudad = this.dataset.ciudad;
                    $('#'+ciudad).empty();

                    $.get('dashboard/getCiudadesProfesional/'+this.value).done(function(data){
                        $.each(data, function(i, value) {
                            let option = '<option value="'+value.email_ciudad+'">'+value.ciudad_name + '</option>';
                            $('#'+ciudad).append(option);
                        });
                        $('#'+ciudad).trigger("change");
                    });
                });

                document.getElementById(ciudad).dataset.rol = rol;
                document.getElementById(ciudad).dataset.email = email;

                $('#'+ciudad).on("change", function(){
                    var rol = $("#"+ this.dataset.rol).val();
                    var eMail = this.dataset.email;
                    $('#'+eMail).empty();

                    $.get('dashboard/getEmailProfesional/'+rol+"/"+this.value).done(function(data){
                        $.each(data, function(i, value) {
                            let option = '<option value="'+value.email_value+'">'+value.email_nombre + '</option>';
                            $('#'+eMail).append(option);
                        });
                    });
                });

                $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                    $(this).remove();
                });

                document.getElementById(modal.button).dataset.email = email;
                document.getElementById(modal.button).dataset.modal = modal.id;
                document.getElementById(modal.button).dataset.adjuntar = adjuntar;

                $("#"+modal.button).on("click", function(){
                    let email = $("#"+this.dataset.email).val();
                    let adjuntar = $("#"+this.dataset.adjuntar).val();

                    let animacion = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ml-2">Enviando informe...</span>';
                    this.disabled = true;
                    this.innerHTML = animacion;
                    let modal = this.dataset.modal;

                    let to = {solicitud_rut: $("#filtro\\.rut").val() ,email:email,modal:modal, adjuntar:adjuntar};

                    $.post('graph/informe_segundotrimestre_rut_send/', to).done(function(data){
                        if (Object.keys(data).length > 0) {
                            let mensaje = (data.response = true) ? "<p>Enviado</p>" : "<p>No se pudo enviar, intente nuevamente</p>";

                            make.alert(mensaje);
                            $('#'+ data.modal).modal("hide");
                        }
                    });
                });
                $('#'+rol).trigger("change");
            });

        }
    })

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day);
    $("fecha\\.espera").val(today);
});

$(window).on('hashchange', function(){
    var hash = document.location.hash;
    var div = ["#configuracion","#interconsulta","#parto"];

    if (div.includes(hash)){
        $(hash+"-tab").trigger("click");
    }
});

function loadReferentes(){
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

function loadDiagnostico(){
    $.get(_api + 'diagnostico_configuracion').done(function(data){
        $('#w').empty().append('<option value="">No Seleccionado</option>');
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            $.each(data, function(i, value) {
                response = '<option value="' + value.diagnostico_name +'">' + value.diagnostico_name +'</option>';
                $('#w').append(response);
            });
        }
    });
}