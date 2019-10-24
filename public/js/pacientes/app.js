import {make, the} from '../wetrust.js';
import {cloud} from './cloud.js';

let spinnerGrow = make.spinnerGrow();
the("pacientes").innerHTML = spinnerGrow.html;
cloud.getPacientes().then(function(res){
    console.log(res)
});