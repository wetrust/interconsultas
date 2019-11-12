export class make{
    static spinnerGrow(){
        let id = this.uuidv4();
        let struct = '<div class="text-center" id='+id+'><div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Cargando...</span></div><p>Cargando..</p></div>';
        return {id:id,html:struct};
    }

    static modal(button){
        let id = this.uuidv4();
        let titulo = this.uuidv4();
        let contenido = this.uuidv4();
        let _button = this.uuidv4();
        let button_string = "";
        
        if (typeof button !== typeof undefined){
            button_string = '<button type="button" class="btn btn-primary" id="'+_button+'" data-modal="'+id+'">'+button+'</button>';
        }
        
        let resultado ={
            id:id,
            titulo:titulo,
            contenido:contenido,
            button:_button,
            modal:'<div class="modal fade" tabindex="-1" role="dialog" id="'+id+'"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="'+titulo+'">Modal title</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="'+contenido+'"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>'+ button_string+'</div></div></div></div>'
        }
            
        return resultado;
    }

    static uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    static alert(mensaje){
        let modal = make.modal();

        document.getElementsByTagName("body")[0].insertAdjacentHTML( 'beforeend', modal.modal);
        the(modal.contenido).innerHTML = mensaje;
        the(modal.titulo).innerHTML = "Mensaje";
        
        $('#'+modal.id).modal("show").on('hidden.bs.modal', function (e) { $(this).remove(); });
    }
}

export class data{
    static async get(url) {
        const response = await fetch(url);
        return await response.json();
    }
    static async post(url, data){
        const response = await fetch(url, {method: 'POST',body: data});
        return await response.json();
    }
}

export function the(id) {
    return document.getElementById(id);
}

export function humanDate(date) {
    if (typeof date === typeof undefined){
        date = new Date();
    }
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
  
    if(dd<10) {
        dd = '0'+dd
    } 
  
    if(mm<10) {
        mm = '0'+mm
    } 
  
    return dd+ '-' + mm + '-' + yyyy;
}

export function inputDate(date) {
    if (typeof date === typeof undefined){
        date = new Date();
    }
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
  
    if(dd<10) {
        dd = '0'+dd
    } 
  
    if(mm<10) {
        mm = '0'+mm
    } 
  
    return yyyy + '-' +  mm+ '-' + dd;
}

export function clearSelect(id){
    let select = the(id);
    let length = select.options.length;

    for (i = 0; i < length; i++) {
        select.options[i] = null;
    }
}


export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}