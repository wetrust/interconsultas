import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate} from '../wetrust.js';

export class view {
    static pacienteInterface(container, data){
        the(container).innerHTML = config.pacienteInterface;
        the(config.pacienteInterfaceNewButton).onclick = this.newPaciente;

        let table = config.pacienteInterfaceTableHead;

        table += '<tbody></tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.id+'</th><td>'+element.rut+'</td><td>'+element.nombre+'</td><td>'+humanDate(new Date(element.fum))+'</td><td><button class="btn btn-danger eliminar" data-id="'+element.id+'">Eliminar</button></td></tr>';
        });

        table += '</tbody>';

        the(config.pacienteInterfaceTable).innerHTML = table;

        document.getElementsByClassName("eliminar").onclick = this.eliminarPaciente;
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
                rut: the("rut").value,
                fum: the("fum").value,
                modal: this.dataset.id
            }
            cloud.newPaciente(paciente).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    location.reload();
                }
            });
        })

    }
}