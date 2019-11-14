"use strict";
import {make, the, b64toBlob, clearSelect, loadSelect} from '../wetrust.js';
import {config} from './config.js';
import { cloud } from './cloud.js';

export class view {
    static imagenesInterface(container, data){
        let estructura = config.imagenesInterface;
            
        for (let i in data.JPGFiles) {
            estructura += '<div class="col-12 col-lg-3 col-md-4 col-sm-6"><a href="https://servidor.crecimientofetal.cl/data/'+ data.JPGFiles[i][1] +'" target="_blank"><img alt="Imágen ecográfica" src="https://servidor.crecimientofetal.cl/data/'+ data.JPGFiles[i][1] +'" class="img-fluid border border-primary rounded shadow mb-2" /></a><div class="form-group form-check"><input type="checkbox" class="form-check-input" name="foto" data-foto="'+ data.JPGFiles[i][1] +'"><label class="form-check-label">Seleccionar</label></div></div>';
        }

        estructura += '</div>';

        the(container).innerHTML = estructura;

        view.selectImagenes();
        the("imagenes.impresion").onclick = view.verInforme;
        the("imagenes.email").onclick = view.verEnviarModal;
    }

    static selectImagenes(){
        $('input[name="foto"]').on("click", function() {
            if ($('input[name="foto"]:checked').length > 0) {
                the("imagenes.impresion").classList.remove("d-none");
                the("imagenes.email").classList.remove("d-none");
            } else {
                the("imagenes.impresion").classList.add("d-none");
                the("imagenes.email").classList.add("d-none");
            }
        });
    }

    static verInforme(){
        let contador = 0;
        let sList = "";
        
        $('input[name="foto"]').each(function () {
            if (this.checked) {
                var sThisVal = (this.checked ? this.dataset.foto : "");
                sList += (sList=="" ? sThisVal : "," + sThisVal);
                contador++;
            }
        });
        
        if (contador == 0){
            make.alert("<p>Debes seleccionar al menos una imágen</p>");
            return;
        }else if (contador % 2 != 0){
            make.alert("<p>Prefiere seleccionar imágenes en números par, actualmente has seleccionado " + contador + " imágenes.</p>");
            return;
        }else if (contador >8){
            make.alert("<p>Máximo 8 imágenes.</p>");
            return;
        }

        cloud.getPDF(sList).then(function(data){
            if (data.result == true){
                const blob = b64toBlob(data.pdf, "application/pdf");
                const url = URL.createObjectURL(blob);

                let modal = make.modal();
                document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                the(modal.contenido).innerHTML = '<iframe style="min-height:400px;" src="'+ url+'" class="embed-responsive-item w-100 h-100"></iframe>';
                the(modal.titulo).innerHTML = "Informe de imágenes";
        
                $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
            }else{
                alert("Hubo un error al generar informe");
            }
        });
    }

    static verEnviarModal(){
        let modal = make.modal("Enviar");
        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        
        let spinnerGrow = make.spinnerGrow();
        the(modal.contenido).innerHTML = spinnerGrow.html;
        the(modal.titulo).innerHTML = "Enviar por email";

        let rol = make.uuidv4();
        let email = make.uuidv4();
        let informe = make.uuidv4();
        let ciudad = make.uuidv4();

        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
            $(this).remove();
        });

        the(modal.contenido).innerHTML = '<div class="row"> <div class="form-group col-6"> <label for="'+rol+'">Rol destinatario</label> <select class="form-control" id="'+rol+'"> <option value="Paciente">Paciente</option> <option value="Referente">Referente</option> <option value="Matrona">Matrona</option> <option value="Medico">Médico</option> <option value="Administrativo">Administrativo</option> <option value="Otros">Otros</option> </select> </div><div class="form-group col-6"> <label for="'+ciudad+'">Ciudad</label> <select class="form-control" id="'+ciudad+'"></select> </div><div class="form-group col-6"> <label for="'+email+'">Nombre destinatario</label> <select class="form-control" id="'+email+'"></select> </div><div class="form-group col-6"> <label for="'+informe+'">Adjuntar informe</label> <select class="form-control" id="'+informe+'"> <option value="0">No</option> <option value="1">Informe</option> <option value="2">Gráfica</option> <option value="3">Informe y Gráfica</option> </select> </div></div>';
        the(rol).dataset.ciudad = ciudad;
        the(ciudad).dataset.rol = rol;
        the(ciudad).dataset.email = email;
        the(modal.button).dataset.email = email;
        the(modal.button).dataset.informe = informe;
        the(modal.button).dataset.modal = modal.id;

        the(modal.button).onclick = view.enviarFotosInforme;

        the(rol).onchange = view.loadCiudades;
        the(ciudad).onchange = view.loadEmails;
    }

    static enviarFotosInforme(){
        let informe = the(this.dataset.informe).value;
        let modal = this.dataset.modal;
        let email = the(this.dataset.email).value;

        let animacion = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="ml-2">Enviando informe...</span>';
        this.disabled = true;
        this.innerHTML = animacion;

        let contador = 0;
        let sList = "";
        
        $('input[name="foto"]').each(function () {
            if (this.checked) {
                var sThisVal = (this.checked ? this.dataset.foto : "");
                sList += (sList=="" ? sThisVal : "," + sThisVal);
                contador++;
            }
        });

        if (contador == 0){
            make.alert("<p>Debes seleccionar al menos una imágen</p>");
            return;
        }

        let args = {email: email,informe: informe,paciente: paciente_id, date,date, fotos:sList, modal: modal}

        cloud.sendEmail(args).then(function(data){
            if (Object.keys(data).length > 0) {
                let alert = ""
                if (data.result == true){
                    alert = '<p class="text-center">Enviado</p>';
                }
                else{
                    alert = '<p class="text-center">No se pudo enviar, intente nuevamente</p>';
                }

                make.alert(alert);

                $('#'+ data.modal).modal("hide");
            }
        });
    }

    static loadCiudades(){
        let ciudad = this.dataset.ciudad;

        clearSelect(ciudad);

        cloud.getCiudades(this.value, ciudad).then(function(data){
            loadSelect(data.ciudad, data.ciudades);
            the(data.ciudad).onchange();
        });
    }

    static loadEmails(){
        let rol = the(this.dataset.rol).value;
        let email = this.dataset.email;

        clearSelect(email);

        cloud.getEmails(rol,"/"+this.value, email).then(function(data){
            loadSelect(data.email, data.emails);
        });  
    }
}