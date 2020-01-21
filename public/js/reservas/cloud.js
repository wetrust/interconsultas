import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getReservas(){
        try {
            const from = await data.get(config.reservas);
            return from;
        } catch(e) {}
    }
    static async findPaciente(paciente){
        try {
            const from = await data.get(config.find + paciente);
            from.paciente = paciente;
            return from;
        } catch(e) {}
    }
    static async newPaciente(paciente){
        try {
            const to = new FormData();
            to.append('nombre', paciente.nombre);
            to.append('apellido', paciente.apellido);
            to.append('rut', paciente.rut);
            to.append('fum', paciente.fum);
            to.append('ciudad', paciente.ciudad);
            to.append('lugar', paciente.lugar);
            to.append('telefono', paciente.telefono);
            to.append('modal', paciente.modal);
            to.append('reservas', paciente.reservas);

            const from = await data.post(config.new, to);
            return from;
        } catch(e){}
    }
}