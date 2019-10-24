import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getPacientes(){
        try {
            const from = await data.get(config.pacientes);
            return from;
        } catch(e) {}
    }
    static async newPaciente(paciente){
        try {
            const to = new FormData();
            to.append('nombre', paciente.nombre);
            to.append('rut', paciente.rut);
            to.append('fum', paciente.fum);

            const from = await data.post(config.new, to);
            return from;

        } catch(e){}
    }
}

export var paciente = {
    nombre: '',
    rut:'',
    fum:''
}