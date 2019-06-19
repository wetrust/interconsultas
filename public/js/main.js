$(document).ready(function(){
    if (a == 1){
        $("#interconsultas\\.estado\\.nuevas").addClass("d-none");
        $("#interconsultas\\.estado\\.espera").addClass("d-none");
        $("#interconsultas\\.estado\\.agendadas").addClass("d-none");
        $("#interconsultas\\.estado\\.finalizadas").addClass("d-none");
        $("#interconsultas\\.estado\\.respuesta").addClass("d-none");
        $("#filtro\\.activar").addClass("d-none");
        $("#parto-tab").addClass("d-none");
        $("#consentimiento-tab").addClass("d-none");
        loadSolicitud();
    }else if (a == 2){
        $("#interconsultas\\.estado\\.nuevas").addClass("d-none");
        $("#interconsultas\\.estado\\.espera").addClass("d-none");
        $("#interconsultas\\.estado\\.finalizadas").addClass("d-none");
        $("#filtro\\.activar").addClass("d-none");
        loadSolicitud();
    }else if (a == 3){
        $("#interconsultas\\.estado\\.solicitar").addClass("d-none");
        $("#interconsultas\\.estado\\.agendadas").addClass("d-none");
        $("#interconsultas\\.estado\\.solicitadas").addClass("d-none");
        $("#interconsultas\\.estado\\.respuesta").addClass("d-none");
        loadNews();
    }
    else if (a == 4){
        $("#interconsultas\\.estado\\.nuevas").addClass("d-none");
        $("#interconsultas\\.estado\\.agendadas").addClass("d-none");
        $("#interconsultas\\.estado\\.respuesta").addClass("d-none");
        $("#filtro\\.activar").addClass("d-none");
        loadSolicitud();
    }

    cargarCiudad();
    cargarLugar();
    
    $('.btn-group-toggle .btn.interconsulta').on("click", function(){
        let valor = parseInt($(this).find('input').val());

        if (valor == 0){
            loadSolicitud();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none");
        }else if (valor == 1){
            loadSolicitadas();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none");
        }else if (valor == 2){
            loadNews();
            $("#filtro\\.activar").removeClass("d-none");
            $("#filtro\\.tipo").parent().addClass("d-none");
        }else if (valor == 3){
            //solicitud de interconsulta agendada
            loadAgendadas();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none");
        }else if (valor == 4){
            loadInProcess();
            $("#filtro\\.activar").addClass("d-none");
            $("#filtro\\.contenedor").addClass("d-none")
        }else if (valor == 5){
            loadInFinish();
            $("#filtro\\.activar").removeClass("d-none");
            $("#filtro\\.tipo").parent().removeClass("d-none");
        }else if (valor == 6){
            loadInRespuesta();
            $("#filtro\\.activar").removeClass("d-none");
            $("#filtro\\.tipo").parent().removeClass("d-none");
        }
    });

    $("#parto-tab").on("click", function(){
        loadInPartos();
    });
    
    $('.btn-group-toggle .btn.parto').on("click", function(){
        let valor = parseInt($(this).find('input').val());
        if (valor == 0){
            loadInPartos();
        }else if (valor == 1){
            loadReadyPartos();
        }
    });
    
    $("#filtro\\.activar").on("click", function(){
        var toggle = $("#filtro\\.contenedor").hasClass("d-none");

        if (toggle){
            $("#filtro\\.contenedor").removeClass("d-none");
        }else{
            $("#filtro\\.contenedor").addClass("d-none");
        }
    });

    $("#filtro\\.accion").on("click", function(){
        let ciudad = $("#filtro\\.ciudad option:selected").val();
        let lugar = $("#filtro\\.lugar option:selected").val();
        let desde = $("#filtro\\.fecha").val();
        let hasta = $("#filtro\\.fecha\\.hasta").val();
        let tipo = $("#filtro\\.tipo option:selected").val();

        let args = {ciudad: ciudad, lugar: lugar, desde: desde, hasta: hasta, tipo: tipo}
        
        $('#tabla\\.resuelta').empty();

        let finalizadas = $("#interconsultas\\.estado\\.finalizadas").hasClass("active");
        let respuesta = $("#interconsultas\\.estado\\.respuesta").hasClass("active");

        if(finalizadas == true){
            $.post(_api  + 'filtro_resuelto', args).done(function(data){
                buildFinishTable(data);
            });
        }else if(respuesta == true){
            $.post(_api  + 'filtro_respuestas', args).done(function(data){
                buildRespuestaTable(data);
            });
        }
    });

    $("#filtro\\.borrar").on("click", function(){
        let finalizadas = $("#interconsultas\\.estado\\.finalizadas").hasClass("active");
        let respuesta = $("#interconsultas\\.estado\\.respuesta").hasClass("active");

        if(finalizadas == true){
            loadInFinish();
        }else if(respuesta == true){
            loadInRespuesta();
        }
        
        $("#filtro\\.ciudad").val("");
        $("#filtro\\.lugar").val("");
        $("#filtro\\.fecha").val("");
        $("#filtro\\.fecha\\.hasta").val("");
        $("#filtro\\.tipo").val(8);
    });
});

function loadContrarreferentes(){
	$.get("api/profesionales").done(function(data){
		$("#interconsulta\\.para\\.select").empty();
		$.each(data, function(element, value){
			let option = '<option value="'+value.user_email+'">'+value.user_name+'</option>';
			$("#interconsulta\\.para\\.select").append(option);
		});
	});
}

function loadReferentes(){
    $.get(_api + 'profesionales_email').done(function(data){
        $('#interfaz\\.email').empty();
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            $.each(data, function(i, value) {
                response = '<option value="' + data[i].solicitud_email +'">' + data[i].solicitud_email +'</option>';
                $('#interfaz\\.email').append(response);
            });
        }
    });
}

function cargarLugar(){
    $.get(_api + 'lugar').done(function(data){
        $('#filtro\\.lugar').empty().append('<option value="">No Seleccionado</option>');
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            $.each(data, function(i, value) {
                response = '<option value="' + value.solicitud_lugar +'">' + value.solicitud_lugar +'</option>';
                $('#filtro\\.lugar').append(response);
            });
        }
    });
}

function cargarCiudad(){
    $.get(_api + 'ciudades').done(function(data){
        $('#filtro\\.ciudad').empty().append('<option value="">No Seleccionado</option>');
        if (Object.keys(data).length > 0) {
            let response = '<option value=""></option>';
            $.each(data, function(i, value) {
                response = '<option value="' + value.solicitud_ciudad +'">' + value.solicitud_ciudad +'</option>';
                $('#filtro\\.ciudad').append(response);
            });
        }
    });
}