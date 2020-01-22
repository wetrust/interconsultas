import {cloud} from './cloud.js';
import {view} from './view.js';

cloud.getConfiguraciones().then(function(data){
    view.configuracionesInterface("configuracion",data);
});