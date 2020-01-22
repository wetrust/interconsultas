import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate, inputDate} from '../wetrust.js';

export class view {
    static reservasInterface(container, data){
        the(container).innerHTML = config.reservasInterface;
        the(config.reservasInterfaceNewButton).onclick = this.newReserva;

        the(config.reservasInterfaceSearch).value = inputDate();
        view.tableReservas(data);
        view.buscarReservas();
    }

    static newReserva(){
        let modal = make.modal("Reservar hora");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newReservaTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.contenido).innerHTML = config.newReservaHTML;
        the(modal.contenido).classList.add("bg-light");

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

        the("dia").value = the(config.reservasInterfaceSearch).value;

        view.rutValidador();
    }

    static newPaciente(_rut){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.titulo).innerHTML = config.newPacientesTitulo;
        the(modal.contenido).innerHTML = config.newPacientesHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        document.getElementsByName("rut")[0].value = _rut;

        $("#"+modal.button).on("click", function(){
            let paciente = {
                nombre: document.getElementsByName("nombre")[0].value,
                apellido: document.getElementsByName("apellido")[0].value,
                rut: the("rut").value,
                fum: the("fum").value,
                ciudad: the("ciudad").value,
                lugar: the("lugar").value,
                telefono: the("telefono").value,
                modal: this.dataset.modal,
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
                    $("#rut").trigger("blur");
                }
            });
        });

        the("fum").value = inputDate();

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


    static tableReservas(data){
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
                the("nombre").value = "";
                the("apellido").value = "";
            },
            fn_validado : function(input){
                $(input).removeClass("is-invalid").addClass("is-valid");
                input.closest('.rut-container').find('span').remove();
                input.closest('.rut-container').append('<span class="valid-feedback">Rut correcto</span>');
                
                cloud.findPaciente(input[0].value).then(function(data){
                    if (data.length > 0){
                        the("nombre").value = data[0].nombre;
                        the("apellido").value = data[0].apellido;
                    }else{
                        view.newPaciente(input[0].value);

                    }
                });
            },
            placeholder: false
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

    static buscarReservas(){
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