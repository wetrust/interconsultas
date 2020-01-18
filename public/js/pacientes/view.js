import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate, inputDate} from '../wetrust.js';
import {dopcre, segundo, once, preco, ginec, parto} from './examen.js';

export class view {
    static pacienteInterface(container, data){
        the(container).innerHTML = config.pacienteInterface;
        the(config.pacienteInterfaceNewButton).onclick = this.newPaciente;

        view.tablePacientes(data);
        view.buscarPaciente();
    }

    static newPaciente(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newPacientesTitulo;
        the(modal.contenido).innerHTML = config.newPacientesHTML;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        the("rut").dataset.modal = modal.id;

        $("#"+modal.button).on("click", function(){
            let paciente = {
                nombre: the("nombre").value,
                apellido: the("apellido").value,
                rut: the("rut").value,
                fum: the("fum").value,
                ciudad: the("ciudad").value,
                lugar: the("lugar").value,
                telefono: the("telefono").value,
                modal: this.dataset.modal
            }
            
            //validador de teléfono
            paciente.telefono = (paciente.telefono == "") ? 0 : parseInt(paciente.telefono);

            if(paciente.telefono > 99999999999999)
            {
                alert('El teléfono excede 14 dígitos');
                return 0;
            }

            cloud.newPaciente(paciente).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    location.assign("dashboard/index/"+data.rut);
                }
            });
        });

        the("fum").value = inputDate();

        view.rutValidador();
        view.calcularEG();
        view.selectCiudades();
        view.selectLugares();
        view.selectSemanas();
        view.selectDias();
        view.calcularFUM();
        $("#fum").trigger("change");
    }

    static editPaciente(){
        let id = this.dataset.id;

        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.updatePacientesTitulo;
        the(modal.contenido).innerHTML = config.updatePacientesHTML;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let paciente = {
                id: the("id").value,
                nombre: the("nombre").value,
                apellido: the("apellido").value,
                rut: the("rut").value,
                fum: the("fum").value,
                ciudad: the("ciudad").value,
                lugar: the("lugar").value,
                telefono: the("telefono").value,
                modal: this.dataset.modal
            }

            //validador de teléfono
            paciente.telefono = (paciente.telefono == "") ? 0 : parseInt(paciente.telefono);

            if(paciente.telefono > 99999999999999)
            {
                alert('El teléfono excede 14 dígitos');
                return 0;
            }

            cloud.updatePaciente(paciente).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    location.reload();
                }else if (data.return == false){
                    alert('No hay cambios que guardar');
                }
            });
        });

        view.rutValidador();
        view.calcularEG();
        view.selectCiudades();
        view.selectLugares();
        view.selectSemanas();
        view.selectDias();
        view.calcularFUM();

        cloud.getPaciente(id).then(function(data){
            the("id").value = data.id;
            the("nombre").value = data.nombre;
            the("apellido").value = data.apellido;
            the("rut").value = data.rut;
            the("fum").value = data.fum;
            the("ciudad").value = data.ciudad;
            the("lugar").value = data.lugar;
            the("telefono").value = data.telefono;

            $("#fum").trigger("change");
        });
    }

    static eliminarPaciente(){
        let paciente = {
            id: this.dataset.id
        }
        cloud.deletePaciente(paciente).then(function(data){
            if (data.return == true){
                location.reload();
            }
        });
    }

    static verExamenes(){
        let id = this.dataset.id;

        let modal = make.modal();
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verExamenesTitulo;
        the(modal.contenido).innerHTML = config.verExamenesHTML;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        cloud.getExamenes(id).then(function(data){
            if (data.return == true){
                view.tableExamen(data.data);
            }
        });

        the("btn.dopcre").onclick = dopcre.interface;
        the("btn.segundo").onclick = segundo.interface;
        the("btn.once").onclick = once.interface;
        the("btn.preco").onclick = preco.interface;
        the("btn.ginec").onclick = ginec.interface;
        the("btn.parto").onclick = parto.interface;
    }

    static tableExamen(data){
        let table = config.verExamenesTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            let tipo = "";
            if (element.tipo == "1"){
                tipo = 'Ecografía precoz de urgencia';
            } else if (element.tipo == "0"){
                tipo = 'Doppler + Eco. crecimiento';
            } else  if (element.tipo == "2"){
                tipo = 'Eco 2do / 3cer trimestre';
            } else  if (element.tipo == "3"){
                tipo = 'Eco Ginecológica';
            } else  if (element.tipo == "4"){
                tipo = 'Ecografía 11-14 semanas';
            }
            let fecha = element.fecha.split('-');
            let fechas = fecha[0] + "" + fecha[1] + "" + fecha[2];
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
            table += '<tr><td>'+ fecha +'</td><td>'+ element.eg +'</td><td>' + tipo +'</td>';
            element.solicitud_rut = element.solicitud_rut.replace(/\./g, "")

            table += '<td><div class="btn-group" role="group" aria-label="Basic example"><button class="btn btn-secondary foto mr-1" data-id='+ element.solicitud_rut + ' data-fecha='+ fechas +'><i class="fa fa-camera" aria-hidden="true"></i></button>';
            if (element.tipo == "0" || element.tipo == "2" || element.tipo == "4"){
                table += '<button class="btn btn-secondary informe mr-1" data-id='+ element.solicitud_id + ' data-tipo='+ element.tipo +'><i class="fa fa-file-text" aria-hidden="true"></i></button><button class="btn btn-secondary grafico" data-id='+ element.solicitud_id + ' data-tipo='+ element.tipo +'><i class="fa fa-bar-chart" aria-hidden="true"></i></button></div></td></tr>';
            }
            else{
                table += '<button class="btn btn-secondary informe mr-1" data-id='+ element.solicitud_id + ' data-tipo='+ element.tipo +'><i class="fa fa-file-text" aria-hidden="true"></i></button></div></td></tr>';
            }
        });
        table += '</tbody>';
        the(config.verExamenesTable).innerHTML = table;

        let fotoBtns = document.getElementsByClassName("foto");
        for (var i=0; i < fotoBtns.length; i++) { fotoBtns[i].onclick = this.foto; }

        let informeBtns = document.getElementsByClassName("informe");
        for (var i=0; i < informeBtns.length; i++) { informeBtns[i].onclick = this.informe; }

        let graficoBtns = document.getElementsByClassName("grafico");
        for (var i=0; i < graficoBtns.length; i++) { graficoBtns[i].onclick = this.grafico; }
    }

    static informe(){
        let id = this.dataset.id;
        let tipo = this.dataset.tipo;
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

        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verInformeTitulo;
        the(modal.contenido).innerHTML = config.verInformeHTML;
        the(modal.id).children[0].classList.add("h-100");

        the(config.verInformePdf).src = url+id;
        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let id = this.dataset.id;
            let modal = this.dataset.modal;
            $.get("dashboard/delete/" + id).done(function(data){
                $("#"+modal).modal("hide");
                //loadInFinish();
            });
        }).data("id", id).data("modal", modal.id);

        $("#ver\\.interconsulta\\.enviar").on("click", function(){
            let modal = makeModal("Enviar");

            let rol = uuidv4();
            let email = uuidv4();
            let ciudad = uuidv4();
            let adjuntar = uuidv4(); 

            document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);

            document.getElementById(modal.contenido).innerHTML = '<div class="row"> <div class="form-group col-6"> <label for="'+rol+'">Rol destinatario</label> <select class="form-control" id="'+rol+'"> <option value="Paciente">Paciente</option> <option value="Referente">Referente</option> <option value="Matrona">Matrona</option> <option value="Medico">Médico</option> <option value="Administrativo">Administrativo</option> <option value="Otros">Otros</option> </select> </div><div class="form-group col-6"> <label for="'+ciudad+'">Ciudad</label> <select class="form-control" id="'+ciudad+'"></select> </div><div class="form-group col-6"> <label for="'+email+'">Nombre del destinatario</label> <select class="form-control" id="'+email+'"></select> </div><div class="form-group col-6"> <label for="'+adjuntar+'">¿Adjuntar Gráfica?</label> <select class="form-control" id="'+adjuntar+'"> <option value="0">No</option> <option value="1">Si</option> </select> </div></div><p>Envía informe ecográfico y gráficas respectivas</p>';
            document.getElementById(modal.titulo).innerHTML = "Enviar informe por E-mail";                

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

            $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {$(this).remove();});

            document.getElementById(modal.button).dataset.informe = this.dataset.informe;
            document.getElementById(modal.button).dataset.id = this.dataset.id;
            document.getElementById(modal.button).dataset.email = email;
            document.getElementById(modal.button).dataset.modal = modal.id;
            document.getElementById(modal.button).dataset.adjuntar = adjuntar;

            $("#"+modal.button).on("click", function(){
                let informe = this.dataset.informe;
                let id = this.dataset.id;
                let email = $("#"+this.dataset.email).val();

                let adjuntar = $("#"+this.dataset.adjuntar).val();

                let animacion = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ml-2">Enviando informe...</span>';
                this.disabled = true;
                this.innerHTML = animacion;
                let modal = this.dataset.modal;

                let args = {email: email,informe: informe,solicitud: id, modal: modal, adjuntar: adjuntar}

                $.post(_api  + 'email_manual_autorreferido', args).done(function(data){
                    if (Object.keys(data).length > 0) {
                        let modal = makeModal();
                            document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                            document.getElementById(modal.titulo).innerHTML = "Información";

                            if (data.result == true){
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
    }

    static grafico(){
        let id = this.dataset.id; let tipo = this.dataset.tipo; let url = '';

        if (tipo == "0"){ url = 'graph/informe_dopplercrecimiento/'; }
        else if (tipo == "2"){ url = 'graph/informe_segundotrimestre/'; }
        else if (tipo == "4"){ url = 'graph/informe_once_catorce/'; }

        let modal = make.modal();
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verGraficoTitulo;
        the(modal.contenido).innerHTML = config.verGraficoHTML;
        the(modal.id).children[0].classList.add("h-100");

        the(config.verGraficoPdf).src = url+id;
        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });        
    }

    static foto(){
        let solicitud_rut = this.dataset.id;
        let fecha = this.dataset.fecha;
        let el_btn = this;
        $.get('image/index/'+solicitud_rut+'/'+fecha).done(function(data){
            if (data.exist == true){ location.assign("imagenes/index/"+solicitud_rut+"/"+fecha); }
            else{
                make.alert("No hay fotos para este exámen");
                $(el_btn).remove();
            }
        });
    }

    static tablePacientes(data){
        let table = config.pacienteInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.rut+'</td><td>'+element.nombre+'</td><td>'+element.apellido+'</td><td>'+humanDate(new Date(element.fum))+'</td><td class="tabla-pacientes"><div class="btn-group"><button class="btn btn-outline-primary examen" data-id="'+element.id+'">Examen</button><button class="btn btn-outline-primary modificar" data-id="'+element.id+'"><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="btn btn-outline-danger eliminar" data-id="'+element.id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.pacienteInterfaceTable).innerHTML = table;

        let examenBtns = document.getElementsByClassName("examen");
        for (var i=0; i < examenBtns.length; i++) { examenBtns[i].onclick = this.verExamenes; }

        let modificarBtns = document.getElementsByClassName("modificar");
        for (var i=0; i < modificarBtns.length; i++) { modificarBtns[i].onclick = this.editPaciente; }

        let eliminarBtns = document.getElementsByClassName("eliminar");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarPaciente; }
    }

    static rutValidador(){
        $('#rut').rut({
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

        $('#rut').on("blur", function(){
            cloud.findPaciente(this.value).then(function(data){
                if (data.length > 0){
                    $("#" + the("rut").dataset.modal).modal("hide");
                    make.alert("El RUT ya está ingresado en el sistema");
                    //ocultar modal de nuevo paciente
                }
            });
        });
    }

    static calcularEG(){
        $("#fum").on("change", function(){
            let fum = new Date();
            fum.setTime(Date.parse(this.value));
            fum = fum.getTime();
            let fee = new Date();
            fee = fee.getTime();
    
            //la fecha de mestruación si puede ser antes de la fecha de exámen
            let diff = fee - fum;
    
            if (diff > 0){
                let dias = Math.abs(diff/(1000*60*60*24));
                let semanas = Math.trunc(dias / 7);
                
                dias = Math.trunc(dias - (semanas * 7));
    
                document.getElementById("semanas").value = semanas;
                document.getElementById("dias").value = dias;
            }
            else{
                document.getElementById("semanas").value = 0;
                document.getElementById("dias").value = 0;
            }
        });
    }

    static selectCiudades(){
        cloud.getCiudades().then(function(data){
            data.forEach(function(element) {
                let ciudad = the("ciudad");
                let opt = document.createElement('option');
                opt.appendChild( document.createTextNode(element.ciudad_name) );
                opt.value = element.ciudad_name; 
                ciudad.appendChild(opt); 
            });
        });
    }

    static selectLugares(){
        cloud.getLugares().then(function(data){
            data.forEach(function(element) {
                let lugar = the("lugar");
                let opt = document.createElement('option');
                opt.appendChild( document.createTextNode(element.lugar_name) );
                opt.value = element.lugar_name; 
                lugar.appendChild(opt); 
            });
        });
    }

    static selectSemanas(){
        for (var i = 0; i < 43; i++) {
            let semanas = the("semanas");
            let opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            semanas.appendChild(opt);
        }
    }

    static selectDias(){
        for (var i = 0; i < 7; i++) {
            let dias = the("dias");
            let opt = document.createElement('option');
            opt.appendChild( document.createTextNode(i) );
            opt.value = i; 
            dias.appendChild(opt);
        }
    }

    static calcularFUM(){
        $("#semanas, #dias").on("change", function(){
            let semanas = parseInt(the("semanas").value);
            let dias = parseInt(the("dias").value);
    
            semanas = 7 * semanas;
    
            let fum = new Date();
            dias = (semanas + dias)*(1000*60*60*24);
            fum.setTime(fum.getTime() - dias);
    
            the("fum").value = inputDate(fum);
        });
    }

    static buscarPaciente(){
        $("#paciente\\.buscar").on("keypress", function(){
            if ( event.which == 13 ) {
                let paciente = this.value;
                paciente = paciente.replace(/\s+/g, "_");

                if (paciente.length == 0){
                    location.reload();
                    return 0;
                }

                cloud.findPaciente(paciente).then(function(data){
                    view.tablePacientes(data);
                });
            }
        });
    }
}