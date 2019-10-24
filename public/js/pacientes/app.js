import {make, the} from '../wetrust.js';
import {cloud} from './cloud.js';
import {view} from './view.js';

let spinnerGrow = make.spinnerGrow();
the("pacientes").innerHTML = spinnerGrow.html;
cloud.getPacientes().then(function(res){
    console.log(res)
});

the("paciente.nuevo").click = view.newPaciente();