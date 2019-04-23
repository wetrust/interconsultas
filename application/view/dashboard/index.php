<div class="container">
    <h1>Administración de interconsultas</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item"><a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Interconsultas nuevas</a></li>
        <li class="nav-item"><a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Interconsultas esperando evaluación</a></li>
        <li class="nav-item"><a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Interconsultas resueltas</a></li>
        <li class="nav-item"><a class="nav-link" id="contact-tab" data-toggle="tab" href="#referentes" role="tab" aria-controls="referentes" aria-selected="false">Listas profesionales referentes</a></li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="card mt-1">
                <div class="card-body">
                    <?php if ($this->solicitudes_new) { ?>
                        <table class="table table-bordered mt-2">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Rut</th>
                                    <th>Fecha</th>
                                    <th>Diagnóstico</th>
                                    <th>Accion</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($this->solicitudes_new as $key => $value) { ?>
                                <tr>
                                    <td><?= $value->solicitud_id; ?></td>
                                    <td><?= htmlentities($value->solicitud_nombre); ?></td>
                                    <td><?= htmlentities($value->solicitud_rut); ?></td>
                                    <td><?= htmlentities($value->solicitud_fecha); ?></td>
                                    <td><?= htmlentities($value->solicitud_diagnostico); ?></td>
                                    <td><a href="<?= Config::get('URL') . 'dashboard/agendar/' . $value->solicitud_id; ?>">Agendar</a></td>
                                    <td><a class="btn btn-danger" href="<?= Config::get('URL') . 'dashboard/delete/' . $value->solicitud_id; ?>">Eliminar</a></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } else { ?>
                        <div class="alert alert-info mt-2" role="alert">No tiene solicitudes actualmente</div>
                    <?php } ?>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="card mt-1">
                <div class="card-body">
                    <?php if ($this->solicitudes) { ?>
                        <table class="table table-bordered mt-2">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Rut</th>
                                    <th>Fecha</th>
                                    <th>Diagnóstico</th>
                                    <th>Accion</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($this->solicitudes as $key => $value) { ?>
                                <tr>
                                    <td><?= $value->solicitud_id; ?></td>
                                    <td><?= htmlentities($value->solicitud_nombre); ?></td>
                                    <td><?= htmlentities($value->solicitud_rut); ?></td>
                                    <td><?= htmlentities($value->solicitud_fecha); ?></td>
                                    <td><?= htmlentities($value->solicitud_diagnostico); ?></td>
                                    <td><a href="<?= Config::get('URL') . 'dashboard/edit/' . $value->solicitud_id; ?>">Responder</a></td>
                                    <td><a class="btn btn-danger" href="<?= Config::get('URL') . 'dashboard/delete/' . $value->solicitud_id; ?>">Eliminar</a></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } else { ?>
                        <div class="alert alert-info mt-2" role="alert">No tiene solicitudes actualmente</div>
                    <?php } ?>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <div class="card mt-1">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <label>Ciudad</label>
                            <select class="form-control" id="filtro.ciudad">
                                <option value="8">No Seleccionado</option>
                            </select>
                        </div>
                        <div class="col">
                            <label>Lugar de control</label>
                            <select class="form-control" id="filtro.lugar">
                                <option value="8">No Seleccionado</option>
                            </select>
                        </div>
                        <div class="col">
                            <label>Fecha desde</label>
                            <input type="date" id="filtro.fecha" class="form-control" placeholder="Fecha">
                        </div>
                        <div class="col">
                            <label>Fecha hasta</label>
                            <input type="date" id="filtro.fecha.hasta" class="form-control" placeholder="Fecha">
                        </div>
                        <div class="col">
                            <label>Tipo</label>
                            <select class="form-control" id="filtro.tipo">
                                <option value="8">No Seleccionado</option>
                                <option value="1">Eco Primer trimestre</option>
                                <option value="2">Eco 2do / 3cer trimestre</option>
                                <option value="0">Eco Doppler crecimiento</option>
                                <option value="3">Eco Ginecológica</option>
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary my-3" id="filtro.accion">Filtrar</button>
                    <?php if ($this->solicitudes_old) { ?>
                        <table class="table table-bordered mt-2">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Rut</th>
                                    <th>Fecha</th>
                                    <th>Diagnóstico</th>
                                    <th>Accion</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody id="tabla.resuelta">
                                <?php foreach($this->solicitudes_old as $key => $value) { ?>
                                <tr>
                                    <td><?= $value->solicitud_id; ?></td>
                                    <td><?= htmlentities($value->solicitud_nombre); ?></td>
                                    <td><?= htmlentities($value->solicitud_rut); ?></td>
                                    <td><?= htmlentities($value->solicitud_fecha); ?></td>
                                    <td><?= htmlentities($value->solicitud_diagnostico); ?></td>
                                    <?php if ($value->tipo == 1){ ?>
                                    <td><a class="btn btn-primary mr-3" href="<?= Config::get('URL') . 'pdf/informe_primertrimestre/' . $value->solicitud_id; ?>">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>">Reenviar</a></td>
                                    <?php } else if ($value->tipo == 0){ ?>
                                    <td><a class="btn btn-primary mr-3" href="<?= Config::get('URL') . 'pdf/informe_dopplercrecimiento/' . $value->solicitud_id; ?>">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>">Reenviar</a></td>
                                    <?php } else if ($value->tipo == 2){ ?>
                                    <td><a class="btn btn-primary mr-3" href="<?= Config::get('URL') . 'pdf/informe_segundotrimestre/' . $value->solicitud_id; ?>">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>">Reenviar</a></td>
                                    <?php } else if ($value->tipo == 3){ ?>
                                    <td><a class="btn btn-primary mr-3" href="<?= Config::get('URL') . 'pdf/informe_ginecologico/' . $value->solicitud_id; ?>">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>">Reenviar</a></td>

                                    <?php } ?>
                                    <td><a class="btn btn-danger" href="<?= Config::get('URL') . 'dashboard/delete/' . $value->solicitud_id; ?>">Eliminar</a></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } else { ?>
                        <div class="alert alert-info mt-2" role="alert">No tiene solicitudes actualmente</div>
                    <?php } ?>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="referentes" role="tabpanel" aria-labelledby="contact-tab">
        <div class="card mt-1">
                <div class="card-body">
                    <?php if ($this->profesionales) { ?>
                        <table class="table table-bordered mt-2">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Emails</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($this->profesionales as $key => $value) { ?>
                                <tr>
                                    <td><?= htmlentities($value->solicitud_email); ?></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } else { ?>
                        <div class="alert alert-info mt-2" role="alert">No tiene solicitudes actualmente</div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Enviar por email</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#Mhome" role="tab" aria-controls="home" aria-selected="true">Elegir correo</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#Mprofile" role="tab" aria-controls="profile" aria-selected="false">Escribir correo</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="Mhome" role="tabpanel" aria-labelledby="home-tab">
                        <div class="form-group">
                            <label for="interconsulta.respuesta.fecha">Fecha evaluación de interconsulta</label>
                            <select class="form-control" id="interfaz.email"></select>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="Mprofile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="form-group">
                            <label for="interfaz.email.write">Fecha evaluación de interconsulta</label>
                            <input type="email" class="form-control" id="interfaz.email.write">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="interfaz.enviar">Enviar correo</button>
            </div>
        </div>
    </div>
</div>
<script>
    var _api = "<?php echo Config::get('URL'); ?>dashboard/";

    $(document).ready(function(){
        cargarCorreosProfesionales();
        cargarCiudad();
        cargarLugar();

        $("#interfaz\\.enviar").on("click", function(){
            let selecciono = false;
            selecciono = $("#Mhome").hasClass("active");
            let email = "";
            let informe = $("#exampleModal").data("informe");
            let solicitud = $("#exampleModal").data("solicitud");

            if (selecciono){
                email = $("#interfaz\\.email option:selected").val();
            }
            else{
                email = $("#interfaz\\.email\\.write").val();
            }

            let args = {email: email,informe: informe,solicitud: solicitud}

            $.post(_api  + 'email_manual', args).done(function(data){
                if (Object.keys(data).length > 0) {
                    if (data.result){
                        alert("Enviado exitosamente");
                    }
                    else{
                        alert("Hubo un error al enviar el correo");
                    }
                }
            });
        });

        $(".linkemail").on("click", function(){
            callModal($(this).data("informe"), $(this).data("solicitud"));
        });

        $("#filtro\\.accion").on("click", function(){

            let ciudad = $("#filtro\\.ciudad option:selected").val();
            let lugar = $("#filtro\\.lugar option:selected").val();
            let desde = $("#filtro\\.fecha").val();
            let hasta = $("#filtro\\.fecha\\.hasta").val();
            let tipo = $("#filtro\\.tipo option:selected").val();

            let args = {
                ciudad: ciudad,
                lugar: lugar,
                desde: desde,
                hasta: hasta,
                tipo: tipo
            }
            
            $('#tabla\\.resuelta').empty();

            $.post(_api  + 'filtro_resuelto', args).done(function(data){
                let _URL = "<?= Config::get('URL') ?>";
                if (Object.keys(data).length > 0) {
                    let response = '<option value=""></option>';
                    for (let i = 0; i < data.length; i++) {
                        response = '<tr><td>'+ data[i].solicitud_id +'</td><td>'+ data[i].solicitud_nombre +'</td><td>'+ data[i].solicitud_rut +'</td><td>'+ data[i].solicitud_fecha +'</td><td>'+ data[i].solicitud_diagnostico +'</td>';
                        
                        if (data[i].tipo == "1"){
                            response += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_primertrimestre/' + data[i].solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ data[i].tipo +' data-solicitud=' + data[i].solicitud_id + '>Reenviar</a></td>
                        } else if (data[i].tipo == "0"){
                            response += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_dopplercrecimiento/' + data[i].solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ data[i].tipo +' data-solicitud=' + data[i].solicitud_id + '>Reenviar</a></td>
                        } else  if (data[i].tipo == "2"){
                            response += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_segundotrimestre/' + data[i].solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ data[i].tipo +' data-solicitud=' + data[i].solicitud_id + '>">Reenviar</a></td>
                        } else  if (data[i].tipo == "3"){
                            response += '<td><a class="btn btn-primary mr-3" href="' + _URL + 'pdf/informe_ginecologico/' + data[i].solicitud_id + '">Ver</a><a href="#" class="btn btn-primary linkemail" data-informe='+ data[i].tipo +' data-solicitud=' + data[i].solicitud_id + '>Reenviar</a></td>
                        }
                        
                        response += '<td>'+ data[i].solicitud_diagnostico +'</td><td><a class="btn btn-danger" href="' _URL + 'dashboard/delete/' + data[i].solicitud_id + '">Eliminar</a></td>
                        response += '</tr>';
                    }

                    $('#tabla\\.resuelta').append(response);
                }
            });
        });

    });

    function cargarCorreosProfesionales(){
        $.get(_api + 'profesionales_email').done(function(data){
            $('#interfaz\\.email').empty();
            if (Object.keys(data).length > 0) {
                let response = '<option value=""></option>';
                for (let i = 0; i < data.length; i++) {
                    response = '<option value="' + data[i].solicitud_email +'">' + data[i].solicitud_email +'</option>';
                }
                $('#interfaz\\.email').append(response);
            }
        });
    }

    function cargarCiudad(){
        $.get(_api + 'ciudades').done(function(data){
            $('#filtro\\.ciudad').empty();
            $('#filtro\\.ciudad').append('<option value="">No Seleccionado</option>');
            if (Object.keys(data).length > 0) {
                let response = '<option value=""></option>';
                for (let i = 0; i < data.length; i++) {
                    response = '<option value="' + data[i].solicitud_ciudad +'">' + data[i].solicitud_ciudad +'</option>';
                }
                $('#filtro\\.ciudad').append(response);
            }
        });
    }

    function cargarLugar(){
        $.get(_api + 'lugar').done(function(data){
            $('#filtro\\.lugar').empty();
            $('#filtro\\.lugar').append('<option value="">No Seleccionado</option>');
            if (Object.keys(data).length > 0) {
                let response = '<option value=""></option>';
                for (let i = 0; i < data.length; i++) {
                    response = '<option value="' + data[i].solicitud_lugar +'">' + data[i].solicitud_lugar +'</option>';
                }
                $('#filtro\\.lugar').append(response);
            }
        });
    }

    function callModal(informe, solicitud){

        $("#exampleModal").data("informe", informe);
        $("#exampleModal").data("solicitud", solicitud);

        $("#exampleModal").modal("show");
    }
</script>