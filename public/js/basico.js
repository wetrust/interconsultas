var nombreprofesionalPegar = "";
$(document).ready(function(){
    $("#interconsultas\\.estado\\.espera").remove();
    $("#interconsultas\\.estado\\.nuevas").parent().append('<label id="interconsultas.estado.solicitar" class="btn btn-secondary active"><input type="radio" value="1" name="interconsultas" checked autocomplete="off"> Nuevas</label>');
    $("#interconsultas\\.estado\\.nuevas").remove();
})