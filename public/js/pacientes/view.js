import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the} from '../wetrust.js';

export class view {
    static newPaciente(){
        let modal = make.modal("Crear");
        the("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newPacientesTitulo;
        the(modal.contenido).innerHTML = config.newPacientesHTML;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        $("#"+modal.button).on("click", function(){
            let paciente = {
                nombre: the("nombre").value,
                rut: the("rut").value,
                fum: the("fum").value
            }
            cloud.newPaciente(paciente)
        })

    }
}