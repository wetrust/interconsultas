$(document).ready(function(){
    construir();
});

function construir(){
    $("#mensaje\\.resultado").parent().parent().prepend('<div class="card-header bg-primary" id="card.header"><h4 class="text-white text-center">Formulario de referencia para evaluación ecográfica gineco - Obstétrica</h4><h6 class="text-white text-center">Formulario de libre disposición para profesionales que soliciten exámen ecográfico a ecografistas registrados en la plataforma</h6></div>');
    $("#mensaje\\.resultado").parent().prepend('<div id="formulario.solicitud"> <div class="row"> <div class="col form-group"> <label>Nombre del paciente</label> <input type="text" class="form-control" id="interconsulta.nombre"> </div><div class="col form-group"> <label>RUT del paciente</label> <input type="text" class="form-control" id="interconsulta.rut"> </div><div class="col form-group"> <label>Fecha de solicitud del exámen</label> <input type="date" class="form-control" id="interconsulta.fecha"> </div></div><div class="row"> <div class="col form-group"> <label>Ege conocida precozmente</label> </div><div class="col form-group"> <div> <input type="radio" id="interconsulta.eg.si" value="1" name="interconsulta_eg" class="form-check-input"> <label>Si</label> </div><div> <input type="radio" id="interconsulta.eg.no" value="0" name="interconsulta_eg" class="form-check-input" checked=""> <label>No</label> </div></div><div class="col form-group"> <label>Ecografía previa de crecimiento</label> </div><div class="col form-group"> <div> <input type="radio" id="interconsulta.eco.si" value="1" name="interconsulta_eco" class="form-check-input"> <label for="interconsulta.eco.si">Si</label> </div><div> <input type="radio" id="interconsulta.eco.no" value="0" name="interconsulta_eco" class="form-check-input" checked=""> <label for="interconsulta.eco.no">No</label> </div></div></div><div class="row"> <div class="col form-group"> <label>FUM operacional</label> <input type="date" class="form-control" id="interconsulta.fum"> </div><div class="col-2 form-group"> <label>Edad Gestacional</label> <input type="text" class="form-control" id="interconsulta.egestacional" disabled=""> </div><div class="col form-group"> <label>Diagnóstico de referencia 1</label> <select class="form-control" id="interconsulta.diagnostico.select"> <option value="Referido por" selected>Referido por</option> <option value="Patología 1° trimestre">Patología 1° trimestre</option> <option value="Patología 2° trimestre">Patología 2° trimestre</option> <option value="Patología 3° trimestre">Patología 3° trimestre</option> <option value="No señalado">No señalado</option> </select> </div><div class="col form-group"> <label>Diagnóstico de referencia2</label> <input type="text" class="form-control" id="interconsulta.diagnostico"> </div></div><div class="row"> <div class="col form-group"> <label>Ciudad procedencia de la paciente</label> <input type="text" class="form-control" id="interconsulta.ciudad"> </div><div class="col form-group"> <label>Lugar de control prenatal</label> <input type="text" class="form-control" id="interconsulta.lugar"> </div></div><h5>Datos profesional referente a exámen ecográfico</h5> <div class="row"> <div class="col form-group"> <label>Nombre del profesional</label> <input type="text" class="form-control" name="interconsulta_para_nombre" disabled> </div><div class="col form-group"> <label>Email (profesional referente)</label> <input type="email" class="form-control" name="interconsulta_para" disabled> </div></div><div class="row"> <div class="col form-group"> <label><strong>Seleccione profesional de contrareferencia</strong></label> <select class="form-control" id="interconsulta.para.select"> </select> </div><div class="col form-group"> <label>Nombre del profesional</label> <input type="text" class="form-control" id="interconsulta.para.nombre" disabled> </div><div class="col form-group"> <label>Email (profesional de contrareferencia)</label> <input type="email" class="form-control" id="interconsulta.para" disabled> </div></div><div class="row"> <div class="col"> <button class="btn btn-primary" id="interconsulta.enviar">Enviar solicitud de exámen ecográfico</button> </div></div></div>');
	$("input[name='interconsulta_para_nombre']").val($("#user_name").html());
	$("input[name='interconsulta_para']").val($("#user_email").html());
}