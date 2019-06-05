$(document).ready(function(){
    if (a == 1){
        $("#interconsultas\\.estado\\.nuevas").addClass("d-none");
        $("#interconsultas\\.estado\\.espera").addClass("d-none");
        $("#interconsultas\\.estado\\.finalizadas").addClass("d-none");
        $("#interconsultas\\.estado\\.respuesta").addClass("d-none");
        $("#filtro\\.activar").addClass("d-none");
        loadSolicitud();
    }else if (a == 2){
        $("#interconsultas\\.estado\\.nuevas").addClass("d-none");
        $("#interconsultas\\.estado\\.espera").addClass("d-none");
        $("#interconsultas\\.estado\\.finalizadas").addClass("d-none");
        $("#filtro\\.activar").addClass("d-none");
        loadSolicitud();
    }else if (a == 3){
        $("#interconsultas\\.estado\\.solicitar").addClass("d-none");
        $("#interconsultas\\.estado\\.respuesta").addClass("d-none");
        loadNews();
    }
    else if (a == 4){
        $("#interconsultas\\.estado\\.nuevas").addClass("d-none");
        $("#interconsultas\\.estado\\.respuesta").addClass("d-none");
        $("#filtro\\.activar").addClass("d-none");
        loadSolicitud();
    }

    $('.btn-group-toggle .btn').on("click", function(){
        let valor = parseInt($(this).find('input').val());

        if (valor == 0){
            loadSolicitud();
            $("#filtro\\.activar").addClass("d-none");
        }else if (valor == 1){
            loadNews();
            $("#filtro\\.activar").removeClass("d-none");
        }else if (valor == 2){
            loadInProcess();
            $("#filtro\\.activar").addClass("d-none");
        }else if (valor == 3){
            loadInFinish();
            $("#filtro\\.activar").removeClass("d-none");
        }else if (valor == 4){
            loadInRespuesta();
            $("#filtro\\.activar").removeClass("d-none");
        }
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