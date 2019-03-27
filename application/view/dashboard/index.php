<div class="container">
    <h1>Administración de interconsultas</h1>
    <?php $this->renderFeedbackMessages(); ?>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Interconsultas nuevas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Interconsultas evaluando</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Interconsultas resueltas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#referentes" role="tab" aria-controls="referentes" aria-selected="false">Listas de referentes</a>
        </li>
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
                                    <td><a href="<?= Config::get('URL') . 'dashboard/ver/' . $value->solicitud_id; ?>">Ver</a></td>
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
    </div>
</div>