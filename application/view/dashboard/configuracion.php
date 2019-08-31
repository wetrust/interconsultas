<div class="container">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Configuración</h5>
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-membrete-tab" data-toggle="tab" href="#nav-membrete" role="tab" aria-controls="nav-membrete" aria-selected="true">Membrete</a>
                    <a class="nav-item nav-link" id="nav-ciudades-tab" data-toggle="tab" href="#nav-ciudades" role="tab" aria-controls="nav-ciudades" aria-selected="false">Ciudades</a>
                    <a class="nav-item nav-link" id="nav-lugares-tab" data-toggle="tab" href="#nav-lugares" role="tab" aria-controls="nav-lugares" aria-selected="false">Lugares</a>
                    <a class="nav-item nav-link" id="nav-lista-tab" data-toggle="tab" href="#nav-lista" role="tab" aria-controls="nav-lista" aria-selected="false">Lista de emails</a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-membrete" role="tabpanel" aria-labelledby="nav-membrete-tab">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between py-sm-3"><h4>Membrete unidad ultrasonografica</h4><button type="button" class="btn btn-primary" id="membrete.guardar">Guardar Membrete</button></div>
                            <div class="mb-3">
                                <textarea class="form-control" id="membrete" rows="3" required></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-ciudades" role="tabpanel" aria-labelledby="nav-ciudades-tab">
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <div class="btn-group my-2" role="group">
                                <button class="btn btn-outline-primary" id="ciudad.nuevo">Nuevo</button>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <h3 class="text-right my-2">Ciudad procedencia de la paciente</h3>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr id="table.head">
                                    <td>id</td>
                                    <td>ciudad</td>
                                    <td>Opciones</td>
                                </tr>
                            </thead>
                            <tbody id="table.body">
                            <?php foreach ($this->ciudades as $ciudad) { ?>
                                <tr>
                                <td><?= $ciudad->ciudad_id; ?></td>
                                <td><?= $ciudad->ciudad_name; ?></td>
                                <td class="w-25"><a class="btn btn-primary" href="">Modificar</a> <a class="btn btn-danger" href="">Eliminar</a></td>
                                </tr>
                            <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-lugares" role="tabpanel" aria-labelledby="nav-lugares-tab">
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <div class="btn-group my-2" role="group">
                            <button class="btn btn-outline-primary" id="lugar.nuevo">Nuevo</button>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <h3 class="text-right my-2">Lugar de control prenatal</h3>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr id="table.head">
                                    <td>id</td>
                                    <td>lugar</td>
                                    <td>Opciones</td>
                                </tr>
                            </thead>
                            <tbody id="table.body">
                            <?php foreach ($this->lugares as $lugar) { ?>
                                <tr>
                                <td><?= $lugar->lugar_id; ?></td>
                                <td><?= $lugar->lugar_name; ?></td>
                                <td class="w-25"><a class="btn btn-primary" href="">Modificar</a> <a class="btn btn-danger" href="">Eliminar</a></td>
                                </tr>
                            <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-lista" role="tabpanel" aria-labelledby="nav-lista-tab">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between py-sm-3"><h4>Datos relativos a destinatario opcional</h4><button type="button" class="btn btn-primary" id="directorio.nuevo">Generar nuevo destinatario</button></div>
                            <table class="table table-hover">
                                <thead class="table-secondary"><tr><th scope="col">Nombre del destinatario</th><th scope="col">Tipo de destinatario</th><th scope="col">Email destinatario</th><th scope="col">Opciones</th></tr></thead>
                                <tbody id="tabla.directorio.email"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    var _api = "<?php echo Config::get('URL'); ?>dashboard/";
</script>
<script src="js/membrete.js"></script>
<script src="js/configuracion.js"></script>