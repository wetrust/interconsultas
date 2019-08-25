<div class="container">
    <div class="card">
        <div class="card-body">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-membrete-tab" data-toggle="tab" href="#nav-membrete" role="tab" aria-controls="nav-membrete" aria-selected="true">Membrete</a>
                    <a class="nav-item nav-link" id="nav-ciudades-tab" data-toggle="tab" href="#nav-ciudades" role="tab" aria-controls="nav-ciudades" aria-selected="false">Ciudades</a>
                    <a class="nav-item nav-link" id="nav-lugares-tab" data-toggle="tab" href="#nav-lugares" role="tab" aria-controls="nav-lugares" aria-selected="false">Lugares</a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-membrete" role="tabpanel" aria-labelledby="nav-membrete-tab">
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <div class="btn-group my-2" role="group">
                                <a class="btn btn-outline-primary" href="#">Nuevo</a>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <h3 class="text-right my-2" id="crud.title">Textos predefinidos</h3>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr id="table.head">
                                    <td>Titulo</td>
                                    <td>Texto</td>
                                    <td>Opciones</td>
                                </tr>
                            </thead>
                            <tbody id="table.body">
                            <?php foreach ($this->textos as $text) { ?>
                                <tr>
                                <td><?= $text->texto_titulo; ?></td>
                                <td><?= $text->texto_text; ?></td>
                                <td class="w-25"><a class="btn btn-primary" href="">Modificar</a> <a class="btn btn-danger" href="">Eliminar</a></td>
                                </tr>
                            <?php } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-ciudades" role="tabpanel" aria-labelledby="nav-ciudades-tab">
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <div class="btn-group my-2" role="group">
                                <a class="btn btn-outline-primary" href="#">Nuevo</a>
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


<h3>Configuración</h3>
            <div id="almacenamiento">
                
            </div>