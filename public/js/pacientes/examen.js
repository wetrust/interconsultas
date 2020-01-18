import {make, the, humanDate, inputDate} from '../wetrust.js';
import {cloud} from './cloud.js';
import {config} from './config.js';

export class dopcre {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.dopcreTitulo;
        the(modal.contenido).innerHTML = config.dopcreHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        the(modal.button).onclick = dopcre.save();
        
        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){

    }
}

export class segundo {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.segundoTitulo;
        the(modal.contenido).innerHTML = config.segundoHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        the(modal.button).onclick = segundo.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}

export class once {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.onceTitulo;
        the(modal.contenido).innerHTML = config.onceHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        the(modal.button).onclick = once.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}

export class preco {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.precoTitulo;
        the(modal.contenido).innerHTML = config.precoHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        the(modal.button).onclick = preco.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}

export class ginec {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.ginecTitulo;
        the(modal.contenido).innerHTML = config.ginecHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        the(modal.button).onclick = ginec.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}

export class parto {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.partoTitulo;
        the(modal.contenido).innerHTML = config.partoHTML;
        the(modal.id).children[0].classList.add("h-100","modal-xl");
        the(modal.id).children[0].classList.remove("modal-lg");

        the(modal.button).onclick = parto.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}