import {cloud} from './cloud.js';
import {view} from './view.js';

cloud.getReservas().then(function(data){
    view.reservasInterface("reservas",data);
});