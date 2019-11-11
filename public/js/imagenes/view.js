import {make, the, humanDate, inputDate, b64toBlob} from '../wetrust.js';
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
        the("imagenes.impresion").onclick = this.verInforme;
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
        var contador = 0;
        var sList = "";
        
            $('input[name="foto"]').each(function () {
                if (this.checked) {
                    var sThisVal = (this.checked ? this.dataset.foto : "");
                    sList += (sList=="" ? sThisVal : "," + sThisVal);
                    contador++;
                }
            });
        
            if (contador == 0){
                alert("Debes seleccionar al menos una imágen");
                return;
            }
        
            
            if (contador % 2 != 0){
                alert("Prefiere seleccionar imágenes en números par, actualmente has seleccionado " + contador + " imágenes.");
                return;
            }
        
            if (contador >8){alert("Máximo 8 imágenes."); return;}
        
            var send = {fotos: sList}
        
            $.post('dashboard/informe_fotos', send).done(function(data){
                if (data.response = true){
                    const blob = b64toBlob(data.pdf, "application/pdf");
                    const url = URL.createObjectURL(blob);

                    let modal = make.modal("Enviar informe");
                    document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
                    document.getElementById(modal.contenido).innerHTML = '<iframe style="min-height:400px;" src="'+ url+'" class="embed-responsive-item w-100 h-100"></iframe>';
                    document.getElementById(modal.titulo).innerHTML = "Informe de imágenes";
        
                    $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) {
                        $(this).remove();
                    });
                }else{
                    alert("Hubo un error al generar informe");
                }
            });
    }
}