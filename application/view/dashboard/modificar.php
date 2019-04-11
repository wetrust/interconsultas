<div class="container">
    <h1>Modificar texto predefinido</h1>
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
<script src="https://cloud.tinymce.com/5/tinymce.min.js?apiKey=oouk84qvr4nweklpy61gp7uep4rl0h3mnn2sc4t81ay5qs1f"></script>
<script>
    tinymce.init({ selector:'textarea',height :540, language: 'es_MX' });
</script>