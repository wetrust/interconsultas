import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate, inputDate} from '../wetrust.js';

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

        let graficoBtns = document.getElementsByClassName("grafico");
        for (var i=0; i < graficoBtns.length; i++) { graficoBtns[i].onclick = this.grafico; }
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