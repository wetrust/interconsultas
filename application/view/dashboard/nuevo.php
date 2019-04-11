<div class="container">
    <h1>Nuevo texto predefinido</h1>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <div class="card mt-1">
        <div class="card-body">
            <form method="post" action="<?php echo Config::get('URL'); ?>dashboard/config_create">
                <div class="form-group">
                    <label>Título:</label>
                    <input type="text" class="form-control" name="texto_titulo">
                </div>
                <div class="form-group">
                    <label>Contenido:</label>
                    <textarea class="form-control" name="texto_text"></textarea>
                </div>
                <button type="submit" class="btn btn-danger">Guardar</button>
            </form>
        </div>
    </div>
</div>
<script src="https://cloud.tinymce.com/5/tinymce.min.js?apiKey=oouk84qvr4nweklpy61gp7uep4rl0h3mnn2sc4t81ay5qs1f"></script>
<script>
    tinymce.init({ selector:'textarea' });
</script>