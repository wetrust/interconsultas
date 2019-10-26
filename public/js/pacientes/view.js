import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate, inputDate} from '../wetrust.js';

export class view {
    static pacienteInterface(container, data){
        the(container).innerHTML = config.pacienteInterface;
        the(config.pacienteInterfaceNewButton).onclick = this.newPaciente;

        let table = config.pacienteInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.id+'</th><td>'+element.rut+'</td><td>'+element.nombre+'</td><td>'+element.apellido+'</td><td>'+humanDate(new Date(element.fum))+'</td><td class="tabla-pacientes"><button class="btn btn-danger modificar" data-id="'+element.id+'">modificar</button><button class="btn btn-danger eliminar" data-id="'+element.id+'">Eliminar</button></td></tr>';
        });

        table += '</tbody>';

        the(config.pacienteInterfaceTable).innerHTML = table;

        let modificarBtns = document.getElementsByClassName("modificar");

        for (var i=0; i < modificarBtns.length; i++) {
            modificarBtns[i].onclick = this.editPaciente;
        }

        let eliminarBtns = document.getElementsByClassName("eliminar");

        for (var i=0; i < eliminarBtns.length; i++) {
            eliminarBtns[i].onclick = this.eliminarPaciente;
        }
    }

    static newPaciente(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newPacientesTitulo;
        the(modal.contenido).innerHTML = config.newPacientesHTML;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        $("#"+modal.button).on("click", function(){
            let paciente = {
                nombre: the("nombre").value,
                apellido: the("apellido").value,
                rut: the("rut").value,
                fum: the("fum").value,
                comuna: the("comuna").value,
                telefono: the("telefono").value,
                modal: this.dataset.modal
            }
            cloud.newPaciente(paciente).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    location.reload();
                }
            });
        });

        the("fum").value = inputDate();

        view.rutValidador();
        view.calcularEG();
        view.selectComunas();
        $("#fum").trigger("change");
    }

    static editPaciente(){
        view.selectComunas();

        let id = this.dataset.id;

        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.updatePacientesTitulo;
        the(modal.contenido).innerHTML = config.updatePacientesHTML;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        $("#"+modal.button).on("click", function(){
            let paciente = {
                id: the("id").value,
                nombre: the("nombre").value,
                apellido: the("apellido").value,
                rut: the("rut").value,
                fum: the("fum").value,
                comuna: the("comuna").value,
                telefono: the("telefono").value,
                modal: this.dataset.modal
            }
            cloud.updatePaciente(paciente).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    location.reload();
                }
            });
        });

        view.rutValidador();
        view.calcularEG();

        cloud.getPaciente(id).then(function(data){
            the("id").value = data.id;
            the("nombre").value = data.nombre;
            the("apellido").value = data.apellido;
            the("rut").value = data.rut;
            the("fum").value = data.fum;
            the("comuna").value = data.comuna;
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

    static selectComunas(){
        cloud.getAllComunas().then(function(data){
            data.forEach(function(element) {
                let comunas = the("comuna");
                let opt = document.createElement('option');
                opt.appendChild( document.createTextNode(element.comuna_name) );
                opt.value = element.comuna_id; 
                comunas.appendChild(opt); 
            });
            the("comuna").value = 0;
        });
    }
}