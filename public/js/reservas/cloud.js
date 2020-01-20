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
}