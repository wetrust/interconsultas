import {make, the, humanDate, inputDate} from '../wetrust.js';
import {config} from './config.js';

export class view {
    static imagenesInterface(container, data){
        let estructura = config.imagenesInterface;
            
        for (let i in data.JPGFiles) {
            estructura += '<div class="col-12 col-lg-3 col-md-4 col-sm-6"><a href="https://servidor.crecimientofetal.cl/data/'+ data.JPGFiles[i][1] +'" target="_blank"><img alt="Imágen ecográfica" src="https://servidor.crecimientofetal.cl/data/'+ data.JPGFiles[i][1] +'" class="img-fluid border border-primary rounded shadow mb-2" /></a><div class="form-group form-check"><input type="checkbox" class="form-check-input" name="foto" data-foto="'+ data.JPGFiles[i][1] +'"><label class="form-check-label">Seleccionar</label></div></div>';
        }

        estructura += '</div>';

        the(container).innerHTML = estructura;

        view.selectImagenes();
    }

    static selectImagenes(){
        $('input[name="foto"]').on("click", function() {  
            if ($('input[name="foto"]:checked').length > 0) {  
                the(imagenes.impresion).classList.remove("d-none");
                the(imagenes.email).classList.remove("d-none");
            } else {  
                the(imagenes.impresion).classList.add("d-none");
                the(imagenes.email).classList.add("d-none");
            }  
        });

    }
}