<div class="container">
    <a href="https://administrador.crecimientofetal.cl" class="btn btn-primary mt-2">Volver</a>
    <?php if ($this->profesionales) { ?>
    <table class="table table-bordered mt-2">
        <thead class="thead-dark">
            <tr><th>Emails</th></tr>
        </thead>
        <tbody id="tabla.correos.geniales">
            <?php foreach($this->profesionales as $key => $value) { ?>
            <tr><td data-email="<?= htmlentities($value->solicitud_email); ?>"><?= htmlentities($value->solicitud_email); ?></td></tr>
            <?php } ?>
        </tbody>
    </table>
    <?php } else { ?>
    <div class="alert alert-info mt-2" role="alert">No tiene solicitudes actualmente</div>
    <?php } ?>
</div>