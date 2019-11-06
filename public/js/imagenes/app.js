import {make, the} from '../wetrust.js';
import {cloud} from './cloud.js';
import {view} from './view.js';

let spinnerGrow = make.spinnerGrow();
the("imagenes").innerHTML = spinnerGrow.html;
cloud.getPhotos(paciente_id,date).then(function(data){
    view.pacienteInterface("pacientes",data);
});
