import {make, the} from '../wetrust';
import {cloud} from 'cloud';

let spinnerGrow = make.spinnerGrow();
the("pacientes").innerHTML = spinnerGrow.html;
cloud.getPacientes().then(function(res){
    console.log(res)
});