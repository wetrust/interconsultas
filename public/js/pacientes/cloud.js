import {data} from '../wetrust';
import {config} from 'config';

export class cloud {
    static async getPacientes(){
        try {
            const result = await data.get(config.pacientes);
            return result;
        } catch(e) {}
    }
}