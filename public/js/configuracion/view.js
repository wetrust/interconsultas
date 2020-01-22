import {cloud} from './cloud.js';
import {config} from './config.js';
import {make, the, humanDate, inputDate} from '../wetrust.js';

export class view {
    static configuracionesInterface(container, data){
        the(container).innerHTML = config.configuracionInterface;

        the(config.configuracionNacionalidadInterfaceNewButton).onclick = this.newNacionalidad;
        the(config.configuracionCiudadInterfaceNewButton).onclick = this.newCiudad;
        the(config.configuracionLugarInterfaceNewButton).onclick = this.newLugar;
        the(config.configuracionPatologiaInterfaceNewButton).onclick = this.newPatologia;
        
        view.tableNacionalidad(data[0]);
        view.tableCiudad(data[1]);
        view.tableLugar(data[2]);
        view.tablePatologia(data[3]);
    }

    static newNacionalidad(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newNacionalidadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.contenido).innerHTML = config.newNacionalidadHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let nacionalidad = {
                nacionalidad: the("input.nacionalidad").value,
                modal: this.dataset.modal,
            }

            if(nacionalidad.nacionalidad.length < 1){
                make.alert('Escriba el nombre de una nacionalidad');
                return 0;
            }

            cloud.newNacionalidad(nacionalidad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableNacionalidad(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                }
            });
        });
    }

    static newCiudad(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newCiudadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.contenido).innerHTML = config.newCiudadHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let ciudad = {
                ciudad: the("input.ciudad").value,
                modal: this.dataset.modal,
            }
            
            if(ciudad.ciudad.length < 1){
                make.alert('Escriba el nombre de una ciudad');
                return 0;
            }

            cloud.newCiudad(ciudad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableCiudad(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                }
            });
        });
    }

    static newLugar(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newLugarTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.contenido).innerHTML = config.newLugarHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let lugar = {
                lugar: the("input.lugar").value,
                modal: this.dataset.modal,
            }
            
            if(lugar.lugar.length < 1){
                make.alert('Escriba el nombre de un lugar');
                return 0;
            }

            cloud.newLugar(lugar).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableLugar(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                }
            });
        });
    }

    static newPatologia(){
        let modal = make.modal("Crear");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.newPatologiaTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("g-verde");
        the(modal.contenido).innerHTML = config.newPatologiaHTML;
        the(modal.contenido).classList.add("bg-light");

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let patologia = {
                patologia: the("input.patologia").value,
                modal: this.dataset.modal,
            }
            
            if(patologia.patologia.length < 1){
                make.alert('Escriba el nombre de una patología');
                return 0;
            }

            cloud.newPatologia(patologia).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tablePatologia(data.data);
                }else{
                    make.alert('Hubo un error al guardar');
                }
            });
        });
    }

    static tableNacionalidad(data){
        let table = config.configuracionNacionalidadInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.nacionalidad_id+'</td><td>'+element.nacionalidad_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar-nacionalidad" data-id="'+element.nacionalidad_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionNacionalidadInterfaceTable).innerHTML = table;

        let eliminarBtns = document.getElementsByClassName("eliminar-nacionalidad");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarNacionalidad; }
    }

    static tableCiudad(data){
        let table = config.configuracionCiudadInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.ciudad_id+'</td><td>'+element.ciudad_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar-ciudad" data-id="'+element.ciudad_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionCiudadInterfaceTable).innerHTML = table;

        let eliminarBtns = document.getElementsByClassName("eliminar-ciudad");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarCiudad; }
    }

    static tableLugar(data){
        let table = config.configuracionLugarInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.lugar_id+'</td><td>'+element.lugar_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar-lugar" data-id="'+element.lugar_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionLugarInterfaceTable).innerHTML = table;

        let eliminarBtns = document.getElementsByClassName("eliminar-lugar");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarLugar; }
    }

    static tablePatologia(data){
        let table = config.configuracionPatologiaInterfaceTableHead;

        table += '<tbody>';
        data.forEach(function(element) {
            table += '<tr><th scope="row">'+element.patologia_id+'</td><td>'+element.patologia_name+'</td><td><div class="btn-group"><button class="btn btn-outline-danger eliminar-patologia" data-id="'+element.patologia_id+'"><i class="fa fa-trash" aria-hidden="true"></i></button></div></td></tr>';
        });

        table += '</tbody>';
        the(config.configuracionPatologiaInterfaceTable).innerHTML = table;

        let eliminarBtns = document.getElementsByClassName("eliminar-patologia");
        for (var i=0; i < eliminarBtns.length; i++) { eliminarBtns[i].onclick = this.eliminarPatologia; }
    }

    static eliminarNacionalidad(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deleteNacionalidadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deleteNacionalidadHTML;
        the(modal.contenido).classList.add("bg-light");

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let nacionalidad = {
                id: this.dataset.id,
                modal: this.dataset.modal
            }
            cloud.deleteNacionalidad(nacionalidad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableNacionalidad(data.data);
                }else{
                    make.alert('Hubo un error al eliminar');
                }
            });
        });
    }

    static eliminarCiudad(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deleteCiudadTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deleteCiudadHTML;
        the(modal.contenido).classList.add("bg-light");

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let ciudad = {
                id: this.dataset.id,
                modal: this.dataset.modal
            }
            cloud.deleteCiudad(ciudad).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableCiudad(data.data);
                }else{
                    make.alert('Hubo un error al eliminar');
                }
            });
        });
    }

    static eliminarLugar(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deleteLugarTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deleteLugarHTML;
        the(modal.contenido).classList.add("bg-light");

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let lugar = {
                id: this.dataset.id,
                modal: this.dataset.modal
            }
            cloud.deleteLugar(lugar).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tableLugar(data.data);
                }else{
                    make.alert('Hubo un error al eliminar');
                }
            });
        });
    }

    static eliminarPatologia(){
        let modal = make.modal("Eliminar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.titulo).innerHTML = config.deletePatologiaTitulo;
        the(modal.titulo).classList.add("mx-auto","text-white");
        the(modal.titulo).parentElement.classList.add("bg-danger");
        the(modal.contenido).innerHTML = config.deletePatologiaHTML;
        the(modal.contenido).classList.add("bg-light");

        the(modal.button).dataset.id = this.dataset.id;

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });

        $("#"+modal.button).on("click", function(){
            let patologia = {
                id: this.dataset.id,
                modal: this.dataset.modal
            }
            cloud.deletePatologia(patologia).then(function(data){
                if (data.return == true){
                    $("#"+data.modal).modal("hide");
                    view.tablePatologia(data.data);
                }else{
                    make.alert('Hubo un error al eliminar');
                }
            });
        });
    }
}