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
                            <tbody>
                                <?php foreach($this->solicitudes_old as $key => $value) { ?>
                                <tr>
                                    <td><?= $value->solicitud_id; ?></td>
                                    <td><?= htmlentities($value->solicitud_nombre); ?></td>
                                    <td><?= htmlentities($value->solicitud_rut); ?></td>
                                    <td><?= htmlentities($value->solicitud_fecha); ?></td>
                                    <td><?= htmlentities($value->solicitud_diagnostico); ?></td>
                                    <?php if ($value->tipo == 1){ ?>
                                    <td><a href="<?= Config::get('URL') . 'pdf/informe_primertrimestre/' . $value->solicitud_id; ?>">Ver</a> <a href="#" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>" class="linkemail">Reenviar</a></td>
                                    <?php } else if ($value->tipo == 0){ ?>
                                    <td><a href="<?= Config::get('URL') . 'pdf/informe_dopplercrecimiento/' . $value->solicitud_id; ?>">Ver</a> <a href="#" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>" class="linkemail">Reenviar</a></td>
                                    <?php } else if ($value->tipo == 2){ ?>
                                    <td><a href="<?= Config::get('URL') . 'pdf/informe_segundotrimestre/' . $value->solicitud_id; ?>">Ver</a> <a href="#" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>" class="linkemail">Reenviar</a></td>
                                    <?php } else if ($value->tipo == 3){ ?>
                                    <td><a href="<?= Config::get('URL') . 'pdf/informe_ginecologico/' . $value->solicitud_id; ?>">Ver</a> <a href="#" data-informe="<?= $value->tipo; ?>" data-solicitud="<?= $value->solicitud_id; ?>" class="linkemail">Reenviar</a></td>
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
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Elegir correo</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Escribir correo</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="form-group">
                            <label for="interconsulta.respuesta.fecha">Fecha evaluación de interconsulta</label>
                            <select class="form-control" id="interfaz.email"></select>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
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

        $("#interfaz\\.enviar").on("click", function(){
            let selecciono = false;
            selecciono = $("#home").hasClass("active");
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

    function callModal(informe, solicitud){

        $("#exampleModal").data("informe", informe);
        $("#exampleModal").data("solicitud", solicitud);

        $("#exampleModal").modal("show");
    }
</script>