<div class="container">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Configuración</h5>
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-membrete-tab" data-toggle="tab" href="#nav-membrete" role="tab" aria-controls="nav-membrete" aria-selected="true">Membrete</a>
                    <a class="nav-item nav-link" id="nav-ciudades-tab" data-toggle="tab" href="#nav-ciudades" role="tab" aria-controls="nav-ciudades" aria-selected="false">Ciudades</a>
                    <a class="nav-item nav-link" id="nav-lugares-tab" data-toggle="tab" href="#nav-lugares" role="tab" aria-controls="nav-lugares" aria-selected="false">Lugares</a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-membrete" role="tabpanel" aria-labelledby="nav-membrete-tab">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between py-sm-3"><h4>Membrete</h4><button type="button" class="btn btn-primary" id="membrete.guardar">Guardar Membrete</button></div>
                            <div class="mb-3">
                                <label for="membrete">Membrete</label>
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
                            <h3 class="text-right my-2">Ciudades</h3>
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
                                <a class="btn btn-outline-primary" href="#">Nuevo</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <h3 class="text-right my-2">Lugares</h3>
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
            </div>
        </div>
    </div>
</div>
<script>
    var _api = "<?php echo Config::get('URL'); ?>dashboard/";
</script>
<script src="js/membrete.js"></script>
<script src="js/configuracion.js"></script>