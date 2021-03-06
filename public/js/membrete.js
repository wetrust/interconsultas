$(document).ready(function(){
    loadMembrete();
    $("#membrete\\.guardar").on("click", function(){
        var texto = document.getElementById("membrete").value;
        
        texto = (typeof texto !== 'undefined') ? texto.replace(/\r?\n/g, "<br>") : '';

        let args = {membrete: texto}
        
        $.post(_api  + 'membrete', args).done(function(data){
            if (Object.keys(data).length > 0) {
                (data.result == true) ? alert("Guardado") : alert("Hubo un error al enviar el correo");
            }
            loadMembrete();
        });
    });
});

function loadMembrete(){
    $.get('dashboard/mymembrete').done(function(data){
        if (data != false){
            document.getElementById("membrete").value = data.membrete_text.replace(/\r?<br>/g, "\n");
        } 
    });
}