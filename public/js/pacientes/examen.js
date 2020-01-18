import {make, the, humanDate, inputDate} from '../wetrust.js';
import {cloud} from './cloud.js';
import {config} from './config.js';

export class dopcre {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verExamenesTitulo;
        the(modal.contenido).innerHTML = config.verExamenesHTML;
        the(modal.id).children[0].classList.add("h-100");

        the(modal.button).onclick = this.save();
        
        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){

    }
}

export class segundo {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verExamenesTitulo;
        the(modal.contenido).innerHTML = config.verExamenesHTML;
        the(modal.id).children[0].classList.add("h-100");

        the(modal.button).onclick = this.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}

export class once {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verExamenesTitulo;
        the(modal.contenido).innerHTML = config.verExamenesHTML;
        the(modal.id).children[0].classList.add("h-100");

        the(modal.button).onclick = this.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}

export class preco {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verExamenesTitulo;
        the(modal.contenido).innerHTML = config.verExamenesHTML;
        the(modal.id).children[0].classList.add("h-100");

        the(modal.button).onclick = this.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}

export class ginec {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verExamenesTitulo;
        the(modal.contenido).innerHTML = config.verExamenesHTML;
        the(modal.id).children[0].classList.add("h-100");

        the(modal.button).onclick = this.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}

export class parto {
    static interface(){
        let modal = make.modal("Guardar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.verExamenesTitulo;
        the(modal.contenido).innerHTML = config.verExamenesHTML;
        the(modal.id).children[0].classList.add("h-100");

        the(modal.button).onclick = this.save();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }

    static save(){
        
    }
}