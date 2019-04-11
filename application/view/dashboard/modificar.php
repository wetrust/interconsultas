<div class="container">
    <h1>Modificar texto predefinido</h1>
    <h2>Edit a note</h2>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <div class="card mt-1">
        <div class="card-body">
            <?php if ($this->textos) { ?>
            <form method="post" action="<?php echo Config::get('URL'); ?>dashboard/config_save">
                <input type="hidden" name="texto_id" value="<?php echo htmlentities($this->textos->texto_id); ?>" />
                <div class="form-group">
                    <label>Título:</label>
                    <input type="text" class="form-control" name="texto_titulo" value="<?php echo htmlentities($this->textos->texto_titulo); ?>">
                </div>
                <div class="form-group">
                    <label>Contenido:</label>
                    <textarea class="form-control" name="texto_text"><?php echo htmlentities($this->textos->texto_text); ?></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Guardar</button>
            </form>
            <?php } else { ?>
            <div class="alert alert-danger" role="alert">Este texto no existe.</div>
            <?php } ?>
        </div>
    </div>
</div>