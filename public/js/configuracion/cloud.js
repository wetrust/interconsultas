import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getConfiguraciones(){
        try {
            const from = await data.get(config.configuraciones);
            return from;
        } catch(e) {}
    }
    static async newNacionalidad(nacionalidad){
        try {
            const to = new FormData();
            to.append('nacionalidad', nacionalidad.nacionalidad);
            to.append('modal', nacionalidad.modal);

            const from = await data.post(config.newNacionalidad, to);
            return from;
        } catch(e){}
    }
    static async newCiudad(ciudad){
        try {
            const to = new FormData();
            to.append('ciudad', ciudad.ciudad);
            to.append('modal', ciudad.modal);

            const from = await data.post(config.newCiudad, to);
            return from;
        } catch(e){}
    }
    static async newLugar(lugar){
        try {
            const to = new FormData();
            to.append('lugar', lugar.lugar);
            to.append('modal', lugar.modal);

            const from = await data.post(config.newLugar, to);
            return from;
        } catch(e){}
    }
    static async newPatologia(patologia){
        try {
            const to = new FormData();
            to.append('patologia', patologia.patologia);
            to.append('modal', patologia.modal);

            const from = await data.post(config.newPatologia, to);
            return from;
        } catch(e){}
    }
}