import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate, inputDate} from '../wetrust.js';

export class view {
    static configuracionesInterface(container, data){
        the(container).innerHTML = config.configuracionInterface;

        the(config.configuracionNacionalidadInterfaceNewButton).onclick = this.newNacionalidad;
        the(config.configuracionCiudadInterfaceNewButton).onclick = this.newCiudad;
        the(config.configuracionLugarInterfaceNewButton).onclick = this.newLugar;
        the(config.configuracionPatologiaInterfaceNewButton).onclick = this.newPatologia;
        
        view.tableNacionalidad(data[0]);
        view.tableCiudad(data[1]);
        view.tableLugar(data[2]);
        view.tablePatologia(data[3]);
    }

    static newNacionalidad(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newNacionalidadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.contenido).innerHTML = config.newNacionalidadHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let nacionalidad = {
                nacionalidad: the("input.nacionalidad").value,
                modal: this.dataset.modal,
            }

            if(nacionalidad.nacionalidad.length < 1){
                make.alert('Escriba el nombre de una nacionalidad');
                return 0;
            }

            cloud.newNacionalidad(nacionalidad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableNacionalidad(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                }
            });
        });
    }

    static newCiudad(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newCiudadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.contenido).innerHTML = config.newCiudadHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let ciudad = {
                ciudad: the("input.ciudad").value,
                modal: this.dataset.modal,
            }
            
            if(ciudad.ciudad.length < 1){
                make.alert('Escriba el nombre de una ciudad');
                return 0;
            }

            cloud.newCiudad(ciudad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableCiudad(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                }
            });
        });
    }

    static newLugar(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newLugarTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.contenido).innerHTML = config.newLugarHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let lugar = {
                lugar: the("input.lugar").value,
                modal: this.dataset.modal,
            }
            
            if(lugar.lugar.length < 1){
                make.alert('Escriba el nombre de un lugar');
                return 0;
            }

            cloud.newLugar(lugar).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableLugar(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                }
            });
        });
    }

    static newPatologia(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newPatologiaTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.contenido).innerHTML = config.newPatologiaHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let patologia = {
                patologia: the("input.patologia").value,
                modal: this.dataset.modal,
            }
            
            if(patologia.patologia.length < 1){
                make.alert('Escriba el nombre de una patología');
                return 0;
            }

            cloud.newPatologia(patologia).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tablePatologia(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                }
            });
        });
    }

    static tableNacionalidad(data){
        let table = config.configuracionNacionalidadInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.nacionalidad_id+'</td><td>'+element.nacionalidad_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar" data-id="'+element.nacionalidad_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionNacionalidadInterfaceTable).innerHTML = table;

        //let eliminarBtns = document.getElementsByClassName("eliminar");
        //for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarPaciente; }
    }

    static tableCiudad(data){
        let table = config.configuracionCiudadInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.ciudad_id+'</td><td>'+element.ciudad_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar" data-id="'+element.ciudad_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionCiudadInterfaceTable).innerHTML = table;

        //let eliminarBtns = document.getElementsByClassName("eliminar");
        //for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarPaciente; }
    }

    static tableLugar(data){
        let table = config.configuracionLugarInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.lugar_id+'</td><td>'+element.lugar_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar" data-id="'+element.lugar_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionLugarInterfaceTable).innerHTML = table;

        //let eliminarBtns = document.getElementsByClassName("eliminar");
        //for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarPaciente; }
    }

    static tablePatologia(data){
        let table = config.configuracionPatologiaInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.patologia_id+'</td><td>'+element.patologia_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar" data-id="'+element.patologia_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionPatologiaInterfaceTable).innerHTML = table;

        //let eliminarBtns = document.getElementsByClassName("eliminar");
        //for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarPaciente; }
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
}