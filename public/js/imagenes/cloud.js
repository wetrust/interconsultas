import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getPhotos(paciente, date){
        try {
            const from = await data.get(config.images+paciente+"/"+date);
            return from;
        } catch(e) {}
    }
    static async getPDF(fotos){
        try {
            const to = new FormData();
            to.append('fotos', fotos);

            const from = await data.post(config.pdfimagenes, to);
            return from;

        } catch(e){}
    }
    static async getCiudades(rol, ciudad){
        try {
            const from = await data.get(config.ciudadesProfesional+rol);
            let respuesta = {
                ciudad: ciudad,
                ciudades: from
            }
            return respuesta;
        } catch(e) {}
    }
    static async getEmails(rol, ciudad, email){
        try {
            const from = await data.get(config.emailProfesional+rol+ciudad);
            let respuesta = {
                email: email,
                emails: from
            }
            return respuesta;
        } catch(e) {}
    }
    static async sendEmail(datos){
        try {
            const to = new FormData();
            to.append('email', datos.email);
            to.append('informe', datos.informe);
            to.append('paciente', datos.paciente);
            to.append('date', datos.date);
            to.append('fotos', datos.fotos);
            to.append('modal', datos.modal);

            const from = await data.post(config.pdfimagenes, to);
            return from;

        } catch(e){}
    }
}