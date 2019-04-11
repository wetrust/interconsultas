<div class="container">
    <div class="card">
        <div class="card-body">
            <h3>Configuración</h3>
            <div id="almacenamiento">
                <div class="row">
                    <div class="col-12 col-sm-6">
                        <div class="btn-group my-2" role="group">
                            <button type="button" class="btn btn-outline-primary" id="button.nuevo" data-toggle="modal" data-target="#interface" data-id="new">Nuevo</button>
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
                            </tr>
                        </thead>
                        <tbody id="table.body">
                        <?php foreach ($this->textos as $text) { ?>
                            <tr>
                            <td><?= $text->texto_titulo; ?></td>
                            <td><?= $text->texto_text; ?></td>
                            <td><a class="btn btn-primary" href="<?= config::get("URL"); ?>dashboard/config_edit/<?= $text->texto_id; ?>">Modificar</a></td>
                            </tr>
                        <?php } ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>