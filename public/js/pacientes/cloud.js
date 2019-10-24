import {data} from '../wetrust.js';
import {config} from './config.js';

export class cloud {
    static async getPacientes(){
        try {
            const result = await data.get(config.pacientes);
            return result;
        } catch(e) {}
    }
}