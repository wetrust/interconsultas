import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getPacientes(){
        try {
            const from = await data.get(config.pacientes);
            return from;
        } catch(e) {}
    }
    static async getPaciente(paciente){
        try {
            const from = await data.get(config.paciente + paciente);
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

            const from = await data.post(config.new, to);
            return from;
        } catch(e){}
    }

    static async updatePaciente(paciente){
        try {
            const to = new FormData();
            to.append('id', paciente.id);
            to.append('nombre', paciente.nombre);
            to.append('apellido', paciente.apellido);
            to.append('rut', paciente.rut);
            to.append('fum', paciente.fum);
            to.append('ciudad', paciente.ciudad);
            to.append('lugar', paciente.lugar);
            to.append('telefono', paciente.telefono);
            to.append('modal', paciente.modal);

            const from = await data.post(config.update, to);
            return from;

        } catch(e){}
    }

    static async deletePaciente(paciente){
        try {
            const to = new FormData();
            to.append('id', paciente.id);

            const from = await data.post(config.delete, to);
            return from;

        } catch(e){}
    }

    static async getCiudades(){
        try {
            const from = await data.get(config.ciudades);
            return from;
        } catch(e) {}
    }

    static async getLugares(){
        try {
            const from = await data.get(config.lugares);
            return from;
        } catch(e) {}
    }
}

export var paciente = {
    nombre: '',
    rut:'',
    fum:''
}