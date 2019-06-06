function loadInPartos(){
    $("#mensaje\\.parto").addClass("d-none");
    $("#tabla\\.parto").removeClass("d-none");
    $.get('dashboard/finish').done(function(data){
        buildPartosTable(data);
	});
}

function buildPartosTable(data){
    $('#tabla\\.parto').empty();
    if (Object.keys(data).length > 0) {
        $("#mensaje\\.resultado").addClass("d-none");
        var tabla = '<thead class="thead-dark"><tr><th>Nombre</th><th>Ciudad</th><th>Lugar de control</th><th>Exámen realizado</th><th>Accion</th></tr></thead><tbody>';
        //tabla para exámenes ecográficos
        $.each(data, function(i, value) {
            let fecha = value.fecha.split('-');
            fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];        
            tabla += '<tr><td>' + value.solicitud_nombre + '</td><td>' + value.solicitud_ciudad + '</td><td>'+ value.solicitud_lugar +'</td><td>'+ fecha +'</td>';
            tabla += '<td><button class="btn btn-secondary mr-1" data-id='+ value.solicitud_id + ' data-tipo='+ value.tipo +'>Datos del parto</button></td></tr>';
        });

        tabla += '</tbody>';
        $('#tabla\\.parto').append(tabla);
        $('#tabla\\.parto tr > td > button').on("click", function(){
            let solicitud_id =  $(this).data("id");
            let tipo =  $(this).data("tipo");

            $('body').append('<div class="modal" tabindex="-1" role="dialog" id="cautivo.dialogo"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">No está completo el formulario</h5></div><div class="modal-body"><p>¿Cómo se llama la paciente?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button></div></div></div></div>');
			$('#cautivo\\.dialogo').modal("show");
			$('#cautivo\\.dialogo').on('hidden.bs.modal', function (e) {
				$(this).remove();
			});
        });
    }
    else{
        $("#mensaje\\.parto").removeClass("d-none").html("No tienes pacientes para ingresar datos del parto");
    }
}