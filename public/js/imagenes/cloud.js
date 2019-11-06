import {data} from '../wetrust.js';
import {config} from './config';

export class cloud {
    static async getPhotos(paciente, date){
        try {
            const from = await data.get(config.images+paciente+"/"+date);
            return from;
        } catch(e) {}
    }
}