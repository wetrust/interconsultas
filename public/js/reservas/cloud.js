import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getReservas(){
        try {
            const from = await data.get(config.reservas);
            return from;
        } catch(e) {}
    }
    static async findReservas(fecha){
        try {
            const from = await data.get(config.find + fecha);
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
            to.append('nacionalidad', paciente.nacionalidad);
            to.append('ciudad', paciente.ciudad);
            to.append('lugar', paciente.lugar);
            to.append('patologia', paciente.patologia);
            to.append('telefono', paciente.telefono);
            to.append('modal', paciente.modal);
            to.append('reservas', paciente.reservas);

            const from = await data.post(config.new, to);
            return from;
        } catch(e){}
    }
    static async newReserva(reserva){
        try {
            const to = new FormData();
            to.append('rut', reserva.rut);
            to.append('nombre', reserva.nombre);
            to.append('apellido', reserva.apellido);
            to.append('dia', reserva.dia);
            to.append('hora', reserva.hora);
            to.append('minutos', reserva.minutos);
            to.append('modal', reserva.modal);

            const from = await data.post(config.newReserva, to);
            return from;
        } catch(e){}
    }
    static async deleteReserva(reserva){
        try {
            const to = new FormData();
            to.append('id', reserva.id);
            to.append('fecha', reserva.fecha);
            to.append('modal', reserva.modal);

            const from = await data.post(config.deleteReserva, to);
            return from;

        } catch(e){}
    }
    static async getConfiguraciones(){
        try {
            const from = await data.get(config.configuraciones);
            return from;
        } catch(e) {}
    }
}