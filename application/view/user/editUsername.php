<div class="container">
    <ol class="breadcrumb">
        <li class="ml-auto"><a href="<?php echo Config::get('URL'); ?>"><strong>Volver</strong></a></li>
    </ol>
    <h1>Cambiar nombre</h1>
    <!-- echo out the system feedback (error and success messages) -->
    <?php $this->renderFeedbackMessages(); ?>
    <form action="<?php echo Config::get('URL'); ?>user/editUserName_action" method="post">
        <div class="form-group">
            <label>Escriba el nombre:</label>
            <input type="text" class="form-control" name="user_name" placeholder="Enter a username" required>
        </div>
        <!-- set CSRF token at the end of the form -->
        <input type="hidden" name="csrf_token" value="<?= Csrf::makeToken(); ?>" />
        <button type="submit" class="btn btn-primary">Cambiar</button>
    </form>
</div>